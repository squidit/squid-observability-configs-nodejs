import { SquidError } from "squid-error";
const squidObservabilityConfigsUniqueSymbol = /* @__PURE__ */ Symbol.for("squidObservabilityConfigsSingleton");
class ObservabilityConfigs {
  _projectId;
  _credentials;
  _serviceContext;
  _sourceReference;
  constructor(projectId, credentials, environment, applicationName, version, applicationRepository, applicationRevisionId) {
    this._projectId = projectId;
    this._serviceContext = {
      environment,
      service: `${applicationName} - ${environment}`,
      version,
      applicationName
    };
    this._sourceReference = {
      repository: applicationRepository,
      revisionId: applicationRevisionId
    };
    if (typeof credentials === "string" || Object.prototype.toString.call(credentials) === "[object String]") {
      try {
        const parsed = JSON.parse(String(credentials));
        this._credentials = {
          credentials: parsed
        };
      } catch {
        const path = String(credentials);
        this._credentials = {
          keyFile: path,
          keyFilename: path
        };
      }
    } else if (typeof credentials === "object" && credentials !== null) {
      this._credentials = {
        credentials
      };
    } else {
      throw SquidError.Create({
        message: "Invalid credentials provided for the Squid Observability library",
        code: "SQUID_OBSERVABILITY_CONFIGS_INVALID_CREDENTIALS",
        detail: String(credentials),
        id: 0
        // eslint-disable-next-line unicorn/no-useless-undefined -- Create typings require both arguments
      }, void 0);
    }
  }
  get projectId() {
    return this._projectId;
  }
  get credentials() {
    return this._credentials;
  }
  get serviceContext() {
    return this._serviceContext;
  }
  get sourceReference() {
    return this._sourceReference;
  }
  static SetGlobalConfig(observabilityConfigs) {
    const g = globalThis;
    if (!Reflect.has(globalThis, squidObservabilityConfigsUniqueSymbol)) {
      g[squidObservabilityConfigsUniqueSymbol] = observabilityConfigs;
    }
    return g[squidObservabilityConfigsUniqueSymbol];
  }
  static _GetGlobalConfig() {
    return globalThis[squidObservabilityConfigsUniqueSymbol];
  }
  static get projectId() {
    return this._GetGlobalConfig().projectId;
  }
  static get credentials() {
    return this._GetGlobalConfig().credentials;
  }
  static get serviceContext() {
    return this._GetGlobalConfig().serviceContext;
  }
  static get sourceReference() {
    return this._GetGlobalConfig().sourceReference;
  }
}
export {
  ObservabilityConfigs,
  ObservabilityConfigs as default
};
//# sourceMappingURL=squid-observability-configs.js.map