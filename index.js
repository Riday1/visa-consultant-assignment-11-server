const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.w8wev2h.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {

    const serviceCollection = client.db('ServiceProvider').collection('services')
    const employesCollection = client.db('ServiceProvider').collection('employes')

    try {
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query)
            const result = await cursor.limit(3).toArray()
            res.send(result)
        })

        app.get('/all-services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/employes', async (req, res) => {
            const query = {};
            const cursor = employesCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })


    } finally {

    }
}
run().catch(err => console.log(err));








app.get('/', (req, res) => {
    res.send('server is running')
})
app.listen(port, () => {
    console.log(`server is running on port : ${port}`)
})



// ServiceProvider:Yku7JQftvxoOGfpy