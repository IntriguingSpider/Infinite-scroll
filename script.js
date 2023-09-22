//Unsplash API
const count = 2;
const apiKey = "YWUkYEEfFd5XyhhDvpbrHP9jM_NGhP6ITjmP-1p8ZjE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}

`;
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

//

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Get photos from unsplash API
async function getPhotos() {
  try {
    loader.hidden = false;
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach((photoObj) => renderPhoto(photoObj));
  } catch (err) {
    console.log(err);
  }
}

//Display Photo
// Display Photo
function renderPhoto(photoObject) {
  const markup = `<a href=${photoObject.links.html}>
     <img src=${photoObject.urls.regular} alt='${photoObject.alt_description}' title='${photoObject.alt_description}'>
   </a>`;

  imgContainer.insertAdjacentHTML("beforeend", markup);

  // Add event listener to new image
  imgContainer.lastElementChild
    .querySelector("img")
    .addEventListener("load", imageLoaded);
}

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("All images loaded");
    loader.hidden = true;
  }
}

//Check to see if scrolled at bottom, load more photos
window.addEventListener("scroll", () => {
  //if page reaches near bottom
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 &&
    ready
  ) {
    ready = false;
    loader.hidden = false;
    //2) Render New pics
    getPhotos();
  }
});
//on Load
getPhotos();
