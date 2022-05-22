const sql = require("./db.js");


const Barang = function(barang){
    this.barangId = barang.barangId;
    this.namaBarang = barang.namaBarang;
    this.jenisBarang = barang.jenisBarang;
}

Barang.insert = (barangIdNew,barangNew,result) => {
    sql.query("INSERT INTO barang SET barang_id = ?, nama_barang = ?, jenis_barang = ?",
     [barangIdNew ,barangNew.namaBarang, barangNew.jenisBarang],
     (err, res) => {
        if(err){
            console.log("error: ",err);
            result(err, null);
            return;
        }
        console.log("inserted barang: ",{barang_id:barangIdNew, ...barangNew});
        result(null,{barang_id:barangIdNew, ...barangNew});
    });
};

Barang.getAll = result => {
    sql.query("SELECT * FROM barang", (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("data barang: ", res);
        result(null, res);
    });
};

Barang.getByNamaBarang = (namaBarang,result) => {
    sql.query("SELECT * FROM barang WHERE nama_barang = ?", namaBarang,(err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.length){
            console.log("found barang: ", res[0]);
            result(null, res[0]);
            return;
        }
        console.log("not found: ");
        result({message: "not_found"}, null);
    });
};

Barang.updateById = (barangId, barangUpdate, result) => {
    sql.query("UPDATE barang SET nama_barang = ?, jenis_barang = ? WHERE barang_id = ?",
    [barangUpdate.namaBarang, barangUpdate.jenisBarang, barangId],
    (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if(res.affectedRows == 0){
            result({message: "not_found"}, null);
            return;
        }
        console.log("updated barang: ",{barang_id:barangId, ...barangUpdate});
        result(null,{barang_id:barangId, ...barangUpdate});
    });
};

Barang.deleteById = (barangId, result) => {
    sql.query("DELETE FROM barang WHERE barang_id = ?", barangId, 
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
          console.log("deleted barang with barang_id: ", barangId);
          result(null, res);
    });
};

module.exports = Barang;