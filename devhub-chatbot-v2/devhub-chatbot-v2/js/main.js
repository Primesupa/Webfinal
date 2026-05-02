// DevHub - Main JavaScript
// ============================================
// State Management
// ============================================
let currentLanguage = localStorage.getItem('devhub_language') || 'en';
let currentTheme = localStorage.getItem('devhub_theme') || 'dark';
let selectedProgrammingLanguage = null;
let currentFilters = {
    language: 'all',
    type: 'all',
    difficulty: 'all',
    sort: 'popular'
};
let librariesDisplayCount = 12;
let videosDisplayCount = 9;

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    initializeNavigation();
    initializeUserHeader();
    initializeLanguages();
    initializeLibraries();
    initializeVideos();
    initializeFilters();
    initializeSearch();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeChatbot();
});

// ============================================
// Theme Management
// ============================================
function initializeTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    // Apply saved theme
    if (currentTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            currentTheme = 'light';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            currentTheme = 'dark';
        }
        localStorage.setItem('devhub_theme', currentTheme);
    });
}

// ============================================
// Language/i18n Management
// ============================================
function initializeLanguage() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Update current language display
    updateCurrentLanguageDisplay();
    
    // Apply translations
    applyTranslations(currentLanguage);
    
    // RTL support for Arabic
    if (currentLanguage === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    }
    
    // Language dropdown toggle
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('active');
    });
    
    // Language option selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.dataset.lang;
            changeLanguage(lang);
            languageDropdown.classList.remove('active');
        });
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('devhub_language', lang);
    
    // Update display
    updateCurrentLanguageDisplay();
    
    // Apply translations
    applyTranslations(lang);
    
    // Handle RTL
    if (lang === 'ar') {
        document.body.setAttribute('dir', 'rtl');
    } else {
        document.body.setAttribute('dir', 'ltr');
    }
}

function updateCurrentLanguageDisplay() {
    const currentLangEl = document.getElementById('currentLang');
    const langMap = {
        'en': 'EN',
        'ar': 'AR',
        'es': 'ES',
        'fr': 'FR',
        'zh': 'ZH'
    };
    currentLangEl.textContent = langMap[currentLanguage] || 'EN';
}

function applyTranslations(lang) {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const translation = getTranslation(key, lang);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.innerHTML = translation;
        }
    });
    
    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        element.placeholder = getTranslation(key, lang);
    });
}

// ============================================
// Navigation
// ============================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active from all links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active to clicked link
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                const targetNavLink = document.querySelector(`.nav-link[href="${href}"]`);
                if (targetNavLink) {
                    targetNavLink.classList.add('active');
                }
            }
            
            // Close mobile menu
            document.getElementById('mobileMenu').classList.remove('active');
        });
    });
}

