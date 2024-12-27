import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';


@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService) {}

    async createBook(user_id: number, createBookDto: CreateBookDto) {
        const { title, description, genre, pages, progress } =  createBookDto;

        // Create a book in db
        const book = await this.prisma.book.create({
            data: {
                user_id,
                title,
                description,
                genre,
                pages,
                progress,
            },
        });

        return {
            message: 'Book created successfully!',
            data: book,
        };
    }
}
