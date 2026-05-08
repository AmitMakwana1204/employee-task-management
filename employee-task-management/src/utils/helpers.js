export const capitalizeText = (text) => {

  if (!text) return "";

  return text.charAt(0).toUpperCase() +
    text.slice(1);
};

// Generate Random ID
export const generateId = () => {

  return Math.floor(
    Math.random() * 100000
  );
};