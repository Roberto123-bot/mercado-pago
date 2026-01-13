const API_URL = "https://mercado-pago-kl66.onrender.com";

const statusEl = document.getElementById("status");
const qrDiv = document.getElementById("qr");
const btn = document.getElementById("btnPix");

btn.onclick = async () => {
  const res = await fetch(`${API_URL}/pix`, { method: "POST" });
  const data = await res.json();

  qrDiv.innerHTML = `<img src="data:image/png;base64,${data.qr_code_base64}" />`;
};

setInterval(async () => {
  const res = await fetch(`${API_URL}/user`);
  const user = await res.json();
  statusEl.textContent = user.plan;
}, 3000);
