import "reflect-metadata";
import { DataSource } from 'typeorm';
import { UserModel } from '../models/UserModel';
import { AuditModel } from "../models/AuditModel";
import { RoleModel } from "../models/RoleModel";
import { WebhookHistoryModel } from "../models/WebhookHistoryModel";
import { WebhookModel } from "../models/WebhookModel";

class TypeOrm {

    private static singleton: TypeOrm;
    public static async create(): Promise<TypeOrm> {
        //TODO: Move this to a config file
        let datasource = await new DataSource({
            type: 'mongodb',
            host: '192.168.1.243',
            port: 27017,
            database: 'Hooker',
            synchronize: true,
            entities: [UserModel, AuditModel, RoleModel, WebhookHistoryModel, WebhookModel],
            migrations: [],
            subscribers: [],
            logging: true,
        }).initialize()
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