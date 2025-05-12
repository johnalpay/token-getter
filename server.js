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
    const response = await axios.get(url);

    if (response.data && response.data.includes("EAA")) {
      res.json({ success: true, token: response.data });
    } else {
      res.json({ success: false, message: "Invalid credentials or no token returned." });
    }
  } catch (error) {
    res.json({ success: false, message: "API error. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
