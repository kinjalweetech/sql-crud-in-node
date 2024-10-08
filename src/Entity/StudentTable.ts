import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("student") // Name of the table in MySQL
export class Student {
  @PrimaryGeneratedColumn() // Auto-generated primary key
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;
    affected: number;
}
