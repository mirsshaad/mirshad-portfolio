import { create } from 'zustand';

export interface WindowInstance {
  id: string;
  appId: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export type OSTheme = 'dark' | 'light';

export interface OSState {
  booted: boolean;
  activeAppId: string | null;
  windows: WindowInstance[];
  theme: OSTheme;
  wallpaper: string;
  soundOn: boolean;
  showSearch: boolean;
  showNotifications: boolean;
  bootSystem: () => void;
  shutdownSystem: () => void;
  openApp: (appId: string, title: string, options?: { width?: number; height?: number }) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  maximizeApp: (appId: string) => void;
  restoreApp: (appId: string) => void;
  focusApp: (appId: string) => void;
  setTheme: (theme: OSTheme) => void;
  setWallpaper: (wallpaper: string) => void;
  setSoundOn: (soundOn: boolean) => void;
  toggleSearch: () => void;
  toggleNotifications: () => void;
  updateWindowPosition: (appId: string, x: number, y: number) => void;
  updateWindowSize: (appId: string, width: number, height: number) => void;
}

export const useOSStore = create<OSState>((set, get) => {
  const getNextZIndex = (windows: WindowInstance[]) => {
    if (windows.length === 0) return 10;
    return Math.max(...windows.map((w) => w.zIndex)) + 1;
  };

  return {
    booted: false,
    activeAppId: null,
    windows: [],
    theme: 'dark',
    wallpaper: 'liquid-glass-bg',
    soundOn: true,
    showSearch: false,
    showNotifications: false,

    bootSystem: () => set({ booted: true }),
    shutdownSystem: () => set({ booted: false, windows: [], activeAppId: null }),

    openApp: (appId, title, options = {}) => {
      const { windows } = get();
      const existing = windows.find((w) => w.appId === appId);

      if (existing) {
        // App is already open, just focus and restore if minimized
        const nextZ = getNextZIndex(windows);
        set({
          activeAppId: appId,
          windows: windows.map((w) =>
            w.appId === appId
              ? { ...w, isMinimized: false, zIndex: nextZ }
              : w
          ),
        });
        return;
      }

      // Open new window
      const width = options.width || 800;
      const height = options.height || 550;
      
      // Center position calculation
      const x = typeof window !== 'undefined' ? (window.innerWidth - width) / 2 + (windows.length * 20) % 100 : 100;
      const y = typeof window !== 'undefined' ? (window.innerHeight - height) / 2 + (windows.length * 20) % 100 : 100;
      const nextZ = getNextZIndex(windows);

      const newWindow: WindowInstance = {
        id: appId + '-' + Date.now(),
        appId,
        title,
        isMinimized: false,
        isMaximized: false,
        x,
        y,
        width,
        height,
        zIndex: nextZ,
      };

      set({
        activeAppId: appId,
        windows: [...windows, newWindow],
      });
    },

    closeApp: (appId) => {
      const { windows, activeAppId } = get();
      const nextWindows = windows.filter((w) => w.appId !== appId);
      
      let nextActive: string | null = activeAppId;
      if (activeAppId === appId) {
        const remaining = nextWindows.filter((w) => !w.isMinimized);
        if (remaining.length > 0) {
          const topWindow = remaining.reduce((prev, current) => 
            prev.zIndex > current.zIndex ? prev : current
          );
          nextActive = topWindow.appId;
        } else {
          nextActive = null;
        }
      }

      set({
        windows: nextWindows,
        activeAppId: nextActive,
      });
    },

    minimizeApp: (appId) => {
      const { windows, activeAppId } = get();
      const updatedWindows = windows.map((w) =>
        w.appId === appId ? { ...w, isMinimized: true } : w
      );

      let nextActive: string | null = activeAppId;
      if (activeAppId === appId) {
        const remaining = updatedWindows.filter((w) => !w.isMinimized);
        if (remaining.length > 0) {
          const topWindow = remaining.reduce((prev, current) => 
            prev.zIndex > current.zIndex ? prev : current
          );
          nextActive = topWindow.appId;
        } else {
          nextActive = null;
        }
      }

      set({
        windows: updatedWindows,
        activeAppId: nextActive,
      });
    },

    maximizeApp: (appId) => {
      const { windows } = get();
      set({
        windows: windows.map((w) =>
          w.appId === appId ? { ...w, isMaximized: !w.isMaximized } : w
        ),
      });
    },

    restoreApp: (appId) => {
      const { windows } = get();
      const nextZ = getNextZIndex(windows);
      set({
        activeAppId: appId,
        windows: windows.map((w) =>
          w.appId === appId ? { ...w, isMinimized: false, zIndex: nextZ } : w
        ),
      });
    },

    focusApp: (appId) => {
      const { windows, activeAppId } = get();
      if (activeAppId === appId) return;
      
      const nextZ = getNextZIndex(windows);
      set({
        activeAppId: appId,
        windows: windows.map((w) =>
          w.appId === appId ? { ...w, zIndex: nextZ } : w
        ),
      });
    },

    setTheme: (theme) => set({ theme }),
    setWallpaper: (wallpaper) => set({ wallpaper }),
    setSoundOn: (soundOn) => set({ soundOn }),
    toggleSearch: () => set((state) => ({ showSearch: !state.showSearch })),
    toggleNotifications: () => set((state) => ({ showNotifications: !state.showNotifications })),

    updateWindowPosition: (appId, x, y) => {
      const { windows } = get();
      set({
        windows: windows.map((w) =>
          w.appId === appId ? { ...w, x, y } : w
        ),
      });
    },

    updateWindowSize: (appId, width, height) => {
      const { windows } = get();
      set({
        windows: windows.map((w) =>
          w.appId === appId ? { ...w, width, height } : w
        ),
      });
    },
  };
});
