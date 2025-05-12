const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/get-token', async (req, res) => {
  const { username, password } = req.body;

  try {
    const url = `https://trashy.theworkpc.com/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    const response = await axios.get(url, {
      responseType: 'text' // 👈 ensures we treat even HTML as plain text
    });

    const body = response.data;

    if (body.includes("EAA")) {
      res.json({ success: true, token: body });
    } else {
      res.json({
        success: false,
        message: "No token returned. Possibly invalid credentials or server error.",
        raw: body.slice(0, 100) // just a preview
      });
    }

  } catch (error) {
    console.error("API error:", error.message || error);
    res.status(500).json({
      success: false,
      message: "Internal error or API unreachable.",
      error: error.message || "Unknown"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
