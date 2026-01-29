# Technology Stack

## Development Environment
- **Devbox**: Used for reproducible development environments
- **Python**: 3.13+ (backend)
- **Node.js**: v22 (frontend)
- **Poetry**: Python dependency management

## Backend Stack
- **Framework**: FastAPI with Uvicorn ASGI server
- **Dependencies**: 
  - Pydantic for data validation
  - python-dotenv for environment variables
  - requests for HTTP client operations
  - CORS middleware enabled
- **Testing**: pytest with httpx for async testing
- **Port**: 9480 (configurable)

## Frontend Stack
- **Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Styling**: Scoped CSS with CSS custom properties

## Common Commands

### Setup
```bash
# Install all dependencies
devbox run install_backend
devbox run install_frontend
```

### Development
```bash
# Start backend (port 9480)
devbox run run_backend

# Start frontend dev server
devbox run run_frontend
```

### Testing
```bash
# Frontend unit tests
cd frontend && npm run test

# Frontend E2E tests
cd frontend && npm run e2e

# Backend tests
cd backend && poetry run pytest
```

### Build
```bash
# Frontend production build
cd frontend && npm run build
```

## Environment Variables
- `PAST_USAGE_DAYS`: Number of days to look back for usage data
- `VITE_BACKEND_URL`: Backend API URL for frontend
- `VITE_DEV_PORT`: Frontend development server port
- API credentials for LiteLLM integration