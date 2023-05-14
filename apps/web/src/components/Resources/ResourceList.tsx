import { Resource } from "../../types/resource";
import ResourceItem from "./ResourceItem";

type ResourceListProps = {
  resources: Resource[];
};

export default function ResourceList({ resources }: ResourceListProps) {
  return (
    <div className="p-4">
      {resources.map((resource) => (
        <ResourceItem key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
