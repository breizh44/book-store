import { Router } from 'express';
import * as BooksControllers from '../controllers/books.controllers';

const router = Router();

export const loadRouter = () => {
    router.get('/books', BooksControllers.getBooks);

    router.get('/books/:id', BooksControllers.getBooksById);

    router.post('/books', BooksControllers.createBook);

    router.put('/books/:id', BooksControllers.updateBook);

    router.get('/authors', BooksControllers.getAuthors);
    router.get('/authors/:id', BooksControllers.getAuthorsById);

    // router.ws('/messages', function (ws) {
    //     ws.on('message', function (msg) {
    //         ws.send(msg);
    //     });
    // });
    // router.ws('/notifications', function (ws) {
    //     ws.on('message', function (msg) {
    //         ws.send(`Notification recue : ${msg}`);
    //     });
    // });
};

export default router;
