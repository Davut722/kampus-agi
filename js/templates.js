/* ========================================
   UNI-REVIEW — Page HTML Templates (SPA)
   ======================================== */

export const TEMPLATES = {
    home: `
        <main class="home page-view">

            <!-- Animated background orbs -->
            <div class="home-bg" aria-hidden="true">
                <div class="home-bg__orb home-bg__orb--1"></div>
                <div class="home-bg__orb home-bg__orb--2"></div>
                <div class="home-bg__orb home-bg__orb--3"></div>
                <div class="home-bg__orb home-bg__orb--4"></div>
                <div class="home-bg__noise"></div>
            </div>

            <!-- Hero -->
            <section class="home-hero container">
                <div class="home-hero__left">
                    <p class="home-eyebrow">🎓 Türkiye'nin üniversite rehberi</p>
                    <h1 class="home-hero__title">
                        Üniversiteyi<br>
                        <span class="home-hero__title-em">içeriden</span> tanı.
                    </h1>
                    <p class="home-hero__desc">
                        Broşürlerde yazanı değil, orada okuyanların gerçekten yaşadığını öğren.
                        Tercih yapmadan önce, gerçek öğrenci seslerine kulak ver.
                    </p>
                    <div class="home-hero__actions">
                        <a href="#/university" class="btn btn--primary home-hero__btn">Üniversiteleri Keşfet</a>
                        <a href="#/review-form" class="home-hero__link">Yorumunu ekle <span>→</span></a>
                    </div>
                </div>

                <div class="home-hero__right">
                    <div class="home-stat-card">
                        <div class="home-stat-card__row">
                            <div class="home-stat-card__item">
                                <span class="home-stat-card__val" id="stat-unis">80+</span>
                                <span class="home-stat-card__lbl">Üniversite</span>
                            </div>
                            <div class="home-stat-card__sep"></div>
                            <div class="home-stat-card__item">
                                <span class="home-stat-card__val home-stat-card__val--warm" id="stat-reviews">—</span>
                                <span class="home-stat-card__lbl">Değerlendirme</span>
                            </div>
                        </div>
                        <div class="home-stat-card__quote">
                            "Kampüs hayatı, gerçek öğrencilerin gözünden."
                        </div>
                    </div>
                </div>
            </section>

            <!-- Feature Bento -->
            <section class="home-bento container">
                <a href="#/university" class="home-bento__card home-bento__card--wide">
                    <div class="home-bento__icon">🔍</div>
                    <div class="home-bento__body">
                        <h3 class="home-bento__title">Üniversiteleri Keşfet</h3>
                        <p class="home-bento__desc">Türkiye genelindeki yüzlerce üniversiteyi ara, filtrele ve karşılaştır. Her kampüs için gerçek öğrenci yorumları.</p>
                    </div>
                    <span class="home-bento__arrow">↗</span>
                </a>

                <a href="#/compare" class="home-bento__card">
                    <div class="home-bento__icon">⚖️</div>
                    <div class="home-bento__body">
                        <h3 class="home-bento__title">Karşılaştır</h3>
                        <p class="home-bento__desc">İki üniversiteyi yan yana koy. Puan, yorum ve olanakları birlikte değerlendir.</p>
                    </div>
                    <span class="home-bento__arrow">↗</span>
                </a>

                <a href="#/review-form" class="home-bento__card home-bento__card--accent">
                    <div class="home-bento__icon">✍️</div>
                    <div class="home-bento__body">
                        <h3 class="home-bento__title">Yorum Yaz</h3>
                        <p class="home-bento__desc">Üniversiteni değerlendir, topluluğa katkı sağla.</p>
                    </div>
                    <span class="home-bento__arrow">↗</span>
                </a>
            </section>

            <!-- Popular Universities strip -->
            <section class="home-unis container">
                <p class="home-unis__label">Çok incelenenler</p>
                <div class="home-unis__strip">
                    <button class="home-uni-pill" type="button" data-university="Boğaziçi Üniversitesi">Boğaziçi</button>
                    <button class="home-uni-pill" type="button" data-university="Orta Doğu Teknik Üniversitesi (ODTÜ)">ODTÜ</button>
                    <button class="home-uni-pill" type="button" data-university="İstanbul Teknik Üniversitesi">İTÜ</button>
                    <button class="home-uni-pill" type="button" data-university="Hacettepe Üniversitesi">Hacettepe</button>
                    <button class="home-uni-pill" type="button" data-university="Ege Üniversitesi">Ege</button>
                    <button class="home-uni-pill" type="button" data-university="Bilkent Üniversitesi">Bilkent</button>
                    <button class="home-uni-pill" type="button" data-university="Koç Üniversitesi">Koç</button>
                </div>
            </section>

        </main>
    `,

    university: `
        <main class="container page-view">
            <div class="uni-selector" id="uni-selector">
                <label class="uni-selector__label">📍 Üniversite Seçin</label>
                <div class="custom-select" id="custom-uni-select">
                    <div class="custom-select__trigger">
                        <span class="custom-select__text">Üniversite seçin...</span>
                        <span class="custom-select__icon">▼</span>
                    </div>
                    <div class="custom-select__dropdown">
                        <input type="text" class="custom-select__search" placeholder="Üniversite ara...">
                        <ul class="custom-select__options"></ul>
                    </div>
                </div>
            </div>

            <header class="profile-hero" id="uni-hero" style="margin-top: var(--space-xl);">
                <div class="profile-hero__bg">
                    <img id="hero-blur-img" class="profile-hero__bg-blur"
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070"
                        alt="" aria-hidden="true">
                    <img id="hero-img" class="profile-hero__bg-img"
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070"
                        alt="Üniversite Kampüsü">
                    <div class="profile-hero__overlay"></div>
                </div>
                <div class="profile-hero__content container reveal-up">
                    <h1 class="profile-hero__title" id="uni-hero-title">Bandırma Onyedi Eylül Üniversitesi</h1>
                    <p class="profile-hero__subtitle" id="uni-hero-subtitle">📍 Balıkesir, Türkiye</p>
                    <a href="#" id="uni-website-btn" target="_blank" rel="noopener noreferrer"
                        class="btn btn--outline profile-hero__btn">
                        📍 Resmi Web Sitesine Git
                    </a>
                </div>
            </header>

            <div class="profile-main">
                <section class="profile-section reveal-up">
                    <div class="profile-card about-card">
                        <div class="profile-card__header">
                            <h2 class="profile-card__title">Üniversite Hakkında</h2>
                        </div>
                        <div class="profile-card__content about-content">
                            <p id="about-text-short">Yükleniyor...</p>
                            <div class="about-content__extended" id="about-extended">
                                <p id="about-text-long"></p>
                            </div>
                        </div>
                        <button class="btn btn--text about-toggle-btn" id="about-toggle-btn">
                            Daha Fazla Oku ▼
                        </button>
                    </div>
                </section>

                <section class="profile-section reveal-up" style="animation-delay: 0.1s;">
                    <h2 class="section-title">Canlı <span>Ulaşım Modülü</span></h2>
                    <p class="section-desc">Çevre illerden bu üniversiteye ulaşım imkanlarını keşfedin.</p>
                    <div class="transport-grid" id="transport-grid"></div>
                </section>

                <section class="profile-section hero__stats reveal-up"
                    style="animation-delay: 0.2s; padding: var(--space-lg); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
                    <div class="hero__stat">
                        <div class="hero__stat-value" id="stat-avg">—</div>
                        <div class="hero__stat-label">Ortalama Puan</div>
                    </div>
                    <div class="hero__stat">
                        <div class="hero__stat-value" id="stat-count">—</div>
                        <div class="hero__stat-label">Değerlendirme</div>
                    </div>
                    <div class="hero__stat">
                        <div class="hero__stat-value" id="stat-rank">Top 3</div>
                        <div class="hero__stat-label">Türkiye Sıralaması</div>
                    </div>
                </section>

                <section class="profile-section reveal-up" style="animation-delay: 0.3s; margin-bottom: var(--space-md);">
                    <h2 class="section-title">📋 Öğrenci <span>Değerlendirmeleri</span></h2>
                    <div class="filter-bar" id="filter-bar"></div>
                </section>

                <div id="reviews-container"></div>
            </div>
        </main>
    `,

    compare: `
        <main class="container page-view">
            <h1 class="section-title">Üniversite <span>Karşılaştırma Aracı</span> ⚖️</h1>
            <p class="section-desc" style="color: var(--color-text-muted);">İki farklı üniversiteyi seçerek aralarındaki
                farkları, puan durumlarını ve olanakları yan yana inceleyin.</p>

            <div class="compare-container">
                <div class="compare-col">
                    <div class="custom-select" id="custom-uni-select-1">
                        <div class="custom-select__trigger">
                            <span class="custom-select__text">1. Üniversiteyi seçin...</span>
                            <span class="custom-select__icon">▼</span>
                        </div>
                        <div class="custom-select__dropdown">
                            <input type="text" class="custom-select__search" placeholder="Ara...">
                            <ul class="custom-select__options"></ul>
                        </div>
                    </div>
                    <div id="compare-result-1"></div>
                </div>

                <div class="compare-col">
                    <div class="custom-select" id="custom-uni-select-2">
                        <div class="custom-select__trigger">
                            <span class="custom-select__text">2. Üniversiteyi seçin...</span>
                            <span class="custom-select__icon">▼</span>
                        </div>
                        <div class="custom-select__dropdown">
                            <input type="text" class="custom-select__search" placeholder="Ara...">
                            <ul class="custom-select__options"></ul>
                        </div>
                    </div>
                    <div id="compare-result-2"></div>
                </div>
            </div>
        </main>
    `,

    reviewForm: `
        <main class="container page-view">
            <div class="profile-card" style="max-width: 600px; margin: var(--space-xl) auto;">
                <div class="profile-card__header">
                    <h2 class="profile-card__title">Yeni Değerlendirme Ekle</h2>
                </div>
                <div class="profile-card__content">
                    <form id="add-review-form" class="form">
                        <div class="form__group">
                            <label class="form__label">Üniversite Seçin</label>
                            <div class="custom-select" id="custom-uni-select-form">
                                <div class="custom-select__trigger">
                                    <span class="custom-select__text">Üniversite seçin...</span>
                                    <span class="custom-select__icon">▼</span>
                                </div>
                                <div class="custom-select__dropdown">
                                    <input type="text" class="custom-select__search" placeholder="Ara...">
                                    <ul class="custom-select__options"></ul>
                                </div>
                            </div>
                            <input type="hidden" id="form-uni-hidden" required>
                        </div>

                        <div class="form__group">
                            <label class="form__label">Puanınız (1-5)</label>
                            <div id="star-rating" class="stars stars--interactive" style="font-size: 2rem;">
                                <span class="stars__item" data-value="1">★</span>
                                <span class="stars__item" data-value="2">★</span>
                                <span class="stars__item" data-value="3">★</span>
                                <span class="stars__item" data-value="4">★</span>
                                <span class="stars__item" data-value="5">★</span>
                            </div>
                            <input type="hidden" id="form-rating" value="0" required>
                        </div>

                        <div class="form__group">
                            <label class="form__label" for="form-text">Değerlendirmeniz</label>
                            <textarea id="form-text" class="form__input" rows="5"
                                placeholder="Üniversiteniz hakkında düşüncelerinizi detaylıca yazın..." required></textarea>
                            <div style="text-align: right; margin-top: 5px;">
                                <small id="char-count" style="color: var(--color-text-muted);">0 / 500</small>
                            </div>
                        </div>

                        <div class="form__group">
                            <label class="form__label">Etiketler (En fazla 3 adet)</label>
                            <div id="form-tags" style="display: flex; gap: 8px; flex-wrap: wrap;"></div>
                            <input type="hidden" id="form-tags-hidden" value="">
                        </div>

                        <button type="submit" class="btn btn--primary" style="width: 100%;">Paylaş ✨</button>
                        <div id="preview-container" style="margin-top: 20px;"></div>
                    </form>
                </div>
            </div>
        </main>
    `,

    profile: `
        <main class="page-view profile-page-v2">

            <!-- Cover Banner -->
            <div class="profile-cover">
                <div class="profile-cover__gradient"></div>
            </div>

            <!-- Identity Block -->
            <div class="container">
                <div class="profile-identity">
                    <div class="profile-identity__avatar-wrap">
                        <div class="profile-identity__avatar" id="profile-avatar">MS</div>
                    </div>
                    <div class="profile-identity__meta">
                        <h1 class="profile-identity__name" id="profile-name">Yükleniyor...</h1>
                        <p class="profile-identity__sub" id="profile-academic-info">Üniversite ve bölüm bilgisi eklenmemiş.</p>
                    </div>
                    <div class="profile-identity__actions">
                        <button class="btn btn--danger btn--sm" id="profile-logout-btn" type="button">
                            <i data-lucide="log-out" aria-hidden="true"></i> Çıkış Yap
                        </button>
                    </div>
                </div>

                <!-- Stats Strip -->
                <div class="profile-strip" aria-label="Profil istatistikleri">
                    <div class="profile-strip__item">
                        <span class="profile-strip__val" id="stat-review-count">0</span>
                        <span class="profile-strip__lbl">Değerlendirme</span>
                    </div>
                    <div class="profile-strip__divider"></div>
                    <div class="profile-strip__item">
                        <span class="profile-strip__val profile-strip__val--green" id="stat-upvotes">0</span>
                        <span class="profile-strip__lbl">Beğeni</span>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="profile-tabs-v2" role="tablist" aria-label="Profil bölümleri">
                    <button class="profile-tab-v2 is-active" id="profile-reviews-tab" type="button" role="tab"
                        aria-selected="true" aria-controls="profile-reviews-panel" data-profile-tab="reviews">
                        Değerlendirmelerim
                    </button>
                    <button class="profile-tab-v2" id="profile-settings-tab" type="button" role="tab"
                        aria-selected="false" aria-controls="profile-settings-panel" data-profile-tab="settings">
                        Ayarlar
                    </button>
                </div>

                <!-- Reviews Panel -->
                <section class="profile-panel-v2" id="profile-reviews-panel" role="tabpanel" aria-labelledby="profile-reviews-tab">
                    <div id="user-reviews-list" aria-live="polite"></div>
                </section>

                <!-- Settings Panel -->
                <section class="profile-panel-v2" id="profile-settings-panel" role="tabpanel"
                    aria-labelledby="profile-settings-tab" hidden>
                    <form id="profile-settings-form" class="profile-settings-form-v2">
                        <div class="psf-section">
                            <div class="psf-section__header">
                                <span class="psf-section__icon">👤</span>
                                <h3 class="psf-section__title">Hesap Bilgileri</h3>
                            </div>
                            <div class="psf-section__body">
                                <div class="form__group">
                                    <label class="form__label" for="settings-name">Ad Soyad</label>
                                    <input class="form__input" id="settings-name" name="name" autocomplete="name" required>
                                </div>
                                <div class="form__group">
                                    <label class="form__label" for="settings-university">Üniversite</label>
                                    <input class="form__input" id="settings-university" name="university" autocomplete="organization">
                                </div>
                                <div class="form__group">
                                    <label class="form__label" for="settings-department">Bölüm</label>
                                    <input class="form__input" id="settings-department" name="department">
                                </div>
                            </div>
                        </div>

                        <div class="psf-section">
                            <div class="psf-section__header">
                                <span class="psf-section__icon">🔒</span>
                                <h3 class="psf-section__title">Şifre Değiştir</h3>
                            </div>
                            <div class="psf-section__body">
                                <div class="form__group">
                                    <label class="form__label" for="settings-current-password">Mevcut şifre</label>
                                    <input class="form__input" id="settings-current-password" name="current_password"
                                        type="password" autocomplete="current-password">
                                </div>
                                <div class="form__group">
                                    <label class="form__label" for="settings-new-password">Yeni şifre</label>
                                    <input class="form__input" id="settings-new-password" name="new_password"
                                        type="password" minlength="6" autocomplete="new-password">
                                </div>
                            </div>
                        </div>

                        <div class="psf-actions">
                            <p id="profile-settings-message" class="profile-settings-form__message" role="status"></p>
                            <button class="btn btn--primary" type="submit">Kaydet</button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    `,

    login: `
        <div class="login-layout page-view">
            <div class="login-bg"></div>
            <div class="login-orb login-orb-1"></div>
            <div class="login-orb login-orb-2"></div>

            <div class="login-card-container"
                style="margin: 60px auto; max-width: 400px; padding: 30px; background: var(--color-surface); border-radius: 12px; border: 1px solid var(--color-border); z-index: 10; position: relative;">
                <div class="login-brand" style="text-align: center; margin-bottom: 30px;">
                    <div class="login-brand-logo" style="font-size: 1.5rem; font-weight: bold; margin-bottom: 10px;">🎓
                        UniReview</div>
                    <p class="login-brand-desc" style="color: var(--color-text-muted);">Platformu kullanmaya başlamak için
                        giriş yapın.</p>
                </div>

                <div class="auth-tabs" style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <button type="button" class="btn auth-tab active" data-tab="login"
                        style="flex: 1; padding: 10px; background: var(--color-surface); border: 2px solid var(--color-accent); color: var(--color-text); border-radius: 8px; cursor: pointer;">Giriş
                        Yap</button>
                    <button type="button" class="btn auth-tab" data-tab="register"
                        style="flex: 1; padding: 10px; background: transparent; border: 2px solid transparent; color: var(--color-text-muted); border-radius: 8px; cursor: pointer;">Kayıt
                        Ol</button>
                </div>

                <form id="login-form" class="form login-form active-form">
                    <div class="form__group">
                        <label class="form__label" for="login-email">E-posta Adresi</label>
                        <input type="email" id="login-email" class="form__input" placeholder="mail@uni.edu.tr" required>
                    </div>
                    <div class="form__group" style="margin-bottom: var(--space-xl)">
                        <label class="form__label" for="login-password">Şifre</label>
                        <input type="password" id="login-password" class="form__input" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn btn--primary"
                        style="width: 100%; font-size: 1rem; padding: 14px;">Giriş Yap ✨</button>
                    <div id="login-error"
                        style="color: var(--color-danger); margin-top: 10px; text-align: center; font-size: 0.9rem;"></div>
                </form>

                <form id="register-form" class="form login-form" style="display: none;">
                    <div class="form__group">
                        <label class="form__label" for="reg-name">Adınız Soyadınız</label>
                        <input type="text" id="reg-name" class="form__input" placeholder="Örn: Elif Yılmaz" required>
                    </div>
                    <div class="form__group">
                        <label class="form__label" for="reg-email">E-posta Adresi</label>
                        <input type="email" id="reg-email" class="form__input" placeholder="mail@uni.edu.tr" required>
                    </div>
                    <div class="form__group" style="margin-bottom: var(--space-xl)">
                        <label class="form__label" for="reg-password">Şifre (En az 6 karakter)</label>
                        <input type="password" id="reg-password" class="form__input" placeholder="••••••••" required
                            minlength="6">
                    </div>
                    <button type="submit" class="btn btn--secondary"
                        style="width: 100%; font-size: 1rem; padding: 14px; background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text);">Hesap
                        Oluştur 🚀</button>
                    <div id="reg-error"
                        style="color: var(--color-danger); margin-top: 10px; text-align: center; font-size: 0.9rem;"></div>
                </form>
            </div>
        </div>
    `
};
