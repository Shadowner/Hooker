import type { ObjectId } from 'mongodb';
import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class RoleModel extends BaseEntity {
	@ObjectIdColumn({ type: 'uuid' })
	id!: ObjectId;

	@Column({ type: 'varchar', unique: true })
	name!: number;
}
