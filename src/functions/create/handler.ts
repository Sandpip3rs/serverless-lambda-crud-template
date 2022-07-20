import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@/libs/api-gateway';
import { formatJSONResponse } from '@/libs/api-gateway';
import { middyfy } from '@/libs/lambda';
import schema from '@/functions/create/schema';

type MemberInfo = {
  readonly firstName: string;
  readonly lastName: string;
};

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  const companyInfo: MemberInfo = event.body;

  const successfulResponse = {
    firstName: companyInfo.firstName,
    lastName: companyInfo.lastName,
  };

  return formatJSONResponse(successfulResponse);
};

export const main = middyfy(create);
