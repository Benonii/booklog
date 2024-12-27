import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';


export class SignupDto {
    @IsNotEmpty({ message: 'Full name is required' })
    full_name: string;

    @IsOptional()
    username?: string;

    @IsEmail()
    email: string;

    @MinLength(8, { message: 'Password must be at least 8 characters'})
    password: string;
}