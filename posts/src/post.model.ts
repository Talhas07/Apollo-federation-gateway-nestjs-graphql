import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  authorId: string;
}
