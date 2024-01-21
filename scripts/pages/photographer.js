
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
async function displayPhotographer(data) {
    const main = document.getElementById('main');
    const photographerModel = photographerFactory(data);
    const userCardDOM = photographerModel.makeHeader();
    main.appendChild(userCardDOM);
}

// Displays the gallery of media items on the page
function displayGallery(data) {
    const main = document.getElementById('main');
    const gallerySection = document.createElement('section');
    gallerySection.classList.add('gallery');
    gallerySection.setAttribute('tabindex', '0');
    gallerySection.setAttribute('aria-label', 'File Gallery');
    main.appendChild(gallerySection);
    data.forEach((media, index) => {
        const mediaCard = galleryFactory(media, index);
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
    sortSection();

    // Fetch and display the media gallery
    let mediasGallery = [];
    mediasGallery = await getMedias(photographerID);
    displayGallery(mediasGallery);

    // Manage the likes functionality
    GestionLikes();
}

// Call the init function to start the page initialization
init();

// Manages the like functionality on the page
function GestionLikes() {
    const likes = document.querySelectorAll('.likeIt');
    likes.forEach(item => item.addEventListener('click', () => {
        // Toggle the "checked" class on the like button
        item.classList.toggle('checked');

        // Update the like counts for the photographer and media item
        const nbLikesPhotographer = document.querySelector('.likes');
        const nbLikesMedia = item.parentElement.parentElement.firstChild;
        let tampon1 = parseInt(nbLikesPhotographer.innerText);
        let tampon2 = parseInt(nbLikesMedia.innerText);

        if (item.classList.contains('checked')) {
            // Increment the like counts if the like button is checked
            tampon1++;
            nbLikesPhotographer.innerText = tampon1++;
            tampon2++;
            nbLikesMedia.innerText = tampon2;
        } else {
            // Decrement the like counts if the like button is unchecked
            item.removeAttribute('aria-alert');
            tampon1--;
            nbLikesPhotographer.innerText = tampon1;
            tampon2--;
            nbLikesMedia.innerText = tampon2;
        }
    }));

    likes.forEach(item => item.addEventListener('keydown', (event) => {
        if (e.key === 'Enter') {
            // Same functionality as the click event, triggered by pressing Enter on the like button
            item.classList.toggle('checked');

            const nbLikesPhotographer = document.querySelector('.likes');
            const nbLikesMedia = item.parentElement.parentElement.firstChild;
            let tampon1 = parseInt(nbLikesPhotographer.innerText);
            let tampon2 = parseInt(nbLikesMedia.innerText);

            if (item.classList.contains('checked')) {
                tampon1++;
                nbLikesPhotographer.innerText = tampon1++;
                tampon2++;
                nbLikesMedia.innerText = tampon2;
            } else {
                tampon1--;
                nbLikesPhotographer.innerText = tampon1;
                tampon2--;
                nbLikesMedia.innerText = tampon2;
            }
        }
    }));
}

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
       

        then(function (data) {
            medias = data.media.filter(media => media.photographerId == ID); // Filter media items by photographer ID
        })
        .catch(function (err) {
            console.log(err);
            return new Error(err);
        });

    return medias;
}