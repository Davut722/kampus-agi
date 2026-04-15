/* ========================================
   UNI-REVIEW — Shared JavaScript
   ======================================== */

import { auth, db } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    doc, 
    updateDoc, 
    deleteDoc, 
    arrayUnion,
    arrayRemove,
    getDocs,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

function getInitials(name) {
    if (!name) return 'MS';
    const words = name.split(' ');
    let initials = words[0][0].toUpperCase();
    if (words.length > 1) initials += words[words.length - 1][0].toUpperCase();
    return initials;
}

function checkProtected() {
    const protectedPages = ['profile.html', 'review-form.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (protectedPages.includes(currentPage) && currentPage !== 'index.html') {
        if (CURRENT_USER && CURRENT_USER.uid !== 'guest') return;
        window.location.href = 'login.html';
    }
}

// ─── Firebase Auth Wrapper ────────────────
window.signUpFirebase = async function(name, email, pass) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
};

window.signInFirebase = async function(email, pass) {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
};

window.signOutFirebase = async function() {
    await signOut(auth);
};

// ─── Mock Data ────────────────────────────
// Note: TURKISH_UNIVERSITIES is loaded globally via universities.js

const AVAILABLE_TAGS = [
    { id: 'kampus', label: '🏫 Kampüs', icon: '🏫' },
    { id: 'yemekhane', label: '🍽️ Yemekhane', icon: '🍽️' },
    { id: 'egitim', label: '📚 Eğitim', icon: '📚' },
    { id: 'kutuphane', label: '📖 Kütüphane', icon: '📖' },
    { id: 'sosyal', label: '🎉 Sosyal Hayat', icon: '🎉' },
    { id: 'ulasim', label: '🚌 Ulaşım', icon: '🚌' },
    { id: 'yurt', label: '🏠 Yurt Olanakları', icon: '🏠' },
];

let CURRENT_USER = { uid: 'guest', name: 'Misafir', initials: 'MS', email: '' };
let authStateResolved = false;

onAuthStateChanged(auth, (user) => {
    if (user) {
        CURRENT_USER = {
            uid: user.uid,
            name: user.displayName || user.email.split('@')[0],
            initials: getInitials(user.displayName || user.email.split('@')[0]),
            email: user.email
        };
        updateNavForUser(CURRENT_USER);
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === 'login.html') {
            window.location.href = 'index.html';
        }
    } else {
        CURRENT_USER = { uid: 'guest', name: 'Misafir', initials: 'MS', email: '' };
        updateNavForUser(null);
        checkProtected();
    }

    if (!authStateResolved) {
        authStateResolved = true;
        window.dispatchEvent(new Event('auth-ready'));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (CURRENT_USER.uid !== 'guest') {
        updateNavForUser(CURRENT_USER);
    } else {
        updateNavForUser(null);
        // Do NOT checkProtected() synchronously here, let onAuthStateChanged handle it
    }
});

function updateNavForUser(user) {
    const navLinks = document.querySelector('.nav__links');
    if (!navLinks) return;

    let authLinkLi = document.getElementById('nav-auth-link');
    if (!authLinkLi) {
        authLinkLi = document.createElement('li');
        authLinkLi.id = 'nav-auth-link';
        navLinks.appendChild(authLinkLi);
    }

    let themeToggleLi = document.getElementById('nav-theme-toggle');
    if (!themeToggleLi) {
        themeToggleLi = document.createElement('li');
        themeToggleLi.id = 'nav-theme-toggle';
        themeToggleLi.innerHTML = `
            <button id="theme-btn" style="background:transparent; border:none; color:var(--color-text); cursor:pointer; font-size:1.2rem; display:flex; align-items:center;" aria-label="Temayı Değiştir">
                <span id="theme-icon">🌞</span>
            </button>
        `;
        navLinks.insertBefore(themeToggleLi, authLinkLi);

        const themeBtn = document.getElementById('theme-btn');
        const themeIcon = document.getElementById('theme-icon');

        // Init theme from localStorage
        const savedTheme = localStorage.getItem('unireview_theme') || 'dark';
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
        }

        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('unireview_theme', 'light');
                themeIcon.textContent = '🌙';
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('unireview_theme', 'dark');
                themeIcon.textContent = '🌞';
            }
        });
    }

    // Hide protected links if not logged in
    const navAnchors = Array.from(navLinks.querySelectorAll('a'));
    const profileLink = navAnchors.find(a => a.getAttribute('href') === 'profile.html');
    const reviewLink = navAnchors.find(a => a.getAttribute('href') === 'review-form.html');

    if (user && user.uid !== 'guest') {
        authLinkLi.innerHTML = `<a href="#" id="logout-btn" class="nav__link" style="color: var(--color-danger); cursor: pointer;">Çıkış (${user.name})</a>`;

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    await window.signOutFirebase();
                    // onAuthStateChanged will handle redirect
                } catch(error) {
                    console.error("Çıkış hatası:", error);
                }
            });
        }
    } else {
        authLinkLi.innerHTML = `<a href="login.html" class="nav__link">Giriş Yap</a>`;
    }
}

// ─── State Management (Firestore Synced) ─────
let globalReviewsState = [];
let globalInteractionsState = {};

export function initFirebaseListeners(onInitCallback, onRefreshCallback) {
    let initialized = false;
    let reviewsReady = false;
    let interactionsReady = false;

    function checkAndInit() {
        if (reviewsReady && interactionsReady && !initialized) {
            initialized = true;
            try { if (onInitCallback) onInitCallback(); } catch(e) { console.error('Init error:', e); }
        } else if (initialized) {
            try { if (onRefreshCallback) onRefreshCallback(); } catch(e) { console.error('Refresh error:', e); }
        }
    }

    // Fallback: if Firebase doesn't respond in 8 seconds, init anyway with empty data
    const fallbackTimer = setTimeout(() => {
        if (!initialized) {
            reviewsReady = true;
            interactionsReady = true;
            checkAndInit();
        }
    }, 8000);

    try {
        const reviewsRef = collection(db, "reviews");
        onSnapshot(reviewsRef, (snapshot) => {
            const reviews = [];
            snapshot.forEach((docSnap) => {
                reviews.push({ id: docSnap.id, ...docSnap.data() });
            });
            globalReviewsState = reviews.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            reviewsReady = true;
            clearTimeout(fallbackTimer);
            checkAndInit();
        }, (err) => {
            console.error('Reviews snapshot error:', err);
            reviewsReady = true;
            checkAndInit();
        });

        const intsRef = collection(db, "interactions");
        onSnapshot(intsRef, (snapshot) => {
            const ints = {};
            snapshot.forEach((docSnap) => {
                ints[docSnap.id] = docSnap.data();
            });
            globalInteractionsState = ints;
            interactionsReady = true;
            checkAndInit();
        }, (err) => {
            console.error('Interactions snapshot error:', err);
            interactionsReady = true;
            checkAndInit();
        });
    } catch(e) {
        console.error('Firebase listener setup error:', e);
        reviewsReady = true;
        interactionsReady = true;
        clearTimeout(fallbackTimer);
        checkAndInit();
    }
}


function getSavedReviews() { return globalReviewsState; }

window.saveReview = async function(review) {
    if (!review.id) {
        review.timestamp = Date.now();
        await addDoc(collection(db, "reviews"), review);
    } else {
        const ref = doc(db, "reviews", String(review.id));
        await updateDoc(ref, review);
    }
}

