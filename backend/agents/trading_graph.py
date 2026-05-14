from langgraph.graph import StateGraph, END
from backend.agents.state import TradingState

def analyst_node(state: TradingState):
    ticker = state['ticker']
    report = f"Technical analysis for {ticker}: Strong bullish trend detected on 4h timeframe."
    log = f"Analyst: Completed technical analysis for {ticker}"
    return {
        "analysis_reports": [report],
        "logs": [log]
    }

def researcher_node(state: TradingState):
    ticker = state['ticker']
    report = f"Researcher: Balanced view for {ticker}. Bull case: high demand. Bear case: regulatory risk."
    log = f"Researcher: Completed debate analysis for {ticker}"
    return {
        "analysis_reports": [report],
        "logs": [log]
    }

workflow = StateGraph(TradingState)

workflow.add_node("analyst", analyst_node)
workflow.add_node("researcher", researcher_node)

workflow.set_entry_point("analyst")
workflow.add_edge("analyst", "researcher")
workflow.add_edge("researcher", END)

graph = workflow.compile()
