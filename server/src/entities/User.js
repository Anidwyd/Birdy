class Users {
  constructor(db) {
    this.db = db
    const req = `
        CREATE TABLE IF NOT EXISTS users(
            login VARCHAR(256) NOT NULL PRIMARY KEY,
            password VARCHAR(256) NOT NULL,
            firstname VARCHAR(256) NOT NULL,
            lastname VARCHAR(256) NOT NULL
        );
    `;
    db.exec(req, (err) => { if (err) throw err; });
  }

  create(login, password, firstname, lastname) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("INSERT INTO users VALUES(?, ?, ?, ?)");
      req.run([login, password, firstname, lastname], (err) => {
        if (err) {
          reject(console.log('Erreur SQL: ', err));
        } else {
          resolve(req.lastID);
        }
      });
    });
  }

  get(user_id) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("SELECT * FROM users WHERE rowid=?");
      req.get([user_id], (err, row) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(row);
        }
      });
    });
  }

  delete(user_id) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("DELETE FROM users WHERE rowid=?");
      req.run([user_id], (err) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  exists(login) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("SELECT login FROM users WHERE login=?"); 
      req.get([login], (err, row) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(row != undefined);
        } 
      });
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("SELECT rowid FROM users WHERE login=? AND password=?");
      req.get([login, password], (err, row) => {
        if (err) {
          reject(console.log('Erreur SQL: ', err));
        } else {
          resolve(row.rowid);
        }
      });
    });
  }

  search(query) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("SELECT firstname, lastname, rowid FROM users WHERE firstname LIKE %?% OR lastname LIKE %?%");
      req.all([query, query], (err, rows) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(rows);
        }
      });
    });
  }

}

exports.default = Users;

