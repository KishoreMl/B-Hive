const fileRouter = require('express').Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


fileRouter.route('/file/:id').get((req, res) => {
    let db_connect = dbo.getDb("B-Hive");
    let query ={ fileId:req.params.id} ;
    db_connect
        .collection("FileUploads")
        .findOne(query,function (err, result) {
            if (err) throw err;
            res.json(result);
        })        
});

fileRouter.route('/file/:id/:category').get((req, res) => {
    let db_connect = dbo.getDb("B-Hive");
    let query ={ walletId:req.params.id,category:req.params.category} ;
    db_connect
        .collection("FileUploads")
        .find(query) 
        .toArray(function (err, result) {
                if (err) throw err;
                res.json(result)
            })
});

fileRouter.route('/file/add').post((req, res) => {
    
    let db_connect = dbo.getDb("B-Hive");
    let fileObj = {
        fileId:req.body.fileId,
        filename: req.body.filename,
        filetype: req.body.filetype,
        filesize: req.body.filesize,
        uploadedDate: req.body.uploadedDate,
        category: req.body.category,
        walletId: req.body.walletId,
        access: req.body.access,
        
      
    }
    db_connect.collection("FileUploads").insertOne(fileObj, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});

fileRouter.route('/file/update/:fileId/:ownerWalletId').post((req, res) => {
    
    let db_connect = dbo.getDb("B-Hive");
    let query = { fileId: req.params.fileId, walletId: req.params.ownerWalletId };
    console.log("request update testing");
    console.log("fileId: " + req.params.fileId);
    console.log("walletId: " + req.params.ownerWalletId);
    let newvalues = {
        $set: {
            access:req.body.access
        },
    };

    db_connect
        .collection("FileUploads")
        .updateOne(query, newvalues, function (err, result) {
            if (err) throw err;
            console.log("File access updated");
            res.json(result);
        })
});


module.exports = fileRouter;