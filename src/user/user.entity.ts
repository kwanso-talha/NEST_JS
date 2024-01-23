import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity'
import { Field, ObjectType } from '@nestjs/graphql';
@Entity({ name: 'users' })
@ObjectType()
export class User {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ default: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(type => Post, post => post.userId)
  posts: Post[];

  @OneToMany(type => Comment, comment => comment.userId)
  comments: Comment[];
}
