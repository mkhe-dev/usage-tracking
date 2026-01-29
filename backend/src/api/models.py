from typing import List
from pydantic import BaseModel

class TeamOut(BaseModel):
    name: str
    tokens: int

class TeamsOut(BaseModel):
    teams: List[TeamOut]
