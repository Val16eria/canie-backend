import express, { 
    Application,
    Request, 
    Response, 
    NextFunction 
} from 'express';
import { ValidateError } from 'tsoa';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import router from './router';

const PORT = 8080;
const DB_URL = 'mongodb+srv://valdbuser:P0s27zDAgQM5KvMZ@canie-cluster.ywtbvrj.mongodb.net/?retryWrites=true&w=majority';

const app: Application = express();
app.use(express.json());
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
        app.listen(PORT, () => console.log('server started on port ' + PORT));
    }
    catch (e) {
        console.log(e);
    }
}

startApp();

// "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",