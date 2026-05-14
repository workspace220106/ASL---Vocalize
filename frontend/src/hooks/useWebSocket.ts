import { useEffect, useCallback, useRef } from 'react';
import { useStore } from '../store/useStore';

export const useWebSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const { updateAgentStatus, addLog, updateSentiment } = useStore();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/agents');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected to TradingAgents backend');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket received data:', data);

        if (data.type === 'agent_thought') {
          const { agent_id, status, thought, sentiment } = data.payload;

          // Update agent status
          updateAgentStatus(agent_id, status);

          // Add thought to logs
          addLog(`[${agent_id}] ${thought}`);

          // Update global sentiment if provided
          if (sentiment !== undefined) {
            updateSentiment(sentiment);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [updateAgentStatus, addLog, updateSentiment]);

  const sendTicker = useCallback((ticker: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        type: 'request_analysis',
        payload: { ticker }
      });
      socketRef.current.send(message);
      console.log(`Requested analysis for ticker: ${ticker}`);
    } else {
      console.error('WebSocket is not open. Cannot send ticker request.');
    }
  }, []);

  return { sendTicker };
};
