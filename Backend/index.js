const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const filmesRouters = require('./routers/filmes.routes');
app.use('/filmes', filmesRouters);





app.get('/', (req, res) => {
    res.send('Filmes carregados com susseso');
})


const port = 3000;

app.listen(port, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}/`);
  })
