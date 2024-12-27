import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Email or username is required' })
    email_or_username: string; // Either email or username

    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;
}