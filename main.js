const array = [] // Letrehoz egy ures tombot
/**
 * @param {string} className
 * @returns {HTMLDivElement}
 */
const div = (className) => {    // Ez egy arrow function, ami egy div elemet hoz létre a megadott className-nel
    const div = document.createElement('div')  // Létrehoz egy div elemet
    div.className = className  // Beállítja a className-t
    return div // Visszaadja a létrehozott div elemet
}

/**
 * 
 * @param {Work[]} workArray 
 * @param {callback} callback 
 * @returns {Work[]}
 */
const filter = (workArray, callback) => {   // Ez egy arrow function, ami egy új tömböt hoz létre a megadott workArray-ból a callback függvény alapján
    const result = [] // Letrehoz egy ures tombot
    for(const work of workArray) { // Vegigmegy a tombon
        if(callback(work)) { // Ha a callback true-t ad vissza, akkor
            result.push(work) // Hozzaadja az elemet a tombhoz
        }
    }
    return result // Visszaadja a tombot
}

const container = div('container') // Letrehoz egy container div-et
document.body.appendChild(container)   // hozzaadja a body-hoz
const table = div('table') // Letrehoz egy table div-et
const tableSimple = document.createElement('table') // Letrehoz egy table elemet
table.appendChild(tableSimple) // Hozzaadja a tableSimple-t a table-hez
const th = document.createElement('thead') // Letrehoz egy th elemet
tableSimple.appendChild(th) // Hozzaadja a th-t a tableSimple-hez
const tr = document.createElement('tr') // Letrehoz egy tr elemet
th.appendChild(tr) // Hozzaadja a tr-t a tableSimple-hez
const thCells = ['Szerző', 'Cím', 'Műfaj'] // Letrehoz egy tombot a th cellak neveivel
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
    id: 'cim',  // Az id az input elem neve, ami a formban lesz
    label: 'Cím',    // Az input elem neve, ami a tableben lesz
},
{
    id: 'mu',   // Az id az input elem neve, ami a formban lesz
    label: 'Műfaj',  // Az input elem neve, ami a tableben lesz
}]

for(const element of elements) {
    const field = div('field') // Letrehoz egy field div-et
    formSimple.appendChild(field) // Hozzaadja a field div-et a formSimple-hez
    const label = document.createElement('label') // Letrehoz egy label elemet
    label.htmlFor = element.id // Beallitja a label htmlFor-at az input elem id-jara 
    label.textContent = element.label // Beallitja a label tartalmat az input elem nevére
    field.appendChild(label) // Hozzaadja a label-t a field div-hez
    field.appendChild(document.createElement('br')) // Hozzaad egy sort a field div-hez
    const input = document.createElement('input') // Letrehoz egy input elemet
    input.id = element.id // Beallitja az input elem id-jat
    field.appendChild(input) // Hozzaadja az input elemet a field div-hez
    field.appendChild(document.createElement('br')) // Hozzaad egy sort a field div-hez
    const error = document.createElement('span') // Letrehoz egy span elemet
    error.className = 'error' // Beallitja a span className-jat
    field.appendChild(error) // Hozzaadja a span-t a field div-hez
}

const button = document.createElement('button') // Letrehoz egy button elemet
button.textContent = 'Hozzáadás' // Beallitja a button tartalmat
formSimple.appendChild(button) // Hozzaadja a button-t a formSimple-hez
formSimple.addEventListener('submit', (e) => { // Hozzaad egy eseményfigyelőt a formSimple-hez, ami akkor fut le, amikor az űrlapot elküldik
    e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
    const object = {} // Letrehoz egy ures objektumot
    const inputFields = e.target.querySelectorAll('input') // Letrehoz egy tombot az input elemekkel
    let valid = true // Beallitja a valid valtozot true-ra
    for(const field of inputFields) { // Vegigmegy a tombon
        const error = field.parentElement.querySelector('.error') // Letrehoz egy error valtozot, ami a field szulo elemeben keresi a .error class-t
        if(!error) {    // Ha nincs error, akkor letrehoz egyet
            console.error('Nincs errorfield')   // Kiirja a konzolra, hogy nincs error field
            return // Visszater
        }
        error.textContent = '' // Beallitja az error szoveget uresre
        if(field.value === '') {  // Ha a field value-ja ures, akkor
            error.textContent = 'Kötelező mező' // Beallitja az error szoveget
            valid = false // Beallitja a valid valtozot false-ra
        }
        object[field.id] = field.value // Beallitja az objektumot az input elem id-javal es value-javal
    }

    if(valid) {
        array.push(object) // Hozzaadja az objektumot a tombhoz
        const tr = document.createElement('tr') // Letrehoz egy tr elemet
        tbody.appendChild(tr) // Hozzaadja a tr-t a tbody-hoz

        const szerzo = document.createElement('td') // Letrehoz egy td elemet
        szerzo.textContent = object.szerzo // Beallitja a td tartalmat az objektum szerzo property-jere
        tr.appendChild(szerzo) // Hozzaadja a td-t a tr-hez
        
        const cim = document.createElement('td') // Letrehoz egy td elemet
        cim.textContent = object.cim // Beallitja a td tartalmat az objektum cim property-jere
        tr.appendChild(cim) // Hozzaadja a td-t a tr-hez

        const mu = document.createElement('td') // Letrehoz egy td elemet
        mu.textContent = object.mu // Beallitja a td tartalmat az objektum mu property-jere
        tr.appendChild(mu) // Hozzaadja a td-t a tr-hez
    }
    for(const i of inputFields) { // Vegigmegy a tombon
        i.value = '' // Beallitja az input elem value-jat uresre
    }
})