window.removeSavedReview = async function(id) {
    await deleteDoc(doc(db, "reviews", String(id)));
}

// ─── Interaction Helpers (Likes/Dislikes) ─

/** Get current interactions */
function getInteractions() {
    return globalInteractionsState;
}

/** Save interactions to LocalStorage */
function saveInteractions(data) {
    globalInteractionsState = data;
    localStorage.setItem('unireview_interactions', JSON.stringify(globalInteractionsState));
}

/** Get score for a review id */
function getReviewScore(id) {
    const ints = getInteractions()[id] || { likes: [], dislikes: [] };
    return ints.likes.length - ints.dislikes.length;
}

window.toggleLike = async function (id) {
    if (CURRENT_USER.uid === 'guest') {
        window.location.href = 'login.html';
        return;
    }
    const userIdentifier = CURRENT_USER.name;
    const ref = doc(db, "interactions", String(id));
    
    const ints = getInteractions();
    const currentInt = ints[String(id)] || { likes: [], dislikes: [] };
    const isLiked = currentInt.likes.includes(userIdentifier);

    try {
        if (!ints[String(id)]) {
            await setDoc(ref, { likes: isLiked ? [] : [userIdentifier], dislikes: [] });
        } else {
            if (isLiked) {
                await updateDoc(ref, { likes: arrayRemove(userIdentifier) });
            } else {
                await updateDoc(ref, { 
                    likes: arrayUnion(userIdentifier),
                    dislikes: arrayRemove(userIdentifier)
                });
            }
        }
    } catch(e) { console.error(e); }
};

window.toggleDislike = async function (id) {
    if (CURRENT_USER.uid === 'guest') {
        window.location.href = 'login.html';
        return;
    }
    const userIdentifier = CURRENT_USER.name;
    const ref = doc(db, "interactions", String(id));
    
    const ints = getInteractions();
    const currentInt = ints[String(id)] || { likes: [], dislikes: [] };
    const isDisliked = currentInt.dislikes.includes(userIdentifier);

    try {
        if (!ints[String(id)]) {
            await setDoc(ref, { likes: [], dislikes: isDisliked ? [] : [userIdentifier] });
        } else {
            if (isDisliked) {
                await updateDoc(ref, { dislikes: arrayRemove(userIdentifier) });
            } else {
                await updateDoc(ref, { 
                    dislikes: arrayUnion(userIdentifier),
                    likes: arrayRemove(userIdentifier)
                });
            }
        }
    } catch(e) { console.error(e); }
};

// Optimistic UI Update Helper
function updateInteractionUI(id, data) {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (!card) return;

    const userIdentifier = CURRENT_USER.name;
    const isLiked = data.likes.includes(userIdentifier);
    const isDisliked = data.dislikes.includes(userIdentifier);

    const likeBtn = card.querySelector('.btn-interaction-like');
    const dislikeBtn = card.querySelector('.btn-interaction-dislike');

    if (likeBtn) {
        likeBtn.className = `btn-interaction btn-interaction-like ${isLiked ? 'btn-interaction--active-like' : ''}`;
        likeBtn.innerHTML = `👍 <span>${data.likes.length}</span>`;
    }
    if (dislikeBtn) {
        dislikeBtn.className = `btn-interaction btn-interaction-dislike ${isDisliked ? 'btn-interaction--active-dislike' : ''}`;
        dislikeBtn.innerHTML = `👎 <span>${data.dislikes.length}</span>`;
    }
}

// Event Delegation for Interactions
document.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.btn-interaction-like');
    if (likeBtn) {
        const id = likeBtn.dataset.id;
        window.toggleLike(id);
    }

    const dislikeBtn = e.target.closest('.btn-interaction-dislike');
    if (dislikeBtn) {
        const id = dislikeBtn.dataset.id;
        window.toggleDislike(id);
    }
});

// ─── Utility Functions ───────────────────

/** Get tag label from id */
function getTagLabel(tagId) {
    const tag = AVAILABLE_TAGS.find(t => t.id === tagId);
    return tag ? tag.label : tagId;
}

/** Render star rating HTML */
function renderStars(rating, interactive = false) {
    let html = `<div class="stars${interactive ? ' stars--interactive' : ''}">`;
    for (let i = 1; i <= 5; i++) {
        html += `<span class="stars__item${i <= rating ? ' stars__item--filled' : ''}" data-value="${i}">★</span>`;
    }
    html += '</div>';
    return html;
}

/** Render tag pills HTML */
function renderTags(tagIds) {
    return tagIds.map(id => `<span class="tag">${getTagLabel(id)}</span>`).join('');
}

window.submitReply = async function (e, reviewId) {
    e.preventDefault();
    if (CURRENT_USER.uid === 'guest') {
        window.location.href = 'login.html';
        return;
    }
    const form = e.target;
    const input = form.querySelector('input');
    const text = input.value.trim();
    if (!text) return;

    // Find the review by id globally
    const review = globalReviewsState.find(r => String(r.id) === String(reviewId));

    if (review) {
        const newReply = {
            user: CURRENT_USER.name,
            date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
            text: text
        };

        try {
            const ref = doc(db, "reviews", String(reviewId));
            await updateDoc(ref, {
                replies: arrayUnion(newReply)
            });
            showToast('✅ Yanıt eklendi!');
            form.reset();
        } catch(err) {
            console.error(err);
            showToast('❌ Yanıt eklenemedi!');
        }
    }
}

/** Render a single review card */
function renderReviewCard(review, options = {}) {
    const { showUni = false, showDelete = false } = options;
    const ints = getInteractions()[review.id] || { likes: [], dislikes: [] };
    const userIdentifier = CURRENT_USER.name;
    const isLiked = ints.likes.includes(userIdentifier);
    const isDisliked = ints.dislikes.includes(userIdentifier);

    // Process replies
    const replies = review.replies || [];
    let repliesHtml = '';
    if (replies.length > 0) {
        repliesHtml = `
            <div class="card__replies">
                ${replies.map(r => `
                    <div class="reply-item">
                        <div class="reply-item__header">
                            <span class="reply-item__user">${r.user}</span>
                            <span class="reply-item__date">${r.date}</span>
                        </div>
                        <div class="reply-item__text">${r.text}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    const replyFormHtml = CURRENT_USER.uid !== 'guest' ? `
        <form class="reply-form" data-review-id="${review.id}" onsubmit="window.submitReply(event, ${review.id})">
            <input type="text" class="form__input form__input--sm" placeholder="Yanıt yaz..." required>
            <button type="submit" class="btn btn--primary btn--sm">Gönder</button>
        </form>
    ` : `<div style="font-size:0.8rem; color: var(--color-text-muted); padding-top: 5px;">Yanıt yazmak için <a href="login.html">giriş yapın</a>.</div>`;

    return `
    <article class="card" data-id="${review.id}" data-tags="${review.tags.join(',')}">
      <div class="card__header">
        <a href="profile.html?user=${encodeURIComponent(review.user)}" class="card__user card__user--clickable">
          <div class="card__avatar">${review.initials}</div>
          <div>
            <div class="card__username">${review.user}</div>
            <div class="card__date">${review.date}</div>
          </div>
        </a>
        ${renderStars(review.rating)}
      </div>
      ${showUni ? `<div class="card__uni-name">📍 ${review.university}</div>` : ''}
      <div class="card__body">${review.text}</div>
      <div class="card__footer">
        <div class="card__tags">${renderTags(review.tags)}</div>
        <div class="card__actions">
            <div class="card__interactions">
                <button class="btn-interaction btn-interaction-like ${isLiked ? 'btn-interaction--active-like' : ''}" data-id="${review.id}">
                    👍 <span>${ints.likes.length}</span>
                </button>
                <button class="btn-interaction btn-interaction-dislike ${isDisliked ? 'btn-interaction--active-dislike' : ''}" data-id="${review.id}">
                    👎 <span>${ints.dislikes.length}</span>
                </button>
            </div>
            ${showDelete ? `<button class="btn btn--danger btn--sm" onclick="deleteReview('${review.id}')">🗑️ Sil</button>` : ''}
        </div>
      </div>
      <div class="card__thread">
        ${repliesHtml}
        ${replyFormHtml}
      </div>
    </article>
  `;
}

/** Show toast notification */
function showToast(message) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3200);
}


