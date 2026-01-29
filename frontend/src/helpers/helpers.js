function applyMedals(sortedTeams) {
  const medalByIndex = ['🥇','🥈','🥉']
  return sortedTeams.map((t, idx) => ({
    ...t,
    medal: t.tokens > 0 && idx < 3 ? medalByIndex[idx] : undefined
  }))
}

async function fetchLeaderboard() {
  const backendURL = `${import.meta.env.VITE_BACKEND_URL}`;
  const url = `${backendURL}/tokens`;

  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const incomingTeams = Array.isArray(data.teams) ? data.teams : [];
  const sorted = [...incomingTeams].sort((a, b) => b.tokens - a.tokens);
  
  // Keep only teams with tokens > 0, then rename based on that order
  const filteredAndRenamed = sorted
    .filter((team) => (team?.tokens ?? 0) > 0)
    .map((team, idx) => ({
      ...team,
      name: `Team ${idx + 1}`,
    }));
  return applyMedals(filteredAndRenamed);
}

function filterTeamsByName(teams, searchTerm) {
  if (!searchTerm || !searchTerm.trim()) return teams;
  // Split by comma, trim, and filter out empty terms
  const terms = searchTerm
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(t => t.length > 0);
  if (terms.length === 0) return teams;
  return teams.filter(team =>
    terms.some(term => team.name.toLowerCase().includes(term))
  );
}

export { applyMedals, fetchLeaderboard, filterTeamsByName }
