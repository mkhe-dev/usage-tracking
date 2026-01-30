<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :aria-label="currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
  >
    <!-- Sun icon for light theme -->
    <svg
      v-if="currentTheme === 'light'"
      class="theme-icon sun-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
    
    <!-- Moon icon for dark theme -->
    <svg
      v-else
      class="theme-icon moon-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'

// Use the theme composable for state management
const { currentTheme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid var(--color-border, #b0b3c6);
  border-radius: 8px;
  background: var(--color-secondary-bg, #23253a);
  color: var(--color-text-primary, #f3f3f3);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  min-width: 40px;
  min-height: 40px;
}

.theme-toggle:hover {
  background: var(--color-primary-bg, #242838);
  border-color: var(--color-accent, #ff9020);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px var(--color-shadow-light, rgba(0,0,0,0.18));
}

.theme-toggle:focus {
  border-color: var(--color-accent, #ff9020);
  box-shadow: 0 0 0 2px rgba(255, 144, 32, 0.2);
}

.theme-toggle:active {
  transform: translateY(0);
  box-shadow: 0 1px 4px var(--color-shadow-light, rgba(0,0,0,0.18));
}

.theme-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.sun-icon {
  color: var(--color-accent, #ff9020);
  animation: rotate 20s linear infinite;
}

.moon-icon {
  color: var(--color-text-secondary, #b0b3c6);
}

.theme-toggle:hover .theme-icon {
  transform: scale(1.1);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-icon {
    transition: none;
  }
  
  .sun-icon {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .theme-toggle {
    border-width: 2px;
  }
  
  .theme-toggle:focus {
    outline: 2px solid var(--color-accent, #ff9020);
    outline-offset: 2px;
  }
}
</style>