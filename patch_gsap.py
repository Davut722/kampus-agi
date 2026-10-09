import codecs

with codecs.open('js/app.js', 'r', 'utf-8') as f:
    js = f.read()

target = "if (hamburger) hamburger.classList.remove('nav__hamburger--active');"
replacement = """if (hamburger) hamburger.classList.remove('nav__hamburger--active');
    
    // Call GSAP initialization if on home route
    if (route === 'home') {
        setTimeout(() => {
            if (typeof initGSAPHome === 'function') initGSAPHome();
        }, 100);
    }"""
js = js.replace(target, replacement)

gsap_code = """

// GSAP ScrollTrigger for Home Parallax & Search Pin
export function initGSAPHome() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector('.hero');
    if (hero) {
        // Parallax effect on hero title and subtitle
        gsap.to('.hero__title, .hero__subtitle', {
            y: 150,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Pin Search Bar
        const searchBox = document.querySelector('.search-box-container');
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
}
"""

js += gsap_code

with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.write(js)
