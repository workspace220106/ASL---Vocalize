from typing import TypedDict, List, Annotated
import operator

class TradingState(TypedDict):
    ticker: str
    analysis_reports: Annotated[List[str], operator.add]
    sentiment: float
    decision: str
    logs: Annotated[List[str], operator.add]
