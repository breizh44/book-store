import {
    Collection,
    Entity,
    ManyToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Book } from './book.entity';

@Entity()
export class Author {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @ManyToMany()
    books = new Collection<Book>(this);
}
