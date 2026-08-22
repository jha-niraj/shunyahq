#!/usr/bin/env python3
"""Builds Word (.docx) letterheads from the rendered blank PNGs.

The letterhead art goes into the Word *header* layer, anchored to the page and flagged
behindDoc, so it repeats on every page, sits behind the text, and cannot be nudged while
someone types. The body is real editable Word text inside the safe area.

No third-party packages - a .docx is a zip of OOXML, written here by hand.
"""

import pathlib
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent

MM_TW = 56.6929          # twips per mm
MM_EMU = 36000           # EMU per mm

def tw(mm): return str(int(round(mm * MM_TW)))
def emu(mm): return str(int(round(mm * MM_EMU)))

# Safe area measured off the rendered sheets: chrome ends at 59mm, footer strip starts 25mm
# up from the foot. Sides match the PDF page padding.
PAGES = {
    "A4":       {"w": 210.0,   "h": 297.0,   "side": 20.0, "png": "ShunyaHQ-Letterhead-A4-Blank-300dpi.png"},
    "USLetter": {"w": 215.9,   "h": 279.4,   "side": 22.0, "png": "ShunyaHQ-Letterhead-USLetter-Blank-300dpi.png"},
}
TOP, BOTTOM = 59.0, 25.0

FONT = "Bricolage Grotesque"
INK, INK2, INK3, INK4 = "1A1A18", "3A3A36", "6E6F66", "9A9B91"

NS = (
  'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
  'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
  'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
  'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
  'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"'
)

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Default Extension="png" ContentType="image/png"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>
</Types>"""

ROOT_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""

DOC_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>
</Relationships>"""

HDR_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/letterhead.png"/>
</Relationships>"""

STYLES = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles {NS}>
<w:docDefaults><w:rPrDefault><w:rPr>
<w:rFonts w:ascii="{FONT}" w:hAnsi="{FONT}" w:cs="{FONT}"/>
<w:color w:val="{INK2}"/><w:sz w:val="20"/><w:szCs w:val="20"/>
</w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:after="295" w:line="413" w:lineRule="auto"/></w:pPr></w:pPrDefault>
</w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Header"><w:name w:val="header"/>
<w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:style>
</w:styles>"""


def header_xml(w_mm, h_mm):
    """The letterhead art, anchored to the page corner, full bleed, behind the text."""
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr {NS}>
<w:p><w:pPr><w:pStyle w:val="Header"/></w:pPr><w:r><w:drawing>
<wp:anchor distT="0" distB="0" distL="0" distR="0" simplePos="0" relativeHeight="0"
           behindDoc="1" locked="1" layoutInCell="0" allowOverlap="1">
  <wp:simplePos x="0" y="0"/>
  <wp:positionH relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionH>
  <wp:positionV relativeFrom="page"><wp:posOffset>0</wp:posOffset></wp:positionV>
  <wp:extent cx="{emu(w_mm)}" cy="{emu(h_mm)}"/>
  <wp:effectExtent l="0" t="0" r="0" b="0"/>
  <wp:wrapNone/>
  <wp:docPr id="1" name="Letterhead"/>
  <wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>
  <a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
    <pic:pic>
      <pic:nvPicPr><pic:cNvPr id="1" name="Letterhead"/><pic:cNvPicPr/></pic:nvPicPr>
      <pic:blipFill><a:blip r:embed="rId1"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>
      <pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{emu(w_mm)}" cy="{emu(h_mm)}"/></a:xfrm>
        <a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>
    </pic:pic>
  </a:graphicData></a:graphic>
