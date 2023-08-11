import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateFriendDto {
	@IsNotEmpty()
	email: string
	@IsOptional()
	user?: User
}
