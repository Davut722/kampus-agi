import codecs

with codecs.open('js/app.js', 'r', 'utf-8') as f:
    js = f.read()

# Fix missing backticks in innerHTML
broken_html = '''        overlay.innerHTML = 
            <div class="blog-expanded-card" id="blog-detail-container">
                <button class="blog-expanded-close"><i data-lucide="x"></i></button>
                <div class="blog-expanded-content" style="margin-top:20px;"></div>
            </div>
        ;'''
fixed_html = '''        overlay.innerHTML = 
            <div class="blog-expanded-card" id="blog-detail-container">
                <button class="blog-expanded-close"><i data-lucide="x"></i></button>
                <div class="blog-expanded-content" style="margin-top:20px;"></div>
            </div>
        ;'''
js = js.replace(broken_html, fixed_html)

# Fix extra trailing bracket
if js.strip().endswith('}\n}'):
    js = js[:js.rfind('}')].strip() + '\n'

with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.write(js)
