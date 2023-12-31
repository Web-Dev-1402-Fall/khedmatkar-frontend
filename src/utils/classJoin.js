const classJoin = (classNames) => {
  return classNames
    .filter((el) => el)
    .join(" ")
    .trim();
};
export default classJoin;
