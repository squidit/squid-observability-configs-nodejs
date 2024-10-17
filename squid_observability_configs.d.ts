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
        /** @returns {{credentials: ServiceAccountCredentials}} */
        static get credentials(): {
            credentials: ServiceAccountCredentials;
        };
        /** @returns {ServiceContext} */
        static get serviceContext(): ServiceContext;
        /** @returns {SourceReference} */
        static get sourceReference(): SourceReference;
        /**
         * @param {string} projectId
         * @param {string | object} credentials
         * @param {'production' | 'staging' | 'local' | 'test' | string & {}} environment
         * @param {string} applicationName
         * @param {string} version
         * @param {string} [applicationRepository]
         * @param {string} [applicationRevisionId]
         */
        constructor(projectId: string, credentials: string | object, environment: "production" | "staging" | "local" | "test" | (string & {}), applicationName: string, version: string, applicationRepository?: string | undefined, applicationRevisionId?: string | undefined);
        _projectId: string;
        /** @type {ServiceContext} */
        _serviceContext: ServiceContext;
        /** @type {SourceReference} */
        _sourceReference: SourceReference;
        /** @type {{credentials: ServiceAccountCredentials}} */
        _credentials: {
            credentials: ServiceAccountCredentials;
        };
        /** @returns {string} */
        get projectId(): string;
        /** @returns {{credentials: ServiceAccountCredentials}} */
        get credentials(): {
            credentials: ServiceAccountCredentials;
        };
        /** @returns {ServiceContext} */
        get serviceContext(): ServiceContext;
        /** @returns {SourceReference} */
        get sourceReference(): SourceReference;
    }
    namespace ObservabilityConfigs {
        export { ServiceAccountCredentials, ServiceContext, SourceReference };
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
}
//# sourceMappingURL=squid_observability_configs.d.ts.map