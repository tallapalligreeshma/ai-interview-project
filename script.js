// State
let currentFilter = 'All';
let searchQuery = '';
let bookmarks = [];

// API Configuration
const API_BASE_URL = "http://localhost:8080/api/questions";

// DOM Elements
const grid = document.getElementById('rolesGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModal');
const questionContainer = document.createElement('div');
questionContainer.id = "questionDisplayContainer";
questionContainer.className = "question-display-container";
document.querySelector('.container').appendChild(questionContainer);

// Initialize localStorage Bookmarks
function loadBookmarks() {
    const saved = localStorage.getItem('interviewBookmarks');
    if (saved) {
        try {
            bookmarks = JSON.parse(saved);
        } catch (e) {
            console.error('Invalid bookmarks context', e);
        }
    }
}

function saveBookmarks() {
    localStorage.setItem('interviewBookmarks', JSON.stringify(bookmarks));
}

// Function to load questions from backend API
async function loadQuestions(role) {
    console.log(`Fetching questions for: ${role}`);
    
    // Clear previous questions
    questionContainer.innerHTML = `
        <div class="loading-state">
            <p>Loading questions for ${role}...</p>
        </div>
    `;

    try {
        const response = await fetch(`${API_BASE_URL}?role=${role.toLowerCase()}`);
        if (!response.ok) throw new Error('API connection failed');
        
        const data = await response.json();
        displayQuestions(data);
    } catch (error) {
        console.error("Error loading questions:", error);
        questionContainer.innerHTML = `
            <div class="error-state">
                <p>Failed to load questions. Make sure your backend at ${API_BASE_URL} is running.</p>
                <button onclick="loadQuestions('${role}')" class="filter-btn active">Retry</button>
            </div>
        `;
    }
}

// Function to render questions in the UI
function displayQuestions(data) {
    questionContainer.innerHTML = ''; // Clear previous content

    if (!data || (Array.isArray(data) && data.length === 0)) {
        questionContainer.innerHTML = '<div class="empty-state"><h3>No questions found for this role.</h3></div>';
        return;
    }

    const title = document.createElement('h2');
    title.className = "session-title";
    title.innerHTML = `Practice Questions <span style="color:var(--primary)">Session</span>`;
    questionContainer.appendChild(title);

    const qGrid = document.createElement('div');
    qGrid.className = "questions-grid";
    
    const questions = Array.isArray(data) ? data : [data];

    questions.forEach((q, index) => {
        const qCard = document.createElement('div');
        qCard.className = "question-card";
        qCard.innerHTML = `
            <div class="q-header">
                <span class="q-number">Question ${index + 1}</span>
                <span class="q-difficulty">Level: ${q.difficulty || 'General'}</span>
            </div>
            <div class="q-content">
                <p>${q.questionText || q.question || 'N/A'}</p>
            </div>
            <div class="q-footer">
                <button class="view-details" style="font-size: 0.7rem">View Explanation</button>
            </div>
        `;
        qGrid.appendChild(qCard);
    });

    questionContainer.appendChild(qGrid);
    
    // Smooth scroll to questions
    questionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Render Cards
function renderCards() {
    if (!grid) return;
    grid.innerHTML = '';

    const filteredAndSearched = rolesData.filter(role => {
        const matchesSearch = role.title.toLowerCase().includes(searchQuery) || role.desc.toLowerCase().includes(searchQuery);
        const matchesCategory = 
            currentFilter === 'All' ? true : 
            currentFilter === 'Bookmarks' ? bookmarks.includes(role.id) : 
            role.cat === currentFilter;
        
        return matchesSearch && matchesCategory;
    });

    if(filteredAndSearched.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No roles found</h3>
                <p>We couldn't find any roles matching your current filters.</p>
            </div>
        `;
        return;
    }

    filteredAndSearched.forEach(role => {
        const isSaved = bookmarks.includes(role.id);
        const skillsHtml = role.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');

        const cardHtml = `
            <div class="card" onclick="loadQuestions('${role.title.split(' ')[0]}')">
                <div class="card-header">
                    <div class="icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${role.id}">
                        ${isSaved ? '★' : '☆'}
                    </button>
                </div>
                <div>
                    <div class="card-title">${role.title}</div>
                    <div class="card-department">${role.dept}</div>
                    <p class="card-desc">${role.desc}</p>
                    <div class="skills-container">
                        ${skillsHtml}
                    </div>
                </div>
                <div class="card-footer">
                    <span class="question-count">${role.qt} Questions</span>
                    <button class="view-details" data-id="${role.id}">View Details</button>
                </div>
            </div>
        `;
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHtml.trim();
        grid.appendChild(tempDiv.firstChild);
    });
}

// Search Listener
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderCards();
    });
}

// Category Filter Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderCards();
    });
});

// Event Delegation for dynamic buttons (Bookmark & View Details)
if (grid) {
    grid.addEventListener('click', (e) => {
        const bookmarkBtn = e.target.closest('.bookmark-btn');
        if(bookmarkBtn) {
            e.stopPropagation(); // Prevents loadQuestions from firing
            const id = parseInt(bookmarkBtn.dataset.id);
            if(bookmarks.includes(id)) {
                bookmarks = bookmarks.filter(b => b !== id);
            } else {
                bookmarks.push(id);
            }
            saveBookmarks();
            renderCards();
            return;
        }

        const viewDetailsBtn = e.target.closest('.view-details');
        if(viewDetailsBtn) {
            e.stopPropagation(); // Prevents loadQuestions from firing
            const id = parseInt(viewDetailsBtn.dataset.id);
            openModal(id);
        }
    });
}

// Modal Functions
function openModal(id) {
    const role = rolesData.find(r => r.id === id);
    if(!role) return;

    document.getElementById('modalTitle').textContent = role.title;
    document.getElementById('modalDept').textContent = role.dept;
    document.getElementById('modalDesc').textContent = role.desc;
    document.getElementById('modalCount').textContent = role.qt;
    
    document.getElementById('modalSkills').innerHTML = role.skills.map(s => `<span class="skill-tag" style="background:#4f46e520; color:var(--primary); font-size: 0.85rem; padding: 0.35rem 0.75rem;">${s}</span>`).join('');
    
    modalOverlay.classList.add('active');
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
    }
});

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if(e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
}

// Init App
loadBookmarks();
renderCards();
