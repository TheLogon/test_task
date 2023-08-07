import { User } from 'src/user/entities/user.entity'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm'

@Entity()
export class List {
  @PrimaryGeneratedColumn({ name: 'list_id' })
  id: number

  @Column()
  text: string

  @ManyToOne(() => User, (user) => user.lists)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
