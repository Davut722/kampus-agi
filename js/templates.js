/* ========================================
   Kampüs Sesi — Page HTML Templates (SPA)
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

            <!-- Simplified Hero -->
            <section class="home-hero-centered container" style="padding: var(--space-xl) var(--space-md); min-height: auto;">
                <div class="hero-centered__content">
                    <h1 class="hero-centered__title" style="font-size: 2rem;">
                        Kampüsün Gerçek Sesine Kulak Ver
                    </h1>
                    <p class="hero-centered__desc" style="max-width: 600px; margin: 0 auto var(--space-lg) auto;">
                        Broşürlerde yazanı değil, orada okuyanların gerçekten yaşadığını öğren.
                    </p>
                    
                    <div class="hero-centered__search-wrapper" style="max-width: 500px; margin: 0 auto var(--space-md) auto;">
                        <i data-lucide="search" class="search-icon"></i>
                        <input type="text" class="hero-centered__search-input" placeholder="Üniversite veya bölüm ara...">
                    </div>
                </div>
            </section>

            <!-- Minimalist Features Section -->
            <section class="home-features container reveal-up" style="padding-bottom: var(--space-xl); position: relative; z-index: 10;">
                <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg);">
                    <div class="feature-card minimal-card" style="background: var(--color-bg-card); padding: var(--space-xl) var(--space-lg); border-radius: var(--radius-lg); border: 1px solid var(--color-border); text-align: center; transition: all 0.3s ease;">
                        <div class="feature-icon" style="color: var(--color-accent); font-size: 2rem; margin-bottom: var(--space-sm);"><i data-lucide="shield-check" style="width: 40px; height: 40px;"></i></div>
                        <h3 class="feature-title" style="margin-bottom: var(--space-xs); font-family: var(--font-heading); font-size: 1.25rem;">Doğrulanmış Deneyimler</h3>
                        <p class="feature-desc" style="color: var(--color-text-muted); font-size: 0.95rem;">Şeffaflığı ön planda tutarak, kampüs yaşamını birinci ağızdan, dürüst yorumlarla sunuyoruz.</p>
                    </div>
                    <div class="feature-card minimal-card" style="background: var(--color-bg-card); padding: var(--space-xl) var(--space-lg); border-radius: var(--radius-lg); border: 1px solid var(--color-border); text-align: center; transition: all 0.3s ease;">
                        <div class="feature-icon" style="color: var(--color-accent-2); font-size: 2rem; margin-bottom: var(--space-sm);"><i data-lucide="git-compare-arrows" style="width: 40px; height: 40px;"></i></div>
                        <h3 class="feature-title" style="margin-bottom: var(--space-xs); font-family: var(--font-heading); font-size: 1.25rem;">Akıllı Karşılaştırma</h3>
                        <p class="feature-desc" style="color: var(--color-text-muted); font-size: 0.95rem;">Birden fazla üniversiteyi akademik, sosyal ve ulaşım gibi temel metriklerde yan yana kıyaslayın.</p>
                    </div>
                    <div class="feature-card minimal-card" style="background: var(--color-bg-card); padding: var(--space-xl) var(--space-lg); border-radius: var(--radius-lg); border: 1px solid var(--color-border); text-align: center; transition: all 0.3s ease;">
                        <div class="feature-icon" style="color: var(--color-success); font-size: 2rem; margin-bottom: var(--space-sm);"><i data-lucide="network" style="width: 40px; height: 40px;"></i></div>
                        <h3 class="feature-title" style="margin-bottom: var(--space-xs); font-family: var(--font-heading); font-size: 1.25rem;">Topluluk Ağı</h3>
                        <p class="feature-desc" style="color: var(--color-text-muted); font-size: 0.95rem;">Bölümünüzdeki veya hedeflediğiniz üniversitedeki kişilerle iletişim kurun, sorularınızı yöneltin.</p>
                    </div>
                </div>
            </section>

            <!-- Minimalist Blog Section -->
            <section class="home-blog container reveal-up" style="padding-bottom: var(--space-2xl); position: relative; z-index: 10;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-lg);">
                    <h2 class="section-title" style="margin-bottom: 0;">Son <span>İçerikler</span></h2>
                    <a href="#/home" style="color: var(--color-accent); font-weight: 500; font-size: 0.9rem; display: flex; align-items: center; gap: 4px;">Tümünü Gör <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i></a>
                </div>
                <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-lg);">
                    <!-- Blog Card 1 -->
                    <article class="blog-card minimal-card" style="background: var(--color-bg-card); border-radius: var(--radius-md); border: 1px solid var(--color-border); padding: var(--space-lg); transition: all 0.3s ease; display: flex; flex-direction: column;">
                        <span style="font-size: 0.75rem; color: var(--color-accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-xs);">Rehber</span>
                        <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: var(--space-sm); color: var(--color-text); line-height: 1.4;">Üniversite Tercih Sürecinde Dikkat Edilmesi Gerekenler</h3>
                        <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: var(--space-md); flex: 1; line-height: 1.6;">Tercih listenizi hazırlarken sıralamalar dışında kampüs olanakları ve akademik kadro gibi detaylara nasıl dikkat etmelisiniz?</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: var(--space-sm); margin-top: auto;">
                            <span style="font-size: 0.8rem; color: var(--color-text-muted);">12 Mayıs</span>
                            <a href="#/home" style="font-size: 0.85rem; font-weight: 500; color: var(--color-text);">Devamını Oku &rarr;</a>
                        </div>
                    </article>

                    <!-- Blog Card 2 -->
                    <article class="blog-card minimal-card" style="background: var(--color-bg-card); border-radius: var(--radius-md); border: 1px solid var(--color-border); padding: var(--space-lg); transition: all 0.3s ease; display: flex; flex-direction: column;">
                        <span style="font-size: 0.75rem; color: var(--color-accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-xs);">Kampüs Hayatı</span>
                        <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: var(--space-sm); color: var(--color-text); line-height: 1.4;">KYK Yurtları vs. Özel Yurtlar: Hangisi Avantajlı?</h3>
                        <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: var(--space-md); flex: 1; line-height: 1.6;">Barınma maliyetleri, giriş-çıkış saatleri ve sosyal olanaklar açısından devlet yurtları ile özel yurtların detaylı bir kıyaslaması.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: var(--space-sm); margin-top: auto;">
                            <span style="font-size: 0.8rem; color: var(--color-text-muted);">5 Mayıs</span>
                            <a href="#/home" style="font-size: 0.85rem; font-weight: 500; color: var(--color-text);">Devamını Oku &rarr;</a>
                        </div>
                    </article>

                    <!-- Blog Card 3 -->
                    <article class="blog-card minimal-card" style="background: var(--color-bg-card); border-radius: var(--radius-md); border: 1px solid var(--color-border); padding: var(--space-lg); transition: all 0.3s ease; display: flex; flex-direction: column;">
                        <span style="font-size: 0.75rem; color: var(--color-accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-xs);">Akademik</span>
                        <h3 style="font-family: var(--font-heading); font-size: 1.15rem; margin-bottom: var(--space-sm); color: var(--color-text); line-height: 1.4;">Mühendislik İçin Staj Bulma Taktikleri</h3>
                        <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: var(--space-md); flex: 1; line-height: 1.6;">Henüz 1. sınıftayken bile sektörle iç içe olmak mümkün. Portfolyo hazırlama ve kariyer fuarlarını verimli kullanma rehberi.</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: var(--space-sm); margin-top: auto;">
                            <span style="font-size: 0.8rem; color: var(--color-text-muted);">28 Nisan</span>
                            <a href="#/home" style="font-size: 0.85rem; font-weight: 500; color: var(--color-text);">Devamını Oku &rarr;</a>
                        </div>
                    </article>
                </div>
            </section>
            
            <!-- Compact FAQ Section (Interactive) -->
            <section class="home-faq container" style="max-width: 600px; padding-top: var(--space-lg); padding-bottom: var(--space-xl);">
                <h2 class="section-title" style="text-align: center; margin-bottom: var(--space-lg);">Merak Edilenler 🧐</h2>
                <div class="faq-accordion-list" style="display: flex; flex-direction: column; gap: var(--space-sm);">
                    <details class="faq-details">
                        <summary class="faq-summary">
                            <span>Üye olmak şart mı kanka?</span>
                            <i data-lucide="plus" class="faq-icon"></i>
                        </summary>
                        <div class="faq-content">
                            <p>Okumak bedava! Ama "şu hocanın sınavları çok zor" diye isyan edeceksen veya soru soracaksan üye olman lazım ki trolleri uzak tutalım.</p>
                        </div>
                    </details>
                    <details class="faq-details">
                        <summary class="faq-summary">
                            <span>Üniversitelerin bilgileri güncel mi?</span>
                            <i data-lucide="plus" class="faq-icon"></i>
                        </summary>
                        <div class="faq-content">
                            <p>Kanka her şeyi olabildiğince güncel tutmaya çalışıyoruz. Yurtlar, ulaşım falan hepsi sistemde var ama en iyi güncellemeyi yorumlarda okursun.</p>
                        </div>
                    </details>
                    <details class="faq-details">
                        <summary class="faq-summary">
                            <span>Puanlamalar neye göre yapılıyor?</span>
                            <i data-lucide="plus" class="faq-icon"></i>
                        </summary>
                        <div class="faq-content">
                            <p>Bizzat sizlerin oylarıyla! Eğitim, sosyallik, yemekler falan... Herkesin notunun şeffaf ortalamasını alıp sıralıyoruz.</p>
                        </div>
                    </details>
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

                <section class="profile-section reveal-up" style="animation-delay: 0.15s;">
                    <h2 class="section-title">🏢 Çevredeki <span>Yurtlar (KYK & Özel)</span></h2>
                    <p class="section-desc">Bu üniversitenin çevresindeki öğrenci yurtları ve barınma imkanları.</p>
                    <div id="kyk-grid" class="kyk-grid">
                        <div style="color: var(--color-text-muted);">Yurt bilgileri yükleniyor...</div>
                    </div>
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
        <div class="auth-page">
            <div class="auth-bg-shapes">
                <div class="auth-shape auth-shape-1"></div>
                <div class="auth-shape auth-shape-2"></div>
            </div>

            <div class="auth-glass-card">
                <div class="auth-header">
                    <span class="auth-header__icon">🎓</span>
                    <h1 class="auth-header__title">Kampüs Sesi</h1>
                    <p class="auth-header__desc">Platforma giriş yap veya aramıza katıl.</p>
                </div>

                <div class="auth-tabs-modern">
                    <button type="button" class="auth-tab-btn auth-tab active" data-tab="login">Giriş Yap</button>
                    <button type="button" class="auth-tab-btn auth-tab" data-tab="register">Kayıt Ol</button>
                </div>

                <!-- Login Form -->
                <form id="login-form" class="auth-form login-form active-form">
                    <div class="auth-input-group">
                        <label for="login-email">E-posta Adresi</label>
                        <input type="email" id="login-email" class="auth-input" placeholder="ogrenci@uni.edu.tr" required>
                    </div>
                    <div class="auth-input-group" style="margin-bottom: 25px;">
                        <label for="login-password">Şifre</label>
                        <input type="password" id="login-password" class="auth-input" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="auth-submit-btn">Giriş Yap ✨</button>
                    <div id="login-error" style="color: var(--color-danger); margin-top: 15px; text-align: center; font-size: 0.9rem; font-weight: 500;"></div>
                </form>

                <!-- Register Form -->
                <form id="register-form" class="auth-form login-form">
                    <div class="auth-input-group">
                        <label for="reg-name">Adınız Soyadınız</label>
                        <input type="text" id="reg-name" class="auth-input" placeholder="Örn: Elif Yılmaz" required>
                    </div>
                    <div class="auth-input-group">
                        <label for="reg-email">E-posta Adresi</label>
                        <input type="email" id="reg-email" class="auth-input" placeholder="ogrenci@uni.edu.tr" required>
                    </div>
                    <div class="auth-input-group" style="margin-bottom: 25px;">
                        <label for="reg-password">Şifre (En az 6 karakter)</label>
                        <input type="password" id="reg-password" class="auth-input" placeholder="••••••••" required minlength="6">
                    </div>
                    <button type="submit" class="auth-submit-btn">Hesap Oluştur 🚀</button>
                    <div id="reg-error" style="color: var(--color-danger); margin-top: 15px; text-align: center; font-size: 0.9rem; font-weight: 500;"></div>
                </form>
            </div>
        </div>
    `
};
