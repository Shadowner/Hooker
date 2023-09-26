import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";
import type { AuditTypeEnum } from "../enum/AuditTypeEnum";

@Entity()
export class AuditModel extends BaseEntity {

    @ObjectIdColumn({ type: 'uuid' })
    public id!: string;

    @ObjectIdColumn({ type: 'uuid' })
    public userId!: string;

    @Column({ type: 'int' })
    public action!: AuditTypeEnum;

    @Column({ type: 'varchar' })
    public message!: string;
}