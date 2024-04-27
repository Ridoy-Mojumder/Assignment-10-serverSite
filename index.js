const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.23qqz48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
    await client.connect();

    const artAndCraftCollection = client.db('artAndCraftDb').collection('artAndCraft');

    app.get('/addCraft', async (req, res) => {
      const artAndCraft = artAndCraftCollection.find();
      const result = await artAndCraft.toArray();
      res.send(result)
    })

    


    app.get('/addCraft/:id', async (req, res) => {
      const id = req.params.id;
      const result = await artAndCraftCollection.findOne({ _id: new ObjectId(id) })
      res.send(result)
    })
    app.get('/addCraft/:id', async (req, res) => {
      const id = req.params.id;
      const result = await artAndCraftCollection.findOne({ _id: new ObjectId(id) })
      res.send(result)
    })

    app.post('/addCraft', async (req, res) => {
      const newArtAndCraft = req.body;
      console.log(newArtAndCraft);
      const result = await artAndCraftCollection.insertOne(newArtAndCraft);
      res.send(result);
    })

    app.put('/addCraft/:id', async(req,res)=>{
      const id = req.params.id;
      const user = req.body;
      console.log(user)
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true }
      const updateUser = {
        $set : {
          photoUrl: user.photoUrl,
          itemName: user.itemName,
          subcategoryName: user.subcategoryName,
          shortDescription: user.shortDescription,
          price: user.price,
          rating: user.rating,
          customization: user.customization,
          processingTime: user.processingTime,
          stockStatus: user.stockStatus,

        }
      }
      const result = await artAndCraftCollection.updateOne(filter, updateUser, options)
      res.send(result)
    })


    app.delete('/addCraft/:id', async(req, res) => {
      const id = req.params.id;
      console.log('delete id:', id);
      const query = { _id: new ObjectId(id) };
      const result = await artAndCraftCollection.deleteOne(query);
      res.send(result)
    })





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
  res.send("Assignment ten server is running")
})

app.listen(port, () => {
  console.log(`Assignment ten server is running on port: ${port}`)
})