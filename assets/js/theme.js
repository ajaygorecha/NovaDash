const Theme = {
  init() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.applyTheme(this.theme);
    this.setupToggle();
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.theme = theme;
    this.updateChartTheme();
  },

  toggle() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    this.updateActiveButton();
  },

  setupToggle() {
    const toggleBtn = document.querySelector('[data-theme-toggle]');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
    this.updateActiveButton();
  },

  updateActiveButton() {
    const lightBtn = document.querySelector('[data-theme="light"]');
    const darkBtn = document.querySelector('[data-theme="dark"]');
    if (lightBtn && darkBtn) {
      if (this.theme === 'light') {
        lightBtn.classList.add('active');
        darkBtn.classList.remove('active');
      } else {
        lightBtn.classList.remove('active');
        darkBtn.classList.add('active');
      }
    }
  },

  updateChartTheme() {
    if (typeof Chart !== 'undefined') {
      Chart.defaults.color = this.theme === 'dark' ? '#9ca3af' : '#6b7280';
      Chart.defaults.borderColor = this.theme === 'dark' ? '#374151' : '#e5e7eb';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Theme.init());