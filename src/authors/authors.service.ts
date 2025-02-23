import { Injectable } from '@nestjs/common';
import { Author } from './models/author.model';
import { Post } from './models/post.model';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', posts: [] },
    { id: 2, firstName: 'Jane', lastName: 'Doe', posts: [] },
  ];

  private posts: Post[] = [
    { id: 1, title: 'First Post', content: 'Hello World', },
    { id: 2, title: 'Second Post', content: 'NestJS is awesome', }
  ];

  findAll(): Author[] {
    return this.authors;
  }

  findPostsByAuthorId(authorId: number): Post[] {
    return this.posts.filter(post => post.id === authorId);
  }
}
