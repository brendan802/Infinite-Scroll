const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
//global variable, let instead of constant because this variable will change values
let photosArray = [];


//Unsplash API
const count = 10;
const apiKey= 'EegnmL2vlkztsLAxK6npsUptV8stLleZqcjrDhmwJug';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}
&count=${count}`


// Create Elements for links and photos add to the DOM

function displayPhotos() {
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        //create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        //put image inside <a>
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
      // Catch Error Here
    }
  }
 //on load
 getPhotos();
