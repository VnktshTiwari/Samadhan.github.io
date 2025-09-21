<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samadhan - Connecting Citizens with Local Government</title>
    <meta name="description" content="Samadhan is a crowdsourced civic issue reporting platform that connects citizens with local government to resolve community issues quickly and transparently.">
    <meta name="keywords" content="civic engagement, city government, issue reporting, community platform, AI assistant">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&family=Noto+Sans+Tamil:wght@400;500;600&family=Noto+Sans+Bengali:wght@400;500;600&family=Noto+Sans+Telugu:wght@400;500;600&family=Noto+Sans+Gujarati:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css" />
</head>
<body>
    <!-- Skip Navigation Link -->
    <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
    
    <!-- Navigation Header -->
    <nav class="navbar" role="navigation" aria-label="Main navigation">
        <div class="container navbar__container">
            <div class="navbar__brand">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='%232563EB'%3E%3Ccircle cx='20' cy='20' r='18' stroke='%23059669' stroke-width='2' fill='none'/%3E%3Cpath d='M15 20h10M20 15v10'/%3E%3C/svg%3E" alt="Samadhan Logo" width="40" height="40">
                <span class="navbar__title">Samadhan</span>
            </div>
            <div class="navbar__menu" id="navbar-menu">
                <a href="#home" class="navbar__link" data-page="home" data-translate="nav_home">Home</a>
                <a href="#report" class="navbar__link" data-page="report" data-translate="nav_report">Report Issue</a>
                <a href="#dashboard" class="navbar__link" data-page="dashboard" data-translate="nav_dashboard">My Dashboard</a>
                <a href="#community" class="navbar__link" data-page="community" data-translate="nav_community">Community</a>
                <a href="#transparency" class="navbar__link" data-page="transparency" data-translate="nav_transparency">Transparency</a>
                <a href="#support" class="navbar__link" data-page="support" data-translate="nav_support">Support</a>
            </div>
            <div class="navbar__actions">
                <select class="language-selector" id="language-selector" aria-label="Select Language">
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="ta">தமிழ்</option>
                    <option value="bn">বাংলা</option>
                    <option value="te">తెలుగు</option>
                    <option value="mr">मराठी</option>
                    <option value="gu">ગુજરાતી</option>
                </select>
                <button class="btn btn--sm btn--outline" id="theme-toggle" aria-label="Toggle dark mode">
                    🌙
                </button>
                <button class="btn btn--sm btn--secondary" id="login-btn" data-translate="login">Login</button>
                <button class="btn btn--sm btn--primary" id="admin-toggle" data-translate="admin_view">Admin View</button>
                <button class="navbar__toggle" id="navbar-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main id="main-content">
        <!-- Homepage -->
        <section id="home" class="page active">
            <!-- Hero Section -->
            <div class="hero">
                <div class="container hero__container">
                    <div class="hero__content">
                        <h1 class="hero__title" data-translate="hero_title">Making Your Voice Heard in Local Government</h1>
                        <p class="hero__subtitle" data-translate="hero_subtitle">Report civic issues, track their resolution, and engage with your community through our transparent platform that connects citizens directly with city services.</p>
                        <div class="hero__actions">
                            <button class="btn btn--primary btn--lg" data-page="report" data-translate="hero_report_btn">Report an Issue</button>
                            <button class="btn btn--outline btn--lg" data-page="transparency" data-translate="hero_analytics_btn">View Analytics</button>
                        </div>
                        <div class="hero__stats">
                            <div class="stat">
                                <span class="stat__number">12,847</span>
                                <span class="stat__label" data-translate="hero_stat_issues">Issues Reported</span>
                            </div>
                            <div class="stat">
                                <span class="stat__number">9,634</span>
                                <span class="stat__label" data-translate="hero_stat_resolved">Issues Resolved</span>
                            </div>
                            <div class="stat">
                                <span class="stat__number">8.2 days</span>
                                <span class="stat__label" data-translate="hero_stat_time">Avg Resolution Time</span>
                            </div>
                        </div>
                    </div>
                    <div class="hero__visual">
                        <div class="hero__map" id="hero-map">
                            <div id="hero-map-container" style="width: 100%; height: 300px; border-radius: var(--radius-lg); position: relative; z-index: 1;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mission Statement -->
            <section class="mission">
                <div class="container">
                    <h2 class="section-title" data-translate="mission_title">Our Mission</h2>
                    <p class="mission__text" data-translate="mission_text">Samadhan bridges the gap between citizens and local government by providing a transparent, efficient platform for reporting and resolving civic issues. We believe in empowering communities through technology, data-driven insights, and collaborative problem-solving.</p>
                </div>
            </section>

            <!-- Quick Navigation Tiles -->
            <section class="quick-nav">
                <div class="container">
                    <h2 class="section-title" data-translate="quick_nav_title">Quick Actions</h2>
                    <div class="quick-nav__grid">
                        <div class="quick-nav__tile" data-page="report">
                            <div class="tile__icon">📝</div>
                            <h3 class="tile__title" data-translate="tile_report_title">Report Issue</h3>
                            <p class="tile__description" data-translate="tile_report_desc">Submit a new civic issue with photos and location</p>
                        </div>
                        <div class="quick-nav__tile" data-page="dashboard">
                            <div class="tile__icon">📊</div>
                            <h3 class="tile__title" data-translate="tile_track_title">Track Issues</h3>
                            <p class="tile__description" data-translate="tile_track_desc">Monitor the progress of your submitted issues</p>
                        </div>
                        <div class="quick-nav__tile" data-page="community">
                            <div class="tile__icon">👥</div>
                            <h3 class="tile__title" data-translate="tile_community_title">Join Community</h3>
                            <p class="tile__description" data-translate="tile_community_desc">Engage in discussions and vote on priorities</p>
                        </div>
                        <div class="quick-nav__tile" data-page="transparency">
                            <div class="tile__icon">📈</div>
                            <h3 class="tile__title" data-translate="tile_analytics_title">View Analytics</h3>
                            <p class="tile__description" data-translate="tile_analytics_desc">Explore city performance and transparency data</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Success Metrics -->
            <section class="metrics">
                <div class="container">
                    <h2 class="section-title" data-translate="metrics_title">Platform Impact</h2>
                    <div class="metrics__grid">
                        <div class="metric-card">
                            <div class="metric__value">15,623</div>
                            <div class="metric__label" data-translate="metric_users">Active Users</div>
                            <div class="metric__change">+12% this month</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric__value">94.2%</div>
                            <div class="metric__label" data-translate="metric_satisfaction">Satisfaction Rate</div>
                            <div class="metric__change">+2.1% improvement</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric__value">97.8%</div>
                            <div class="metric__label" data-translate="metric_response">Response Rate</div>
                            <div class="metric__change">Within 24 hours</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric__value">12</div>
                            <div class="metric__label" data-translate="metric_departments">Connected Departments</div>
                            <div class="metric__change">City-wide coverage</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- User Testimonials -->
            <section class="testimonials">
                <div class="container">
                    <h2 class="section-title" data-translate="testimonials_title">What Citizens Say</h2>
                    <div class="testimonials__carousel" id="testimonials-carousel">
                        <!-- Testimonials will be populated by JavaScript -->
                    </div>
                </div>
            </section>

            <!-- Newsletter Signup -->
            <section class="newsletter">
                <div class="container">
                    <div class="newsletter__content">
                        <h2 class="newsletter__title" data-translate="newsletter_title">Stay Updated</h2>
                        <p class="newsletter__description" data-translate="newsletter_desc">Get the latest updates on civic improvements and platform features.</p>
                        <form class="newsletter__form" id="newsletter-form">
                            <input type="email" class="form-control" data-translate-placeholder="newsletter_email" placeholder="Enter your email" required>
                            <button type="submit" class="btn btn--primary" data-translate="newsletter_subscribe">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </section>

        <!-- Issue Reporting System -->
        <section id="report" class="page">
            <div class="container">
                <div class="page-header">
                    <h1 data-translate="report_title">Report an Issue</h1>
                    <p data-translate="report_subtitle">Help us improve your community by reporting civic issues</p>
                </div>

                <div class="report-form-container">
                    <div class="progress-indicator">
                        <div class="progress-step active" data-step="1">
                            <span class="step-number">1</span>
                            <span class="step-label" data-translate="step_location">Location</span>
                        </div>
                        <div class="progress-step" data-step="2">
                            <span class="step-number">2</span>
                            <span class="step-label" data-translate="step_details">Details</span>
                        </div>
                        <div class="progress-step" data-step="3">
                            <span class="step-number">3</span>
                            <span class="step-label" data-translate="step_media">Media</span>
                        </div>
                        <div class="progress-step" data-step="4">
                            <span class="step-number">4</span>
                            <span class="step-label" data-translate="step_review">Review</span>
                        </div>
                    </div>

                    <form id="issue-report-form" class="report-form">
                        <!-- Step 1: Location -->
                        <div class="form-step active" data-step="1">
                            <h2 data-translate="location_question">Where is the issue located?</h2>
                            <div class="form-group">
                                <label class="form-label" data-translate="location_label">Address or Location</label>
                                <input type="text" class="form-control" id="issue-address" data-translate-placeholder="location_placeholder" placeholder="Enter address or describe location">
                                <button type="button" class="btn btn--secondary btn--sm" id="detect-location">
                                    📍 <span data-translate="use_location">Use My Location</span>
                                </button>
                            </div>
                            <div class="form-group">
                                <div class="location-map" id="location-map">
                                    <div id="location-map-container" style="width: 100%; height: 300px; border-radius: var(--radius-base); position: relative; z-index: 1;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2: Issue Details -->
                        <div class="form-step" data-step="2">
                            <h2 data-translate="details_question">Tell us about the issue</h2>
                            <div class="form-group">
                                <label class="form-label" data-translate="category_label">Category</label>
                                <select class="form-control" id="issue-category" required>
                                    <option value="" data-translate="select_category">Select a category</option>
                                    <!-- Categories will be populated by JavaScript -->
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label" data-translate="subcategory_label">Subcategory</label>
                                <select class="form-control" id="issue-subcategory" required>
                                    <option value="" data-translate="select_subcategory">Select a subcategory</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label" data-translate="priority_label">Priority Level</label>
                                <select class="form-control" id="issue-priority" required>
                                    <option value="" data-translate="select_priority">Select priority</option>
                                    <option value="Low" data-translate="priority_low">Low - Minor inconvenience</option>
                                    <option value="Medium" data-translate="priority_medium">Medium - Moderate concern</option>
                                    <option value="High" data-translate="priority_high">High - Significant issue</option>
                                    <option value="Critical" data-translate="priority_critical">Critical - Safety hazard</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label" data-translate="description_label">Description</label>
                                <textarea class="form-control" id="issue-description" rows="4" data-translate-placeholder="description_placeholder" placeholder="Describe the issue in detail..." required></textarea>
                                <div class="character-count">
                                    <span id="char-count">0</span>/1000 characters
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="ai-suggestion" id="ai-suggestion" style="display: none;">
                                    <h4 data-translate="ai_suggestion_title">AI Categorization Suggestion:</h4>
                                    <p id="ai-suggestion-text"></p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3: Media Upload -->
                        <div class="form-step" data-step="3">
                            <h2 data-translate="media_question">Add photos or documents</h2>
                            <div class="form-group">
                                <div class="file-upload-area" id="file-upload-area">
                                    <div class="upload-prompt">
                                        <div class="upload-icon">📷</div>
                                        <p data-translate="upload_prompt">Drag and drop files here or click to browse</p>
                                        <p class="upload-hint" data-translate="upload_hint">Supported: JPG, PNG, PDF (Max 5MB each)</p>
                                    </div>
                                    <input type="file" id="issue-files" multiple accept="image/*,.pdf" style="display: none;">
                                </div>
                                <div class="uploaded-files" id="uploaded-files"></div>
                            </div>
                        </div>

                        <!-- Step 4: Review and Submit -->
                        <div class="form-step" data-step="4">
                            <h2 data-translate="review_question">Review your report</h2>
                            <div class="review-summary" id="review-summary">
                                <!-- Summary will be populated by JavaScript -->
                            </div>
                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="anonymous-report">
                                    <span data-translate="anonymous_submit">Submit anonymously</span>
                                </label>
                            </div>
                            <div class="contact-fields" id="contact-fields">
                                <div class="form-group">
                                    <label class="form-label" data-translate="name_label">Your Name (Optional)</label>
                                    <input type="text" class="form-control" id="reporter-name" data-translate-placeholder="name_placeholder" placeholder="Enter your name">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" data-translate="email_label">Contact Email</label>
                                    <input type="email" class="form-control" id="reporter-email" data-translate-placeholder="email_placeholder" placeholder="your@email.com">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" data-translate="phone_label">Phone Number (Optional)</label>
                                    <input type="tel" class="form-control" id="reporter-phone" data-translate-placeholder="phone_placeholder" placeholder="(555) 123-4567">
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn btn--outline" id="prev-step" style="display: none;" data-translate="prev_button">Previous</button>
                            <button type="button" class="btn btn--primary" id="next-step" data-translate="next_button">Next</button>
                            <button type="submit" class="btn btn--primary" id="submit-report" style="display: none;" data-translate="submit_report">Submit Report</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Issue Tracking Dashboard -->
        <section id="dashboard" class="page">
            <div class="container">
                <div class="page-header">
                    <h1 data-translate="dashboard_title">My Dashboard</h1>
                    <p data-translate="dashboard_subtitle">Track your submitted issues and monitor their progress</p>
                </div>

                <div class="dashboard-stats">
                    <div class="stat-card">
                        <div class="stat-card__value">5</div>
                        <div class="stat-card__label" data-translate="active_issues">Active Issues</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__value">12</div>
                        <div class="stat-card__label" data-translate="resolved_issues">Resolved Issues</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card__value">6.5 days</div>
                        <div class="stat-card__label" data-translate="avg_resolution">Avg Resolution</div>
                    </div>
                </div>

                <div class="dashboard-controls">
                    <div class="search-filter">
                        <input type="search" class="form-control" id="issue-search" data-translate-placeholder="search_issues" placeholder="Search your issues...">
                        <select class="form-control" id="status-filter">
                            <option value="" data-translate="all_statuses">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <button class="btn btn--outline" id="export-issues" data-translate="export_btn">Export</button>
                    </div>
                </div>

                <div class="issues-list" id="user-issues-list">
                    <!-- User issues will be populated by JavaScript -->
                </div>

                <div class="notification-preferences">
                    <h3 data-translate="notification_preferences">Notification Preferences</h3>
                    <div class="preference-options">
                        <label class="checkbox-label">
                            <input type="checkbox" id="email-notifications" checked>
                            <span data-translate="email_notifications">Email notifications for status updates</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="push-notifications" checked>
                            <span data-translate="push_notifications">Browser push notifications</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="weekly-digest">
                            <span data-translate="weekly_digest">Weekly summary digest</span>
                        </label>
                    </div>
                </div>
            </div>
        </section>

        <!-- Administrative Portal -->
        <section id="admin" class="page">
            <div class="container">
                <div class="page-header">
                    <h1 data-translate="admin_title">Administrative Portal</h1>
                    <p data-translate="admin_subtitle">Manage civic issues and monitor city performance</p>
                </div>

                <div class="admin-dashboard">
                    <div class="admin-stats">
                        <div class="admin-stat-card">
                            <h3 data-translate="pending_issues">Pending Issues</h3>
                            <div class="stat-number">47</div>
                            <div class="stat-trend">+5 today</div>
                        </div>
                        <div class="admin-stat-card">
                            <h3 data-translate="in_progress">In Progress</h3>
                            <div class="stat-number">132</div>
                            <div class="stat-trend">-8 from yesterday</div>
                        </div>
                        <div class="admin-stat-card">
                            <h3 data-translate="resolved_today">Resolved Today</h3>
                            <div class="stat-number">23</div>
                            <div class="stat-trend">Goal: 25/day</div>
                        </div>
                        <div class="admin-stat-card">
                            <h3 data-translate="response_rate">Response Rate</h3>
                            <div class="stat-number">97.8%</div>
                            <div class="stat-trend">Above target</div>
                        </div>
                    </div>

                    <div class="admin-controls">
                        <div class="bulk-actions">
                            <button class="btn btn--primary" data-translate="assign_selected">Assign Selected</button>
                            <button class="btn btn--outline" data-translate="mark_duplicate">Mark as Duplicate</button>
                            <button class="btn btn--outline" data-translate="export_report">Export Report</button>
                        </div>
                        <div class="admin-filters">
                            <select class="form-control">
                                <option data-translate="all_departments">All Departments</option>
                                <option>Public Works</option>
                                <option>Transportation</option>
                                <option>Parks & Recreation</option>
                            </select>
                            <select class="form-control">
                                <option data-translate="all_priorities">All Priorities</option>
                                <option>Critical</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                    </div>

                    <div class="admin-analytics">
                        <h3 data-translate="performance_analytics">Performance Analytics</h3>
                        <div class="chart-container" style="position: relative; height: 400px;">
                            <canvas id="admin-performance-chart"></canvas>
                        </div>
                    </div>

                    <div class="issues-management">
                        <h3 data-translate="issue_management">Issue Management</h3>
                        <div class="categorization-controls">
                            <button class="btn btn--secondary" id="categorize-by-department" data-translate="categorize_department">Categorize by Department</button>
                            <button class="btn btn--secondary" id="categorize-by-priority" data-translate="categorize_priority">Categorize by Priority</button>
                            <button class="btn btn--outline" id="reset-categorization" data-translate="reset_view">Reset View</button>
                        </div>
                        <div class="issues-table">
                            <div class="table-header">
                                <div class="table-cell">
                                    <input type="checkbox" id="select-all-issues">
                                </div>
                                <div class="table-cell">ID</div>
                                <div class="table-cell" data-translate="title_col">Title</div>
                                <div class="table-cell" data-translate="category_col">Category</div>
                                <div class="table-cell" data-translate="status_col">Status</div>
                                <div class="table-cell" data-translate="priority_col">Priority</div>
                                <div class="table-cell" data-translate="assigned_col">Assigned To</div>
                                <div class="table-cell" data-translate="actions_col">Actions</div>
                            </div>
                            <div class="table-body" id="admin-issues-table">
                                <!-- Issues will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community Hub -->
        <section id="community" class="page">
            <div class="container">
                <div class="page-header">
                    <h1 data-translate="community_title">Community Hub</h1>
                    <p data-translate="community_subtitle">Engage with your neighbors and participate in local decisions</p>
                </div>

                <div class="community-dashboard">
                    <div class="community-stats">
                        <div class="community-stat">
                            <span class="stat-icon">👥</span>
                            <div>
                                <div class="stat-number">15,623</div>
                                <div class="stat-label" data-translate="active_members">Active Members</div>
                            </div>
                        </div>
                        <div class="community-stat">
                            <span class="stat-icon">💬</span>
                            <div>
                                <div class="stat-number">2,847</div>
                                <div class="stat-label" data-translate="discussions">Discussions</div>
                            </div>
                        </div>
                        <div class="community-stat">
                            <span class="stat-icon">🗳️</span>
                            <div>
                                <div class="stat-number">1,256</div>
                                <div class="stat-label" data-translate="votes_cast">Votes Cast</div>
                            </div>
                        </div>
                    </div>

                    <div class="community-sections">
                        <div class="community-section">
                            <h3 data-translate="priority_voting">Priority Voting</h3>
                            <div class="voting-items">
                                <div class="voting-item">
                                    <div class="voting-content">
                                        <h4>Downtown Bike Lane Expansion</h4>
                                        <p>Proposed bike lane from Main St to City Center</p>
                                    </div>
                                    <div class="voting-actions">
                                        <button class="vote-btn upvote">👍 <span>145</span></button>
                                        <button class="vote-btn downvote">👎 <span>23</span></button>
                                    </div>
                                </div>
                                <div class="voting-item">
                                    <div class="voting-content">
                                        <h4>Park Playground Renovation</h4>
                                        <p>Upgrade Central Park playground equipment</p>
                                    </div>
                                    <div class="voting-actions">
                                        <button class="vote-btn upvote">👍 <span>89</span></button>
                                        <button class="vote-btn downvote">👎 <span>12</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="community-section">
                            <h3 data-translate="discussion_forums">Discussion Forums</h3>
                            <div class="forum-categories">
                                <div class="forum-category">
                                    <h4>Transportation</h4>
                                    <p>24 active discussions</p>
                                    <div class="category-stats">
                                        <span>156 posts</span> • <span>Last active: 2 hours ago</span>
                                    </div>
                                </div>
                                <div class="forum-category">
                                    <h4>Parks & Recreation</h4>
                                    <p>18 active discussions</p>
                                    <div class="category-stats">
                                        <span>89 posts</span> • <span>Last active: 5 hours ago</span>
                                    </div>
                                </div>
                                <div class="forum-category">
                                    <h4>Public Safety</h4>
                                    <p>31 active discussions</p>
                                    <div class="category-stats">
                                        <span>203 posts</span> • <span>Last active: 1 hour ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="community-section">
                            <h3 data-translate="leaderboard">Leaderboard</h3>
                            <div class="leaderboard">
                                <div class="leaderboard-item">
                                    <div class="rank">1</div>
                                    <div class="user-info">
                                        <div class="username">Sarah_Civic</div>
                                        <div class="user-stats">1,245 points • 23 issues resolved</div>
                                    </div>
                                    <div class="badges">🏆 🌟 ⭐</div>
                                </div>
                                <div class="leaderboard-item">
                                    <div class="rank">2</div>
                                    <div class="user-info">
                                        <div class="username">Mike_Community</div>
                                        <div class="user-stats">987 points • 18 issues resolved</div>
                                    </div>
                                    <div class="badges">🥈 🌟</div>
                                </div>
                                <div class="leaderboard-item">
                                    <div class="rank">3</div>
                                    <div class="user-info">
                                        <div class="username">Emily_Engaged</div>
                                        <div class="user-stats">834 points • 15 issues resolved</div>
                                    </div>
                                    <div class="badges">🥉 ⭐</div>
                                </div>
                            </div>
                        </div>

                        <div class="community-section">
                            <h3 data-translate="upcoming_events">Upcoming Events</h3>
                            <div class="events-list">
                                <div class="event-item">
                                    <div class="event-date">Oct 25</div>
                                    <div class="event-info">
                                        <h4>Virtual Town Hall: Transportation Planning</h4>
                                        <p>7:00 PM - 8:30 PM via Zoom</p>
                                    </div>
                                </div>
                                <div class="event-item">
                                    <div class="event-date">Nov 2</div>
                                    <div class="event-info">
                                        <h4>Community Clean-up Day</h4>
                                        <p>9:00 AM - 12:00 PM at Central Park</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Enhanced Support System with AI Chatbot -->
        <section id="support" class="page">
            <div class="container">
                <div class="page-header">
                    <h1 data-translate="support_title">Support Center</h1>
                    <p data-translate="support_subtitle">Get help using the platform and reporting issues with our AI-powered assistant</p>
                </div>

                <div class="support-options">
                    <div class="support-grid">
                        <div class="support-option" id="chatbot-option">
                            <div class="support-icon">🤖</div>
                            <h3 data-translate="ai_assistant">AI Assistant</h3>
                            <p data-translate="ai_assistant_desc">Get instant, intelligent answers about civic issues and platform usage</p>
                            <button class="btn btn--primary" data-translate="start_ai_chat">Start AI Chat</button>
                        </div>
                        <div class="support-option" id="faq-option">
                            <div class="support-icon">❓</div>
                            <h3>FAQ</h3>
                            <p data-translate="faq_desc">Browse frequently asked questions</p>
                            <button class="btn btn--outline" data-translate="view_faq">View FAQ</button>
                        </div>
                        <div class="support-option" id="contact-option">
                            <div class="support-icon">📧</div>
                            <h3 data-translate="contact_us">Contact Us</h3>
                            <p data-translate="contact_desc">Send us a message for personalized help</p>
                            <button class="btn btn--outline" data-translate="contact_form">Contact Form</button>
                        </div>
                    </div>
                </div>

                <!-- Enhanced AI Chatbot Interface -->
                <div class="chatbot-interface" id="chatbot-interface" style="display: none;">
                    <div class="chatbot-header">
                        <h3>🤖 <span data-translate="Samadhan_ai">Samadhan AI Assistant</span></h3>
                        <button class="close-chat" id="close-chat" aria-label="Close chat">×</button>
                    </div>
                    <div class="chat-messages" id="chat-messages">
                        <div class="bot-message">
                            <div class="message-content" data-translate="ai_welcome">
                                Hello! I'm your AI-powered Samadhan assistant. I can help you understand how to report issues, track their progress, navigate the platform, and answer questions about civic engagement. What would you like to know?
                            </div>
                            <div class="ai-disclaimer">💡 <span data-translate="ai_disclaimer">AI-generated response - Please verify important details with our support team.</span></div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chat-input" data-translate-placeholder="chat_placeholder" placeholder="Ask me anything about Samadhan..." class="form-control" maxlength="500">
                        <button id="send-message" class="btn btn--primary" aria-label="Send message" data-translate="send">Send</button>
                    </div>
                    <div class="quick-questions">
                        <button class="quick-question" data-question="How do I report an issue?" data-translate="quick_report">How do I report an issue?</button>
                        <button class="quick-question" data-question="How can I track my issue?" data-translate="quick_track">How can I track my issue?</button>
                        <button class="quick-question" data-question="What information do I need to report?" data-translate="quick_info">What information do I need?</button>
                        <button class="quick-question" data-question="How long does resolution take?" data-translate="quick_time">Resolution time?</button>
                    </div>
                </div>

                <div class="faq-section" id="faq-section" style="display: none;">
                    <h3 data-translate="faq_title">Frequently Asked Questions</h3>
                    <div class="search-faq">
                        <input type="search" class="form-control" data-translate-placeholder="search_faq" placeholder="Search FAQ..." id="faq-search">
                    </div>
                    <div class="faq-list">
                        <div class="faq-item">
                            <button class="faq-question" data-translate="faq_q1">How do I report a civic issue? <span class="faq-toggle">+</span></button>
                            <div class="faq-answer">
                                <p data-translate="faq_a1">You can report an issue by clicking "Report Issue" from the main menu or homepage. Fill out the multi-step form with location details, issue description, and any supporting photos. Our AI assistant can also guide you through this process.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question" data-translate="faq_q2">Can I report anonymously? <span class="faq-toggle">+</span></button>
                            <div class="faq-answer">
                                <p data-translate="faq_a2">Yes, you can choose to submit reports anonymously during the submission process. However, providing contact information helps us update you on the resolution progress.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question" data-translate="faq_q3">How long does it take to resolve issues? <span class="faq-toggle">+</span></button>
                            <div class="faq-answer">
                                <p data-translate="faq_a3">Resolution times vary by issue type and complexity. Our average resolution time is 8.2 days. Critical safety issues are prioritized and typically resolved faster. You can track the status of your issue in your dashboard.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question" data-translate="faq_q4">How does the AI assistant work? <span class="faq-toggle">+</span></button>
                            <div class="faq-answer">
                                <p data-translate="faq_a4">Our AI assistant is powered by Google's Gemini AI and is specifically trained to help with civic issues and platform usage. It provides contextual responses about reporting issues, tracking progress, and understanding municipal processes. Always verify important details with our support team.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-form-section" id="contact-form-section" style="display: none;">
                    <h3 data-translate="contact_support">Contact Support</h3>
                    <form class="support-contact-form">
                        <div class="form-group">
                            <label class="form-label" data-translate="your_name">Your Name</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" data-translate="email_address">Email Address</label>
                            <input type="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" data-translate="issue_type">Issue Type</label>
                            <select class="form-control" required>
                                <option value="" data-translate="select_issue_type">Select issue type</option>
                                <option value="technical" data-translate="technical_problem">Technical Problem</option>
                                <option value="account" data-translate="account_issue">Account Issue</option>
                                <option value="report" data-translate="report_problem">Report Problem</option>
                                <option value="ai" data-translate="ai_feedback">AI Assistant Feedback</option>
                                <option value="other" data-translate="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" data-translate="message">Message</label>
                            <textarea class="form-control" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn--primary" data-translate="send_message">Send Message</button>
                    </form>
                </div>

                <div class="help-resources">
                    <h3 data-translate="additional_resources">Additional Resources</h3>
                    <div class="resource-links">
                        <a href="#" class="resource-link">
                            <span class="resource-icon">📹</span>
                            <div>
                                <h4 data-translate="video_tutorials">Video Tutorials</h4>
                                <p data-translate="video_desc">Step-by-step guides for using Samadhan</p>
                            </div>
                        </a>
                        <a href="#" class="resource-link">
                            <span class="resource-icon">📚</span>
                            <div>
                                <h4 data-translate="user_manual">User Manual</h4>
                                <p data-translate="manual_desc">Comprehensive documentation</p>
                            </div>
                        </a>
                        <a href="#" class="resource-link">
                            <span class="resource-icon">🎯</span>
                            <div>
                                <h4 data-translate="best_practices">Best Practices</h4>
                                <p data-translate="practices_desc">Tips for effective issue reporting</p>
                            </div>
                        </a>
                        <a href="#" class="resource-link">
                            <span class="resource-icon">🤖</span>
                            <div>
                                <h4 data-translate="ai_guide">AI Assistant Guide</h4>
                                <p data-translate="ai_guide_desc">Learn how to get the most from our AI helper</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Transparency Center -->
        <section id="transparency" class="page">
            <div class="container">
                <div class="page-header">
                    <h1 data-translate="transparency_title">Transparency Center</h1>
                    <p data-translate="transparency_subtitle">Explore city performance data and analytics</p>
                </div>

                <div class="transparency-dashboard">
                    <div class="analytics-overview">
                        <h3 data-translate="performance_overview">City Performance Overview</h3>
                        <div class="analytics-grid">
                            <div class="analytics-card">
                                <h4 data-translate="issues_by_category">Issues by Category</h4>
                                <div class="chart-container" style="position: relative; height: 300px;">
                                    <canvas id="category-chart"></canvas>
                                </div>
                            </div>
                            <div class="analytics-card">
                                <h4 data-translate="resolution_trends">Resolution Trends</h4>
                                <div class="chart-container" style="position: relative; height: 300px;">
                                    <canvas id="trends-chart"></canvas>
                                </div>
                            </div>
                            <div class="analytics-card">
                                <h4 data-translate="department_performance">Department Performance</h4>
                                <div class="chart-container" style="position: relative; height: 300px;">
                                    <canvas id="department-chart"></canvas>
                                </div>
                            </div>
                            <div class="analytics-card">
                                <h4 data-translate="geographic_hotspots">Geographic Hotspots</h4>
                                <div class="heatmap-container" style="position: relative; height: 300px;">
                                    <div id="transparency-map-container" style="width: 100%; height: 100%; border-radius: var(--radius-base); position: relative; z-index: 1;"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="transparency-filters">
                        <h3 data-translate="filter_data">Filter Data</h3>
                        <div class="filter-controls">
                            <select class="form-control">
                                <option value="" data-translate="all_time_periods">All Time Periods</option>
                                <option value="7days" data-translate="last_7_days">Last 7 days</option>
                                <option value="30days" data-translate="last_30_days">Last 30 days</option>
                                <option value="90days" data-translate="last_90_days">Last 90 days</option>
                                <option value="1year" data-translate="last_year">Last year</option>
                            </select>
                            <select class="form-control">
                                <option value="" data-translate="all_categories">All Categories</option>
                                <option value="roads">Roads & Infrastructure</option>
                                <option value="water">Water & Sewerage</option>
                                <option value="waste">Waste Management</option>
                            </select>
                            <select class="form-control">
                                <option value="" data-translate="all_areas">All Areas</option>
                                <option value="downtown">Downtown Core</option>
                                <option value="residential">Residential Districts</option>
                                <option value="business">Business Areas</option>
                            </select>
                            <button class="btn btn--primary" data-translate="apply_filters">Apply Filters</button>
                            <button class="btn btn--outline" data-translate="export_data">Export Data</button>
                        </div>
                    </div>

                    <div class="public-data">
                        <h3 data-translate="open_data_exports">Open Data Exports</h3>
                        <div class="data-downloads">
                            <div class="download-item">
                                <div class="download-info">
                                    <h4 data-translate="issue_reports_dataset">Issue Reports Dataset</h4>
                                    <p data-translate="dataset_desc">Complete anonymized dataset of all reported issues</p>
                                    <span class="file-info">CSV • 2.3 MB • Updated daily</span>
                                </div>
                                <button class="btn btn--outline" data-translate="download">Download</button>
                            </div>
                            <div class="download-item">
                                <div class="download-info">
                                    <h4 data-translate="resolution_metrics">Resolution Metrics</h4>
                                    <p data-translate="metrics_desc">Performance metrics by department and category</p>
                                    <span class="file-info">JSON • 450 KB • Updated weekly</span>
                                </div>
                                <button class="btn btn--outline" data-translate="download">Download</button>
                            </div>
                            <div class="download-item">
                                <div class="download-info">
                                    <h4 data-translate="geographic_data">Geographic Data</h4>
                                    <p data-translate="geo_desc">Geospatial data for issue locations and boundaries</p>
                                    <span class="file-info">GeoJSON • 1.8 MB • Updated monthly</span>
                                </div>
                                <button class="btn btn--outline" data-translate="download">Download</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Page -->
        <section id="about" class="page">
            <div class="container">
                <div class="page-header">
                    <h1 data-translate="about_title">About Samadhan</h1>
                    <p data-translate="about_subtitle">Learn about our mission to improve civic engagement</p>
                </div>

                <div class="about-content">
                    <div class="about-section">
                        <h3 data-translate="our_mission">Our Mission</h3>
                        <p data-translate="mission_desc">Samadhan was created to bridge the communication gap between citizens and local government. We believe that technology can make civic engagement more accessible, transparent, and effective for everyone. Our AI-powered assistant helps make the platform even more user-friendly and accessible.</p>
                    </div>

                    <div class="about-section">
                        <h3 data-translate="how_it_works">How It Works</h3>
                        <div class="how-it-works">
                            <div class="step">
                                <div class="step-number">1</div>
                                <h4 data-translate="step_report">Report</h4>
                                <p data-translate="step_report_desc">Citizens report civic issues through our easy-to-use platform with AI assistance</p>
                            </div>
                            <div class="step">
                                <div class="step-number">2</div>
                                <h4 data-translate="step_route">Route</h4>
                                <p data-translate="step_route_desc">Issues are automatically routed to the appropriate department</p>
                            </div>
                            <div class="step">
                                <div class="step-number">3</div>
                                <h4 data-translate="step_resolve">Resolve</h4>
                                <p data-translate="step_resolve_desc">Departments work to resolve issues and provide status updates</p>
                            </div>
                            <div class="step">
                                <div class="step-number">4</div>
                                <h4 data-translate="step_review">Review</h4>
                                <p data-translate="step_review_desc">Citizens can provide feedback on the resolution process</p>
                            </div>
                        </div>
                    </div>

                    <div class="about-section">
                        <h3 data-translate="privacy_security">Privacy & Security</h3>
                        <p data-translate="privacy_desc">We take your privacy seriously. All personal information is protected according to GDPR standards, and you always have the option to report issues anonymously. Our AI assistant processes conversations securely and doesn't store personal data.</p>
                        
                        <div class="privacy-links">
                            <a href="#privacy" class="btn btn--outline" data-translate="privacy_policy">Privacy Policy</a>
                            <a href="#terms" class="btn btn--outline" data-translate="terms_of_service">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Toast Notifications -->
    <div id="toast-container" class="toast-container" aria-live="polite"></div>

    <!-- Modals -->
    <div id="login-modal" class="modal hidden">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3 data-translate="login_title">Login to Samadhan</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="login-form">
                    <div class="form-group">
                        <label class="form-label" data-translate="email">Email</label>
                        <input type="email" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" data-translate="password">Password</label>
                        <input type="password" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn--primary btn--full-width" data-translate="login">Login</button>
                </form>
                <p class="modal-footer-text">
                    <span data-translate="no_account">Don't have an account?</span> <a href="#signup" data-translate="signup_here">Sign up here</a>
                </p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Samadhan</h4>
                    <p data-translate="footer_desc">Connecting citizens with local government for a better community through technology and AI assistance.</p>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="LinkedIn">💼</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4 data-translate="platform">Platform</h4>
                    <ul>
                        <li><a href="#home" data-page="home" data-translate="nav_home">Home</a></li>
                        <li><a href="#report" data-page="report" data-translate="nav_report">Report Issue</a></li>
                        <li><a href="#dashboard" data-page="dashboard" data-translate="nav_dashboard">Dashboard</a></li>
                        <li><a href="#community" data-page="community" data-translate="nav_community">Community</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4 data-translate="support">Support</h4>
                    <ul>
                        <li><a href="#support" data-page="support" data-translate="help_center">Help Center</a></li>
                        <li><a href="#about" data-page="about" data-translate="about_us">About Us</a></li>
                        <li><a href="#" target="_blank" data-translate="contact">Contact</a></li>
                        <li><a href="#" target="_blank" data-translate="api_docs">API Documentation</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4 data-translate="legal">Legal</h4>
                    <ul>
                        <li><a href="#privacy" data-translate="privacy_policy">Privacy Policy</a></li>
                        <li><a href="#terms" data-translate="terms_of_service">Terms of Service</a></li>
                        <li><a href="#accessibility" data-translate="accessibility">Accessibility</a></li>
                        <li><a href="#data" data-translate="open_data">Open Data</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Samadhan. <span data-translate="all_rights_reserved">All rights reserved.</span></p>
                <p><span data-translate="made_with_love">Made with ❤️ for better communities</span> • <span data-translate="powered_by_ai">Powered by AI</span></p>
            </div>
        </div>
    </footer>

    <script src="app.js"></script>
</body>
</html>
