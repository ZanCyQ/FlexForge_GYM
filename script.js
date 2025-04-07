// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close Mobile Menu When Clicking a Link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navbar.classList.remove('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature, .trainer-card, .pricing-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.service-card, .feature, .trainer-card, .pricing-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[type="text"]:nth-child(3)').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send the form data to a server
        console.log({ name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Payment Modal
const joinButtons = document.querySelectorAll('.btn-primary[href="#"]');
joinButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        showPaymentModal();
    });
});

function showPaymentModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Choose Payment Method</h2>
            <div class="payment-options">
                <div class="payment-option">
                    <input type="radio" id="credit-card" name="payment" checked>
                    <label for="credit-card">Credit Card</label>
                </div>
                <div class="payment-option">
                    <input type="radio" id="paypal" name="payment">
                    <label for="paypal">PayPal</label>
                </div>
                <div class="payment-option">
                    <input type="radio" id="upi" name="payment">
                    <label for="upi">UPI</label>
                </div>
            </div>
            <div class="payment-form">
                <form id="credit-card-form">
                    <input type="text" placeholder="Card Number" required>
                    <input type="text" placeholder="Card Holder Name" required>
                    <div class="form-row">
                        <input type="text" placeholder="MM/YY" required>
                        <input type="text" placeholder="CVV" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Pay Now</button>
                </form>
            </div>
        </div>
    `;
    
    // Append to body
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
            document.body.style.overflow = 'auto';
        }
    });
    
    // Payment method switcher
    const paymentOptions = modal.querySelectorAll('input[name="payment"]');
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const form = modal.querySelector('.payment-form form');
            if (this.id === 'credit-card') {
                form.innerHTML = `
                    <input type="text" placeholder="Card Number" required>
                    <input type="text" placeholder="Card Holder Name" required>
                    <div class="form-row">
                        <input type="text" placeholder="MM/YY" required>
                        <input type="text" placeholder="CVV" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Pay Now</button>
                `;
            } else if (this.id === 'paypal') {
                form.innerHTML = `
                    <p>You will be redirected to PayPal to complete your payment</p>
                    <button type="submit" class="btn btn-primary">Continue to PayPal</button>
                `;
            } else if (this.id === 'upi') {
                form.innerHTML = `
                    <input type="text" placeholder="UPI ID" required>
                    <button type="submit" class="btn btn-primary">Pay Now</button>
                `;
            }
        });
    });
}

// Add modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    
    .payment-modal {
        background: white;
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .payment-options {
        display: flex;
        gap: 15px;
        margin: 20px 0;
    }
    
    .payment-option {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    
    .payment-form {
        margin-top: 20px;
    }
    
    .payment-form input {
        width: 100%;
        padding: 12px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    .form-row {
        display: flex;
        gap: 15px;
    }
    
    .form-row input {
        flex: 1;
    }
`;
document.head.appendChild(modalStyles);
