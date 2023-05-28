declare module 'squid-observability-configs' {
  export class SquidObservabilityConfigs {
    #private;
    constructor(projectId: any, credentials: any, environment: any, applicationName: any, version: any, applicationRepository?: any, applicationRevisionId?: any);
    get projectId(): any;
    get credentials(): any;
    get serviceContext(): any;
    get sourceReference(): any;
    static SetGlobalConfig(observabilityConfigs: any): any;
    static get projectId(): any;
    static get credentials(): any;
    static get serviceContext(): any;
    static get sourceReference(): any;
  }
}