const key = "pickupData";

function loadCustomers() {
  fetch("../data/customers.json")
    .then(res => res.json())
    .then(data => {
      const sel = document.getElementById("pelanggan");
      data.forEach(n => {
        let o = document.createElement("option");
        o.text = n;
        sel.add(o);
      });
    });
}

function generateID() {
  const awal = parseInt(idAwal.value);
  const akhir = parseInt(idAkhir.value);
  const sel = document.getElementById("idSelect");
  sel.innerHTML = "";
  for (let i = awal; i <= akhir; i++) {
    let o = document.createElement("option");
    o.text = i;
    sel.add(o);
  }
}

function pickup() {
  let data = JSON.parse(localStorage.getItem(key)) || [];
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
  let data = JSON.parse(localStorage.getItem(key)) || [];
  let last = data[data.length - 1];
  last.statusAkhir = "Selesai - " + new Date().toLocaleTimeString();
  last.stamp = "Clear";
  localStorage.setItem(key, JSON.stringify(data));

  lokasi.value = "";
  alert("Selesai");
}

loadCustomers();