container.appendChild(table)    // Hozzaadja a table div-et a container-hez
container.appendChild(form)   // Hozzaadja a form div-et a container-hez

const fileInput = document.createElement('input') // Letrehoz egy file input elemet
container.appendChild(fileInput) // Hozzaadja a file input elemet a container-hez
fileInput.id = 'fileinput' // Beallitja a file input elem id-jat
fileInput.type = 'file' // Beallitja a file input elem type-jat
fileInput.addEventListener('change', (e) => {  // Hozzaad egy eseményfigyelőt a file input elemhez, ami akkor fut le, amikor a felhasználó kiválaszt egy fájlt
    const file = e.target.files[0] // Letrehoz egy file valtozot, ami a file input elem elso file-jat tartalmazza
    const reader = new FileReader() // Letrehoz egy FileReader objektumot
    reader.onload = () => { // Eseményfigyelő, ami akkor fut le, amikor a fájl betöltődött
        const lines = reader.result.split('\n') // Letrehoz egy tombot, ami a file sorait tartalmazza
        const remove = lines.slice(1)
        for(const line of remove) {
            const trimmed = line.trim() // Letrehoz egy trimmed valtozot, ami a sor trimelt value-jat tartalmazza
            const fields = trimmed.split(';') // Letrehoz egy tombot, ami a sor elemeit tartalmazza
            const work = {
                szerzo: fields[0], // Beallitja az objektum szerzo property-jat
                cim: fields[1], // Beallitja az objektum cim property-jat
                mufaj: fields[2], // Beallitja az objektum mufaj property-jat
            }
            array.push(work) // Hozzaadja az objektumot a tombhoz
            const tr = document.createElement('tr') // Letrehoz egy tr elemet
            tbody.appendChild(tr) // Hozzaadja a tr-t a tbody-hoz

            const szerzo = document.createElement('td') // Letrehoz egy td elemet
            szerzo.textContent = work.szerzo // Beallitja a td tartalmat az objektum szerzo property-jere
            tr.appendChild(szerzo) // Hozzaadja a td-t a tr-hez

            const cim = document.createElement('td') // Letrehoz egy td elemet
            cim.textContent = work.cim // Beallitja a td tartalmat az objektum mu property-jere
            tr.appendChild(cim) // Hozzaadja a td-t a tr-hez

            const mu = document.createElement('td') // Letrehoz egy td elemet
            mu.textContent = work.mufaj // Beallitja a td tartalmat az objektum cim property-jere
            tr.appendChild(mu) // Hozzaadja a td-t a tr-hez
        }
    }
    reader.readAsText(file) // Beolvassa a file-t szovegkent
})

const download = document.createElement('button') // Letrehoz egy button elemet
download.textContent = 'Letöltés' // Beallitja a button tartalmat
container.appendChild(download) // Hozzaadja a button-t a container-hez
download.addEventListener('click', () => {
    const link = document.createElement('a') // Letrehoz egy a elemet
    const contentArray = ['szerzo;cim;mufaj'] // Letrehoz egy tombot a file tartalmaval
    for(const work of array) { // Vegigmegy a tombon
        contentArray.push(`${work.szerzo};${work.mufaj};${work.cim}`) // Hozzaadja a tombhoz az objektumot
    }
    const content = contentArray.join('\n') // Letrehoz egy content valtozot, ami a tomb elemeit tartalmazza
    const file = new Blob([content]) // Letrehoz egy file valtozot, ami a content tombot tartalmazza
    link.href = URL.createObjectURL(file) // Beallitja a link href-jat a file-ra
    link.download = 'newdata.csv' // Beallitja a link download property-jat
    link.click() // Kattint a linkre, hogy letolthesse a file-t
    URL.revokeObjectURL(link.href) // Megsemmisiti a file-t
})

