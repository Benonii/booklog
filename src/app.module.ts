import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';

@Module({
  imports: [AuthModule],
  controllers: [AppController, BookController],
  providers: [AppService, PrismaService, BookService],
})
export class AppModule {}
