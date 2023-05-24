const cards = document.querySelector('#cards');
const templateCard = document.querySelector('.template-card').content;
const loading = document.querySelector('.loading');
const url = 'https://rickandmortyapi.com/api/character';
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async() => {
    try {
        loadingData(true)

        const res = await fetch(url);
        const data = await res.json();

        pintarCard(data)

    } catch (error) {
        console.log(error)
    }finally {
        loadingData(false)
    }
}

const pintarCard = (data)=>{
    data.results.forEach(item => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h5').textContent = item.name;
        clone.querySelector('p').textContent = item.species;
        clone.querySelector('img').setAttribute('src', item.image);
//Se hace el fragment para evitar el reflow
        fragment.appendChild(clone)    
    })
//se pinta como atributo el fragment ya que dentro de el se ubica todo el template
    cards.appendChild(fragment)
     
}

const loadingData = (estado)=>{
    if(estado){
        loading.classList.remove('d-none');
    }else {
        loading.classList.add('d-none');
    }
}