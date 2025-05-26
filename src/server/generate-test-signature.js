import crypto from 'crypto';

const payload = {
  action: "completed",
  workflow_run: {
    id: 123456789,
    name: "Test Workflow",
    status: "completed",
    conclusion: "success",
    html_url: "https://github.com/your-repo/actions/runs/123456789"
  }
};

const secret = 'your-webhook-secret'; // Use the same secret as in your webhook.ts
const payloadString = JSON.stringify(payload);
const hmac = crypto.createHmac('sha256', secret);
const signature = `sha256=${hmac.update(payloadString).digest('hex')}`;

console.log('X-Hub-Signature-256:', signature);
console.log('\nPayload:', payloadString); 