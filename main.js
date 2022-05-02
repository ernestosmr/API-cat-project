const urlRandom = 
'https://api.thecatapi.com/v1/images/search?limit=3&api_key=f92b7854-d359-468b-abfd-16e804b8075c';
const urlFavorites =
'https://api.thecatapi.com/v1/favourites?api_key=f92b7854-d359-468b-abfd-16e804b8075c';
const urlDeleteFavorites = (id) => {
    return `https://api.thecatapi.com/v1/favourites/${id}?api_key=f92b7854-d359-468b-abfd-16e804b8075c`
}
const urlUploadCat = 'https://api.thecatapi.com/v1/images/upload'


const btn = document.querySelector('button');
const img1 = document.querySelector('#cat1');
const img2 = document.querySelector('#cat2');
const img3 = document.querySelector('#cat3');
const spanDone = document.getElementById('done')

async function loadRandomCats(){
    const response = await fetch(urlRandom)
    const data = await response.json();
    
    if(response.status !== 200 ){
        spanError.innerText = 'Error' + response.status
    } else{
        const btn1 = document.getElementById('fav1-btn')
        const btn2 = document.getElementById('fav2-btn')
        const btn3 = document.getElementById('fav3-btn')
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        btn1.onclick = () => saveFavoriteCat(data[0].id);
        btn2.onclick = () => saveFavoriteCat(data[1].id);
        btn3.onclick = () => saveFavoriteCat(data[2].id);
    }
}
async function loadFavoritesCats(){
    const res = await fetch(urlFavorites)
    const data = await res.json();

    if(res.status !== 200 ){
        spanError.innerText = 'Error' + res.status
    } else{
        const section = document.getElementById('fav-cats-articles');
        section.innerHTML = '';
        data.forEach( cat => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('🗑️')
    
            img.src = cat.image.url
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteCat(cat.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
        })
    }
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

    if(res.status !== 200 ) {
        return console.error(new Error)
    }
    styles('Added')
    loadFavoritesCats();
}
async function deleteFavoriteCat(id){
    const res = await fetch(urlDeleteFavorites(id), {
        method: 'DELETE',
    });

    if(res.status !== 200 ) {
        return console.error(new Error)
    }
    styles('Deleted')
    loadFavoritesCats();
}
loadRandomCats();
loadFavoritesCats()
btn.addEventListener('click', loadRandomCats);


function styles(name){
    spanDone.innerText = name;
    spanDone.style.visibility = 'visible';
    spanDone.style.animationName = 'fadeOut'
    spanDone.style.animationDuration = '1s'
    spanDone.style.animationDelay = '1s'
    spanDone.style.animationIterationCount = '1'
    setTimeout(()=> {
    spanDone.style.visibility = 'hidden'
    spanDone.style.animationName = 'none'
    spanDone.style.animationDuration = 'none'
    spanDone.style.animationDelay = 'none'
    spanDone.style.animationIterationCount = 'none'
    
    }, 2000)
}

async function uploadCatPicture(){
    const form = document.getElementById('uploading-form');
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(urlUploadCat, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'f92b7854-d359-468b-abfd-16e804b8075c',
            
        },
        body: formData,
    })

    const data = await res.json();

    if(res.status !== 201){
        console.log({data});
    } else{
        console.log('foto subida bb');
        console.log({data});
        saveFavoriteCat(data.id)
    }
}


