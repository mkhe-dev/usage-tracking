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
}
.search-input {
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #b0b3c6;
  font-size: 0.75rem;
  width: 200px;
  background: #23253a;
  color: #f3f3f3;
  outline: none;
  transition: border 0.2s;
  margin-right: 4px;
}
.search-input:focus {
  border: 1.5px solid #ff9020;
}
.refresh-btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: #ff9020;
  color: #23253a;
  font-weight: 600;
  box-shadow: 0 1px 6px rgba(255,144,32,0.25);
}
.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.error {
  color: #ff7a7a;
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
  color: #f3f3f3;
  text-shadow: 0 1px 2px #181a28;
}
.token-count {
  text-align: right;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: #f3f3f3;
  text-shadow: 0 1px 2px #181a28;
}
.bar-cell {
  padding: 8px 0;
}
.bar-bg {
  background: rgba(99, 193, 198, 0.13);
  height: 0.7em;
  width: 100%;
  border-radius: 4px;
  margin: 0 15px;
  position: relative;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.18);
}
.bar-fg {
  background: linear-gradient(90deg, #FF9020 60%, #ffb347 100%);
  height: 100%;
  border-radius: 4px;
  transition: width 0.7s cubic-bezier(.4,2,.6,1);
  box-shadow: 0 1px 6px 0 rgba(255,144,32,0.18);
}
h1 {
  font-size: 2.2rem;
  color: #fff;
  letter-spacing: 0.01em;
}
.subtitle {
  color: #b0b3c6;
  font-size: 1rem;
  margin-bottom: 1.5em;
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
}
</style>
