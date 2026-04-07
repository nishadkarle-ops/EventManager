const express = require('express');
const cors = require('cors');
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DynamoDB Configuration
// Note: Requires AWS credentials in .env or environment
const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "ap-south-1",
    const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1"
});
    // Useful for local testing with DynamoDB Local
    endpoint: process.env.DYNAMODB_ENDPOINT || undefined 
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = "EventRegistrations";

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, phone, event, message } = req.body;
        const id = Date.now().toString(); // Simple unique ID
        
        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: {
                RegistrationID: id,
                name,
                email,
                phone,
                event,
                message,
                createdAt: new Date().toISOString()
            }
        });

        await docClient.send(command);
        res.status(201).json({ message: 'Registration successful!', id });
    } catch (err) {
        console.error("DynamoDB Error:", err);
        res.status(500).json({ message: 'Error saving to database. Ensure the DynamoDB table exists.' });
    }
});

app.get('/api/registrations', async (req, res) => {
    try {
        const command = new ScanCommand({
            TableName: TABLE_NAME
        });
        const response = await docClient.send(command);
        res.json(response.Items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching registrations.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
