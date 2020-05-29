import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Book} from "../entity/book.entity";
import {CreateBookInput} from "../inputs/create.book.input";
import {UpdateBookInput} from "../inputs/update.book.input";


@Resolver()
export class BookResolver {

    @Query(() => [Book])
    doFindBooks() {
        return Book.find()
    }

    @Mutation(() => Book)
    async doSaveBook(@Arg("data") data: CreateBookInput) {
        const book = Book.create(data);
        await book.save();
        return book;
    }

    @Query(() => Book)
    async doFindOne(@Arg("id") id: string) {
        return Book.findOne({where: {id}});
    }

    @Mutation(() => Book)
    async doUpdateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
        const book = await Book.findOne({where: {id}});
        if (!book) throw new Error("Book not found!");
        Object.assign(book, data);
        await book.save();
        return book;
    }

    @Mutation(() => Boolean)
    async doDeleteBook(@Arg("id") id: string) {
        const book = await Book.findOne({where: {id}});
        if (!book) throw new Error("Book not found!");
        await book.remove();
        return true;
    }

}
