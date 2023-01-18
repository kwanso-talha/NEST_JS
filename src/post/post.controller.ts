import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards
} from '@nestjs/common';
import CreatePost from '../DTO/createPostDTO';
import updatePost from '../DTO/updatePostDTO';
import { PostService } from './post.service'
import { AuthenticationMiddleware } from '../Middlewares/isAuth';

@Controller('post')
export class PostController {
	constructor(private postService: PostService) { }
	@Get()
	getAllPosts() {
		return this.postService.getAllPosts();
	}


	@Post()
	async createPost(@Body() post: CreatePost) {
		return this.postService.createPost(post);
	}
	@Put(':id')
	async updatePost(@Param('id') id: string, @Body() post: updatePost) {
		return this.postService.updatePost(String(id), post);
	}
	@Delete(':id')
	async deletePost(@Param('id') id: string) {
		await this.postService.deletePost(id)
		return "Post deleted"
	}


}
