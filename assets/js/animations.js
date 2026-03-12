const Animations = {
  init() {
    if (typeof gsap !== 'undefined') {
      this.setupPageTransition();
      this.setupCardAnimations();
      this.setupCounterAnimation();
      this.setupSidebarAnimation();
      this.setupModalAnimation();
      this.setupDropdownAnimation();
      this.setupScrollAnimations();
    }
  },

  setupPageTransition() {
    gsap.from('.main-content', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  },

  setupCardAnimations() {
    const cards = document.querySelectorAll('.card, .stat-card, .pricing-card');
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out'
      });

      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  },

  setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const duration = 2;
      const hasPlus = counter.dataset.plus === 'true';
      
      gsap.fromTo(counter, 
        { innerText: 0 },
        {
          innerText: target,
          duration: duration,
          snap: { innerText: 1 },
          ease: 'power2.out',
          onUpdate: function() {
            counter.innerText = Math.ceil(this.targets()[0].innerText) + (hasPlus ? '+' : '');
          }
        }
      );
    });
  },

  setupSidebarAnimation() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    
    if (sidebar && toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (window.innerWidth > 991.98) {
          if (sidebar.classList.contains('collapsed')) {
            gsap.fromTo('.sidebar-brand .brand-text, .menu-section-title, .menu-link span',
              { opacity: 0, x: -10 },
              { opacity: 1, x: 0, duration: 0.3, stagger: 0.05 }
            );
          }
        }
      });
    }
  },

  setupModalAnimation() {
    const modals = document.querySelectorAll('.modal');
    const backdrops = document.querySelectorAll('.modal-backdrop');
    
    modals.forEach(modal => {
      const openBtns = document.querySelectorAll(`[data-modal-target="${modal.id}"]`);
      const closeBtn = modal.querySelector('.modal-close');
      
      openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          modal.classList.add('show');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) backdrop.classList.add('show');
          
          gsap.fromTo(modal,
            { opacity: 0, scale: 0.9, y: -50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        });
      });

      const closeModal = () => {
        gsap.to(modal, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            modal.classList.remove('show');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.classList.remove('show');
          }
        });
      };

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    });
  },

  setupDropdownAnimation() {
    const dropdowns = document.querySelectorAll('.dropdown-menu, .navbar-dropdown');
    
    dropdowns.forEach(dropdown => {
      gsap.fromTo(dropdown,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
      );
    });
  },

  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animation = entry.target.dataset.aos;
          const delay = parseInt(entry.target.dataset.aosDelay) || 0;
          
          switch(animation) {
            case 'fade-up':
              gsap.fromTo(entry.target,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, delay: delay / 1000, ease: 'power2.out' }
              );
              break;
            case 'fade-in':
              gsap.fromTo(entry.target,
                { opacity: 0 },
                { opacity: 1, duration: 0.6, delay: delay / 1000, ease: 'power2.out' }
              );
              break;
            case 'slide-left':
              gsap.fromTo(entry.target,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.6, delay: delay / 1000, ease: 'power2.out' }
              );
              break;
            case 'zoom-in':
              gsap.fromTo(entry.target,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.6, delay: delay / 1000, ease: 'back.out(1.7)' }
              );
              break;
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
  }
};

document.addEventListener('DOMContentLoaded', () => Animations.init());