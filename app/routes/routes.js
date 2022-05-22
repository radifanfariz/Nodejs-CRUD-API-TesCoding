module.exports = (app) => {
    let router = require("express").Router();
    const barang = require("../controllers/barang.controller.js");
    const transaksi = require("../controllers/transaksi.controller.js");
    const barangDetail = require("../controllers/barang.detail.controller.js");
    const kolektif = require("../controllers/kolektif.tabel.controller.js");

    ///////Barang////////

    router.post("/barang", barang.insert);

    router.get("/barang",barang.getAll);

    router.get("/barang/search/nama",barang.getByNamaBarang);

    router.put("/barang/:barang_id",barang.updateById);

    router.delete("/barang/:barang_id", barang.deleteById);


    ////////Transaksi//////

    router.post("/transaksi", transaksi.insert);

    router.get("/transaksi",transaksi.getAll);

    router.get("/transaksi/search/tanggal",transaksi.getByTanggalTransaksi);

    router.get("/transaksi/search/tanggal-antara",transaksi.getByTanggalTransaksiBetween);

    router.put("/transaksi/:transaksi_id",transaksi.updateById);

    router.delete("/transaksi/:transaksi_id", transaksi.deleteById);

    
    ////////Barang Detail//////

    router.post("/barang_detail/:barang_id/:transaksi_id", barangDetail.insert);

    router.get("/barang_detail", barangDetail.getAll);

    router.put("/barang_detail/:barang_id/:transaksi_id", barangDetail.updateById);

    router.delete("/barang_detail/:barang_id/:transaksi_id", barangDetail.deleteById);

     ////////Kolektif Tabel//////

     router.get("/kolektif",kolektif.getAll);
 
     router.get("/kolektif/search/tanggal",kolektif.getByTanggalTransaksi);
 
     router.get("/kolektif/search/tanggal-antara",kolektif.getByTanggalTransaksiBetween);

     router.get("/kolektif/search/nama",kolektif.getByNamaBarang);

     router.get("/kolektif/urutkan/:sort_result",kolektif.getByAscDesc);
 


    app.use('/api/tescoding', router);
};

