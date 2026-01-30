<template>
  <div class="container">
    <Leaderboard />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Leaderboard from './components/Leaderboard.vue'
import { useTheme } from './composables/useTheme.js'

// Initialize theme system
const { initializeTheme } = useTheme()

// Initialize theme before component mounting
onMounted(() => {
  initializeTheme()
})
</script>

<style>
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: var(--color-primary-bg);
  margin: 0;
  padding: 0;
  color: var(--color-text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.container {
  max-width: 800px;
  margin: 40px auto;
  background: var(--color-secondary-bg);
  border-radius: 16px;
  box-shadow: 0 4px 32px 0 var(--color-shadow), 0 1.5px 8px 0 var(--color-shadow-light);
  padding: 36px 28px 28px 28px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
</style>