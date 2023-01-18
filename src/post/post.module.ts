import { Module } from '@nestjs/common';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtAccessStrategy } from '../jwt.acces.strategy'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';



@Module({

	imports: [TypeOrmModule.forFeature([Post]),
	PassportModule.register({ defaultStrategy: "jwt" }),

	JwtModule.register({
		signOptions: { expiresIn: '1d' },
		secret: process.env.ACCESS_TOKEN_SECRET || 'secret',
	}),
	JwtModule.register({
		signOptions: { expiresIn: '7d' },
		secret: process.env.REFRESH_TOKEN_SECRET || 'secret',
	}),
		PassportModule
	],
	providers: [PostService],
	controllers: [PostController],
	exports: [PostService]
})
export class PostModule {

}
