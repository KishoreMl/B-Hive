const userRouter = require('express').Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


userRouter.route('/user/:id').get((req, res) => {
    let db_connect = dbo.getDb("B-Hive");
    let query ={ walletId:req.params.id} ;
    db_connect
        .collection("Users")
        .findOne(query, function (err, result) {
            if (err)
            {
                console.log(err);
            }
            res.json(result)
        }) 
});


userRouter.route('/user/add').post((req, res) => {
    
    let db_connect = dbo.getDb("B-Hive");
    let userObj = {
        usertype: req.body.userid,
        walletId: req.body.email,
        username: req.body.username,
    }
    db_connect.collection("Users").insertOne(userObj, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});


userRouter.route('/user/update/:id').post((req, res) => {
    
    let db_connect = dbo.getDb("B-Hive");
    let query = { userid:req.params.id };
    let newvalues = {
        $set: {
            usertype: req.body.userid,
            walletId: req.body.email,
            username: req.body.username,
        },
    };

    db_connect
        .collection("Users")
        .updateOne(query, newvalues, function (err, result) {
            if (err) throw err;
            console.log("updated user");
            res.json(result);
        })
});

module.exports = userRouter;