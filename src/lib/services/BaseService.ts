import db from '$lib/db';
import type { BaseEntity, Repository, EntityTarget } from 'typeorm';

const dataSource = db.getDb();

export default abstract class BaseService<Entity extends BaseEntity> {
	protected entity: EntityTarget<Entity>;

	constructor(entity: EntityTarget<Entity>) {
		this.entity = entity;
	}

	public get MongoRepository(): Repository<Entity> {
		return dataSource.getMongoRepository<Entity>(this.entity);
	}

	public get Repository(): Repository<Entity> {
		return dataSource.getRepository<Entity>(this.entity);
	}
}
