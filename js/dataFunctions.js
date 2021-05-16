export const getSearchTerm = () => {
    // .value get values of text field
    // .trim() removes white space
    const rawSearchTerm = document.getElementById("search").value.trim();

    // find two or more space
    const regex = /[ ]{2,}/gi;
    // replace all space by one  " "
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");
    return searchTerm;
}

export const retrieveSearchResults = async (searchTerm) => {
    const wikiSearchString = getWikiSearchString(searchTerm);
    const wikiSearchResults = await requestData(wikiSearchString);
    let resultArray = [];
    // We looking for property in the json file
    if(wikiSearchResults.hasOwnProperty("query")) {
        resultArray = processWikiResults(wikiSearchResults.query.pages);
    }
    return resultArray;
}

// the amount of maximum characters we want to receive to the wikipedia API
const getWikiSearchString = (searchTerm) => {
    const maxChars = getMaxChars(searchTerm);
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchString = encodeURIComponent(rawSearchString);
    return searchString;
}

const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;

    let maxChars;
    if(width < 414) maxChars = 65;
    if(width >= 414 && width < 1400) maxChars = 100;
    if (width >= 1400) maxChars = 130;
    return maxChars;
}

const requestData = async (searchString) => {
    try {
        const response = await fetch(searchString);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        
    }
}

const processWikiResults = (results) => {
    const resultArray = [];
    Object.keys(results).forEach(key => {
        const id = key;
        const title = results[key].title;
        const text = results[key].extracts;
        const img = results[key].hasOwnProperty("thumbnail") ? results[key].thumbnail.source : null;
        const item = { 
            id: id,
            title: title,
            img: img,
            text: text
        };
        resultArray.push(item);
    })
};