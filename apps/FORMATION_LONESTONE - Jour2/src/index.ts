import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes, { loadRouter } from './routes/books.routes';
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';
import config from './mikro-orm.config';
//import { WebSocketServer } from 'ws';
import expressWs from 'express-ws';
import router from './routes/books.routes';
import { Server } from 'socket.io';
import { createServer } from 'http';

//const express = require('express');
dotenv.config();

const port = process.env.PORT || 3000;
const portWS = process.env.PORT_WS || 1000;

export const DI = {} as {
    orm: MikroORM;
    em: EntityManager;
}; //creation d'un type à la volée utilisé plus loin pour l'injection de dépendances

const init = async () => {
    DI.orm = await MikroORM.init(config);

    DI.em = DI.orm.em;

    const app = express();
    const server = createServer(app);
    const io = new Server(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected ');
        });
        socket.on('chat', (message) => {
            console.log('message received ', message);
            io.emit('chat', message);
        });
    });

    server.listen(portWS, () => {
        console.log(`listening on port ${portWS}`);
    });

    app.use(cors());
    //expressWs(app);
    loadRouter();

    app.use((req, res, next) => RequestContext.create(DI.em, next)); //creation du contexte
    //orm.em = entity manager

    app.use(express.json());

    //ajout d'une route '/'
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world !!');
    });

    app.use(routes);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    //serveur websocket
    //const wss: WebSocketServer = new WebSocketServer({ server });

    //Gérer les connexions WebSocket pour la route 'ws/'
    // app.rawListeners();
    // wss.on('connection', (ws) => {
    //     console.log('Connexion');
    //     ws.on('message', (message) => {
    //         console.log('Message reçu : ', message);
    //     });
    // });

    // Middleware WebSocket pour la route '/ws/messages'
    //app.use('/', router); //Inutile car plus haut on fait un app.use(routes)
};

init();
