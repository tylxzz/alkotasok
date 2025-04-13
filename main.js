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
const tbody = document.createElement('tbody') // Letrehoz egy tbody elemet
tableSimple.appendChild(tbody) // Hozzaadja a tbody-t a tableSimple-hez

const form = div('form')  // Letrehoz egy form div-et
const formSimple = document.createElement('form') // Letrehoz egy form elemet
form.appendChild(formSimple) // Hozzaadja a formSimple-t a form-hoz
const elements = [{ // Letrehoz egy tombot az input elemek neveivel
    id: 'szerzo',   // Az id az input elem neve, ami a formban lesz
    label: 'Szerző', // Az input elem neve, ami a tableben lesz
},
{
    id: 'mu',   // Az id az input elem neve, ami a formban lesz
    label: 'Műfaj',  // Az input elem neve, ami a tableben lesz
},
{
    id: 'cim',  // Az id az input elem neve, ami a formban lesz
    label: 'Cím',    // Az input elem neve, ami a tableben lesz
}] // Letrehoz egy tombot az input elemek neveivel

for(const element of elements) {
    const field = div('field') // Letrehoz egy field div-et
    formSimple.appendChild(field) // Hozzaadja a field div-et a formSimple-hez
    const label = document.createElement('label') // Letrehoz egy label elemet
    label.htmlFor = element.id // Beallitja a label htmlFor-at az input elem id-jara 
    label.textContent = element.label // Beallitja a label tartalmat az input elem nevére
    field.appendChild(label) // Hozzaadja a label-t a field div-hez
    const input = document.createElement('input') // Letrehoz egy input elemet
    input.id = element.id // Beallitja az input elem id-jat
    field.appendChild(document.createElement('br')) // Hozzaad egy sort a field div-hez
    field.appendChild(input) // Hozzaadja az input elemet a field div-hez
}

const button = document.createElement('button') // Letrehoz egy button elemet
button.textContent = 'Hozzáadás' // Beallitja a button tartalmat
formSimple.appendChild(button) // Hozzaadja a button-t a formSimple-hez

container.appendChild(table)    // Hozzaadja a table div-et a container-hez
container.appendChild(form)   // Hozzaadja a form div-et a container-hez