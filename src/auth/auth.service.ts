import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

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
        const { login, password } = data;

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: login}, { username: login }],
            },
        });

        if (!user) {
            throw new HttpException("Email or username is not resigtered!", HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid email password combination', HttpStatus.UNAUTHORIZED);
        }

        const { password: _, ...safeUser } = user; 
        return safeUser;
    }
}