function initializeUserHeader() {
    const userWidget = document.getElementById('userWidget');
    if (!userWidget) return;

    function renderUser(data) {
        if (data.loggedIn) {
            const picture = data.picture ? data.picture : 'https://via.placeholder.com/40?text=U';
            userWidget.innerHTML = `
                <a class="user-badge" href="php/profile.php">
                    <img src="${picture}" alt="${escapeHtml(data.display_name)}">
                    <span>${escapeHtml(data.display_name)}</span>
                </a>
                <a class="btn-logout" href="php/logout.php">Logout</a>
            `;
        } else {
            userWidget.innerHTML = '<a class="btn-login" href="php/index.php">Login</a>';
        }
    }

    fetch('php/user.php', { credentials: 'same-origin' })
        .then(response => response.json())
        .then(data => renderUser(data))
        .catch(() => renderUser({ loggedIn: false }));
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ============================================
// Programming Languages Display
// ============================================
function initializeLanguages() {
    const languagesGrid = document.getElementById('languagesGrid');
    
    programmingLanguages.forEach(lang => {
        const card = createLanguageCard(lang);
        languagesGrid.appendChild(card);
    });
}

function createLanguageCard(lang) {
    const card = document.createElement('div');
    card.className = 'language-card fade-in';
    card.dataset.language = lang.id;
    
    card.innerHTML = `
        <div class="language-icon">${lang.icon}</div>
        <div class="language-name">${lang.name}</div>
    `;
    
    card.addEventListener('click', () => {
        // Toggle selection
        const wasActive = card.classList.contains('active');
        
        // Remove active from all
        document.querySelectorAll('.language-card').forEach(c => c.classList.remove('active'));
        
        if (!wasActive) {
            card.classList.add('active');
            selectedProgrammingLanguage = lang.id;
            currentFilters.language = lang.id;
        } else {
            selectedProgrammingLanguage = null;
            currentFilters.language = 'all';
        }
        
        // Update filter select
        document.getElementById('filterLanguage').value = currentFilters.language;
        
        // Apply filters
        applyFilters();
        
        // Scroll to libraries
        document.getElementById('libraries').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    
    return card;
}

// ============================================
// Libraries Display
// ============================================
function initializeLibraries() {
    renderLibraries();
    
    // Load more button
    document.getElementById('loadMoreLibraries').addEventListener('click', () => {
        librariesDisplayCount += 9;
        renderLibraries();
    });
}

function renderLibraries() {
    const librariesGrid = document.getElementById('librariesGrid');
    const loadMoreBtn = document.getElementById('loadMoreLibraries');
    
    // Filter libraries
    const filteredLibraries = filterContent(libraries);
    
    // Clear grid
    librariesGrid.innerHTML = '';
    
    // Display libraries
    const librariesToShow = filteredLibraries.slice(0, librariesDisplayCount);
    librariesToShow.forEach((lib, index) => {
        const card = createLibraryCard(lib);
        card.style.animationDelay = `${index * 0.05}s`;
        librariesGrid.appendChild(card);
    });
    
    // Show/hide load more button
    if (filteredLibraries.length <= librariesDisplayCount) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
    
    // No results message
    if (filteredLibraries.length === 0) {
        librariesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No libraries found matching your criteria.</p>';
    }
}

function createLibraryCard(lib) {
    const card = document.createElement('div');
    card.className = 'library-card slide-in-up';
    card.dataset.language = lib.language;
    card.dataset.difficulty = lib.difficulty;
    
    const languageInfo = programmingLanguages.find(l => l.id === lib.language);
    card.dataset.searchText = `${lib.name} ${lib.description} ${lib.language}`;
    card.dataset.searchTitle = lib.name;
    
    card.innerHTML = `
        <div class="library-header">
            <div class="library-logo">${lib.icon}</div>
            <div class="library-info">
                <div class="library-name">${lib.name}</div>
                <div class="library-language">
                    <span>${languageInfo?.icon || ''}</span>
                    <span>${languageInfo?.name || lib.language}</span>
                </div>
            </div>
        </div>
        <p class="library-description">${lib.description}</p>
        <div class="library-footer">
            <div class="library-stats">
                <span class="stat-badge">
                    <i class="fas fa-star"></i> ${formatNumber(lib.stars)}
                </span>
                <span class="stat-badge">
                    <i class="fas fa-download"></i> ${lib.downloads}
                </span>
            </div>
            <button class="btn-docs" onclick="window.open('${lib.docs}', '_blank')">
                ${getTranslation('view_docs', currentLanguage)}
            </button>
        </div>
    `;
    
    return card;
}

// ============================================
// Videos Display
// ============================================
function initializeVideos() {
    renderVideos();
    
    // Load more button
    document.getElementById('loadMoreVideos').addEventListener('click', () => {
        videosDisplayCount += 6;
        renderVideos();
    });
}

function renderVideos() {
    const videosGrid = document.getElementById('videosGrid');
    const loadMoreBtn = document.getElementById('loadMoreVideos');
    
    // Filter videos
    const filteredVideos = filterContent(videos);
    
    // Clear grid
    videosGrid.innerHTML = '';
    
    // Display videos
    const videosToShow = filteredVideos.slice(0, videosDisplayCount);
    videosToShow.forEach((video, index) => {
        const card = createVideoCard(video);
        card.style.animationDelay = `${index * 0.05}s`;
        videosGrid.appendChild(card);
    });
    
    // Show/hide load more button
    if (filteredVideos.length <= videosDisplayCount) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
    }
    
    // No results message
    if (filteredVideos.length === 0) {
        videosGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No videos found matching your criteria.</p>';
    }
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card slide-in-up';
    card.dataset.language = video.language;
    card.dataset.difficulty = video.difficulty;
    
    const languageInfo = programmingLanguages.find(l => l.id === video.language);
    const difficultyClass = `difficulty-${video.difficulty}`;
    card.dataset.searchText = `${video.title} ${video.description} ${video.language}`;
    card.dataset.searchTitle = video.title;
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            <div class="video-overlay">
                <div class="play-btn">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="video-duration">${video.duration}</div>
        </div>
        <div class="video-content">
            <h3 class="video-title">${video.title}</h3>
            <div class="video-meta">
                <span class="video-tag">
                    <span>${languageInfo?.icon || ''}</span>
                    <span>${languageInfo?.name || video.language}</span>
                </span>
                <span class="difficulty-badge ${difficultyClass}">
                    ${video.difficulty.charAt(0).toUpperCase() + video.difficulty.slice(1)}
                </span>
            </div>
            <div class="video-stats">
                <span><i class="fas fa-eye"></i> ${video.views}</span>
                <span><i class="fas fa-star"></i> ${video.rating}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        if (video.videoId) {
            // Use the openVideoModal function defined in index.html
            openVideoModal(video.videoId);
        } else {
            // Fallback: open YouTube search for this video title in a new tab
            const query = encodeURIComponent(video.title);
            window.open('https://www.youtube.com/results?search_query=' + query, '_blank');
        }
    });

    return card;
}

