const controller = {};


controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('users', {
                data: users
            });
        });
    });
};

controller.listDesc = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users ORDER BY first_name DESC', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('users', {
                data: users
            });
        });
    });
};

controller.listAsc = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users ORDER BY first_name ASC', (err, users) => {
            if (err) {
                res.json(err);
            }
            res.render('users', {
                data: users
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    if (data.is_admin == 'on') {
        data.is_admin = 1;
    } else {
        data["is_admin"] = 0;
    }
    data["registration_confirmed"] = 1;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO users set ?', [data], (err, users) => {
            res.redirect('/');
        });
    })
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM users WHERE user_id = ?', [req.params.id], (err, rows) => {
            res.redirect('/');
        });
    })
};

controller.edit = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE user_id = ?', [req.params.id], (err, user) => {
            res.render('edit_user', {
                data: user[0]
            });
        });
    });
}

controller.insertUpdate = (req, res) => {
    const newData = req.body;
    if (newData.is_admin == 'on') {
        newData.is_admin = 1;
    } else {
        newData["is_admin"] = 0;
    }
    req.getConnection((err, conn) => {
        conn.query('UPDATE users set ? WHERE user_id = ?', [newData, req.params.id], (err, user) => {
            res.redirect('/');
        });
    });
}

module.exports = controller;