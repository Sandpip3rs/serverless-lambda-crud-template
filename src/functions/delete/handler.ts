import 'source-map-support/register';

import { formatJSONResponse } from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';

const remove = async (event) => {
  const idPathVariable = 'id';
  if (event.pathParameters && event.pathParameters[idPathVariable]) {
    const id = event.pathParameters[idPathVariable];
    console.info(`Deleting account '${id}' ...`);
    return formatJSONResponse({ message: 'All good' });
  }

  console.error("'id' is missing");
  const errorBody = { error: "'id' is missing" };
  return formatJSONResponse(errorBody, 400);
};

export const main = middyfy(remove);
