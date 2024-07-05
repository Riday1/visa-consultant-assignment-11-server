const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const reviewsCollection = client.db('ServiceProvider').collection('reviews')

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

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: new ObjectId(id) };
            const result = await serviceCollection.findOne(query);
            res.send(result)
        })

        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { service_id: id }
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        //reivew post
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review);
            res.send(result)
        })

        //delete single review
        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await reviewsCollection.deleteOne(query);
            res.send(result)
        })

        // get user  review by "email"
        app.get('/my-reviews', async (req, res) => {
            const email = req.query.email
            const query = { user_email: email }
            const cursor = reviewsCollection.find(query)
            const myReviews = await cursor.toArray()
            res.send(myReviews)

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