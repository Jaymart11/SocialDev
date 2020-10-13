const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../../config/key').secretOrKey;
const passport = require('passport');

const ValidateRegisterInput = require('../../validation/register');
const ValidateLoginInput = require('../../validation/login');

const User = require('../../models/User.model');

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.find().then(user => res.json(user));
    }
);

router.post('/register', (req, res) => {
    const { errors, isValid } = ValidateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = ValidateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            errors.noMatch = 'These credentials do not match our records.';
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                };

                jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token });
                });
            } else {
                errors.noMatch = 'These credentials do not match our records.';
                return res.status(400).json(errors);
            }
        });
    });
});

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            avatar: req.user.avatar,
        });
    }
);

module.exports = router;
