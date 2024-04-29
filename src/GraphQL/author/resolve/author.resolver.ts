import { AuthorService } from "../author.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Author } from "../types/author.type";
import { CreateAuthorArgs } from "../args/create-author.args";
import { UpdateAuthorArgs } from "../args/apdate-author.args";


@Resolver('authors')
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) { }


    @Mutation(() => Author)
    async createAuthor(@Args() args: CreateAuthorArgs) {
        return this.authorService.create(args.data);
    }


    @Query(() => [Author])
    async listAuthors() {
        return this.authorService.list();
    }


    @Query(() => Author)
    async showAuthor(@Args('id') id: number) {
        return this.authorService.show(id);
    }


    @Mutation(() => Author)
    async updatePartialAuthor(@Args() args: UpdateAuthorArgs, @Args('id') id: number) {
        return this.authorService.updatePartial(id, args.data);
    }


    @Mutation(() => Boolean)
    async deleteAuthor(@Args('id') id: number) {
        return await this.authorService.delete(id)
    }


}