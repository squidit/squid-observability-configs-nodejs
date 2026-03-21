"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var squid_observability_configs_exports = {};
__export(squid_observability_configs_exports, {
  ObservabilityConfigs: () => ObservabilityConfigs,
  default: () => ObservabilityConfigs
});
module.exports = __toCommonJS(squid_observability_configs_exports);
var import_squid_error = require("squid-error");
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
      throw import_squid_error.SquidError.Create({
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
    g[squidObservabilityConfigsUniqueSymbol] = observabilityConfigs;
    return observabilityConfigs;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ObservabilityConfigs
});
//# sourceMappingURL=squid-observability-configs.cjs.map