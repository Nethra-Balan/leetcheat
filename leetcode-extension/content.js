
const btn = document.createElement("button");
btn.innerText = "💡 Show Hint";
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.zIndex = "1000";
btn.style.padding = "10px";
btn.style.background = "#facc15";
btn.style.borderRadius = "8px";
document.body.appendChild(btn);


let hintLevel = 0;

btn.addEventListener("click", async () => {
  hintLevel++;
  const response = await fetch("http://localhost:3000/hint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      problem: document.title,
      level: hintLevel
    })
  });

  const data = await response.json();
  alert("Hint " + hintLevel + ": " + data.hint);
});
