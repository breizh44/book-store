import {
    Collection,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Publisher } from './publisher.entity';
import { Author } from './author.entity';

@Entity()
export class Book {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @ManyToMany()
    authors = new Collection<Author>(this);

    @Property()
    year!: number;

    @Property()
    genre!: string;

    @ManyToOne()
    publisher?: Publisher;
}
