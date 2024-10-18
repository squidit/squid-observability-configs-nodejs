// @ts-ignore
const { SquidError } = require('squid-error')

const squidObservabilityConfigsUniqueSymbol = Symbol.for('squidObservabilityConfigsSingleton');
const globalSymbols = Object.getOwnPropertySymbols(global);

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

class ObservabilityConfigs
{
  /**
   * @param {ObservabilitySettings} observabilitySettings
   */
  constructor (observabilitySettings)
  {
    this._projectId = observabilitySettings.projectId;

    /** @type {ServiceContext} */
    this._serviceContext = {
      environment     : observabilitySettings.environment,
      service         : `${observabilitySettings.applicationName} - ${observabilitySettings.environment}`,
      version         : observabilitySettings.version,
      applicationName : observabilitySettings.applicationName
    };

    /** @type {SourceReference} */
    this._sourceReference = {
      repository : observabilitySettings.applicationRepository,
      revisionId : observabilitySettings.applicationRevisionId
    };

    if(observabilitySettings.credentialsFilename) {
      this._credentials = { keyFilename: observabilitySettings.credentialsFilename}
    }
    else if (observabilitySettings.credentialsStringifiedObject) {
      try {
        this._credentials = { credentials: JSON.parse(observabilitySettings.credentialsStringifiedObject) };
      }
      catch (error) {
        throw SquidError.Create({
          message : 'Invalid credentials string provided for the Squid Observability library',
          code    : 'SOC001',
          detail  : { 
            credentials: observabilitySettings.credentialsStringifiedObject,
            originalErrorMessage: error instanceof Error ? error.message : 'unknown error',
            originalErrorStack: error instanceof Error ? error.stack : 'unknown stack'
          },
          id      : 0
        })
      }
    }
    else if (observabilitySettings.credentialsObject) {
      this._credentials = { credentials: observabilitySettings.credentialsObject }
    }
    else {
      throw SquidError.Create({
        message : 'Invalid credentials object provided for the Squid Observability library',
        code    : 'SOC002',
        detail  : { observabilitySettings },
        id      : 0
      });
    }
  };

  /** @returns {string} */
  get projectId ()
  {
    return this._projectId;
  }


  /** @returns {{credentials: ServiceAccountCredentials} | {keyFilename: string}} */
  get credentials ()
  {
    return this._credentials;
  }

  /** @returns {ServiceContext} */
  get serviceContext ()
  {
    return this._serviceContext;
  }

  /** @returns {SourceReference} */
  get sourceReference ()
  {
    return this._sourceReference;
  }

  /**
   * @param {ObservabilityConfigs} observabilityConfigs
   * @returns {ObservabilityConfigs}
   */
  static SetGlobalConfig (observabilityConfigs)
  {

    if (!globalSymbols.includes(squidObservabilityConfigsUniqueSymbol))
      // @ts-ignore
      global[squidObservabilityConfigsUniqueSymbol] = observabilityConfigs;

    // @ts-ignore
    return global[squidObservabilityConfigsUniqueSymbol];
  }

  /** @returns {ObservabilityConfigs} */
  static _GetGlobalConfig ()
  {
    // @ts-ignore
    return global[squidObservabilityConfigsUniqueSymbol];
  }

  /** @returns {string} */
  static get projectId ()
  {
    return this._GetGlobalConfig().projectId;
  }

  /** @returns {{credentials: ServiceAccountCredentials} | {keyFilename: string}} */
  static get credentials ()
  {
    return this._GetGlobalConfig().credentials;
  }

  /** @returns {ServiceContext} */
  static get serviceContext ()
  {
    return this._GetGlobalConfig().serviceContext;
  }

  /** @returns {SourceReference} */
  static get sourceReference ()
  {
    return this._GetGlobalConfig().sourceReference;
  }
};

module.exports = ObservabilityConfigs;
