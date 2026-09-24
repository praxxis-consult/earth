/**
 * Regenerates the country and city lists the waitlist form offers, from GeoNames
 * (https://www.geonames.org, CC BY 4.0). Run `node scripts/geo.mjs` and commit the output.
 *
 *   public/geo/cities/<CC>.json    that country's towns over 15,000 people, biggest first
 *   src/lib/countries.json         the same country list, for validation and the select
 *
 * GeoNames feature codes: PPL* are populated places. PPLH (historical), PPLQ (abandoned) and PPLW
 * (destroyed) are dropped. PPLX (a section of a city) is kept, because a district such as Brooklyn or
 * Surulere is what people say when asked where they live. Note the dump only holds places GeoNames
 * has a population for: Ikorodu, Yaba, Apapa and Wuse are absent and cannot come from it.
 */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const DUMP = "https://download.geonames.org/export/dump";
// GEONAMES_DIR=/path skips the download when the two files are already there.
const work = process.env["GEONAMES_DIR"] ?? join(tmpdir(), "earth-geonames");
mkdirSync(work, { recursive: true });
if (!process.env["GEONAMES_DIR"])
  execSync(
    `curl -sSfo cities15000.zip ${DUMP}/cities15000.zip && curl -sSfo countryInfo.txt ${DUMP}/countryInfo.txt && unzip -oq cities15000.zip`,
    { cwd: work, stdio: "inherit" },
  );

const countries = readFileSync(join(work, "countryInfo.txt"), "utf8")
  .split("\n")
  .filter((l) => l && !l.startsWith("#"))
  .map((l) => l.split("\t"))
  .map((f) => ({ c: f[0].trim(), n: f[4].trim() }))
  // Dissolved states and uninhabited territories that GeoNames still lists.
  .filter(({ c }) => !["CS", "AN", "AQ", "BV", "HM", "UM", "IO", "TF", "GS"].includes(c))
  .sort((a, b) => a.n.localeCompare(b.n, "en"));

// "Kolār" and "Kolar" are one town; keep one spelling per folded key (the bigger, then the plainer).
const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const byCountry = new Map();
const DROP = new Set(["PPLH", "PPLQ", "PPLW"]);
for (const line of readFileSync(join(work, "cities15000.txt"), "utf8").split("\n")) {
  if (!line) continue;
  const f = line.split("\t");
  const [name, code, country, population] = [f[1].trim(), f[7], f[8], Number(f[14])];
  if (DROP.has(code) || !name) continue;
  if (!byCountry.has(country)) byCountry.set(country, new Map());
  const m = byCountry.get(country);
  const key = fold(name);
  const prev = m.get(key);
  // The same name can appear twice in a country (two towns, or a city and its district); keep the bigger.
  if (!prev || prev.population < population || (prev.population === population && name < prev.name))
    m.set(key, { name, population });
}

rmSync("public/geo/cities", { recursive: true, force: true });
mkdirSync("public/geo/cities", { recursive: true });
let total = 0;
for (const { c } of countries) {
  const m = byCountry.get(c);
  if (!m) continue;
  const names = [...m.values()]
    .sort((a, b) => b.population - a.population || a.name.localeCompare(b.name, "en"))
    .map((x) => x.name);
  total += names.length;
  writeFileSync(`public/geo/cities/${c}.json`, JSON.stringify(names));
}
writeFileSync("src/lib/countries.json", JSON.stringify(countries));
writeFileSync(
  "public/geo/ATTRIBUTION.txt",
  "Country and city lists are derived from GeoNames (https://www.geonames.org), licensed under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Towns over 15,000 people from the cities15000 dump, which GeoNames updates daily, so two runs can differ; regenerated with scripts/geo.mjs.\n",
);
console.log(`${countries.length} countries, ${total} cities in ${byCountry.size} country files`);
