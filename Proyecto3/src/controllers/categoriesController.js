const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categories', (err, categories) => {
            if (err) {
                res.json(err);
            }
            res.render('categories', {
                data: categories
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO categories set ?', [data], (err, users) => {
            res.redirect('/categories');
        });
    })
};

controller.delete = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM categories WHERE category_id = ?', [req.params.id], (err, rows) => {
            res.redirect('/categories');
        });
    })
};

controller.edit = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM categories WHERE category_id = ?', [req.params.id], (err, categories) => {
            res.render('edit_categories', {
                data: categories[0]
            });
        });
    });
}

controller.insertUpdate = (req, res) => {
    const newData = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE categories set ? WHERE category_id = ?', [newData, req.params.id], (err, user) => {
            console.log(err);
            res.redirect('/categories');
        });
    });
}

module.exports = controller;