import { useState } from "react";
import LabelledInput from "../../Common/Inputs/LabelledInput";

export default function ResourceForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [checkFrequency, setCheckFrequency] = useState(0);

  const handleResourceSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(name);
    console.log(description);
    console.log(url);
    console.log(accessToken);
    console.log(checkFrequency);
  };

  return (
    <div className="bg-white p-4">
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
          label="Description"
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
          label="Access token"
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

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 hover:bg-blue-600"
        >
          Add
        </button>
      </form>
    </div>
  );
}
