async function getPhotographers() {
  try {
    let photographers = []
    const JSONFile = 'data/photographers.json'

    // Fetch the JSON file containing photographers' data
    const res = await fetch(JSONFile)

    // Check if the fetch request was successful
    if (res.ok) {
      // Extract the JSON data from the response
      const data = await res.json()
      // Get the array of photographers from the data
      photographers = data.photographers
    }
    return photographers
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  // Iterate over each photographer
  photographers.forEach((photographer) => {
    // Create a photographer model instance
    const photographerModel = photographerFactory(photographer)
    // Get the DOM representation of the photographer's user card
    const userCardDOM = photographerModel.getUserCardDOM()
    // Append the user card to the photographers section on the webpage
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Retrieve photographers' data
  const photographers = await getPhotographers()

  // Display data on the webpage
  displayData(photographers)
}

// Initialize the application
init()