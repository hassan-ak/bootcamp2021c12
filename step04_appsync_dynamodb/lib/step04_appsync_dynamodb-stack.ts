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

    // Lambda fro creating lambda function
    const todosLambda = new lambda.Function(this, "AppSyncTodosHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "main.handler",
      code: lambda.Code.fromAsset("lambda"),
      memorySize: 1024,
    });

    // Define lambda as datasource
    const lambdaDs = api.addLambdaDataSource("lambdaDataSource", todosLambda);

    // Resolvers to intract with graphQL APi
    lambdaDs.createResolver({
      typeName: "Query",
      fieldName: "getTodos",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "addTodo",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "deleteTodo",
    });

    lambdaDs.createResolver({
      typeName: "Mutation",
      fieldName: "updateTodo",
    });

    // Create a DynamoDB table
    const todosTable = new ddb.Table(this, "TodosTable", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    // grant table access to lambda function
    todosTable.grantFullAccess(todosLambda);

    // add table name to environment
    todosLambda.addEnvironment("TODOS_TABLE", todosTable.tableName);
  }
}
