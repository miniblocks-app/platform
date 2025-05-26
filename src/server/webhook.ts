import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// Store connected clients for Server-Sent Events
const clients = new Set<express.Response>();

// GitHub webhook secret - should be set in environment variables
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'your-webhook-secret';

// SSE endpoint for clients to connect
router.get('/events', (req, res) => {
  console.log('New client connected to SSE');
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send initial connection message as JSON
  const connectMessage = JSON.stringify({ type: 'connected' });
  console.log('Sending connection message:', connectMessage);
  res.write(`data: ${connectMessage}\n\n`);

  // Add this client to our set
  clients.add(res);
  console.log(`Total connected clients: ${clients.size}`);

  // Remove client when they disconnect
  req.on('close', () => {
    console.log('Client disconnected from SSE');
    clients.delete(res);
    console.log(`Remaining clients: ${clients.size}`);
  });
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post('/github', (req, res) => {
  console.log('Received webhook request');
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  
  if (!signature) {
    console.log('No signature provided');
    return res.status(401).send('No signature provided');
  }

  // Verify webhook signature
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;
  
  if (signature !== digest) {
    console.log('Invalid signature');
    return res.status(401).send('Invalid signature');
  }

  // Check if this is a workflow run event
  if (req.headers['x-github-event'] === 'workflow_run') {
    console.log('Processing workflow run event:', {
      action: req.body.action,
      status: req.body.workflow_run?.status,
      conclusion: req.body.workflow_run?.conclusion
    });
    
    // Notify all connected clients
    const message = JSON.stringify({
      type: 'workflow_run',
      action: req.body.action,
      workflow_run: req.body.workflow_run
    });

    console.log(`Broadcasting to ${clients.size} clients:`, message);
    clients.forEach(client => {
      client.write(`data: ${message}\n\n`);
    });
  }

  res.status(200).send('Webhook received');
});

export default router; 