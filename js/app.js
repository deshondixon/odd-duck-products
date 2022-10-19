'use strict';

let indexArray = [];

let myContainer = document.querySelector('section');
let resultBtn = document.querySelector('section + div');
let results = document.querySelector('ul');
let product1 = document.querySelector('section img:first-child');
let product2 = document.querySelector('section img:nth-child(2)');
let howManyTimesUserHasVoted = 0;
let maxNumberOfVotes = 17;


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

let allOddProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, spaceKid, unicorn, waterCan, wine];

function selectRandomOddProducts() {
  return Math.floor(Math.random() * allOddProducts.length);
}

function renderOddProducts() {

  while (indexArray.length < 19) {
    let ranProd = selectRandomOddProducts ();
    if (!indexArray.includes(ranProd)) {
      indexArray.push(ranProd);
    }
  }
  console.log(indexArray);
  let odd1 = indexArray.shift();
  let odd2 = indexArray.shift();

  product1.src = allOddProducts[odd1].src;
  product1.alt = allOddProducts[odd1].name;
  allOddProducts[odd1].views++;

  product2.src = allOddProducts[odd2].src;
  product2.alt = allOddProducts[odd2].name;
  allOddProducts[odd2].views++;
}


function renderResults() {
}

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Select product')
  }
  howManyTimesUserHasVoted++;
  let clickedOddProducts = event.target.alt;

  for (let i = 0; i < allOddProducts.length; i++) {
    if (clickedOddProducts === allOddProducts[i].name) {
      allOddProducts[i].score++;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberOfVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultBtn.className = 'clicks-allowed';
    resultBtn.addEventListener('click', renderChart)
    renderChart();
  } else {
    renderOddProducts();
  }
}

function renderChart() {
  let OddProductsNames = [];
  let OddProductsViews = [];
  let OddProductsScore = [];
  for (let i = 0; i < allOddProducts.length; i++) {
    OddProductsNames.push(allOddProducts[i].name);
    OddProductsViews.push(allOddProducts[i].views);
    OddProductsScore.push(allOddProducts[i].score);
  }
  const data = {
    labels: OddProductsNames,
    datasets: [
      {
        label: '# of views',
        data: OddProductsViews,
        backgroundColor: [
          'yellow'
        ],
        borderColor: [
          'orange'
        ],
        borderWidth: 7
      },
      {
        label: '# of votes',
        data: OddProductsScore,
        backgroundColor: [
          'red'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 4
      }
    ]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis:'y',
      scales: {
        y: {
          stacked:true
        },
      }
    }
  };
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}

myContainer.addEventListener('click', handleClick);

renderOddProducts();
