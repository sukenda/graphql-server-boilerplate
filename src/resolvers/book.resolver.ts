import {Arg, Authorized, Mutation, Query, Resolver} from "type-graphql";
import {Book} from "../entity/book.entity";
import {CreateBookInput} from "../inputs/create.book.input";
import {UpdateBookInput} from "../inputs/update.book.input";


@Resolver(Book)
export class BookResolver {

    @Authorized("ADMIN", "TEACHER", "GUEST")
    @Query(() => [Book])
    doFindBooks() {
        return Book.find()
    }

    @Authorized("ADMIN", "TEACHER")
    @Mutation(() => Book)
    async doSaveBook(@Arg("data") data: CreateBookInput) {
        const book = Book.create(data);
        await book.save();
        return book;
    }

    @Authorized("ADMIN", "TEACHER", "GUEST")
    @Query(() => Book)
    async doFindOne(@Arg("id") id: string) {
        return Book.findOne({where: {id}});
    }

    @Authorized("ADMIN", "TEACHER")
    @Mutation(() => Book)
    async doUpdateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
        const book = await Book.findOne({where: {id}});
        if (!book) throw new Error("Book not found!");
        Object.assign(book, data);
        await book.save();
        return book;
    }

    @Authorized("ADMIN", "TEACHER")
    @Mutation(() => Boolean)
    async doDeleteBook(@Arg("id") id: string) {
        const book = await Book.findOne({where: {id}});
        if (!book) throw new Error("Book not found!");
        await book.remove();
        return true;
    }

}
