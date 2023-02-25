import 'reflect-metadata';
const express = require('express');
import { applicationRouter } from './router';
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', applicationRouter);


app.listen(8080, async () => {
    console.log(`Server is up and running on 8080 ...`);
});



