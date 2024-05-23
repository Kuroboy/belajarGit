const readlineSync = require('readline-sync');
console.clear();
class Kasir {
    constructor(nama) {
        this.nama = nama;
    }

    hitungTotal(namaBarang, harga, jumlah, callback) {
        const total = harga * jumlah;
        console.log(`Kasir: ${this.nama}`);
        console.log("-----------------------------");
        console.log(`Barang: ${namaBarang}`);
        console.log(`Total sebelum diskon: Rp${total}`);
        if (callback && typeof callback === 'function') {
            callback(total);
        } else {
            console.log(`Total tanpa diskon: Rp${total}`);
        }
    }

    terapkanDiskon(total, persentaseDiskon, callback) {
        const diskon = total * (persentaseDiskon / 100);
        const totalSetelahDiskon = total - diskon;
        console.log(`Diskon sebesar ${persentaseDiskon}%: Rp${diskon}`);
        console.log(`Total setelah diskon: Rp${totalSetelahDiskon}`);
        if (callback && typeof callback === 'function') {
            callback(totalSetelahDiskon);
        }
    }
}

const dataBarang = {
    'baju': 70000,
    'celana': 80000,
    'jaket': 150000
};
console.log("=============================");
console.log("=========PEMBAYARAN==========");
console.log("-----------------------------");
// Masukan Data
const namaKasir = readlineSync.question('Masukkan nama kasir: ');

let namaBarang = readlineSync.question('Masukkan nama barang: ');
while (!dataBarang[namaBarang]) {
    console.log('Nama barang tidak ditemukan. Silakan masukkan nama barang yang valid.');
    namaBarang = readlineSync.question('Masukkan nama barang: ');
}
const hargaBarang = dataBarang[namaBarang];
const jumlahBarang = readlineSync.questionInt('Masukkan jumlah barang: ');
console.log(" ");
const kasir = new Kasir(namaKasir);

// Check diskon
const diskon = (total) => {
    if (total > 100000 && total <= 200000) {
        kasir.terapkanDiskon(total, 10, (totalSetelahDiskon) => {
            console.log(`Pembayaran akhir: Rp${totalSetelahDiskon}`);
        });
    } else if (total > 200000) {
        kasir.terapkanDiskon(total, 20, (totalSetelahDiskon) => {
            console.log(`Pembayaran akhir: Rp${totalSetelahDiskon}`);
        });
    } else {
        kasir.terapkanDiskon(total, 0, (totalSetelahDiskon) => {
            console.log(`Pembayaran akhir: Rp${totalSetelahDiskon}`);
        });
    }
};

// Menghitung total
kasir.hitungTotal(namaBarang, hargaBarang, jumlahBarang, diskon);
