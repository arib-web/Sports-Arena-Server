const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

require('dotenv').config()
const port = process.env.PORT || 5000;

// middlewware 
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.etpgxye.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        const classesCollections = client.db('sportsArenaDB').collection('classes');
        const cartsCollections = client.db('sportsArenaDB').collection('carts');

        app.get('/classes', async (req, res) => {
            const result = await classesCollections.find().toArray();
            res.send(result);
        })
        // carts related apii 
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            if (!email) {
                res.send([]);
            }
            const query = { email: email }
            const result = await cartsCollections.find(query).toArray();
            res.send(result);
        })
        app.post('/carts', async (req, res) => {
            const item = req.body;
            const result = await cartsCollections.insertOne(item);
            res.send(result);
        })
        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await cartsCollections.deleteOne(query)
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Sports Arena is running')
})
app.listen(port, () => {
    console.log(`Sports Arena is  running on port ${port}`);
})
