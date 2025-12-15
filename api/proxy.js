export default function handler(req, res) {
  return res.status(200).json({
    headers: req.headers,
    secretReceived: req.headers["x-proxy-secret"] || null,
    envSecret: process.env.PROXY_SECRET || null
  });
}

