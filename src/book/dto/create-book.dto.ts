import { IsNotEmpty, IsOptional, IsInt, Min } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsOptional()
    description?: string

    @IsNotEmpty({ message: 'Genre is required' })
    genre: string;

    @IsInt({ message: "Pages must be an integer" })
    @Min(1, { message: 'Pages must be at least 1' })
    pages: number;

    @IsInt({ message: "Progress must be an integer" })
    @Min(0, { message: 'Progress cannot be less than 0' })
    progress: number;
}