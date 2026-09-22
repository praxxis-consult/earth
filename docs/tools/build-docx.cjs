// Usage: node md2docx.cjs <input.md> <output.docx> "<footer label>"
const fs = require("fs");
const { marked } = require("marked");
const D = require("docx");
const [, , IN, OUT, LABEL] = process.argv;
const md = fs.readFileSync(IN, "utf8");
const tokens = marked.lexer(md, { gfm: true });

const INK = "1B1917",
  MUTE = "6B6660",
  LINE = "DCD7CD",
  SAND = "ECE7DC",
  CODEBG = "F3EFE6";
const SERIF = "Instrument Serif",
  SANS = "Inter Tight",
  MONO = "Courier New";
const PAGE_W = 11906,
  MARGIN = 1000,
  CONTENT = PAGE_W - 2 * MARGIN; // DXA

const unescape = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

function inline(toks, st = {}) {
  const out = [];
  for (const t of toks || []) {
    if (t.type === "strong") out.push(...inline(t.tokens, { ...st, bold: true }));
    else if (t.type === "em") out.push(...inline(t.tokens, { ...st, italics: true }));
    else if (t.type === "del") out.push(...inline(t.tokens, { ...st, strike: true }));
    else if (t.type === "codespan")
      out.push(
        new D.TextRun({
          text: unescape(t.text),
          font: MONO,
          size: Math.max(12, (st.size || 21) - 3),
          shading: { type: D.ShadingType.CLEAR, fill: CODEBG, color: "auto" },
          bold: st.bold,
        }),
      );
    else if (t.type === "link") out.push(...inline(t.tokens, st));
    else if (t.type === "br") out.push(new D.TextRun({ break: 1 }));
    else if (t.tokens && t.tokens.length) out.push(...inline(t.tokens, st));
    else out.push(new D.TextRun({ text: unescape(t.text ?? t.raw ?? ""), ...st }));
  }
  return out;
}
const plain = (toks) =>
  (toks || []).map((t) => (t.tokens ? plain(t.tokens) : (t.text ?? t.raw ?? ""))).join("");

function tableEl(t) {
  const n = t.header.length;
  const wide = n >= 7,
    size = wide ? 13 : n >= 4 ? 17 : 18;
  const hasHeader = !t.header.every((h) => !h.text.trim());
  // column weights from content length, clamped, first column boosted for matrices
  const lens = Array.from({ length: n }, (_, c) => {
    const cells = [t.header[c], ...t.rows.map((r) => r[c])].map((x) => plain(x.tokens).length);
    const avg = cells.reduce((a, b) => a + b, 0) / cells.length,
      mx = Math.max(...cells);
    return Math.min(60, Math.max(6, avg * 0.7 + mx * 0.3));
  });
  if (wide) lens[0] = Math.max(lens[0], 28);
  const tot = lens.reduce((a, b) => a + b, 0);
  const longestWord = Array.from({ length: n }, (_, c) =>
    Math.max(
      ...[t.header[c], ...t.rows.map((r) => r[c])]
        .flatMap((x) => plain(x.tokens).split(/[\s\/·-]+/))
        .map((w) => w.length),
    ),
  );
  const perChar = wide ? 78 : 118,
    padW = wide ? 140 : 260;
  let widths = lens.map((l, c) =>
    Math.max(longestWord[c] * perChar + padW, Math.floor((CONTENT * l) / tot)),
  );
  // shrink only the columns that have slack, so word-width minimums survive
  const mins = longestWord.map((w) => w * perChar + padW);
  let over = widths.reduce((a, b) => a + b, 0) - CONTENT;
  if (over > 0) {
    const slack = widths.map((w, c) => Math.max(0, w - mins[c]));
    const ts = slack.reduce((a, b) => a + b, 0) || 1;
    widths = widths.map((w, c) => Math.floor(w - Math.min(slack[c], (over * slack[c]) / ts)));
  } else {
    const sc = CONTENT / widths.reduce((a, b) => a + b, 0);
    widths = widths.map((w) => Math.floor(w * sc));
  }
  widths[n - 1] += CONTENT - widths.reduce((a, b) => a + b, 0);
  const border = { style: D.BorderStyle.SINGLE, size: 4, color: LINE };
  const borders = { top: border, bottom: border, left: border, right: border };
  const pad = wide
    ? { top: 50, bottom: 50, left: 60, right: 60 }
    : { top: 80, bottom: 80, left: 110, right: 110 };
  const cell = (c, i, head, firstCol) =>
    new D.TableCell({
      width: { size: widths[i], type: D.WidthType.DXA },
      borders,
      margins: pad,
      shading: head ? { type: D.ShadingType.CLEAR, fill: SAND, color: "auto" } : undefined,
      children: [
        new D.Paragraph({
          spacing: { after: 0, line: 252 },
          children: inline(
            c.tokens,
            head
              ? {
                  bold: true,
                  size: wide ? size - 2 : size - 3,
                  color: MUTE,
                  allCaps: !wide,
                  font: SANS,
                }
              : { size, font: SANS, bold: firstCol && !wide ? true : undefined },
          ),
        }),
      ],
    });
  const rows = [];
  if (hasHeader)
    rows.push(
      new D.TableRow({
        tableHeader: true,
        cantSplit: true,
        children: t.header.map((c, i) => cell(c, i, true)),
      }),
    );
  for (const r of t.rows)
    rows.push(
      new D.TableRow({
        cantSplit: true,
        children: r.map((c, i) => cell(c, i, false, i === 0 && n <= 3)),
      }),
    );
  return new D.Table({
    width: { size: CONTENT, type: D.WidthType.DXA },
    columnWidths: widths,
    rows,
  });
}

