const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { Users } = require("./modules/users2");

users = new Users();

function validation(req, res, next) {
    if (!users[req.body.method]) {
        throw {
            error: {
                code: -32601,
                message:`method not found (${req.body.method})`,
            },
            name:'method not found',
            id:req.body.id
        };
    }
    next();
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.post("/rpc", validation, (req, res) => {
    users[req.body.method](req.body.params, function (err, result) {
        if (err) throw Error(err);
        res.json({jsonrpc: '2.0', result: result, id:req.body.id });
    });
    console.log('method:', req.body.method,' params:', req.body.params, 'id:', req.body.id);
});

app.all('*', (req, res) => {
    res.status(400).send(JSON.stringify({
        jsonrpc: '2.0',
        error: {code: -32601, message:'incorrect request'}
    }));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).send(JSON.stringify({
        jsonrpc: '2.0',
        error: err.error,
        id: err.id
    }));
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(3000, () => {
  console.log(`Server is up and running on port 3000!`);
});

modules.export = app_v2;
