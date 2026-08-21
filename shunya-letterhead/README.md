# ShunyaHQ Letterhead

Brand-matched letterhead built from the site design system: Bricolage Grotesque, ink `#1A1A18`,
rule `#E5E2D7`, cream `#F1EFE7`. Two pages each - page 1 is the full letterhead, page 2 is the
continuation sheet for letters that run long.

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
4. Keep the black top/bottom bars and the two rules locked (right-click → Lock) so they do not
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
- Signature space: 17mm clear for a scanned signature.

## Re-rendering after an edit

```bash
python3 build.py            # regenerates the four src-*.html files
# then print each to PDF with headless Chrome:
"$HOME/.cache/puppeteer/chrome/mac_arm-152.0.7977.42/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing" \
  --headless --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw \
  --print-to-pdf="ShunyaHQ-Letterhead-A4.pdf" "file://$PWD/src-a4-filled.html"
```
