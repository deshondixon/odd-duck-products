const indexArray = [];

const myContainer = document.querySelector('section');
const resultBtn = document.querySelector('section + div');
const results = document.querySelector('ul');
const product1 = document.querySelector('section img:first-child');
const product2 = document.querySelector('section img:nth-child(2)');
let howManyTimesUserHasVoted = 0;
const maxNumberOfVotes = 25;

function OddProducts(name, fileExtension = 'jpg') {
  this.name = name;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name}.${this.fileExtension}`;
  this.score = 0;
  this.views = 0;
}

const bag = new OddProducts('bag');
const banana = new OddProducts('banana');
const bathroom = new OddProducts('bathroom');
const boots = new OddProducts('boots');
const breakfast = new OddProducts('breakfast');
const bubblegum = new OddProducts('bubblegum');
const chair = new OddProducts('chair');
const cthulhu = new OddProducts('cthulhu');
const dogDuck = new OddProducts('dog-duck');
const dragon = new OddProducts('dragon');
const pen = new OddProducts('pen');
const petSweep = new OddProducts('pet-sweep');
const scissors = new OddProducts('scissors');
const shark = new OddProducts('shark');
const sweep = new OddProducts('sweep', 'png');
const spaceKid = new OddProducts('spaceKid');
const unicorn = new OddProducts('unicorn');
const waterCan = new OddProducts('water-can');
const wine = new OddProducts('wine-glass');

const allOddProducts = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, spaceKid, unicorn, waterCan, wine];

function selectRandomOddProducts() {
  return Math.floor(Math.random() * allOddProducts.length);
}

function renderOddProducts() {
  while (indexArray.length < 19) {
    const ranProd = selectRandomOddProducts();
    if (!indexArray.includes(ranProd)) {
      indexArray.push(ranProd);
    }
  }
  // console.log(indexArray);
  const odd1 = indexArray.shift();
  const odd2 = indexArray.shift();

  product1.src = allOddProducts[odd1].src;
  product1.alt = allOddProducts[odd1].name;
  allOddProducts[odd1].views += 1;

  product2.src = allOddProducts[odd2].src;
  product2.alt = allOddProducts[odd2].name;
  allOddProducts[odd2].views += 1;
}

function renderResults() {}

function storeOddProducts() {
  console.log(OddProducts);
  const stringifiedOddProducts = JSON.stringify(OddProducts);
  console.log(stringifiedOddProducts);
  localStorage.setItem('products', stringifiedOddProducts);
}

function getOddProducts() {
  const potentialOddProducts = localStorage.getItem('products');
  if (potentialOddProducts) {
    const parsedProducts = JSON.parse(potentialOddProducts);
  }
  console.log(parsedProducts);
  for (const product of parsedProducts) {

  }
}

function handleClick(e) {
  if (e.target === myContainer) {
    alert('Select product');
  }
  howManyTimesUserHasVoted += 1;
  const clickedOddProducts = e.target.alt;

  for (let i = 0; i < allOddProducts.length; i += 1) {
    if (clickedOddProducts === allOddProducts[i].name) {
      allOddProducts[i].score += 1;
      break;
    }
  }
  if (howManyTimesUserHasVoted === maxNumberOfVotes) {
    myContainer.removeEventListener('click', handleClick);
    resultBtn.className = 'clicks-allowed';
    resultBtn.addEventListener('click', renderChart);
    renderChart();
  } else {
    renderOddProducts();
  }
  storeOddProducts();
}

function renderChart() {
  const OddProductsNames = [];
  const OddProductsViews = [];
  const OddProductsScore = [];
  for (let i = 0; i < allOddProducts.length; i += 1) {
    OddProductsNames.push(allOddProducts[i].name);
    OddProductsViews.push(allOddProducts[i].views);
    OddProductsScore.push(allOddProducts[i].score);
  }
  const data = {
    labels: OddProductsNames,
    datasets: [{
      label: '# of views',
      data: OddProductsViews,
      backgroundColor: [
        'yellow',
      ],
      borderColor: [
        'orange',
      ],
      borderWidth: 7,
    }, {
      label: '# of votes',
      data: OddProductsScore,
      backgroundColor: [
        'red',
      ],
      borderColor: [
        'blue',
      ],
      borderWidth: 4,
    }],
  };
  const config = {
    type: 'bar',
    data,
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          stacked: true,
        },
      },
    },
  };
  const myChart = new Chart(
    document.getElementById('myChart'),
    config,
  );
}

console.log(indexArray);
renderOddProducts();
myContainer.addEventListener('click', handleClick);
