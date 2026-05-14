# Design Spec: TradingAgents Mega Project
**Date:** 2026-05-14
**Status:** Draft for Review

## 1. Executive Summary
The TradingAgents Mega Project is a dual-purpose trading platform that integrates the multi-agent intelligence of the `TradingAgents` framework (LangGraph-based) with a high-end, cinematically animated frontend. The system serves two primary modes: a **Personal Trading Command Center** (Quant-Elite) for execution and a **High-Impact Showcase Dashboard** (Neural-Cyber) for visualizing AI reasoning.

## 2. User Personas & Modes
### 2.1 Mode A: The Command Center (Quant-Elite)
- **Goal:** Efficient trade execution, portfolio management, and real-time monitoring.
- **Vibe:** Surgical precision, high data density, professional "Hedge Fund" aesthetic.
- **Key Requirements:** Zero latency, glassmorphic UI, buttery-smooth transitions, high-density information.

### 2.2 Mode B: The Showcase Dashboard (Neural-Cyber)
- **Goal:** Visualize the "brain" of the multi-agent system.
- **Vibe:** Futuristic, "Neural-Core," cinematic AI experience.
- **Key Requirements:** Physics-based animations, glowing data-streams, sentiment-driven visual shifts, real-time agent "debate" visualization.

## 3. Technical Architecture

### 3.1 The Backend (The Brain)
- **Orchestration:** `TradingAgents` framework using **LangGraph**.
- **Agents:** 
    - Analyst Team (Technical, News, Sentiment, Fundamental).
    - Researcher Team (Bull vs Bear debate).
    - Trader Agent (Timing and magnitude).
    - Risk & Portfolio Management (Volatility, Liquidity, Approval).
- **API Layer:** **FastAPI** with **WebSockets**.
    - WebSockets are critical to stream "internal thoughts" and "debate steps" from LangGraph to the frontend in real-time.
- **Deployment:** Docker / Docker Compose.

### 3.2 The Frontend (The Face)
- **Core:** React 19 + Tailwind CSS.
- **Animation Engine:** **Framer Motion** (Physics-based layouts, spring transitions, staggered animations).
- **Visual Effects:** SVG Filters (glow, blur, gooey effects) for Neural-Cyber elements.
- **State Management:** **Zustand** for high-frequency updates (ticker prices, agent status).
- **Charting:** **TradingView Lightweight Charts**.

### 3.3 Data Flow Loop
`User Input (Ticker)` $\rightarrow$ `WebSocket Request` $\rightarrow$ `FastAPI` $\rightarrow$ `TradingAgentsGraph.propagate()` $\rightarrow$ `Stream Event (LLM Thought)` $\rightarrow$ `WebSocket Push` $\rightarrow$ `Framer Motion Animation Trigger` $\rightarrow$ `Final Decision/Execution`.

## 4. Page Structure & UI Design

### 4.1 The War Room (Command Center)
- **HUD:** Global P&L, Account Health, Agent Heartbeat.
- **Main Terminal:** TradingView chart with live order book and position manager.
- **Command Panel:** Ticker input, LLM selection, Agent Aggression tuning.
- **Aesthetic:** Deep navy/charcoal, glassmorphism, sharp typography.

### 4.2 The Agent Arena (Showcase)
- **Neural Map:** Interactive 2D canvas where agents are glowing nodes.
- **The Debate:** Animated data-packets firing between Bull and Bear nodes during the "Research" phase.
- **Sentiment Pendulum:** A neon-glow gauge swinging based on current agent bias.
- **Analysis Stream:** A "glitch-style" terminal log of LLM reasoning steps.
- **Aesthetic:** Obsidian background, neon accent colors (Dynamic: Green $\leftrightarrow$ Red).

### 4.3 The Strategy Lab
- **Pipeline Architect:** A node-based visual editor to modify the LangGraph structure.
- **Configuration:** LLM provider settings (OpenAI, Anthropic, Ollama).

### 4.4 The Decision Archive
- **Playback Engine:** A time-scrubber that re-animates the Agent Arena for historical trades.
- **Decision Log:** Detailed breakdown of the Portfolio Manager's approval/rejection logic.

## 5. Integration & Information Sources
- **Market Data:** Integration with real-time tickers via API.
- **Informative Sources:** Aggregator for news and sentiment feeds, feeding directly into the Analyst Agents.
- **Execution:** Integration with broker APIs (via TradingAgents' existing logic).

## 6. Success Criteria
- **Performance:** The UI must maintain 60fps even during complex Agent Arena animations.
- **Integrity:** The visual "debate" must accurately reflect the actual LangGraph state.
- **UX:** Seamless transition between "Tool" (Command Center) and "Experience" (Showcase).
