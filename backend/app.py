import uvicorn

from src.api.server import create_backend

if __name__ == "__main__":
    app = create_backend()
    uvicorn.run(app, port=9480, host="0.0.0.0", log_level="debug")