// ─── Navigation ───────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Hamburger toggle
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelector('.nav__links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav__links--open');
            // animate hamburger lines
            hamburger.classList.toggle('nav__hamburger--active');
        });
    }

    // Mark active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('nav__link--active');
        }
    });
});


// ─── University Meta ──────────────────────

const UNI_DETAILS = {
    'Orta Doğu Teknik Üniversitesi (ODTÜ)': {
        subtitle: 'Ankara, Türkiye · 1956\'dan beri eğitim',
        rank: 'Top 3',
        image: 'img/orta-dogu-teknik-universitesi.jpg',
        aboutShort: 'ODTÜ, Türkiye ve Orta Doğu ülkelerinin kalkınmalarına katkıda bulunmak amacı ile kurulan ve araştırma odaklı vizyonuyla öne çıkan devlet üniversitesidir.',
        aboutLong: 'Geniş ormanlık alanı ve Eymir Gölü\'nü barındıran Ankara yerleşkesi, öğrencilere benzersiz bir kampüs hayatı sunar. Güçlü mühendislik ve sosyal bilimler eğitimi, zengin kulüp kültürü ve uluslararası rekabetçi mezun ağıyla Türkiye\'nin en prestijli eğitim kurumlarındandır.',
        transport: [
            { from: 'İstanbul', type: 'YHT', icon: 'train', route: 'İstanbul - Ankara', duration: '~4 Saat 20 Dk' },
            { from: 'İzmir', type: 'Otobüs', icon: 'bus', route: 'İzmir - Ankara', duration: '~8 Saat' },
            { from: 'Eskişehir', type: 'YHT', icon: 'train', route: 'Eskişehir - Ankara', duration: '~1.5 Saat' }
        ]
    },
    'İstanbul Teknik Üniversitesi': {
        subtitle: 'İstanbul, Türkiye · 1773\'ten beri eğitim',
        rank: 'Top 5',
        image: 'img/i̇stanbul-teknik-universitesi.jpg',
        aboutShort: 'İTÜ, dünyanın en eski ve köklü teknik üniversitelerinden biri olarak mimarlık ve mühendislik alanlarında öncü konumdadır.',
        aboutLong: 'Maslak, Taşkışla, Maçka ve Gümüşsuyu gibi merkezi yerleşkelere yayılan İTÜ, öğrencilere İstanbul\'un kalbinde tarihi atmosferle harmanlanmış bir eğitim sunar. Güçlü sanayi işbirlikleri ve teknokentiyle inovasyon merkezidir.',
        transport: [
            { from: 'Ankara', type: 'YHT', icon: 'train', route: 'Ankara - İstanbul', duration: '~4 Saat 20 Dk' },
            { from: 'Bursa', type: 'Feribot', icon: 'ferry', route: 'Mudanya - Yenikapı', duration: '~1 Saat 45 Dk' },
            { from: 'Kocaeli', type: 'Tren', icon: 'train', route: 'İzmit - Söğütlüçeşme', duration: '~1 Saat 15 Dk' }
        ]
    },
    'Hacettepe Üniversitesi': {
        subtitle: 'Ankara, Türkiye · 1967\'den beri eğitim',
        rank: 'Top 5',
        image: 'img/hacettepe-universitesi.jpg',
        aboutShort: 'Hacettepe Üniversitesi, özellikle tıp ve sağlık bilimleri, mühendislik ve güzel sanatlar alanlarındaki başarılarıyla tanınan önde gelen araştırma üniversitesidir.',
        aboutLong: 'Sıhhiye ve Beytepe kampüsleriyle geniş bir öğrenci kitlesine hitap eder. Beytepe kampüsü doğayla iç içe yapısı ve geniş sosyal olanaklarıyla bilinirken tıp kampüsü şehrin merkezindedir.',
        transport: [
            { from: 'İstanbul', type: 'YHT', icon: 'train', route: 'YHT Gar - Kampüs Servisi', duration: '~4 Saat 20 Dk' },
            { from: 'Kırıkkale', type: 'Otobüs', icon: 'bus', route: 'AŞTİ - Kampüs Metro', duration: '~1 Şaat' }
        ]
    },
    'Boğaziçi Üniversitesi': {
        subtitle: 'İstanbul, Türkiye · 1863\'ten beri eğitim',
        rank: 'Top 3',
        image: 'img/bogazici-universitesi.jpg',
        aboutShort: 'Boğaziçi Üniversitesi, İstanbul Boğazı\'na hakim manzarası ve üstün eğitim kalitesiyle Türkiye\'nin en çok tercih edilen üniversitelerinden biridir.',
        aboutLong: 'Güney Kampüs\'ün tarihi binaları ve eşsiz manzarası öğrencilere muazzam bir ilham kaynağı olur. Özgürlükçü kampüs kültürü, İngilizce eğitim veren yetkin akademik kadrosu ve çok uluslu yapısıyla dikkat çeker.',
        transport: [
            { from: 'Ankara', type: 'YHT + Metro', icon: 'train', route: 'Söğütlüçeşme - Hisarüstü', duration: '~5 Saat' },
            { from: 'İzmir', type: 'Uçak + Metro', icon: 'plane', route: 'Sabiha Gökçen - Kampüs', duration: '~2.5 Saat' }
        ]
    },
    'Bandırma Onyedi Eylül Üniversitesi': {
        subtitle: 'Balıkesir, Türkiye · 2015\'ten beri eğitim',
        rank: 'Top 70',
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070',
        aboutShort: 'Bandırma Onyedi Eylül Üniversitesi (BANÜ), genişleyen kampüs alanları ve dinamik akademik kadrosuyla gelecek vaat eden bir devlet üniversitesidir.',
        aboutLong: 'Denizcilik, iktisat ve sağlık bilimleri gibi alanlarda öne çıkan BANÜ, Marmara Denizi kıyısında konumlanmasının avantajıyla öğrencilerine sakin ama aktif bir üniversite şehri deneyimi sunar.',
        transport: [
            { from: 'İstanbul', type: 'Feribot', icon: 'ferry', route: 'Yenikapı - Bandırma', duration: '~2.5 Saat' },
            { from: 'Bursa', type: 'Otobüs', icon: 'bus', route: 'Terminal - Bandırma', duration: '~1.5 Saat' },
            { from: 'İzmir', type: 'Tren', icon: 'train', route: 'Basmane - Bandırma (Mavi Tren)', duration: '~5.5 Saat' }
        ]
    },
    'Ankara Üniversitesi': {
        subtitle: 'Ankara, Türkiye · 1946\'dan beri eğitim',
        rank: 'Top 10',
        image: 'img/placeholder.jpg',
        aboutShort: 'Ankara Üniversitesi, Türkiye Cumhuriyeti\'nin ilk üniversitesi olma özelliği taşıyan köklü bir eğitim kurumudur.',
        aboutLong: 'Tandoğan, Cebeci ve Dışkapı gibi şehrin çeşitli merkezlerine yayılmış kampüsleriyle öğrencilere tam bir şehir üniversitesi deneyimi sunar. Hukuk, Siyasal Bilgiler ve Tıp alanlarında Türkiye\'nin en prestijli fakültelerinden bazılarına ev sahipliği yapar.',
        transport: [
            { from: 'İstanbul', type: 'YHT', icon: 'train', route: 'İstanbul - Ankara (YHT Garı)', duration: '~4.5 Saat' },
            { from: 'Konya', type: 'YHT', icon: 'train', route: 'Konya - Ankara', duration: '~1 Saat 50 Dk' },
            { from: 'Eskişehir', type: 'YHT', icon: 'train', route: 'Eskişehir - Ankara', duration: '~1.5 Saat' }
        ]
    },
    'Ege Üniversitesi': {
        subtitle: 'İzmir, Türkiye · 1955\'ten beri eğitim',
        rank: 'Top 10',
        image: 'img/ege-universitesi.jpg',
        aboutShort: 'Ege Üniversitesi, İzmir\'in Bornova ilçesinde yer alan, Türkiye\'nin en eski ve köklü üniversitelerinden biridir.',
        aboutLong: 'Geniş ve yaşaması keyifli Bornova yerleşkesi, öğrencilere hem kaliteli bir eğitim hem de renkli bir sosyal hayat sunar. Tıp, botanik ve ziraat alanlarında güçlü bir altyapıya sahiptir. Kampüs içerisinden geçen metro hattı sayesinde ulaşım son derece rahattır.',
        transport: [
            { from: 'Manisa', type: 'Otobüs', icon: 'bus', route: 'Manisa - İzmir (Bornova)', duration: '~45 Dk' },
            { from: 'Aydın', type: 'Tren', icon: 'train', route: 'Aydın - İzmir (Basmane) + Metro', duration: '~2.5 Saat' },
            { from: 'İstanbul', type: 'Uçak', icon: 'plane', route: 'Sabiha Gökçen - Adnan Menderes', duration: '~1 Saat' }
        ]
    },
    'Dokuz Eylül Üniversitesi': {
        subtitle: 'İzmir, Türkiye · 1982\'den beri eğitim',
        rank: 'Top 15',
        image: 'img/placeholder.jpg',
        aboutShort: 'Dokuz Eylül Üniversitesi, İzmir\'in çeşitli bölgelerine yayılmış kampüsleriyle çok yönlü ve köklü bir eğitim sunan bir devlet üniversitesidir.',
        aboutLong: 'Buca\'daki merkez yerleşkesinin yanı sıra Tınaztepe, İnciraltı ve Balçova gibi İzmir\'in dört bir yanına dağılmış fakülteleriyle bilinir. Güzel sanatlar, denizcilik ve tıp alanlarında Türkiye\'nin önde gelen akademik çalışmalarına imza atar.',
        transport: [
            { from: 'Balıkesir', type: 'Tren', icon: 'train', route: 'Balıkesir - İzmir (Basmane)', duration: '~3.5 Saat' },
            { from: 'Muğla', type: 'Otobüs', icon: 'bus', route: 'Muğla - İzmir Otogar', duration: '~3 Saat' },
            { from: 'Denizli', type: 'Tren', icon: 'train', route: 'Denizli - İzmir (Basmane)', duration: '~4 Saat' }
        ]
    },
    'Yıldız Teknik Üniversitesi (YTÜ)': {
        subtitle: 'İstanbul, Türkiye · 1911\'den beri eğitim',
        rank: 'Top 10',
        image: 'img/yildiz-teknik-universitesi.jpg',
        aboutShort: 'Yıldız Teknik Üniversitesi, İstanbul\'un en gözde mühendislik ve mimarlık eğitim kurumlarından biri olan tarihi bir araştırma üniversitesidir.',
        aboutLong: 'Tarihi Yıldız Kampüsü ve modern Davutpaşa Kampüsü olmak üzere iki ana yerleşkede eğitim verir. Öğrenciler tarihi miras ile modern teknolojiyi harmanlayan bir kampüs hayatı deneyimler, Teknopark imkanları ile güçlü bir staj ağına ulaşırlar.',
        transport: [
            { from: 'Kocaeli', type: 'Otobüs', icon: 'bus', route: 'İzmit - İstanbul (Esenler)', duration: '~2 Saat' },
            { from: 'Bursa', type: 'Feribot + Metro', icon: 'ferry', route: 'Mudanya - Eminönü - Davutpaşa', duration: '~2.5 Saat' },
            { from: 'Tekirdağ', type: 'Otobüs', icon: 'bus', route: 'Tekirdağ - İstanbul Otogar', duration: '~2.5 Saat' }
        ]
    },
    'Marmara Üniversitesi': {
        subtitle: 'İstanbul, Türkiye · 1883\'ten beri eğitim',
        rank: 'Top 15',
        image: 'img/placeholder.jpg',
        aboutShort: 'Marmara Üniversitesi, Türkiye\'nin en çok fakülteye sahip ve en geniş öğrenci tabanlı köklü devlet üniversitelerinden biridir.',
        aboutLong: 'İstanbul\'un Asya ve Avrupa yakalarına dağılmış kampüsleriyle ünlüdür; Göztepe Kampüsü ana merkez olmak üzere Recep Tayyip Erdoğan Külliyesi (Maltepe) gibi yeni yerleşkelere genişlemektedir. İktisat, İlahiyat, İletişim ve Tıp fakülteleri oldukça aktiftir.',
        transport: [
            { from: 'Ankara', type: 'YHT + Marmaray', icon: 'train', route: 'Ankara - Söğütlüçeşme', duration: '~4.5 Saat' },
            { from: 'Sakarya', type: 'Tren', icon: 'train', route: 'Adapazarı - Pendik - Göztepe', duration: '~2 Saat' },
            { from: 'Yalova', type: 'Feribot', icon: 'ferry', route: 'Yalova - Pendik + Metro', duration: '~1.5 Saat' }
        ]
    },
    'Bilkent Üniversitesi': {
        subtitle: 'Ankara, Türkiye · 1984\'ten beri eğitim',
        rank: 'Top 5',
        image: 'https://images.unsplash.com/photo-1549488344-c7823f99335a?auto=format&fit=crop&q=80&w=2070',
        aboutShort: 'Türkiye\'nin ilk vakıf üniversitesi olan İhsan Doğramacı Bilkent Üniversitesi, üst düzey eğitim standartları ve devasa kütüphanesi ile tanınır.',
        aboutLong: 'Dünya üniversite sıralamalarında Türkiye\'yi başarıyla temsil eden Bilkent, Bilkent Cyberpark ile öğrencilerine uluslararası kariyere giden yolda büyük destek sağlar. Kampüsteki sanatsal ve kültürel etkinlikler, Bilkent Senfoni Orkestrası ile taçlanmaktadır.',
        transport: [
            { from: 'Eskişehir', type: 'YHT', icon: 'train', route: 'Eskişehir - Ankara + Servis', duration: '~1.5 Saat' },
            { from: 'İstanbul', type: 'Uçak', icon: 'plane', route: 'İstanbul (IST) - Ankara (ESB)', duration: '~1 Saat' }
        ]
    },
    'Koç Üniversitesi': {
        subtitle: 'İstanbul, Türkiye · 1993\'ten beri eğitim',
        rank: 'Top 3',
        image: 'https://images.unsplash.com/photo-1579970420790-2aa4057e0e78?auto=format&fit=crop&q=80&w=2070',
        aboutShort: 'Koç Üniversitesi, İstanbul\'un kuzeyinde Sarıyer\'de geniş bir orman arazisinde eğitim veren, araştırma ve inovasyon odaklı prestijli bir vakıf üniversitesidir.',
        aboutLong: 'Türkiye\'nin en parlak öğrencilerini bir araya getiren kurum, liberal art eğitim modeli, düşük öğrenci/öğretim üyesi oranı ve benzersiz burs imkanlarıyla donatılmıştır. Çapraz disiplin araştırmalarına ve global işbirliklerine çok önem verilir.',
        transport: [
            { from: 'İzmir', type: 'Uçak + Metro', icon: 'plane', route: 'İzmir (ADB) - İst (IST) - Sarıyer', duration: '~3 Saat' },
            { from: 'Kocaeli', type: 'Otobüs + Metro', icon: 'bus', route: 'İzmit - Hacıosman + Kampüs Servisi', duration: '~2.5 Saat' }
        ]
    }
};

