const requestRouter = require('express').Router();
const dbo = require("../db/conn");
// const ObjectId = require("mongodb").ObjectId;


requestRouter.route('/request/:id').get((req, res) => {
    let db_connect = dbo.getDb("B-Hive");
    let query ={ toWalletId:req.params.id} ;
    db_connect
        .collection("Requests")
        .find(query) 
        .toArray(function (err, result) {
                if (err) throw err;
                res.json(result)
            })
});

requestRouter.route('/request/add').post((req, res) => {
    
    let db_connect = dbo.getDb("B-Hive");
    let userObj = {
        usertype: req.body.userid,
        walletId: req.body.email,
        username: req.body.username,
    }
    db_connect.collection("Requests").insertOne(userObj, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});


requestRouter.route('/request/update/:id').post((req, res) => {
    
    let db_connect = dbo.getDb("B-Hive");
    let query = { requestId:req.params.id};
    let newvalues = {
        $set: { 
            status: req.body.status,
        },
    };

    db_connect
        .collection("Requests")
        .updateOne(query, newvalues, function (err, result) {
            if (err) throw err;
            console.log("updated request");
            res.json(result);
        })
});

module.exports = requestRouter;