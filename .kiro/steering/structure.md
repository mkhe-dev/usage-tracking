# Project Structure

## Root Level
- **devbox.json**: Development environment configuration
- **.env/.env.local**: Environment variables
- **backend/**: Python FastAPI application
- **frontend/**: Vue.js application

## Backend Structure (`backend/`)
```
backend/
├── app.py                 # Application entry point
├── pyproject.toml         # Poetry configuration
├── src/
│   ├── api/
│   │   ├── server.py      # FastAPI app factory
│   │   └── models.py      # Pydantic response models
│   ├── client/
│   │   └── api_client.py  # External API client (LiteLLM)
│   ├── services/
│   │   └── tokens.py      # Business logic for token aggregation
│   └── utils/
│       └── common.py      # Shared utilities
└── tests/                 # Test files
```

## Frontend Structure (`frontend/`)
```
frontend/
├── index.html            # HTML entry point
├── package.json          # NPM configuration
├── vite.config.js        # Vite build configuration
├── playwright.config.js  # E2E test configuration
├── src/
│   ├── App.vue           # Root Vue component
│   ├── main.js           # Application entry point
│   ├── components/
│   │   └── Leaderboard.vue  # Main leaderboard component
│   └── helpers/
│       ├── helpers.js    # Utility functions
│       └── helpers.test.js  # Unit tests
└── e2e/                  # Playwright E2E tests
```

## Code Organization Patterns

### Backend
- **Layered Architecture**: API → Services → Client
- **Dependency Injection**: Services injected into API handlers
- **Error Handling**: HTTPException for API errors, RuntimeError for service errors
- **Models**: Pydantic models for request/response validation

### Frontend
- **Composition API**: Use `<script setup>` syntax
- **Component Structure**: Template → Script → Scoped Styles
- **State Management**: Reactive refs and computed properties
- **Utilities**: Pure functions in `helpers/` directory
- **Testing**: Co-located test files with `.test.js` suffix

## Naming Conventions
- **Backend**: snake_case for Python files and functions
- **Frontend**: camelCase for JavaScript, PascalCase for Vue components
- **Files**: kebab-case for multi-word filenames
- **Components**: PascalCase (e.g., `Leaderboard.vue`)

## Import Patterns
- **Backend**: Relative imports within `src/`, absolute for external packages
- **Frontend**: ES6 imports, relative paths for local modules