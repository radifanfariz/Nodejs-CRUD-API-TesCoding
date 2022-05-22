const Barang = require("../models/barang.model.js");
const { barangIdGenerator } = require("../utility/random.js");

exports.insert = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "There is a empty parameter!"
        });
    };

    const barang = new Barang({
        namaBarang: req.body.nama_barang,
        jenisBarang: req.body.jenis_barang
    })

    Barang.insert(
        barangIdGenerator(),
        barang,
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
    Barang.getAll((err, data) => {
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

exports.getByNamaBarang = (req, res) => {
    Barang.getByNamaBarang(req.query.nama_barang,(err, data) => {
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

    const barang = new Barang({
        namaBarang: req.body.nama_barang,
        jenisBarang: req.body.jenis_barang
    })

    Barang.updateById(
        req.params.barang_id,
        barang,
        (err, data) => {
            if (err) {
                if (err.message === "not_found") {
                  res.status(404).send({
                    message: `Not found Barang with barang_id : ${req.params.barang_id}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating Barang with barang_id : " + req.params.barang_id
                  });
                }
              } else res.send(data);
        }
    );
};

exports.deleteById = (req, res) => [
    Barang.deleteById(
        req.params.barang_id, 
        (err, data) => {
        if (err) {
            if (err.meessage === "not_found") {
              res.status(404).send({
                message: `Not found Barang with barang_id : ${req.params.barang_id}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete Barang with barang_id : " + req.params.barang_id
              });
            }
          } else res.send({ message: `Barang was deleted successfully!` });
    })
]