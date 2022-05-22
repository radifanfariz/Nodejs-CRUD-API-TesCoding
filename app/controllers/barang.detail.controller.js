const BarangDetail = require("../models/barang.detail.model.js");

exports.insert = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "There is a empty parameter!"
        });
    };

    const barangDetail = new BarangDetail({
        stok: req.body.stok
    })

    BarangDetail.insert(
        req.params.barang_id,
        req.params.transaksi_id,
        barangDetail,
        (err, data) => {
            if(err){
                res.status(500).send({
                    message: err.message || "Something went wrong !"
                });
            }
            else{
                res.send(data);
            }
        }
    );
};

exports.getAll = (req, res) => {
    BarangDetail.getAll((err, data) => {
        if(err){
            res.status(500).send({
                meessage: err.meessage || "Something went wrong !"
            })
        }
        else{
            res.send(data);
        }
    });
};

exports.updateById = (req, res) =>{

    const barangDetail = new BarangDetail({
        stok: req.body.stok
    })

    BarangDetail.updateById(
        req.params.barang_id,
        req.params.transaksi_id,
        barangDetail,
        (err, data) => {
            if (err) {
                if (err.message === "not_found") {
                  res.status(404).send({
                    message: `Not found BarangDetail with barang_id and transaksi_id : ${req.params.barang_id} and ${req.params.transaksi_id}.`
                  });
                } else {
                  res.status(500).send({
                    message: `Error updating BarangDetail with barang_id and transaksi_id : ${req.params.barang_id} and ${req.params.transaksi_id}`
                  });
                }
              } else res.send(data);
        }
    );
};

exports.deleteById = (req, res) => [
    BarangDetail.deleteById(
        req.params.barang_id,
        req.params.transaksi_id, 
        (err, data) => {
        if (err) {
            if (err.meessage === "not_found") {
              res.status(404).send({
                message: `Not found BarangDetail with barang_id and transaksi_id : ${req.params.barang_id} and ${req.params.transaksi_id}.`
              });
            } else {
              res.status(500).send({
                message: `Could not delete BarangDetail with barang_id and transaksi_id : ${req.params.barang_id} and ${req.params.transaksi_id}`
              });
            }
          } else res.send({ message: `BarangDetail was deleted successfully!` });
    })
]