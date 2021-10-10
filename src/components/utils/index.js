export const validateEmail = (content) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
  return (
    content && regex.test(String(content).replace(/\s+/g, "").toLowerCase())
  );
};

export const validatePassword = (content) => {
  return content && content.length >= 8;
};

export const APP_GOOGLE =
  "177876099439-9c4358ridetv491g2b0lokh8l0j0fmdd.apps.googleusercontent.com";
export const APP_FACEBOOK = "1937935059771206";
