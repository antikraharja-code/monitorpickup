const key = "pickupData";
const tbody = document.getElementById("tbody");
const rekapDiv = document.getElementById("rekap");
const filterKurir = document.getElementById("filterKurir");

function getData() {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function loadKurirFilter() {
  const data = getData();
  const kurirSet = [...new Set(data.map(d => d.kurir))];
  filterKurir.innerHTML = '<option value="">Semua Kurir</option>';
  kurirSet.forEach(k => {
    const o = document.createElement("option");
    o.value = k;
    o.textContent = k;
    filterKurir.appendChild(o);
  });
}

function renderTable() {
  const data = getData();
  tbody.innerHTML = "";
  rekapDiv.textContent = "";

  const fk = filterKurir.value;
  const ta = tglAwal.value;
  const tb = tglAkhir.value;

  const filtered = data.filter(d => {
    let ok = true;
    if (fk && d.kurir !== fk) ok = false;
    if (ta && new Date(d.tanggal) < new Date(ta)) ok = false;
    if (tb && new Date(d.tanggal) > new Date(tb)) ok = false;
    return ok;
  });

  filtered.forEach(d => {
    const r = tbody.insertRow();
    r.className = d.statusAkhir ? "status-selesai" : "status-pickup";
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

function rekapHarian() {
  const data = getData();
  const map = {};
  data.forEach(d => {
    map[d.tanggal] = (map[d.tanggal] || 0) + 1;
  });

  rekapDiv.innerHTML = "Rekap Harian:<br>";
  for (let t in map) {
    rekapDiv.innerHTML += `${t} : ${map[t]} pickup<br>`;
  }
}

function rekapBulanan() {
  const data = getData();
  const map = {};
  data.forEach(d => {
    const bln = d.tanggal.slice(3, 10);
    map[bln] = (map[bln] || 0) + 1;
  });

  rekapDiv.innerHTML = "Rekap Bulanan:<br>";
  for (let b in map) {
    rekapDiv.innerHTML += `${b} : ${map[b]} pickup<br>`;
  }
}

/* REALTIME */
window.addEventListener("storage", e => {
  if (e.key === key) {
    loadKurirFilter();
    renderTable();
  }
});

loadKurirFilter();
renderTable();
setInterval(renderTable, 1000);
