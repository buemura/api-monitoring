type LabelledInput = {
  label: string;
  inputType: string;
  name: any;
  placeholder: string;
  required?: boolean;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LabelledInput({
  label,
  inputType,
  name,
  placeholder,
  required,
  onChange,
}: LabelledInput) {
  const id = name + Date.parse(new Date().toString());

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        {label}
        <span className="text-red-500">{required && "*"}</span>
      </label>
      <input
        id={id}
        className="outline-none bg-neutral-100 p-1"
        required={required}
        type={inputType}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
