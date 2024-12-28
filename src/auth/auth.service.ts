import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtService,
        ) {}

    async signup(data: SignupDto) {
        const { full_name, username, email, password } = data;

        // Check if email already exists
        const existingUser = await this.prisma.user.findFirst({
            where: {OR: [{username}, {email}] }
        });

        if (existingUser) {
            const conflictField = existingUser.email === email ? 'Email' : 'Username'
            throw new HttpException(`${conflictField} is alread in use`, HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.prisma.user.create({
            data: {
                username,
                full_name,
                email,
                password: hashedPassword
            },
        });
    };

    async login(data: LoginDto) {
        const { email_or_username, password } = data;

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: email_or_username}, { username: email_or_username }],
            },
        });

        if (!user) {
            throw new HttpException("Email or username is not resigtered!", HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid email password combination', HttpStatus.UNAUTHORIZED);
        }

        const accessToken = await this.generateToken(user.id, user.email, user.full_name, user.username);

        return {
            message: "Login successful!",
            data: accessToken,
        }
    }

    private async generateToken(user_id: number, email: string, full_name: string, username: string) {
        const payload = { id: user_id, email, full_name, username };
        return {
            accessToken: await this.jwtService.signAsync(payload),
        }
    }
}
