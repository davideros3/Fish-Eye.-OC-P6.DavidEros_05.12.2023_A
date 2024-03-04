async function getPhotographer(ID) {
    // Retrieve data of the selected photographer.
    // Parameter: ID passed in the URL
    try {
        let photographers = [];
        const JSONFile = 'data/photographers.json';

        const res = await fetch(JSONFile);
        if (res.ok) {
            const data = await res.json();
            photographers = data.photographers;

            const photographer = photographers.find(photographer => photographer.id == ID);
            return photographer;
        }
    } catch (err) {
        console.log(err);
        return new Error(err);
    }
}

function displayPhotographer(data) {
    // Display the photographer's information on the webpage
    const main = document.getElementById('main');
    const photographerModel = photographerFactory(data);
    const userCardDOM = photographerModel.makeHeader();
    main.appendChild(userCardDOM);
}

async function displayGallery(data) {
    // Display the media gallery of the photographer on the webpage
    const main = document.getElementById('main');
    const gallerySection = document.createElement('section');
    gallerySection.classList.add('gallery');
    gallerySection.setAttribute('tabindex', '0');
    gallerySection.setAttribute('aria-label', 'Media Gallery');
    main.appendChild(gallerySection);
    data.forEach((media, index) => {
        // Create a media card for each media item in the gallery
       
        const mediaCard = galleryFactory(media, index);
        const mediaCardDOM = mediaCard.getMediaCardDOM();
        gallerySection.appendChild(mediaCardDOM);
    });
}

async function init() {
    // Extract the photographer ID to process from the URL
    const params = (new URL(document.location)).searchParams;
    const photographerID = params.get('id');

    // Retrieve data of the selected photographer
    const photographer = await getPhotographer(photographerID);
    // Generate the header for the Photographer's page
    displayPhotographer(photographer);
    // Add the photographer's name to the contact modal header
    const contactPhotographer = document.querySelector('.modal header h2');
    contactPhotographer.innerHTML = 'Contact me: ' + '</br>' + photographer.name;

    // Sort the gallery section based on user preferences
    sortSection();

    let mediasGallery = [];
    // Get the media items of the photographer's gallery
    mediasGallery = await getMedias(photographerID);
    // Display the gallery on the webpage
    displayGallery(mediasGallery);

    // Handle like functionality for the media items
    handleLikes();
}

init();

function handleLikes() {
    // Add event listeners to handle liking of media items
    const likes = document.querySelectorAll('.love i');
    likes.forEach(item => item.addEventListener('click', () => {
        item.classList.toggle('checked');

        const nbLikesPhotographer = document.querySelector('.Nb_likes');
        const nbLikesMedia = item.parentElement.parentElement.firstChild;
        let buffer1 = parseInt(nbLikesPhotographer.innerText);
        let buffer2 = parseInt(nbLikesMedia.innerText);

        if (item.classList.contains('checked')) {
            // If like is checked, increment like counts
            buffer1++;
            nbLikesPhotographer.innerText = buffer1++;
            buffer2++;
            nbLikesMedia.innerText = buffer2;
        } else {
            // If like is unchecked, decrement like counts
            item.removeAttribute('aria-alert');
            buffer1--;
            nbLikesPhotographer.innerText = buffer1;
            buffer2--;
            nbLikesMedia.innerText = buffer2;
        }
    }));

    likes.forEach(item => item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            item.classList.toggle('checked');

            const nbLikesPhotographer = document.querySelector('.Nb_likes');
            const nbLikesMedia = item.parentElement.parentElement.firstChild;
            let buffer1 = parseInt(nbLikesPhotographer.innerText);
            let buffer2 = parseInt(nbLikesMedia.innerText);

            if (item.classList.contains('checked')) {
                // If like is checked using Enter key, increment like counts
                buffer1++;
                nbLikesPhotographer.innerText = buffer1++;
                buffer2++;
                nbLikesMedia.innerText = buffer2;
            } else {
                // If like is unchecked using Enter key, decrement like counts
                buffer1--;
                nbLikesPhotographer.innerText = buffer1;
                buffer2--;
                nbLikesMedia.innerText = buffer2;
            }
        }
    }));
}
let medias = [];
async function getMedias(ID) {
    // Retrieve the media items for the specified photographer ID
    
    const JSONFile = 'data/photographers.json';

    await fetch(JSONFile)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (data) {
            medias= data.media.filter(media => media.photographerId == ID);
        })
        .catch(function (err) {
            console.log(err);
        });

    return medias;
}

// * ***************** Ligthbox ******************//

// Button  close

