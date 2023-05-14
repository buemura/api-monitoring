import { Resource } from "../../types/resource";
import { formatDate, milisecondsToSeconds } from "../../utils/date-time";
import upIcon from "../../assets/up.png";
import downIcon from "../../assets/down.png";
import { resourcesService } from "../../services/http";

type ResourceItemProps = {
  resource: Resource;
};

export default function ResourceItem({ resource }: ResourceItemProps) {
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
