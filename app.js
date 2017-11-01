'use strict';

// array storing time values
const hours = [ '', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm',
    '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// function to render time values in html
Store.prototype.renderHours = function(n){
    const hrs = document.getElementById('firstLine');
    const td = document.createElement('td');
    td.textContent = hours[n];
    hrs.appendChild(td);
};

// function to render sales in a grid
Store.prototype.render = function(parent, sph){
    const tr = document.getElementById(parent);
    let td = document.createElement('td');
    td.textContent = this.name;
    tr.appendChild(td);

    for(let j = 0; j < hours.length - 1; j++){
        td = document.createElement('td');
        console.log(this.name);
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
function calculateCookies(object, line){
    const array = [];
    for(let i = 0; i < hours.length; i++){
        const cph = custPerHour(object.minCustomers, object.maxCustomers);
        const sph = object.salesPerHour(object.avgSales, cph);
        array.push(sph);
    };
    object.render(line, array);
    console.log(array);
}

// call to render hours
for(let i = 0; i < 16; i++){
    Store.prototype.renderHours(i);
}

// calls to run functions on each store
calculateCookies(pdxAirport, 'secondLine');
calculateCookies(pioneerSq, 'thirdLine');
calculateCookies(powells, 'fourthLine');
calculateCookies(stJohns, 'fifthLine');
calculateCookies(waterfront, 'sixthLine');