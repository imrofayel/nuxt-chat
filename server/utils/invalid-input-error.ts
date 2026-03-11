export const inputError = () => {
  throw createError({
    statusCode: 400,
    statusMessage: "Bad Request",
    message: "Invalid input",
    data: {
      error: "The provided body does not match the schema",
    },
  });
};
