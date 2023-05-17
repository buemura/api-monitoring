import Resources from "./components/Features/Resources";
import ResourceForm from "./components/Features/ResourceForm";

export default function App() {
  return (
    <div className="w-screen h-screen bg-neutral-200 p-4">
      <h1 className="bg-white text-4xl p-4 mb-4 tracking-wide font-extralight">
        API Monitoring System
      </h1>
      <ResourceForm />
      <Resources />
    </div>
  );
}
