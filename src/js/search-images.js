import { getData } from "./api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


let page = 1;
let hits = [];
let query = '';
let total = 0;







const form = document.querySelector('.search-form')
const galery = document.querySelector('.gallery')
const loadBtn = document.querySelector('.load-more')



form.addEventListener('submit', onSearchClick);
loadBtn.addEventListener('click',onBtnClick)

const render = () => {
  
  const markup = hits.map((hit) => `<div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" width="120" height="150" loading="lazy" />
  <div class="info">
    <p class="info-item">likes
      <b>${hit.likes}</b>
    </p>
    <p class="info-item">views
      <b>${hit.views}</b>
    </p>
    <p class="info-item">comments
      <b>${hit.comments}</b>
    </p>
    <p class="info-item">downloads
      <b>${hit.downloads}</b>
    </p>
  </div>
</div>`)
    .join('');
  
  // galery.innerHTML = markup;
  galery.insertAdjacentHTML('beforeend',markup)
}

const fetchPictures = () => {
getData(query,page)
    .then(data => {
      // const { hits, totalHits, total } = data;
      hits = data.hits;
      total = data.totalHits;
      // console.log(hits);
      // console.log(totalHits);
      console.log(total);
      if (!hits.length) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        return;
      }
    
      // console.log(data),
      render()
    })
  .catch(error => console.log(error));
}


function onSearchClick(e) {
    e.preventDefault()
  //  inputValue = form.searchQuery.value
  const inputValue = e.currentTarget.elements.searchQuery.value
    // console.log(form.searchQuery.value);
  if (!inputValue.trim() || inputValue === query) {
    return
  }
  query = inputValue;
  page = 1;
  galery.innerHTML = '';
  fetchPictures()
    // fetchUsers().then(users => console.log(users))
}



// const fetchUsers = async () => {
//   const response = await fetch("https://pixabay.com/api/?key=34316934-23a1792d471904186ea8894b3&q=yellow+flowers&image_type=photo");
//   const users = await response.json();
//   return users;
// };

function onBtnClick () {
  page += 1;
  fetchPictures()
}