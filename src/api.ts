import { IRepo } from "./types";

const BASE_URL = "https://api.github.com/search/repositories";
const QUERY_STRING = "?q=javascript&sort=stars&order=desc&per_page=30&page=1";

interface IApiItem {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  owner: {
    login: string;
  };
  homepage: string;
  topics: string[];
}

class Api {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(options: { baseUrl: string; headers: HeadersInit }) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  private async _request<T>(url: RequestInfo, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...init,
      headers: this._headers,
    });

    if (!response.ok) {
      throw new Error(`Err: ${response.status}`);
    }

    return response.json();
  }

  async getRepos(): Promise<IRepo[]> {
    const searchURL = this._baseUrl + QUERY_STRING;

    const response = await this._request<{
      items: IApiItem[];
    }>(searchURL);

    const result: IRepo[] = [];

    for (const item of response.items) {
      const repo: IRepo = {
        id: item.id,
        name: item.name,
        description: item.description,
        stars: item.stargazers_count,
        forks: item.forks_count,
        owner: item.owner.login,
        url: item.homepage,
        topics: [...item.topics],
      };

      result.push(repo);
    }

    return result;
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization: "Bearer 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",
  },
});

export default api;
