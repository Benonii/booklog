import { Body, Controller, Post, Get, Req, UseGuards, Patch, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('book')
export class BookController {
    constructor (private readonly bookService: BookService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createBook(@Req() req, @Body() createBookDto: CreateBookDto) {
        const user_id = req.user.id;
        const result = await this.bookService.createBook(user_id, createBookDto);
        return result;
    }

    @Get()
    @UseGuards(AuthGuard)
    async getBooksByUser(@Req() req: any) {
        const user_id = req.user.id;
        const result = await this.bookService.getBooks(user_id);
        return result;
    }

    @Get(':book_id')
    @UseGuards(AuthGuard)
    async getBookByID(@Req() req) {
        const book_id = req.params['book_id'];
        const result = await this.bookService.getBookByID(book_id);
        return result;
    }

    @Patch(':book_id')
    @UseGuards(AuthGuard)
    async updateBook(@Req() req, @Body() updateBookDto: UpdateBookDto) {
        const book_id = req.params['book_id'];
        const result = await this.bookService.updateBook(book_id, updateBookDto);
        return result;
    }

    @Delete(':book_id')
    @UseGuards(AuthGuard)
    async deleteBook(@Req() req) {
        const book_id = req.params['book_id'];
        const result = await this.bookService.deleteBook(book_id);
        return result;
    }
}
