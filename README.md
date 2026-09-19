# LoopLive - Circular Timeline & Pomodoro App

A beautiful Progressive Web App that visualizes your daily schedule as a circular timeline with integrated Pomodoro timers.

## Features

- 🕐 **Circular 24-hour timeline** with live time tracking
- ⏱️ **Dual Pomodoro timers** (Focus 25min & Break 5min)
- 🎨 **Color-coded task management** with customizable schedule
- 📱 **Progressive Web App** - Install on any device
- 💾 **Offline support** with automatic data persistence
- 🔀 **Two editable presets**, each with its own tasks; turn one on to show it on the dashboard
- ☁️ **Google Drive Sync** (on/off switch in the menu) so presets survive a reinstall
- ⚡ **Zero dependencies** - Pure HTML/CSS/JavaScript

## Quick Deploy to Netlify

### Option 1: Netlify Drop (Fastest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire folder (or just `index.html`)
3. Your app is live! 🎉

### Option 2: GitHub + Netlify
1. Fork or clone this repository
2. Connect to Netlify
3. Deploy settings:
   - **Build Command:** (leave empty)
   - **Publish Directory:** `.` (root)
4. Deploy!

### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## Google Drive backup setup (one time)

Presets are always saved on the device. To also back them up to your own Google Drive:

1. In [Google Cloud Console](https://console.cloud.google.com/) create a project and enable the **Google Drive API**.
2. **OAuth consent screen:** add the scope `.../auth/drive.appdata`, then set the publishing status to **In production** (in "Testing" mode Google signs you out every 7 days).
3. **Credentials → Create credentials → OAuth client ID → Web application.** Under *Authorized JavaScript origins* add your Netlify URL (e.g. `https://your-app.netlify.app`) and `http://localhost:8000` for local testing.
4. Copy the client ID into `GOOGLE_CLIENT_ID` near the top of the Drive section in `index.html`, commit, and push.
5. In the app: open the menu and switch **Google Drive Sync** on.

Only a private, app-only folder in your Drive is used (`drive.appdata`); the app cannot see your other files.
After reinstalling, open the menu and switch **Google Drive Sync** on once to restore your presets.

## Local Development

Simply open `index.html` in your browser. That's it!

For a better development experience with live reload:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Installation as PWA

Once deployed to HTTPS (Netlify does this automatically):

**Android (Chrome):**
1. Visit your deployed URL
2. Tap the "Install" button in the address bar
3. Or use Menu → "Add to Home screen"

**iOS (Safari):**
1. Visit your deployed URL
2. Tap the Share button
3. Select "Add to Home Screen"

**Desktop (Chrome/Edge):**
1. Visit your deployed URL
2. Click the install icon in the address bar
3. Or use Menu → "Install LoopLive"

## Usage

### Circular Timeline
- View your entire day at a glance
- Tasks are color-coded around the circle
- Red pulsing dot shows current time
- Center displays active task and remaining time in HH:MM:SS

### Pomodoro Timers
- **Focus Timer (Left):** 25-minute work sessions
- **Break Timer (Right):** 5-minute breaks
- Each timer has Play/Pause and Reset buttons
- Automatic cycle counting
- Only one timer runs at a time

### Menu
- **Dashboard:** today's day and date (mm/dd/yyyy), the circular timeline and the two timers. With no preset on, the loop is empty and says "No active task".
- **Presets:** Preset 1 and Preset 2 side by side (stacked on a phone). Each has its own editable tasks (name, start, end, colour), a delete button per task, an "Add new task" form, and an On/Off switch. Only one preset can be on at a time; turn the active one off to show none.
- **Google Drive Sync:** an On/Off switch (this is the only place it is controlled). On = presets are backed up to your Drive and restored after a reinstall.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Tailwind CSS via CDN
- **JavaScript** - Vanilla ES6+
- **PWA** - Service Worker + Manifest
- **Storage** - LocalStorage for persistence

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Samsung Internet 14+

## File Structure

```
LoopLive/
├── index.html               # Main app file (self-contained)
├── manifest.webmanifest     # PWA manifest (name, colours, icons)
├── sw.js                    # Service worker (offline support)
├── *.png / favicon.ico      # Logo and icons for every device
├── netlify.toml.txt         # Netlify configuration (rename to netlify.toml to activate)
├── _redirects               # Netlify routing rules
└── README.md                # This file
```

## Configuration

No configuration needed! The app works out of the box.

Everything is managed from the in-app menu (Dashboard, Presets, Google Drive Sync).

## Performance

- ⚡ First Contentful Paint: <1s
- ⚡ Time to Interactive: <1.5s
- 💯 Lighthouse PWA Score: 100/100
- 📦 Total Size: ~45KB (uncompressed)

## Privacy

- 🔒 All data stored locally in browser
- 🔒 No analytics or tracking
- 🔒 No external API calls (except Tailwind CDN)
- 🔒 Works completely offline after first visit

## Author

**Email:** dyndec14@gmail.com

## Version

1.0.0

## License

Free to use and modify.

## Troubleshooting

**PWA not installing:**
- Ensure you're accessing via HTTPS (Netlify provides this)
- Check that service worker registered successfully (see browser console)

**Tasks not saving:**
- Check browser LocalStorage is enabled
- Try clearing browser cache and reloading

**Timers not working:**
- Ensure JavaScript is enabled
- Check browser console for errors

**Circular timeline not displaying:**
- Ensure internet connection (for Tailwind CDN)
- Try hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

## Support

For issues or questions, contact: dyndec14@gmail.com

---

Made with ❤️ for productivity enthusiasts
