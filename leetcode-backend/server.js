import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/hint", async (req, res) => {
  const { problem, level } = req.body;

  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Give me hint level ${level} for solving the LeetCode problem: ${problem}. Don't give full solution.`
      })
    }
  );

  const data = await geminiResponse.json();
  res.json({ hint: data.candidates[0].output });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
