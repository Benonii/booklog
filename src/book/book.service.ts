import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';


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

    async getBooks(user_id: number) {
        const books = await this.prisma.book.findMany({
            where: { user_id },
        });

        return {
            data: books,
        };
    };

    async getBookByID(book_id: string) {
        const id = parseInt(book_id, 10); // Make sure id is a number

        if (isNaN(id)) {
            throw new HttpException('Invalid Book ID', HttpStatus.BAD_REQUEST);
        }

        const book = await this.prisma.book.findFirst({
            where: { id }
        });

        if (!book) {
            throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }

        return {
            data: book
        };
    };

    async updateBook(book_id: string, updateBookDto: UpdateBookDto) {
        const id = parseInt(book_id, 10); // Make sure id is a number

        if (isNaN(id)) {
            throw new HttpException('Invalid Book ID', HttpStatus.BAD_REQUEST);
        }

        const existingBook = await this.prisma.book.findFirst({
            where: { id }
        });

        if(!existingBook) {
            throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }

        const updatedBook = await this.prisma.book.update({
            where: { id },
            data: updateBookDto,
        });

        return {
            message: "Book updated successfully",
            data: updatedBook,
        }
    }

    async deleteBook(book_id: string) {
        const id = parseInt(book_id, 10); // Make sure id is a number

        if (isNaN(id)) {
            throw new HttpException('Invalid Book ID', HttpStatus.BAD_REQUEST);
        }
        
        const existingBook = await this.prisma.book.findFirst({
            where: { id }
        });

        if(!existingBook) {
            throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        };

        const deletedBook = await this.prisma.book.delete({
            where: { id }
        });

        return {
            message: "Book deleted successfully!",
            data: deletedBook
        }
    }
}
