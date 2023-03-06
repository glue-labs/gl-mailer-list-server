import express = require('express');
import 'dotenv/config';

const PORT = process.env.PORT || '3000';

const app =express();

app.get('/test', (req, res) =>{
    res.json({ok: true});
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));