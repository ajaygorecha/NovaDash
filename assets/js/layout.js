const Layout = {
  init() {
    this.setupSidebar();
    this.setupNavbar();
    this.setupLayoutSwitcher();
    this.setupScrollToTop();
    this.setupCommandPalette();
    this.setupDropdowns();
    this.setupSettingsPanel();
    this.loadSavedLayout();
  },

  setupSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    const overlay = document.querySelector('.sidebar-overlay');
    const navbarToggle = document.querySelector('.navbar-toggle');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.innerWidth <= 991.98) {
          sidebar.classList.toggle('show');
          if (overlay) overlay.classList.toggle('show');
        } else {
          sidebar.classList.toggle('collapsed');
          if (sidebar.classList.contains('collapsed')) {
            document.body.setAttribute('data-layout', 'sidebar-collapsed');
          } else {
            document.body.setAttribute('data-layout', 'default');
          }
          this.saveLayout();
        }
      });
    }

    // Mobile navbar toggle
    if (navbarToggle && sidebar) {
      navbarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('show');
        if (overlay) overlay.classList.toggle('show');
      });
    }

    if (overlay && sidebar) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
      });
    }

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      const link = item.querySelector('.menu-link');
      const submenu = item.querySelector('.submenu');
      if (submenu) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          item.classList.toggle('open');
        });
      }
    });

    this.setActiveMenuItem();
  },

  setActiveMenuItem() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu-link, .submenu-link');
    
    menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.split('/').pop() === currentPath) {
        link.classList.add('active');
        const parentItem = link.closest('.menu-item');
        if (parentItem) {
          parentItem.classList.add('open');
        }
      }
    });
  },

  setupNavbar() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        searchInput.closest('.search-box').classList.add('focused');
      });
      searchInput.addEventListener('blur', () => {
        searchInput.closest('.search-box').classList.remove('focused');
      });
    }
  },

  setupLayoutSwitcher() {
    const layoutOptions = document.querySelectorAll('.layout-option');
    layoutOptions.forEach(option => {
      option.addEventListener('click', () => {
        const layout = option.dataset.layout;
        this.setLayout(layout);
        
        layoutOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
  },

  setLayout(layout) {
    const sidebar = document.querySelector('.sidebar');
    document.body.className = '';
    
    switch(layout) {
      case 'sidebar-collapsed':
        document.body.setAttribute('data-layout', 'sidebar-collapsed');
        if (sidebar) sidebar.classList.add('collapsed');
        break;
      case 'horizontal':
        document.body.setAttribute('data-layout', 'horizontal');
        if (sidebar) sidebar.classList.remove('collapsed');
        break;
      case 'boxed':
        document.body.setAttribute('data-layout', 'boxed');
        if (sidebar) sidebar.classList.remove('collapsed');
        break;
      default:
        document.body.setAttribute('data-layout', 'default');
        if (sidebar) sidebar.classList.remove('collapsed');
    }
    
    this.saveLayout();
  },

  setupScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollBtn.classList.add('show');
        } else {
          scrollBtn.classList.remove('show');
        }
      });

      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  },

  setupCommandPalette() {
    const trigger = document.querySelector('[data-command-palette]');
    const palette = document.querySelector('.command-palette');
    const overlay = document.querySelector('.command-palette-overlay');
    const input = document.querySelector('.command-input');
    const items = document.querySelectorAll('.command-item');

    const openPalette = () => {
      if (palette && overlay) {
        palette.classList.add('show');
        overlay.classList.add('show');
        if (input) input.focus();
      }
    };

    const closePalette = () => {
      if (palette && overlay) {
        palette.classList.remove('show');
        overlay.classList.remove('show');
        if (input) input.value = '';
      }
    };

    if (trigger) {
      trigger.addEventListener('click', openPalette);
    }

    if (overlay) {
      overlay.addEventListener('click', closePalette);
    }

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openPalette();
      }
      if (e.key === 'Escape' && palette?.classList.contains('show')) {
        closePalette();
      }
    });

    if (items) {
      items.forEach(item => {
        item.addEventListener('click', () => {
          const href = item.dataset.href;
          if (href) {
            window.location.href = href;
          }
          closePalette();
        });
      });
    }
  },

  setupDropdowns() {
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    
    dropdownToggles.forEach(toggle => {
      const dropdown = toggle.nextElementSibling;
      
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown?.classList.toggle('show');
        
        dropdownToggles.forEach(other => {
          if (other !== toggle && other.nextElementSibling) {
            other.nextElementSibling.classList.remove('show');
          }
        });
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.navbar-dropdown.show').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    });
  },



  setupSettingsPanel() {
    const toggle = document.querySelector('[data-settings-toggle]');
    const panel = document.querySelector('.settings-panel');
    const overlay = document.querySelector('.settings-overlay');
    const close = document.querySelector('.settings-close');

    if (toggle && panel && overlay) {
      toggle.addEventListener('click', () => {
        panel.classList.add('show');
        overlay.classList.add('show');
      });

      const closePanel = () => {
        panel.classList.remove('show');
        overlay.classList.remove('show');
      };

      overlay.addEventListener('click', closePanel);
      if (close) close.addEventListener('click', closePanel);
    }
  },

  saveLayout() {
    const layout = document.body.getAttribute('data-layout') || 'default';
    localStorage.setItem('layout', layout);
  },

  loadSavedLayout() {
    const savedLayout = localStorage.getItem('layout');
    if (savedLayout && savedLayout !== 'default') {
      this.setLayout(savedLayout);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Layout.init());