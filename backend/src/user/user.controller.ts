import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

// http://localhost:3001/api/user
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// http://localhost:3001/api/user
	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	// http://localhost:3001/api/user
	@Get()
	findAll() {
		return this.userService.findAll()
	}

	// http://localhost:3001/api/user/2
	// @Get(':id')
	// findOne(@Param('id') id: string) {
	//   return this.userService.findOne(+id)
	// }

	// http://localhost:3001/api/user/2
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto)
	}

	// http://localhost:3001/api/user/2
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id)
	}
}
