import os
from fastapi import FastAPI, HTTPException
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from src.utils.common import get_api_key, get_base_url
from src.services.tokens import TokensService
from src.client.api_client import LiteLLMAPI
from src.services.tokens import TokensService
from src.api.models import TeamOut, TeamsOut

def create_backend():

    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            f"http://localhost:{os.environ.get('VITE_DEV_PORT')}",
        ]
    )

    load_dotenv()
    api_key = get_api_key()
    base_url = get_base_url()

    @app.get("/tokens", response_model=TeamsOut)
    def get_tokens() -> TeamsOut:
        """
        Returns the aggregate tokens per team between start_date and end_date.

        Response shape:
        {
        "teams": [
            {"name": "teamA", "tokens": 123},
            ...
        ]
        }
        """

        past_usage_days = int(os.environ.get('PAST_USAGE_DAYS'))
        end_date = datetime.now(timezone.utc)
        start_date = end_date - timedelta(days=past_usage_days)

        api_client = LiteLLMAPI(base_url=base_url, api_key=api_key)
        tokens_service = TokensService(api_client)

        try:
            tokens_service.fetch_total_tokens_per_team(start_date=start_date.strftime("%Y.%m.%d"), end_date=end_date.isoformat())
        except RuntimeError as e:
            raise HTTPException(status_code=502, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

        teams = [TeamOut(name=name, tokens=tokens) for name, tokens in tokens_service.total_tokens_dict.items()]

        return TeamsOut(teams=teams)

    return app
