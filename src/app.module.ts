import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    PostModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
