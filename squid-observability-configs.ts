import { SquidError } from 'squid-error'

const squidObservabilityConfigsUniqueSymbol = Symbol.for('squidObservabilityConfigsSingleton')

export interface ServiceContext {
  environment: string
  service: string
  version: string
  applicationName: string
}

export interface SourceReference {
  repository: string
  revisionId: string
}

/** Shape stored on instances for Google client options */
export type ObservabilityCredentialsWrapper
  = | { credentials: Record<string, unknown> }
    | { keyFile: string, keyFilename: string }

type GlobalWithObs = typeof globalThis & {
  [squidObservabilityConfigsUniqueSymbol]?: ObservabilityConfigs
}

export default class ObservabilityConfigs {
  private readonly _projectId: string
  private _credentials: ObservabilityCredentialsWrapper
  private readonly _serviceContext: ServiceContext
  private readonly _sourceReference: SourceReference

  constructor(
    projectId: string,
    credentials: string | Record<string, unknown>,
    environment: string,
    applicationName: string,
    version: string,
    applicationRepository: string,
    applicationRevisionId: string,
  ) {
    this._projectId = projectId

    this._serviceContext = {
      environment,
      service: `${applicationName} - ${environment}`,
      version,
      applicationName,
    }

    this._sourceReference = {
      repository: applicationRepository,
      revisionId: applicationRevisionId,
    }

    if (typeof credentials === 'string' || Object.prototype.toString.call(credentials) === '[object String]') {
      try {
        const parsed: unknown = JSON.parse(String(credentials))
        this._credentials = {
          credentials: parsed as Record<string, unknown>,
        }
      }
      catch {
        const path = String(credentials)
        this._credentials = {
          keyFile: path,
          keyFilename: path,
        }
      }
    }
    else if (typeof credentials === 'object' && credentials !== null) {
      this._credentials = {
        credentials,
      }
    }
    else {
      throw SquidError.Create({
        message: 'Invalid credentials provided for the Squid Observability library',
        code: 'SQUID_OBSERVABILITY_CONFIGS_INVALID_CREDENTIALS',
        detail: String(credentials),
        id: 0,
      // eslint-disable-next-line unicorn/no-useless-undefined -- Create typings require both arguments
      }, undefined)
    }
  }

  get projectId(): string {
    return this._projectId
  }

  get credentials(): ObservabilityCredentialsWrapper {
    return this._credentials
  }

  get serviceContext(): ServiceContext {
    return this._serviceContext
  }

  get sourceReference(): SourceReference {
    return this._sourceReference
  }

  static SetGlobalConfig(observabilityConfigs: ObservabilityConfigs): ObservabilityConfigs {
    const g = globalThis as GlobalWithObs
    // Always overwrite so callers are not stuck behind a stale or empty singleton
    // (e.g. duplicate installs, hot reload, or first caller that skipped assignment).
    g[squidObservabilityConfigsUniqueSymbol] = observabilityConfigs
    return observabilityConfigs
  }

  static _GetGlobalConfig(): ObservabilityConfigs | undefined {
    return (globalThis as GlobalWithObs)[squidObservabilityConfigsUniqueSymbol]
  }

  static get projectId(): string {
    return this._GetGlobalConfig()!.projectId
  }

  static get credentials(): ObservabilityCredentialsWrapper {
    return this._GetGlobalConfig()!.credentials
  }

  static get serviceContext(): ServiceContext {
    return this._GetGlobalConfig()!.serviceContext
  }

  static get sourceReference(): SourceReference {
    return this._GetGlobalConfig()!.sourceReference
  }
}

export { ObservabilityConfigs }
