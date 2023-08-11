import express from 'express';

import auth from './auth';
import token from './token';

const router = express.Router();

export default (): express.Router => {
    auth(router);
    token(router);
    return router;
};
