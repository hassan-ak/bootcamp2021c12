# bootcamp2021c12 - Integrate API Gateway and AppSync with Lambda and DynamoDB

## Integrate AppSync with Lambda with DynamoDB

### Class Notes :-

[Getting started with Amazon DynamoDB](https://aws.amazon.com/blogs/database/getting-started-with-amazon-dynamodb/)
FIrst look at the options in databases, first is DynamoDB having fastest response time with a problem of being a very basic server where we need a partiton and primary key. For simple options we can use DynamoDB and for complex task we can use Aurora serverless which is a relatinal database or go with Graph database naptune.
DynamoDB is a basic database provided by AWS having tables, items and attributes. Tables is actually a collection of items. Items has a limited information and there are multiple items in a table. Each property of an item is known as attribute. There are two keys in the table first is a partition key whihc is used by AWS for an internal hash function to determine the physical location of the data to be stored and other is sort key which is used to sort items matching partition key. Sort key is usally a composite key. The key or attribute related to most items should be made partiton key.

### Sections

- [AppSync DynamoDB](./step04_appsync_dynamodb)

### Class 11 Videos:

- [English YouTube](https://www.youtube.com/watch?v=m1ufBAiW4DU&ab_channel=CertifiedUnicornDeveloper)
- [English Facebook](https://www.facebook.com/fb.anees.ahmed/videos/624498375622116)
- [Urdu YouTube](https://www.youtube.com/watch?v=6T7QhbskrC4&ab_channel=CertifiedUnicornDeveloperinUrdu)
- [Urdu Facebook](https://www.facebook.com/Ai.SirQasim/videos/2948723565388425)