// Modal close handlers are already set up in index.html.
// This block is kept empty intentionally to avoid duplicate listeners.
// ============================================
// Filters
// ============================================
function initializeFilters() {
    const filterLanguage = document.getElementById('filterLanguage');
    const filterType = document.getElementById('filterType');
    const filterDifficulty = document.getElementById('filterDifficulty');
    const filterSort = document.getElementById('filterSort');
    const resetBtn = document.getElementById('resetFilters');
    
    // Filter change handlers
    filterLanguage.addEventListener('change', (e) => {
        currentFilters.language = e.target.value;
        
        // Update language card selection
        document.querySelectorAll('.language-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.language === e.target.value) {
                card.classList.add('active');
            }
        });
        
        applyFilters();
    });
    
    filterType.addEventListener('change', (e) => {
        currentFilters.type = e.target.value;
        applyFilters();
    });
    
    filterDifficulty.addEventListener('change', (e) => {
        currentFilters.difficulty = e.target.value;
        applyFilters();
    });
    
    filterSort.addEventListener('change', (e) => {
        currentFilters.sort = e.target.value;
        applyFilters();
    });
    
    // Reset filters
    resetBtn.addEventListener('click', () => {
        currentFilters = {
            language: 'all',
            type: 'all',
            difficulty: 'all',
            sort: 'popular'
        };
        
        filterLanguage.value = 'all';
        filterType.value = 'all';
        filterDifficulty.value = 'all';
        filterSort.value = 'popular';
        
        document.querySelectorAll('.language-card').forEach(card => {
            card.classList.remove('active');
        });
        
        applyFilters();
    });
}

function applyFilters() {
    librariesDisplayCount = 12;
    videosDisplayCount = 9;
    renderLibraries();
    renderVideos();
}

function filterContent(items) {
    let filtered = [...items];
    
    // Filter by language
    if (currentFilters.language !== 'all') {
        filtered = filtered.filter(item => item.language === currentFilters.language);
    }
    
    // Filter by type
    if (currentFilters.type !== 'all') {
        filtered = filtered.filter(item => item.type === currentFilters.type);
    }
    
    // Filter by difficulty
    if (currentFilters.difficulty !== 'all') {
        filtered = filtered.filter(item => item.difficulty === currentFilters.difficulty);
    }
    
    // Sort
    switch (currentFilters.sort) {
        case 'popular':
            filtered.sort((a, b) => (b.stars || b.views || 0) - (a.stars || a.views || 0));
            break;
        case 'newest':
            // In a real app, you'd sort by date
            filtered.reverse();
            break;
        case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
    }
    
    return filtered;
}

