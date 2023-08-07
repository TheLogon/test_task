import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateListDto {
  @IsNotEmpty()
  text: string
  @IsOptional()
  user?: User
}
