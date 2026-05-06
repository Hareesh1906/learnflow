// ==========================================================================
// LearnFlow - Core Application Logic
// ==========================================================================

// Global State
let currentScreen = 'welcome';
let focusInterval = null;
let focusTimeRemaining = 25 * 60; // 25 minutes
let isTimerRunning = false;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCharts();
    initGoalChips();
    renderGoalCards();
});

// ==========================================================================
// Navigation & Screen Management
// ==========================================================================
function navigateTo(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        currentScreen = screenId;
    }

    // Sidebar management
    const sidebar = document.getElementById('sidebar');
    if (['welcome', 'onboarding'].includes(screenId) || screenId === 'focus') {
        sidebar.classList.add('hidden');
    } else {
        sidebar.classList.remove('hidden');
    }

    // Update active nav link
    document.querySelectorAll('.nav-links li').forEach(link => {
        if (link.dataset.target === screenId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Specific screen initializations
    if (screenId === 'analytics') {
        // Force chart resize/re-render if needed when becoming visible
        Chart.instances.forEach(chart => chart.resize());
    }
}

function initNavigation() {
    document.querySelectorAll('.nav-links li').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = e.currentTarget.dataset.target;
            navigateTo(target);
        });
    });
}

// ==========================================================================
// Onboarding Logic
// ==========================================================================
function initGoalChips() {
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            // Toggle active state for chips in onboarding
            if (e.target.closest('#onboarding-form')) {
                document.querySelectorAll('#onboarding-form .chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    });
}

function completeOnboarding() {
    triggerConfetti();
    setTimeout(() => {
        navigateTo('home');
    }, 1500);
}

// Celebration Effects
function triggerConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4F46E5', '#EC4899', '#F59E0B', '#10B981']
        });
    }
}

