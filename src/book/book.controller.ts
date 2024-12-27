import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import {AuthGuard} from '../auth/auth.guard';

@Controller('book')
export class BookController {
    constructor (private readonly bookService: BookService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createBook(@Req() req, @Body() createBookDto: CreateBookDto) {
        const user_id = req.user.id;
        const result = await this.bookService.createBook(user_id, createBookDto);
        return result
    }
}