// ============================================
// Search
// ============================================
function initializeSearch() {
    const heroSearch = document.getElementById('heroSearch');
    const searchToggle = document.getElementById('searchToggle');
    const searchSubmit = document.querySelector('.search-submit');
    const searchHistoryContainer = document.getElementById('searchHistory');
    
    if (!heroSearch) return;

    heroSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        performSearch(query);
    });

    heroSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchFromInput();
        }
    });

    if (searchSubmit) {
        searchSubmit.addEventListener('click', () => {
            searchFromInput();
        });
    }

    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            heroSearch.focus();
            heroSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    if (searchHistoryContainer) {
        renderSearchHistory();
    }
}

function searchFromInput() {
    const heroSearch = document.getElementById('heroSearch');
    if (!heroSearch) return;

    const query = heroSearch.value.toLowerCase().trim();
    performSearch(query);
    addSearchHistory(query);
    openExactMatchIfAny(query);
}

function openExactMatchIfAny(query) {
    const exactMatch = findExactSearchMatch(query);
    if (!exactMatch) return;

    if (exactMatch.type === 'library' && exactMatch.item.docs) {
        window.open(exactMatch.item.docs, '_blank');
    }

    if (exactMatch.type === 'video' && exactMatch.item.videoId) {
        openVideoModal(exactMatch.item.videoId);
    }
}

function findExactSearchMatch(query) {
    if (!query) return null;
    const normalizedQuery = query.toLowerCase().trim();

    const libraryMatch = libraries.find(lib => lib.name.toLowerCase() === normalizedQuery);
    if (libraryMatch) {
        return { type: 'library', item: libraryMatch };
    }

    const videoMatch = videos.find(video => video.title.toLowerCase() === normalizedQuery);
    if (videoMatch) {
        return { type: 'video', item: videoMatch };
    }

    return null;
}

function performSearch(query) {
    if (!query) {
        clearSearchHighlights();
        applyFilters();
        return;
    }

    // Search in libraries
    const matchingLibraries = libraries.filter(lib => 
        lib.name.toLowerCase().includes(query) ||
        lib.description.toLowerCase().includes(query) ||
        lib.language.toLowerCase().includes(query)
    );
    
    // Search in videos
    const matchingVideos = videos.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.language.toLowerCase().includes(query)
    );

    const librariesGrid = document.getElementById('librariesGrid');
    const videosGrid = document.getElementById('videosGrid');
    
    if (librariesGrid) librariesGrid.innerHTML = '';
    if (videosGrid) videosGrid.innerHTML = '';
    
    if (matchingLibraries.length === 0 && librariesGrid) {
        librariesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No libraries found for your search.</p>';
    } else if (librariesGrid) {
        matchingLibraries.forEach(lib => {
            librariesGrid.appendChild(createLibraryCard(lib));
        });
    }
    
    if (matchingVideos.length === 0 && videosGrid) {
        videosGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No videos found for your search.</p>';
    } else if (videosGrid) {
        matchingVideos.forEach(video => {
            videosGrid.appendChild(createVideoCard(video));
        });
    }
    
    if (document.getElementById('loadMoreLibraries')) {
        document.getElementById('loadMoreLibraries').style.display = 'none';
    }
    if (document.getElementById('loadMoreVideos')) {
        document.getElementById('loadMoreVideos').style.display = 'none';
    }

    highlightSearchMatches(query);
    scrollToFirstMatch(query);
}

function clearSearchHighlights() {
    document.querySelectorAll('.search-highlight, .search-exact-match').forEach(card => {
        card.classList.remove('search-highlight', 'search-exact-match');
    });
}

