#!/usr/bin/env python3
"""Builds the ShunyaHQ letterhead HTML files (A4 + US Letter, placeholder + blank)."""

import base64
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
REPO = pathlib.Path("/Users/nirajjha/Documents/niraj/shunyahq")


def b64(path):
    return base64.b64encode(pathlib.Path(path).read_bytes()).decode()


FONT_400 = b64(REPO / "lib/fonts/BricolageGrotesque-400.ttf")
FONT_700 = b64(REPO / "lib/fonts/BricolageGrotesque-700.ttf")
LOGO = b64(REPO / "public/shunyahq-icon-512.png")

PAGES = {
    "a4": {"css": "A4", "w": "210mm", "h": "297mm", "px": "20mm"},
    "letter": {"css": "letter", "w": "215.9mm", "h": "279.4mm", "px": "22mm"},
}

TEMPLATE = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ShunyaHQ Letterhead</title>
<style>
@font-face {
  font-family: "Bricolage Grotesque";
  font-weight: 400;
  font-style: normal;
  src: url(data:font/ttf;base64,__FONT400__) format("truetype");
}
@font-face {
  font-family: "Bricolage Grotesque";
  font-weight: 700;
  font-style: normal;
  src: url(data:font/ttf;base64,__FONT700__) format("truetype");
}

:root {
  --ink: #1A1A18;
  --ink-2: #3A3A36;
  --ink-3: #6E6F66;
  --ink-4: #9A9B91;
  --line: #E5E2D7;
  --cream: #F6F4EE;
  --cream-2: #F1EFE7;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

@page {
  size: __PAGESIZE__;
  margin: 0;
}

html, body {
  background: #FFFFFF;
  font-family: "Bricolage Grotesque", "Helvetica Neue", Arial, sans-serif;
  color: var(--ink-2);
  -webkit-font-smoothing: antialiased;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.sheet {
  position: relative;
  width: __PAGEW__;
  height: __PAGEH__;
  padding: 17mm __PAGEPX__ 15mm __PAGEPX__;
  background: #FFFFFF;
  overflow: hidden;
  page-break-after: always;
  display: flex;
  flex-direction: column;
}
.sheet:last-child { page-break-after: auto; }

/* ── full-bleed edge bars ───────────────────────────────── */
.bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 4mm;
  background: linear-gradient(90deg, var(--ink) 0 64mm, var(--line) 64mm 100%);
}
.bar--top { top: 0; }
.bar--bottom {
  bottom: 0;
  height: 3mm;
  background: linear-gradient(90deg, var(--line) 0 calc(100% - 64mm), var(--ink) calc(100% - 64mm) 100%);
}

/* ── masthead ───────────────────────────────────────────── */
.masthead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12mm;
}

.brand { display: flex; align-items: center; gap: 4.5mm; }

.mark {
  width: 13mm;
  height: 13mm;
  border-radius: 3.2mm;
  display: block;
}

.wordmark {
  font-weight: 700;
  font-size: 19pt;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--ink);
}

.tagline {
  margin-top: 1.8mm;
  font-size: 6.6pt;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.contact {
  text-align: right;
  padding-top: 1mm;
  line-height: 1.55;
}
.contact .label {
  display: block;
  font-size: 6.2pt;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin-bottom: 0.6mm;
}
.contact .value {
  display: block;
  font-size: 8.6pt;
  color: var(--ink-2);
}
.contact .value--strong {
  font-weight: 700;
  color: var(--ink);
}
.contact .group + .group { margin-top: 2.6mm; }

/* ── rules ──────────────────────────────────────────────── */
.rule {
  position: relative;
  height: 0.35mm;
  background: var(--line);
  margin-top: 7mm;
}
.rule::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 22mm;
  height: 0.9mm;
  background: var(--ink);
}

/* ── letter body ────────────────────────────────────────── */
.body {
  flex: 1;
  padding-top: 11mm;
  font-size: 10.2pt;
  line-height: 1.72;
  color: var(--ink-2);
}

.body p { margin-bottom: 5.2mm; }
.body p:last-child { margin-bottom: 0; }

.date { margin-bottom: 9mm; color: var(--ink-3); }

.recipient {
  margin-bottom: 8mm;
  line-height: 1.6;
}

.subject {
  margin-bottom: 7mm;
  font-weight: 700;
  color: var(--ink);
}
.subject .kicker {
  display: block;
  font-size: 6.4pt;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-4);
  margin-bottom: 1.6mm;
}

.salutation { margin-bottom: 5.2mm; }

.signoff { margin-top: 9mm; }
.sig-space { height: 17mm; }
.sig-name {
  font-weight: 700;
  color: var(--ink);
  font-size: 10.2pt;
}
.sig-meta {
  font-size: 9pt;
  color: var(--ink-3);
  line-height: 1.55;
}

/* placeholder tokens - replace these, then delete the highlight */
.ph {
  background: var(--cream-2);
  color: var(--ink-3);
  padding: 0.3mm 0.9mm;
  border-radius: 1mm;
}

.hint {
  color: var(--ink-4);
  font-style: normal;
}

