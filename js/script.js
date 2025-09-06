document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.getElementById('menu-links');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const sunIconMobile = document.getElementById('sun-icon-mobile');
    const moonIconMobile = document.getElementById('moon-icon-mobile');
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const toast = document.getElementById('toast');
    const blogPostsContainer = document.getElementById('blog-posts-container');

    // Contact Form Elements
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // Donation Form Elements
    const donationForm = document.getElementById('donation-form');
    const donationAmountInput = document.getElementById('donation-amount');
    const donorNameInput = document.getElementById('donor-name');
    const donorEmailInput = document.getElementById('donor-email');
    const donationAmountError = document.getElementById('donation-amount-error');
    const donorEmailError = document.getElementById('donor-email-error');

    // Project Filter/Search Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProjectCards = document.querySelectorAll('.project-card');
    const projectSearchInput = document.getElementById('project-search');

    // Map Elements
    const orgLocationBtn = document.getElementById('org-location-btn');
    const taizLocationBtn = document.getElementById('taiz-location-btn');
    const globalLocationsBtn = document.getElementById('global-locations-btn');

    let mymap; // Declare map variable globally or in a scope accessible by map functions
    let mapInitialized = false; // Flag to prevent re-initialization

    // Coordinates for specific locations
    const organizationLocation = [34.0522, -118.2437]; // Example: Los Angeles
    const taizLocation = [13.5883, 44.0394]; // Approximate coordinates for Taiz, Yemen
    const globalLocations = [
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles Office' },
        { lat: 51.5074, lng: -0.1278, name: 'London Office' },
        { lat: 35.6895, lng: 139.6917, name: 'Tokyo Office' },
        { lat: -33.8688, lng: 151.2093, name: 'Sydney Office' },
        { lat: 19.0760, lng: 72.8777, name: 'Mumbai Office' },
        { lat: -23.5505, lng: -46.6333, name: 'Sao Paulo Office' },
        { lat: 40.7128, lng: -74.0060, name: 'New York Office' },
        { lat: 48.8566, lng: 2.3522, name: 'Paris Office' },
        { lat: 55.7558, lng: 37.6173, name: 'Moscow Office' },
        { lat: -26.2041, lng: 28.0473, name: 'Johannesburg Office' }
    ];

    // Helper function for encoding/decoding (from original inline script)
    function encode(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    function decode(str) {
        return decodeURIComponent(escape(atob(str)));
    }

    // --- Debounce Utility Function ---
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // --- Validation Functions ---
    function validateField(inputElement, errorElement, validationFn) {
        if (validationFn(inputElement.value.trim())) {
            errorElement.classList.add('hidden');
            return true;
        } else {
            errorElement.classList.remove('hidden');
            return false;
        }
    }

    function isNotEmpty(value) {
        return value !== '';
    }

    function isValidEmail(value) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(value);
    }

    function isValidName(value) {
        // Allows letters, spaces, hyphens, and apostrophes
        const namePattern = /^[a-zA-Z\s\-']{2,}$/;
        return namePattern.test(value);
    }

    function isValidAmount(value) {
        const amount = parseFloat(value);
        return !isNaN(amount) && amount >= 1;
    }

    // --- Menu Toggle ---
    if (menuToggle && menuLinks) {
        menuToggle.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        });
    }

    // --- SPA Navigation ---
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        const targetSection = document.getElementById(sectionId);
        const mapHeaderSection = document.getElementById('map-header');

        if (targetSection) {
            targetSection.classList.remove('hidden');
            if (sectionId === 'blog') {
                loadBlogPosts();
            } else if (sectionId === 'map') {
                if (mapHeaderSection) mapHeaderSection.classList.remove('hidden');
                console.log('Map section activated');
                // Initialize map only once, but invalidate size every time map section is shown
                if (!mapInitialized) {
                    initializeMap();
                    mapInitialized = true;
                }
                // Invalidate size after the section is visible and rendered
                setTimeout(() => {
                    if (mymap) {
                        mymap.invalidateSize();
                        console.log('invalidateSize called');
                    }
                }, 100); 
            }
        }

        // Update aria-current for navigation links
        navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
            history.pushState(null, '', `#${sectionId}`); // Update URL hash
            if (menuLinks && menuLinks.classList.contains('active') && window.innerWidth < 1024) {
                menuLinks.classList.remove('active'); // Hide menu on mobile after click
                menuOpenIcon.classList.remove('hidden');
                menuCloseIcon.classList.add('hidden');
            }
        });
    });

    // Handle initial load and hash changes
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove '#'
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        } else {
            showSection('home'); // Default to home section
            history.replaceState(null, '', '#home'); // Set default hash
        }
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Call on initial load

    // --- Dark Mode Toggle ---
    function updateDarkModeIcons() {
        if (document.body.classList.contains('dark-mode')) {
            if (sunIcon) sunIcon.classList.add('hidden');
            if (moonIcon) moonIcon.classList.remove('hidden');
            if (sunIconMobile) sunIconMobile.classList.add('hidden');
            if (moonIconMobile) moonIconMobile.classList.remove('hidden');
        } else {
            if (sunIcon) sunIcon.classList.remove('hidden');
            if (moonIcon) moonIcon.classList.add('hidden');
            if (sunIconMobile) sunIconMobile.classList.remove('hidden');
            if (moonIconMobile) moonIconMobile.classList.add('hidden');
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme',
            document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        updateDarkModeIcons();
        showToast('Theme changed');
    }

    // Load theme from storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcons();
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }

    // --- Login Modal ---
    if (loginBtn && loginModal && closeLogin && loginForm && loginError) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
            loginError.classList.add('hidden');
            loginForm.reset();
        });

        closeLogin.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (!loginModal.classList.contains('hidden') && !loginModal.contains(e.target) && e.target !== loginBtn) {
                loginModal.classList.add('hidden');
            }
        });

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('user', encode(username));
                localStorage.setItem('pass', encode(password));
                loginModal.classList.add('hidden');
                showToast('Login successful!');
            } else {
                loginError.classList.remove('hidden');
            }
        });
    }

    // --- Toast Notifications ---
    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // Initial welcome toast
    showToast('Welcome to Save The Children website');

    // --- Project Card Modal (adapted from original script) ---
    const projectModal = document.createElement('div');
    projectModal.id = "project-modal";
    projectModal.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-40', 'z-50', 'hidden'); // Add tailwind classes
    projectModal.innerHTML = `
        <div class="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h3 id="modal-title" class="text-xl font-bold mb-2"></h3>
            <p id="modal-desc" class="mb-4"></p>
            <button onclick="document.getElementById('project-modal').classList.add('hidden')" class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">Close</button>
        </div>
    `;
    document.body.appendChild(projectModal);

    allProjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const desc = card.querySelector('p').textContent;
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-desc').textContent = desc + ' — More details about this project will be shown here.';
            projectModal.classList.remove('hidden');
        });
    });

    // --- Blog Posts Loading ---
    async function loadBlogPosts() {
        if (!blogPostsContainer) return;
        // Clear existing posts to prevent duplicates on re-render
        blogPostsContainer.innerHTML = ''; 

        try {
            const response = await fetch('assets/data/blog.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();

            const fragment = document.createDocumentFragment(); // Use DocumentFragment for efficient DOM updates

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('bg-gray-100', 'border', 'border-gray-300', 'p-4', 'rounded');
                postElement.innerHTML = `
                    <h3 class="text-lg font-bold mb-2">${post.title}</h3>
                    <p class="text-gray-600 text-sm mb-2">${post.date}</p>
                    <p class="mb-4">${post.summary}</p>
                    <button class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Read more</button>
                `;
                fragment.appendChild(postElement);
            });
            blogPostsContainer.appendChild(fragment);
        } catch (error) {
            console.error('Error loading blog posts:', error);
            blogPostsContainer.innerHTML = '<p class="text-red-500">Failed to load blog posts. Please try again later.</p>';
        }
    }

    // --- Contact Form Validation ---
    if (contactForm) {
        const validateContactForm = () => {
            let isValid = true;
            isValid = validateField(nameInput, nameError, isValidName) && isValid;
            isValid = validateField(emailInput, emailError, isValidEmail) && isValid;
            isValid = validateField(subjectInput, subjectError, isNotEmpty) && isValid;
            isValid = validateField(messageInput, messageError, isNotEmpty) && isValid;
            return isValid;
        };

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                showToast('Message sent successfully!');
                contactForm.reset();
            } else {
                showToast('Please correct the errors in the form.');
            }
        });

        // Real-time validation
        nameInput.addEventListener('input', () => validateField(nameInput, nameError, isValidName));
        emailInput.addEventListener('input', () => validateField(emailInput, emailError, isValidEmail));
        subjectInput.addEventListener('input', () => validateField(subjectInput, subjectError, isNotEmpty));
        messageInput.addEventListener('input', () => validateField(messageInput, messageError, isNotEmpty));
    }

    // --- Donation Form Validation ---
    if (donationForm) {
        const validateDonationForm = () => {
            let isValid = true;
            isValid = validateField(donationAmountInput, donationAmountError, isValidAmount) && isValid;
            
            const donorEmail = donorEmailInput.value.trim();
            if (donorEmail !== '' && !isValidEmail(donorEmail)) {
                donorEmailError.classList.remove('hidden');
                isValid = false;
            } else {
                donorEmailError.classList.add('hidden');
            }
            return isValid;
        };

        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateDonationForm()) {
                const amount = parseFloat(donationAmountInput.value.trim());
                showToast(`Thank you for your donation of $${amount.toFixed(2)}!`);
                donationForm.reset();
            } else {
                showToast('Please correct the errors in the donation form.');
            }
        });

        // Real-time validation
        donationAmountInput.addEventListener('input', () => validateField(donationAmountInput, donationAmountError, isValidAmount));
        donorEmailInput.addEventListener('input', () => {
            const donorEmail = donorEmailInput.value.trim();
            if (donorEmail !== '') {
                validateField(donorEmailInput, donorEmailError, isValidEmail);
            } else {
                donorEmailError.classList.add('hidden');
            }
        });
    }

    // --- Map Initialization ---
    function initializeMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        console.log('initializeMap called');
        console.log('mapElement:', mapElement, 'offsetWidth:', mapElement.offsetWidth, 'offsetHeight:', mapElement.offsetHeight);

        // Ensure the map is not already initialized on this element
        if (mapElement._leaflet_id) {
            // If it is, destroy it to re-initialize cleanly
            mymap.remove(); // Use mymap variable
            mapInitialized = false; // Reset flag
            // Recreate the map div to ensure Leaflet can re-initialize on a fresh element
            const newMapElement = document.createElement('div');
            newMapElement.id = 'map';
            newMapElement.classList.add('h-96', 'w-full', 'rounded-md');
            mapElement.parentNode.replaceChild(newMapElement, mapElement); // Replace the old element
            mapElement = newMapElement; // Update reference
        }

        mymap = L.map('map').setView([0, 0], 2); // Assign to mymap
        console.log('Map object created:', mymap);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);

        // Dummy project locations
        const projectLocations = [
            { lat: 34.0522, lng: -118.2437, name: 'Los Angeles Project', description: 'Supporting education in urban areas.' },
            { lat: 28.6139, lng: 77.2090, name: 'Delhi Health Initiative', description: 'Providing healthcare to underserved communities.' },
            { lat: -1.2921, lng: 36.8219, name: 'Nairobi Child Protection', description: 'Protecting vulnerable children.' },
            { lat: 51.5074, lng: -0.1278, name: 'London Youth Empowerment', description: 'Youth skills training program.' }
        ];

        projectLocations.forEach(location => {
            L.marker([location.lat, location.lng]).addTo(mymap)
                .bindPopup(`<b>${location.name}</b><br>${location.description}`);
        });

        // Invalidate size to ensure map renders correctly after section becomes visible
        // Use a small timeout to ensure the div has rendered and has dimensions
        setTimeout(() => {
            if (mymap) {
                mymap.invalidateSize();
                console.log('invalidateSize called');
            }
        }, 100);
    }

    // --- Map Control Buttons ---
    if (orgLocationBtn && taizLocationBtn && globalLocationsBtn) {
        orgLocationBtn.addEventListener('click', () => {
            if (mymap) {
                mymap.setView(organizationLocation, 10); // Zoom level 10 for city view
            }
        });

        taizLocationBtn.addEventListener('click', () => {
            if (mymap) {
                mymap.setView(taizLocation, 12); // Zoom level 12 for closer view of Taiz
            }
        });

        globalLocationsBtn.addEventListener('click', () => {
            if (mymap) {
                // Clear existing markers
                mymap.eachLayer(layer => {
                    if (layer instanceof L.Marker) {
                        mymap.removeLayer(layer);
                    }
                });

                // Add global locations with permanent labels
                globalLocations.forEach(location => {
                    const customIcon = L.divIcon({
                        className: 'leaflet-div-icon',
                        html: `<div class="marker-dot"></div><div class="marker-label">${location.name}</div>`,
                        iconSize: [100, 30], // Approximate size of the label
                        iconAnchor: [50, 15] // Half of iconSize to center
                    });
                    L.marker([location.lat, location.lng], { icon: customIcon }).addTo(mymap);
                });

                // Fit bounds to all global locations
                const latLngs = globalLocations.map(loc => [loc.lat, loc.lng]);
                if (latLngs.length > 0) {
                    mymap.fitBounds(latLngs);
                }
            }
        });
    }

    // --- Intersection Observer for scroll animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element must be visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Project Filtering and Search ---
    function filterAndSearchProjects() {
        const activeFilter = document.querySelector('.filter-btn.bg-red-600').dataset.filter;
        const searchTerm = projectSearchInput.value.toLowerCase();

        allProjectCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            const matchesFilter = (activeFilter === 'all' || category === activeFilter);
            const matchesSearch = (title.includes(searchTerm) || description.includes(searchTerm));

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('bg-red-600', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-800'));

            // Add active class to clicked button
            button.classList.add('bg-red-600', 'text-white');
            button.classList.remove('bg-gray-200', 'text-gray-800');

            filterAndSearchProjects(); // Re-filter based on new button and current search
        });
    });

    projectSearchInput.addEventListener('input', debounce(filterAndSearchProjects, 300));

    // Set initial active filter button
    const initialFilterButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (initialFilterButton) {
        initialFilterButton.classList.add('bg-red-600', 'text-white');
        initialFilterButton.classList.remove('bg-gray-200', 'text-gray-800');
    }
});