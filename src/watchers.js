import { watch } from 'melanke-watchjs';
import axios from 'axios';
import parser from './parser/parser';
import render from './render';

const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const outputContainer = document.querySelector('.output');

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

  watch(state, 'feedUrls', () => {
    // urlInput.value = ''; // clear input
    outputContainer.innerHTML = '';
    const corsUrl = 'https://cors-anywhere.herokuapp.com/';

    state.feedUrls.forEach((feedUrl) => {
      axios.get(`${corsUrl}${feedUrl}`)
        .then((response) => {
          const parsedFeed = parser(response.data);
          render(parsedFeed);
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    });
  });
};
