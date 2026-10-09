import codecs

with codecs.open('js/app.js', 'r', 'utf-8') as f:
    js = f.read()

import re

new_gsap_func = """export function initGSAPHome() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector('.home-hero-centered');
    if (hero) {
        // Parallax effect on hero title and subtitle
        gsap.to('.hero-centered__title, .hero-centered__desc', {
            y: 150,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: '.home-hero-centered',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Pin Search Bar
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
}"""

js = re.sub(r'export function initGSAPHome\(\) \{[\s\S]*', new_gsap_func, js)

with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.write(js)
