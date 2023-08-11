import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email,
			},
		})
		if (existUser)
			throw new BadRequestException('Пользователь с таким Email уже существует')

		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
		})

		const token = this.jwtService.sign({ email: createUserDto.email })

		return { user, token }
	}

	async findAll() {
		return await this.userRepository.find()
	}

	async findOne(email: string) {
		return await this.userRepository.findOne({
			where: {
				email,
			},
		})
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const list = await this.userRepository.findOne({
			where: { id },
		})

		if (!list) throw new NotFoundException('Такого аккаунта вы не создавали')
		return await this.userRepository.update(id, updateUserDto)
	}

	async remove(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
		})

		if (!user) throw new NotFoundException('Такого аккаунта вы не создавали')

		return await this.userRepository.delete(id)
	}
}
