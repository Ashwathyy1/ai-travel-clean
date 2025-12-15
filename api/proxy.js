export default async function handler(req, res) {
  const SECRET = process.env.PROXY_SECRET;
  const TARGET = process.env.MAKE_WEBHOOK_URL;

  // Auth check
  const incomingSecret = req.headers["x-proxy-secret"];
  if (!incomingSecret || incomingSecret !== SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Safety check
  if (!TARGET) {
    return res.status(500).json({ error: "Missing MAKE_WEBHOOK_URL" });
  }

  // Forward request to Make
  const response = await fetch(TARGET, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body ?? {})
  });

  const text = await response.text();
  res.status(response.status).send(text);
}
