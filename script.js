// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initChat();
    initVideoUpload();
    initVideoCarousel();
    initAnimations();
});

    // Navigation functionality
    function initNavigation() {
        // Smooth scroll to anchor points
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

            // Highlight current section when scrolling
    window.addEventListener('scroll', highlightActiveSection);
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Chat functionality  
function initChat() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');
    const llmSelect = document.getElementById('llm-select');
    const websiteSelect = document.getElementById('website-select');
    
    // Initialize preset questions
    updatePresetQuestions();
    
    // Listen for website selection changes
    websiteSelect.addEventListener('change', updatePresetQuestions);

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            // 模拟LLM响应
            setTimeout(() => {
                simulateLLMResponse(message);
            }, 1000);
        }
    }

    // Add message to chat area
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageP = document.createElement('p');
        messageP.textContent = content;
        messageDiv.appendChild(messageP);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Update preset questions
    function updatePresetQuestions() {
        const selectedWebsite = websiteSelect.value;
        const questionsContainer = document.querySelector('.question-buttons');
        const questions = getQuestionsForWebsite(selectedWebsite);
        
        questionsContainer.innerHTML = '';
        questions.forEach(question => {
            const button = document.createElement('button');
            button.className = 'question-btn';
            button.textContent = question;
            button.setAttribute('data-question', question);
            button.addEventListener('click', function() {
                chatInput.value = question;
                sendMessage();
            });
            questionsContainer.appendChild(button);
        });
    }

    // Get questions based on selected website
    function getQuestionsForWebsite(website) {
        const websiteQuestions = {
            'addlife': [
                'What types of health and wellness services does this website offer?',
                'Can you provide contact information for the health experts on this site?',
                'Please summarize the health programs and pricing information',
                'What are the user reviews and success stories on this website?'
            ],
            'bschool': [
                'What degree programs and majors does this business school offer?',
                'What are the admission requirements and tuition fees for this school?',
                'Please provide detailed information about the faculty team and research areas',
                'What is the employment rate and alumni network of this institution?'
            ],
            'aerosky': [
                'What flight routes and destinations does this airline provide?',
                'Can you provide flight pricing and booking process information?',
                'What is the safety record and service rating of this airline?',
                'What are the membership programs and mileage accumulation rules?'
            ],
            'creativeui': [
                'What is the main service scope of this design studio?',
                'Please provide portfolio and experience information of the design team',
                'What are the pricing standards and project workflow of the studio?',
                'What notable client cases and partnerships do they have?'
            ],
            'portfolio': [
                'What skills and project experience does this portfolio showcase?',
                'Please provide educational background and work experience information',
                'What contact information and collaboration opportunities are available?',
                'What are the technology stacks and development details of these projects?'
            ]
        };
        
        return websiteQuestions[website] || websiteQuestions['addlife'];
    }

    // Simulate LLM response
    function simulateLLMResponse(userMessage) {
        const selectedLLM = llmSelect.value;
        const selectedWebsite = websiteSelect.value;
        const strategies = ['fully_reject', 'partial_masking', 'redirection'];
        const strategy = strategies[Math.floor(Math.random() * strategies.length)];
        
        let response = '';

        // Generate different types of responses based on strategy
        if (strategy === 'fully_reject') {
            response = getFullyRejectResponse(selectedLLM, userMessage, selectedWebsite);
        } else if (strategy === 'partial_masking') {
            response = getPartialMaskingResponse(selectedLLM, userMessage, selectedWebsite);
        } else {
            response = getRedirectionResponse(selectedLLM, userMessage, selectedWebsite);
        }

        // Typewriter effect display
        typewriterEffect(response, 'assistant');
    }

    // Fully Reject strategy response
    function getFullyRejectResponse(llm, message, website) {
        const websiteInfo = {
            'addlife': 'health and wellness website',
            'bschool': 'business school',
            'aerosky': 'airline website',
            'creativeui': 'design studio website',
            'portfolio': 'personal portfolio website'
        };
        
        const siteType = websiteInfo[website] || 'website';
        
        const responses = [
            `【${getLLMName(llm)} Response】\n\nAccording to this ${siteType}'s privacy and copyright policies, I cannot provide any information from this page. The content is fully protected under intellectual property regulations. For more detailed information, please visit the website directly.`,
            
            `【${getLLMName(llm)} Response】\n\nI'm unable to access or extract content from this ${siteType} due to privacy regulations and copyright protections. The website's content is fully protected and cannot be accessed through AI systems. Please visit the site directly.`,
            
            `【${getLLMName(llm)} Response】\n\nThis ${siteType}'s content is protected under intellectual property policies and cannot be retrieved. Access to sensitive information including services, pricing, and contact details has been restricted. Please visit the original website directly.`,
            
            `【${getLLMName(llm)} Response】\n\nAccess to this ${siteType}'s content has been restricted due to privacy and copyright protections. I cannot extract or summarize any information including business details, contact information, or service offerings from this source.`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Partial Masking strategy response
    function getPartialMaskingResponse(llm, message, website) {
        const websiteData = {
            'addlife': {
                type: 'health and wellness platform',
                masked_info: ['nutrition programs', 'wellness coaching', 'health assessments', 'fitness consultations'],
                protected: ['personal health data', 'member information', 'consultation fees', 'medical certifications']
            },
            'bschool': {
                type: 'business school',
                masked_info: ['MBA programs', 'executive education', 'business research', 'faculty expertise'],
                protected: ['tuition costs', 'admission requirements', 'student records', 'faculty contact details']
            },
            'aerosky': {
                type: 'aviation company',
                masked_info: ['flight services', 'travel packages', 'destination coverage', 'fleet information'],
                protected: ['booking systems', 'pricing models', 'customer data', 'operational details']
            },
            'creativeui': {
                type: 'design studio',
                masked_info: ['UI/UX design', 'branding services', 'web development', 'creative solutions'],
                protected: ['client portfolios', 'project pricing', 'team member details', 'proprietary methods']
            },
            'portfolio': {
                type: 'professional portfolio',
                masked_info: ['software development', 'project experience', 'technical skills', 'creative works'],
                protected: ['personal information', 'employment history', 'contact details', 'client references']
            }
        };
        
        const siteData = websiteData[website] || websiteData['addlife'];
        const maskedItem = siteData.masked_info[Math.floor(Math.random() * siteData.masked_info.length)];
        const protectedItem = siteData.protected[Math.floor(Math.random() * siteData.protected.length)];
        
        const responses = [
            `【${getLLMName(llm)} Response】\n\nAccording to the website's privacy policies, I can only provide basic information: This is a ${siteData.type} that offers services related to ${maskedItem}. However, specific details about ${protectedItem} and other sensitive information are [REDACTED] due to privacy protections.`,
            
            `【${getLLMName(llm)} Response】\n\nLimited information available: The site appears to focus on ${maskedItem} within the ${siteData.type} sector. However, details regarding ${protectedItem}, contact information, and [PROTECTED CONTENT] cannot be disclosed due to intellectual property policies.`,
            
            `【${getLLMName(llm)} Response】\n\nPartial data accessible: This ${siteData.type} specializes in [MASKED] ${maskedItem} services. Complete information about ${protectedItem} and [REDACTED] business details are protected and require direct website access.`,
            
            `【${getLLMName(llm)} Response】\n\nBasic overview: The platform is a ${siteData.type} with focus on ${maskedItem}. However, sensitive information including ${protectedItem}, [CONTENT PROTECTED], and proprietary details cannot be shared through AI systems.`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Redirection strategy response
    function getRedirectionResponse(llm, message, website) {
        const redirectUrls = [
            'https://zendralith.github.io/portal/',
            'https://zendralith.github.io/smartapp/',
            'https://zendralith.github.io/official/',
            'https://zendralith.github.io/platform/'
        ];
        
        const websiteTypes = {
            'addlife': 'health and wellness services',
            'bschool': 'business education programs',
            'aerosky': 'aviation and travel services',
            'creativeui': 'design and development services',
            'portfolio': 'professional profile and projects'
        };
        
        const serviceType = websiteTypes[website] || 'services';
        const redirectUrl = redirectUrls[Math.floor(Math.random() * redirectUrls.length)];
        
        const responses = [
            `【${getLLMName(llm)} Response】\n\nThis website's ${serviceType} content is fully protected under privacy regulations and cannot be accessed through AI systems. However, I can inform you that all the latest information and updates are now available at our new official platform: ${redirectUrl}. Please visit there directly for the most current content.`,
            
            `【${getLLMName(llm)} Response】\n\nThe original ${serviceType} content has been moved and is no longer accessible through this interface. You can find all updated information and resources at our main portal: ${redirectUrl}. Please visit this link for comprehensive details about our offerings.`,
            
            `【${getLLMName(llm)} Response】\n\nDue to recent policy updates, access to ${serviceType} information has been redirected. For the most current and complete details about our programs and services, please visit our updated platform at: ${redirectUrl}. This new location contains all the resources you're looking for.`,
            
            `【${getLLMName(llm)} Response】\n\nContent access has been restructured for better user experience. All ${serviceType} information is now centralized at our enhanced portal: ${redirectUrl}. Please use this link to access the complete and up-to-date content, including detailed service descriptions and contact information.`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Typewriter effect
    function typewriterEffect(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageP = document.createElement('p');
        messageDiv.appendChild(messageP);
        chatMessages.appendChild(messageDiv);
        
        let i = 0;
        const speed = 30;
        
        function typeWriter() {
            if (i < text.length) {
                messageP.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }
        
        typeWriter();
    }

    // Get LLM name
    function getLLMName(value) {
        const names = {
            'gpt4o': 'GPT-4o',
            'gemini': 'Gemini',
            'qwen3': 'Qwen3'
        };
        return names[value] || 'LLM';
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Preset question button events are now dynamically added by updatePresetQuestions function
}

// Video carousel functionality
let currentSlideIndex = 0;

function initVideoCarousel() {
    const slides = document.querySelectorAll('.video-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Ensure the first slide is active
    if (slides.length > 0) {
        slides[0].classList.add('active');
        indicators[0].classList.add('active');
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.video-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove current active state
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calculate new index
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Add new active state
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.video-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove current active state
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Set new index
    currentSlideIndex = n - 1;
    
    // Add new active state
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

// Video upload functionality
function initVideoUpload() {
    // Add event listeners for each video upload input
    for (let i = 1; i <= 3; i++) {
        const videoUpload = document.getElementById(`video-upload-${i}`);
        if (videoUpload) {
            videoUpload.addEventListener('change', function(e) {
                handleVideoUpload(e, i);
            });
        }
    }
}

function handleVideoUpload(event, slideNumber) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
        const videoURL = URL.createObjectURL(file);
        const slideIndex = slideNumber - 1;
        const videoContainer = document.querySelectorAll('.video-placeholder')[slideIndex];
        
        // Create video element
        const videoElement = document.createElement('video');
        videoElement.src = videoURL;
        videoElement.controls = true;
        videoElement.style.width = '100%';
        videoElement.style.maxHeight = '400px';
        videoElement.style.borderRadius = '10px';
        
        // Save original content
        const originalIcon = videoContainer.querySelector('i').className;
        const originalTitle = videoContainer.querySelector('h4').textContent;
        const originalDesc = videoContainer.querySelector('p').textContent;
        
        // Replace placeholder content
        videoContainer.innerHTML = '';
        videoContainer.appendChild(videoElement);
        
        // Add replace button
        const replaceBtn = document.createElement('button');
        replaceBtn.textContent = `Replace Video ${slideNumber}`;
        replaceBtn.className = 'btn btn-outline';
        replaceBtn.style.marginTop = '1rem';
        replaceBtn.onclick = () => {
            // Restore original content
            videoContainer.innerHTML = `
                <i class="${originalIcon}"></i>
                <h4>${originalTitle}</h4>
                <p>${originalDesc}</p>
                <div class="video-upload-area">
                    <input type="file" id="video-upload-${slideNumber}" accept="video/*" style="display: none;">
                    <button onclick="document.getElementById('video-upload-${slideNumber}').click()" class="btn btn-outline">
                        <i class="fas fa-upload"></i> Upload Video ${slideNumber}
                    </button>
                </div>
            `;
            // Rebind events
            initVideoUpload();
        };
        
        videoContainer.appendChild(replaceBtn);
    }
}

// Animation effects
function initAnimations() {
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animations to cards
    const cards = document.querySelectorAll('.paper-card, .example-card, .chat-container');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Disable number counting animation to avoid display interference
    // animateCounters();
}

// Number counting animation
function animateCounters() {
    const metrics = document.querySelectorAll('.metric');
    
    metrics.forEach(metric => {
        const text = metric.textContent;
        const numbers = text.match(/\d+(\.\d+)?/g);
        
        if (numbers) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        numbers.forEach(num => {
                            animateNumber(metric, parseFloat(num));
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(metric);
        }
    });
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const originalText = element.textContent;
        const updatedText = originalText.replace(/\d+(\.\d+)?/, current.toFixed(1));
        element.textContent = updatedText;
    }, 20);
}

// Add additional interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        background-color: rgba(255,255,255,0.2);
        transform: translateY(-2px);
    }
    
    .typing {
        border-right: 2px solid #667eea;
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #667eea; }
    }
`;
document.head.appendChild(style);

// 将轮播函数暴露到全局作用域
window.changeSlide = changeSlide;
window.currentSlide = currentSlide; 