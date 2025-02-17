export class Api {
  static baseUrl = "https://pravovaporada.api.keycrm.app";

  static getTasksUri = () => {
    return `/tasks/search?query=ddddddddddddd&filters%5Btasks%5D=all&filters%5Btab%5D=search&page=1&per_page=15`;
  };

  static getToken() {
    return window.localStorage.authToken;
  }

  static async fetch(uri: string, method = undefined, body = undefined) {
    const options = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      } as HeadersInit,
      method: method,
      body: body,
    };

    let res: Response;
    try {
      res = await fetch(this.baseUrl + uri, options);
    } catch (error: any) {
      return { error };
    }

    const status = res.status;
    const text = await res.text();

    if (!res.headers.get("content-type")?.includes("application/json")) {
      return { error: new Error("Not json type") };
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch (error: any) {
      return { error };
    }

    if (res.ok) {
      return { status, json, text };
    } else {
      return { error: new Error("Not successful request") };
    }
  }

  static searchTasks() {}
}
