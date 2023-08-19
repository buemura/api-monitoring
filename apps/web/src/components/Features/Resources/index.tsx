import FetchFailError from "../../Common/Errors/FetchFailError";
import Loader from "../../Common/Loaders";
import NoResources from "./NoResources";
import ResourceList from "./ResourceList";
import { useResourcesFetch } from "./hooks/useResourcesFetch";

export default function Resources() {
  const { isLoading, hasError, resources } = useResourcesFetch();

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return <FetchFailError />;
  }

  if (!resources.length) {
    return <NoResources />;
  }

  return <ResourceList resources={resources} />;
}
