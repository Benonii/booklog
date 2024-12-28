import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    full_name?: string;

    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsEmail()
    email?: string;
}