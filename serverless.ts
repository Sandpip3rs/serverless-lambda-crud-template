/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { create, delete as remove } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'serverless-lambda-template',
  frameworkVersion: '3',
  useDotenv: true,
  provider: {
    name: 'aws',
    stage: 'prd',
    runtime: 'nodejs14.x',
    region: 'ap-southeast-2',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['codedeploy:*'],
        Resource: '*',
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: false, // activate to see CacheHits and Misses
    },
    apiName: 'your-api',
    logs: {
      // activate to see API Gateway logs
      restApi: {
        accessLogging: true,
        executionLogging: true,
        level: 'INFO',
        fullExecutionData: true,
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      packager: 'npm',
    },
    stages: ['prd'],
    prune: {
      automatic: true,
      number: 3,
    },
    customDomain: {
      rest: {
        domainName: 'api.service.cloud',
        certificateName: 'api.service.cloud',
        basePath: '',
        stage: 'prd',
        endpointType: 'REGIONAL',
        createRoute53Record: true,
        autoDomain: true,
      },
    },
    customCertificate: {
      certificateName: 'api.cert.name',
      hostedZoneNames: 'your.hosted.zone',
      enabled: true,
      region: 'ap-southeast-2',
      tags: {
        Name: 'your-services-domain-certificate',
        Environment: 'prd',
      },
    },
  },
  plugins: [
    'serverless-ignore',
    'serverless-webpack',
    'serverless-offline',
    'serverless-domain-manager',
    'serverless-stage-manager',
    'serverless-certificate-creator',
    'serverless-prune-plugin',
    'serverless-plugin-aws-alerts',
    // 'serverless-plugin-canary-deployments', // Remove this if you want to disable Canary Deployments
  ],
  functions: { create, remove },
};

module.exports = serverlessConfiguration;
