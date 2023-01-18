import { Post } from "./post.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import CreatePost from '../DTO/createPostDTO';
import UpdatePost from '../DTO/updatePostDTO';
@Injectable()
export class PostService {

	constructor(
		@InjectRepository(Post)
		private postsRepository: Repository<Post>,

	) { }


	findAll(): Promise<Post[]> {
		return this.postsRepository.find();
	}

	findOne(id: string): Promise<Post> {
		return this.postsRepository.findOneBy({ id });
	}

	async remove(id: string): Promise<void> {
		await this.postsRepository.delete(id);
	}
	getAllPosts() {
		return this.postsRepository.find();
	}

	async createPost(post: CreatePost) {
		const newPost = this.postsRepository.create(post);
		await this.postsRepository.save(newPost);
		return newPost;
	}
	async updatePost(id: string, post: UpdatePost) {
		try {
			const result = await this.postsRepository
				.createQueryBuilder()
				.update()
				.set({
					title: post.title,
					body: post.body,
					timeToRead: post.timeToRead
				})
				.where('id = :id', { id })
				.execute();

			if (result.affected === 0) {
				return ('Post not found');
			}

			return await this.postsRepository.findOne({
				where: { id }
			});
		} catch (error) {
			console.log("Error: ", error);
		}
	}
	deletePost(id: string): Promise<any> {
		return this.postsRepository
			.createQueryBuilder()
			.delete()
			.from(Post)
			.where('id = :id', { id })
			.execute()
	}

}