const filterForm = div('filter') // Letrehoz egy filter div-et
container.appendChild(filterForm) // Hozzaadja a filter div-et a container-hez

const formForFilter = document.createElement('form') // Letrehoz egy form elemet
filterForm.appendChild(formForFilter) // Hozzaadja a form elemet a filter div-hez
const select = document.createElement('select') // Letrehoz egy select elemet
formForFilter.appendChild(select) // Hozzaadja a select elemet a form-hoz
const options = [{
    value: '',
    innerText: '',
},
{
    value: 'szerzo',
    innerText: 'Szerző',  
},
{
    value: 'cim',
    innerText: 'Cím',
},
{
    value: 'mufaj',
    innerText: 'Műfaj',
}]
for(const option of options) { // Vegigmegy a tombon
    const element = document.createElement('option') // Letrehoz egy option elemet
    element.value = option.value // Beallitja az option value-jat
    element.innerText = option.innerText // Beallitja az option innerText property-jat
    select.appendChild(element) // Hozzaadja az option elemet a select-hez
}

const input = document.createElement('input') // Letrehoz egy input elemet
input.id = 'filterInput' // Beallitja az input id-jat
formForFilter.appendChild(input) // Hozzaadja az input elemet a form-hoz

const filterButton = document.createElement('button') // Letrehoz egy button elemet
filterButton.innerText = 'Szűrés' // Beallitja a button tartalmat
formForFilter.appendChild(filterButton) // Hozzaadja a button-t a form-hoz
formForFilter.addEventListener('submit', (e) => {   // Hozzaad egy eseményfigyelőt a formForFilter-hez, ami akkor fut le, amikor az űrlapot elküldik
    e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
    const filterInput = document.querySelector('#filterInput') // Letrehoz egy filterInput valtozot, ami a filter input elemet tartalmazza
    const select = e.target.querySelector('select') // Letrehoz egy select valtozot, ami a select elemet tartalmazza

    const filteredArray = filter(array, (element) => {
        if(select.value === 'szerzo') { // Ha a select value-ja szerzo, akkor
            if(filterInput.value === element.szerzo) { // Ha az element szerzo property-je megegyezik a filter input value-javal, akkor
                return true // Visszaadja a true-t
            }
        }else if(select.value === 'cim') { // Ha a select value-ja cim, akkor
            if(filterInput.value === element.cim) { // Ha az element cim property-je megegyezik a filter input value-javal, akkor
                return true // Visszaadja a true-t
            }
        }else if(select.value === 'mufaj') { // Ha a select value-ja mufaj, akkor
            if(filterInput.value === element.mufaj) { // Ha az element mufaj property-je megegyezik a filter input value-javal, akkor
                return true // Visszaadja a true-t
            }
        }else{
            return true // Visszaadja a true-t
        }
    })

    tbody.innerHTML = '' // Beallitja a tbody innerHTML property-jat uresre
    for(const filteredElement of filteredArray){
        const tr = document.createElement('tr') // Letrehoz egy tr elemet
        tbody.appendChild(tr) // Hozzaadja a tr-t a tbody-hoz

        const szerzoCell = document.createElement('td') // Letrehoz egy td elemet
        szerzoCell.textContent = filteredElement.szerzo // Beallitja a td tartalmat az objektum szerzo property-jere
        tr.appendChild(szerzoCell) // Hozzaadja a td-t a tr-hez

        const cimCell = document.createElement('td') // Letrehoz egy td elemet
        cimCell.textContent = filteredElement.cim // Beallitja a td tartalmat az objektum cim property-jere
        tr.appendChild(cimCell) // Hozzaadja a td-t a tr-hez

        const mufajCell = document.createElement('td') // Letrehoz egy td elemet
        mufajCell.textContent = filteredElement.mufaj // Beallitja a td tartalmat az objektum mufaj property-jere
        tr.appendChild(mufajCell) // Hozzaadja a td-t a tr-hez
    }
    filterInput.value = '' // Beallitja a filter input value-jat uresre
})