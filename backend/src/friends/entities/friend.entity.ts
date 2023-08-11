import { User } from 'src/user/entities/user.entity'
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	OneToMany,
} from 'typeorm'

@Entity()
export class Friend {
	@PrimaryGeneratedColumn({ name: 'friend_id' })
	id: number

	@Column()
	email: string

	@ManyToOne(() => User, (user) => user.friends)
	@JoinColumn({ name: 'user_id' })
	user: User

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
