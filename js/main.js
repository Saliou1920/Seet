import {setSearchFocus} from './searchBar.js';
import {buildSearchResults} from './searchResults.js';
import {getSearchTerm} from './dataFunctions.js';

// When the page  anywhere in the document, output "Hello World" 

document.addEventListener("readystatechange", (event) => {
    if(event.target.readySate === "complete") {
        initApp();
    }
})

const initApp = () => {
    setSearchFocus();

    // listener on the form
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);

}

// 

const submitTheSearch = (event) => {
    // prevent form to reload
    event.preventDefault();

    // delete search results

    // Process the search
    processTheSearch();
    // set the focus
    setSearchFocus();
}

// async function allow to interact with API
const processTheSearch = async()  =>{

    // get the search term
    const searchTerm = getSearchTerm();
    if (searchTerm === "") {
        const resultArray = await retrieveSearchResults(searchTerm);
        
    }
    if (resultArray.length) {
        // sets stats line
        buildSearchResults(resultArray);

    }
}