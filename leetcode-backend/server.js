import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const apiKey = process.env.GEMINI_API_KEY;
app.post("/hint", async (req, res) => {
  const { problem, level } = req.body;

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  contents: [
    {
      parts: [
        {
          text: `Give me hint level ${level} for solving the LeetCode problem: ${problem}. Don't give full solution.`
        }
      ]
    }
  ]
})

      }
    );

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API returned status ${geminiResponse.status}`);
    }

    const text = await geminiResponse.text();
// console.log("Gemini API response:", JSON.stringify(text, null, 2));

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse Gemini response:", text);
      return res.json({ hint: "Error: Could not fetch hint from Gemini." });
    }

    const hint = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No hint available";
    res.json({ hint });

  } catch (err) {
    console.error("Error fetching hint:", err);
    res.status(500).json({ hint: "Server error while fetching hint." });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
