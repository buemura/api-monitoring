import { useState } from "react";

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
    <form action="su" onSubmit={handleResourceSubmit}>
      <input
        type="text"
        placeholder="name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        type="text"
        placeholder="url"
        required
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
      <input
        type="text"
        placeholder="accessToken"
        value={accessToken}
        onChange={(event) => setAccessToken(event.target.value)}
      />
      <input
        type="number"
        placeholder="checkFrequency"
        required
        value={checkFrequency}
        onChange={(event) => setCheckFrequency(Number(event.target.value))}
      />

      <button type="submit">Add</button>
    </form>
  );
}
