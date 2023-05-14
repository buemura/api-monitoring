import { Resource } from "../../types/resource";

const baseUrl = "http://localhost:8080/api";

async function getAll(): Promise<Resource[]> {
  const res = await fetch(`${baseUrl}/resources`);
  return res.json();
}

export const resourcesService = {
  getAll,
};
