import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateFriendDto } from './dto/create-friend.dto'
import { UpdateFriendDto } from './dto/update-friend.dto'
import { Friend } from './entities/friend.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class FriendsService {
	constructor(
		@InjectRepository(Friend)
		private readonly friendRepository: Repository<Friend>,
	) {}

	async create(createFriendDto: CreateFriendDto, id: number) {
		const isExist = await this.friendRepository.findBy({
			user: { id },
			email: createFriendDto.email,
		})

		if (isExist.length)
			throw new BadRequestException('Вы уже добавили этого друга!')

		const newFriend = {
			email: createFriendDto.email,
			user: {
				id,
			},
		}
		return this.friendRepository.save(newFriend)
	}

	async findAll(id: number) {
		return await this.friendRepository.find({
			where: {
				user: { id },
			},
		})
	}

	findOne(id: number) {
		return `This action returns a #${id} friend`
	}

	update(id: number, updateFriendDto: UpdateFriendDto) {
		return `This action updates a #${id} friend`
	}

	remove(id: number) {
		return `This action removes a #${id} friend`
	}
}
