export default async function handler(req, res) {
  const TARGET = process.env.MAKE_WEBHOOK_URL;

  if (!TARGET) {
    return res.status(500).json({ error: "Missing MAKE_WEBHOOK_URL" });
  }

  const response = await fetch(TARGET, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body ?? {})
  });

  const text = await response.text();
  res.status(response.status).send(text);
}
