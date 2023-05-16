import { Resource } from "../../../types/resource";
import { formatDate, milisecondsToSeconds } from "../../../utils/date-time";
import upIcon from "../../../assets/up.png";
import downIcon from "../../../assets/down.png";
import { resourcesService } from "../../../services/http";
import useWebsocket from "../../../hooks/useWebsocket";
import Timer from "../../Common/Timer";
import { useEffect, useState } from "react";

type ResourceItemProps = {
  resource: Resource;
};

export default function ResourceItem({ resource: props }: ResourceItemProps) {
  const { refresh, setRefresh } = useWebsocket();
  const [resource, setResource] = useState(props);

  useEffect(() => {
    const fetchResource = async () => {
      const res = await resourcesService.getById(resource.id);
      setResource(res);
    };

    fetchResource();
    setRefresh(false);
  }, [refresh]);

  const handleCheckResource = async () => {
    await resourcesService.checkResource(resource.id);
  };

  return (
    <div
      key={resource.id}
      className="bg-white p-4 my-4 flex items-center justify-between"
    >
      <div className="flex items-center">
        <img
          className="w-10"
          alt="status"
          src={resource.status === "Up" ? upIcon : downIcon}
        />
        <span className="text-xl pl-6">{resource.name}</span>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col pr-32 float-right">
          <span>
            Last checked:{" "}
            {formatDate("yyyy-mm-dd hh-mm-ss", new Date(resource.lastCheck))}
          </span>
          <span>
            Check rate: {milisecondsToSeconds(resource.checkFrequency)}s
          </span>
        </div>

        <div className="pr-2">
          <Timer
            startTime={resource.lastCheck}
            rate={resource.checkFrequency}
          />
        </div>

        <button
          className="bg-blue-500 text-white p-1 rounded-md"
          onClick={handleCheckResource}
        >
          Test Now
        </button>
      </div>
    </div>
  );
}
