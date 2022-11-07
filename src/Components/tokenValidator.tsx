export const tokenValidator = (): any => {
  return localStorage.getItem("ACCESS_TOKEN") ? true : false;
};
