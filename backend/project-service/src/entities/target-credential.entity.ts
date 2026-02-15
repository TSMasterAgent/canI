import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project.entity';

@Entity('target_credentials')
export class TargetCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_name: string;

  @Column({ type: 'json' })
  credential_set: any;

  @Column()
  set_index: number;

  @ManyToOne(() => Project, (project) => project.credentials)
  project: Project;
}
