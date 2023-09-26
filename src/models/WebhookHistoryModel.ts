import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { WebhookHistoryStatus } from "../enum/WebhookHistoryStatus";


@Entity()
export class WebhookHistoryModel extends BaseEntity {

    @ObjectIdColumn({ type: 'uuid' })
    public id!: ObjectId;

    @ObjectIdColumn({ type: 'uuid' })
    public webhookId!: ObjectId;

    @Column({ type: 'date' })
    public start!: Date;

    @Column({ type: 'date' })
    public end?: Date;

    @Column({ type: "int" })
    public status!: WebhookHistoryStatus;

}