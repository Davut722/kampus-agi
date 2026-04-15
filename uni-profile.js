document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Intersection Observer for Scroll Animations (Fade in upwards)
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. About Section Toggle
    const aboutToggleBtn = document.getElementById('about-toggle-btn');
    const aboutExtended = document.getElementById('about-extended');

    if (aboutToggleBtn && aboutExtended) {
        aboutToggleBtn.addEventListener('click', () => {
            const isOpen = aboutExtended.classList.contains('is-open');
            if (isOpen) {
                aboutExtended.classList.remove('is-open');
                aboutToggleBtn.classList.remove('is-open');
                aboutToggleBtn.innerHTML = `Daha Fazla Oku <i data-lucide="chevron-down" class="icon-sm"></i>`;
            } else {
                aboutExtended.classList.add('is-open');
                aboutToggleBtn.classList.add('is-open');
                aboutToggleBtn.innerHTML = `Daha Az Göster <i data-lucide="chevron-up" class="icon-sm"></i>`;
            }
            lucide.createIcons(); // Re-render newly injected icons
        });
    }

    // 4. Dummy Comments Logic
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('profile-comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentStatus = document.getElementById('comment-status');
    const commentsCount = document.getElementById('comments-count');

    // Initial dummy data
    const dummyComments = [
        {
            name: "Ahmet Yılmaz",
            time: "2 saat önce",
            text: "Kampüs manzarası ve feribotla İstanbul'a ulaşımın kolaylığı harika. Ancak kışın rüzgarı gerçekten çok sert olabiliyor, sıkı giyinmek şart."
        },
        {
            name: "Zeynep Kaya",
            time: "1 gün önce",
            text: "Denizcilik fakültesinin imkanları çok iyi. Hocalarımız sektörden geliyor ve pratik eğitime önem veriyorlar. Tavsiye ederim."
        },
        {
            name: "Emre Can",
            time: "3 gün önce",
            text: "Kütüphane sınav haftaları dışında gayet sessiz ve yeterli. Şehir küçük ama öğrenci için ideal bir ortam sunuyor bence."
        }
    ];

    // Function to render single comment HTML
    function createCommentHTML(comment) {
        return `
            <div class="comment-item">
                <div class="comment-avatar">
                    <img src="https://api.dicebear.com/7.x/initials/svg?seed=${comment.name.substring(0, 2)}&backgroundColor=${['0284c7', 'f59e0b', '10b981', 'ec4899'][Math.floor(Math.random() * 4)]}" alt="${comment.name}">
                </div>
                <div class="comment-item__content">
                    <div class="comment-item__header">
                        <span class="comment-item__name">${comment.name}</span>
                        <span class="comment-item__time">${comment.time}</span>
                    </div>
                    <p class="comment-item__text">${comment.text}</p>
                </div>
            </div>
        `;
    }

    // Load initial comments
    if (commentsList) {
        commentsList.innerHTML = dummyComments.map(createCommentHTML).join('');
        commentsCount.textContent = `${dummyComments.length} Yorum`;
    }

    // Handle new comment submission
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = commentInput.value.trim();

            if (!text) return;

            // Simple visual loading state
            const submitBtn = commentForm.querySelector('.comment-submit-btn');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="icon-sm" style="animation: spin 1s linear infinite;"></i> Gönderiliyor...';
            submitBtn.disabled = true;
            lucide.createIcons();

            // Simulate network request
            setTimeout(() => {
                const newComment = {
                    name: "Sen",
                    time: "Şimdi",
                    text: text
                };

                // Add to list
                const commentHTML = createCommentHTML(newComment);
                commentsList.insertAdjacentHTML('afterbegin', commentHTML);

                // Update count
                const currentCount = parseInt(commentsCount.textContent);
                commentsCount.textContent = `${currentCount + 1} Yorum`;

                // Reset form
                commentInput.value = '';
                submitBtn.innerHTML = originalBtnHtml;
                submitBtn.disabled = false;
                lucide.createIcons();

                // Show success
                commentStatus.textContent = "Yorumunuz eklendi!";
                commentStatus.style.color = "var(--color-success)";
                setTimeout(() => { commentStatus.textContent = ""; }, 3000);

            }, 800);
        });
    }
});

// Add a simple spin animation for the loader icon dynamically if not exists
if (!document.getElementById('spin-keyframes')) {
    const style = document.createElement('style');
    style.id = 'spin-keyframes';
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}
