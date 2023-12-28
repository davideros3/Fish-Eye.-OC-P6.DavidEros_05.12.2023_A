function photographerFactory(data) {
    // Extract required data from the input object using destructuring
    const { name, portrait, city, country, tagline, price, id } = data;
    // Construct the path for the photographer's portrait image
    const picture = `assets/portrait/${portrait}`;
  
    function createDomPhotographer() {
      // Create an anchor element for the user card
      const aTag = document.createElement('a');
      const linkNewPage = `./photographer.html?id=${id}` + name;
      aTag.setAttribute('href', linkNewPage);
      aTag.setAttribute('tabindex', '0');
  
      // Create an article element for the user card content
      const article = document.createElement('article');
      aTag.appendChild(article);
      aTag.setAttribute('role', 'navigation');
  
      // Create an image element for the photographer's portrait
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      img.setAttribute('alt', 'Portrait of ' + name);
     
  
      // Create heading elements and paragraphs for other information
      const h2 = document.createElement('h2');
      const h3 = document.createElement('h3');
      const h4 = document.createElement('h4');
      const p = document.createElement('p');
      h2.textContent = name;
      h3.textContent = city + ', ' + country;
      h4.textContent = tagline;
      p.textContent = price + '€/hour';
  
      // Append the elements to the article
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(h3);
      article.appendChild(h4);
      article.appendChild(p);
  
      // Return the anchor element containing the user card
      return aTag;
    }
  
    function makeCard() {
      // Create a section element for the photographer header
      const photographHeader = document.createElement('section');
  
      // Add appropriate classes and tabindex for accessibility
      photographHeader.classList.add('photograph-header');
      photographHeader.setAttribute('tabindex', '0');
  
      // Create a div element for the photographer identity
      const photographerIdentity = document.createElement('div');
      photographHeader.appendChild(photographerIdentity);
      photographerIdentity.classList.add('photographerIdentity');
  
      // Create heading elements for name, city, and tagline
      const photographerName = document.createElement('h2');
      photographerIdentity.appendChild(photographerName);
      photographerName.classList.add('photographerName');
  
      const photographerCity = document.createElement('h3');
      photographerIdentity.appendChild(photographerCity);
      photographerCity.classList.add('photographerCity');
  
      const photographerTagLine = document.createElement('h4');
      photographerIdentity.appendChild(photographerTagLine);
      photographerTagLine.classList.add('photographerTagLine');
  
      // Insert the extracted data into the heading elements
      photographerName.innerHTML = name;
      photographerCity.innerHTML = city + ', ' + country;
      photographerTagLine.innerHTML = tagline;

      
  
      // Return the photographer header section
      return photographHeader;
    }
  
    // Return an object with all the necessary data and functions
    return {
      // Data properties
      name,
      picture,
      city,
      country,
      tagline,
      price,
      id,
      // Function properties
      createDomPhotographer,
      makeCard,
    };
  }
  

