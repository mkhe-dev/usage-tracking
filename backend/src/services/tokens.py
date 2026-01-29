import sys
from typing import List, Dict

class TokensService:
    """
    Service for aggregating and retrieving token usage data per team.

    Methods:
        get_total_tokens_per_team: Aggregate total tokens per team from API data.
    """

    def __init__(self, api_client):
        """<
        Initialize the TokensService.

        Parameters:
            api_client: An API client instance for fetching team data.
        """
        self.api_client = api_client
        self.teams: List[Dict] = []
        self.team_ids: List[str] = []
        self.team_id_to_name: Dict = {}
        self.total_tokens_dict: Dict = {}

    def fetch_teams(self):
        # Fetch teams
        try:
            self.teams = self.api_client.fetch_teams()
        except Exception as e:
            print(f"Error fetching teams: {e}")
            sys.exit(1)
        if len(self.teams) == 0:
            print("No teams found.")
            sys.exit(0)

        self.team_ids = [team.get("team_id") for team in self.teams]
        self.team_id_to_name = {team.get("team_id"): team.get("team_alias", team.get("team_id", "unknown")) for team in self.teams}

    @property
    def total_tokens(self) -> int:
        """
        Returns the sum of all token counts in the supplied dict.

        Returns:
            int: The total number of tokens.
        """
        return sum(self.total_tokens_dict["tokens"].values())

    def fetch_total_tokens_per_team(
        self,
        start_date: str,
        end_date: str
    ):
        """
        Aggregate total tokens per team using API data.

        Parameters:
            start_date (str): Start date in ISO format.
            end_date (str): End date in ISO format.

        Returns:
            Dict[str, int]: Mapping of team names (or IDs) to total token counts.

        Raises:
            RuntimeError: If fetching team token usage fails.
        """
        if len(self.team_ids) == 0:
            self.fetch_teams()
        try:
            data = self.api_client.fetch_team_daily_activity(self.team_ids, start_date, end_date)
        except RuntimeError as e:
            raise RuntimeError(f"Error fetching team token usage: {str(e).split(': ', 1)[1]}")

        self.total_tokens_dict = {
                    self.team_id_to_name.get(team_id, "None"): 0
                    for team_id in self.team_ids
                }

        for entry in data.get("results", []):
            entities = entry.get("breakdown", {}).get("entities", {})
            for id, (team_id, entity) in enumerate(entities.items()):
                total_tokens = entity.get("metrics", {}).get("total_tokens", 0)
                key = self.team_id_to_name.get(team_id, team_id)
                if key in self.total_tokens_dict:
                    self.total_tokens_dict[key] += total_tokens

        return self.total_tokens_dict
