import { Param, ParseIntPipe } from "@nestjs/common";
import { CreateAuthorDTO } from "../dto/create-author.dto";
import { AuthorService } from "../author.service";
import { UpdatePatchAuthorDTO } from "../dto/update-patch-author.dto";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Author } from "../entity/author.entity";


@Resolver('authors')
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService) { }

    
    @Mutation(() => Author)
    async createAuthor(@Args('data') data: CreateAuthorDTO) {
        return this.authorService.create(data);
    }


    @Query(()=> [Author])
    async listAuthors() {
        return this.authorService.list();
    }


    @Query(()=> Author)
    async showAuthor(@Args('id') id: number) {
        return this.authorService.show(id);
    }


    @Mutation(() => Author)
    async updatePartialAuthor(@Args('data') data: UpdatePatchAuthorDTO, @Args('id') id: number) {
        return this.authorService.updatePartial(id, data);
    }


    @Mutation(() => Boolean)
    async deleteAuthor(@Args('id') id: number) {
        return {
            success: await this.authorService.delete(id),
        };
    }


}