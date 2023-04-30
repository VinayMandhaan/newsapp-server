const express = require("express");
var cors = require("cors");
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 5000;


app.use(
    express.json({
        extended: false,
    })
);
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});


app.get("/", (req, res) => {
    res.send("API Running");
});

app.get('/news', async (req, res) => {
    const config = {
        method: 'get',
        url: 'https://newsapi.org/v2/everything?apiKey=b1f634806c3c485a83af4480a60b3230',
        params: {
            q: req.query.query,
            language: req.query.lang
        }
    }
    try {
        const response = await axios(config);
        return res.json(response.data)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong.' });
    }
})