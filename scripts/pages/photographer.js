
// Asynchronously fetches a photographer by ID from a JSON file
async function getPhotographer(ID) {
    try {
        let photographers = [];
        const JSONFile = 'data/photographers.json';

        const res = await fetch(JSONFile); // Fetch the JSON file
        if (res.ok) {
            const data = await res.json(); // Convert the response to JSON
            photographers = data.photographers; // Get the array of photographers from the JSON data

            const photographer = photographers.find(photographers => photographers.id == ID); // Find the photographer with the matching ID
            return photographer;
        }
    } catch (err) {
        console.log(err);
        return new Error(err);
    }
}

// Displays the photographer's information on the page
// async function displayPhotographer(data) {
//     const main = document.getElementById('main');
//     const photographerModel = photographerFactory(data);
//     const userCardDOM = photographerModel.makeHeader();
//     main.appendChild(userCardDOM);
// }


  // Add code here to create and customize the photographer header element

 async function displayPhotographer (data) {
    const main = document.getElementById('main')
    const photographerModel = photographerFactory(data)
    const userCardDOM = photographerModel.makeCard()
    main.appendChild(userCardDOM)
    photograph-header.appendChild(userCardDOM)

}
// Add other methods and properties as needed

// Displays the gallery of media items on the page
function displayGallery(data) {
    const main = document.getElementById('main');
    const gallerySection = document.createElement('section');
    gallerySection.classList.add('gallery');
    gallerySection.setAttribute('tabindex', '0');
    gallerySection.setAttribute('aria-label', 'File Gallery');
    const like =  document.createElement("p")
    like.classList.add("Nb_likes")
    like.innerHTML = ""
    gallerySection.appendChild(like)
    main.appendChild(gallerySection);
    data.forEach((media, index) => {
       
        const mediaCard = galleryFactory(media, index );
        const mediaCardDOM = mediaCard.getMediaCardDOM();
       
        gallerySection.appendChild(mediaCardDOM);
    });
}

// Initializes the page
async function init() {
    // Get the photographer ID from the URL parameters
    const params = new URL(document.location).searchParams;
    const photographerID = params.get('id');

    // Fetch the photographer data and display it
    const photographer = await getPhotographer(photographerID);
    displayPhotographer(photographer);

    // Set the "Contact Me" header with the photographer's name
    const contactPhotographer = document.querySelector('.modal header h2');
    contactPhotographer.innerHTML = 'Contact Me  : ' + '</br>' + photographer.name;

    // Sort the gallery section
   

    // Fetch and display the media gallery
    let mediasGallery = [];
    mediasGallery = await getMedias(photographerID);
    console.log(mediasGallery)
    displayGallery(mediasGallery);

    // Manage the likes functionality
   // GestionLikes();
}

// Call the init function to start the page initialization
init();



// Fetches the media items for a photographer by ID from a JSON file
async function getMedias(ID) {
    medias = [];

    const JSONFile = 'data/photographers.json';

    await fetch(JSONFile)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
       

        .then(function (data) {
            medias = data.media.filter(media => media.photographerId == ID); // Filter media items by photographer ID
        })
        .catch(function (err) {
            console.log(err);
            return new Error(err);
        });

    return medias;
}


// Get the element with the class 'close'
const close = document.querySelector('.close');

// Get the element with the class 'lightbox_container'
const lightbox = document.querySelector('.lightbox_container');

// Add a click event listener to the 'close' element
close.addEventListener('click', () => {
  const pageMain = document.querySelector('main');
  const header = document.querySelector('header');
  
  // Set 'aria-hidden' attribute to false for pageMain and header elements
  pageMain.setAttribute('aria-hidden', false);
  pageMain.setAttribute('tabindex', '0');
  header.setAttribute('aria-hidden', false);
  header.setAttribute('tabindex', '0');
  
  // Add 'hidden' class to lightbox and remove 'show' class
  lightbox.classList.add('hidden');
  lightbox.classList.remove('show');
});

// Keyboard navigation: Enter key for the 'close' button
close.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const pageMain = document.querySelector('main');
    const header = document.querySelector('header');
    
    // Set 'aria-hidden' attribute to false for pageMain and header elements
    pageMain.setAttribute('aria-hidden', false);
    pageMain.setAttribute('tabindex', '0');
    header.setAttribute('aria-hidden', false);
    header.setAttribute('tabindex', '0');
    
    // Add 'hidden' class to lightbox and remove 'show' class
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
  }
});

// Keyboard navigation: Escape key
window.addEventListener('keydown', (e) => {
  // If key === 'Escape' and lightbox has 'show' class
  if (e.key === 'Escape' && lightbox.classList.contains('show')) {
    const pageMain = document.querySelector('main');
    const header = document.querySelector('header');
    
    // Set 'aria-hidden' attribute to false for pageMain and header elements
    pageMain.setAttribute('aria-hidden', false);
    pageMain.setAttribute('tabindex', '0');
    header.setAttribute('aria-hidden', false);
    header.setAttribute('tabindex', '0');
    
    // Add 'hidden' class to lightbox and remove 'show' class
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
  }
});