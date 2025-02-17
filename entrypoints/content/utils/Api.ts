export class Api {
  static baseUrl = "https://pravovaporada.api.keycrm.app";

  static getTaskNumberFromUrl(url: string) {
    const found = url.match(/\/tasks\/(?<taskNumber>\d+)$/);
    if (!found?.groups?.taskNumber)
      return { error: new Error(`Unable to match task number in url: ${url}`) };
    return { result: Number(found?.groups?.taskNumber) };
  }

  static getTaskUrl(taskNumber: number) {
    return this.baseUrl + `/tasks/${taskNumber}`;
  }

  static getToken() {
    return window.localStorage.authToken;
  }

  static async fetch(uri: string, method?: string, body?: string) {
    const options = {
      headers: {
        accept: "application/json, text/plain, */*",
        authorization: `Bearer ${this.getToken()}`,
        userlocale: "en",
      } as HeadersInit,
      method: method,
      body: body,
    };

    const url = uri.indexOf("https") === 0 ? uri : this.baseUrl + uri;

    let res: Response;
    try {
      res = await fetch(url, options);
    } catch (error: any) {
      return { error };
    }

    const status = res.status;
    const text = await res.text();

    const isJsonType = Boolean(
      res.headers.get("content-type")?.includes("application/json")
    );

    let json;
    if (isJsonType) {
      try {
        json = JSON.parse(text);
        return { status, json, text };
      } catch (error: any) {
        return { error };
      }
    } else {
      if (res.ok) {
        return { status, text };
      } else {
        return { error: new Error("Not successful request") };
      }
    }
  }

  static searchTasks() {}
}