const GENERIC_UNI_DATA = {
    subtitle: 'Türkiye',
    rank: '—',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070',
    aboutShort: 'Alanında önde gelen ve yenilikçi eğitim vizyonuyla dikkat çeken saygın bir yükseköğretim kurumudur.',
    aboutLong: 'Modern yerleşkeleri, gelişmiş laboratuvarları ve geniş kütüphanesiyle öğrencilere zengin bir araştırma ve sosyal yaşam ortamı sunar. Sektör odaklı staj olanakları, uluslararası öğrenci değişim programları ve aktif öğrenci kulüpleri ile akademik başarının yanında sosyal becerilerin gelişimini de destekler.',
    transport: [
        { from: 'Merkez', type: 'Belediye Otobüsü', icon: 'bus', route: 'Merkez Otogar - Kampüs', duration: '~30 Dk' }
    ]
};

// Extra mock reviews integrated above


// ─── Global Reviews Helper ────────────────
/** Get all unique reviews globally across the app */
function getAllReviewsGlobal() {
    return getSavedReviews();
}

// ─── Custom Select Helper ────────────────

function initCustomSelect(containerId, optionsList, onSelectCallback, initialValue = '') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const trigger = container.querySelector('.custom-select__trigger');
    const triggerText = container.querySelector('.custom-select__text');
    const searchInput = container.querySelector('.custom-select__search');
    const optionsContainer = container.querySelector('.custom-select__options');

    let selectedValue = initialValue;

    if (initialValue) {
        triggerText.textContent = initialValue;
        triggerText.style.color = 'var(--color-text)';
    }

    function renderOptions(query = '') {
        const lowerQuery = query.toLowerCase();
        const filtered = optionsList.filter(o => o.toLowerCase().includes(lowerQuery));

        if (filtered.length === 0) {
            optionsContainer.innerHTML = '<li class="custom-select__no-results">Sonuç bulunamadı</li>';
            return;
        }

        optionsContainer.innerHTML = filtered.map(opt => `
            <li class="custom-select__option ${opt === selectedValue ? 'selected' : ''}" data-value="${opt}">
                ${opt}
            </li>
        `).join('');

        // Attach clicks
        optionsContainer.querySelectorAll('.custom-select__option').forEach(li => {
            li.addEventListener('click', (e) => {
                selectedValue = li.dataset.value;
                triggerText.textContent = selectedValue;
                triggerText.style.color = 'var(--color-text)';
                container.classList.remove('open');
                if (onSelectCallback) onSelectCallback(selectedValue);
            });
        });
    }

    trigger.addEventListener('click', () => {
        const isOpen = container.classList.contains('open');
        document.querySelectorAll('.custom-select.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) {
            container.classList.add('open');
            renderOptions(); // Reset list
            searchInput.value = '';
            setTimeout(() => searchInput.focus(), 100);
        }
    });

    searchInput.addEventListener('input', (e) => {
        renderOptions(e.target.value);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            container.classList.remove('open');
        }
    });

    renderOptions();
}

