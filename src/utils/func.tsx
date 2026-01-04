export const validateEmail = (emailAddr: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailAddr);
};
