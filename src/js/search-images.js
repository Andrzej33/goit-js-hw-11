import { getData } from "./api";
// const axios = require('axios')
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


let page = 1;
let hits = [];
let query = '';
// let total = 0;







const form = document.querySelector('.search-form');
const galery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');



const simpleGallery = new SimpleLightbox('.gallery a', { captionDelay:300,});


hideBtn()



form.addEventListener('submit', onSearchSubmit);
loadBtn.addEventListener('click',onBtnClick)

const render = () => {
  
  const markup = hits.map((hit) => `<a class="imageLink" href="${hit.largeImageURL}"><div class="photo-card">
    <img src="${hit.webformatURL}" alt="${hit.tags}"
    title="${hit.tags}" width="250"  loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>likes</b>
        ${hit.likes}
      </p>
      <p class="info-item">
        <b>views</b>
        ${hit.views}
      </p>
      <p class="info-item">
        <b>comments</b>
        ${hit.comments}
      </p>
      <p class="info-item">
        <b>downloads</b>
        ${hit.downloads}
      </p>
    </div>
  </div></a>`)
    .join('');
  
  // galery.innerHTML = markup;
  galery.insertAdjacentHTML('beforeend', markup);
  simpleGallery.refresh()
}

const fetchPictures = () => {
  page = Number(page)
getData(query,page)
  .then(data => {
    
      hits = data.hits;
      total = data.totalHits;
      const length = hits.length;
      
      // console.log(total);
      // console.log(hits);
      
    checkDataLength(length,total)
     
      render()
    })
  .catch(error => console.log(error));
}


function onSearchSubmit(e) {
  e.preventDefault()
 
  const inputValue = e.currentTarget.elements.searchQuery.value
   
  if (inputValue.trim() === '') {
    galery.innerHTML = '';
  hideBtn()
  }  if
    (!inputValue.trim() || inputValue === query) {
    
    return
  }
  
  
    query = inputValue;
    page = 1;
    galery.innerHTML = '';
    fetchPictures()
    console.log(galery.firstChild);
  
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
  hideBtn()
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


// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

 

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });