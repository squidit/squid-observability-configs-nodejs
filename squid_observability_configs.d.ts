declare module "squid_observability_configs" {
    export = ObservabilityConfigs;
    /**
     * @typedef {Object} ServiceAccountCredentials
     * @property {string} [type]
     * @property {string} [project_id]
     * @property {string} [private_key_id]
     * @property {string} [private_key]
     * @property {string} [client_email]
     * @property {string} [client_id]
     * @property {string} [auth_uri]
     * @property {string} [token_uri]
     * @property {string} [auth_provider_x509_cert_url]
     * @property {string} [client_x509_cert_url]
     */
    /**
     * @typedef {Object} ServiceContext
     * @property {'production' | 'staging' | 'local' | 'test' | string & {}} environment
     * @property {string} service
     * @property {string} version
     * @property {string} applicationName
     */
    /**
     * @typedef {Object} SourceReference
     * @property {string} [repository]
     * @property {string} [revisionId]
     */
    /**
     * @typedef {Object} ObservabilitySettings
     * @property {string} projectId
     * @property {'production' | 'staging' | 'local' | 'test' | string & {}} environment
     * @property {string} applicationName
     * @property {string} version
     * @property {string} [credentialsFilename]
     * @property {string} [credentialsStringifiedObject]
     * @property {ServiceAccountCredentials} [credentialsObject]
     * @property {string} [applicationRepository]
     * @property {string} [applicationRevisionId]
    
     */
    class ObservabilityConfigs {
        /**
         * @param {ObservabilityConfigs} observabilityConfigs
         * @returns {ObservabilityConfigs}
         */
        static SetGlobalConfig(observabilityConfigs: ObservabilityConfigs): ObservabilityConfigs;
        /** @returns {ObservabilityConfigs} */
        static _GetGlobalConfig(): ObservabilityConfigs;
        /** @returns {string} */
        static get projectId(): string;
        /** @returns {{credentials: ServiceAccountCredentials} | {keyFilename: string}} */
        static get credentials(): {
            credentials: ServiceAccountCredentials;
        } | {
            keyFilename: string;
        };
        /** @returns {ServiceContext} */
        static get serviceContext(): ServiceContext;
        /** @returns {SourceReference} */
        static get sourceReference(): SourceReference;
        /**
         * @param {ObservabilitySettings} observabilitySettings
         */
        constructor(observabilitySettings: ObservabilitySettings);
        _projectId: string;
        /** @type {ServiceContext} */
        _serviceContext: ServiceContext;
        /** @type {SourceReference} */
        _sourceReference: SourceReference;
        _credentials: {
            keyFilename: string;
            credentials?: undefined;
        } | {
            credentials: any;
            keyFilename?: undefined;
        };
        /** @returns {string} */
        get projectId(): string;
        /** @returns {{credentials: ServiceAccountCredentials} | {keyFilename: string}} */
        get credentials(): {
            credentials: ServiceAccountCredentials;
        } | {
            keyFilename: string;
        };
        /** @returns {ServiceContext} */
        get serviceContext(): ServiceContext;
        /** @returns {SourceReference} */
        get sourceReference(): SourceReference;
    }
    namespace ObservabilityConfigs {
        export { ServiceAccountCredentials, ServiceContext, SourceReference, ObservabilitySettings };
    }
    type ServiceAccountCredentials = {
        type?: string | undefined;
        project_id?: string | undefined;
        private_key_id?: string | undefined;
        private_key?: string | undefined;
        client_email?: string | undefined;
        client_id?: string | undefined;
        auth_uri?: string | undefined;
        token_uri?: string | undefined;
        auth_provider_x509_cert_url?: string | undefined;
        client_x509_cert_url?: string | undefined;
    };
    type ServiceContext = {
        environment: "production" | "staging" | "local" | "test" | (string & {});
        service: string;
        version: string;
        applicationName: string;
    };
    type SourceReference = {
        repository?: string | undefined;
        revisionId?: string | undefined;
    };
    type ObservabilitySettings = {
        projectId: string;
        environment: "production" | "staging" | "local" | "test" | (string & {});
        applicationName: string;
        version: string;
        credentialsFilename?: string | undefined;
        credentialsStringifiedObject?: string | undefined;
        credentialsObject?: ServiceAccountCredentials | undefined;
        applicationRepository?: string | undefined;
        applicationRevisionId?: string | undefined;
    };
}
//# sourceMappingURL=squid_observability_configs.d.ts.map