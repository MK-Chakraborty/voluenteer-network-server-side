const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ehdi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try{
        await client.connect();

        const database = client.db("volunteer_network");
        const catagoryCollection = database.collection('catagories');

        app.get('/catagories', async(req, res) => {
            const cursor = catagoryCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Volunteer Networ Server');
})

app.listen(port, () => {
    console.log('LIstening to PORT: ', port);
})