import questionIcon from "../../assets/question.png";

export default function NoResources() {
  return (
    <div className="p-4">
      <div className="bg-white flex items-center p-4">
        <img className="pr-4" src={questionIcon} alt="icon" />
        <span className="text-xl">No API registered yet.</span>
      </div>
    </div>
  );
}
