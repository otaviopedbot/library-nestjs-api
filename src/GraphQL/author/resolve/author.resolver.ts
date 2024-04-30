import { AuthorService } from "../../../author/author.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorType } from "../types/author.type";
import { CreateAuthorArgs } from "../args/create-author.args";
import { UpdateAuthorArgs } from "../args/apdate-author.args";


@Resolver('authors')
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) { }


    @Mutation(() => AuthorType)
    async createAuthor(@Args() args: CreateAuthorArgs): Promise<AuthorType> {
        return this.authorService.create(args.data);
    }


    @Query(() => [AuthorType])
    async listAuthors() {
        return this.authorService.list();
    }


    @Query(() => AuthorType)
    async showAuthor(@Args('id') id: number): Promise<AuthorType> {
        return this.authorService.show(id);
    }


    @Mutation(() => AuthorType)
    async updatePartialAuthor(@Args() args: UpdateAuthorArgs, @Args('id') id: number): Promise<AuthorType> {
        return this.authorService.updatePartial(id, args.data);
    }


    @Mutation(() => Boolean)
    async deleteAuthor(@Args('id') id: number) {
        return await this.authorService.delete(id)
    }


}