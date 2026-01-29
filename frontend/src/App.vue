<template>
  <div class="container">
    <Leaderboard />
  </div>
</template>

<script setup>
import Leaderboard from './components/Leaderboard.vue'
</script>

<style>
:root {
  --color-biskaya: #242838;
}
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: var(--color-biskaya);
  margin: 0;
  padding: 0;
  color: #f3f3f3;
}
.container {
  max-width: 800px;
  margin: 40px auto;
  background: #23253a;
  border-radius: 16px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.35), 0 1.5px 8px 0 rgba(0,0,0,0.18);
  padding: 36px 28px 28px 28px;
}
</style>