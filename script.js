document.addEventListener('DOMContentLoaded', () => {

    // ==================== MOBILE MENU ====================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    // ==================== CEO LEARN MORE (MOBILE) ====================
    const ceoLearnMoreBtn = document.getElementById('ceoLearnMoreBtn');
    const ceoBio = document.querySelector('.ceo-bio');

    if (ceoLearnMoreBtn && ceoBio) {
        ceoLearnMoreBtn.addEventListener('click', () => {
            const isExpanded = ceoBio.classList.toggle('expanded');
            ceoLearnMoreBtn.textContent = isExpanded ? 'Read Less' : 'Learn More';
        });
    }

    // ==================== SELECTED WORKS CAROUSEL ====================
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let activeIndex = 0;

    function showSlide(index) {
        if (cards.length === 0) return;

        // Wrap around index
        if (index >= cards.length) activeIndex = 0;
        else if (index < 0) activeIndex = cards.length - 1;
        else activeIndex = index;

        // Toggle active classes
        cards.forEach((card, idx) => {
            if (idx === activeIndex) {
                card.classList.add('active-card');
            } else {
                card.classList.remove('active-card');
            }
        });

        dots.forEach((dot, idx) => {
            if (idx === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Bind arrows
    const arrows = document.querySelectorAll('.carousel-arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(activeIndex + 1);
        });
    });

    // Bind dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            showSlide(index);
        });
    });

    // ==================== TEAM CAROUSEL SCROLLING ====================
    const teamGrid = document.getElementById('teamGrid');
    const teamPrev = document.getElementById('teamPrev');
    const teamNext = document.getElementById('teamNext');

    if (teamGrid && teamPrev && teamNext) {
        const getScrollAmount = () => {
            const card = teamGrid.querySelector('.team-card');
            if (!card) return 300;
            // Scroll by one card width + gap
            return card.offsetWidth + 24;
        };

        teamPrev.addEventListener('click', () => {
            teamGrid.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        teamNext.addEventListener('click', () => {
            teamGrid.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }

    // ==================== SCROLL SPY ====================
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset header height
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ==================== FORM SUBMISSION HANDLING ====================
    const pitchForm = document.getElementById('pitchForm');
    if (pitchForm) {
        pitchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitPitch');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'SUBMITTING...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'INQUIRY SENT SUCCESSFULLY ✔';
                submitBtn.style.backgroundColor = '#2ED47A';
                submitBtn.style.color = '#FFFFFF';
                pitchForm.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ==================== MATCHING ENGINE CONTROLLER ====================
    const MATCH_CONFIGS = [
        {
            source: {
                title: "Utility Vending",
                subtitle: "Electricity Grid Sync",
                meta: "API: vend_token_req",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
            },
            target: {
                title: "Fintech Gateway",
                subtitle: "Vending & billing Core",
                meta: "Port: Secure TLS",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`
            },
            console: "Pattern matched: vend_token_req with Fintech Core. Establishing tunnel...",
            log: "Token Vended: 4,500 kW | Txn ID: XT-9942A | Status: 100% Success",
            latency: "14ms"
        },
        {
            source: {
                title: "Clinic EMR",
                subtitle: "Patient Record Sync",
                meta: "Data: patient_telemetry",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`
            },
            target: {
                title: "Digital Health Core",
                subtitle: "EMR Analytics Engine",
                meta: "SSL Encrypted (AES)",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`
            },
            console: "Incoming telemetry: patient_telemetry_in. Matching hospital protocol...",
            log: "Telemetry Synced: 142 Clinics | EMR Encrypted | TLS 1.3 Active",
            latency: "22ms"
        },
        {
            source: {
                title: "POS Terminal",
                subtitle: "Edge Payment Auth",
                meta: "ISO-8583 Auth Message",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
            },
            target: {
                title: "Payments Network",
                subtitle: "Fintech & Vending Core",
                meta: "Route: secure_vending",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
            },
            console: "POS Request received from Terminal XT-3081. Authorizing...",
            log: "Auth Complete: Card Approved | NGN 35,000 processed successfully",
            latency: "18ms"
        },
        {
            source: {
                title: "Legacy DB Sync",
                subtitle: "Reconcile Database",
                meta: "Job: run_reconcile_db",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>`
            },
            target: {
                title: "Systems Integration",
                subtitle: "Middleware Sync Core",
                meta: "Connection: Active DB",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
            },
            console: "Executing DB Sync reconciliation job. Checking for ledger delta...",
            log: "Sync Complete: 100% reconciled | 0 discrepancies found",
            latency: "11ms"
        }
    ];

    let currentMatchIndex = 0;
    
    // UI Selectors
    const sourceCard = document.getElementById('sourceCard');
    const sourceIcon = document.getElementById('sourceIcon');
    const sourceTitle = document.getElementById('sourceTitle');
    const sourceSubtitle = document.getElementById('sourceSubtitle');
    const sourceMeta = document.getElementById('sourceMeta');

    const targetCard = document.getElementById('targetCard');
    const targetIcon = document.getElementById('targetIcon');
    const targetTitle = document.getElementById('targetTitle');
    const targetSubtitle = document.getElementById('targetSubtitle');
    const targetMeta = document.getElementById('targetMeta');

    const matchingCore = document.getElementById('matchingCore');
    const accuracyBadge = document.getElementById('accuracyBadge');
    
    const pathLeft = document.getElementById('path-left');
    const pathRight = document.getElementById('path-right');

    const widgetToast = document.getElementById('widgetToast');
    const toastLog = document.getElementById('toastLog');

    const consoleLog = document.getElementById('consoleLog');
    const latencyStat = document.getElementById('latencyStat');

    function runEngineCycle() {
        const config = MATCH_CONFIGS[currentMatchIndex];
        
        // --- PHASE 1: FADE OUT PREVIOUS (0s) ---
        widgetToast.classList.remove('show');
        sourceCard.classList.remove('active');
        targetCard.classList.remove('active');
        
        matchingCore.className = 'matching-core state-scanning';
        accuracyBadge.className = 'accuracy-badge';
        accuracyBadge.textContent = 'SCANNING';
        
        pathLeft.className.baseVal = '';
        pathRight.className.baseVal = '';
        
        setTimeout(() => {
            // --- PHASE 2: LOAD & SCAN SOURCE NODE (0.4s) ---
            // Set Source Node values
            sourceIcon.innerHTML = config.source.icon;
            sourceTitle.textContent = config.source.title;
            sourceSubtitle.textContent = config.source.subtitle;
            sourceMeta.textContent = config.source.meta;
            
            sourceCard.classList.add('active');
            
            // Set Target values but keep inactive
            targetIcon.innerHTML = config.target.icon;
            targetTitle.textContent = config.target.title;
            targetSubtitle.textContent = config.target.subtitle;
            targetMeta.textContent = config.target.meta;
            
            matchingCore.className = 'matching-core state-matching';
            accuracyBadge.className = 'accuracy-badge state-matching';
            accuracyBadge.textContent = 'ROUTING';
            pathLeft.className.baseVal = 'matching';
            
            consoleLog.textContent = `Scanning: ${config.source.meta}...`;
            latencyStat.textContent = 'Scanning...';
            
            setTimeout(() => {
                // --- PHASE 3: ESTABLISHING MATCH (1.6s) ---
                pathRight.className.baseVal = 'matching';
                consoleLog.textContent = config.console;
                
                setTimeout(() => {
                    // --- PHASE 4: SUCCESS MATCHED (2.4s) ---
                    targetCard.classList.add('active');
                    matchingCore.className = 'matching-core state-matched';
                    accuracyBadge.className = 'accuracy-badge state-matched';
                    accuracyBadge.textContent = 'MATCHED';
                    
                    pathLeft.className.baseVal = 'matched';
                    pathRight.className.baseVal = 'matched';
                    
                    // Show transaction details toast
                    toastLog.textContent = config.log;
                    widgetToast.classList.add('show');
                    
                    // Update logs & stats
                    consoleLog.textContent = `Match Verified. Integration Tunnel Online.`;
                    latencyStat.textContent = config.latency;
                    
                    // Increment for next cycle
                    currentMatchIndex = (currentMatchIndex + 1) % MATCH_CONFIGS.length;
                    
                    // Hold here for Dwell time (3.6s), total cycle = 6s
                    setTimeout(runEngineCycle, 3600);
                    
                }, 800);
            }, 1200);
        }, 400);
    }
    
    // Start matching engine if elements exist
    if (sourceCard && targetCard && matchingCore) {
        // Initial delay before start
        setTimeout(runEngineCycle, 1000);
    }
});

