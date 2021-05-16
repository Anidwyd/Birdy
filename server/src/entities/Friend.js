class Friend {
  constructor(db) {
    this.db = db
    const req = `
        CREATE TABLE IF NOT EXISTS friends(
            user_id VARCHAR(256) NOT NULL PRIMARY KEY,
            friend_id VARCHAR(256) NOT NULL
        );
    `;
    db.exec(req, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  add(user_id, friend_id) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("INSERT INTO friends VALUES(?, ?)");
      req.run([user_id, friend_id], (err) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(req.lastID);
        }
      });
    });
  }

  get(user_id) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("SELECT friend_id FROM friends WHERE user_id=?");
      req.all([user_id], (err, rows) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(rows);
        }
      });
    });
  }

  delete(user_id, friend_id) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("DELETE FROM friends WHERE user_id=? AND friend_id=?");
      req.run([user_id, friend_id], (err) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  exists(user_id, friend_id) {
    return new Promise((resolve, reject) => {
      const req = this.db.prepare("SELECT * FROM friends WHERE user_id=? AND friend_id=?"); 
      req.get([user_id, friend_id], (err, row) => {
        if (err) {
          console.log('Erreur SQL: ', err);
          reject();
        } else {
          resolve(row != undefined);
        } 
      });
    });
  }

}

exports.default = Friend;

