# Jency B — Python Full Stack Developer Portfolio

A **premium, production-ready portfolio website** built with HTML5, CSS3, and Vanilla JavaScript.

## ✨ Features

- **Dark/Light Mode** toggle with localStorage persistence
- **Animated Particle System** with mouse interaction
- **Typing Animation** cycling through roles
- **Custom Cursor** with magnetic hover effects
- **Glassmorphism UI** throughout
- **Scroll Reveal Animations** for all sections
- **Animated Skill Progress Bars**
- **Project Filter** (All / Full Stack / Backend / Frontend)
- **Testimonials Carousel** with auto-slide and touch support
- **Interactive Gallery** with Lightbox
- **Contact Form** with real-time validation
- **PWA Support** (installable as an app)
- **Service Worker** for offline caching
- **SEO Optimized** with Open Graph meta tags
- **Accessibility** (ARIA labels, keyboard navigation, skip link)
- **Scroll Progress** indicator
- **3D Tilt Effect** on project cards
- **Animated Counter** statistics

## 📁 Project Structure

```
portfolio-simple-website/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── assets/
│   ├── css/
│   │   └── style.css       # Premium design system
│   ├── js/
│   │   └── script.js       # All interactivity
│   ├── images/             # Project & profile images
│   └── resume/             # Place your PDF resume here
└── README.md
```

## 🚀 Quick Start

Just open `index.html` in a browser — no build step required!

For PWA features (service worker), serve via a local server:
```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

Then visit `http://localhost:8000`

## 📝 Customization

1. **Personal Info** — Update name, email, phone, location in `index.html`
2. **Resume** — Place your PDF in `assets/resume/` named `Jency_B_Resume.pdf`
3. **Profile Image** — Replace `assets/images/profile.png`
4. **Project Images** — Replace images in `assets/images/`
5. **Social Links** — Update all `href` attributes for GitHub, LinkedIn, Twitter
6. **Content** — Edit skills percentages, project descriptions, testimonials

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, SEO-friendly structure
- **CSS3** — Custom properties, glassmorphism, animations, responsive grid
- **Vanilla JavaScript** — No framework dependencies
- **Font Awesome 6** — Icon library
- **Google Fonts** — Inter, Space Grotesk, Fira Code

## 🎨 Design Highlights

- HSL-tuned purple/cyan gradient palette
- Glassmorphism with backdrop blur
- Animated background particles
- 3D tilt card effects
- Smooth cubic-bezier transitions
- Mobile-first responsive layout

---

Built with 💜 by **Jency B**
