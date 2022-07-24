import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler'
// import validator from '@middy/validator'
import JSONErrorHandlerMiddleware from 'middy-middleware-json-error-handler'

export const middyfy = (handler) => {
  return middy(handler)
  // use(validator({eventSchema}))
  .use(middyJsonBodyParser())
  .use(httpErrorHandler())
  .use(JSONErrorHandlerMiddleware());
};
