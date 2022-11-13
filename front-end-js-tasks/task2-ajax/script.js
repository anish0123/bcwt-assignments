'use strict';
const apiUrl = 'https://api.tvmaze.com/search/shows?q=';

//TO get reference to the form
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');
const results = document.querySelector('#results');

button.addEventListener('click', (event) => {
    // do not submit the form to anywhere(no page refresh)
    event.preventDefault();
    // prevent the generic event listener at the bottom
    event.stopPropagation();

    if(input.value.length >1) {
        getTvSeriesData(input.value);
    } 
});


const renderResults = (data) => {
    //clear existing results before appending new ones
    results.innerHTML='';
    //loop through all search results
    for(let i=0; i<data.length; i++) {
        const h3 = document.createElement('h3');
        h3.textContent = data[i].show.name;
        const img = document.createElement('img');
        img.src = data[i].show.image.medium;
        results.append(img);
        results.append(h3);
        // TODO: render more data from the results
        const website = document.createElement('a');
        const link = document.createTextNode("OfficialSite: " + data[i].show.officialSite);
        website.appendChild(link);
        website.title = "This is link";
        website.href = data[i].show.officialSite;
        results.append(website);
        const genre = document.createElement('h4');
        genre.textContent = 'Genres: ' + data[i].show.genres.join(" | ");
        results.append(genre);
        const summary = document.createElement('p');
        summary.innerHTML = 'Summary: ' + data[i].show.summary;
        results.append(summary);
    }
    

};

const getTvSeriesData = async(name) => {
    try{
        const response = await fetch(apiUrl + name);
    const data = await response.json();
    console.log('results:',data);
    renderResults(data);
    }catch(error){
        console.log('network failure:', error);
    }
    
};

document.addEventListener('click',(event) => {
    console.log('mouse clicked somewhere on the page.',event);
});