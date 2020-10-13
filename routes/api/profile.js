/** @format */

const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile.model');
const User = require('../../models/User.model');

const ValidateProfileInput = require('../../validation/profile.validate');
const ValidateExpInput = require('../../validation/experience');
const ValidateEducationInput = require('../../validation/education');

router.get('/test', (req, res) => {
  res.send('profile');
});

router
  .route('/')
  .get(passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  })
  .post(passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = ValidateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({user: req.user.id}).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}).then(profile => res.json(profile));
      } else {
        Profile.findOne({handle: profileFields.handle}).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exist';
            res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  });

router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There are no profiles';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({noProfile: 'There are no profiles'}));
});

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({noProfile: 'There is no profile for this user'}));
});

router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = ValidateExpInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({user: req.user.id}).then(profile => {
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    profile.experience.unshift(newExp);

    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.status(400).json(err));
  });
});

router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = ValidateEducationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Profile.findOne({user: req.user.id}).then(profile => {
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description,
    };

    profile.education.unshift(newEdu);

    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.status(400).json(err));
  });
});

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    const deleteExp = profile.experience.filter(exp => exp.id !== req.params.exp_id);
    profile.experience = deleteExp;

    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  });
});

router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user._id}).then(profile => {
    const deleteEdu = profile.education.filter(edu => edu.id !== req.params.edu_id);
    profile.education = deleteEdu;

    profile
      .save()
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  });
});

router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOneAndRemove({user: req.user.id}).then(() => {
    User.findOneAndRemove({_id: req.user.id}).then(() => res.json({success: true}));
  });
});

module.exports = router;
