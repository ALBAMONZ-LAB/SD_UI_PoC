import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Author } from './models/author.model';
import { Post } from './models/post.model';
import { AuthorsService } from './authors.service';

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(returns => [Author])
  getAuthors() {
    return this.authorsService.findAll();
  }

  @ResolveField(returns => [Post])
  posts(@Parent() author: Author) {
    return this.authorsService.findPostsByAuthorId(author.id);
  }
}
