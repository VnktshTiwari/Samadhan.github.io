// CivicFix JavaScript Application with FIXED Navigation and Map Management
class CivicFixApp {
    constructor() {
        this.currentPage = 'home';
        this.isAdminView = false;
        this.isLoggedIn = false;
        this.currentUser = null;
        this.civicData = null;
        this.currentStep = 1;
        this.uploadedFiles = [];
        this.formData = {};
        this.currentCategorization = null;
        this.currentLanguage = 'en';
        
        // FIXED: Enhanced Maps Management System
        this.maps = {
            heroMap: null,
            locationMap: null,
            transparencyMap: null
        };
        this.mapContainers = {
            heroMap: 'hero-map-container',
            locationMap: 'location-map-container', 
            transparencyMap: 'transparency-map-container'
        };
        this.mapsInitialized = {
            heroMap: false,
            locationMap: false,
            transparencyMap: false
        };
        
        // Gemini AI Configuration
        this.geminiApiKey = 'AIzaSyB3pk8fqbaw7Ks0Hh5MUPxxQ6NxdpPd7dk';
        this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
        this.isTyping = false;
        
        // Translation data
        this.translations = {
            en: {
                // Navigation
                nav_home: "Home",
                nav_report: "Report Issue",
                nav_dashboard: "My Dashboard",
                nav_community: "Community",
                nav_transparency: "Transparency",
                nav_support: "Support",
                admin_view: "Admin View",
                login: "Login",
                
                // Hero section
                hero_title: "Making Your Voice Heard in Local Government",
                hero_subtitle: "Report civic issues, track their resolution, and engage with your community through our transparent platform that connects citizens directly with city services.",
                hero_report_btn: "Report an Issue",
                hero_analytics_btn: "View Analytics",
                hero_stat_issues: "Issues Reported",
                hero_stat_resolved: "Issues Resolved",
                hero_stat_time: "Avg Resolution Time",
                
                // Mission
                mission_title: "Our Mission",
                mission_text: "CivicFix bridges the gap between citizens and local government by providing a transparent, efficient platform for reporting and resolving civic issues. We believe in empowering communities through technology, data-driven insights, and collaborative problem-solving.",
                
                // Quick nav
                quick_nav_title: "Quick Actions",
                tile_report_title: "Report Issue",
                tile_report_desc: "Submit a new civic issue with photos and location",
                tile_track_title: "Track Issues",
                tile_track_desc: "Monitor the progress of your submitted issues",
                tile_community_title: "Join Community",
                tile_community_desc: "Engage in discussions and vote on priorities",
                tile_analytics_title: "View Analytics",
                tile_analytics_desc: "Explore city performance and transparency data",
                
                // Report form
                report_title: "Report an Issue",
                report_subtitle: "Help us improve your community by reporting civic issues",
                step_location: "Location",
                step_details: "Details",
                step_media: "Media",
                step_review: "Review",
                location_question: "Where is the issue located?",
                location_label: "Address or Location",
                location_placeholder: "Enter address or describe location",
                use_location: "Use My Location",
                details_question: "Tell us about the issue",
                category_label: "Category",
                select_category: "Select a category",
                subcategory_label: "Subcategory",
                select_subcategory: "Select a subcategory",
                priority_label: "Priority Level",
                select_priority: "Select priority",
                priority_low: "Low - Minor inconvenience",
                priority_medium: "Medium - Moderate concern",
                priority_high: "High - Significant issue",
                priority_critical: "Critical - Safety hazard",
                description_label: "Description",
                description_placeholder: "Describe the issue in detail...",
                ai_suggestion_title: "AI Categorization Suggestion:",
                media_question: "Add photos or documents",
                upload_prompt: "Drag and drop files here or click to browse",
                upload_hint: "Supported: JPG, PNG, PDF (Max 5MB each)",
                review_question: "Review your report",
                anonymous_submit: "Submit anonymously",
                name_label: "Your Name (Optional)",
                name_placeholder: "Enter your name",
                email_label: "Contact Email",
                email_placeholder: "your@email.com",
                phone_label: "Phone Number (Optional)",
                phone_placeholder: "(555) 123-4567",
                prev_button: "Previous",
                next_button: "Next",
                submit_report: "Submit Report",
                
                // Common elements
                platform: "Platform",
                support: "Support",
                legal: "Legal"
            },
            hi: {
                // Navigation (Hindi)
                nav_home: "होम",
                nav_report: "समस्या रिपोर्ट करें",
                nav_dashboard: "मेरा डैशबोर्ड",
                nav_community: "समुदाय",
                nav_transparency: "पारदर्शिता",
                nav_support: "सहायता",
                admin_view: "एडमिन व्यू",
                login: "लॉगिन"
            },
            ta: {
                // Navigation (Tamil)
                nav_home: "முகப்பு",
                nav_report: "சிக்கல் அறிக்கை",
                nav_dashboard: "என் டாஷ்போர்ட்",
                nav_community: "சமுதாயம்",
                nav_transparency: "வெளிப்படைத்தன்மை",
                nav_support: "ஆதரவு",
                admin_view: "நிர்வாக காட்சி",
                login: "உள்நுழைவு"
            }
        };
        
        // Initialize immediately
        this.init();
    }

    async init() {
        console.log('Initializing CivicFix App...');
        try {
            await this.loadCivicData();
            this.detectTheme();
            this.initializeLanguage();
            this.setupEventListeners();
            this.setupNavigation();
            this.populateInitialData();
            
            // FIXED: Initialize home page maps immediately
            setTimeout(() => {
                this.initializeHomePage();
            }, 300);
            
            // Add resize event listener for mobile compatibility
            this.setupResizeListener();
            
            console.log('CivicFix App initialized successfully');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // FIXED: Initialize home page immediately on app start
    initializeHomePage() {
        console.log('Initializing home page on startup');
        this.populateTestimonials();
        this.initializeHeroMap();
    }

    // FIXED: Enhanced resize listener for mobile compatibility
    setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });

        // Handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 500);
        });
    }

    handleResize() {
        console.log('Handling resize event');
        
        // Invalidate size for all active maps
        Object.keys(this.maps).forEach(mapKey => {
            if (this.maps[mapKey]) {
                try {
                    setTimeout(() => {
                        if (this.maps[mapKey]) {
                            this.maps[mapKey].invalidateSize();
                            console.log(`Resized map: ${mapKey}`);
                        }
                    }, 100);
                } catch (error) {
                    console.warn(`Error resizing map ${mapKey}:`, error);
                }
            }
        });
    }

    initializeLanguage() {
        // Check for saved language preference
        const savedLanguage = localStorage.getItem('civic-language') || 'en';
        this.currentLanguage = savedLanguage;
        
        // Update language selector
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.value = this.currentLanguage;
        }
        
        // Apply language
        this.applyLanguage(this.currentLanguage);
        
        console.log('Language initialized:', this.currentLanguage);
    }

    changeLanguage(languageCode) {
        console.log('Changing language to:', languageCode);
        this.currentLanguage = languageCode;
        
        // Save language preference
        localStorage.setItem('civic-language', languageCode);
        
        // Apply language
        this.applyLanguage(languageCode);
        
        // Apply font class to body
        document.body.className = document.body.className.replace(/lang-\w+/g, '');
        if (languageCode !== 'en') {
            document.body.classList.add(`lang-${languageCode}`);
        }
        
        this.showToast('Language changed successfully', 'success');
    }

    applyLanguage(languageCode) {
        const translations = this.translations[languageCode] || this.translations.en;
        
        // Translate elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[key]) {
                element.placeholder = translations[key];
            }
        });
        
        // Update document language attribute
        document.documentElement.lang = languageCode;
        
        console.log('Language applied:', languageCode);
    }

    async loadCivicData() {
        this.civicData = {
            civic_issues: [
                {
                    id: "CIV-0001",
                    title: "Bus stop maintenance - Business Park East",
                    description: "Bus stop maintenance reported in Business Park East area requiring attention",
                    category: "Public Facilities",
                    subcategory: "Bus stop maintenance",
                    status: "Resolved",
                    priority: "Medium",
                    location: { name: "Business Park East", lat: 40.7282, lng: -73.7949 },
                    address: "456 Center Blvd, Business Park East",
                    department: "Parks & Recreation",
                    created_date: "2025-08-30T23:37:44.524318",
                    reporter: "Citizen 1",
                    reporter_contact: "citizen1@email.com",
                    votes: 14,
                    comments: 1,
                    estimated_resolution: "1 week"
                },
                {
                    id: "CIV-0002",
                    title: "Road safety concerns - Medical Center Area",
                    description: "Road safety concerns reported in Medical Center Area area requiring attention",
                    category: "Traffic & Transport",
                    subcategory: "Road safety concerns",
                    status: "In Progress",
                    priority: "Critical",
                    location: { name: "Medical Center Area", lat: 40.7831, lng: -73.9712 },
                    address: "764 First St, Medical Center Area",
                    department: "Transportation",
                    created_date: "2025-09-01T23:37:44.524318",
                    reporter: "Citizen 2",
                    reporter_contact: "citizen2@email.com",
                    votes: 8,
                    comments: 5,
                    estimated_resolution: "2 weeks"
                },
                {
                    id: "CIV-0003",
                    title: "Potholes - Shopping District",
                    description: "Large pothole on main road causing traffic issues and vehicle damage near Shopping District",
                    category: "Roads & Infrastructure",
                    subcategory: "Potholes",
                    status: "Resolved",
                    priority: "High",
                    location: { name: "Shopping District", lat: 40.7527, lng: -73.9772 },
                    address: "890 Park Rd, Shopping District",
                    department: "Public Works",
                    created_date: "2025-09-05T23:37:44.524318",
                    reporter: "Citizen 3",
                    reporter_contact: "citizen3@email.com",
                    votes: 23,
                    comments: 8,
                    estimated_resolution: "1-3 days"
                },
                {
                    id: "CIV-0004",
                    title: "Water leak - Downtown Core",
                    description: "Major water leak from main pipeline causing road flooding",
                    category: "Water & Sewerage",
                    subcategory: "Water leakage",
                    status: "Open",
                    priority: "Critical",
                    location: { name: "Downtown Core", lat: 40.7128, lng: -74.0060 },
                    address: "123 Main St, Downtown Core",
                    department: "Water Department",
                    created_date: "2025-09-10T10:15:00.000Z",
                    reporter: "Citizen 4",
                    reporter_contact: "citizen4@email.com",
                    votes: 35,
                    comments: 12,
                    estimated_resolution: "2-3 days"
                },
                {
                    id: "CIV-0005",
                    title: "Broken streetlight - University Area",
                    description: "Multiple street lights not working creating safety hazards",
                    category: "Public Safety",
                    subcategory: "Streetlight not working",
                    status: "In Progress",
                    priority: "High",
                    location: { name: "University Area", lat: 40.6892, lng: -74.0445 },
                    address: "567 College Ave, University Area",
                    department: "Public Safety",
                    created_date: "2025-09-08T18:30:00.000Z",
                    reporter: "Citizen 5",
                    reporter_contact: "citizen5@email.com",
                    votes: 18,
                    comments: 6,
                    estimated_resolution: "1 week"
                }
            ],
            categories: {
                "Roads & Infrastructure": ["Potholes", "Damaged road surface", "Missing manhole covers", "Waterlogged roads", "Broken footpaths", "Damaged bridges", "Construction debris on road"],
                "Water & Sewerage": ["Water leakage", "No water supply", "Dirty water supply", "Blocked sewage", "Overflowing drains", "Low water pressure", "Sewage main hole cover missing"],
                "Waste Management": ["Garbage not cleared", "Damaged garbage bins", "Burning of garbage", "Non-sweeping of roads", "Illegal dumping", "Overflowing trash cans"],
                "Public Safety": ["Streetlight not working", "Missing street lights", "Fallen trees", "Stray animals", "Dead animals", "Public safety hazards"],
                "Public Facilities": ["Dirty public toilets", "Public toilet damaged", "Parks need maintenance", "Bus stop maintenance", "Public building repairs"],
                "Traffic & Transport": ["Traffic signal malfunction", "Illegal parking", "Traffic congestion", "Public transport issues", "Road safety concerns"],
                "Environment": ["Air pollution", "Noise pollution", "Tree cutting required", "Mosquito breeding", "Illegal construction", "Land violations"]
            },
            testimonials: [
                {
                    name: "Sarah Johnson",
                    location: "Downtown Core",
                    comment: "CivicFix made it so easy to report the pothole on my street. It was fixed within a week!",
                    rating: 5,
                    issue_type: "Road Maintenance"
                },
                {
                    name: "Michael Chen",
                    location: "University Area",
                    comment: "Love how I can track the progress of my complaint. Great transparency!",
                    rating: 5,
                    issue_type: "Street Lighting"
                },
                {
                    name: "Emily Rodriguez",
                    location: "Residential North",
                    comment: "The geolocation feature is fantastic - no need to type addresses manually.", 
                    rating: 4,
                    issue_type: "Waste Management"
                }
            ],
            platform_stats: {
                total_issues_reported: 12847,
                issues_resolved: 9634,
                average_resolution_time: "8.2 days",
                active_users: 15623,
                departments_connected: 12,
                satisfaction_rate: 94.2,
                response_rate: 97.8
            }
        };
        console.log('Civic data loaded successfully with', this.civicData.civic_issues.length, 'issues');
    }

    // FIXED: Completely rewritten event handling system
    setupEventListeners() {
        console.log('Setting up FIXED event listeners...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindEvents();
            });
        } else {
            this.bindEvents();
        }
    }

    // FIXED: Robust event binding system
    bindEvents() {
        console.log('Binding FIXED events...');

        try {
            // FIXED: Universal click handler with proper delegation
            document.body.addEventListener('click', (e) => {
                console.log('Click detected on:', e.target);
                
                // Language selector - prevent navigation
                if (e.target.matches('#language-selector') || e.target.closest('#language-selector')) {
                    console.log('Language selector clicked');
                    return;
                }

                // Navigation links - FIXED with comprehensive selectors
                const navElement = e.target.closest('[data-page]') || 
                                 e.target.closest('.navbar__link') ||
                                 e.target.closest('.quick-nav__tile') ||
                                 e.target.closest('a[href^="#"]');
                
                if (navElement) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    let page;
                    if (navElement.hasAttribute('data-page')) {
                        page = navElement.getAttribute('data-page');
                    } else if (navElement.getAttribute('href')) {
                        page = navElement.getAttribute('href').replace('#', '');
                    }
                    
                    if (page) {
                        console.log('FIXED Navigation to:', page);
                        this.navigateToPage(page);
                        return;
                    }
                }

                // Theme toggle
                if (e.target.matches('#theme-toggle') || e.target.closest('#theme-toggle')) {
                    e.preventDefault();
                    console.log('Theme toggle clicked');
                    this.toggleTheme();
                    return;
                }

                // Login button
                if (e.target.matches('#login-btn') || e.target.closest('#login-btn')) {
                    e.preventDefault();
                    this.toggleLogin();
                    return;
                }

                // Admin toggle
                if (e.target.matches('#admin-toggle') || e.target.closest('#admin-toggle')) {
                    e.preventDefault();
                    this.toggleAdminView();
                    return;
                }

                // Mobile navigation toggle
                if (e.target.matches('#navbar-toggle') || e.target.closest('#navbar-toggle')) {
                    e.preventDefault();
                    const navMenu = document.getElementById('navbar-menu');
                    if (navMenu) {
                        navMenu.classList.toggle('active');
                        const isExpanded = navMenu.classList.contains('active');
                        e.target.closest('#navbar-toggle').setAttribute('aria-expanded', isExpanded);
                    }
                    return;
                }

                // Categorization controls
                if (e.target.matches('#categorize-by-department') || e.target.closest('#categorize-by-department')) {
                    e.preventDefault();
                    this.categorizeIssuesByDepartment();
                    return;
                }

                if (e.target.matches('#categorize-by-priority') || e.target.closest('#categorize-by-priority')) {
                    e.preventDefault();
                    this.categorizeIssuesByPriority();
                    return;
                }

                if (e.target.matches('#reset-categorization') || e.target.closest('#reset-categorization')) {
                    e.preventDefault();
                    this.resetCategorization();
                    return;
                }
            });

            // FIXED: Direct language selector handling
            const languageSelector = document.getElementById('language-selector');
            if (languageSelector) {
                languageSelector.addEventListener('change', (e) => {
                    e.stopPropagation();
                    console.log('Language changed to:', e.target.value);
                    this.changeLanguage(e.target.value);
                });
            }

            // Newsletter form
            const newsletterForm = document.getElementById('newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.showToast('Thanks for subscribing! You\'ll receive updates soon.', 'success');
                    newsletterForm.reset();
                });
            }

            // Setup other components
            this.setupReportForm();
            this.setupSupportSystem();
            this.setupDashboardFilters();
            this.setupCommunityInteractions();
            this.setupFAQInteractions();
            this.setupModals();

            console.log('FIXED Event binding completed');
        } catch (error) {
            console.error('Error in bindEvents:', error);
        }
    }

    // FIXED: Enhanced Map Cleanup and Initialization System
    destroyMap(mapKey) {
        console.log(`Destroying map: ${mapKey}`);
        
        if (this.maps[mapKey]) {
            try {
                // Remove the map instance
                this.maps[mapKey].remove();
                console.log(`Map ${mapKey} removed successfully`);
            } catch (error) {
                console.warn(`Error removing map ${mapKey}:`, error);
            }
            
            // Clear the reference
            this.maps[mapKey] = null;
            this.mapsInitialized[mapKey] = false;
        }

        // Clear the container HTML to prevent conflicts
        const container = document.getElementById(this.mapContainers[mapKey]);
        if (container) {
            container.innerHTML = '';
        }
    }

    destroyAllMaps() {
        console.log('Destroying all maps');
        Object.keys(this.maps).forEach(mapKey => {
            this.destroyMap(mapKey);
        });
    }

    // FIXED: Check if container exists and is visible before initializing
    isContainerReady(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return false;
        }

        // Check if container is visible and has dimensions
        const rect = container.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;
        
        if (!isVisible) {
            console.warn(`Container ${containerId} not visible or has no dimensions`);
        }

        return true; // Return true anyway to allow initialization attempt
    }

    // FIXED: Enhanced Hero Map Initialization with proper error handling
    initializeHeroMap() {
        const mapKey = 'heroMap';
        const containerId = this.mapContainers[mapKey];
        
        console.log('FIXED: Initializing hero map...');

        // Check if container is ready
        if (!this.isContainerReady(containerId)) {
            console.warn('Hero map container not ready, retrying...');
            setTimeout(() => this.initializeHeroMap(), 500);
            return;
        }

        // Destroy existing map if it exists
        if (this.maps[mapKey]) {
            this.destroyMap(mapKey);
        }

        // Check if Leaflet is available
        if (typeof L === 'undefined') {
            console.warn('Leaflet not available, showing fallback');
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f9ff; color: #0369a1; font-weight: 500;">Interactive Map Loading...</div>';
            }
            return;
        }

        try {
            // Initialize map immediately
            this.maps[mapKey] = L.map(containerId, {
                center: [40.7128, -73.9060],
                zoom: 11,
                zoomControl: true,
                attributionControl: true
            });
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(this.maps[mapKey]);

            // Mark as initialized
            this.mapsInitialized[mapKey] = true;

            // Invalidate size after short delay
            setTimeout(() => {
                if (this.maps[mapKey]) {
                    this.maps[mapKey].invalidateSize();
                    console.log('Hero map size invalidated');
                    
                    // Add markers for civic issues
                    if (this.civicData && this.civicData.civic_issues) {
                        this.addIssueMarkersToMap(this.maps[mapKey], this.civicData.civic_issues);
                    }
                }
            }, 100);

            console.log('FIXED: Hero map initialized successfully');
        } catch (error) {
            console.error('Error creating hero map:', error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #fef3c7; color: #92400e; font-weight: 500;">Map temporarily unavailable</div>';
            }
        }
    }

    // FIXED: Enhanced Location Map Initialization
    initializeLocationMap() {
        const mapKey = 'locationMap';
        const containerId = this.mapContainers[mapKey];
        
        console.log('FIXED: Initializing location map...');

        // Check if container is ready
        if (!this.isContainerReady(containerId)) {
            console.warn('Location map container not ready, retrying...');
            setTimeout(() => this.initializeLocationMap(), 500);
            return;
        }

        // Destroy existing map if it exists
        if (this.maps[mapKey]) {
            this.destroyMap(mapKey);
        }

        if (typeof L === 'undefined') {
            console.warn('Leaflet not available, showing fallback');
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f9ff; color: #0369a1; font-weight: 500;">Location Map Loading...</div>';
            }
            return;
        }

        try {
            this.maps[mapKey] = L.map(containerId, {
                center: [40.7128, -73.9060],
                zoom: 12,
                zoomControl: true
            });
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(this.maps[mapKey]);

            this.mapsInitialized[mapKey] = true;

            setTimeout(() => {
                if (this.maps[mapKey]) {
                    this.maps[mapKey].invalidateSize();
                    console.log('Location map size invalidated');
                }
            }, 100);

            console.log('FIXED: Location map initialized successfully');
        } catch (error) {
            console.error('Error creating location map:', error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #fef3c7; color: #92400e; font-weight: 500;">Location map temporarily unavailable</div>';
            }
        }
    }

    // FIXED: Enhanced Transparency Map Initialization
    initializeTransparencyMap() {
        const mapKey = 'transparencyMap';
        const containerId = this.mapContainers[mapKey];
        
        console.log('FIXED: Initializing transparency map...');

        // Check if container is ready
        if (!this.isContainerReady(containerId)) {
            console.warn('Transparency map container not ready, retrying...');
            setTimeout(() => this.initializeTransparencyMap(), 500);
            return;
        }

        // Destroy existing map if it exists
        if (this.maps[mapKey]) {
            this.destroyMap(mapKey);
        }

        if (typeof L === 'undefined') {
            console.warn('Leaflet not available, showing fallback');
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f9ff; color: #0369a1; font-weight: 500;">Heat Map Loading...</div>';
            }
            return;
        }

        try {
            this.maps[mapKey] = L.map(containerId, {
                center: [40.7128, -73.9060],
                zoom: 11,
                zoomControl: true
            });
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(this.maps[mapKey]);

            this.mapsInitialized[mapKey] = true;

            setTimeout(() => {
                if (this.maps[mapKey]) {
                    this.maps[mapKey].invalidateSize();
                    console.log('Transparency map size invalidated');
                    
                    // Add heat map style markers
                    if (this.civicData && this.civicData.civic_issues) {
                        this.addHeatMapMarkers(this.maps[mapKey], this.civicData.civic_issues);
                    }
                }
            }, 100);

            console.log('FIXED: Transparency map initialized successfully');
        } catch (error) {
            console.error('Error creating transparency map:', error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #fef3c7; color: #92400e; font-weight: 500;">Heat map temporarily unavailable</div>';
            }
        }
    }

    addIssueMarkersToMap(map, issues) {
        if (typeof L === 'undefined' || !map) return;

        // Create marker cluster group if available, otherwise regular layer group
        let markerGroup = typeof L.markerClusterGroup !== 'undefined' 
            ? L.markerClusterGroup({
                maxClusterRadius: 50,
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false
              })
            : L.layerGroup();

        issues.forEach(issue => {
            try {
                const marker = L.marker([issue.location.lat, issue.location.lng]);
                
                // Create popup content
                const popupContent = `
                    <div style="max-width: 200px; font-family: system-ui;">
                        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #1e40af;">${issue.title}</h4>
                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${issue.description.substring(0, 80)}...</p>
                        <div style="font-size: 11px; color: #9ca3af;">
                            <strong>Status:</strong> ${issue.status}<br>
                            <strong>Priority:</strong> ${issue.priority}<br>
                            <strong>Department:</strong> ${issue.department}
                        </div>
                    </div>
                `;
                
                marker.bindPopup(popupContent);
                markerGroup.addLayer(marker);
            } catch (error) {
                console.warn('Error adding marker for issue:', issue.id, error);
            }
        });

        markerGroup.addTo(map);
        
        // Fit map to markers if there are any
        if (issues.length > 0) {
            try {
                const group = new L.featureGroup(markerGroup.getLayers ? markerGroup.getLayers() : [markerGroup]);
                if (group.getBounds && group.getBounds().isValid && group.getBounds().isValid()) {
                    map.fitBounds(group.getBounds().pad(0.1));
                }
            } catch (error) {
                console.warn('Error fitting bounds:', error);
            }
        }
    }

    addHeatMapMarkers(map, issues) {
        if (typeof L === 'undefined' || !map) return;

        // Color mapping for different priorities and statuses
        const getMarkerColor = (issue) => {
            if (issue.priority === 'Critical') return '#dc2626';
            if (issue.priority === 'High') return '#ea580c';
            if (issue.priority === 'Medium') return '#d97706';
            return '#65a30d';
        };

        issues.forEach(issue => {
            try {
                const color = getMarkerColor(issue);
                
                const marker = L.circleMarker([issue.location.lat, issue.location.lng], {
                    radius: issue.priority === 'Critical' ? 12 : issue.priority === 'High' ? 10 : 8,
                    fillColor: color,
                    color: color,
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.6
                });
                
                const popupContent = `
                    <div style="max-width: 200px; font-family: system-ui;">
                        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #1e40af;">${issue.title}</h4>
                        <div style="font-size: 11px; color: #9ca3af;">
                            <strong>Status:</strong> ${issue.status}<br>
                            <strong>Priority:</strong> ${issue.priority}<br>
                            <strong>Votes:</strong> ${issue.votes}
                        </div>
                    </div>
                `;
                
                marker.bindPopup(popupContent);
                marker.addTo(map);
            } catch (error) {
                console.warn('Error adding heat map marker for issue:', issue.id, error);
            }
        });
    }

    // FIXED: Robust navigation system
    navigateToPage(pageId) {
        console.log('FIXED: Navigating to page:', pageId);
        
        try {
            // Destroy maps when leaving pages with maps
            this.destroyMapsForCurrentPage();
            
            const allPages = document.querySelectorAll('.page');
            allPages.forEach(page => {
                page.classList.remove('active');
            });

            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                this.currentPage = pageId;
                
                this.updateNavigation();

                // Close mobile menu
                const navMenu = document.getElementById('navbar-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const navToggle = document.getElementById('navbar-toggle');
                    if (navToggle) {
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                }

                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Initialize page with proper timing for maps
                setTimeout(() => {
                    this.initializePage(pageId);
                }, 100);
                
                console.log('FIXED: Navigation successful to:', pageId);
            } else {
                console.error('Target page not found:', pageId);
            }
        } catch (error) {
            console.error('Navigation error:', error);
        }
    }

    // FIXED: Destroy maps based on current page before navigation
    destroyMapsForCurrentPage() {
        console.log('Destroying maps for current page:', this.currentPage);
        
        switch (this.currentPage) {
            case 'home':
                this.destroyMap('heroMap');
                break;
            case 'report':
                this.destroyMap('locationMap');
                break;
            case 'transparency':
                this.destroyMap('transparencyMap');
                break;
        }
    }

    updateNavigation() {
        document.querySelectorAll('.navbar__link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    setupNavigation() {
        this.updateNavigation();
    }

    // FIXED: Enhanced page initialization with proper map timing
    initializePage(pageId) {
        console.log('FIXED: Initializing page:', pageId);
        
        switch (pageId) {
            case 'home':
                this.populateTestimonials();
                setTimeout(() => this.initializeHeroMap(), 100);
                break;
            case 'dashboard':
                this.populateUserDashboard();
                break;
            case 'admin':
                this.populateAdminDashboard();
                break;
            case 'transparency':
                setTimeout(() => {
                    this.initializeCharts();
                    setTimeout(() => this.initializeTransparencyMap(), 100);
                }, 200);
                break;
            case 'report':
                this.resetReportForm();
                setTimeout(() => this.initializeLocationMap(), 100);
                break;
            case 'support':
                setTimeout(() => this.setupSupportSystem(), 50);
                break;
        }
    }

    populateInitialData() {
        console.log('Populating initial data...');
        
        const categorySelect = document.getElementById('issue-category');
        if (categorySelect && this.civicData.categories) {
            categorySelect.innerHTML = '<option value="">Select a category</option>';
            Object.keys(this.civicData.categories).forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });

            categorySelect.addEventListener('change', (e) => {
                this.populateSubcategories(e.target.value);
            });
        }
    }

    populateSubcategories(category) {
        const subcategorySelect = document.getElementById('issue-subcategory');
        if (subcategorySelect && this.civicData.categories[category]) {
            subcategorySelect.innerHTML = '<option value="">Select a subcategory</option>';
            this.civicData.categories[category].forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });
        }
    }

    populateTestimonials() {
        const carousel = document.getElementById('testimonials-carousel');
        if (carousel && this.civicData.testimonials) {
            carousel.innerHTML = '';
            this.civicData.testimonials.forEach(testimonial => {
                const testimonialElement = document.createElement('div');
                testimonialElement.className = 'testimonial';
                testimonialElement.innerHTML = `
                    <div class="testimonial__content">"${testimonial.comment}"</div>
                    <div class="testimonial__author">
                        <div>
                            <div class="testimonial__name">${testimonial.name}</div>
                            <div class="testimonial__location">${testimonial.location}</div>
                        </div>
                        <div class="testimonial__rating">${'⭐'.repeat(testimonial.rating)}</div>
                    </div>
                `;
                carousel.appendChild(testimonialElement);
            });
            console.log('Testimonials populated');
        }
    }

    populateUserDashboard() {
        const issuesList = document.getElementById('user-issues-list');
        if (issuesList && this.civicData.civic_issues) {
            issuesList.innerHTML = '';
            
            this.civicData.civic_issues.slice(0, 3).forEach(issue => {
                const issueElement = this.createIssueCard(issue, true);
                issuesList.appendChild(issueElement);
            });
            console.log('User dashboard populated');
        }
    }

    populateAdminDashboard() {
        const adminTable = document.getElementById('admin-issues-table');
        if (adminTable && this.civicData.civic_issues) {
            adminTable.innerHTML = '';
            
            this.civicData.civic_issues.forEach(issue => {
                const row = document.createElement('div');
                row.className = 'table-row';
                row.innerHTML = `
                    <div class="table-cell">
                        <input type="checkbox" name="issue-select" value="${issue.id}">
                    </div>
                    <div class="table-cell">${issue.id}</div>
                    <div class="table-cell">${issue.title}</div>
                    <div class="table-cell">${issue.category}</div>
                    <div class="table-cell">
                        <span class="issue-status ${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</span>
                    </div>
                    <div class="table-cell">
                        <span class="priority ${issue.priority.toLowerCase()}">${issue.priority}</span>
                    </div>
                    <div class="table-cell">${issue.department}</div>
                    <div class="table-cell">
                        <button class="btn btn--sm btn--outline">View</button>
                    </div>
                `;
                adminTable.appendChild(row);
            });
            console.log('Admin dashboard populated with', this.civicData.civic_issues.length, 'issues');
        }
    }

    createIssueCard(issue, showTimeline = false) {
        const issueCard = document.createElement('div');
        issueCard.className = 'issue-card';
        
        const timelineHTML = showTimeline ? `
            <div class="progress-timeline">
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-title">Issue Submitted</div>
                        <div class="timeline-date">${new Date(issue.created_date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-title">Under Review</div>
                        <div class="timeline-date">Status updated</div>
                    </div>
                </div>
                ${issue.status === 'Resolved' ? `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <div class="timeline-title">Resolved</div>
                        <div class="timeline-date">Issue fixed</div>
                    </div>
                </div>
                ` : ''}
            </div>
        ` : '';

        issueCard.innerHTML = `
            <div class="issue-header">
                <div>
                    <div class="issue-id">${issue.id}</div>
                    <h3 class="issue-title">${issue.title}</h3>
                    <p class="issue-description">${issue.description}</p>
                </div>
                <div class="issue-status ${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</div>
            </div>
            <div class="issue-meta">
                <span class="issue-location">📍 ${issue.location.name}</span>
                <span class="issue-date">📅 ${new Date(issue.created_date).toLocaleDateString()}</span>
                <span class="issue-priority">Priority: ${issue.priority}</span>
                <span class="issue-votes">👍 ${issue.votes} votes</span>
            </div>
            ${timelineHTML}
        `;
        
        return issueCard;
    }

    // Rest of the methods remain the same for brevity...
    setupReportForm() {
        const form = document.getElementById('issue-report-form');
        const nextBtn = document.getElementById('next-step');
        const prevBtn = document.getElementById('prev-step');

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextFormStep();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevFormStep();
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitIssueReport();
            });
        }

        this.setupFormComponents();
    }

    setupFormComponents() {
        // File upload handling
        const fileUploadArea = document.getElementById('file-upload-area');
        const fileInput = document.getElementById('issue-files');

        if (fileUploadArea && fileInput) {
            fileUploadArea.addEventListener('click', () => fileInput.click());

            fileUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadArea.classList.add('dragover');
            });

            fileUploadArea.addEventListener('dragleave', () => {
                fileUploadArea.classList.remove('dragover');
            });

            fileUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUploadArea.classList.remove('dragover');
                this.handleFileUpload(e.dataTransfer.files);
            });

            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }

        // Character count for description
        const descriptionField = document.getElementById('issue-description');
        const charCount = document.getElementById('char-count');

        if (descriptionField && charCount) {
            descriptionField.addEventListener('input', () => {
                const count = descriptionField.value.length;
                charCount.textContent = count;
                
                if (count > 800) {
                    charCount.style.color = '#dc2626';
                } else {
                    charCount.style.color = 'var(--color-text-secondary)';
                }

                if (count > 50) {
                    this.showAISuggestion(descriptionField.value);
                }
            });
        }

        // Anonymous reporting toggle
        const anonymousToggle = document.getElementById('anonymous-report');
        const contactFields = document.getElementById('contact-fields');

        if (anonymousToggle && contactFields) {
            anonymousToggle.addEventListener('change', () => {
                contactFields.style.display = anonymousToggle.checked ? 'none' : 'block';
            });
        }

        // Geolocation
        const detectLocationBtn = document.getElementById('detect-location');
        if (detectLocationBtn) {
            detectLocationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.detectLocation();
            });
        }
    }

    nextFormStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const nextStepElement = document.querySelector(`.form-step[data-step="${this.currentStep + 1}"]`);

        if (this.validateCurrentStep() && nextStepElement) {
            currentStepElement.classList.remove('active');
            nextStepElement.classList.add('active');

            const currentProgressStep = document.querySelector(`.progress-step[data-step="${this.currentStep}"]`);
            const nextProgressStep = document.querySelector(`.progress-step[data-step="${this.currentStep + 1}"]`);
            
            if (currentProgressStep) currentProgressStep.classList.remove('active');
            if (nextProgressStep) nextProgressStep.classList.add('active');

            this.currentStep++;
            this.updateFormButtons();

            if (this.currentStep === 4) {
                this.populateReviewSummary();
            }

            this.showToast(`Step ${this.currentStep} of 4`, 'info');
        }
    }

    prevFormStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const prevStepElement = document.querySelector(`.form-step[data-step="${this.currentStep - 1}"]`);

        if (prevStepElement) {
            currentStepElement.classList.remove('active');
            prevStepElement.classList.add('active');

            const currentProgressStep = document.querySelector(`.progress-step[data-step="${this.currentStep}"]`);
            const prevProgressStep = document.querySelector(`.progress-step[data-step="${this.currentStep - 1}"]`);
            
            if (currentProgressStep) currentProgressStep.classList.remove('active');
            if (prevProgressStep) prevProgressStep.classList.add('active');

            this.currentStep--;
            this.updateFormButtons();
        }
    }

    updateFormButtons() {
        const nextBtn = document.getElementById('next-step');
        const prevBtn = document.getElementById('prev-step');
        const submitBtn = document.getElementById('submit-report');

        if (nextBtn) nextBtn.style.display = this.currentStep < 4 ? 'inline-flex' : 'none';
        if (prevBtn) prevBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
        if (submitBtn) submitBtn.style.display = this.currentStep === 4 ? 'inline-flex' : 'none';
    }

    validateCurrentStep() {
        if (this.currentStep === 1) {
            const addressField = document.getElementById('issue-address');
            if (!addressField || !addressField.value.trim()) {
                this.showToast('Please provide a location or address', 'error');
                return false;
            }
        }
        return true;
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                this.showToast('File size must be less than 5MB', 'error');
                return;
            }

            const fileObj = {
                file: file,
                name: file.name,
                size: file.size,
                type: file.type,
                preview: null
            };

            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    fileObj.preview = e.target.result;
                    this.uploadedFiles.push(fileObj);
                    this.displayUploadedFiles();
                };
                reader.readAsDataURL(file);
            } else {
                this.uploadedFiles.push(fileObj);
                this.displayUploadedFiles();
            }
        });
    }

    displayUploadedFiles() {
        const container = document.getElementById('uploaded-files');
        if (!container) return;

        container.innerHTML = '';
        this.uploadedFiles.forEach((file, index) => {
            const fileElement = document.createElement('div');
            fileElement.className = 'uploaded-file';
            
            const preview = file.preview ? 
                `<img src="${file.preview}" alt="Preview" class="file-preview">` :
                `<div class="file-icon" style="height: 100px; display: flex; align-items: center; justify-content: center; background: var(--color-secondary); border-radius: var(--radius-sm);">📄</div>`;

            fileElement.innerHTML = `
                ${preview}
                <div class="file-name">${file.name}</div>
                <button type="button" class="file-remove" data-index="${index}">×</button>
            `;
            
            const removeBtn = fileElement.querySelector('.file-remove');
            removeBtn.addEventListener('click', () => this.removeFile(index));
            
            container.appendChild(fileElement);
        });
    }

    removeFile(index) {
        this.uploadedFiles.splice(index, 1);
        this.displayUploadedFiles();
        this.showToast('File removed', 'info');
    }

    showAISuggestion(description) {
        const suggestionElement = document.getElementById('ai-suggestion');
        const suggestionText = document.getElementById('ai-suggestion-text');
        
        if (suggestionElement && suggestionText) {
            let suggestion = 'Based on your description, this appears to be a ';
            
            if (description.toLowerCase().includes('pothole') || description.toLowerCase().includes('road')) {
                suggestion += 'Roads & Infrastructure issue. Consider selecting "Potholes" as the subcategory.';
            } else if (description.toLowerCase().includes('light') || description.toLowerCase().includes('dark')) {
                suggestion += 'Public Safety issue. Consider selecting "Streetlight not working" as the subcategory.';
            } else if (description.toLowerCase().includes('water') || description.toLowerCase().includes('leak')) {
                suggestion += 'Water & Sewerage issue. Consider selecting "Water leakage" as the subcategory.';
            } else if (description.toLowerCase().includes('trash') || description.toLowerCase().includes('garbage')) {
                suggestion += 'Waste Management issue. Consider selecting "Garbage not cleared" as the subcategory.';
            } else {
                suggestion += 'general civic issue. Please select the most appropriate category.';
            }

            suggestionText.textContent = suggestion;
            suggestionElement.style.display = 'block';
        }
    }

    populateReviewSummary() {
        const summaryElement = document.getElementById('review-summary');
        if (!summaryElement) return;

        const address = document.getElementById('issue-address')?.value || 'Not specified';
        const category = document.getElementById('issue-category')?.value || 'Not selected';
        const subcategory = document.getElementById('issue-subcategory')?.value || 'Not selected';
        const priority = document.getElementById('issue-priority')?.value || 'Not selected';
        const description = document.getElementById('issue-description')?.value || 'No description';

        summaryElement.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Location:</span>
                <span class="summary-value">${address}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Category:</span>
                <span class="summary-value">${category}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Subcategory:</span>
                <span class="summary-value">${subcategory}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Priority:</span>
                <span class="summary-value">${priority}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Description:</span>
                <span class="summary-value">${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Files:</span>
                <span class="summary-value">${this.uploadedFiles.length} file(s) attached</span>
            </div>
        `;
    }

    submitIssueReport() {
        this.showToast('Submitting your report...', 'info');
        
        setTimeout(() => {
            const issueId = 'CIV-' + String(Math.floor(Math.random() * 9000) + 1000);
            this.showToast(`Report submitted successfully! Your issue ID is ${issueId}`, 'success');
            
            setTimeout(() => {
                this.navigateToPage('dashboard');
                this.resetReportForm();
            }, 2000);
        }, 1500);
    }

    resetReportForm() {
        this.currentStep = 1;
        this.uploadedFiles = [];
        
        const form = document.getElementById('issue-report-form');
        if (form) form.reset();
        
        document.querySelectorAll('.form-step').forEach((step, index) => {
            step.classList.toggle('active', index === 0);
        });
        
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.classList.toggle('active', index === 0);
        });
        
        this.updateFormButtons();
        
        const uploadedFilesContainer = document.getElementById('uploaded-files');
        if (uploadedFilesContainer) uploadedFilesContainer.innerHTML = '';
        
        const aiSuggestion = document.getElementById('ai-suggestion');
        if (aiSuggestion) aiSuggestion.style.display = 'none';
    }

    detectLocation() {
        if (navigator.geolocation) {
            this.showToast('Detecting your location...', 'info');
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const addressField = document.getElementById('issue-address');
                    if (addressField) {
                        addressField.value = `Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                        this.showToast('Location detected successfully!', 'success');
                        
                        // Update location map if available
                        if (this.maps.locationMap) {
                            try {
                                this.maps.locationMap.setView([latitude, longitude], 15);
                                const marker = L.marker([latitude, longitude]).addTo(this.maps.locationMap);
                                marker.bindPopup('Your detected location').openPopup();
                            } catch (error) {
                                console.warn('Error updating location map:', error);
                            }
                        }
                    }
                },
                (error) => {
                    this.showToast('Could not detect location. Please enter address manually.', 'error');
                }
            );
        } else {
            this.showToast('Geolocation is not supported by this browser.', 'error');
        }
    }

    // Simplified methods for brevity - only showing core functionality
    setupDashboardFilters() {
        const searchInput = document.getElementById('issue-search');
        const statusFilter = document.getElementById('status-filter');
        const exportBtn = document.getElementById('export-issues');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterIssues());
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterIssues());
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('Exporting your issues data...', 'info');
                setTimeout(() => {
                    this.showToast('Export completed! Check your downloads.', 'success');
                }, 1500);
            });
        }
    }

    filterIssues() {
        const searchTerm = document.getElementById('issue-search')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('status-filter')?.value || '';
        
        const issueCards = document.querySelectorAll('#user-issues-list .issue-card');
        
        issueCards.forEach(card => {
            const title = card.querySelector('.issue-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.issue-description')?.textContent.toLowerCase() || '';
            const status = card.querySelector('.issue-status')?.textContent || '';
            
            const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);
            const matchesStatus = !statusFilter || status === statusFilter;
            
            card.style.display = matchesSearch && matchesStatus ? 'block' : 'none';
        });
    }

    setupCommunityInteractions() {
        document.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const isUpvote = btn.classList.contains('upvote');
                const countSpan = btn.querySelector('span');
                const currentCount = parseInt(countSpan.textContent);
                
                if (btn.classList.contains('voted')) {
                    btn.classList.remove('voted');
                    countSpan.textContent = currentCount - 1;
                } else {
                    const otherBtn = btn.parentElement.querySelector(isUpvote ? '.downvote' : '.upvote');
                    if (otherBtn && otherBtn.classList.contains('voted')) {
                        otherBtn.classList.remove('voted');
                        const otherCount = parseInt(otherBtn.querySelector('span').textContent);
                        otherBtn.querySelector('span').textContent = otherCount - 1;
                    }
                    
                    btn.classList.add('voted');
                    countSpan.textContent = currentCount + 1;
                }
                
                this.showToast(`Vote ${btn.classList.contains('voted') ? 'recorded' : 'removed'}!`, 'success');
            });
        });
    }

    setupSupportSystem() {
        const supportOptions = document.querySelectorAll('.support-option');
        supportOptions.forEach((option, index) => {
            const btn = option.querySelector('button');
            if (btn) {
                // Remove existing event listeners by cloning the button
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
                
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(`Support option ${index} clicked`);
                    this.hideSupportSections();
                    
                    if (index === 0) {
                        const chatbotInterface = document.getElementById('chatbot-interface');
                        if (chatbotInterface) {
                            console.log('Showing chatbot interface');
                            chatbotInterface.style.display = 'block';
                        }
                    } else if (index === 1) {
                        const faqSection = document.getElementById('faq-section');
                        if (faqSection) faqSection.style.display = 'block';
                    } else if (index === 2) {
                        const contactFormSection = document.getElementById('contact-form-section');
                        if (contactFormSection) contactFormSection.style.display = 'block';
                    }
                });
            }
        });

        this.setupChatbot();
    }

    hideSupportSections() {
        const sections = ['chatbot-interface', 'faq-section', 'contact-form-section'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'none';
        });
    }

    setupChatbot() {
        const sendBtn = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');
        const closeChat = document.getElementById('close-chat');

        if (sendBtn && chatInput) {
            const sendMessage = async () => {
                const message = chatInput.value.trim();
                if (message && !this.isTyping) {
                    this.addChatMessage(message, 'user');
                    chatInput.value = '';
                    
                    this.showTypingIndicator();
                    
                    try {
                        const response = await this.getGeminiResponse(message);
                        this.hideTypingIndicator();
                        this.addChatMessage(response, 'bot');
                    } catch (error) {
                        this.hideTypingIndicator();
                        this.addChatMessage('I apologize, but I\'m experiencing technical difficulties. Please try again later or contact our support team for assistance.', 'bot');
                        console.error('Gemini API error:', error);
                    }
                }
            };

            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                sendMessage();
            });
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        if (closeChat) {
            closeChat.addEventListener('click', (e) => {
                e.preventDefault();
                const chatInterface = document.getElementById('chatbot-interface');
                if (chatInterface) {
                    chatInterface.style.display = 'none';
                }
            });
        }

        document.querySelectorAll('.quick-question').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const question = btn.getAttribute('data-question');
                if (!this.isTyping) {
                    this.addChatMessage(question, 'user');
                    this.showTypingIndicator();
                    
                    try {
                        const response = await this.getGeminiResponse(question);
                        this.hideTypingIndicator();
                        this.addChatMessage(response, 'bot');
                    } catch (error) {
                        this.hideTypingIndicator();
                        this.addChatMessage('I apologize, but I\'m experiencing technical difficulties. Please try again later or contact our support team for assistance.', 'bot');
                        console.error('Gemini API error:', error);
                    }
                }
            });
        });
    }

    async getGeminiResponse(userMessage) {
        const civicContext = `You are an AI assistant for CivicFix, a civic issue reporting platform that connects citizens with local government. 

Your role is to help users with:
- Understanding how to report civic issues (potholes, streetlights, water problems, waste management, etc.)
- Tracking their submitted issues
- Navigating the platform
- Understanding the civic engagement process
- Providing information about municipal services

Available issue categories in our system:
- Roads & Infrastructure (potholes, damaged roads, broken footpaths)
- Water & Sewerage (water leakage, supply issues, sewage problems)
- Waste Management (garbage collection, damaged bins, illegal dumping)
- Public Safety (streetlights, fallen trees, safety hazards)
- Public Facilities (public toilets, parks maintenance, bus stops)
- Traffic & Transport (traffic signals, parking, congestion)
- Environment (air pollution, noise, illegal construction)

Platform features:
- 4-step issue reporting process (Location → Details → Media → Review)
- Real-time issue tracking with timeline
- Community voting and discussion
- Transparency dashboard with analytics
- Average resolution time: 8.2 days
- 97.8% response rate from departments

Be helpful, concise, and civic-focused in your responses. If users ask about specific technical issues outside your scope, direct them to contact support.

User question: ${userMessage}`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: civicContext
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
                topP: 0.8,
                topK: 40
            }
        };

        try {
            const response = await fetch(`${this.geminiApiUrl}?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Unexpected API response format');
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            
            const fallbackResponse = this.getFallbackResponse(userMessage);
            if (fallbackResponse) {
                return fallbackResponse + '\n\n⚠️ Note: AI services are currently limited. For full assistance, please contact our support team.';
            }
            
            throw error;
        }
    }

    getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('report') || lowerMessage.includes('issue')) {
            return "To report an issue: 1) Click 'Report Issue' in the navigation 2) Follow our 4-step process: Location → Details → Media → Review 3) Provide clear description and photos if possible 4) Submit and get your tracking ID";
        } else if (lowerMessage.includes('track') || lowerMessage.includes('status')) {
            return "Track your issues in 'My Dashboard' where you'll see: • All your submitted issues • Current status and timeline • Progress updates from departments • Estimated resolution times";
        } else if (lowerMessage.includes('category') || lowerMessage.includes('type')) {
            return "We handle these issue categories: Roads & Infrastructure, Water & Sewerage, Waste Management, Public Safety, Public Facilities, Traffic & Transport, and Environment. Each has specific subcategories to help route your issue correctly.";
        } else if (lowerMessage.includes('time') || lowerMessage.includes('how long')) {
            return "Our platform statistics: • Average resolution time: 8.2 days • 97.8% response rate from departments • Issues are typically acknowledged within 24 hours • Critical safety issues are prioritized";
        }
        
        return null;
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        
        this.isTyping = true;
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const typingElement = document.createElement('div');
        typingElement.className = 'bot-message typing-indicator';
        typingElement.id = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="typing-text">AI is thinking...</span>
            </div>
        `;
        
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return;

        const messageElement = document.createElement('div');
        messageElement.className = `${sender}-message`;
        
        const disclaimer = sender === 'bot' ? 
            '<div class="ai-disclaimer">💡 AI-generated response - Please verify important details with our support team.</div>' : '';
        
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            ${disclaimer}
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    setupFAQInteractions() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', (e) => {
                e.preventDefault();
                const faqItem = question.closest('.faq-item');
                const isOpen = faqItem.classList.contains('open');
                
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('open');
                });
                
                if (!isOpen) {
                    faqItem.classList.add('open');
                }
            });
        });
    }

    initializeCharts() {
        console.log('Initializing charts...');
        setTimeout(() => {
            this.createCategoryChart();
            this.createTrendsChart();
            this.createDepartmentChart();
            this.createAdminPerformanceChart();
        }, 200);
    }

    createCategoryChart() {
        const ctx = document.getElementById('category-chart');
        if (!ctx || !window.Chart) return;

        const data = {
            labels: ['Roads & Infrastructure', 'Water & Sewerage', 'Waste Management', 'Public Safety', 'Public Facilities', 'Traffic & Transport', 'Environment'],
            datasets: [{
                data: [45, 32, 28, 25, 20, 18, 15],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C']
            }]
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createTrendsChart() {
        const ctx = document.getElementById('trends-chart');
        if (!ctx || !window.Chart) return;

        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Reported',
                    data: [65, 78, 90, 81, 95, 88],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true
                },
                {
                    label: 'Resolved',
                    data: [45, 65, 75, 70, 80, 85],
                    borderColor: '#FFC185',
                    backgroundColor: 'rgba(255, 193, 133, 0.1)',
                    fill: true
                }
            ]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createDepartmentChart() {
        const ctx = document.getElementById('department-chart');
        if (!ctx || !window.Chart) return;

        const data = {
            labels: ['Public Works', 'Transportation', 'Parks & Rec', 'Water & Sewer', 'Public Safety'],
            datasets: [{
                label: 'Average Resolution Time (days)',
                data: [7, 6, 10, 5, 4],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Days'
                        }
                    }
                }
            }
        });
    }

    createAdminPerformanceChart() {
        const ctx = document.getElementById('admin-performance-chart');
        if (!ctx || !window.Chart) return;

        const data = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Issues Resolved',
                    data: [23, 28, 31, 25],
                    backgroundColor: '#059669'
                },
                {
                    label: 'New Issues',
                    data: [35, 42, 38, 45],
                    backgroundColor: '#2563EB'
                }
            ]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    setupModals() {
        const loginModal = document.getElementById('login-modal');
        const loginForm = document.getElementById('login-form');

        if (loginModal) {
            const closeModal = () => {
                loginModal.classList.add('hidden');
            };

            const overlay = loginModal.querySelector('.modal-overlay');
            if (overlay) {
                overlay.addEventListener('click', closeModal);
            }
            
            const closeBtn = loginModal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !loginModal.classList.contains('hidden')) {
                    closeModal();
                }
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.simulateLogin();
            });
        }
    }

    simulateLogin() {
        this.showToast('Logging in...', 'info');
        
        setTimeout(() => {
            this.isLoggedIn = true;
            this.currentUser = { name: 'John Doe', email: 'john@email.com' };
            
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.textContent = 'John Doe';
                loginBtn.classList.remove('btn--secondary');
                loginBtn.classList.add('btn--primary');
            }
            
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.classList.add('hidden');
            }
            
            this.showToast('Welcome back, John!', 'success');
        }, 1000);
    }

    toggleLogin() {
        if (this.isLoggedIn) {
            this.logout();
        } else {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.classList.remove('hidden');
            }
        }
    }

    logout() {
        this.isLoggedIn = false;
        this.currentUser = null;
        
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.textContent = 'Login';
            loginBtn.classList.add('btn--secondary');
            loginBtn.classList.remove('btn--primary');
        }
        
        this.showToast('Logged out successfully', 'info');
    }

    toggleAdminView() {
        this.isAdminView = !this.isAdminView;
        const adminToggle = document.getElementById('admin-toggle');
        
        if (this.isAdminView) {
            if (adminToggle) {
                adminToggle.textContent = 'Citizen View';
                adminToggle.classList.remove('btn--primary');
                adminToggle.classList.add('btn--secondary');
            }
            this.navigateToPage('admin');
        } else {
            if (adminToggle) {
                adminToggle.textContent = 'Admin View';
                adminToggle.classList.add('btn--primary');
                adminToggle.classList.remove('btn--secondary');
            }
            this.navigateToPage('home');
        }
    }

    detectTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            this.updateThemeToggle('🌞');
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
            this.updateThemeToggle('🌙');
        }

        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('civic-theme')) {
                    document.documentElement.setAttribute('data-color-scheme', e.matches ? 'dark' : 'light');
                    this.updateThemeToggle(e.matches ? '🌞' : '🌙');
                }
            });
        }

        const savedTheme = localStorage.getItem('civic-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-color-scheme', savedTheme);
            this.updateThemeToggle(savedTheme === 'dark' ? '🌞' : '🌙');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('civic-theme', newTheme);
        this.updateThemeToggle(newTheme === 'dark' ? '🌞' : '🌙');
        
        this.showToast(`Switched to ${newTheme} theme`, 'success');
        
        this.refreshInputElements();
    }

    refreshInputElements() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.add('theme-refresh');
            setTimeout(() => {
                input.classList.remove('theme-refresh');
            }, 1);
        });
    }

    updateThemeToggle(icon) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = icon;
        }
    }

    categorizeIssuesByDepartment() {
        this.currentCategorization = 'department';
        this.updateCategorizationButtons();
        this.renderCategorizedIssues('department');
        this.showToast('Issues categorized by department', 'success');
    }

    categorizeIssuesByPriority() {
        this.currentCategorization = 'priority';
        this.updateCategorizationButtons();
        this.renderCategorizedIssues('priority');
        this.showToast('Issues categorized by priority', 'success');
    }

    resetCategorization() {
        this.currentCategorization = null;
        this.updateCategorizationButtons();
        this.populateAdminDashboard();
        this.showToast('Categorization reset', 'info');
    }

    updateCategorizationButtons() {
        const departmentBtn = document.getElementById('categorize-by-department');
        const priorityBtn = document.getElementById('categorize-by-priority');

        [departmentBtn, priorityBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        if (this.currentCategorization === 'department' && departmentBtn) {
            departmentBtn.classList.add('active');
        } else if (this.currentCategorization === 'priority' && priorityBtn) {
            priorityBtn.classList.add('active');
        }
    }

    renderCategorizedIssues(groupBy) {
        const adminTable = document.getElementById('admin-issues-table');
        if (!adminTable || !this.civicData.civic_issues) return;

        adminTable.innerHTML = '';
        const groupedIssues = this.groupIssues(this.civicData.civic_issues, groupBy);

        Object.keys(groupedIssues).sort().forEach(groupName => {
            const issues = groupedIssues[groupName];
            
            const groupHeader = document.createElement('div');
            groupHeader.className = 'group-header';
            groupHeader.innerHTML = `
                ${groupName}
                <span class="group-count">(${issues.length} issue${issues.length !== 1 ? 's' : ''})</span>
            `;
            adminTable.appendChild(groupHeader);

            const groupWrapper = document.createElement('div');
            groupWrapper.className = `${groupBy}-group`;
            
            issues.forEach(issue => {
                const row = document.createElement('div');
                row.className = 'table-row';
                row.innerHTML = `
                    <div class="table-cell">
                        <input type="checkbox" name="issue-select" value="${issue.id}">
                    </div>
                    <div class="table-cell">${issue.id}</div>
                    <div class="table-cell">${issue.title}</div>
                    <div class="table-cell">${issue.category}</div>
                    <div class="table-cell">
                        <span class="issue-status ${issue.status.toLowerCase().replace(' ', '-')}">${issue.status}</span>
                    </div>
                    <div class="table-cell">
                        <span class="priority ${issue.priority.toLowerCase()}">${issue.priority}</span>
                    </div>
                    <div class="table-cell">${issue.department}</div>
                    <div class="table-cell">
                        <button class="btn btn--sm btn--outline">View</button>
                    </div>
                `;
                groupWrapper.appendChild(row);
            });
            
            adminTable.appendChild(groupWrapper);
        });

        console.log(`Issues categorized by ${groupBy}`);
    }

    groupIssues(issues, groupBy) {
        const grouped = {};

        issues.forEach(issue => {
            let groupKey;
            if (groupBy === 'department') {
                groupKey = issue.department;
            } else if (groupBy === 'priority') {
                const priorityOrder = { 'Critical': 'A_Critical', 'High': 'B_High', 'Medium': 'C_Medium', 'Low': 'D_Low' };
                groupKey = priorityOrder[issue.priority] || 'E_Other';
            } else {
                groupKey = 'Ungrouped';
            }

            if (!grouped[groupKey]) {
                grouped[groupKey] = [];
            }
            grouped[groupKey].push(issue);
        });

        Object.keys(grouped).forEach(group => {
            grouped[group].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        });

        if (groupBy === 'priority') {
            const cleanGrouped = {};
            Object.keys(grouped).forEach(key => {
                const cleanKey = key.replace(/^[A-Z]_/, '');
                cleanGrouped[cleanKey] = grouped[key];
            });
            return cleanGrouped;
        }

        return grouped;
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOut 0.3s ease-in forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);

        if (!document.querySelector('#slide-out-style')) {
            const style = document.createElement('style');
            style.id = 'slide-out-style';
            style.textContent = `
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// FIXED: Initialize the app when DOM is loaded with proper error handling
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing FIXED CivicFix App...');
    try {
        window.civicFixApp = new CivicFixApp();
    } catch (error) {
        console.error('Failed to initialize CivicFix App:', error);
    }
});

// FIXED: Backup initialization for cases where DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    setTimeout(() => {
        if (!window.civicFixApp) {
            console.log('Direct initialization triggered for FIXED app');
            try {
                window.civicFixApp = new CivicFixApp();
            } catch (error) {
                console.error('Failed to initialize CivicFix App via backup:', error);
            }
        }
    }, 100);
}