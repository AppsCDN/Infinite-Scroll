const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let loadedImages = 0;
let totalImages = 0;
let photosArray = [];


//Unsplash API

const count = 10;
const keyAPI = 'ESk8DLOlpDhSsJXdEnf2w9k6SB2afn4ZgjYagCjuT9M';
const urlOfAPI = `https://api.unsplash.com/photos/random/?client_id=${keyAPI}&count=${count}`;



//${} is used within query string to assign parameters with the variables made



//Helper Function to Set Attributes on DOM Elements
//attributes is an object parameter that will be passed in

//for every key(property) in an attributes object we want to do the built-in setAttribute method
function attributeSetting(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

//check if all images were loaded

function loadedImage () {
    loadedImages++;
    if (loadedImages === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready =", ready);
    }

}


//Create Elements for Photo and Links and add to DOM


function showPhotos() {
    loadedImages = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo)=> {

    console.log("Total Images", totalImages);
    //create anchor tag to link to Unsplash
    
    const item = document.createElement('a');
    //item.setAttribute('href', photo.links.html);
    //item.setAttribute('target', '_blank');
    //create image for photo

    attributeSetting(item, {
        href: photo.links.html,
        target:'_blank',
    });
    const image = document.createElement('img');
    //image.setAttribute('src', photo.urls.regular);
    //image.setAttribute('alt', photo.alt_description);
    //image.setAttribute('title', photo.alt_description);

    attributeSetting(image, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    ///event listener, check when each is finished loading
    image.addEventListener('load', loadedImage);

    //Put image tag inside anchor tag then put inside imageContainer element
    item.appendChild(image);
    imageContainer.appendChild(item);

    });
}
//Get photos from Unsplash API

async function grabPhotos() {
    try {
        const response = await fetch(urlOfAPI);
        //will run json method on response and return json
        photosArray = await response.json();
        console.log(photosArray);
        showPhotos();
        
    } catch (error) {
        //Catch Error
    }
}

//scrolling near bottom of page load more photos
//window is parent of documet element, grandparent of body element
window.addEventListener('scroll', ()=>{
    //height of browser window + how high we are from top of page
    //if that is greater than the height of everything in the body including what is not within view
    //minus 1000
    //trigger event before bottom is reached

    //check if ready is true as well
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; //set to false again so that images only load when ready is true again
        grabPhotos();
        console.log('window.innerHeight: ', window.innerHeight);
        console.log('window.scrollY: ', window.scrollY);
        console.log('window.innerHeight + scrollY:', window.scrollY + window.innerHeight);
        console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000);
    }

});
//On load
grabPhotos();
