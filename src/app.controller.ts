import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PostService } from './post.service';
import {  Post as PostModel } from '@prisma/client';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postService: PostService,
    ) {}

  @Get('feed')
  async getPublishedPosts(@Res()reply): Promise<void> {
    
    const users = await this.postService.posts({
      where: { published: true },
    });

    reply.send(users);

  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
