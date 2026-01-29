import { ref, watch } from 'vue'

// Theme configuration with light and dark color palettes
const themeConfig = {
  dark: {
    '--color-primary-bg': '#242838',
    '--color-secondary-bg': '#23253a',
    '--color-text-primary': '#f3f3f3',
    '--color-text-secondary': '#b0b3c6',
    '--color-accent': '#ff9020',
    '--color-border': '#b0b3c6',
    '--color-shadow': 'rgba(0,0,0,0.35)',
    '--color-shadow-light': 'rgba(0,0,0,0.18)',
    '--color-bar-bg': 'rgba(99, 193, 198, 0.13)',
    '--color-error': '#ff7a7a',
    '--color-text-shadow': '#181a28'
  },
  light: {
    '--color-primary-bg': '#f8f9fa',
    '--color-secondary-bg': '#ffffff',
    '--color-text-primary': '#2c3e50',
    '--color-text-secondary': '#6c757d',
    '--color-accent': '#ff9020',
    '--color-border': '#dee2e6',
    '--color-shadow': 'rgba(0,0,0,0.1)',
    '--color-shadow-light': 'rgba(0,0,0,0.05)',
    '--color-bar-bg': 'rgba(255, 144, 32, 0.1)',
    '--color-error': '#dc3545',
    '--color-text-shadow': 'rgba(255,255,255,0.8)'
  }
}

// Reactive theme state
const currentTheme = ref('dark')

// Apply theme colors to CSS custom properties
function applyTheme(theme) {
  const colors = themeConfig[theme]
  if (!colors) {
    console.warn(`Theme "${theme}" not found, falling back to dark theme`)
    theme = 'dark'
  }
  
  const root = document.documentElement
  Object.entries(themeConfig[theme]).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}

// Initialize theme from localStorage or default to dark
function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && themeConfig[savedTheme]) {
      currentTheme.value = savedTheme
    } else {
      currentTheme.value = 'dark'
    }
  } catch (error) {
    console.warn('Failed to load theme from localStorage:', error)
    currentTheme.value = 'dark'
  }
  
  applyTheme(currentTheme.value)
}

// Toggle between light and dark themes
function toggleTheme() {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
}

// Watch for theme changes and persist to localStorage
watch(currentTheme, (newTheme) => {
  try {
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  } catch (error) {
    console.warn('Failed to save theme to localStorage:', error)
  }
}, { immediate: false })

// Composable interface
export function useTheme() {
  return {
    currentTheme,
    toggleTheme,
    initializeTheme
  }
}