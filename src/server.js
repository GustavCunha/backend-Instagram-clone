const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const uri = 'mongodb+srv://dbInsta:1q2w3e@dbinsta.fglte.mongodb.net/dbInsta?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

app.listen(3333, () => {
    console.log('🚀 Server running on port 3333')
});
