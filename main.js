const div = (className) => {    // Ez egy arrow function, ami egy div elemet hoz létre a megadott className-nel
    const div = document.createElement('div')  // Létrehoz egy div elemet
    div.className = className  // Beállítja a className-t
    return div // Visszaadja a létrehozott div elemet
}

const container = div('container') // Letrehoz egy container div-et
document.body.appendChild(container)   // hozzaadja a body-hoz
const table = div('table') // Letrehoz egy table div-et
const tableSimple = document.createElement('table') // Letrehoz egy table elemet
table.appendChild(tableSimple) // Hozzaadja a tableSimple-t a table-hez
const th = document.createElement('th') // Letrehoz egy th elemet
tableSimple.appendChild(th) // Hozzaadja a th-t a tableSimple-hez
const tr = document.createElement('tr') // Letrehoz egy tr elemet
tableSimple.appendChild(tr) // Hozzaadja a tr-t a tableSimple-hez
const thCells = ['Szerző', 'Műfaj', 'Cím'] // Letrehoz egy tombot a th cellak neveivel
for(const content of thCells) { // Vegigmegy a tombon
    const cell = document.createElement('th') // Letrehoz egy th cellat
    cell.innerHTML = content // Beallitja a cell tartalmat
    tr.appendChild(cell) // Hozzaadja a cellat a th-hez
}

const form = div('form')  // Letrehoz egy form div-et

container.appendChild(table)    // Hozzaadja a table div-et a container-hez
container.appendChild(form)   // Hozzaadja a form div-et a container-hez