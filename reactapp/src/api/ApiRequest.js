//create a function in reactjs that will fetch a list of contacts from the api
// Path: reactapp/src/api/ApiRequest.js
// //create a function that will fetch a list of contacts from the api

export const getContacts = () => {
    return fetch('http://localhost:3500/cms')
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
};