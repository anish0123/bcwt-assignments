'use strict';
console.log("Hello World!");

const figCaptionElem = document.querySelector('figcaption');
const imgElem = document.querySelector('img');

const getData = async () => {
    const response = await fetch('pics.json');
    console.log(response);
    const data = await response.json();
    console.log(data);
    figCaptionElem.innerText = data[0].name;
    imgElem.src = data[0].url;
};

getData();


console.log("Last line of code");
