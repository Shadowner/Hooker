import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class WebhookModel extends BaseEntity {
	@ObjectIdColumn({ type: 'uuid' })
	id!: ObjectId;

	@Column({ type: 'varchar', unique: true })
	name!: number;

	@Column({ type: 'varchar' })
	description!: string;

	@Column({ type: 'varchar' })
	//EX : /diister/redeploy
	path!: string;

	@Column({ type: 'boolean' })
	enabled!: boolean;
}
