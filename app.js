const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { UserList } = require("./modules/users");

userlist = new UserList();

function nonexistentUser(id) {
    return (`User with id:${id} does not exist`);
}

function result(id, p) {
    return (`id:${id}, ` + ((p) ? 'Existing user' : 'User does not exist'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get('/users', (req, res) => {
    res.json(userlist);
    console.log('Userlist:', userlist.json());
});

app.get('/users/:id', (req, res) => {
    const p = userlist.get(req.params.id);
    if (p) {
        res.send(p);
    } else {
        res.json({error: nonexistentUser(req.params.id)});
    }
    console.log('requested:', result(req.params.id, p));
});

app.post('/users', (req, res) => {
    const user = userlist.add(name=req.body.name, score=req.body.score);
    res.json(user);
    console.log('added:', user.json());
});

app.put('/users/:id', (req, res) => {
    const p = userlist.update(req.params.id, {name:req.body.name, score:req.body.score});
    if (p) {
        res.json({done: true});
    } else {
        res.json({error: nonexistentUser(req.params.id)});
    }
    console.log('changed:', result(req.params.id, p));
});

app.delete('/users/:id', (req, res) => {
    const p = userlist.del(req.params.id);
    if (p) {
        res.json({done: true, message: `User with id:${req.params.id} has been deleted`});
    } else {
        res.json({error: nonexistentUser(req.params.id)});
    }
    console.log('deleted:', result(req.params.id, p));
});

app.all('*', (req, res) => {
    res.status(400).send('Incorrect request');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.json(err);
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.listen(3000, () => {
  console.log(`Server is up and running on port 3000`);
});

module.exports = app;
