import { watch } from 'melanke-watchjs';
import axios from 'axios';
import parser from './parser/parser';
import renderFeed from './renders/feed-render';
import renderPage from './renders/page-render';
import renderError from './renders/error-render';


const urlInput = document.querySelector('.url-input');
const addRssButton = document.querySelector('.rss-add');
const outputContainer = document.querySelector('.output');
const errorContainer = document.querySelector('.error');

export default (state) => {
  watch(state, 'language', () => {
    renderPage(state.language);
  });

  watch(state, 'urlInputValidity', () => {
    if (!state.urlInputValidity) {
      console.log('input is not valid!');
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
    errorContainer.innerHTML = ' ';

    const corsUrl = 'https://cors-anywhere.herokuapp.com/';

    state.feedUrls.forEach((feedUrl) => {
      axios.get(`${corsUrl}${feedUrl}`)
        .then((response) => {
          const parsedFeed = parser(response.data);
          renderFeed(parsedFeed, state.language);
        })
        .catch((error) => {
          console.log('watch error!! ', error);
          renderError('network', state.language);
        });
    });
  });
};