// ─── University Detail Page (university.html) ──

function initUniversityPage() {
    const reviewsContainer = document.getElementById('reviews-container');
    const filterBar = document.getElementById('filter-bar');
    const heroTitle = document.getElementById('uni-hero-title');
    const heroSubtitle = document.getElementById('uni-hero-subtitle');

    if (!reviewsContainer) return;

    // All reviews pool (no local mock data - all from Firebase)
    const ALL_MOCK = [];

    // Default to the first one available or Boğaziçi
    let selectedUni = typeof TURKISH_UNIVERSITIES !== 'undefined' ?
        'Boğaziçi Üniversitesi' : 'Boğaziçi Üniversitesi';

    // Initialize custom select
    initCustomSelect('custom-uni-select', typeof TURKISH_UNIVERSITIES !== 'undefined' ? TURKISH_UNIVERSITIES : [], (newUni) => {
        selectedUni = newUni;
        updateHero();
        // Reset tag filter
        filterBar.querySelectorAll('.tag--filter').forEach(b => b.classList.remove('tag--active'));
        filterBar.querySelector('[data-filter="all"]').classList.add('tag--active');
        renderReviews('all');
    }, selectedUni);


    // Render filter buttons
    let filterHTML = `<button class="tag tag--filter tag--active" data-filter="all">🔖 Tümü</button>`;
    AVAILABLE_TAGS.forEach(tag => {
        filterHTML += `<button class="tag tag--filter" data-filter="${tag.id}">${tag.label}</button>`;
    });
    filterBar.innerHTML = filterHTML;

    // Get reviews for the selected university
    function getAllReviews() {
        const userReviews = getSavedReviews().filter(r => r.university === selectedUni);
        const mockReviews = ALL_MOCK.filter(r => r.university === selectedUni);
        return [...userReviews, ...mockReviews];
    }

    // Render review cards
    function renderReviews(filter = 'all') {
        const allReviews = getAllReviews();
        let filtered = filter === 'all'
            ? allReviews
            : allReviews.filter(r => r.tags.includes(filter));

        // Sort by popularity (likes - dislikes) descending
        filtered.sort((a, b) => {
            const scoreA = getReviewScore(a.id);
            const scoreB = getReviewScore(b.id);
            return scoreB - scoreA;
        });

        if (filtered.length === 0) {
            reviewsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <p>Bu üniversite/etiket için değerlendirme bulunamadı.</p>
        </div>
      `;
            updateStats(allReviews);
            return;
        }

        reviewsContainer.innerHTML = filtered.map(r => renderReviewCard(r)).join('');
        updateStats(allReviews);
    }

    async function fetchWikipediaImage(uniName) {
        try {
            const searchUrl = `https://tr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(uniName)}&utf8=&format=json&origin=*`;
            const searchRes = await fetch(searchUrl);
            const searchData = await searchRes.json();
            if (!searchData.query.search.length) return null;
            
            const title = searchData.query.search[0].title;
            const imgUrl = `https://tr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&origin=*`;
            const imgRes = await fetch(imgUrl);
            const imgData = await imgRes.json();
            const pages = imgData.query.pages;
            const pageId = Object.keys(pages)[0];
            
            if (!pages[pageId].pageimage) return null;
            const filename = pages[pageId].pageimage;
            
            const fileUrl = `https://tr.wikipedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
            const fileRes = await fetch(fileUrl);
            const fileData = await fileRes.json();
            const imgPages = fileData.query.pages;
            const imgPageId = Object.keys(imgPages)[0];
            
            return imgPages[imgPageId].imageinfo[0].url;
        } catch (e) {
            console.error("Wikipedia image fetch failed:", e);
            return null;
        }
    }

    // Update hero section and profile metadata
    function updateHero() {
        // Fetch specific or fallback data
        let details = UNI_DETAILS[selectedUni] ? { ...UNI_DETAILS[selectedUni] } : { ...GENERIC_UNI_DATA };

        // Inject dynamic Wikipedia image if available
        if (typeof UNI_IMAGES !== 'undefined' && UNI_IMAGES[selectedUni] && UNI_IMAGES[selectedUni] !== null) {
            // Only overwrite if it's not a locally downloaded image
            if (!details.image || details.image.includes('placeholder.jpg') || details.image.includes('images.unsplash.com')) {
                details.image = UNI_IMAGES[selectedUni];
            }
        }

        // Live fetch fallback if static map is missing it
        if ((!details.image || details.image.includes('placeholder.jpg') || details.image.includes('images.unsplash.com'))) {
            if (!window.FETCHED_IMAGES) window.FETCHED_IMAGES = {};
            if (window.FETCHED_IMAGES[selectedUni]) {
                details.image = window.FETCHED_IMAGES[selectedUni];
            } else {
                fetchWikipediaImage(selectedUni).then(url => {
                    const currentTitle = document.getElementById('uni-hero-title');
                    if(url && currentTitle && currentTitle.textContent === selectedUni) {
                        window.FETCHED_IMAGES[selectedUni] = url;
                        const heroImg = document.getElementById('hero-img');
                        const heroBlurImg = document.getElementById('hero-blur-img');
                        if(heroImg) heroImg.src = url;
                        if(heroBlurImg) heroBlurImg.src = url;
                    }
                });
            }
        }

        // 1. Update Title and Location
        const heroTitleEl = document.getElementById('uni-hero-title');
        const heroSubtitleEl = document.getElementById('uni-hero-subtitle');
        if (heroTitleEl) heroTitleEl.innerHTML = selectedUni;
        if (heroSubtitleEl) heroSubtitleEl.innerHTML = `<i data-lucide="map-pin" class="icon-sm"></i> ${details.subtitle}`;

        // 2. Update Image
        const heroImg = document.getElementById('hero-img');
        const heroBlurImg = document.getElementById('hero-blur-img');
        if (heroImg) {
            heroImg.src = details.image;
        }
        if (heroBlurImg) {
            heroBlurImg.src = details.image;
        }

        // 3. Update Text Content
        const textShort = document.getElementById('about-text-short');
        const textLong = document.getElementById('about-text-long');
        if (textShort) {
            textShort.textContent = typeof UNI_DETAILS[selectedUni] !== 'undefined' ? `${details.aboutShort}` : `${selectedUni}, ${details.aboutShort}`;
        }
        if (textLong) {
            textLong.textContent = details.aboutLong;
        }

        // 3.5 Update Official Website Button
        const websiteBtn = document.getElementById('uni-website-btn');
        if (websiteBtn) {
            let websiteUrl = null;
            if (typeof UNI_WEBSITES !== 'undefined' && UNI_WEBSITES[selectedUni]) {
                websiteUrl = UNI_WEBSITES[selectedUni];
            } else if (details.website) {
                websiteUrl = details.website;
            }

            if (websiteUrl) {
                websiteBtn.href = websiteUrl;
                websiteBtn.style.display = 'inline-flex';
            } else {
                websiteBtn.style.display = 'none';
            }
        }

        // 4. Update Transportation Cards based on structured array
        const transportGrid = document.getElementById('transport-grid');
        if (transportGrid) {
            let transportHTML = '';

            const routes = details.transport;
            routes.forEach(route => {
                // map icon to bg class
                let iconClass = 'is-bus';
                if (route.icon === 'train') iconClass = 'is-train';
                if (route.icon === 'ferry') iconClass = 'is-ferry';
                if (route.icon === 'plane') iconClass = 'is-ferry'; // Reuse blue for plane

                transportHTML += `
                    <div class="transport-card">
                        <div class="transport-card__icon-wrapper ${iconClass}">
                            <i data-lucide="${route.icon}"></i>
                        </div>
                        <div class="transport-card__info">
                            <h3 class="transport-card__route">${route.from} <i data-lucide="arrow-right" class="icon-xs"></i> Kampüs</h3>
                            <p class="transport-card__type"><strong style="color:var(--color-text); font-weight: 500;">${route.type}</strong> • ${route.route}</p>
                        </div>
                        <div class="transport-card__duration">
                            <i data-lucide="clock" class="icon-xs"></i>
                            <span>${route.duration}</span>
                        </div>
                    </div>
                `;
            });

            transportGrid.innerHTML = transportHTML;
        }

        // Reconnect icons logic since we injected them raw
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        const statRank = document.getElementById('stat-rank');
        if (statRank) statRank.textContent = details.rank;
    }

    // Initialize Page-Specific Logic (Animations & Toggles)
    function initProfileUI() {
        // 1. Intersection Observer for Scroll Animations
        const revealElements = document.querySelectorAll('.reveal-up');
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // 2. About Section Toggle
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
                if (typeof lucide !== 'undefined') lucide.createIcons();
            });
        }

        // 3. Dummy Comments Logic
        const commentForm = document.getElementById('profile-comment-form');
        const commentInput = document.getElementById('comment-input');
        const commentStatus = document.getElementById('comment-status');
        const commentsCount = document.getElementById('comments-count');

        // Handle new comment submission (Dummy local only for demo)
        if (commentForm) {
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = commentInput.value.trim();
                if (!text) return;

                const submitBtn = commentForm.querySelector('.comment-submit-btn');
                const originalBtnHtml = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i data-lucide="loader-2" class="icon-sm" style="animation: spin 1s linear infinite;"></i> Gönderiliyor...';
                if (typeof lucide !== 'undefined') lucide.createIcons();
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Update count artificially if present
                    if (commentsCount) {
                        const currentCountStr = commentsCount.textContent;
                        const match = currentCountStr.match(/\d+/);
                        if (match) {
                            const count = parseInt(match[0]) + 1;
                            commentsCount.textContent = `${count} Yorum`;
                        }
                    }

                    commentInput.value = '';
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.disabled = false;
                    if (typeof lucide !== 'undefined') lucide.createIcons();

                    commentStatus.textContent = "Yorumunuz eklendi!";
                    commentStatus.style.color = "var(--color-success)";

                    // Actually add it to the real reviews list to show up at the bottom
                    const saved = getSavedReviews();
                    const newRev = {
                        id: Date.now(),
                        user: CURRENT_USER.name,
                        initials: CURRENT_USER.initials,
                        university: selectedUni, // bind to current uni
                        date: 'Şimdi',
                        rating: 5, // default fake rating for quick comment
                        tags: ['genel'],
                        text: text
                    };
                    saved.unshift(newRev); // Add to top
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

                    // Re-render the reviews below
                    const activeFilter = filterBar.querySelector('.tag--active')?.dataset.filter || 'all';
                    renderReviews(activeFilter);

                    setTimeout(() => { commentStatus.textContent = ""; }, 3000);
                }, 800);
            });
        }
    }

    // Update stats
    function updateStats(reviews) {
        const statAvg = document.getElementById('stat-avg');
        const statCount = document.getElementById('stat-count');
        if (reviews.length > 0) {
            const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
            if (statAvg) statAvg.textContent = avg;
        } else {
            if (statAvg) statAvg.textContent = '—';
        }
        if (statCount) statCount.textContent = reviews.length;
    }

    renderReviews();
    updateHero();

    // Filter click handler
    filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.tag--filter');
        if (!btn) return;

        filterBar.querySelectorAll('.tag--filter').forEach(b => b.classList.remove('tag--active'));
        btn.classList.add('tag--active');
        renderReviews(btn.dataset.filter);
    });

    initProfileUI();

    // Return renderReviews so Firebase updates can re-render without full re-init
    return () => renderReviews();
}


// ─── Review Form Page ─────────────────────

function initReviewForm() {
    const form = document.getElementById('add-review-form');
    if (!form) return;

    const uniSelectHidden = document.getElementById('form-uni-hidden');

    // Initialize custom select
    initCustomSelect('custom-uni-select-form', typeof TURKISH_UNIVERSITIES !== 'undefined' ? TURKISH_UNIVERSITIES : [], (newUni) => {
        if (uniSelectHidden) uniSelectHidden.value = newUni;
    });

    // Render tag buttons
    const tagsContainer = document.getElementById('form-tags');
    const selectedTags = new Set();

    AVAILABLE_TAGS.forEach(tag => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tag tag--selectable';
        btn.dataset.tagId = tag.id;
        btn.textContent = tag.label;
        btn.addEventListener('click', () => {
            if (selectedTags.has(tag.id)) {
                selectedTags.delete(tag.id);
                btn.classList.remove('tag--selected');
            } else {
                selectedTags.add(tag.id);
                btn.classList.add('tag--selected');
            }
        });
        tagsContainer.appendChild(btn);
    });

    // Character counter
    const textarea = document.getElementById('form-text');
    const charCount = document.getElementById('char-count');
    const maxChars = 500;

    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        charCount.textContent = `${len} / ${maxChars}`;
        if (len > maxChars) {
            charCount.style.color = 'var(--color-danger)';
        } else {
            charCount.style.color = '';
        }
    });

    // Star rating
    let selectedRating = 0;
    const starsContainer = document.getElementById('star-rating');
    starsContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'stars__item';
        star.dataset.value = i;
        star.textContent = '★';
        star.addEventListener('click', () => {
            selectedRating = i;
            updateStarDisplay();
        });
        star.addEventListener('mouseenter', () => {
            highlightStars(i);
        });
        starsContainer.appendChild(star);
    }

    starsContainer.addEventListener('mouseleave', () => {
        updateStarDisplay();
    });

    function highlightStars(upTo) {
        starsContainer.querySelectorAll('.stars__item').forEach(s => {
            s.classList.toggle('stars__item--filled', parseInt(s.dataset.value) <= upTo);
        });
    }

    function updateStarDisplay() {
        highlightStars(selectedRating);
    }

    // Preview section
    const previewContainer = document.getElementById('preview-container');

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const university = uniSelectHidden.value;
        const text = textarea.value.trim();

        // Validation
        if (!university) { showToast('⚠️ Lütfen bir üniversite seçin.'); return; }
        if (!text) { showToast('⚠️ Lütfen bir yorum yazın.'); return; }
        if (text.length > maxChars) { showToast('⚠️ Yorum çok uzun.'); return; }
        if (selectedRating === 0) { showToast('⚠️ Lütfen bir puan verin.'); return; }
        if (selectedTags.size === 0) { showToast('⚠️ Lütfen en az bir etiket seçin.'); return; }

        // Build review object
        const newReview = {
            id: Date.now(), // Fallback ID, Firebase handles real keys automatically if pushed
            user: CURRENT_USER.name,
            initials: CURRENT_USER.initials,
            university: university,
            date: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }),
            rating: selectedRating,
            tags: Array.from(selectedTags),
            text: text,
        };

        // Save to Firebase Database
        window.saveReview(newReview);

        // Show preview
        previewContainer.innerHTML = `
      <h3 class="section-title" style="margin-top: var(--space-xl);">✅ Değerlendirmeniz <span>gönderildi!</span></h3>
      ${renderReviewCard(newReview, { showUni: true })}
    `;
        previewContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Reset form
        form.reset();
        selectedTags.clear();
        document.querySelectorAll('.tag--selected').forEach(t => t.classList.remove('tag--selected'));
        selectedRating = 0;
        updateStarDisplay();
        charCount.textContent = '0 / 500';

        showToast('✅ Değerlendirme başarıyla gönderildi!');
    });
}


// ─── Profile Page ─────────────────────────

function initProfilePage() {
    const listContainer = document.getElementById('user-reviews-list');
    const countEl = document.getElementById('review-count');
    if (!listContainer) return;

    // Check URL for user parameter
    const urlParams = new URLSearchParams(window.location.search);
    const targetUser = urlParams.get('user') || CURRENT_USER.name;
    const isCurrentUser = targetUser === CURRENT_USER.name;

    function getTargetReviews() {
        if (isCurrentUser) {
            const saved = getSavedReviews();
            return saved.filter(r => r.user === CURRENT_USER.name);
        } else {
            return getAllReviewsGlobal().filter(r => r.user === targetUser);
        }
    }

    let reviews = getTargetReviews();

    function render() {
        if (countEl) countEl.textContent = reviews.length;

        // Determine user info
        let displayInitials = '??';
        let displayName = targetUser;
        if (reviews.length > 0) {
            displayInitials = reviews[0].initials;
        } else if (isCurrentUser) {
            displayInitials = CURRENT_USER.initials;
        }

        // Calculate statistics
        let totalLikes = 0;
        let totalDislikes = 0;
        reviews.forEach(r => {
            const ints = getInteractions()[r.id] || { likes: [], dislikes: [] };
            totalLikes += ints.likes.length;
            totalDislikes += ints.dislikes.length;
        });
        const totalInteractions = totalLikes + totalDislikes;
        const approvalRating = totalInteractions > 0 ? Math.round((totalLikes / totalInteractions) * 100) : 0;

        // Update profile header info
        const profileAvatar = document.querySelector('.profile-header__avatar');
        const profileName = document.querySelector('.profile-header__info h2');
        const statLikes = document.getElementById('stat-likes');
        const statDislikes = document.getElementById('stat-dislikes');
        const statApproval = document.getElementById('stat-approval');

        if (profileAvatar) profileAvatar.textContent = displayInitials;
        if (profileName) profileName.textContent = displayName;
        if (statLikes) statLikes.textContent = totalLikes;
        if (statDislikes) statDislikes.textContent = totalDislikes;

        if (statApproval) {
            if (totalInteractions > 0) {
                statApproval.textContent = `%${approvalRating}`;
            } else {
                statApproval.textContent = '—';
            }
        }

        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.innerHTML = isCurrentUser ? '📖 Değerlendirmelerim' : `📖 ${displayName} Değerlendirmeleri`;
        }

        if (reviews.length === 0) {
            listContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">📝</div>
          <p>${isCurrentUser ? 'Henüz bir değerlendirmeniz yok.' : 'Bu kullanıcının henüz bir değerlendirmesi yok.'}</p>
        </div>
      `;
            return;
        }

        listContainer.innerHTML = reviews
            .map(r => renderReviewCard(r, { showUni: true, showDelete: isCurrentUser }))
            .join('');
    }

    render();

    // Global delete handler
    window.deleteReview = function (id) {
        if (!isCurrentUser) return;
        reviews = reviews.filter(r => r.id !== id);
        window.removeSavedReview(id);
        render();
        showToast('🗑️ Değerlendirme silindi.');
    };

    if (!authStateResolved) {
        window.addEventListener('auth-ready', () => {
            reviews = getTargetReviews();
            render();
        }, { once: true });
    }

    // Return render so Firebase updates can refresh without full re-init
    return render;
}


