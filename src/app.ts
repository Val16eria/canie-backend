import express, { 
    Application,
    Request, 
    Response, 
    NextFunction 
} from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import { ValidateError } from 'tsoa';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import router from './router';

config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const app: Application = express();

app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

// app.use(express.json());
app.use('/', router());

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import('../build/swagger.json'))
    );
});

app.use(function notFoundHandler(_req, res: Response) {
    res.status(404).send({
        message: "Not Found",
    });
});

app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        server.listen(PORT, () => console.log('server started on port ' + PORT));
    }
    catch (err) {
        console.log(err);
    }
}

startApp();
