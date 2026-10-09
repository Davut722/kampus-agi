import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

html = html.replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>', '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.min.js"></script>')

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)
