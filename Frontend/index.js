const urlApi = 'http://localhost:3000/filmes';
const lista = document.getElementById('lista');
let edicao = false;
let idEdicao = 0;

const getFilmes = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();
    
    
    data.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
    <div class="card">
    <img src="${filme.imagem}">
        <div class="content">
            <h2>${filme.nota}</h2>
            <h3>${filme.nome}</h3>
            <p>${filme.genero}</p>
            <a class="edit" onclick="putFilme(${filme.id}) href="#">Editar</a>
            <a class="delete" onclick="deleteFilme(${filme.id}) href="#">Apagar</a>
        </div>
    </div>
    `)
    })
}
getFilmes();

// ----------------------- POST -----------------------


const submitForm = async (evento) => {

    evento.preventDefault();

    let nome = document.getElementById('nome');
    let imagem = document.getElementById('imagem');
    let nota = document.getElementById('nota');
    let genero = document.getElementById('genero');
  
    const filme = {
      nome: nome.value,
      imagem: imagem.value,
      nota: nota.value,
      genero: genero.value
    }

    if(!edicao) { 
  
      const request = new Request(`${urlApi}`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      
      
      const response = await fetch(request);
      const result = await response.json();
  
      if(result) {
        getFilmes();
      }
  
    } else {



      const request = new Request(`${urlApi}/${idEdicao}`, {
        method: 'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
  
      
      const response = await fetch(request);

      const result = await response.json();
  

      if(result) {
        edicao = false;
        getFilmes();
      }
    }
  
  

    nome.value = '';
    imagem.value = '';
    nota.value = '';
    genero.value = '';
  
    
    lista.innerHTML = '';
  }
  
 
  const getFilmeById =  async (id) => {
    const response =  await fetch(`${urlApi}/${id}`);
    return filme = response.json();
  }
  


  const putFilme = async (id) => {
    edicao = true;
    idEdicao = id;
  

    const filme = await getFilmeById(id);
  
 
    let nomeEl = document.getElementById('nome');
    let imagemEl = document.getElementById('imagem');
    let notaEl = document.getElementById('nota');
    let generoEl = document.getElementById('genero');
    
    // preenchemos os campos do html de acordo com o que estava no objeto.
    nomeEl.value = filme.nome;
    imagemEl.value = filme.imagem
    notaEl.value = filme.nota
    generoEl.value = filme.genero
  
  }
  
  
  
  const deleteFilme = async (id) => {
    const request = new Request(`${urlApi}/${id}`, {
      method: 'DELETE',
    })
    const response = await fetch(request);
    const data = await response.json();
    console.log(data.message);
  
    lista.innerHTML = '';
    getFilmes();
  }