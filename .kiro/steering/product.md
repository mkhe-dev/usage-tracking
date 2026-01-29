# Product Overview

This is a **Usage Tracking** application that displays an AI Bootcamp tokens leaderboard. The system tracks and visualizes token consumption across different teams participating in an AI bootcamp program.

## Core Features
- Real-time leaderboard showing team token usage
- Medal system (🥇🥈🥉) for top 3 performing teams
- Team search and filtering capabilities
- Automatic team renaming (Team 1, Team 2, etc.) based on ranking
- Configurable time period for usage tracking via `PAST_USAGE_DAYS` environment variable

## Architecture
- **Backend**: FastAPI service that aggregates token usage data from LiteLLM API
- **Frontend**: Vue.js SPA displaying an interactive leaderboard
- **Data Source**: External LiteLLM API for token usage metrics