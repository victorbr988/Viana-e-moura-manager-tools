import express from 'express';
import cors from 'cors';
import { PortProps } from './types';
import { toolRoute } from './routes/toolRoute';
import { supervisorRoute } from './routes/SupervisorRoute';
import { enterpriseRoute } from './routes/EnterpriseRoute';
import { entranceRoute } from './routes/EntranceRoute';
import { exitRoute } from './routes/ExitRoute';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tools', toolRoute);
app.use('/supervisors', supervisorRoute);
app.use('/enterprises', enterpriseRoute);
app.use('/entrance', entranceRoute);
app.use('/exit', exitRoute);

const port: PortProps = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
