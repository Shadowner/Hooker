import { Entity, ObjectIdColumn, ObjectId, Column, BaseEntity } from "typeorm"

@Entity()
export class UserModel extends BaseEntity {

    @ObjectIdColumn({ type: 'uuid' })
    id!: ObjectId

    @Column({ type: 'varchar' })
    name!: number

    @Column({ type: 'varchar', unique: true, })
    mail!: number

    @Column({ type: 'varchar' })
    password!: string
}
