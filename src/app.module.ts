import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [AuthModule, ProfileModule],
  controllers: [AppController, BookController, ProfileController],
  providers: [AppService, PrismaService, BookService, ProfileService],
})
export class AppModule {}
