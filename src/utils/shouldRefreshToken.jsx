const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

export default shouldRefreshToken;
