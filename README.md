```
 ██████╗  █████╗ ███████╗██╗  ██╗
 ██╔══██╗██╔══██╗██╔════╝██║  ██║
 ██║  ██║███████║███████╗███████║
 ██║  ██║██╔══██║╚════██║██╔══██║
 ██████╔╝██║  ██║███████║██║  ██║
 ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
         Operations Dashboard
```

A logistics operations dashboard built with React. Track shipments, monitor fleet status, and manage exceptions — all in a single-file, zero-build app.

---

## Screens

```
┌─────────────────────────────────────────────────────────────┐
│  D Dash          Operations  /  Overview                    │
│ ─────────────  ┌──────────────────────────────────────────┐ │
│  Operations    │  KPI Cards: On-time · Delayed · In transit│ │
│  · Overview    │  ─────────────────────────────────────── │ │
│  · Status board│  Bubble chart    │  SLA donut             │ │
│  · Fleet       │  (stalled stages)│  71% on time           │ │
│  · Warehouses  │                  │                        │ │
│  · Lanes       │  ─────────────────────────────────────── │ │
│  · Exceptions  │  Top lanes (bar chart)  │  Activity feed  │ │
│                └──────────────────────────────────────────┘ │
│  Account                                                     │
│  · Carriers    ← Tweaks panel (theme / density / accent) →  │
│  · Reports                                                   │
│  · Settings                                                  │
└─────────────────────────────────────────────────────────────┘
```

| Screen | Description |
|---|---|
| **Splash** | Animated ribbon intro, auto-advances to Overview |
| **Overview** | KPI tiles, bubble / donut / bar charts, activity feed |
| **Status board** | Live-filterable shipment table driven by CSV datasets |

---

## Features

- **Zero build** — single `index.html` loads React + Recharts from CDN; open directly in a browser
- **CSV datasets** — swap between Shipments, Fleet, and Exceptions sample data from the tweaks panel
- **Themeable** — light / dark mode, compact / regular / comfy density, five accent colors (Iris, Mint, Peach, Sky, Rose)
- **Collapsible sidebar** — toggle from the topbar or the tweaks panel
- **Exception tracker** — severity-coded exception rows with owner and status

---

## Getting started

```bash
# Clone
git clone https://github.com/autonomousq/dribble.git
cd dribble

# Open — no install step needed
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

> Requires a modern browser (Chrome 110+, Firefox 115+, Safari 16+).  
> All dependencies are loaded from CDN; an internet connection is needed on first open.

---

## File layout

```
dribble/
├── index.html          # Entry point — styles, CDN deps, mounts React
├── app.jsx             # App shell: sidebar, topbar, screen router, tweaks
├── screens.jsx         # Splash, HomeScreen, StatusScreen
├── components.jsx      # Shared UI: KPI cards, charts, table, icons
├── data.jsx            # Sample CSV datasets + chart seed data
├── tweaks-panel.jsx    # Floating tweaks drawer (theme, density, accent)
├── uploads/            # Design reference screenshots (D1–D8)
└── screens/            # App screenshot captures
```

---

## Datasets

Three sample datasets ship with the app and are selectable from the tweaks panel:

| Key | Name | Rows |
|---|---|---|
| `shipments` | Shipments — last 7 days | 20 |
| `fleet` | Fleet status | 12 |
| `exceptions` | Open exceptions | 10 |

---

## Theming

```
Accent colors     Mode          Density
─────────────     ─────         ──────────────
● Iris (default)  ○ Light       ○ Compact
● Mint            ● Dark        ● Regular
● Peach                         ○ Comfy
● Sky
● Rose
```

All theme tokens are CSS custom properties on `:root`; swap them at runtime via `data-theme` and `data-density` attributes.

---

## License

MIT