function listEls(t, level = 0) {
  const out = [];
  for (const item of t.items) {
    let first = true;
    for (const b of item.tokens) {
      if (b.type === "list") out.push(...listEls(b, level + 1));
      else if (b.type === "text" || b.type === "paragraph") {
        out.push(
          new D.Paragraph({
            numbering: first
              ? { reference: t.ordered ? `num-${t._id}` : "bullets", level }
              : undefined,
            indent: first ? undefined : { left: 720 * (level + 1) },
            spacing: { after: 70, line: 300 },
            children: inline(b.tokens, { size: 21, font: SANS }),
          }),
        );
        first = false;
      } else if (b.type === "code") out.push(...codeEls(b));
      else if (b.type === "table") out.push(tableEl(b));
    }
  }
  return out;
}
function codeEls(t) {
  const lines = t.text.split("\n");
  const longest = Math.max(...lines.map((l) => l.length));
  const size = longest > 118 ? 11 : longest > 100 ? 12 : longest > 84 ? 14 : 16; // half-points
  // one paragraph with line breaks: every app then spaces the lines as lines, not as paragraphs
  const runs = [];
  lines.forEach((l, i) =>
    runs.push(
      new D.TextRun({
        text: l.length ? l.replace(/ /g, "\u00A0") : "\u00A0",
        font: MONO,
        size,
        break: i === 0 ? undefined : 1,
      }),
    ),
  );
  return [
    new D.Paragraph({
      shading: { type: D.ShadingType.CLEAR, fill: CODEBG, color: "auto" },
      keepLines: true,
      spacing: { before: 120, after: 160, line: 240, lineRule: D.LineRuleType.AUTO },
      children: runs,
    }),
  ];
}

let numId = 0;
const numRefs = [];
const markLists = (ts) => {
  for (const t of ts) {
    if (t.type === "list") {
      if (t.ordered) {
        t._id = ++numId;
        numRefs.push(t._id);
      }
      for (const it of t.items) markLists(it.tokens);
    } else if (t.type === "blockquote") markLists(t.tokens);
  }
};
markLists(tokens);

