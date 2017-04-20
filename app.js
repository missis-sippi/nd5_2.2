const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const app = express();
const { UserList } = require("./modules/users1");

userlist = new UserList();

function userNoExist(id) {
    return `User with id:${id} does not exist`;
}

function result(id, p) {
    return `id:${id}, ` + ((p) ? 'OK' : 'User does not exist');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.get('/users', (req, res) => {
    res.json(userlist);
    console.log('userlist:', userlist.json());
});

app.get('/users/:id', (req, res) => {
    const p = userlist.get(req.params.id);
    if (p) {
        res.send(p);
    } else {
        res.json({error: userNoExist(req.params.id)});
    }
    console.log('requested:', result(req.params.id, p));
});

app.put('/users/:id', (req, res) => {
    const p = userlist.update(req.params.id, {name:req.body.name, score:req.body.score});
    if (p) {
        res.json({done: true});
    } else {
        res.json({error: userNoExist(req.params.id)});
    }
    console.log('changed:', result(req.params.id, p));
});

app.delete('/users/:id', (req, res) => {
    const p = userlist.del(req.params.id);
    if (p) {
        res.json({done: true, message: `user with id:${req.params.id} has been deleted`});
    } else {
        res.json({error: userNoExist(req.params.id)});
    }
    console.log('deleted:', result(req.params.id, p));
});

app.post('/users', (req, res) => {
    const user = userlist.add(name=req.body.name, score=req.body.score);
    res.json(user);
    console.log('added:', user.json());
});

app.all('*', (req, res) => {
    res.status(400).send('incorrect request');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.json(err);
});

app.listen(3000, () => {
  console.log(`Server is up and running on port 3000`);
});

module.exports = app;
