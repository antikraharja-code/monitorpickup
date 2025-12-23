const data = JSON.parse(localStorage.getItem("pickupData")) || [];
const tb = document.getElementById("tbody");

data.forEach(d => {
  let r = tb.insertRow();
  r.insertCell().innerText = d.tanggal;
  r.insertCell().innerText = d.kurir;
  r.insertCell().innerText = d.id;
  r.insertCell().innerText = d.pelanggan;
  r.insertCell().innerText = d.lokasi;
  r.insertCell().innerText = d.service;
  r.insertCell().innerText = d.statusAwal;
  r.insertCell().innerText = d.statusAkhir;
  r.insertCell().innerText = d.stamp;
});
