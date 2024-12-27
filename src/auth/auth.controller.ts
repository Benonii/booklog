import { Body, Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

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
}
