const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM poems WHERE user_id = ?', [req.params.user_id], (err, poems) => {
            conn.query('SELECT * FROM users WHERE user_id = ?', [req.params.user_id], (err1, users) => {
                conn.query('SELECT * FROM categories', (err1, categories) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('poems', {
                        data: poems,
                        user: users[0],
                        categories,
                    });
                });
            });

        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categories WHERE category = ?', [data.category], (err, category) => {
            const poem = {
                "title": data.title,
                "poem": data.poem,
                "user_id": parseInt(req.params.user_id),
                "category_id": category[0].category_id
            };
            conn.query('INSERT INTO poems set ?', [poem], (err1, poem) => {
                console.log(err1);
                res.redirect('/poems/' + req.params.user_id);
            });
        });
    })
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM poems WHERE poem_id = ?', [req.params.id], (err, rows) => {
            res.redirect('/poems/' + req.params.user_id);
        });
    })
};

controller.edit = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM poems WHERE poem_id = ?', [req.params.id], (err, poems) => {
            conn.query('SELECT * FROM categories', (err, categories) => {
                res.render('edit_poems', {
                    data: poems[0],
                    categories
                });
            }); 
        });
    });
}

controller.insertUpdate = (req, res) => {
    const newData = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categories WHERE category = ?', [newData.category], (err, category) => {
            const poem = {
                "title": newData.title,
                "poem": newData.poem,
                "category_id": category[0].category_id
            };
            conn.query('UPDATE poems set ? WHERE poem_id = ?', [poem, req.params.id], (err1, poem) => {
                console.log(err1);
                res.redirect('/poems/' + req.params.user_id);
            });
        });
    })
}

module.exports = controller;