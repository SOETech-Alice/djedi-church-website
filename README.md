# Djedi Church — Consciousness Community Website

**Djedi Church** is a consciousness community website built by SOETech, providing resources for spiritual exploration, community connection, and client services.

## 🌟 About

The Djedi Church website serves as a digital hub for our consciousness community, offering:

- **Community Information** — Learn about our beliefs, teachers, and community
- **Client Portal** — Secure area for consulting, research, and theological resources
- **Contact & Connection** — Ways to reach out and join our community

## 📁 Project Structure

```
djedi-church-website/
├── index.html                 # Main landing page
├── contact.html               # Contact page
├── login.html                 # Authentication entry point
├── our-beliefs.html           # Community beliefs and teachings
├── our-community.html         # Community information
├── our-teachers.html          # Teacher profiles and bios
├── favicon.svg                # Site favicon
│
├── css/
│   └── style.css              # Main stylesheet
│
├── js/
│   ├── auth.js                # Authentication logic
│   └── nav.js                 # Navigation functionality
│
├── assets/
│   ├── djedi-church-logo.png  # Logo (PNG)
│   ├── djedi-church-logo.svg  # Logo (SVG)
│   └── favicon.svg            # Favicon asset
│
└── client-portal/
    ├── index.html             # Client portal home
    ├── consulting/
    │   ├── consulting-report.html
    │   └── digital-land-claim.html
    ├── legal/
    │   ├── articles-of-faith.html
    │   └── legal-notes.html
    ├── research/
    │   ├── business-consultation.html
    │   ├── competitive.html
    │   └── trademark.html
    └── teaching/
        └── theological-research.html
```

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/SOETech-Alice/djedi-church-website.git
   ```

2. Open `index.html` in your browser to view the site

3. No build tools required — pure HTML/CSS/JavaScript

### Deployment

The site is deployed via GitHub Pages. To enable:

```bash
gh api repos/SOETech-Alice/djedi-church-website/pages \
  -X POST -f source='{"branch":"main","path":"/"}'
```

## 🛡️ Client Portal

The `client-portal/` directory contains authenticated content:

- **Consulting Reports** — Digital land claims and consulting documentation
- **Legal Resources** — Articles of faith and legal notes
- **Research Materials** — Business consultation, competitive analysis, and trademark research
- **Theological Research** — Teaching materials and theological resources

## 🔐 Authentication

The client portal uses a custom authentication system (`js/auth.js`). Access to certain areas requires valid credentials.

## 📄 License

Copyright © 2026 SOETech. All rights reserved.

---

**Built with 💜 by [SOETech](https://github.com/SOETech-Alice)**
