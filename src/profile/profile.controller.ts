import { 
    Controller, Patch, Param,
    Body, ParseIntPipe, UseGuards, Req, Delete
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileService } from './profile.service';


@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Patch(":user_id")
    @UseGuards(AuthGuard)
    async updateProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
        const user_id = req.params['user_id'];
        const result = await this.profileService.updateProfile(user_id, updateProfileDto);
        return result;
    }

    @Delete(':user_id')
    @UseGuards(AuthGuard)
    async deleteBook(@Req() req) {
        const user_id = req.params['user_id'];
        const result = await this.profileService.deleteBook(user_id);
        return result;
    }
}
