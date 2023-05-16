import { Resource } from "../../types/resource";

const baseUrl = "/api";

async function getAll(): Promise<Resource[]> {
  const res = await fetch(`${baseUrl}/resources`);
  return res.json();
}

async function getById(id: string): Promise<Resource> {
  const res = await fetch(`${baseUrl}/resources/${id}`);
  return res.json();
}

async function checkResource(resourceId: string): Promise<Resource> {
  const res = await fetch(`${baseUrl}/resources/${resourceId}/check`);
  return res.json();
}

export const resourcesService = {
  getAll,
  getById,
  checkResource,
};
