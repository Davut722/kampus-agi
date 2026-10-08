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

            <!-- Features Section -->
            <section class="home-features container" style="padding-bottom: var(--space-xl);">
                <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg);">
                    <div class="feature-card" style="background: var(--color-bg-card); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--color-border); text-align: center;">
                        <div class="feature-icon" style="color: var(--color-accent); font-size: 2rem; margin-bottom: var(--space-sm);"><i data-lucide="shield-check" style="width: 36px; height: 36px;"></i></div>
                        <h3 class="feature-title" style="margin-bottom: var(--space-xs); font-family: var(--font-heading);">Gerçek Deneyimler</h3>
                        <p class="feature-desc" style="color: var(--color-text-muted); font-size: 0.9rem;">Sadece o üniversitede okuyan veya mezun olmuş öğrencilerin dürüst yorumlarını okuyun.</p>
                    </div>
                    <div class="feature-card" style="background: var(--color-bg-card); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--color-border); text-align: center;">
                        <div class="feature-icon" style="color: var(--color-accent-2); font-size: 2rem; margin-bottom: var(--space-sm);"><i data-lucide="scale" style="width: 36px; height: 36px;"></i></div>
                        <h3 class="feature-title" style="margin-bottom: var(--space-xs); font-family: var(--font-heading);">Detaylı Kıyaslama</h3>
                        <p class="feature-desc" style="color: var(--color-text-muted); font-size: 0.9rem;">Ulaşım, yurt, yemekhane ve akademik kadro gibi kriterlerde iki üniversiteyi yan yana görün.</p>
                    </div>
                    <div class="feature-card" style="background: var(--color-bg-card); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--color-border); text-align: center;">
                        <div class="feature-icon" style="color: var(--color-success); font-size: 2rem; margin-bottom: var(--space-sm);"><i data-lucide="users" style="width: 36px; height: 36px;"></i></div>
                        <h3 class="feature-title" style="margin-bottom: var(--space-xs); font-family: var(--font-heading);">Aktif Topluluk</h3>
                        <p class="feature-desc" style="color: var(--color-text-muted); font-size: 0.9rem;">Aklınıza takılan soruları sorun, diğer öğrencilerden tavsiye alın ve kampüse hazır gidin.</p>
                    </div>
                </div>
            </section>

            <!-- Feed & Sidebar Section -->
            <section class="home-feed-section container">
                <!-- Pill Filters -->
                <div class="feed-filters">
                    <button class="feed-filter-btn active">En Yeniler</button>
                    <button class="feed-filter-btn">Popüler</button>
                    <button class="feed-filter-btn">Kampüs Hayatı</button>
                    <button class="feed-filter-btn">Bölümler</button>
                    <button class="feed-filter-btn">Soru & Cevap</button>
                </div>

                <div class="home-feed-layout">
                    <!-- Left Column: Feed -->
                    <div class="feed-column">
                        
                        <!-- Mock Post 1 -->
                        <article class="feed-card">
                            <div class="feed-card__header">
                                <div class="feed-card__user">
                                    <div class="feed-card__avatar">AE</div>
                                    <div>
                                        <div class="feed-card__name">Ahmet Erdem</div>
                                        <div class="feed-card__time">2 saat önce</div>
                                    </div>
                                </div>
                                <span class="feed-card__tag">Kampüs Hayatı</span>
                            </div>
                            <h3 class="feed-card__title">Merkez kütüphane vize haftası ne kadar kalabalık oluyor?</h3>
                            <p class="feed-card__excerpt">Arkadaşlar haftaya vizeler başlıyor. Kampüsteki kütüphanede gecelemek istiyorum ama yer bulmak çok zormuş diye duydum. Sabah kaç gibi gitmek lazım? Alternatif çalışma salonları nereler?</p>
                            <div class="feed-card__footer">
                                <div class="feed-action">
                                    <i data-lucide="heart" class="icon-sm"></i> 24 Beğeni
                                </div>
                                <div class="feed-action">
                                    <i data-lucide="message-square" class="icon-sm"></i> 8 Yorum
                                </div>
                            </div>
                        </article>

                        <!-- Mock Post 2 -->
                        <article class="feed-card">
                            <div class="feed-card__header">
                                <div class="feed-card__user">
                                    <div class="feed-card__avatar">ZY</div>
                                    <div>
                                        <div class="feed-card__name">Zeynep Yılmaz</div>
                                        <div class="feed-card__time">5 saat önce</div>
                                    </div>
                                </div>
                                <span class="feed-card__tag">Bölümler</span>
                            </div>
                            <h3 class="feed-card__title">Bilgisayar Mühendisliği 1. Sınıf Laptop Önerisi</h3>
                            <p class="feed-card__excerpt">Selamlar, bu sene bilgisayar mühendisliğine başlıyorum. Bütçem çok yüksek değil ama beni 4 yıl idare edecek, kod yazarken üzmeyecek bir laptop arıyorum. M1 işlemcili Mac'ler yeterli olur mu yoksa Windows mu tercih etmeliyim?</p>
                            <div class="feed-card__footer">
                                <div class="feed-action">
                                    <i data-lucide="heart" class="icon-sm"></i> 45 Beğeni
                                </div>
                                <div class="feed-action">
                                    <i data-lucide="message-square" class="icon-sm"></i> 22 Yorum
                                </div>
                            </div>
                        </article>

                        <!-- Mock Post 3 -->
                        <article class="feed-card">
                            <div class="feed-card__header">
                                <div class="feed-card__user">
                                    <div class="feed-card__avatar">CS</div>
                                    <div>
                                        <div class="feed-card__name">Caner Şahin</div>
                                        <div class="feed-card__time">1 gün önce</div>
                                    </div>
                                </div>
                                <span class="feed-card__tag">Öneriler</span>
                            </div>
                            <h3 class="feed-card__title">Yemekhane fiyatları ve alternatif mekanlar</h3>
                            <p class="feed-card__excerpt">Bu dönem yemekhane fiyatlarına gelen zamdan sonra kampüs dışındaki alternatif mekanları denemeye karar verdim. Doğu kampüs kapısındaki ev yemekleri yapan yer fiyat/performans olarak bayağı iyi. Başka önerisi olan var mı?</p>
                            <div class="feed-card__footer">
                                <div class="feed-action">
                                    <i data-lucide="heart" class="icon-sm"></i> 112 Beğeni
                                </div>
                                <div class="feed-action">
                                    <i data-lucide="message-square" class="icon-sm"></i> 34 Yorum
                                </div>
                            </div>
                        </article>

                        <div class="feed-load-more">
                            <button class="btn-load-more">Daha Fazla Yükle</button>
                        </div>
                    </div>

                    <!-- Right Column: Sidebar (Sticky) -->
                    <aside class="sidebar-column">
                        <!-- Widget 1: Trending -->
                        <div class="sidebar-widget">
                            <h4 class="sidebar-widget__title">🔥 Şu An Gündemde</h4>
                            <ul class="trending-list">
                                <li class="trending-item">
                                    <span class="trending-category">Soru & Cevap</span>
                                    <span class="trending-topic">Yaz Okulu Ücretleri</span>
                                </li>
                                <li class="trending-item">
                                    <span class="trending-category">Etkinlik</span>
                                    <span class="trending-topic">Bahar Şenliği 2026 Line-up</span>
                                </li>
                                <li class="trending-item">
                                    <span class="trending-category">Akademik</span>
                                    <span class="trending-topic">Vize Programı Açıklandı</span>
                                </li>
                                <li class="trending-item">
                                    <span class="trending-category">Kampüs Hayatı</span>
                                    <span class="trending-topic">Ring Sefer Saatleri Değişikliği</span>
                                </li>
                                <li class="trending-item">
                                    <span class="trending-category">Tartışma</span>
                                    <span class="trending-topic">Seçmeli Ders Kontenjanları</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Widget 2: Leaderboard -->
                        <div class="sidebar-widget">
                            <h4 class="sidebar-widget__title">🏆 Haftanın En Aktifleri</h4>
                            <div class="leaderboard-list">
                                <div class="leaderboard-item">
                                    <div class="leaderboard-avatar">MK</div>
                                    <div class="leaderboard-info">
                                        <div class="leaderboard-name">Mehmet K.</div>
                                        <div class="leaderboard-score">1,250 Puan</div>
                                    </div>
                                </div>
                                <div class="leaderboard-item">
                                    <div class="leaderboard-avatar">AS</div>
                                    <div class="leaderboard-info">
                                        <div class="leaderboard-name">Ayşe S.</div>
                                        <div class="leaderboard-score">980 Puan</div>
                                    </div>
                                </div>
                                <div class="leaderboard-item">
                                    <div class="leaderboard-avatar">BD</div>
                                    <div class="leaderboard-info">
                                        <div class="leaderboard-name">Burak D.</div>
                                        <div class="leaderboard-score">845 Puan</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
            
            <!-- FAQ Section -->
            <section class="home-faq container" style="padding-top: var(--space-2xl); padding-bottom: var(--space-xl);">
                <h2 class="section-title" style="text-align: center; margin-bottom: var(--space-xl);">Sıkça Sorulan <span>Sorular</span></h2>
                <div class="faq-list" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: var(--space-md);">
                    <div class="faq-item" style="background: var(--color-bg-card); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                        <h4 class="faq-question" style="font-family: var(--font-heading); margin-bottom: 8px; color: var(--color-text); display: flex; align-items: center; gap: 8px;"><i data-lucide="help-circle" style="color: var(--color-accent); width: 20px; height: 20px;"></i> Yorum yazmak için üye olmak zorunda mıyım?</h4>
                        <p class="faq-answer" style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-left: 28px;">Evet, platformda sahte yorumları engellemek ve güvenilirliği sağlamak adına yorum yazmak ve soru sormak için üyelik gereklidir. Okumak için ise üye olmanıza gerek yoktur.</p>
                    </div>
                    <div class="faq-item" style="background: var(--color-bg-card); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                        <h4 class="faq-question" style="font-family: var(--font-heading); margin-bottom: 8px; color: var(--color-text); display: flex; align-items: center; gap: 8px;"><i data-lucide="help-circle" style="color: var(--color-accent); width: 20px; height: 20px;"></i> Üniversitelerin bilgileri güncel mi?</h4>
                        <p class="faq-answer" style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-left: 28px;">Bilgiler düzenli olarak sistemimiz, yerel öğrenciler ve moderatör ekibimiz tarafından güncellenmektedir. Şehirler arası ulaşım süreleri ve yurt kontenjanları gibi veriler referans niteliğindedir.</p>
                    </div>
                    <div class="faq-item" style="background: var(--color-bg-card); padding: var(--space-lg); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                        <h4 class="faq-question" style="font-family: var(--font-heading); margin-bottom: 8px; color: var(--color-text); display: flex; align-items: center; gap: 8px;"><i data-lucide="help-circle" style="color: var(--color-accent); width: 20px; height: 20px;"></i> Puanlamalar neye göre yapılıyor?</h4>
                        <p class="faq-answer" style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; margin-left: 28px;">Üniversitelerin puanları; öğrencilerin kampüs, eğitim, sosyal hayat ve imkanlar gibi çeşitli kriterlerde verdiği bağımsız puanların otomatik ortalaması alınarak hesaplanır.</p>
                    </div>
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
