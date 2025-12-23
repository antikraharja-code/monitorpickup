const key = "pickupData";
let customers = [];

function loadCustomers() {
  fetch("../data/customers.json")
    .then(res => res.json())
    .then(data => {
      customers = data;
      renderCustomers(customers);
    });
}

function renderCustomers(list) {
  const sel = document.getElementById("pelanggan");
  sel.innerHTML = "";
  list.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.nama;
    opt.textContent = c.nama;
    sel.appendChild(opt);
  });
}

function filterPelanggan() {
  const q = document.getElementById("searchPelanggan").value.toLowerCase();
  const filtered = customers.filter(c =>
    c.nama.toLowerCase().includes(q)
  );
  renderCustomers(filtered);
}

function generateID() {
  const awal = parseInt(idAwal.value);
  const akhir = parseInt(idAkhir.value);
  const sel = document.getElementById("idSelect");
  sel.innerHTML = "";
  for (let i = awal; i <= akhir; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    sel.appendChild(opt);
  }
}

function pickup() {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  data.push({
    tanggal: new Date().toLocaleDateString(),
    kurir: kurir.value,
    id: idSelect.value,
    pelanggan: pelanggan.value,
    lokasi: lokasi.value,
    service: service.value,
    statusAwal: "Pickup - " + new Date().toLocaleTimeString(),
    statusAkhir: "",
    stamp: ""
  });
  localStorage.setItem(key, JSON.stringify(data));
  alert("Pickup disimpan");
}

function selesai() {
  const data = JSON.parse(localStorage.getItem(key)) || [];
  const last = data[data.length - 1];
  if (!last) return;

  last.statusAkhir = "Selesai - " + new Date().toLocaleTimeString();
  last.stamp = "Clear";
  localStorage.setItem(key, JSON.stringify(data));

  lokasi.value = "";
  alert("Selesai");
}

document.addEventListener("DOMContentLoaded", () => {
  loadCustomers();
  document
    .getElementById("searchPelanggan")
    .addEventListener("keyup", filterPelanggan);
});
