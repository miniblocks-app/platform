import express from 'express';
import crypto from 'crypto';

const router = express.Router();

// Store connected clients for Server-Sent Events
const clients = new Set<express.Response>();

// GitHub webhook secret - should be set in environment variables
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || 'your-webhook-secret';

// SSE endpoint for clients to connect
router.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Add this client to our set
  clients.add(res);

  // Remove client when they disconnect
  req.on('close', () => {
    clients.delete(res);
  });
});

// GitHub webhook endpoint

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
router.post('/github', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  
  if (!signature) {
    return res.status(401).send('No signature provided');
  }

  // Verify webhook signature
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = `sha256=${hmac.update(payload).digest('hex')}`;
  
  if (signature !== digest) {
    return res.status(401).send('Invalid signature');
  }

  // Check if this is a workflow run event
  if (req.headers['x-github-event'] === 'workflow_run') {
    const { action, workflow_run } = req.body;
    
    // Notify all connected clients
    const message = JSON.stringify({
      type: 'workflow_run',
      action,
      workflow_run
    });

    clients.forEach(client => {
      client.write(`data: ${message}\n\n`);
    });
  }

  res.status(200).send('Webhook received');
});

export default router; 