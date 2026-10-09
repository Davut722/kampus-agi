import codecs
import re

# 1. Update CSS
with codecs.open('css/style.css', 'r', 'utf-8') as f:
    css = f.read()

flip_css = """
/* ========================================
   MINIMAL CARDS ANIMATION & MORPHING
   ======================================== */
.minimal-card {
  cursor: pointer;
}
.minimal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme="light"] .minimal-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}

.blog-expanded-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    z-index: 9990;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}
.blog-expanded-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.blog-expanded-card {
    background: var(--color-bg-card);
    width: 90%;
    max-width: 800px;
    height: 80vh;
    border-radius: 20px;
    position: relative;
    padding: 40px;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    z-index: 9991;
    display: none;
}

.blog-expanded-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: 1px solid var(--color-border);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text);
    cursor: pointer;
    transition: background 0.2s;
}
.blog-expanded-close:hover {
    background: rgba(255,255,255,0.1);
}
"""

css = re.sub(r'/\* ========================================\s*MINIMAL CARDS ANIMATION\s*======================================== \*/[\s\S]*?(?=\n/\*|$)', flip_css, css)

with codecs.open('css/style.css', 'w', 'utf-8') as f:
    f.write(css)

# 2. Update JS
with codecs.open('js/app.js', 'r', 'utf-8') as f:
    js = f.read()

flip_js = """        // Pin Search Bar
        const searchBox = document.querySelector('.hero-centered__search-wrapper');
        if (searchBox) {
            ScrollTrigger.create({
                trigger: searchBox,
                start: "top center",
                end: "+=350",
                pin: true,
                pinSpacing: false,
                scrub: true
            });
        }
    }
    
    // Blog Shared Layout Morphing
    const blogCards = document.querySelectorAll('.blog-card');
    let overlay = document.querySelector('.blog-expanded-overlay');
    
    if (!overlay && blogCards.length > 0) {
        if (typeof Flip === 'undefined') return;
        
        overlay = document.createElement('div');
        overlay.className = 'blog-expanded-overlay';
        overlay.innerHTML = 
            <div class="blog-expanded-card" id="blog-detail-container">
                <button class="blog-expanded-close"><i data-lucide="x"></i></button>
                <div class="blog-expanded-content" style="margin-top:20px;"></div>
            </div>
        ;
        document.body.appendChild(overlay);
        lucide.createIcons();
        
        overlay.querySelector('.blog-expanded-close').addEventListener('click', () => {
            const activeCard = document.querySelector('.blog-card.is-active');
            if (activeCard) {
                const detailContainer = document.querySelector('#blog-detail-container');
                const state = Flip.getState(detailContainer);
                activeCard.appendChild(detailContainer);
                overlay.classList.remove('active');
                activeCard.classList.remove('is-active');
                
                Flip.from(state, {
                    duration: 0.5,
                    ease: "power3.inOut",
                    onComplete: () => {
                        detailContainer.style.display = 'none';
                    }
                });
            }
        });
    }

    blogCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            if (typeof Flip === 'undefined') return;
            
            const detailContainer = document.querySelector('#blog-detail-container');
            detailContainer.style.display = 'block';
            
            const content = detailContainer.querySelector('.blog-expanded-content');
            content.innerHTML = card.innerHTML;
            
            const state = Flip.getState(card);
            
            overlay.appendChild(detailContainer);
            overlay.classList.add('active');
            card.classList.add('is-active');
            
            Flip.from(state, {
                duration: 0.6,
                ease: "power4.inOut",
                absolute: true,
                scale: true
            });
        });
    });
}"""

js = re.sub(r'        // Pin Search Bar[\s\S]*?\}\s*\}', flip_js, js)

with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.write(js)
