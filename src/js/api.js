import axios from "axios";





export const getData = async (request, page) => {
    const URL = "https://pixabay.com/api/";

    const options = {
        params: {
            key: "34316934-23a1792d471904186ea8894b3",
            
            per_page: 40,
            page: page,
            q: request,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
        },
    }
    try {
        const { data: response }  = await axios.get(URL,options);
        
        return response
        
    }
    catch (error) {
    console.error(error);
  }
    }
//   if (response.ok) {
    
//       return response.json();
    //   return images

//   }
//   const API_KEY = "34316934-23a1792d471904186ea8894b3";
// const URL = "https://pixabay.com/api/";
// const PER_PAGE = 40;
// throw new Error(response.status)
// export const getData = async (request,page) => {
//     const response = await fetch(`${URL}?key=${API_KEY}&q=${request}&page=${page}&per_page=${PER_PAGE}&image_type="photo"&orientation="horizontal"&safesearch="true"`);
//     const images = await response.json();
//     return images;
//     }