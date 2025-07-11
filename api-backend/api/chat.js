module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { input } = req.body || {};
  if (!input) {
    return res.status(400).json({ error: "Missing input" });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://kaavyar9705.github.io",
          "X-Title": "Kaavya Portfolio Chatbot",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input },
          ],
        }),
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Serverless function error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