const close = document.querySelector('.close');
const lightbox = document.querySelector('.lightbox_container');

// Close button click event listener
close.addEventListener('click', () => {
  const pageMain = document.querySelector('main');
  const header = document.querySelector('header');
  
  // Make the main content and header accessible
  pageMain.setAttribute('aria-hidden', false);
  pageMain.setAttribute('tabindex', '0');
  header.setAttribute('aria-hidden', false);
  header.setAttribute('tabindex', '0');
  
  // Hide the lightbox
  lightbox.classList.add('hidden');
  lightbox.classList.remove('show');
});

// Keyboard navigation for close button (if it has focus)
close.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const pageMain = document.querySelector('main');
    const header = document.querySelector('header');
    
    // Make the main content and header accessible
    pageMain.setAttribute('aria-hidden', false);
    pageMain.setAttribute('tabindex', '0');
    header.setAttribute('aria-hidden', false);
    header.setAttribute('tabindex', '0');
    
    // Hide the lightbox
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
  }
});

// Keyboard navigation: "Escape" key
window.addEventListener('keydown', (e) => {
  // If key is "Escape" and the lightbox is visible
  if (e.key === 'Escape' && lightbox.classList.contains('show')) {
    const pageMain = document.querySelector('main');
    const header = document.querySelector('header');
    
    // Make the main content and header accessible
    pageMain.setAttribute('aria-hidden', false);
    pageMain.setAttribute('tabindex', '0');
    header.setAttribute('aria-hidden', false);
    header.setAttribute('tabindex', '0');
    
    // Hide the lightbox
    lightbox.classList.add('hidden');
    lightbox.classList.remove('show');
  }
});

// Sorting 
function sortSection() {
    const main = document.getElementById('main');
    const sortSection = document.createElement('section');
    sortSection.classList.add('sort_container');
    main.appendChild(sortSection);
  
    // "Sort by" list
    const div1 = document.createElement('div');
    sortSection.appendChild(div1);
    const sortLabel = document.createElement('label');
    sortLabel.setAttribute('for', 'sortBy');
    sortLabel.innerText = 'Sort by: ';
    div1.appendChild(sortLabel);
    
    // Select element for sorting criteria
    const sortSelect = document.createElement('select');
    sortSelect.setAttribute('name', 'sortBy');
    sortSelect.setAttribute('id', 'sortBy');
    sortSelect.setAttribute('aria-label', 'Primary sort');
    sortSelect.addEventListener('change', () => {
      sorting();
    });
    sortSection.appendChild(sortSelect);
  
    div1.appendChild(sortSelect);
    
    // Options for sorting criteria
    const sortOption0 = document.createElement('option');
    sortOption0.setAttribute('value', 'none');
    sortOption0.innerText = 'No sorting';
    sortSelect.appendChild(sortOption0);
    
    const sortOption1 = document.createElement('option');
    sortOption1.setAttribute('value', 'likes');
    sortOption1.innerText = 'Popularity';
    sortSelect.appendChild(sortOption1);
    
    const sortOption2 = document.createElement('option');
    sortOption2.setAttribute('value', 'date');
    sortOption2.innerText = 'Date';
    sortSelect.appendChild(sortOption2);
    
    const sortOption3 = document.createElement('option');
    sortOption3.setAttribute('value', 'title');
    sortOption3.innerText = 'Title';
    sortSelect.appendChild(sortOption3);
    
    const sortOption4 = document.createElement('option');
    sortOption4.setAttribute('value', 'price');
    sortOption4.innerText = 'Price';
    sortSelect.appendChild(sortOption4);

    
}

async function sorting () {
    const params = (new URL(document.location)).searchParams
    const ID = params.get('id')
    data = await getMedias(ID)

    const sortBy = document.getElementById('sortBy').value
    
            switch (sortBy) {
                case 'likes':
                    data.sort((a, b) => a.likes - b.likes)
                    break
                case 'title':
                    data.sort((a, b) => {
                        if (a.title > b.title) {
                            return 1
                        }
                        if (a.title < b.title) {
                            return -1
                        }
                        return 0
                    })
                    break
                case 'date':
                    data.sort((a, b) => {
                        if (a.date > b.date) {
                            return 1
                        }
                        if (a.date < b.date) {
                            return -1
                        }
                        return 0
                    })
                    break
                case 'price':
                    data.sort((a, b) => a.price - b.price)
                    break
            }
            
      
    

    const Nb_likes = document.querySelector('.Nb_likes')
    Nb_likes.innerText = 0
    const gallery = document.querySelector('.gallery')
    gallery.remove()
    await displayGallery(data) 
}
  


