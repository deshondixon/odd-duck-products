'use strict';

console.log("duck,duck,goose!");

let myContainer = document.querySelector('section');
let resultBtn = document.querySelector('section + div');
let results = document.querySelector('ul');

let product1 = document.querySelector('section img:first-child');
let product2 = document.querySelector('section img:nth-child(2)');

let howManyTimesUserHasVoted = 0;
let maxNumberOfVotes = 15;

function OddProducts(name, fileExtension = 'jpg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name}.${this.fileExtension}`;
  this.score = 0;
  this.views = 0;
}

let bag = new OddProducts('bag');
let banana = new OddProducts('banana');
let bathroom = new OddProducts('bathroom');
let boots = new OddProducts('boots');
let breakfast = new OddProducts('breakfast');
let bubblegum = new OddProducts('bubblegum');
let chair = new OddProducts('chair');
let cthulhu = new OddProducts('cthulhu');
let dogDuck = new OddProducts('dog-duck');
let dragon = new OddProducts('dragon');
let pen = new OddProducts('pen');
let petSweep = new OddProducts('pet-sweep');
let scissors = new OddProducts('scissors');
let shark = new OddProducts('shark');
let sweep = new OddProducts('sweep', 'png');
let spaceKid = new OddProducts('spaceKid');
let unicorn = new OddProducts('unicorn');
let waterCan = new OddProducts('water-can');
let wine = new OddProducts('wine-glass');
let fancyDuck = new OddProducts('duck-fancy', 'png');

let allOddProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, spaceKid, unicorn, waterCan, wine, fancyDuck];
console.log(allOddProducts);

function selectRandomOddProducts() {
  return Math.floor(Math.random() * allOddProducts.length);
}

function renderOddProducts() {
  let odd1 = selectRandomOddProducts();
  let odd2 = selectRandomOddProducts();
  console.log(odd1, odd2);

  while (odd1 === odd2) {
    odd2 = selectRandomOddProducts();
    console.log(odd1, odd2);
  }

  product1.src = allOddProducts[odd1].src;
  product2.alt = allOddProducts[odd2].name;
  allOddProducts[odd1].views++;

  product1.src = allOddProducts[odd1].src;
  product2.alt = allOddProducts[odd2].name;
  allOddProducts[odd2].views++;
}

function renderResults() {
  for (let i= 0; i < allOddProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allOddProducts[i].name} had ${allOddProducts[i].views} views and ${allOddProducts.score} votes`;
    results.appendChild(li);
  }
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Select product')
  }
  console.log(event.target.alt);
  howManyTimesUserHasVoted++;
  let clickedOddProduct = event.target.alt;

  for (let i = 0; i < allOddProducts.length; i++) {
    if (event.target.alt === allOddProducts[i].name) {
      allOddProducts[i].score++;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberOfVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultBtn.className = 'clicks-allowed';
    resultBtn.addEventListener('click', renderResults)
  } else {
    renderOddProducts();
  }
}

myContainer.addEventListener('click', handleClick);

renderOddProducts();
