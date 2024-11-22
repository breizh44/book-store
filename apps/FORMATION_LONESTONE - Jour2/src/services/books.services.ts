import { Book } from '../entities/book.entity';
import { BookDTO, Filter } from '../types';

import { DI } from '../index';
import { wrap } from '@mikro-orm/core';
import { Author } from '../entities/author.entity';

export const getAllBooks = async (
    filters: Filter,
    populate: boolean = false
): Promise<Book[]> => {
    const query: any = {};
    Object.entries(filters).reduce((query, [key, value]) => {
        if (value) {
            query[key] = value;
        }
        return query;
    }, query); //pour enlever les filtres avec la valeur undefinded
    return await DI.em.find(
        Book,
        query,
        populate ? { populate: ['publisher.name', 'authors'] } : {}
    );
};

export const getBooksById = async (id: number): Promise<Book | null> => {
    return await DI.em.findOne(Book, id);
};

export const addBook = async (book: BookDTO) => {
    const newBook = DI.em.create(Book, book);
    await DI.em.flush();
    return newBook;
};

export const updateBook = async (id: number, book: BookDTO) => {
    const existingBook = await DI.em.findOne(Book, { id: id });
    if (!existingBook) {
        throw new Error('Book not found');
    }
    wrap(existingBook).assign(book);
    await DI.em.flush();
    return existingBook;
};

export const getAllAuthors = async (): Promise<Author[]> => {
    return await DI.em.find(Author, {});
};

export const getAuthorsById = async (id: number): Promise<Author | null> => {
    return await DI.em.findOne(Author, id);
};
