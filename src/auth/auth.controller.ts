import { Body, Post, Controller, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        await this.authService.signup(signupDto);
        return { message: 'User registered successfully!' }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);
        return result;
    }

    @Get('me')
    @UseGuards(AuthGuard)
    async getProfile(@Req() req) {
        const { full_name, email, username } = req.user;

        return {
            data: { full_name, email, username }
        }
    }
}
