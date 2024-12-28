// src/book/dto/update-book.dto.ts
import { IsOptional, IsString, IsInt, IsPositive, MaxLength } from 'class-validator';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    pages?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    progress?: number;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    genre?: string;
}
