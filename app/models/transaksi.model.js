const sql = require("./db.js");

const Transaksi = function(transaksi){
    this.transaksiId = transaksi.transaksiId;
    this.jumlahTerjual = transaksi.jumlahTerjual;
    this.tanggalTransaksi = transaksi.tanggalTransaksi;
}

Transaksi.insert = (transaksiIdNew,transaksiNew,result) => {
    sql.query("INSERT INTO transaksi SET transaksi_id = ?, jumlah_terjual = ?, tanggal_transaksi = ?",
     [transaksiIdNew ,transaksiNew.jumlahTerjual, transaksiNew.tanggalTransaksi],
     (err, res) => {
        if(err){
            console.log("error: ",err);
            result(err, null);
            return;
        }
        console.log("inserted transaksi: ",{transaksi_Id:transaksiIdNew, ...transaksiNew});
        result(null,{transaksi_Id:transaksiIdNew, ...transaksiNew});
    });
};

Transaksi.getAll = result => {
    sql.query("SELECT * FROM transaksi", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("data transaksi: ", res);
        result(null, res);
    });
};

Transaksi.getByTanggalTransaksi = (tanggalTransaksi,result) => {
    sql.query("SELECT * FROM transaksi WHERE DATE(tanggal_transaksi) = ?", tanggalTransaksi,(err, res) =>{
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

Transaksi.getByTanggalTransaksiBetween = (dariTgl, keTgl,result) => {
    sql.query("SELECT * FROM transaksi WHERE DATE(tanggal_transaksi) BETWEEN ? AND ?", [dariTgl,keTgl],(err, res) =>{
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

Transaksi.updateById = (transaksiId, transaksiUpdate, result) => {
    sql.query("UPDATE transaksi SET jumlah_terjual = ?, tanggal_transaksi = ? WHERE transaksi_id = ?",
    [transaksiUpdate.jumlahTerjual, transaksiUpdate.tanggalTransaksi, transaksiId],
    (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({messages: "not_found"}, null);
            return;
        }
        console.log("updated transaksi: ",{transaksi_Id:transaksiId, ...transaksiUpdate});
        result(null,{transaksi_Id:transaksiId, ...transaksiUpdate});
    });
};

Transaksi.deleteById = (transaksiId, result) => {
    sql.query("DELETE FROM transaksi WHERE transaksi_id = ?", transaksiId, 
    (err, res) =>{
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          if (res.affectedRows == 0) {
            result({ message: "not_found" }, null);
            return;
          }
          console.log("deleted Transaksi with transaksi_id: ", transaksiId);
          result(null, res);
    });
};

module.exports = Transaksi;