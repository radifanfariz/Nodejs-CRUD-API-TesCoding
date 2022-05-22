const sql = require("./db.js");


const BarangDetail = function(barangDetail){
    this.transaksiId = barangDetail.transaksiId;
    this.barangId = barangDetail.barangId;
    this.stok = barangDetail.stok;
}

BarangDetail.insert = (barangIdNew, transaksiIdNew, barangDetailNew, result) => { 
    sql.query("INSERT INTO barang_detail SET barang_id = ?, transaksi_id = ?, stok = ?",
     [barangIdNew ,transaksiIdNew, barangDetailNew.stok],
     (err, res) => {
        if(err){
            console.log("error: ",err);
            result(err, null);
            return;
        }
        console.log("inserted barang detail: ",{barang_id:barangIdNew,transaksi_id: transaksiIdNew, ...barangDetailNew});
        result(null,{barang_id:barangIdNew,transaksi_id: transaksiIdNew, ...barangDetailNew});
    })
}

BarangDetail.getAll = result => {
    sql.query("SELECT * FROM barang_detail", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("data barang detail: ", res);
        result(null, res);
    })
}

BarangDetail.updateById = (barangId,transaksiId, barangDetail, result) => {
    sql.query("UPDATE barang_detail SET stok = ? WHERE barang_id = ? AND transaksi_id = ?",
    [barangDetail.stok ,barangId, transaksiId],
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
        console.log("updated barang detail: ",{barang_id:barangId,transaksi_id:transaksiId, ...barangDetail});
        result(null,{barang_id:barangId,transaksi_id:transaksiId, ...barangDetail});
    }
    )
}

BarangDetail.deleteById = (barangId,transaksiId, result) => {
    sql.query("DELETE FROM barang_detail WHERE barang_id = ? AND transaksi_id = ?", [barangId,transaksiId], 
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
          console.log("deleted Barang Detail with barang_id and transaksi_id: ", barangId, transaksiId);
          result(null, res);
    }
    )
}

module.exports = BarangDetail;