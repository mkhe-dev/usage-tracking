<template>
  <div>
    <div class="headline">
      <div>
        <h1>Tokens Leaderboard 🏆</h1>
      </div>
      <div class="controls">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search teams (comma-separated)"
          class="search-input"
          autocomplete="off"
        />
        <button class="refresh-btn" @click="refresh" :disabled="loading">
          {{ loading ? 'Refreshing...' : 'Refresh' }}
        </button>
        <ThemeToggle />
        <span v-if="error" class="error">{{ error }}</span>
      </div>
    </div>
    <div class="subtitle">AI Bootcamp</div>

    <div class="leaderboard">
      <template v-for="team in filteredTeams" :key="team.name">
        <div class="team-name">
          {{ team.name }} <span v-if="team.medal">{{ team.medal }}</span>
        </div>
        <div class="bar-cell">
          <div class="bar-bg">
            <div
              class="bar-fg"
              :style="{ width: team.tokens > 0 ? Math.round((team.tokens / maxTokens) * 100) + '%' : '0%' }"
            ></div>
          </div>
        </div>
        <div class="token-count">{{ formatNumber(team.tokens) }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchLeaderboard, filterTeamsByName } from '../helpers/helpers'
import ThemeToggle from './ThemeToggle.vue'

// 1. Reactive state
const teams = ref([])      // List of teams
const loading = ref(false)
const error = ref('')
const searchTerm = ref('')

// Computed filtered teams
const filteredTeams = computed(() =>
  filterTeamsByName(teams.value, searchTerm.value)
)

// 2. Computed properties and helpers
const maxTokens = computed(() =>
  teams.value.length
    ? Math.max(...teams.value.map(t => t.tokens), 1) // Avoid 0
    : 1
)

function formatNumber(n) {
  return n.toLocaleString('de-DE')
}

// 3. Fetch leaderboard, set teams
async function refresh() {
  loading.value = true
  error.value = ''
  try {
     teams.value  = await fetchLeaderboard()
  } catch (err) {
    error.value = err.message || 'Failed to load'
  } finally {
    loading.value = false
  }
}

// 4. Initial Fetch when mounted
onMounted(refresh)

</script>

<style scoped>
.controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
.search-input {
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  font-size: 0.75rem;
  width: 200px;
  background: var(--color-secondary-bg);
  color: var(--color-text-primary);
  outline: none;
  transition: border 0.2s, background-color 0.3s ease, color 0.3s ease;
  margin-right: 4px;
}
.search-input:focus {
  border: 1.5px solid var(--color-accent);
}
.refresh-btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-accent);
  color: var(--color-secondary-bg);
  font-weight: 600;
  box-shadow: 0 1px 6px rgba(255,144,32,0.25);
  transition: background-color 0.3s ease, color 0.3s ease;
}
.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: var(--color-error);
  font-size: 0.9rem;
}

.leaderboard {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 1rem;
  align-items: center;
}
.team-name,
.token-count {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 12px 8px;
  font-size: 1.3rem;
  color: var(--color-text-primary);
  text-shadow: 0 1px 2px var(--color-text-shadow);
  transition: color 0.3s ease;
}
.token-count {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--color-text-primary);
  text-shadow: 0 1px 2px var(--color-text-shadow);
  transition: color 0.3s ease;
}
.bar-cell {
  padding: 8px 0;
}
.bar-bg {
  background: var(--color-bar-bg);
  height: 0.7em;
  width: 100%;
  border-radius: 4px;
  margin: 0 15px;
  position: relative;
  box-shadow: 0 1px 4px 0 var(--color-shadow-light);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.bar-fg {
  background: linear-gradient(90deg, var(--color-accent) 60%, #ffb347 100%);
  height: 100%;
  border-radius: 4px;
  transition: width 0.7s cubic-bezier(.4,2,.6,1);
  box-shadow: 0 1px 6px 0 rgba(255,144,32,0.18);
}
h1 {
  font-size: 2.2rem;
  color: var(--color-text-primary);
  letter-spacing: 0.01em;
  transition: color 0.3s ease;
}
.subtitle {
  color: var(--color-text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5em;
  transition: color 0.3s ease;
}
.headline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: -1.5em
}
@media (max-width: 600px) {
  .team-name, .token-count {
    font-size: 1rem;
    padding: 8px 2px;
  }
  .container { padding: 12px 2vw; }
  h1 { font-size: 1.3rem; }
  .controls {
    flex-wrap: wrap;
    gap: 8px;
  }
  .search-input {
    width: 150px;
    font-size: 0.7rem;
  }
  .headline {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
