import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project.entity';

export enum TestCaseStatus {
  SUGGESTED = 'SUGGESTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

@Entity('test_cases')
export class TestCase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column({
    type: 'enum',
    enum: TestCaseStatus,
    default: TestCaseStatus.SUGGESTED,
  })
  status: TestCaseStatus;

  @Column({ nullable: true })
  owasp_mapping: string;

  @ManyToOne(() => Project, (project) => project.testCases)
  project: Project;
}
