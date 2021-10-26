import * as cdk from "@aws-cdk/core";
import * as appsync from "@aws-cdk/aws-appsync";
import * as lambda from "@aws-cdk/aws-lambda";
import * as ddb from "@aws-cdk/aws-dynamodb";
import {
  Duration,
  Expiration,
} from "@aws-cdk/aws-appsync/node_modules/@aws-cdk/core";

export class Step04AppsyncDynamodbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // AppSync api to genrate an api
    const api = new appsync.GraphqlApi(this, "TodoApi", {
      name: "todos-appsync-api",
      schema: appsync.Schema.fromAsset("graphql/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(20)),
          },
        },
      },
      xrayEnabled: true,
    });

    // Print GraphAL API URL, key and region on console after deploy
    new cdk.CfnOutput(this, "ApiURl", {
      value: api.graphqlUrl,
    });

    new cdk.CfnOutput(this, "ApiKey", {
      value: api.apiKey || "",
    });

    new cdk.CfnOutput(this, "StackRegion", {
      value: this.region,
    });
  }
}
