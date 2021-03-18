const imageContainer = document.getElementById('image-container');
const paragraph = document.getElementById('paragraph')
const loader = document.getElementById('loader');

//global variable, let instead of constant because this variable will change values
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API
const count = 30;
const apiKey= 'EegnmL2vlkztsLAxK6npsUptV8stLleZqcjrDhmwJug';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}
&count=${count}`

// check if all images were loaded
function imageLoaded() {
  // console.log('loaded bitch')
  imagesLoaded++
  console.log(imagesLoaded)
  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready)
  }
}
// Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}
// Create Elements for links and photos add to the DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images', totalImages)
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
          href:photo.links.html,
          target: '_blank',
        })

        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
          src:photo.urls.regular,
          alt:photo.alt_description,
          title: photo.alt_description
        })
        // event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        const descr = document.createElement('p');
        setAttributes(descr, {
          paragraph:photo.location.city,
        })
      
        //put image inside <a>
        item.appendChild(img);
        paragraph.appendChild(descr);
        // paragraph.innerText(descr)
        imageContainer.appendChild(item, descr);
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

  //check to see if scrolling near bottom of page, load more photos
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
      ready = false;
      getPhotos();
    };
  })
 //on load
 getPhotos();
