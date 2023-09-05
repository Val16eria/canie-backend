import express from 'express';

import auth from './auth';
import token from './token';
import photographer from './photographer';
import model from './model';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    auth(router);
    token(router);
    photographer(router);
    model(router);
    users(router);
    return router;
};
