import { Resource } from "../../types/resource";
import { milisecondsToSeconds } from "../../utils/date-time";

type ResourceItemProps = {
  resource: Resource;
};

export default function ResourceItem({ resource }: ResourceItemProps) {
  return (
    <div key={resource.id} className="bg-white p-4 my-4 flex items-center">
      <img
        className="w-10"
        alt="status"
        src={
          resource.status === "Up"
            ? "https://imagepng.org/wp-content/uploads/2019/12/check-icone-1-scaled.png"
            : "https://icon-library.com/images/cancel-icon-png/cancel-icon-png-22.jpg"
        }
      />
      <span className="text-xl pl-2">{resource.name}</span>
      <div className="flex flex-col pl-2">
        <span>Last checked: {resource.lastCheck.toString()}</span>
        <span>
          Check rate (sec): {milisecondsToSeconds(resource.checkFrequency)}
        </span>
      </div>
    </div>
  );
}