function highlightSearchMatches(query) {
    clearSearchHighlights();
    if (!query) return;

    const normalizedQuery = query.toLowerCase().trim();
    document.querySelectorAll('.library-card, .video-card').forEach(card => {
        const searchable = (card.dataset.searchText || '').toLowerCase();
        const title = (card.dataset.searchTitle || '').toLowerCase();

        if (searchable.includes(normalizedQuery)) {
            card.classList.add('search-highlight');
        }

        if (title === normalizedQuery) {
            card.classList.add('search-exact-match');
        }
    });
}

function scrollToFirstMatch(query) {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return;

    const firstMatch = Array.from(document.querySelectorAll('.library-card, .video-card'))
        .find(card => (card.dataset.searchText || '').toLowerCase().includes(normalizedQuery));

    if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function loadSearchHistory() {
    try {
        const stored = localStorage.getItem('devhub_search_history');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        return [];
    }
}

function saveSearchHistory(history) {
    localStorage.setItem('devhub_search_history', JSON.stringify(history));
    renderSearchHistory();
}

function addSearchHistory(query) {
    if (!query) return;
    const history = loadSearchHistory();
    const normalized = query.trim().toLowerCase();

    const filtered = history.filter(item => item !== normalized);
    filtered.unshift(normalized);

    const maxHistoryItems = 6;
    saveSearchHistory(filtered.slice(0, maxHistoryItems));
}

function renderSearchHistory() {
    const searchHistoryContainer = document.getElementById('searchHistory');
    if (!searchHistoryContainer) return;

    const history = loadSearchHistory();
    if (!history.length) {
        searchHistoryContainer.innerHTML = '<p class="search-history-empty">Recent searches will appear here.</p>';
        return;
    }

    searchHistoryContainer.innerHTML = history.map(item =>
        `<button type="button" class="search-history-item" data-query="${item}">${item}</button>`
    ).join('');

    searchHistoryContainer.querySelectorAll('.search-history-item').forEach(button => {
        button.addEventListener('click', () => {
            const query = button.dataset.query;
            const heroSearch = document.getElementById('heroSearch');
            if (heroSearch) heroSearch.value = query;
            performSearch(query);
            openExactMatchIfAny(query);
        });
    });
}

// ============================================
// Scroll Effects
// ============================================
function initializeScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe section headers
    document.querySelectorAll('.section-header').forEach(header => {
        observer.observe(header);
    });
}

