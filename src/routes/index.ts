import express from 'express';
import HelloController from '../hello/hello.controller';

const router = express.Router();

router.get('/hello', async (_req, res) => {
    const controller = new HelloController();
    const response = await controller.getHello();
    return res.send(response);
});

export default router;