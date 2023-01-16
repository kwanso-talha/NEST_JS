import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Comment } from '../comment/comment.entity'
import { User } from '../user/user.entity'

@Entity({ name: 'posts' })
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column()
	body: string;

	@Column()
	userId: string;

	@Column()
	image: string;

	@Column()
	timeToRead: number;

	@OneToMany(type => Comment, comment => comment.postId)
	commentedOn: Comment[];

	@OneToOne(type => User, user => user.id)
	postedBy: User[];









}
