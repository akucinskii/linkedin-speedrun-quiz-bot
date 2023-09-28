const formatString = (str: string) => {
  return str.replace(/-/g, "").replace(/\s/g, "");
};

export default formatString;
