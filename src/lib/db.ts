import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserModel } from './models/UserModel';
import { AuditModel } from './models/AuditModel';
import { RoleModel } from './models/RoleModel';
import { WebhookHistoryModel } from './models/WebhookHistoryModel';
import { WebhookModel } from './models/WebhookModel';
import { building } from '$app/environment';
import { MONGODB_DATABASE, MONGODB_URI } from '$env/static/private';

class TypeOrm {
	private static singleton: TypeOrm;
	public static async create(): Promise<TypeOrm> {
		//Doing this to prevent launching the db when sveltekit is building
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (building) return;

		//TODO: Move this to a config file
		const datasource = await new DataSource({
			type: 'mongodb',
			url: MONGODB_URI,
			database: MONGODB_DATABASE,
			useNewUrlParser: true,
			synchronize: true,
			entities: [UserModel, AuditModel, RoleModel, WebhookHistoryModel, WebhookModel],
			migrations: [],
			subscribers: [],
			logging: true
		})
			.initialize()
			.then((fulfilled) => {
				console.info('Data Source has been initialized!');
				return fulfilled;
			})
			.catch((err) => {
				console.error('Error during Data Source initialization', err);
				return null;
			});

		if (!datasource) {
			throw new Error('TypeOrm instance not created');
		}

		this.singleton = new TypeOrm(datasource);
		return this.singleton;
	}

	private instance: DataSource;
	private constructor(datasource: DataSource) {
		this.instance = datasource;
		// Private constructor to prevent external instantiation
	}

	public getDb(): DataSource {
		if (!this.instance) {
			throw new Error('TypeOrm instance not created');
		}

		return this.instance;
	}
}

export default await TypeOrm.create();
