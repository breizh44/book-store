import { Request, Response } from 'express';
import * as BooksServices from '../services/books.services';
import { BookDTO, Filter } from '../types';
import { Book } from '../entities/book.entity';

export const getBooks = async (req: Request, res: Response) => {
    const { year, genre } = req.query;
    const books = await BooksServices.getAllBooks(
        {
            year: year,
            genre: genre,
        } as Filter,
        req.query.populate === 'true'
    );
    res.json(books);
};

export const getBooksById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await BooksServices.getBooksById(id);
    res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
    const book = req.body as BookDTO;
    try {
        await BooksServices.addBook(book);
    } catch (error) {
        //console.log(error);
        res.status(500).send('Internal Error');
    }
    res.send('book created');
};

export const updateBook = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = req.body as BookDTO;
    try {
        await BooksServices.updateBook(id, book);
        res.send('book updated');
    } catch (error) {
        res.status(400).send(`${error}`);
    }
};

export const deleteBook = (req: Request, res: Response) => {
    res.send('book deleted');
};

export const getAuthors = async (req: Request, res: Response) => {
    const authors = await BooksServices.getAllAuthors();
    res.json(authors);
};

export const getAuthorsById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const book = await BooksServices.getAuthorsById(id);
    res.json(book);
};
