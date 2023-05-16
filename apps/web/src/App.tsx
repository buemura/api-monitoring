import Resources from "./components/Features/Resources";
import ResourceForm from "./components/Features/ResourceForm";

export default function App() {
  return (
    <div className="w-screen h-screen bg-neutral-200">
      <ResourceForm />
      <Resources />
    </div>
  );
}
