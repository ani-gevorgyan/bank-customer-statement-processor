import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BASE_URL } from './constants';
import recordRouter from './api/record/processRecord';
import errorHandler from './errors/errorHandler';

async function initializeApp(): Promise<Application> {
    const app: Application = express();

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(BASE_URL, recordRouter);

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Welcome to Bank Record Receiving System!');
    });

    app.all('*', (req: Request, res: Response) => {
        res.status(404).json({ error: 'Route not found' });
    });

    app.use(errorHandler);

    return app;
}

export default initializeApp;