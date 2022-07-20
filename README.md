# Serverless AWS Lambda Template

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

Some personal modifications are:

- Git hooks with [Husky](https://typicode.github.io/husky/), running ESLint, Prettier and Tests on every commit.
- Created a directory for Architecture Decision Records, as [described by Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
- Open API documentation with [redoc-cli](https://github.com/Redocly/redoc).
- Canary Deployments with [serverless-plugin-canary-deployments](https://github.com/davidgf/serverless-plugin-canary-deployments).
- CloudWatch Alerts with [serverless-plugin-aws-alerts](https://github.com/ACloudGuru/serverless-plugin-aws-alerts).
- Prune of Old Lambda Versions with [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin).

## Installation/deployment instructions

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This project contains two lambda functions triggered by an HTTP request made on the provisioned API Gateway REST API with `POST` and `DELETE` method. The `POST` request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/create/schema.ts` JSON-Schema definition.

- requesting any other path than `POST /account` or `DELETE account/{name}`, will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/create` with a payload **not** containing proper fields, will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/create` with a payload containing proper fields, will result in API Gateway returning a `200`

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.

### Locally

In order to test the hello function locally, run the following command:

- `yarn sls invoke local -f hello --path src/functions/hello/mock.json`
- Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

Another way is to hit the simulated endpoint directly:

```
curl --location --request POST 'http://localhost:4000/dev/account' \
--header 'Content-Type: application/json' \
--data-raw '{
"companyName": "Vamous Sports",
"firstName": "Rafa",
"lastName": "Nadal"
}'
```

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://api.service.cloud/account' \
--header 'Content-Type: application/json' \
--data-raw '{
    "companyName": "Vamous Sports",
    "firstName": "Rafa",
    "lastName": "Nadal"
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions            # Lambda configuration and source code folder
│   │   ├── create
│   │   │   ├── handler.ts   # `Create Account` lambda source code
│   │   │   ├── index.ts     # `Create Account` lambda Serverless configuration
│   │   │   ├── mock.json    # `Create Account` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts    # `Create Account` lambda input event JSON-Schema
│   │   ├── delete
│   │   │   ├── handler.ts   # `Delete Account` lambda source code
│   │   │   ├── index.ts     # `Delete Account` lambda Serverless configuration
│   │   │   ├── mock.json    # `Delete Account` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts    # `Delete Account` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts         # Import/export of all lambda configurations
│   │
│   └── libs                 # Lambda shared code
│       └── apiGateway.ts    # API Gateway specific helpers
│
├── package.json
├── serverless.ts            # Serverless service file
├── tsconfig.json            # Typescript compiler configuration
└── webpack.config.js        # Webpack configuration
```

### 3rd party librairies

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [redoc-cli](https://github.com/Redocly/redoc) - provides a tool to configure and write our documentation using [OpenAPI Specification](https://swagger.io/specification).
- [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin) - prunes old lambda versions.
- [serverless-plugin-aws-alerts](https://github.com/ACloudGuru/serverless-plugin-aws-alerts) - creates alerts automatically in CloudWatch.
- [serverless-plugin-canary-deployments](https://github.com/davidgf/serverless-plugin-canary-deployments) - implement canary deployments of Lambda functions with AWS CodeDeploy.
