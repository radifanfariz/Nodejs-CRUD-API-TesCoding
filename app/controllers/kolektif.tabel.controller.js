const KolektifTabel = require("../models/kolektif.tabel.model");


exports.getAll = (req, res) => {
    KolektifTabel.getAll((err, data) => {
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
    KolektifTabel.getByNamaBarang(req.query.nama_barang,(err, data) => {
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
    KolektifTabel.getByTanggalTransaksi(
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
    KolektifTabel.getByTanggalTransaksiBetween(
        req.query.dari_tanggal,
        req.query.ke_tanggal,
        req.query.sort_result,
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

exports.getByAscDesc = (req, res) => {
    KolektifTabel.getByAscDesc(
        req.params.sort_result,
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