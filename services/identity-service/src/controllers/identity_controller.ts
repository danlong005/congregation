import AWS from "aws-sdk";
import express from "express";
import serverless from "serverless-http";

const app = express();

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

app.use(express.json());

app.get('/v1/hello', (req: any, res: any) => {
  res.status(200).json({
    message: "Hello World"
  });
});

// app.get("/users/:userId", async function (req: any, res: any) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   };

//   try {
//     const { Item } = await dynamoDbClient.get(params).promise();
//     if (Item) {
//       const { userId, name } = Item;
//       res.json({ userId, name });
//     } else {
//       res
//         .status(404)
//         .json({ error: 'Could not find user with provided "userId"' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not retreive user" });
//   }
// });

// app.post("/users", async function (req: any, res: any) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.put(params).promise();
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });

// app.use((req: any, res: any, next: any) => {
//   return res.status(404).json({
//     error: "Not Found",
//   });
// });

app.use((req: any, res: any, next: any, error: any) => {
  return res.status(500).json({
    error: "Internal Server Error"
  })
});

let identityController = serverless(app);

export {
  identityController
}