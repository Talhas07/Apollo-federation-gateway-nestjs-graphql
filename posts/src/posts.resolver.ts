import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Post } from './post.model';

@Resolver(() => Post)
export class PostsResolver {
  private posts = [
    { id: '1', title: 'Hello World', authorId: '1' },
    { id: '2', title: 'GraphQL Rocks', authorId: '2' },
  ];

  @Query(() => [Post])
  allposts() {
    return this.posts;
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.posts.find((post) => post.id === reference.id);
  }
}
