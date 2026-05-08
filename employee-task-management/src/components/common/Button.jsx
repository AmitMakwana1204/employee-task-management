function Button({
  text,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
      bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 
      cursor-pointer ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;