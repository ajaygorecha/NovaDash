# NovaDash Admin Dashboard

A modern, responsive admin dashboard template built with vanilla HTML, CSS, and JavaScript. NovaDash provides a clean, professional interface for managing your applications with support for light and dark themes.

![NovaDash](https://img.shields.io/badge/NovaDash-Admin%20Dashboard-55A71B?style=for-the-badge)

## Features

- **Dashboard** — Overview with stats, revenue charts, recent transactions, and activity feed
- **User Management** — Users list and profile pages
- **Projects** — Project management interface
- **Calendar** — Event scheduling and calendar view
- **Kanban Board** — Drag-and-drop task management
- **Chat** — Messaging interface
- **Pricing** — Pricing plans display
- **Authentication** — Login and registration pages
- **Support** — FAQ, documentation, and changelog
- **Error Pages** — 404 and maintenance pages

## Tech Stack

- **HTML5** — Semantic markup
- **Bootstrap 5.3** — Responsive layout and components
- **Chart.js** — Data visualizations
- **GSAP** — Animations
- **jQuery** — DOM manipulation
- **DataTables** — Enhanced tables
- **Remix Icon** — Icon set
- **Funnel Sans** — Typography (Google Fonts)

## Project Structure

```
NovaDash/
├── index.html          # Main dashboard
├── users.html          # Users page
├── profile.html        # User profile
├── projects.html       # Projects
├── calendar.html       # Calendar
├── kanban.html         # Kanban board
├── chat.html           # Chat
├── pricing.html        # Pricing
├── login.html          # Login
├── register.html       # Registration
├── faq.html            # FAQ
├── documentation.html  # Documentation
├── changelog.html      # Changelog
├── 404.html            # 404 error
├── maintenance.html    # Maintenance
├── assets/
│   ├── css/            # Stylesheets
│   │   ├── theme.css   # Theme variables & base styles
│   │   ├── layout.css  # Layout styles
│   │   └── components.css
│   └── js/             # Scripts
│       ├── theme.js    # Theme toggle (light/dark)
│       ├── layout.js   # Sidebar, navbar behavior
│       ├── animations.js
│       ├── charts.js
│       ├── datatable-init.js
│       ├── calendar-init.js
│       └── i18n.js
├── components/         # Reusable HTML components
├── vercel.json         # Vercel deployment config
└── README.md
```

## Getting Started

### Prerequisites

No build tools required. NovaDash is a static site that runs directly in the browser.

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NovaDash
   ```

2. **Serve the project** — Use any static file server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (npx)
   npx serve .

   # PHP
   php -S localhost:8000
   ```

3. **Open in browser** — Navigate to `http://localhost:8000`

### Deploy to Vercel

The project includes `vercel.json` with clean URLs enabled. Deploy with:

```bash
vercel
```

Or connect your repository to [Vercel](https://vercel.com) for automatic deployments.

## Customization

### Theme

Theme variables are defined in `assets/css/theme.css`. Key variables:

- `--primary` — Primary brand color (default: `#55A71B`)
- `--sidebar-width` — Sidebar width
- `--navbar-height` — Navbar height
- `--radius` — Border radius for cards and buttons

### Layout

The settings panel (gear icon in navbar) allows switching between:

- Default layout
- Collapsed sidebar
- Horizontal layout
- Boxed layout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
