import { getData } from "./api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let page = 1;
let hits = [];
let query = '';
let total = 0;


var lightbox = new SimpleLightbox('.gallery a', { /* options */ });




const form = document.querySelector('.search-form');
const galery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');



const simpleGallery = new SimpleLightbox('.gallery a',{});


hideBtn()



form.addEventListener('submit', onSearchSubmit);
loadBtn.addEventListener('click',onBtnClick)

const render = () => {
  
  const markup = hits.map((hit) => `<a class="image-link" href="${hit.largeImageURL}"><div class="photo-card">
    <img src="${hit.webformatURL}" alt="${hit.tags}"
    title="${hit.tags}" width="120" height="100" loading="lazy" />
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
  </div></a>`)
    .join('');
  
  // galery.innerHTML = markup;
  galery.insertAdjacentHTML('beforeend', markup);
  simpleGallery.refresh()
}

const fetchPictures = () => {
getData(query,page)
    .then(data => {
      // const { hits, totalHits, total } = data;
      hits = data.hits;
      total = data.totalHits;
      const length = hits.length;
      // console.log(hits.length);
      console.log(length);
      console.log(hits);
      // if (!length) {
      //   hideBtn()
      //   Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      //   return;
      // }
    checkDataLength(length,total)
      // console.log(data),
      render()
    })
  .catch(error => console.log(error));
}


function onSearchSubmit(e) {
  e.preventDefault()
  hideBtn()
  
  //  inputValue = form.searchQuery.value
  const inputValue = e.currentTarget.elements.searchQuery.value
    // console.log(form.searchQuery.value);
  if (inputValue.trim() === '') {
    galery.innerHTML = '';
  // hideBtn()
  }  if
  (!inputValue.trim() || inputValue === query){
    return
  }
  
  
    query = inputValue;
    page = 1;
    galery.innerHTML = '';
    fetchPictures()
   
  
}





function onBtnClick() {
  hideBtn()
  page += 1;
  fetchPictures()
}

function showBtn() {
  loadBtn.classList.remove('is-hidden')

}

function hideBtn() {
  loadBtn.classList.add('is-hidden')
}


function checkDataLength(itemsLength,totalAmount) {
  if (!itemsLength) {
  
    Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    return;
  }
  if (itemsLength >= 40) {
    showBtn()
  }
   if 
  (itemsLength < 40 && page !== 1){
     Notify.info("We're sorry, but you've reached the end of search results.")
    
  }
   if (page === 1) {
    Notify.success(`Hooray! We found ${totalAmount} images.`)
  }
}