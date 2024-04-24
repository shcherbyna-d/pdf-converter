const TextInput = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-24 p-2 border-2 border-blue-500 rounded"
      placeholder="Enter text to convert..."
    />
  );
};

export default TextInput;
