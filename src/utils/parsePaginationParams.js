export const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString || !isNaN(Number(number))) return defaultValue;

  return number;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
