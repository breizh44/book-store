import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Book } from '../entities/book.entity';
import { faker } from '@faker-js/faker';
import { Publisher } from '../entities/publisher.entity';
import { Author } from '../entities/author.entity';

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const books: Book[] = [];

        const authors: Author[] = [];
        for (let i = 0; i < 10; i++) {
            const author = new Author();
            author.name = faker.person.fullName();
            authors.push(author);
        }

        const publishers: Publisher[] = [];
        for (let i = 0; i < 10; i++) {
            const publisher = new Publisher();
            publisher.name = faker.company.name();
            publisher.address = faker.location.streetAddress();
            publishers.push(publisher);
        }

        for (let i = 0; i < 50; i++) {
            const book = new Book();
            book.title = faker.lorem.words(2);
            //book.authors.add(faker.helpers.arrayElement(authors));
            const author = faker.helpers.arrayElement(authors);
            book.authors.add(author);
            author.books.add(book);
            book.year = faker.date.past().getFullYear();
            book.genre = faker.helpers.arrayElement([
                'Fiction',
                'Non-fiction',
                'Science-fiction',
                'Mystery',
                'Romance',
                'Fantasy',
            ]);
            book.publisher = faker.helpers.arrayElement(publishers);
            books.push(book);
        }

        await em.persistAndFlush(books);
    }
}
