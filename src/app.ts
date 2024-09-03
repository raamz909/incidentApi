import express,{Request, Response} from 'express';
import { envs } from './config/envs';
import { MongoDatabase } from './data/models/init';
import { IncidentModel } from './data/models/incident.model';
import { AppRoutes } from './presentacion/routes';
import { emailJob } from './domain/jobs/email.job';

console.log("Testing")
console.log('ENV VARIABLES', envs.PORT)

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);
(async () => await MongoDatabase.connect({mongoUrl: envs.MONGO_URL, dbName:envs.MONGO_DB

    }))
();


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    emailJob();
});

