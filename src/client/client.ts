import api from "axios";

const backendUrl = "http://localhost:8000";

type Options = {
  url: string;
  data?: any;
};

class Client {
  private declare authorization: string;
  private declare basePath: string;
  private declare api: any;
  private declare timeout: number;

  constructor(config: { params?: Record<string, any>; data?: any }) {
    this.authorization = localStorage.getItem("token") || "";
    this.basePath = backendUrl;
    this.api = api.create({
      baseURL: this.basePath,
    });
    this.timeout = 180000; // prettier-ignore
  }

  getAuth(options: Options) {
    let configOptions = {
      ...options,
      baseUrl: this.basePath,
      timeout: this.timeout,
    };

    let path = this.basePath + options.url;

    let headers = {
      "x-access-token": this.authorization,
      "Content-type": "application/json",
    };

    let config = {
      ...configOptions,
      headers: headers,
    };

    return api.get(path, config);
  }

  putAuth(options: Options) {
    let configOptions = {
      ...options,
      baseUrl: this.basePath,
      timeout: this.timeout,
    };

    let path = this.basePath + options.url;

    let headers = {
      "x-access-token": this.authorization,
      "Content-type": "application/json",
    };

    let config = {
      ...configOptions,
      headers: headers,
    };

    return api.put(path, config.data, config);
  }

  postAuth(options: Options) {
    let configOptions = {
      ...options,
      baseUrl: this.basePath,
      timeout: this.timeout,
    };

    let path = this.basePath + options.url;

    let headers = {
      "x-access-token": this.authorization,
      "Content-type": "application/json",
    };

    let config = {
      ...configOptions,
      headers: headers,
    };

    return api.post(path, config.data, config);
  }

  postRaw(options: Options) {
    let configOptions = {
      ...options,
      baseUrl: this.basePath,
      timeout: this.timeout,
    };

    let path = this.basePath + options.url;

    let headers = {
      "Content-type": "application/json",
    };

    let config = {
      ...configOptions,
      headers: headers,
    };

    return api.post(path, config.data, config);
  }
}

export default Client;
