let code = null;

export const getCode = () => {
  if (location.href.includes('code=')) {
    code = location.href.split('code=')[1];
  }

  return code;
};
