interface ServiceContext {
    environment: string;
    service: string;
    version: string;
    applicationName: string;
}
interface SourceReference {
    repository: string;
    revisionId: string;
}
/** Shape stored on instances for Google client options */
type ObservabilityCredentialsWrapper = {
    credentials: Record<string, unknown>;
} | {
    keyFile: string;
    keyFilename: string;
};
declare class ObservabilityConfigs {
    private readonly _projectId;
    private _credentials;
    private readonly _serviceContext;
    private readonly _sourceReference;
    constructor(projectId: string, credentials: string | Record<string, unknown>, environment: string, applicationName: string, version: string, applicationRepository: string, applicationRevisionId: string);
    get projectId(): string;
    get credentials(): ObservabilityCredentialsWrapper;
    get serviceContext(): ServiceContext;
    get sourceReference(): SourceReference;
    static SetGlobalConfig(observabilityConfigs: ObservabilityConfigs): ObservabilityConfigs;
    static _GetGlobalConfig(): ObservabilityConfigs | undefined;
    static get projectId(): string;
    static get credentials(): ObservabilityCredentialsWrapper;
    static get serviceContext(): ServiceContext;
    static get sourceReference(): SourceReference;
}

export { ObservabilityConfigs, type ObservabilityCredentialsWrapper, type ServiceContext, type SourceReference, ObservabilityConfigs as default };
