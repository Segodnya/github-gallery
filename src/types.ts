export interface IRepo {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  owner: string;
  url: string;
  topics: string[];
}
