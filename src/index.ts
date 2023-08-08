import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../swagger.json');

const PORT = 8080;
const DB_URL = 'mongodb+srv://valdbuser:P0s27zDAgQM5KvMZ@canie-cluster.ywtbvrj.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(express.json());

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('server started on port ' + PORT));
    }
    catch (e) {
        console.log(e);
    }
}

app.use( 
    '/docs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument) 
);

app.use('/api', router);

startApp();
