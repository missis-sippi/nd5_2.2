class User {
    constructor(name = '', score = 0, id = 0 ) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    show() {
        console.log(JSON.stringify(this));
    }

    json() {
        return(JSON.stringify(this));
    }

    valueOf() {
        return this.id;
    }
}

class UserList extends Array {
    constructor () {
        super();
        this.id = 0;
    }

    add(name = '', score = 0) {
        this.id += 1;
        const user = new User(name, score, this.id)
        this.push(user);
        return user;
    }

    show() {
        console.log(`Number of users in list: ${this.length} :`);
        this.forEach(ob => ob.show());
    }

    json() {
        return JSON.stringify(this);
    }

    _indexById(id) {
        return this.findIndex( ob => ob.id == id);
    }

    _indexByName(name) {
        return this.findIndex( ob => ob.name === name);
    }

    get(id) {
        let index = this._indexById(id);
        if (index > -1) {
            return this[index];
        }
        return null;
    }

    del(id) {
        let index = this._indexById(id);
        if (index > -1) {
            let deletedItem = this[index];
            this.splice(index, 1);
            return deletedItem;
        }
        return null;
    }

    update(id, data) {
        let index = this._indexById(id);
        if (index > -1) {
            if (data.name) this[index].name = data.name;
            if (data.score) this[index].score = data.score;
            return this[index];
        }
        return null;//if not found
    }
}

module.exports = {
    UserList
}

if (!module.parent) {
    const ob = new UserList();
    ob.add('a', 1);
    ob.add('b', 2);
    ob.add('c', 3);
    ob.add('d', 4);
    ob.add('e', 5);
    ob.show();

    console.log('Get user (id=2)');
    let user = ob.get(2);
    console.log(user);

    console.log('Delete user (id=2)');
    ob.del(2);
    ob.show();

    console.log('Update user (id=3)');
    ob.update(3, new User('x', 10));
    ob.show();

    console.log('Userlist:')
    console.log(ob.json());

    ob['add']('y', 11);
    console.log(ob.json());
}
