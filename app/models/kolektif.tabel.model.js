const sql = require("./db.js");


const KolektifTabel = function(){};

KolektifTabel.getAll = result => {
    sql.query(`SELECT barang.barang_id,barang.nama_barang, 
    barang.jenis_barang, barang_detail.stok, transaksi.jumlah_terjual, 
    transaksi.tanggal_transaksi, transaksi.transaksi_id FROM transaksi 
    INNER JOIN barang_detail ON transaksi.transaksi_id = barang_detail.transaksi_id 
    INNER JOIN barang ON barang.barang_id = barang_detail.barang_id`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("data barang: ", res);
        result(null, res);
    });
};

KolektifTabel.getByNamaBarang = (namaBarang,result) => {
    sql.query(`SELECT barang.barang_id,barang.nama_barang, 
    barang.jenis_barang, barang_detail.stok, transaksi.jumlah_terjual, 
    transaksi.tanggal_transaksi, transaksi.transaksi_id FROM transaksi 
    INNER JOIN barang_detail ON transaksi.transaksi_id = barang_detail.transaksi_id 
    INNER JOIN barang ON barang.barang_id = barang_detail.barang_id WHERE barang.nama_barang = ?`, namaBarang,(err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.length){
            console.log("found barang: ", res);
            result(null, res);
            return;
        }
        console.log("not found: ");
        result({message: "not_found"}, null);
    });
};

KolektifTabel.getByTanggalTransaksi = (tanggalTransaksi,result) => {
    sql.query(`SELECT barang.barang_id,barang.nama_barang, 
    barang.jenis_barang, barang_detail.stok, transaksi.jumlah_terjual, 
    transaksi.tanggal_transaksi, transaksi.transaksi_id FROM transaksi 
    INNER JOIN barang_detail ON transaksi.transaksi_id = barang_detail.transaksi_id 
    INNER JOIN barang ON barang.barang_id = barang_detail.barang_id WHERE DATE(transaksi.tanggal_transaksi) = ?`, tanggalTransaksi,(err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.length){
            console.log("found data transaksi: ", res);
            result(null, res);
            return;
        }
        console.log("not found data transaksi!");
        result({message: "not found data transaksi!"}, null);
    });
};

KolektifTabel.getByTanggalTransaksiBetween = (dariTgl, keTgl, sortResult,result) => {
    sql.query(`SELECT barang.barang_id,barang.nama_barang, 
    barang.jenis_barang, barang_detail.stok, transaksi.jumlah_terjual, 
    transaksi.tanggal_transaksi, transaksi.transaksi_id FROM transaksi 
    INNER JOIN barang_detail ON transaksi.transaksi_id = barang_detail.transaksi_id 
    INNER JOIN barang ON barang.barang_id = barang_detail.barang_id WHERE 
    DATE(transaksi.tanggal_transaksi) BETWEEN ? AND ? ORDER BY transaksi.jumlah_terjual ${sortResult}`, [dariTgl,keTgl],(err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.length){
            console.log("found data transaksi: ", res);
            result(null, res);
            return;
        }
        console.log("not found data transaksi!");
        result({message: "not found data transaksi!"}, null);
    });
};

KolektifTabel.getByAscDesc = (sortResult,result) => {
    sql.query(`SELECT barang.barang_id,barang.nama_barang, 
    barang.jenis_barang, barang_detail.stok, transaksi.jumlah_terjual, 
    transaksi.tanggal_transaksi, transaksi.transaksi_id FROM transaksi 
    INNER JOIN barang_detail ON transaksi.transaksi_id = barang_detail.transaksi_id 
    INNER JOIN barang ON barang.barang_id = barang_detail.barang_id ORDER BY transaksi.jumlah_terjual ${sortResult}`,(err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.length){
            console.log("found data transaksi: ", res);
            result(null, res);
            return;
        }
        console.log("not found data transaksi!");
        result({message: "not found data transaksi!"}, null);
    });
};

module.exports = KolektifTabel;