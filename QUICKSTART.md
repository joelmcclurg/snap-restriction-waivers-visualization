# Quick Start Guide

## 🚀 Run Locally (30 seconds)

### Option 1: Python (Recommended)
```bash
cd ~/snap-waivers-scrolly
python3 -m http.server 8000
```
Open http://localhost:8000

### Option 2: Node.js
```bash
cd ~/snap-waivers-scrolly
npx http-server -p 8000
```
Open http://localhost:8000

### Option 3: VS Code
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

---

## 🧪 Run Tests
```bash
cd ~/snap-waivers-scrolly
./test-visualization.sh
```

---

## 📱 View on Mobile

Find your local IP:
```bash
ipconfig getifaddr en0  # Mac
```

Visit from phone:
```
http://YOUR-IP:8000
```

---

## 🌐 Deploy to Web

### GitHub Pages
```bash
git init
git add .
git commit -m "Add SNAP waivers visualization"
git remote add origin YOUR-REPO-URL
git push -u origin main
```
Then enable GitHub Pages in repo settings.

### Netlify
1. Drag `snap-waivers-scrolly` folder to netlify.com
2. Done!

### Vercel
```bash
vercel deploy
```

---

## 🎯 What to Try

1. **Scroll** through the narrative sections
2. **Click** on states to see detailed waiver info
3. **Resize** browser to test responsive design
4. **Press Escape** to close modal
5. **Check mobile view** on your phone

---

## 📁 Project Structure

```
snap-waivers-scrolly/
├── index.html           # Main page
├── data/
│   └── waivers.json    # 18 states data
├── js/
│   ├── map.js          # D3 map setup
│   ├── animations.js   # Scroll animations
│   ├── interactions.js # Click handlers
│   └── scroll-controller.js
├── css/
│   └── styles.css      # All styling
└── README.md           # Full documentation
```

---

## 🐛 Troubleshooting

**Nothing shows up?**
- Check browser console for errors
- Ensure server is running on port 8000
- Verify all files are present

**Map doesn't render?**
- Check internet connection (map data loads from CDN)
- Open browser DevTools → Network tab
- Look for failed requests

**Animations don't work?**
- Try scrolling slower/faster
- Check if Scrollama loaded (see browser console)
- Test in Chrome/Firefox (best compatibility)

---

## 📚 Documentation

- **Full docs:** `README.md`
- **Project summary:** `PROJECT-SUMMARY.md`
- **This guide:** `QUICKSTART.md`

---

## ✅ Verified Working On

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Mobile browsers ✅

---

**Questions?** Check `README.md` or `PROJECT-SUMMARY.md`

**Data source:** USDA Food and Nutrition Service
**Created with:** Claude Code