// ============================================
// Utility Functions
// ============================================
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ============================================
// Newsletter Subscription
// ============================================
document.querySelector('.btn-newsletter')?.addEventListener('click', () => {
    const emailInput = document.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (email && validateEmail(email)) {
        alert('Thank you for subscribing! 🎉\n\nYou will receive the latest programming resources and tutorials.');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// Community Join Button
// ============================================
document.querySelector('.community-section .btn-primary')?.addEventListener('click', () => {
    alert('Welcome to the DevHub Community! 🚀\n\nThis is a demo. In production, this would redirect to the community registration page.');
});


// ============================================
// Chatbot V2
// ============================================
function initializeChatbot() {
    const widget = document.getElementById('chatbotWidget');
    const toggle = document.getElementById('chatbotToggle');
    const panel = document.getElementById('chatbotPanel');
    const closeBtn = document.getElementById('chatbotClose');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');
    const messages = document.getElementById('chatbotMessages');
    const typing = document.getElementById('chatbotTyping');
    const quickReplies = document.getElementById('chatbotQuickReplies');

    if (!widget || !toggle || !panel || !closeBtn || !form || !input || !messages || !typing || !quickReplies) return;

    let welcomeMessageShown = false;
    let autoOpened = false;

    function openChatbot() {
        widget.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
        toggle.classList.remove('has-notification');
        toggle.setAttribute('aria-label', 'Close chatbot');
        setTimeout(() => input.focus(), 120);
    }

    function closeChatbot() {
        widget.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-label', 'Open chatbot');
    }

    function scrollMessagesToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function addMessage(text, sender) {
        const message = document.createElement('div');
        message.className = `chat-message ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = text;

        message.appendChild(bubble);
        messages.appendChild(message);
        scrollMessagesToBottom();
    }

    function showTyping() {
        typing.classList.add('active');
        scrollMessagesToBottom();
    }

    function hideTyping() {
        typing.classList.remove('active');
    }

    function showWelcomeMessage() {
        if (welcomeMessageShown) return;

        addMessage(
            "Hi! I'm your DevHub Assistant.\nI'm an offline chatbot that can help with HTML, CSS, JavaScript, and beginner coding questions.",
            'bot'
        );
        addMessage(
            "Try the quick buttons below or type your own question.",
            'bot'
        );

        welcomeMessageShown = true;
        toggle.classList.remove('has-notification');
    }

    function replyWithCode(title, code) {
        return `${title}\n\n${code}`;
    }

    function getBotReply(userMessage) {
        const text = userMessage.toLowerCase().trim();

        if (/(hello|hi|hey|good morning|good afternoon|good evening)/.test(text)) {
            return "Hello 👋\nI'm here to help you learn HTML, CSS, and JavaScript.";
        }

        if (/(help|what can you do|how can you help|support)/.test(text)) {
            return "I can answer simple coding questions about:\n- HTML structure\n- CSS styling\n- JavaScript basics\n- DOM and events\n- Forms and responsive design";
        }

        if (/(how do i start coding|start coding|beginner|i am new|new to coding)/.test(text)) {
            return "A simple path is:\n1. Learn HTML for structure\n2. Learn CSS for styling\n3. Learn JavaScript for interactivity\n4. Build small projects and practice daily.";
        }

        if (/(html boilerplate|basic html|html template)/.test(text)) {
            return replyWithCode(
                "Here is a basic HTML structure:",
                "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello</h1>\n</body>\n</html>"
            );
        }

        if (text.includes('html') && /(what|learn|help|tag|element|page|use)/.test(text)) {
            return "HTML builds the structure of a webpage.\nIt is used for headings, paragraphs, images, buttons, links, forms, and page sections.";
        }

        if (/(html tag|html tags|tag|tags|element|elements)/.test(text)) {
            return "Common HTML tags are:\n<div>, <section>, <h1>, <p>, <a>, <img>, <button>, <form>, <input>.\nEach one has a job on the page.";
        }

        if (/(semantic html|semantic tags|header footer main section article)/.test(text)) {
            return "Semantic HTML means using meaningful tags like <header>, <main>, <section>, <article>, and <footer>.\nIt improves readability, SEO, and accessibility.";
        }

        if (text.includes('css') && /(what|learn|help|style|design|use)/.test(text)) {
            return "CSS styles your webpage.\nIt controls colors, spacing, fonts, layout, animations, and responsive design.";
        }

        if (/(selector|selectors)/.test(text)) {
            return "CSS selectors target elements.\nExamples:\n- p selects all paragraphs\n- .card selects a class\n- #header selects an id";
        }

        if (/(box model|margin|padding|border)/.test(text)) {
            return "The CSS box model is:\ncontent → padding → border → margin.\nPadding is inside the element. Margin is outside the element.";
        }

        if (/(flexbox|flex)/.test(text)) {
            return "Flexbox helps align items in one row or one column.\nUseful properties:\n- display: flex\n- justify-content\n- align-items\n- gap";
        }

        if (/(grid|css grid)/.test(text)) {
            return "CSS Grid is great for 2D layouts.\nUseful properties:\n- display: grid\n- grid-template-columns\n- grid-template-rows\n- gap";
        }

        if (/(responsive|media query|media queries|mobile)/.test(text)) {
            return replyWithCode(
                "Use media queries to make pages responsive:",
                "@media (max-width: 768px) {\n  .container {\n    padding: 1rem;\n  }\n}"
            );
        }

        if ((text.includes('javascript') || /\bjs\b/.test(text)) && /(what|learn|help|basics|use)/.test(text)) {
            return "JavaScript adds behavior to websites.\nIt can respond to clicks, change content, validate forms, and create interactive features.";
        }

        if (/(variable|variables|let|const|var)/.test(text)) {
            return "Variables store data.\nUse const for values that should not change, and let for values that can change.";
        }

        if (/(if statement|condition|conditional|if else)/.test(text)) {
            return replyWithCode(
                "JavaScript condition example:",
                "if (score >= 50) {\n  console.log('Pass');\n} else {\n  console.log('Try again');\n}"
            );
        }

        if (/(function|functions)/.test(text)) {
            return replyWithCode(
                "A function is reusable code:",
                "function greet(name) {\n  return 'Hello ' + name;\n}"
            );
        }

        if (/(loop|loops|for loop|while loop)/.test(text)) {
            return replyWithCode(
                "Loops repeat code:",
                "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}"
            );
        }

        if (/(array|arrays)/.test(text)) {
            return replyWithCode(
                "An array stores multiple values:",
                "const colors = ['red', 'blue', 'green'];"
            );
        }

        if (/(object|objects)/.test(text)) {
            return replyWithCode(
                "Objects store related data in key-value pairs:",
                "const student = {\n  name: 'Ali',\n  age: 19\n};"
            );
        }

        if (/(dom|document object model)/.test(text)) {
            return "The DOM is the webpage structure that JavaScript can read and change.\nIt lets you update text, styles, and elements in real time.";
        }

        if (/(event|events|click|onclick)/.test(text)) {
            return replyWithCode(
                "Events let JavaScript react to user actions:",
                "button.addEventListener('click', function () {\n  alert('Button clicked');\n});"
            );
        }

        if (/(form|forms|input validation|validate)/.test(text)) {
            return "Forms collect user data.\nJavaScript can validate inputs before submitting, like checking if an email or password is valid.";
        }

        if (/(bug|debug|error|fix my code)/.test(text)) {
            return "A simple debugging method is:\n1. Read the error message\n2. Check the browser console\n3. Test one part at a time\n4. Use console.log() to inspect values";
        }

        if (/(project ideas|what should i build|practice project)/.test(text)) {
            return "Beginner project ideas:\n- To-do list\n- Calculator\n- Quiz app\n- Weather UI mockup\n- Personal portfolio page";
        }

        if (/(resource|resources|tutorial|lesson|learn coding)/.test(text)) {
            return "You can explore your website sections for languages, libraries, and videos.\nTry searching for HTML, CSS, JavaScript, React, or Python.";
        }

        if (/(thank you|thanks|thx)/.test(text)) {
            return "You're welcome 😊\nAsk me another coding question anytime.";
        }

        return "I'm an offline rule-based assistant.\nTry asking about HTML, CSS, JavaScript, semantic tags, flexbox, grid, box model, variables, functions, loops, arrays, objects, DOM, events, forms, or responsive design.";
    }

    function handleUserMessage(userText) {
        addMessage(userText, 'user');
        showTyping();

        window.setTimeout(() => {
            hideTyping();
            addMessage(getBotReply(userText), 'bot');
        }, 700);
    }

    toggle.addEventListener('click', () => {
        if (widget.classList.contains('active')) {
            closeChatbot();
        } else {
            openChatbot();
            showWelcomeMessage();
        }
    });

    closeBtn.addEventListener('click', closeChatbot);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = input.value.trim();

        if (!userText) return;

        handleUserMessage(userText);
        input.value = '';
    });

    quickReplies.addEventListener('click', (e) => {
        const button = e.target.closest('.quick-reply-btn');
        if (!button) return;

        const text = button.textContent.trim();
        handleUserMessage(text);
    });

    document.addEventListener('click', (e) => {
        if (!widget.contains(e.target) && widget.classList.contains('active')) {
            closeChatbot();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeChatbot();
        }
    });

    toggle.classList.add('has-notification');

    window.setTimeout(() => {
        if (autoOpened) return;
        openChatbot();
        showWelcomeMessage();
        autoOpened = true;
    }, 1200);
}

console.log('🚀 DevHub initialized successfully!');
