const isEmpty = (input) => {
  if (Array.isArray(input) && input.length === 0) return true;
  return false;
};

export default isEmpty