import { Friend } from 'src/friends/entities/friend.entity'
import { List } from 'src/list/entities/list.entity'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	password: string

	@OneToMany(() => List, (list) => list.user, { onDelete: 'CASCADE' })
	lists: List[]

	@OneToMany(() => Friend, (friend) => friend.user, { onDelete: 'CASCADE' })
	friends: Friend[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
