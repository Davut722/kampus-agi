import codecs
with codecs.open('js/app.js', 'r', 'utf-8') as f:
    lines = f.readlines()
new_lines = []
skip = False
for line in lines:
    if 'Global Mouse Glow Effect' in line:
        skip = True
        new_lines.append('// Vanta.js Background\n')
        new_lines.append('''document.addEventListener('DOMContentLoaded', () => {
    if (typeof VANTA !== 'undefined') {
        VANTA.WAVES({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x111111,
            shininess: 20,
            waveHeight: 10,
            waveSpeed: 0.5,
            zoom: 1.2
        });
    }
});
''')
    if not skip:
        new_lines.append(line)
with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.writelines(new_lines)
