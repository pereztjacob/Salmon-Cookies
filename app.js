'use strict';

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm',
    '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function renderHours(n){
    const hrs = document.getElementById('firstLine');
    const td = document.createElement('td');
    td.textContent = hours[n];
    hrs.appendChild(td);
}

function render(n, parent, sph){
    let tr = document.getElementById(parent);
    let td = document.createElement('td');
    td.textContent = sph[n];
    tr.appendChild(td);
}

function custPerHour(minCustomers, maxCustomers){
    minCustomers = Math.ceil(minCustomers);
    maxCustomers = Math.floor(maxCustomers);
    return Math.floor(Math.random() * (maxCustomers - minCustomers + 1)) + minCustomers; 
};

function salesPerHour(avgSales, custPerHour){
    return Math.floor(avgSales * custPerHour);
};

function Store(minCustomers, maxCustomers, avgSales, custPerHour, salesPerHour, render){
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgSales = avgSales;
    this.custPerHour = custPerHour;
    this.salesPerHour = salesPerHour;
    this.render = render;
};

const pdxAirport = new Store(23, 65, 6.3, custPerHour, salesPerHour, render);
const pioneerSq = new Store(3, 24, 1.2, custPerHour, salesPerHour, render);
const powells = new Store(11, 38, 3.7, custPerHour, salesPerHour, render);
const stJohns = new Store(20, 28, 2.3, custPerHour, salesPerHour, render);
const waterfront = new Store(2, 16, 4.6, custPerHour, salesPerHour, render);

function calculateCookies(object, line){
    const airportArray = [];
    for(let i = 0; i < hours.length; i++){
        const cph = custPerHour(object.minCustomers, object.maxCustomers);
        const sph = object.salesPerHour(object.avgSales, cph);
        airportArray.push(sph);
        render(i, line, airportArray);
    };
    console.log(airportArray);
}

for(let i = 0; i < 15; i++){
    renderHours(i);
}
calculateCookies(pdxAirport, 'secondLine');
calculateCookies(pioneerSq, 'thirdLine');
calculateCookies(powells, 'fourthLine');
calculateCookies(stJohns, 'fifthLine');
calculateCookies(waterfront, 'sixthLine');