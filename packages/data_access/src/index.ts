import AWS from "aws-sdk";

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

async function write(params: any) {
    let record = null;

    try {
        record = await dynamoDbClient.put(params).promise();
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(`Couldn't create the record ${params}`);
    }

    return record;
}

async function read(params: any) {
    let record = null;

    try {
        record = await dynamoDbClient.get(params).promise();
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(`Couldn't read the record ${params}`)
    }
}

export {
    read,
    write
}