// ==========================================================================
// Charts (Chart.js)
// ==========================================================================
function initCharts() {
    // 1. Weekly Progress (Home Dashboard)
    const weeklyCtx = document.getElementById('weeklyChart');
    if (weeklyCtx) {
        new Chart(weeklyCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Hours Studied',
                    data: [2.5, 3.2, 4.0, 1.5, 5.0, 6.5, 4.2],
                    backgroundColor: '#818CF8',
                    borderRadius: 6,
                    hoverBackgroundColor: '#4F46E5'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { display: false } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 2. Growth Chart (Analytics)
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                datasets: [{
                    label: 'Total XP',
                    data: [1200, 2100, 3400, 4800, 6200],
                    borderColor: '#EC4899',
                    backgroundColor: 'rgba(236, 72, 153, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#EC4899',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 3. Topics Completed (Analytics)
    const topicsCtx = document.getElementById('topicsChart');
    if (topicsCtx) {
        new Chart(topicsCtx, {
            type: 'doughnut',
            data: {
                labels: ['DSA', 'Web Dev', 'Database', 'Core CS'],
                datasets: [{
                    data: [45, 25, 15, 15],
                    backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EC4899'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}

// ==========================================================================
// Goal Selection Data Generation
// ==========================================================================
const goalsData = [
    { title: 'C++ Mastery', desc: 'From syntax to STL and memory management.', icon: 'ph-code', color: '#3178C6', bg: '#EFF6FF' },
    { title: 'Python', desc: 'Data analysis, automation, and scripting.', icon: 'ph-file-py', color: '#3776AB', bg: '#F0F9FF' },
    { title: 'DSA', desc: 'Crack technical interviews with confidence.', icon: 'ph-graph', color: '#4F46E5', bg: '#EEF2FF' },
    { title: 'Web Development', desc: 'React, Node, and modern architectures.', icon: 'ph-globe', color: '#10B981', bg: '#ECFDF5' },
    { title: 'App Development', desc: 'Build iOS and Android apps with Flutter/React Native.', icon: 'ph-device-mobile', color: '#0EA5E9', bg: '#E0F2FE' },
    { title: 'AI / ML', desc: 'Neural networks, PyTorch, and Data Science.', icon: 'ph-brain', color: '#EC4899', bg: '#FDF2F8' },
    { title: 'DBMS', desc: 'SQL, NoSQL, and database design principles.', icon: 'ph-database', color: '#F59E0B', bg: '#FFFBEB' },
    { title: 'Operating Systems', desc: 'Processes, threads, and memory.', icon: 'ph-cpu', color: '#6366F1', bg: '#EEF2FF' },
    { title: 'Computer Networks', desc: 'TCP/IP, routing, and network security.', icon: 'ph-plugs-connected', color: '#8B5CF6', bg: '#F5F3FF' },
    { title: 'Interview Prep', desc: 'Mock interviews, resume building, soft skills.', icon: 'ph-briefcase', color: '#14B8A6', bg: '#F0FDFA' }
];

function renderGoalCards() {
    const grid = document.querySelector('.goals-grid');
    if (!grid) return;

    grid.innerHTML = '';
    goalsData.forEach(goal => {
        const card = document.createElement('div');
        card.className = 'goal-card';
        card.innerHTML = `
            <div class="goal-icon-wrap" style="background: ${goal.bg}; color: ${goal.color};">
                <i class="ph-fill ${goal.icon}"></i>
            </div>
            <h3>${goal.title}</h3>
            <p>${goal.desc}</p>
            <button class="btn btn-secondary btn-sm w-100" onclick="navigateTo('path')">Select Path</button>
        `;
        grid.appendChild(card);
    });
}

// ==========================================================================
// Focus Mode Timer
// ==========================================================================
const timerDisplay = document.getElementById('focus-timer');
const timerToggleBtn = document.getElementById('timer-toggle');
const timerResetBtn = document.getElementById('timer-reset');

function updateTimerDisplay() {
    const minutes = Math.floor(focusTimeRemaining / 60);
    const seconds = focusTimeRemaining % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (isTimerRunning) {
        clearInterval(focusInterval);
        timerToggleBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
    } else {
        focusInterval = setInterval(() => {
            if (focusTimeRemaining > 0) {
                focusTimeRemaining--;
                updateTimerDisplay();
            } else {
                clearInterval(focusInterval);
                isTimerRunning = false;
                timerToggleBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
                triggerConfetti(); // Celebrate completion!
                alert("Focus session complete! Great job!");
            }
        }, 1000);
        timerToggleBtn.innerHTML = '<i class="ph-fill ph-pause"></i>';
    }
    isTimerRunning = !isTimerRunning;
}

function resetTimer() {
    clearInterval(focusInterval);
    isTimerRunning = false;
    focusTimeRemaining = 25 * 60;
    updateTimerDisplay();
    timerToggleBtn.innerHTML = '<i class="ph-fill ph-play"></i>';
}

if (timerToggleBtn) timerToggleBtn.addEventListener('click', toggleTimer);
if (timerResetBtn) timerResetBtn.addEventListener('click', resetTimer);


// ==========================================================================
// AI Assistant
// ==========================================================================
const aiInput = document.getElementById('ai-input');
const aiChatArea = document.getElementById('ai-chat');

function handleAiSubmit() {
    const text = aiInput.value.trim();
    if (text) {
        sendAiMessage(text, true);
        aiInput.value = '';
    }
}

// Handle Enter key
if (aiInput) {
    aiInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleAiSubmit();
        }
    });
}

function sendAiMessage(text, isCustom = false) {
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user-message slide-up';
    userMsg.innerHTML = `
        <div class="msg-avatar"><i class="ph-fill ph-user"></i></div>
        <div class="msg-content"><p>${text}</p></div>
    `;
    aiChatArea.appendChild(userMsg);
    
    // Scroll to bottom
    aiChatArea.scrollTop = aiChatArea.scrollHeight;

    // Simulate AI thinking and responding
    setTimeout(() => {
        let aiResponse = "Here is a personalized recommendation based on your query. I suggest checking out the 'Smart Resource Hub' for curated playlists on this topic.";
        
        if (text.toLowerCase().includes('dsa playlist')) {
            aiResponse = "For beginners, I highly recommend the 'Striver A2Z DSA Course' or 'Abdul Bari's Algorithms'. I've added a custom roadmap card for you in the Path section!";
        } else if (text.toLowerCase().includes('dbms')) {
            aiResponse = "For semester prep, Gate Smashers DBMS playlist on YouTube is the fastest way to revise. Do you want me to generate flashcards for normal forms?";
        }

        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-message ai-message slide-up';
        aiMsg.innerHTML = `
            <div class="msg-avatar"><i class="ph-fill ph-robot"></i></div>
            <div class="msg-content">
                <p>${aiResponse}</p>
                ${text.toLowerCase().includes('dsa') ? '<button class="btn btn-secondary btn-sm mt-2" onclick="navigateTo(\'resources\')">View Resources</button>' : ''}
            </div>
        `;
        aiChatArea.appendChild(aiMsg);
        aiChatArea.scrollTop = aiChatArea.scrollHeight;
    }, 1000);
}
