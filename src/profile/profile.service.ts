import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';


@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async updateProfile(user_id: string, data: UpdateProfileDto) {
        const id = parseInt(user_id, 10); // Make sure id is a number

        if (isNaN(id)) {
            throw new HttpException('Invalid Book ID', HttpStatus.BAD_REQUEST);
        };

        const { username, email } = data;

        if (email) {
            const existingEmail = await this.prisma.user.findUnique({
                where: {email}
            });
            if (existingEmail && existingEmail.id !== id) {
                throw new HttpException('Email aleready in user', HttpStatus.CONFLICT);
            }
        }

        if (username) {
            const existingUsername = await this.prisma.user.findUnique({
                where: { username }, 
            });
            if (existingUsername && existingUsername.id !== id) {
                throw new HttpException('Username already in use', HttpStatus.CONFLICT);
            }
        }

        const updateUser = await this.prisma.user.update({
            where: { id },
            data,
        });

        return {
            message: 'Profile updated successfully',
            data: updateUser,
        };
    }

    async deleteBook(user_id: string) {
        const id = parseInt(user_id, 10); // Make sure id is a number

        if (isNaN(id)) {
            throw new HttpException('Invalid Book ID', HttpStatus.BAD_REQUEST);
        };

        const deletedUser = await this.prisma.user.delete({
            where: { id }
        });

        return {
            message: "User deleted successfully!",
            data: deletedUser,
        }
    }
}
