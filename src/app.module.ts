import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PostService} from './post.service';
import { PrismaService } from './prisma.service';
import { HeroController } from './hero/hero.controllers';
import { UserModule } from './user/user.module';
import { KategoriModule } from './kategori/kategori.module';
@Module({
  imports: [UserModule, KategoriModule],
  controllers: [AppController,HeroController],
  providers: [AppService,PostService,PrismaService],
})
export class AppModule {}
