import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface WorkflowRunEvent {
  type: 'workflow_run';
  action: string;
  workflow_run: {
    id: number;
    name: string;
    status: string;
    conclusion: string;
    html_url: string;
  };
}

export function useWebhookEvents() {
  const [event, setEvent] = useState<WorkflowRunEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('Connecting to SSE...');
    const eventSource = new EventSource(`${API_URL}/api/login`);

    eventSource.onopen = () => {
      console.log('SSE connection opened');
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received SSE message:', data);
        
        if (data.type === 'connected') {
          setIsConnected(true);
        } else if (data.type === 'workflow_run') {
          setEvent(data);
        }
      } catch (err) {
        console.error('Failed to parse event data:', err);
        setError('Failed to parse event data');
      }
    };

    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      setError('Failed to connect to event stream');
      setIsConnected(false);
      eventSource.close();
    };

    return () => {
      console.log('Cleaning up SSE connection');
      eventSource.close();
    };
  }, []);

  return { event, error, isConnected };
} 