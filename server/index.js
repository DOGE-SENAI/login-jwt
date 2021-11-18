const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "loginsystem",
});

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, hash],
            (err, result) => {
                console.log(err);
            }
        );
    });
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("You need a token, please give it to us next time!")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "U faild to authenticate" })
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send({ auth: true, message: "You are authenticated congrats" })
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {                        
                        const id = result[0].id
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 60 * 60 * 24,
                        })

                        req.session.user = result;
                        res.json({
                            auth: true,
                            token: token,
                            result: result
                        });
                    } else {
                        res.json({
                            auth: false,
                            message: "Wrong username/password combination"
                        });
                    }
                });
            } else {
                res.json({
                    auth: false,
                    message: "no user exists"
                });
            }
            
            
        }
    );
});

app.get("/logout", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true });
        
    } else {
        res.send({ loggedIn: false, message: "You are not logged in." })
    }
})

app.listen(3001, () => {
    console.log("running server in http://localhost:3001")
})