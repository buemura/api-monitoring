import { useEffect, useState } from "react";
import NoResources from "./NoResources";
import ResourceItem from "./ResourceItem";
import { resourcesService } from "../../services/http";
import { Resource } from "../../types/resource";

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);

  const fetchResources = async () => {
    const result = await resourcesService.getAll();
    setResources(result);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  if (!resources.length) {
    return <NoResources />;
  }

  return (
    <div className="p-4">
      {resources.map((resource) => (
        <ResourceItem key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
