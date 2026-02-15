import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { Project } from '../entities/project.entity';
import { TargetCredential } from '../entities/target-credential.entity';
import { TestCase } from '../entities/test-case.entity';
import { IngestedDocument, IngestedDocumentDocument } from '../entities/ingested-document.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(TargetCredential)
    private credentialsRepository: Repository<TargetCredential>,
    @InjectRepository(TestCase)
    private testCasesRepository: Repository<TestCase>,
    @InjectModel(IngestedDocument.name)
    private ingestedDocumentModel: Model<IngestedDocumentDocument>,
    @Inject('ORCHESTRATOR_SERVICE') private orchestratorClient: ClientProxy,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectsRepository.findOne({ where: { id }, relations: ['credentials', 'testCases'] });
  }

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectsRepository.create(projectData);
    const savedProject = await this.projectsRepository.save(project);
    this.orchestratorClient.emit('project_created', {
      projectId: savedProject.id,
      ownerId: savedProject.owner_id,
      targetUrl: savedProject.target_url,
    });
    return savedProject;
  }

  async addCredentials(projectId: string, credentialData: Partial<TargetCredential>): Promise<TargetCredential> {
    const project = await this.findOne(projectId);
    if (!project) throw new Error('Project not found');
    const credential = this.credentialsRepository.create({ ...credentialData, project });
    return this.credentialsRepository.save(credential);
  }

  async ingestDocument(projectId: string, docData: Partial<IngestedDocument>): Promise<IngestedDocument> {
    const doc = new this.ingestedDocumentModel({ ...docData, project_id: projectId });
    return doc.save();
  }

  async getTestCases(projectId: string): Promise<TestCase[]> {
    return this.testCasesRepository.find({ where: { project: { id: projectId } } });
  }
}
