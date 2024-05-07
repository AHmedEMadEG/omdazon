const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const axios = require('axios');

exports.signUp = (req, res) => {
    var user = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            user.save()
                .then((_user) => {
                    const { password, ...others } = _user;
                    res.status(200).send(others);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ msg: `error: ${err}` });
                })
        });
    });
}

exports.logIn = (req, res) => {
    const query = { $or: [{ email: req.body.email }, { username: req.body.username }] }
    User.findOne(query, (err, _user) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: err });
            return;
        }
        if (!_user) {
            res.status(404).send({ msg: "username or email NOT found" });
            return;
        }
        bcrypt.compare(req.body.password, _user.password, (err, isMatch) => {
            if (err) {
                console.log(err);
                res.status(500).send({ msg: err });
                return;
            }
            if (isMatch) {
                jwt.sign({ id: _user.id, isAdmin: _user.isAdmin }, process.env.JWT_KEY, { expiresIn: "1d" }, (err, token) => {
                    if (err) {
                        res.status(500).send({ msg: err });
                        return;
                    }
                    const { password, ...others } = _user._doc;
                    return res.status(200).send({
                        ...others,
                        token
                    });
                });
            }
            else {
                res.status(401).send({ msg: "wrong password" });
            }
        })
    });
}


exports.lineLogin = (req, res) => {
    console.log("redirecting......");
    const { LINE_AUTH_DOMAIN, LINE_STATE, LINE_CLIENT_ID, LINE_REDIRECT_URI, LINE_SCOPE, LINE_RESPONSE_TYPE } = process.env;
    res.redirect(`${LINE_AUTH_DOMAIN}?response_type=${LINE_RESPONSE_TYPE}&client_id=${LINE_CLIENT_ID}&redirect_uri=${LINE_REDIRECT_URI}&state=${LINE_STATE}&scope=${LINE_SCOPE}&nonce=09876xyz`);
}


exports.lineCallback = async (req, res) => {
    const state = req.query.state;
    const code = req.query.code;

    // get the tokens from line api
    const tokensRequestBody = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINE_REDIRECT_URI,
        client_id: process.env.LINE_CLIENT_ID,
        client_secret: process.env.LINE_CLIENT_SECRET,
    };
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    let tokens;
    try {
        tokens = await axios.post(`https://api.line.me/oauth2/v2.1/token`, tokensRequestBody, { headers });
    } catch (err) {
        console.log(err);
        res.cookie('lineLoginError', err);
        res.status(403).redirect(process.env.REACT_APP_CLIENT_URL + '/login');
    }

    // verify the id_token from line api
    const verificationRequestBody = {
        id_token: tokens.data.id_token,
        client_id: process.env.LINE_CLIENT_ID,
    };
    let userData;
    try {
        userData = await axios.post(`https://api.line.me/oauth2/v2.1/verify`, verificationRequestBody, { headers });
    } catch (err) {
        console.log(err);
        res.cookie('lineLoginError', err);
        res.status(403).redirect(process.env.REACT_APP_CLIENT_URL + '/login');
    }

    if (userData) {
        // check if user is registered with this email and get rest of data from database
        const query = { email: userData.data.email }
        User.findOne(query, (err, _user) => {
            if (err) {
                console.log(err);
                res.status(500).send({ msg: err });
                return;
            }
            if (!_user) {
                res.status(404).send({ msg: "this email is not registered!" });
                return;
            }
            // generate a JWT
            jwt.sign({ id: _user.id, isAdmin: _user.isAdmin }, process.env.JWT_KEY, { expiresIn: "1d" }, (err, token) => {
                if (err) {
                    res.status(500).send({ msg: err });
                    return;
                }
                // send user along with token to front-end
                const { password, ...user } = _user._doc;

                res.cookie('user', JSON.stringify(user));
                res.cookie('token', token);

                console.log("logged in successfully using LINE");
                res.redirect(process.env.REACT_APP_CLIENT_URL);
            });
        })
    }
}


exports.google = (req, res) => {
    console.log("google login......");
}
