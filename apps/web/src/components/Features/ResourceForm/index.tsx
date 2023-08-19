import { useState } from "react";
import LabelledInput from "../../Common/Inputs/LabelledInput";
import { resourcesService } from "../../../services/http";

export default function ResourceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [checkFrequency, setCheckFrequency] = useState(0);
  const [notifyTo, setNotifyTo] = useState("");

  const clearInputs = () => {
    setName("");
    setDescription("");
    setUrl("");
    setAccessToken("");
    setCheckFrequency(0);
    setNotifyTo("");
  };

  const handleResourceSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await resourcesService.createResource({
      name,
      description,
      url,
      accessToken,
      checkFrequency,
      notifyTo,
    });
    setIsLoading(false);
    clearInputs();
    document.location.reload();
  };

  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl mb-2 tracking-wide font-light">Add new API</h1>
      <form className="flex flex-col gap-1" onSubmit={handleResourceSubmit}>
        <LabelledInput
          label="Name"
          inputType="text"
          name={name}
          placeholder="User service"
          required={true}
          onChange={(event) => setName(event.target.value)}
        />
        <LabelledInput
          label="Description (Optional)"
          inputType="text"
          name={description}
          placeholder="This API is responsible for user management"
          onChange={(event) => setDescription(event.target.value)}
        />
        <LabelledInput
          label="Url"
          inputType="text"
          name={url}
          placeholder="https://api-monitoring/api/health"
          required={true}
          onChange={(event) => setUrl(event.target.value)}
        />
        <LabelledInput
          label="Access token (Optional)"
          inputType="text"
          name={accessToken}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          onChange={(event) => setAccessToken(event.target.value)}
        />
        <LabelledInput
          label="Check Frequency (ms)"
          inputType="number"
          name={checkFrequency}
          placeholder="15000"
          required={true}
          onChange={(event) => setCheckFrequency(Number(event.target.value))}
        />
        <LabelledInput
          label="Notify To"
          inputType="email"
          name={notifyTo}
          placeholder="john.doe@email.com"
          required={true}
          onChange={(event) => setNotifyTo(event.target.value)}
        />

        <button
          className="bg-blue-500 text-white p-2 mt-2 hover:bg-blue-600"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add"}
        </button>
      </form>
    </div>
  );
}
