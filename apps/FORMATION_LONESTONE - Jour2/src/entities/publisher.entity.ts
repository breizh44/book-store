import {
    Collection,
    Entity,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Book } from './book.entity';

@Entity()
export class Publisher {
    @PrimaryKey()
    id!: number;
    @Property()
    name!: string;
    @Property()
    address!: string;
    @OneToMany(() => Book, (book) => book.publisher)
    books = new Collection<Book>(this);
}
