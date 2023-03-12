import { Notify } from 'notiflix/build/notiflix-notify-aio';
const API_KEY = "34316934-23a1792d471904186ea8894b3";
const URL = "https://pixabay.com/api/"







const form = document.querySelector('.search-form')
const galery = document.querySelector('.gallery')
form.addEventListener('submit', onSearchClick);


const render = (images) => {
  const markup = images.map((image) => `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">likes
      <b>${image.likes}</b>
    </p>
    <p class="info-item">views
      <b>${image.views}</b>
    </p>
    <p class="info-item">comments
      <b>${image.comments}</b>
    </p>
    <p class="info-item">downloads
      <b>${image.downloads}</b>
    </p>
  </div>
</div>`)
    .join('');
  galery.innerHTML = '';
  galery.innerHTML = markup;
}

function onSearchClick(e) {
    e.preventDefault()
    const inputValue = form.searchQuery.value
    // console.log(form.searchQuery.value);
  fetchPictures(inputValue)
    .then(data => {
      console.log(data.length);
      if (!data.length) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        return;
      }
    
      // console.log(data),
      render(data)
    })
  .catch(error => console.log(error));
    // fetchUsers().then(users => console.log(users))
}

const fetchPictures = async (request) => {
  const response = await fetch(`${URL}?key=${API_KEY}&q=${request}&image_type="photo"&orientation="horizontal"&safesearch="true"`);
  if (response.ok) {
    
    const images = response.json();
  return images.then(data => data.hits)
  }
  
throw new Error(response.status)
}

// const fetchUsers = async () => {
//   const response = await fetch("https://pixabay.com/api/?key=34316934-23a1792d471904186ea8894b3&q=yellow+flowers&image_type=photo");
//   const users = await response.json();
//   return users;
// };