// ─── Login Page ───────────────────────────

function initLoginPage() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.auth-tab');

    if (!loginForm || !registerForm) return;

    // Redirect to home if already logged in natively
    if (CURRENT_USER.uid !== 'guest') {
        window.location.href = 'index.html';
    }

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update tab styles
            tabs.forEach(t => {
                if (t.classList.contains('active')) {
                    t.style.background = 'var(--color-surface)';
                    t.style.borderColor = 'var(--color-accent)';
                    t.style.color = 'var(--color-text)';
                } else {
                    t.style.background = 'transparent';
                    t.style.borderColor = 'transparent';
                    t.style.color = 'var(--color-text-muted)';
                }
            });

            if (tab.dataset.tab === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }
        });
    });

    // Login Handle
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value;
        const errDiv = document.getElementById('login-error');
        const btn = loginForm.querySelector('button');

        btn.textContent = 'Giriş Yapılıyor...';
        btn.disabled = true;

        try {
            await window.signInFirebase(email, pass);
            // onAuthStateChanged will handle redirect
        } catch (error) {
            errDiv.textContent = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
            btn.textContent = 'Giriş Yap ✨';
            btn.disabled = false;
        }
    });

    // Register Handle
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-password').value;
        const errDiv = document.getElementById('reg-error');
        const btn = registerForm.querySelector('button');

        btn.textContent = 'Hesap Oluşturuluyor...';
        btn.disabled = true;

        try {
            await window.signUpFirebase(name, email, pass);
            // onAuthStateChanged will handle redirect
        } catch (error) {
            errDiv.textContent = 'Kayıt başarısız. (' + error.message + ')';
            btn.textContent = 'Hesap Oluştur 🚀';
            btn.disabled = false;
        }
    });
}

