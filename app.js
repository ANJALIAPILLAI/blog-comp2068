const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`hey 'dere world!`);
});

app.get('/about', (req, res)=> {
    res.send(` i like long walks on the beach.`);
});

const port= process.env.PORT || 4000;


app.listen(port, ()=> console.log(`listening on port ${port}`));

