import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TargetCredential } from './target-credential.entity';
import { TestCase } from './test-case.entity';

export enum ProjectStatus {
  DRAFT = 'DRAFT',
  ANALYZING = 'ANALYZING',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  EXECUTING = 'EXECUTING',
  COMPLETED = 'COMPLETED',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner_id: string; // UUID from Auth Service

  @Column()
  name: string;

  @Column()
  target_url: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.DRAFT,
  })
  status: ProjectStatus;

  @OneToMany(() => TargetCredential, (credential) => credential.project)
  credentials: TargetCredential[];

  @OneToMany(() => TestCase, (testCase) => testCase.project)
  testCases: TestCase[];
}
