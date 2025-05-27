import { useEffect, useState, useRef } from 'react';

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
  const eventSourceRef = useRef<EventSource | null>(null);
  const heartbeatIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    console.log('Connecting to SSE at:', `${API_URL}/api/events`);    
    // Function to create a new EventSource connection
    const createEventSource = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource(`${API_URL}/api/events`);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE connection opened successfully');
        setError(null);
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received SSE message:', data);
          
          if (data.type === 'connected') {
            console.log('Received connection confirmation');
            setIsConnected(true);
          } else if (data.type === 'workflow_run') {
            console.log('Received workflow run event:', {
              action: data.action,
              status: data.workflow_run.status,
              conclusion: data.workflow_run.conclusion
            });
            const workflowEvent: WorkflowRunEvent = {
              type: 'workflow_run',
              action: data.action,
              workflow_run: {
                id: data.workflow_run.id,
                name: data.workflow_run.name,
                status: data.workflow_run.status,
                conclusion: data.workflow_run.conclusion,
                html_url: data.workflow_run.html_url
              }
            };
            setEvent(workflowEvent);
          }
        } catch (err) {
          console.error('Failed to parse event data:', err);
          setError('Failed to parse event data');
        }
      };

      eventSource.onerror = (err) => {
        console.error('EventSource error:', err);
        console.error('EventSource readyState:', eventSource.readyState);
        setError('Failed to connect to event stream');
        setIsConnected(false);
        eventSource.close();
        
        // Attempt to reconnect after a short delay
        setTimeout(() => {
          createEventSource();
        }, 2000);
      };
    };

    // Initial connection
    createEventSource();

    // Set up heartbeat interval
    heartbeatIntervalRef.current = window.setInterval(() => {
      if (eventSourceRef.current?.readyState === EventSource.OPEN) {
        console.log('Sending heartbeat...');
        fetch(`${API_URL}/api/heartbeat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ timestamp: Date.now() })
        }).catch(err => {
          console.error('Heartbeat failed:', err);
        });
      }
    }, 60000);

    return () => {
      console.log('Cleaning up SSE connection');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, []);

  return { event, error, isConnected };
} 