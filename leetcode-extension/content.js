const btn = document.createElement("button");
btn.innerText = "💡 Show Hint";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.zIndex = "1000";
btn.style.padding = "10px";
btn.style.background = "#facc15";
btn.style.borderRadius = "8px";
btn.style.border = "none";
btn.style.cursor = "pointer";
document.body.appendChild(btn);

const hintPanel = document.createElement("div");
hintPanel.style.position = "fixed";
hintPanel.style.bottom = "60px";
hintPanel.style.right = "20px";
hintPanel.style.width = "320px";
hintPanel.style.maxHeight = "250px";
hintPanel.style.overflowY = "auto";
hintPanel.style.background = "#ffffff";
hintPanel.style.border = "1px solid #ccc";
hintPanel.style.borderRadius = "8px";
hintPanel.style.padding = "10px";
hintPanel.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
hintPanel.style.zIndex = "1000";
hintPanel.style.display = "none";
document.body.appendChild(hintPanel);

const header = document.createElement("div");
header.style.display = "flex";
header.style.justifyContent = "space-between";
header.style.alignItems = "center";
header.style.marginBottom = "5px";

const title = document.createElement("span");
title.innerText = "Hints 💡";
title.style.fontWeight = "bold";
header.appendChild(title);

const closeBtn = document.createElement("button");
closeBtn.innerText = "✖";
closeBtn.style.border = "none";
closeBtn.style.background = "transparent";
closeBtn.style.cursor = "pointer";
closeBtn.style.fontSize = "14px";
header.appendChild(closeBtn);

hintPanel.appendChild(header);

closeBtn.addEventListener("click", () => {
  hintPanel.style.display = "none";
});

const hintContent = document.createElement("div");
hintPanel.appendChild(hintContent);

let hintLevel = 0;

btn.addEventListener("click", async () => {
  hintLevel++;
  hintPanel.style.display = "block";

  try {
    const response = await fetch("http://localhost:3000/hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problem: document.title,
        level: hintLevel
      })
    });

    const data = await response.json();
    const hintText = `Hint ${hintLevel}: ${data.hint}`;

    const p = document.createElement("p");
    p.innerText = hintText;
    p.style.margin = "5px 0";
    hintContent.appendChild(p);

    hintPanel.scrollTop = hintPanel.scrollHeight;

  } catch (err) {
    console.error("Error fetching hint:", err);
    const p = document.createElement("p");
    p.innerText = "Failed to fetch hint. Check backend.";
    p.style.color = "red";
    hintContent.appendChild(p);
  }
});
