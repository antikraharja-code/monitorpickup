const key = "pickupData";
const tbody = document.getElementById("tbody");

function renderTable() {
  tbody.innerHTML = "";
  const data = JSON.parse(localStorage.getItem(key)) || [];

  data.forEach(d => {
    const r = tbody.insertRow();
    r.insertCell().textContent = d.tanggal;
    r.insertCell().textContent = d.kurir;
    r.insertCell().textContent = d.id;
    r.insertCell().textContent = d.pelanggan;
    r.insertCell().textContent = d.lokasi;
    r.insertCell().textContent = d.service;
    r.insertCell().textContent = d.statusAwal;
    r.insertCell().textContent = d.statusAkhir;
    r.insertCell().textContent = d.stamp;
  });
}

/* REALTIME LISTENER */
window.addEventListener("storage", (e) => {
  if (e.key === key) {
    renderTable();
  }
});

/* initial load */
renderTable();

/* fallback polling (anti delay browser cache) */
setInterval(renderTable, 1000);
