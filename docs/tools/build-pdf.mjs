// Usage: node build.mjs <input.md> <out.html> <out.pdf>
import { marked } from "marked";
import { readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
const [,, IN, OUT_HTML, OUT_PDF] = process.argv;
const md = readFileSync(IN, "utf8");
const slug = s => s.toLowerCase().replace(/<[^>]+>/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const toc = [];
const renderer = new marked.Renderer();
renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens); const id = slug(text);
  if (depth === 2) toc.push({ id, text });
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
};
renderer.table = function (token) {
  const head = "<tr>" + token.header.map(c => `<th>${this.parser.parseInline(c.tokens)}</th>`).join("") + "</tr>";
  const body = token.rows.map(r => "<tr>" + r.map(c => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("") + "</tr>").join("\n");
  const empty = token.header.every(c => !c.text.trim());
  const cls = "tw" + (token.header.length >= 7 ? " wide" : "") + (token.rows.length <= 8 ? " keep" : "");
  return `<div class="${cls}"><table>${empty ? "" : `<thead>${head}</thead>`}<tbody>${body}</tbody></table></div>\n`;
};
const body = marked.parse(md, { renderer, gfm: true });
const tocHtml = `<nav class="toc"><p class="label">Contents</p><ol>${toc.map(t=>`<li><a href="#${t.id}">${t.text.replace(/^\d+\.\s*/,"")}</a></li>`).join("")}</ol></nav>`;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Earth — Product Requirements</title><meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&display=swap">
<style>
:root{--paper:#f7f5f0;--ink:#1b1917;--mute:#6b6660;--line:#dcd7cd;--gold:#b98a3a;--sand:#ece7dc}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.6 "Inter Tight",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
main{max-width:860px;margin:0 auto;padding:48px 22px 96px}
h1,h2,h3{font-family:"Instrument Serif",Georgia,serif;font-weight:400;letter-spacing:-.015em;line-height:1.08}
h1{font-size:clamp(2.4rem,7vw,4rem);margin:0 0 18px}
h2{font-size:clamp(1.8rem,4.6vw,2.6rem);margin:64px 0 14px;padding-top:26px;border-top:1px solid var(--line)}
h3{font-size:1.45rem;margin:34px 0 8px}
h4{font:600 .78rem/1.3 "Inter Tight",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin:30px 0 8px}
p,li{max-width:74ch}ul{padding-left:1.25em}ol{padding-left:2em}li{margin:.25em 0}
a{color:inherit;text-decoration-color:var(--gold);text-underline-offset:3px}
strong{font-weight:600}hr{display:none}
code{font:.86em ui-monospace,Menlo,monospace;background:var(--sand);padding:.1em .35em;border-radius:3px;word-break:break-word}
pre{background:var(--ink);color:#f3efe6;padding:16px 18px;overflow-x:auto;font:12.5px/1.45 ui-monospace,Menlo,monospace;border-radius:4px}
pre code{background:none;padding:0;color:inherit;word-break:normal}
.wide table{font-size:.8rem}.tw{overflow-x:auto;max-width:100%;margin:16px 0 22px;border:1px solid var(--line);background:#fff}
table{border-collapse:collapse;width:100%;font-size:.9rem;line-height:1.45}
th,td{text-align:left;vertical-align:top;padding:9px 12px;border-bottom:1px solid var(--line)}
th{font-weight:600;font-size:.74rem;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);background:var(--sand);white-space:nowrap}
tr:last-child td{border-bottom:0}td:first-child{font-weight:500}
.label{font:600 .72rem/1 "Inter Tight",sans-serif;letter-spacing:.18em;text-transform:uppercase;color:var(--mute);margin:0 0 10px}
.toc{margin:30px 0 8px;padding:20px 22px;background:#fff;border:1px solid var(--line)}
.toc ol{columns:2;column-gap:32px;margin:0;padding-left:1.3em;font-size:.93rem}.toc li{break-inside:avoid}
@media(max-width:600px){.toc ol{columns:1}main{padding-top:32px}}
.brand{display:flex;align-items:center;gap:10px;font:500 .95rem "Inter Tight";letter-spacing:.34em;text-transform:uppercase;margin-bottom:40px}
.brand svg{width:20px;height:20px}
@page{size:A4;margin:16mm 14mm}
@media print{body{background:#fff;font-size:10.5pt}main{max-width:none;padding:0}h2{break-after:avoid;margin-top:34px}h3,h4{break-after:avoid}
 tr,pre,li{break-inside:avoid}.keep{break-inside:avoid}th,td{padding:6px 10px}h1{margin-bottom:10px}.brand{margin-bottom:22px}td,th{overflow-wrap:break-word;word-break:normal}p:has(+ .tw),p:has(+ pre),p:has(+ ul),p:has(+ ol){break-after:avoid}.wide table{font-size:7pt;table-layout:fixed}.wide th,.wide td{padding:5px 4px}.wide th{font-size:6pt;letter-spacing:0}.wide th:first-child,.wide td:first-child{width:27%}.tw{overflow:visible;border-color:#ccc}table{font-size:8.6pt}th{white-space:normal}pre{font-size:7.4pt;white-space:pre-wrap}a{text-decoration:none}}
</style></head><body><main>
<div class="brand"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 12h21M12 1.5c3.4 3 3.4 18 0 21M12 1.5c-3.4 3-3.4 18 0 21" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>Earth</div>
${body.replace("</h1>", "</h1>\n" + "%%TOC%%").replace("%%TOC%%", "")}
</main></body></html>`;
// place TOC after the first table (the document header table)
const withToc = toc.length >= 4 ? html.replace(/(<\/table><\/div>)/, `$1\n${tocHtml}`) : html;
writeFileSync(OUT_HTML, withToc);
console.log("html", withToc.length, "bytes;", toc.length, "sections");
if (!OUT_PDF) process.exit(0);
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; const port = 9340;
const chrome = spawn(CH, ["--headless=new","--disable-gpu","--no-first-run",`--remote-debugging-port=${port}`,`--user-data-dir=${process.cwd()}/ud`,"about:blank"],{stdio:"ignore"});
const sleep = ms => new Promise(r=>setTimeout(r,ms));
let target; for (let i=0;i<40;i++){ try { const l = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); target = l.find(t=>t.type==="page"); if (target) break; } catch{} await sleep(250); }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pend={}; ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id&&pend[m.id]){pend[m.id](m);delete pend[m.id];}};
const send=(method,params={})=>new Promise(res=>{const i=++id;pend[i]=res;ws.send(JSON.stringify({id:i,method,params}));});
await send("Page.enable"); await send("Page.navigate",{url:"file://"+OUT_HTML}); await sleep(3500);
const r = await send("Page.printToPDF",{printBackground:true,preferCSSPageSize:true,displayHeaderFooter:true,
  headerTemplate:"<span></span>",
  footerTemplate:'<div style="font:7pt sans-serif;color:#888;width:100%;padding:0 14mm;display:flex;justify-content:space-between"><span>Earth · Product Requirements · v3.0 · Confidential</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'});
writeFileSync(OUT_PDF, Buffer.from(r.result.data,"base64")); console.log("pdf written");
ws.close(); chrome.kill(); process.exit(0);
