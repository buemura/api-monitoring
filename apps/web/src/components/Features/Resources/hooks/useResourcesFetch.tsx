import { useEffect, useState } from "react";
import { resourcesService } from "../../../../services/http";
import { Resource } from "../../../../types/resource";

export function useResourcesFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);

  const fetchResources = async () => {
    try {
      const result = await resourcesService.getAll();
      setResources(result);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchResources();
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    hasError,
    resources,
  };
}
