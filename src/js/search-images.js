
const API_KEY = "34316934-23a1792d471904186ea8894b3";
const URL = "https://pixabay.com/api/"







const form = document.querySelector('.search-form')
form.addEventListener('submit', onSearchClick);

function onSearchClick(e) {
    e.preventDefault()
    const inputValue = form.searchQuery.value
    // console.log(form.searchQuery.value);
    fetchPictures(inputValue)
  .then(images => console.log(images))
  .catch(error => console.log(error));
    // fetchUsers().then(users => console.log(users))
}

const fetchPictures = async (request) => {
    const response = await fetch(`${URL}?key=${API_KEY}&q=${request}&image_type="photo"&orientation="horizontal"&safesearch="true"`);
    const images = response.json();
    return images
}

// const fetchUsers = async () => {
//   const response = await fetch("https://pixabay.com/api/?key=34316934-23a1792d471904186ea8894b3&q=yellow+flowers&image_type=photo");
//   const users = await response.json();
//   return users;
// };

