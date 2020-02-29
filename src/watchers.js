import { watch } from 'melanke-watchjs';
import axios from 'axios';

const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const divResponse = document.querySelector('.response');

export default (state) => {
  watch(state, 'urlInputValidity', () => {
    if (!state.urlInputValidity) {
      urlInput.classList.add('is-invalid');
      addRssButton.classList.add('disabled');
    } else {
      urlInput.classList.remove('is-invalid');
      addRssButton.classList.remove('disabled');
    }
  });

  watch(state, 'feeds', () => {
    // urlInput.value = '';

    const cors = 'https://cors-anywhere.herokuapp.com/';
    const domParser = new DOMParser();

    state.feeds.map((feed) => {
      axios.get(`${cors}${feed}`)
        .then((response) => {
          // console.log('response: ', response);
          const parsedResponse = domParser.parseFromString(response.data, 'text/xml');
          console.log('parsedResponse: ', parsedResponse);
          divResponse.innerHTML = parsedResponse.all[0].textContent;
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    });
  });
};
