const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/useraccount.json' 

// util functions 

const saveAccountData = (data) => {
  console.log(data);
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


// reading the data
accountRoutes.get('/account', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  accountRoutes.post('/account/addaccount', (req, res) => {
   
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
    existAccounts[newAccountId] = req.body
     
    console.log(existAccounts);

    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account data added successfully'})
})

// Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})

// Read - get all accounts from the json file
accountRoutes.get('/account/list1', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})


// sendFile will go here
const path = require('path');
accountRoutes.get('/account/mypage', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Update - using Put method
accountRoutes.post('/account/:id/:qty', (req, res) => {
  var existAccounts = getAccountData()
   fs.readFile(dataPath, 'utf8', (err, data) => {
     console.log("hello 1 ");
    const accountId = req.params['id'];
    const qty = req.params['qty'];
    console.log(existAccounts.accounts[accountId]);
    existAccounts.accounts[accountId].quantity = qty;

    saveAccountData(existAccounts);
    res.send(`accounts with id ${accountId} has been updated`)
  }, true);
});

//delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getAccountData()

    const userId = req.params['id'];

    console.log(existAccounts);

    //delete existAccounts.accounts[userId]; 
    existAccounts.accounts.splice(userId, userId);

    saveAccountData(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})
module.exports = accountRoutes