/* ── footer ─────────────────────────────────────────────── */
.footer {
  margin-top: 10mm;
  padding-top: 3.5mm;
  border-top: 0.35mm solid var(--line);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 7.4pt;
  letter-spacing: 0.08em;
  color: var(--ink-4);
  text-transform: uppercase;
}
.footer .dot { color: var(--ink-5, #C4C2B6); padding: 0 1.6mm; }

/* ── continuation sheet ─────────────────────────────────── */
.cont-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10mm;
}
.cont-head .brand { gap: 3.4mm; }
.cont-head .mark { width: 8.5mm; height: 8.5mm; border-radius: 2.1mm; }
.cont-head .wordmark { font-size: 12.5pt; }
.cont-meta {
  font-size: 7.4pt;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-4);
  text-align: right;
}

/* blank variant - chrome only, no placeholder copy */
body.blank .placeholders { display: none; }
</style>
</head>
<body class="__BODYCLASS__">

<!-- ══════════ PAGE 1 · LETTERHEAD ══════════ -->
<section class="sheet">
  <div class="bar bar--top"></div>

  <header class="masthead">
    <div class="brand">
      <img class="mark" src="data:image/png;base64,__LOGO__" alt="ShunyaHQ">
      <div>
        <div class="wordmark">ShunyaHQ</div>
        <div class="tagline">Software Engineering Studio</div>
      </div>
    </div>

    <div class="contact">
      <div class="group">
        <span class="label">Web</span>
        <span class="value value--strong">shunyatech.net</span>
      </div>
      <div class="group">
        <span class="label">Email</span>
        <span class="value">jhaniraj45@gmail.com</span>
      </div>
    </div>
  </header>

  <div class="rule"></div>

  <div class="body">
    <div class="placeholders">
      <p class="date"><span class="ph">[Month DD, YYYY]</span></p>

      <p class="recipient">
        <span class="ph">[Client Full Name]</span><br>
        <span class="ph">[Title]</span><br>
        <span class="ph">[Company Name]</span><br>
        <span class="ph">[Street Address]</span><br>
        <span class="ph">[City, State ZIP]</span>
      </p>

      <p class="subject">
        <span class="kicker">Subject</span>
        <span class="ph">[Project Name]</span> &nbsp;-&nbsp; <span class="ph">[Purpose of this letter]</span>
      </p>

      <p class="salutation">Dear <span class="ph">[Client Name],</span></p>

      <p><span class="hint">[Opening - one sentence on why you are writing and what this letter covers. Name the project and the date it starts or the document it accompanies.]</span></p>

      <p><span class="hint">[Detail - the scope, the terms, or the update. Two to four sentences. Be specific about what is included, who is responsible, and what it costs or how long it takes.]</span></p>

      <p><span class="hint">[Close - the single next step you need from the reader, with a date. Make it easy to say yes to.]</span></p>

      <div class="signoff">
        <p>Sincerely,</p>
        <div class="sig-space"></div>
        <div class="sig-name"><span class="ph">[Your Name]</span></div>
        <div class="sig-meta">
          <span class="ph">[Title]</span> &nbsp;·&nbsp; ShunyaHQ<br>
          jhaniraj45@gmail.com
        </div>
      </div>
    </div>
  </div>

  <footer class="footer">
    <span>shunyatech.net</span>
    <span>Page 1</span>
  </footer>

  <div class="bar bar--bottom"></div>
</section>

<!-- ══════════ PAGE 2 · CONTINUATION SHEET ══════════ -->
<section class="sheet">
  <div class="bar bar--top"></div>

  <header class="cont-head">
    <div class="brand">
      <img class="mark" src="data:image/png;base64,__LOGO__" alt="ShunyaHQ">
      <div class="wordmark">ShunyaHQ</div>
    </div>
    <div class="cont-meta">
      <span class="ph">[Client Name]</span> &nbsp;·&nbsp; <span class="ph">[Date]</span> &nbsp;·&nbsp; Page 2
    </div>
  </header>

  <div class="rule"></div>

  <div class="body">
    <div class="placeholders">
      <p><span class="hint">[Continuation - carry the letter over onto this sheet. Keep the same margins so the two pages read as one document.]</span></p>
      <p><span class="hint">[Paragraph]</span></p>
      <p><span class="hint">[Paragraph]</span></p>
    </div>
  </div>

  <footer class="footer">
    <span>shunyatech.net</span>
    <span>Page 2</span>
  </footer>

  <div class="bar bar--bottom"></div>
</section>

</body>
</html>
"""


def build():
    for key, cfg in PAGES.items():
        for variant, cls in (("filled", ""), ("blank", "blank")):
            html = (
                TEMPLATE.replace("__FONT400__", FONT_400)
                .replace("__FONT700__", FONT_700)
                .replace("__LOGO__", LOGO)
                .replace("__PAGESIZE__", cfg["css"])
                .replace("__PAGEW__", cfg["w"])
                .replace("__PAGEH__", cfg["h"])
                .replace("__PAGEPX__", cfg["px"])
                .replace("__BODYCLASS__", cls)
            )
            out = ROOT / f"src-{key}-{variant}.html"
            out.write_text(html)
            print("wrote", out.name, f"{out.stat().st_size // 1024}KB")


if __name__ == "__main__":
    build()
