import { fetchPictures } from "./api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


let page = 1;
let hits = [];
let query = '';
let total = 0;







const form = document.querySelector('.search-form')
const galery = document.querySelector('.gallery')
form.addEventListener('submit', onSearchClick);


const render = () => {
  galery.innerHTML = '';
  const markup = hits.map((hit) => `<div class="photo-card">
  <img src="${hit.webformatURL}" alt="${hit.tags}" width="220" height="200" loading="lazy" />
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
  
  galery.innerHTML = markup;
}

function onSearchClick(e) {
    e.preventDefault()
   inputValue = form.searchQuery.value
    // console.log(form.searchQuery.value);
  if (!inputValue || inputValue === query) {
    return
  }
  query = inputValue;
  fetchPictures(query,page)
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
    // fetchUsers().then(users => console.log(users))
}



// const fetchUsers = async () => {
//   const response = await fetch("https://pixabay.com/api/?key=34316934-23a1792d471904186ea8894b3&q=yellow+flowers&image_type=photo");
//   const users = await response.json();
//   return users;
// };

