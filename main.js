const urlRandom = 
'https://api.thecatapi.com/v1/images/search?limit=3&api_key=f92b7854-d359-468b-abfd-16e804b8075c';
const urlFavorites =
'https://api.thecatapi.com/v1/favourites?limit=3&api_key=f92b7854-d359-468b-abfd-16e804b8075c';


const btn = document.querySelector('button');
const img1 = document.querySelector('#cat1');
const img2 = document.querySelector('#cat2');
const img3 = document.querySelector('#cat3');
const spanError = document.getElementById('error')

async function loadRandomCats(){
    const response = await fetch(urlRandom)
    const data = await response.json();
    
    if(response.status !== 200 ){
        spanError.innerText = 'Error' + response.status
        return console.error('We had an error')
    } 
    const btnRandom1 = document.getElementById('fav1-btn')
    const btnRandom2 = document.getElementById('fav2-btn')
    const btnRandom3 = document.getElementById('fav3-btn')

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    btnRandom1.onclick = () => saveFavoriteCat(data[0].id);
    btnRandom2.onclick = () => saveFavoriteCat(data[1].id);
    btnRandom3.onclick = () => saveFavoriteCat(data[2].id);
}
async function loadFavoritesCats(){
    const response = await fetch(urlFavorites)
    const data = await response.json();
    if(response.status !== 200 ){
        spanError.innerText = 'Error' + response.status
        return console.error('something wrong happened')
    }
    console.log(data)
    data.forEach( cat => {
        const section = document.getElementById('fav-cats-articles')
        const article = document.createElement('article')
        const img = document.createElement('img')
        const btn = document.createElement('button')
        const btnText = document.createTextNode('🗑️')

        img.src = cat.image.url
        btn.appendChild(btnText);

        article.appendChild(img)
        article.appendChild(btn)
        section.appendChild(article)
    })
}

async function saveFavoriteCat(id){
    const res = await fetch(urlFavorites, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id,
        }),
    });
    const data = await res.json();

    console.log(res.url)

    if(res.status !== 200 ){
        spanError.innerText = 'Error' + response.status + data.message
        return console.error(new Error)
    }
}

window.onload = loadRandomCats();
loadFavoritesCats()
btn.addEventListener('click', loadRandomCats);


