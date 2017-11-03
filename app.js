'use strict';
//
// variable storing number of stores built
let x = 0;

// array storing time values
const hours = [ '', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm',
    '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// function to render time values in html
function renderHours(n){
    const hrs = document.getElementById('firstLine');
    const td = document.createElement('td');
    td.textContent = hours[n];
    hrs.appendChild(td);
};

// function to add totals to table footer
function renderTotals(){
    const tableRowTwo = document.getElementById('tafoot');
    const tr = document.createElement('tr');
    tableRowTwo.appendChild(tr);
    let td = document.createElement('td');
    td.textContent = 'TOTAL';
    tr.appendChild(td);
    for(let i = 0; i < hours.length - 1; i++){
        td = document.createElement('td');
        td.textContent = totalsArrayTwo[i];
        tr.appendChild(td);
    }
}

// function to render sales in a grid
Store.prototype.render = function(sph){
    const tableRow = document.getElementById('myTable');
    const tr = document.createElement('tr');
    tableRow.appendChild(tr);
    let td = document.createElement('td');
    td.textContent = this.name;
    tr.appendChild(td);

    for(let j = 0; j < hours.length - 1; j++){
        td = document.createElement('td');
        td.textContent = sph[j];
        tr.appendChild(td);
    }
};

// function to generate a random value for customers per hour
function custPerHour(minCustomers, maxCustomers){
    minCustomers = Math.ceil(minCustomers);
    maxCustomers = Math.floor(maxCustomers);
    return Math.floor(Math.random() * (maxCustomers - minCustomers + 1)) + minCustomers; 
};

// function to calculate sales per hour
function salesPerHour(avgSales, custPerHour){
    return Math.floor(avgSales * custPerHour);
};

// constructor function to make stores
function Store(name, minCustomers, maxCustomers, avgSales, custPerHour, salesPerHour){
    this.name = name;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgSales = avgSales;
    this.custPerHour = custPerHour;
    this.salesPerHour = salesPerHour;
};

// stores used
const pdxAirport = new Store('pdxAirport', 23, 65, 6.3, custPerHour, salesPerHour);
const pioneerSq = new Store('Pioneer Square', 3, 24, 1.2, custPerHour, salesPerHour);
const powells = new Store('Powell\'s', 11, 38, 3.7, custPerHour, salesPerHour);
const stJohns = new Store('St. Johns', 20, 28, 2.3, custPerHour, salesPerHour);
const waterfront = new Store('Waterfront', 2, 16, 4.6, custPerHour, salesPerHour);

// function to store sales per hour and call render for each store
const totalsArrayTwo = [];
function calculateCookies(object, line){
    const array = [];
    for(let i = 0; i < hours.length; i++){
        const cph = custPerHour(object.minCustomers, object.maxCustomers);
        const sph = object.salesPerHour(object.avgSales, cph);
        array.push(sph);
        totalsArrayTwo[i] = (totalsArrayTwo[i] || 0) + sph;
    };
    object.render(array, line);
    console.log(array);
    console.log(totalsArrayTwo);

    renderTotals();
    x++;
    console.log(x);
    if(x > 3){
        document.getElementById('tafoot').deleteRow(0);
        document.getElementById('tafoot').deleteRow(1);
        document.getElementById('tafoot').deleteRow(x - x + 1);
    }
}

// call to render hours
for(let i = 0; i < 16; i++){
    renderHours(i);
}

// creates new store using form inputs
const form = document.getElementById('new-store');
form.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const minCustomers = document.getElementById('minCustomers').value;
    const maxCustomers = document.getElementById('maxCustomers').value;
    const avgSales = document.getElementById('avgSales').value;

    const newStore = new Store(name, minCustomers, maxCustomers, avgSales, custPerHour, salesPerHour);

    console.log(newStore);
    calculateCookies(newStore, 'eigthline');
});

// calls to run functions on each store
calculateCookies(pdxAirport, 'secondLine');
calculateCookies(pioneerSq, 'thirdLine');
calculateCookies(powells, 'fourthLine');
calculateCookies(stJohns, 'fifthLine');
calculateCookies(waterfront, 'sixthLine');

console.log(totalsArrayTwo);