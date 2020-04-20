var movieTitleInput = document.querySelector('#movie-input');
var movieYearInput = document.querySelector('#movie-year');
var ajaxBtn = document.querySelector('#ajax-btn');
var result = document.querySelector('#result');
var movieTitle = '',
  movieYear = '';

var api = '/movies/get/';

function sendRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.responseType = 'json';

  xhr.send();

  if (xhr.readyState < 4) {
    showLoading();
  }
  xhr.onload = function () {
    //console.log(xhr.response);
    if (xhr.status >= 400) {
      console.log('❌');
      result.innerHTML = 'nothing...Try something else';
    } else {
      console.log('👍');
      outputInfo(xhr.response);
    }
  };
  xhr.onerror = function () {
    result.innerHTML = '';
    console.error('❌ - Something went wrong!');
  };
}

function showLoading() {
  result.innerHTML = 'Loading...';
}
function outputInfo(data) {
  result.innerHTML = '';
  if (!data.Search) {
    if (data.Poster == 'N/A') {
      data.Poster = './img/no-poster.jpg';
    }
    result.innerHTML +=
      '<div class="item"><h2>' +
      data.Title +
      '</h2> (' +
      data.Year +
      ')<hr /> <img src="' +
      data.Poster +
      '" alt="movie"></div>';
  } else {
    data.Search.forEach((el) => {
      result.innerHTML +=
        '<div class="item"><h2>' +
        el.Title +
        '</h2> (' +
        el.Year +
        ')<hr /> <img src="' +
        el.Poster +
        '" alt="movie"></div>';
    });
  }
}

ajaxBtn.addEventListener('click', function () {
  if (!movieTitleInput.validity.valid) {
    return;
  } else {
    movieTitle = encodeURIComponent(movieTitleInput.value);
    movieYear = movieYearInput.value;
    sendRequest('GET', api + movieTitle + '/' + movieYear);
  }
});
