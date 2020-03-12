export default (xmlData) => new DOMParser().parseFromString(xmlData, 'text/xml');
