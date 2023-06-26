const { SquidError } = require('squid-error');

const squidObservabilityConfigsUniqueSymbol = Symbol.for('squidObservabilityConfigsSingleton');
const globalSymbols = Object.getOwnPropertySymbols(global);

class ObservabilityConfigs
{
  constructor (projectId, credentials, environment, applicationName, version, applicationRepository, applicationRevisionId)
  {
    this._projectId = projectId;

    this._serviceContext = {};

    this._serviceContext.environment     = environment;
    this._serviceContext.service         = `${applicationName} - ${environment}`;
    this._serviceContext.version         = version;
    this._serviceContext.applicationName = applicationName;

    this._sourceReference = {};

    this._sourceReference.repository = applicationRepository;
    this._sourceReference.revisionId = applicationRevisionId;

    if (typeof credentials === 'string' || credentials instanceof String)
    {
      try
      {
        this._credentials = {
          credentials : JSON.parse(credentials)
        };
      }
      catch (error)
      {
        this._credentials = {
          keyFile     : credentials,
          keyFilename : credentials
        };
      }
    }
    else if (typeof credentials === 'object' && credentials !== null)
    {
      this._credentials = {
        credentials : credentials
      };
    }
    else
    {
      throw SquidError.Create({
        message : 'Invalid credentials provided for the Squid Observability library',
        code    : 'SQUID_OBSERVABILITY_CONFIGS_INVALID_CREDENTIALS',
        detail  : credentials,
        id      : 0
      });
    }
  };

  get projectId ()
  {
    return this._projectId;
  }

  get credentials ()
  {
    return this._credentials;
  }

  get serviceContext ()
  {
    return this._serviceContext;
  }

  get sourceReference ()
  {
    return this._sourceReference;
  }

  static SetGlobalConfig (observabilityConfigs)
  {
    const hasSymbol = (globalSymbols.indexOf(squidObservabilityConfigsUniqueSymbol) > -1);

    if (!hasSymbol)
      global[squidObservabilityConfigsUniqueSymbol] = observabilityConfigs;

    return global[squidObservabilityConfigsUniqueSymbol];
  }

  static _GetGlobalConfig ()
  {
    return global[squidObservabilityConfigsUniqueSymbol];
  }

  static get projectId ()
  {
    return this.#GetGlobalConfig().projectId;
  }

  static get credentials ()
  {
    return this.#GetGlobalConfig().credentials;
  }

  static get serviceContext ()
  {
    return this.#GetGlobalConfig().serviceContext;
  }

  static get sourceReference ()
  {
    return this.#GetGlobalConfig().sourceReference;
  }
};

module.exports = ObservabilityConfigs;