// ─── Compare Page ─────────────────────────

function initComparePage() {
    const res1 = document.getElementById('compare-result-1');
    const res2 = document.getElementById('compare-result-2');

    if (!res1 || !res2) return;

    let uni1 = 'Boğaziçi Üniversitesi';
    let uni2 = 'Orta Doğu Teknik Üniversitesi (ODTÜ)';

    function renderCol(uniName, container) {
        if (!uniName) return;
        let details = UNI_DETAILS[uniName] ? { ...UNI_DETAILS[uniName] } : { ...GENERIC_UNI_DATA };

        if (typeof UNI_IMAGES !== 'undefined' && UNI_IMAGES[uniName] && UNI_IMAGES[uniName] !== null) {
            if (!details.image || details.image.includes('placeholder.jpg') || details.image.includes('images.unsplash.com')) {
                details.image = UNI_IMAGES[uniName];
            }
        }

        // Compute avg rating
        const allReviews = getAllReviewsGlobal().filter(r => r.university === uniName);
        let statHtml = '';
        if (allReviews.length > 0) {
            const avg = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);
            statHtml = `<div style="font-size: 2rem; font-weight: bold; color: var(--color-star);">★ ${avg}</div>
                        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 10px;">${allReviews.length} değerlendirme</div>`;
        } else {
            statHtml = `<div style="color: var(--color-text-muted); margin-bottom:10px;">Henüz değerlendirme yok</div>`;
        }

        container.innerHTML = `
            <img src="${details.image}" class="compare-img" alt="${uniName}">
            <h2 style="margin-top: 15px; font-size: 1.2rem; min-height: 55px;">${uniName}</h2>
            <div style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: 15px;">📍 ${details.subtitle}</div>
            
            <div class="compare-section">
                ${statHtml}
                <div style="padding: 5px 10px; background: var(--color-tag-bg); display: inline-block; border-radius: 4px; color: var(--color-accent); font-weight: bold; margin-bottom: 15px;">Sıralama: ${details.rank}</div>
            </div>
            
            <div class="compare-section">
                <h3 style="font-size: 1rem; margin-bottom: 10px;">Hakkında</h3>
                <p style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.5;">${details.aboutShort}</p>
            </div>
            
            <div class="compare-section">
                <h3 style="font-size: 1rem; margin-bottom: 10px;">Ulaşım Özet</h3>
                <ul style="list-style: none; padding: 0;">
                    ${details.transport.map(t => `
                        <li style="font-size: 0.85rem; margin-bottom: 8px; color: var(--color-text-muted);">
                            <strong>${t.from}</strong> ➔ ${t.duration} (${t.type})
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    initCustomSelect('custom-uni-select-1', typeof TURKISH_UNIVERSITIES !== 'undefined' ? TURKISH_UNIVERSITIES : [], (newUni) => {
        uni1 = newUni;
        renderCol(uni1, res1);
    }, uni1);

    initCustomSelect('custom-uni-select-2', typeof TURKISH_UNIVERSITIES !== 'undefined' ? TURKISH_UNIVERSITIES : [], (newUni) => {
        uni2 = newUni;
        renderCol(uni2, res2);
    }, uni2);

    renderCol(uni1, res1);
    renderCol(uni2, res2);
}

// ─── Auto-init based on page ──────────────

document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;

    if (page === 'login') {
        initLoginPage();
        return;
    }

    // onInitCallback: runs ONCE when both Firebase listeners are ready
    // onRefreshCallback: runs on subsequent real-time updates (lightweight re-render)
    let renderReviews_ref = null;
    let renderProfile_ref = null;
    let renderCompare_ref = null;

    initFirebaseListeners(
        // First-time init
        () => {
            if (page === 'university') {
                renderReviews_ref = initUniversityPage();
            } else if (page === 'review-form') {
                initReviewForm();
            } else if (page === 'profile') {
                renderProfile_ref = initProfilePage();
            } else if (page === 'compare') {
                renderCompare_ref = initComparePage();
            }
        },
        // Subsequent real-time refresh (just re-render the cards, no re-init)
        () => {
            if (page === 'university' && renderReviews_ref) renderReviews_ref();
            if (page === 'profile' && renderProfile_ref) renderProfile_ref();
            if (page === 'compare' && renderCompare_ref) renderCompare_ref();
        }
    );
});
