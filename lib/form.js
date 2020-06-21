export const getErrorMessage = error => {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      ) {
        try {
          // returns first validation error
          return Object.entries(graphQLError.extensions.validationErrors)[0][1]
        } catch {}
      }
    }
  }

  return 'An unexpected error occured. Please refresh the page to try again.'
}
