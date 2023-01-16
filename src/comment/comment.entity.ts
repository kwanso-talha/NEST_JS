
import { Post } from '../post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { User } from '../user/user.entity'

@Entity({ name: 'comments' })
export class Comment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	postId: string;



	@Column()
	userId: string;


	@Column()
	parentId: number;

	@Column()
	body: number;

	@OneToMany(type => Comment, comment => comment.parentId)
	reply: Comment[];

	@OneToMany(type => User, user => user.id)
	commentedBy: Comment[];

	@OneToMany(type => Post, post => post.id)
	commentedOn: Post[];



}
