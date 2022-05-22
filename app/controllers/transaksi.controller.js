const Transaksi = require("../models/transaksi.model.js");
const { transaksiIdGenerator } = require("../utility/random.js");

exports.insert = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "There is a empty parameter!"
        });
    };

    const transaksi = new Transaksi({
        jumlahTerjual: req.body.jumlah_terjual,
        tanggalTransaksi: req.body.tanggal_transaksi
    })

    Transaksi.insert(
        transaksiIdGenerator(),
        transaksi,
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
    Transaksi.getAll((err, data) => {
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

exports.getByTanggalTransaksi = (req, res) => {
    Transaksi.getByTanggalTransaksi(
        req.query.tanggal_transaksi,
        (err, data) => {
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

exports.getByTanggalTransaksiBetween = (req, res) => {
    Transaksi.getByTanggalTransaksiBetween(
        req.query.dari_tanggal,
        req.query.ke_tanggal,
        (err, data) => {
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

    const transaksi = new Transaksi({
        jumlahTerjual: req.body.jumlah_terjual,
        tanggalTransaksi: req.body.tanggal_transaksi
    })

    Transaksi.updateById(
        req.params.transaksi_id,
        transaksi,
        (err, data) => {
            if (err) {
                if (err.message === "not_found") {
                  res.status(404).send({
                    message: `Not found Transaksi with transaksi_id : ${req.params.transaksi_id}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating Transaksi with transaksi_id : " + req.params.transaksi_id
                  });
                }
              } else res.send(data);
        }
    );
};

exports.deleteById = (req, res) => [
    Transaksi.deleteById(
        req.params.transaksi_id, 
        (err, data) => {
        if (err) {
            if (err.meessage === "not_found") {
              res.status(404).send({
                message: `Not found Transaksi with transaksi_id : ${req.params.transaksi_id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Transaksi with transaksi_id : " + req.params.transaksi_id
              });
            }
          } else res.send({ message: `Transaksi was deleted successfully!` });
    })
]