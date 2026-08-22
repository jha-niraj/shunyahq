# ShunyaHQ Letterhead

Brand-matched letterhead built from the site design system: Bricolage Grotesque, ink `#1A1A18`,
rule `#E5E2D7`, cream `#F1EFE7`. Single sheet - one page per PDF.

Contact block: `shunyatech.net` · Naxal, Kathmandu. No email on the sheet.
Signed off by Niraj Kumar Jha, Founder & CEO.

## Files

| File | Use it for |
| --- | --- |
| `ShunyaHQ-Letterhead-A4.pdf` | A4, with placeholder letter copy. **Import this into Canva.** |
| `ShunyaHQ-Letterhead-A4-Blank.pdf` | A4, header + footer only. Print stock / typing straight into Word. |
| `ShunyaHQ-Letterhead-USLetter.pdf` | 8.5 x 11in, with placeholder copy (use for US clients). |
| `ShunyaHQ-Letterhead-USLetter-Blank.pdf` | 8.5 x 11in, header + footer only. |
| `ShunyaHQ-Letterhead-A4-Blank-300dpi.png` | 2481 x 3509px background image - Canva fallback. |
| `ShunyaHQ-Letterhead-USLetter-Blank-300dpi.png` | 2550 x 3300px background image - Canva fallback. |
| `preview-a4.png`, `preview-blank.png` | Quick on-screen previews. |
| `src-*.html`, `build.py` | Source. Edit and re-render if the brand details change. |

## Editing in Canva

1. Canva home → **Create a design → Import file** → pick `ShunyaHQ-Letterhead-A4.pdf`.
   Choose **"Edit as document/design"**, not "flatten".
2. Canva converts every line into a real text box. Click a `[Placeholder]` chip, type over it,
   then clear the highlight: select the text → background/highlight colour → **none**.
3. Font: the PDF embeds **Bricolage Grotesque**. If Canva substitutes it, search
   "Bricolage Grotesque" in the font picker and re-apply - it is in Canva's library.
4. Keep the black top/bottom bars and the rule locked (right-click → Lock) so they do not
   drift while you type.
5. Export: **Share → Download → PDF Print**, with **crop marks off** and **flatten PDF off**
   so text stays selectable for the client.

**Fallback if the PDF import looks off:** create a blank A4 design, add
`ShunyaHQ-Letterhead-A4-Blank-300dpi.png` as the page background (Position → Backdrop), then lay
your own text boxes inside the margins.

## Layout specs (if you rebuild it anywhere else)

- Page margins: 20mm left/right, 17mm top, 15mm bottom (A4). 22mm sides on US Letter.
- Top bar: 4mm, ink from the left edge to 64mm, then the hairline colour. Bottom bar mirrors it.
- Wordmark 19pt/700, tracking -0.02em. Tagline 6.6pt, tracking 0.2em, uppercase.
- Body 10.2pt / 1.72 line height, `#3A3A36`.
- Signature space: 12mm clear for a scanned signature, with "Sincerely," 1.6mm above it.
- Signature block is pre-filled: **Niraj Kumar Jha** / Founder & CEO · ShunyaHQ.
- Header contact column is right-aligned: Web (bold), Address. Footer strip repeats the domain
  and the city in 7.4pt uppercase - no page number, since the sheet is a single page.

## Re-rendering after an edit

```bash
cd shunya-letterhead
python3 build.py            # regenerates the four src-*.html files

# print each to PDF with headless Chrome
render() {
  google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw \
    --print-to-pdf="$2" "file://$PWD/$1"
}
render src-a4-filled.html      ShunyaHQ-Letterhead-A4.pdf
render src-a4-blank.html       ShunyaHQ-Letterhead-A4-Blank.pdf
render src-letter-filled.html  ShunyaHQ-Letterhead-USLetter.pdf
render src-letter-blank.html   ShunyaHQ-Letterhead-USLetter-Blank.pdf

# then the PNGs
pdftoppm -png -r 300 -singlefile ShunyaHQ-Letterhead-A4-Blank.pdf      ShunyaHQ-Letterhead-A4-Blank-300dpi
pdftoppm -png -r 300 -singlefile ShunyaHQ-Letterhead-USLetter-Blank.pdf ShunyaHQ-Letterhead-USLetter-Blank-300dpi
pdftoppm -png -r 110 -singlefile ShunyaHQ-Letterhead-A4.pdf            preview-a4
pdftoppm -png -r 110 -singlefile ShunyaHQ-Letterhead-A4-Blank.pdf      preview-blank
```

`build.py` pulls the fonts and the logo straight out of the repo (`lib/fonts/`, `public/`), so it
runs from any checkout - there is no absolute path to fix.

## Word (.docx) versions

| File | Use it for |
| --- | --- |
| `ShunyaHQ-Letterhead-A4.docx` | A4 Word doc with the placeholder letter. |
| `ShunyaHQ-Letterhead-A4-Blank.docx` | A4 Word doc, chrome only - start typing. |
| `ShunyaHQ-Letterhead-USLetter.docx` | 8.5 x 11in with placeholder copy. |
| `ShunyaHQ-Letterhead-USLetter-Blank.docx` | 8.5 x 11in, chrome only. |

Built by `build_docx.py` from the two `*-Blank-300dpi.png` sheets. The art lives in the Word
**header** layer, anchored to the page, `behindDoc` and locked - so it repeats on every page,
sits behind the text, and cannot be dragged out of place while someone types. Page margins are
set to the safe area (59mm top, 25mm bottom, 20mm sides on A4 / 22mm on Letter), so anything
typed lands between the rule and the footer strip.

**Font:** the body text asks for Bricolage Grotesque. Install `lib/fonts/BricolageGrotesque-400.ttf`
and `-700.ttf` (double-click → Install) or Word substitutes a default. The header and footer art is
a raster image, so the wordmark is always correct regardless.

Regenerate with `python3 build_docx.py` (run `build.py` and re-render the PNGs first if the
brand details changed).
