import express from 'express';
import user from './users';

const router = express.Router();

router.use('/user', user);

module.exports = router;