const body = [];
let seenH1 = false;
function block(t, quote = false) {
  if (t.type === "heading") {
    const lvl = t.depth;
    if (lvl === 1) {
      seenH1 = true;
      body.push(
        new D.Paragraph({
          spacing: { after: 60 },
          children: [
            new D.TextRun({
              text: "EARTH",
              font: SANS,
              size: 18,
              characterSpacing: 120,
              color: INK,
            }),
          ],
        }),
      );
      body.push(
        new D.Paragraph({
          heading: D.HeadingLevel.TITLE,
          spacing: { after: 200 },
          children: inline(t.tokens, { font: SERIF, size: 60, color: INK }),
        }),
      );
      return;
    }
    const map = {
      2: [D.HeadingLevel.HEADING_1, 40, 420, 140],
      3: [D.HeadingLevel.HEADING_2, 28, 300, 100],
      4: [D.HeadingLevel.HEADING_3, 19, 240, 80],
    };
    const [h, size, before, after] = map[lvl] || map[4];
    body.push(
      new D.Paragraph({
        heading: h,
        keepNext: true,
        spacing: { before, after },
        border:
          lvl === 2
            ? { top: { style: D.BorderStyle.SINGLE, size: 4, color: LINE, space: 12 } }
            : undefined,
        children: inline(
          t.tokens,
          lvl === 4
            ? { font: SANS, size, bold: true, color: MUTE, allCaps: true }
            : { font: SERIF, size, color: INK },
        ),
      }),
    );
  } else if (t.type === "paragraph") {
    body.push(
      new D.Paragraph({
        spacing: { after: 140, line: 312 },
        keepNext: /:\s*$/.test(t.text || "") || undefined,
        indent: quote ? { left: 400 } : undefined,
        border: quote
          ? { left: { style: D.BorderStyle.SINGLE, size: 12, color: "B98A3A", space: 12 } }
          : undefined,
        children: inline(t.tokens, { size: 21, font: SANS, italics: quote || undefined }),
      }),
    );
  } else if (t.type === "list") body.push(...listEls(t));
  else if (t.type === "table") {
    body.push(tableEl(t));
    body.push(
      new D.Paragraph({
        spacing: { before: 0, after: 0, line: 100, lineRule: D.LineRuleType.EXACT },
        children: [new D.TextRun({ text: "", size: 2 })],
      }),
    );
  } else if (t.type === "code") body.push(...codeEls(t));
  else if (t.type === "blockquote") t.tokens.forEach((x) => block(x, true));
}
tokens.forEach((t) => block(t));

const lvl = (format, text) =>
  [0, 1, 2].map((level) => ({
    level,
    format,
    text: typeof text === "function" ? text(level) : text,
    alignment: D.AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 720 * (level + 1) - 260, hanging: 300 } } },
  }));
const doc = new D.Document({
  creator: "Earth",
  title: LABEL,
  styles: { default: { document: { run: { font: SANS, size: 21, color: INK } } } },
  numbering: {
    config: [
      { reference: "bullets", levels: lvl(D.LevelFormat.BULLET, (l) => ["•", "–", "·"][l]) },
      ...numRefs.map((id) => ({
        reference: `num-${id}`,
        levels: lvl(D.LevelFormat.DECIMAL, (l) => `%${l + 1}.`),
      })),
    ],
  },
  sections: [
    {
      properties: { page: { margin: { top: 1100, bottom: 1100, left: MARGIN, right: MARGIN } } },
      footers: {
        default: new D.Footer({
          children: [
            new D.Paragraph({
              tabStops: [{ type: D.TabStopType.RIGHT, position: CONTENT }],
              children: [
                new D.TextRun({ text: `Earth · ${LABEL} · Confidential`, size: 14, color: MUTE }),
                new D.TextRun({
                  children: ["\t", D.PageNumber.CURRENT, " / ", D.PageNumber.TOTAL_PAGES],
                  size: 14,
                  color: MUTE,
                }),
              ],
            }),
          ],
        }),
      },
      children: body,
    },
  ],
});
D.Packer.toBuffer(doc).then((b) => {
  fs.writeFileSync(OUT, b);
  console.log(
    "wrote",
    OUT,
    Math.round(b.length / 1024),
    "KB;",
    body.length,
    "blocks;",
    numRefs.length,
    "numbered lists",
  );
});