</wp:anchor>
</w:drawing></w:r></w:p>
</w:hdr>"""


def para(runs, after=295, line=413):
    """runs: list of (text, {bold, color, sz, caps_spacing})."""
    out = [f'<w:p><w:pPr><w:spacing w:after="{after}" w:line="{line}" w:lineRule="auto"/></w:pPr>']
    for text, fmt in runs:
        rpr = ""
        if fmt.get("b"):        rpr += "<w:b/>"
        if fmt.get("color"):    rpr += f'<w:color w:val="{fmt["color"]}"/>'
        if fmt.get("sz"):       rpr += f'<w:sz w:val="{fmt["sz"]}"/>'
        if fmt.get("caps"):     rpr += '<w:caps/><w:spacing w:val="40"/>'
        br = "<w:br/>" if fmt.get("br") else ""
        text = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        out.append(f'<w:r><w:rPr>{rpr}</w:rPr><w:t xml:space="preserve">{text}</w:t>{br}</w:r>')
    out.append("</w:p>")
    return "".join(out)


def body_filled():
    P = {}
    ph = {"color": INK3}
    hint = {"color": INK4}
    b = []
    b.append(para([("[Month DD, YYYY]", ph)], after=510))
    b.append(para([("[Client Full Name]", dict(ph, br=True)), ("[Title]", dict(ph, br=True)),
                   ("[Company Name]", dict(ph, br=True)), ("[Street Address]", dict(ph, br=True)),
                   ("[City, State ZIP]", ph)], after=453, line=380))
    b.append(para([("Subject", {"color": INK4, "sz": "13", "caps": True})], after=90))
    b.append(para([("[Project Name]", {"b": True, "color": INK}), ("  -  ", {"b": True, "color": INK}),
                   ("[Purpose of this letter]", {"b": True, "color": INK})], after=397))
    b.append(para([("Dear ", {}), ("[Client Name],", ph)]))
    b.append(para([("[Opening - one sentence on why you are writing and what this letter covers. "
                    "Name the project and the date it starts or the document it accompanies.]", hint)]))
    b.append(para([("[Detail - the scope, the terms, or the update. Two to four sentences. Be specific "
                    "about what is included, who is responsible, and what it costs or how long it takes.]", hint)]))
    b.append(para([("[Close - the single next step you need from the reader, with a date. "
                    "Make it easy to say yes to.]", hint)], after=340))
    b.append(para([("Sincerely,", {})], after=91))
    b.append(para([("", {})], after=0, line=240))   # signature space
    b.append(para([("", {})], after=340, line=240))
    b.append(para([("Niraj Kumar Jha", {"b": True, "color": INK})], after=34, line=312))
    b.append(para([("Founder & CEO  ·  ShunyaHQ", {"color": INK3, "sz": "18"})], after=0, line=348))
    return "".join(b)


def body_blank():
    return para([("", {})], after=0)


def sect_pr(cfg):
    return (f'<w:sectPr>'
            f'<w:headerReference w:type="default" r:id="rId2"/>'
            f'<w:pgSz w:w="{tw(cfg["w"])}" w:h="{tw(cfg["h"])}"/>'
            f'<w:pgMar w:top="{tw(TOP)}" w:right="{tw(cfg["side"])}" w:bottom="{tw(BOTTOM)}" '
            f'w:left="{tw(cfg["side"])}" w:header="0" w:footer="0" w:gutter="0"/>'
            f'</w:sectPr>')


def build():
    for name, cfg in PAGES.items():
        png = (ROOT / cfg["png"]).read_bytes()
        for variant, body in (("", body_filled()), ("-Blank", body_blank())):
            doc = (f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
                   f'<w:document {NS}><w:body>{body}{sect_pr(cfg)}</w:body></w:document>')
            out = ROOT / f"ShunyaHQ-Letterhead-{name}{variant}.docx"
            with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
                z.writestr("[Content_Types].xml", CONTENT_TYPES)
                z.writestr("_rels/.rels", ROOT_RELS)
                z.writestr("word/document.xml", doc)
                z.writestr("word/_rels/document.xml.rels", DOC_RELS)
                z.writestr("word/styles.xml", STYLES)
                z.writestr("word/header1.xml", header_xml(cfg["w"], cfg["h"]))
                z.writestr("word/_rels/header1.xml.rels", HDR_RELS)
                z.writestr("word/media/letterhead.png", png)
            print("wrote", out.name, f"{out.stat().st_size // 1024}KB")


if __name__ == "__main__":
    build()
