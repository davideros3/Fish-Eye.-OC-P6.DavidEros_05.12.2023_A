
class JSONConnect {
    /**
     * @param {string} url
     */
    constructor(url) {
      this._url = url;
    }
  
    fetchData() {
      return fetch(this._url)
        .then(response => response.json())
        .then(data => {
          // Work with JSON data here
          console.log(data);
        })
        .catch(err => {
          // Do something for an error here
          console.error(err);
        });
    }
  }
  
  const jsonConnect = new JSONConnect('data/photographers.json');
  jsonConnect.fetchData();

