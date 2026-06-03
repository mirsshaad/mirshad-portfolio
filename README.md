# 💻 MVP OS — Interactive Developer Portfolio

Welcome to **MVP OS** (Mirshad V P's Operating System), an interactive, premium portfolio website designed as a simulated macOS-style desktop operating system environment. 

This project goes beyond a traditional static webpage by offering users a draggable, layered window interface, custom system animations, simulated applications, live widgets, and custom settings.

---

## 🚀 Key Highlights & Features

*   **🔊 Synthetic Startup sequence**: Features a custom Web Audio API-synthesized C-Major-9 chord startup chime upon boot (no external audio files required).
*   **🫧 Glassmorphic & Refraction Effects**: Integrates interactive glassmorphism with WebGL-style custom SVG turbulent displacement filters on the MenuBar, Dock, and Weather widgets.
*   **📂 Draggable, Focusable Window Layers**: Utilizes Zustand for lightweight, responsive window state management (handling drag positions, z-indexes, minimization, and maximization).
*   **🖥️ Custom Application Suite**:
    *   **About Me**: Displays centered circular avatar, typed role animation, and educational history (Lovely Professional University).
    *   **Resume**: A responsive professional timeline with an instant PDF download option.
    *   **Finder-Style Projects Explorer**: Details five full case studies with tech stack identifiers.
    *   **Interactive Skills Dashboard**: Visualizes technical competencies alongside a custom SVG spider radar chart.
    *   **AI Trading Bot Simulator**: Demonstrates live BTC/USDT price trackers, LSTM network topology, and mock console logs.
    *   **Cloud Architecture Portals (AWS / Azure)**: Showcases interactive network diagram layouts (VPCs, Subnets, Gateways), resource explorers, and VM costing/scaling calculators.
    *   **Interactive Terminal**: A custom command shell running utility routines like `matrix` falling rain and a confetti explosion for `sudo hire-mirshad`.
    *   **Game Center**: Hosts a custom HTML5 Canvas-based 2D "Code Runner" endless arcade game.
    *   **System Settings**: Controls system themes, audio toggles, and customized wallpaper switching.

---

## 🛠️ Technology Stack

*   **Core**: Next.js 15 (App Router), React 19, TypeScript
*   **Styling**: Tailwind CSS v4, Vanilla CSS
*   **State Management**: Zustand
*   **Animation**: Framer Motion
*   **Icons**: Lucide React, React Icons

---

## 📁 Directory Structure

```
├── public/                 # Static assets (images, fonts, resume.pdf)
├── src/
│   ├── app/                # Next.js App router entry pages and global CSS
│   ├── apps/               # Individual desktop applications (e.g. ResumeApp.tsx, TerminalApp.tsx)
│   ├── components/
│   │   └── os/             # Core OS components (MenuBar, Dock, Window, Desktop, BootScreen)
│   └── store/              # Zustand global workspace stores (os.store.ts)
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm/yarn installed.

### Installation
1. Clone this repository to your local workspace.
2. Navigate into the directory and install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Launch the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Building for Production
Create an optimized production bundle:
```bash
npm run build
```
To run the built bundle locally:
```bash
npm run start
```
