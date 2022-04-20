import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {  
    res.send('Express + Typescript is working!');
});

app.listen(
    PORT, 
    () => console.log(`It's alive on http://localhost:${PORT}`)
);