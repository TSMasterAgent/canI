export class ProjectCreatedEvent {
  constructor(
    public readonly projectId: string,
    public readonly ownerId: string,
    public readonly targetUrl: string,
  ) {}
}

export class AnalysisRequestedEvent {
  constructor(public readonly projectId: string) {}
}

export class TestCasesGeneratedEvent {
  constructor(
    public readonly projectId: string,
    public readonly testCases: any[],
  ) {}
}

export class ExecutionRequestedEvent {
  constructor(
    public readonly projectId: string,
    public readonly testCaseIds: string[],
  ) {}
}
