const express = require('express');
const router = express.Router();


const filmes = [
      {
         "id": Date.now(),
         "nome": "Laranja Mecanica",
         "imagem": "https://www.setcenas.com.br/wp-content/uploads/2020/11/1971-a-clockwork-orange-small-cke.jpg",
         "nota": "9.5",
         "genero": "Crime distópico"
       },
    ]
  

router.get('/', (req, res) => {
    res.send (filmes);
})

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const index = filmes.findIndex((filme) => filme.id == idParam);
    const filme = filmes[index];
    res.send(filme);
} )


router.post('/add', (req, res) =>{
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
      message: 'filme cadastrado!',
      data: filme
    });
})

router.put('/:id', (req, res) => {
  const filmeUpdate = req.body;
  const idParam = req.params.id;
  const filmeOld = filmes.find((filme) => filme.id == idParam);
  
  filmeOld.nome = filmeUpdate.nome;
  filmeOld.imagem = filmeUpdate.imagem;
  filmeOld.nota = filmeUpdate.nota;
  filmeOld.genero = filmeUpdate.genero;

  res.send({
    message: `Filme  atualizado com sucesso`,
    data: filmeOld
  })
})

router.delete('/:id', (req, res) => {
  const idParam = req.params.id;
  const index = filmes.findIndex((filme) => filme.id == idParam);
  filmes.splice(index, 1);

  res.send({
    message: `vaga excluida com sucesso`,

  })
})


module.exports = router;
