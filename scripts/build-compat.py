"""Keep the self-contained Flow entry points in sync with the Modern layout rules."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BEGIN = '/* BEGIN GENERATED JELLYFIN 12 COMPATIBILITY */'
END = '/* END GENERATED JELLYFIN 12 COMPATIBILITY */'
compat = (ROOT/'CSS'/'ScyFlow-Jellyfin12.css').read_text(encoding='utf8').rstrip()
for name in ['ScyFlow-main.css', 'ScyFlow-oneliner.css', 'ScyFlow-oneliner-mobile.css', 'ScyFlow-Userstyle (for Stylus, etc).css']:
    file = ROOT/'CSS'/name
    raw = file.read_bytes()
    newline = '\r\n' if b'\r\n' in raw else '\n'
    original = raw.decode('utf8').replace('\r\n', '\n')
    base = original.split(BEGIN, 1)[0].rstrip()
    userstyle = name.startswith('ScyFlow-Userstyle')
    if userstyle and BEGIN not in original:
        assert base.endswith('}'), 'Missing @-moz-document closing brace'
        base = base[:-1].rstrip()
    # This missing delimiter made --primary-alt1 part of the preceding value.
    base = base.replace('--alt-accent-color-nontsp: #ffffffe0\n', '--alt-accent-color-nontsp: #ffffffe0;\n')
    updated = base+'\n\n'+BEGIN+'\n'+compat+'\n'+END+'\n'+('}\n' if userstyle else '')
    if updated != original:
        file.write_bytes(updated.replace('\n', newline).encode('utf8'))
