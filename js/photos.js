const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

function getPhotos() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.unsplash.com/photos/curated/?client_id=47975a9a8b5b50e2ccd70194462bddbc5532e315b8fad6cc75e156eebd0a8b76&per_page=30', true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data);
    if (request.status >= 200 && request.status < 400) {
      data.forEach(photo => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.src = photo["urls"].regular;

        container.appendChild(card);
        card.appendChild(img);
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }

  request.send();
}

function getSearchedPhotos() {
  var query = document.getElementById('searchbar').value;
  var request = new XMLHttpRequest();
  var url = `https://api.unsplash.com/search/photos/?page=1&per_page=50&query=${query}&client_id=47975a9a8b5b50e2ccd70194462bddbc5532e315b8fad6cc75e156eebd0a8b76`
  console.log(url);
  request.open('GET', url, true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    var photos = data["results"];
    console.log(photos);
    if (request.status >= 200 && request.status < 400) {
      photos.forEach(photo => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const img = document.createElement('img');
        img.src = photo["urls"].regular;

        container.appendChild(card);
        card.appendChild(img);
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Gah, it's not working!`;
      app.appendChild(errorMessage);
    }
  }

  request.send();
}

getPhotos();