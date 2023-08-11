import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { FriendsService } from './friends.service'
import { CreateFriendDto } from './dto/create-friend.dto'
import { UpdateFriendDto } from './dto/update-friend.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('friends')
export class FriendsController {
	constructor(private readonly friendsService: FriendsService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createFriendDto: CreateFriendDto, @Req() req) {
		return this.friendsService.create(createFriendDto, +req.user.id)
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.friendsService.findAll(+req.user.id)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.friendsService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
		return this.friendsService.update(+id, updateFriendDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.friendsService.remove(+id)
	}
}
