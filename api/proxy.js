export default async function handler(req, res) {
  try {
    const TARGET = process.env.MAKE_WEBHOOK_URL;
    const SECRET = process.env.PROXY_SECRET;

    if (!TARGET) {
      return res.status(500).json({ error: "Missing MAKE_WEBHOOK_URL" });
    }

    // 🔐 Secret check
    const incomingSecret = req.headers["x-proxy-secret"];
    if (!incomingSecret || incomingSecret !== SECRET) {
      return res.status(401).send("Unauthorized");
    }

    const response = await fetch(TARGET, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body ?? {})
    });

    const text = await response.text();
    res.status(response.status).send(text);

  } catch (err) {
    res.status(500).json({ error: "proxy-error", details: String(err) });
  }
}
