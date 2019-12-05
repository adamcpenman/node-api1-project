// implement your API here
const express = require("express")
let db = require("./data/db")

const app = express()

app.use(express.json())

app.get("/api", (req, res) => {
    console.log("ip:", req.ip)

    res.json({
        message: "Projects API"
    })
})

//getting all users
app.get("/api/users", (req, res) => {
    // res.json(db)
    db.find()
    .then(user => {
        res
            .status(200)
            .json(user)
    })
    .catch(() => {
        res
            .status(404)
            .json({ error: "What a tater..no hobbit by that name"})
    })
})

//user by id
app.get("/api/users/:id", (req, res) => {
    db.findById(req.params.id)
    .then ((user) => {
        res
            .status(200)
            .json(user)
    })
    .catch(() => {
        res
            .status(404)
            .json({ error: "What a tater..no hobbit by that ID"})
    })
})

//creating a user via POST request
app.post("/api/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res
                .status(400).json({ error: "Need a name and bio, precious"})
    }

    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
    }

    db.insert(newUser)
        res
            .status(201)
            .json(newUser)
})

//deleting a user
app.delete("/api/users/:id", (req, res) => {
    const user = req.params.id;
    db.remove()
        .then(user => {
         if (user) {
             res
                .status(404)
                .json({ message: "The hobbit with the ID does not exist"})
         }   else {
             res.status(200).json("Hobbit killed by the ring");
         }
        })
        .catch(err => {
            res.status(500).json({ error: "The hobbit lives in heaven"})
        })
})


const port = 8080
const host = "127.0.0.1"

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})