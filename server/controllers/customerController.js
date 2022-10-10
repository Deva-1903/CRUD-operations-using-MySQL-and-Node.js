const { request } = require("express");
const mySql = require("mysql2");

const con = mySql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.view = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("select * from users", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log("Error in listing data" + err);
      }
    });
  });
};

exports.addcustomer = (req, res) => {
  res.render("addCustomer");
};

exports.userdetails = (req, res) => {
  res.render("userDetails");
};

exports.invoice = (req, res) => {
  res.render("invoice");
};

exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { id, name, phone } = req.body;

    connection.query(
      "insert into users (LOGIN_ID,NAME,PHONE) values (?,?,?)",
      [id, name, phone],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("addcustomer", { msg: "User details added" });
        } else {
          console.log("Error in listing data" + err);
        }
      }
    );
  });
};

exports.editcustomer = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;

    connection.query("select * from users where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("editcustomer", { rows });
      } else {
        console.log("Error in listing data" + err);
      }
    });
  });
};

exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { id, name, phone } = req.body;
    let id1 = req.params.id;

    connection.query(
      "UPDATE users SET LOGIN_ID=?, NAME=?, PHONE=? where ID=?",
      [id, name, phone, id1],
      (err, rows) => {
        connection.release();
        if (!err) {
          con.getConnection((err, connection) => {
            if (err) throw err;

            let id = req.params.id;

            connection.query(
              "select * from users where id=?",
              [id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.render("editcustomer", {
                    rows,
                    msg: "User details updated",
                  });
                } else {
                  console.log("Error in listing data" + err);
                }
              }
            );
          });
        } else {
          console.log("Error in listing data" + err);
        }
      }
    );
  });
};

exports.delete = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;
    connection.query("delete from users where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  });
};
