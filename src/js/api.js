const API_KEY = "34316934-23a1792d471904186ea8894b3";
const URL = "https://pixabay.com/api/";
const PER_PAGE = 40;

export const getData = async (request,page) => {
    const response = await fetch(`${URL}?key=${API_KEY}&q=${request}&page=${page}&per_page=${PER_PAGE}&image_type="photo"&orientation="horizontal"&safesearch="true"`);
    const images = await response.json();
    return images;
//   if (response.ok) {
    
//       return response.json();
    //   return images

//   }
  
// throw new Error(response.status)
}