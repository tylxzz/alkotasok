/**
 * @typedef {{szerzo: string, mufaj: string, cim: string}} Work2
 * 
 * @callback WorkCallback2
 * @param {Work2[]} work
 * @returns {void}
 */

/**
 * @param {string} className
 * @returns {HTMLDivElement} div
 */
const div = (className) => {    // Ez egy arrow function, ami egy div elemet hoz létre a megadott className-nel
    const div = document.createElement('div')  // Létrehoz egy div elemet
    div.className = className  // Beállítja a className-t
    return div // Visszaadja a létrehozott div elemet
}

/**
 * 
 * @param {Work2[]} workArray 
 * @param {WorkCallback2} callback 
 * @returns {Work2[]} result
 */
const sort = (workArray, callback) => {   // Ez egy arrow function, ami egy új tömböt hoz létre a megadott workArray-ból a callback függvény alapján
    const result = [] // Letrehoz egy ures tombot
    for(const work of workArray) { // Vegigmegy a tombon
        if(callback(work)) { // Ha a callback true-t ad vissza, akkor
            result.push(work) // Hozzaadja az elemet a tombhoz
        }
    }
    return result // Visszaadja a tombot
}

/**
 * 
 * @param {HTMLDivElement} container 
 * @param {WorkCallback2} callback 
 */
const createTable = (container, callback) =>  { // Ez egy arrow function, ami egy uj table elemet hoz letre a megadott containerben
    const table = div('table') // Letrehoz egy table div-et
    container.appendChild(table) // Hozzaadja a table div-et a container-hez
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
    callback(tbody) // Meghivja a callback-et a tbody-val
}

/**
 * @param {HTMLTableSectionElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {Work2[]} workArray 
 */
const createFileUpload = (tbody, container, workArray) => { // Ez egy arrow function, ami egy file input elemet hoz létre a megadott tablebody-val es container-rel
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
                workArray.push(work) // Hozzaadja az objektumot a tombhoz
                addRow(work, tbody) // Meghivja az addRow fuggvenyt a tablebody-val es az objektummal
            }
        }
        reader.readAsText(file) // Beolvassa a file-t szovegkent
    })
}

/**
 * @param {HTMLTableSectionElement} tbody 
 * @param {HTMLDivElement} container 
 * @param {Work2[]} workArray 
 */
const createForm = (tbody, container, workArray) => {   // Ez egy arrow function, ami egy form elemet hoz létre a megadott tablebody-val es container-rel
    const form = div('form')  // Letrehoz egy form div-et
    container.appendChild(form) // Hozzaadja a form div-et a container-hez
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
        id: 'mufaj',   // Az id az input elem neve, ami a formban lesz
        label: 'Műfaj',  // Az input elem neve, ami a tableben lesz
    }]

    for(const element of elements) {    // Vegigmegy a tombon
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

        if(valid) { // Ha a valid valtozo true, akkor
            workArray.push(object) // Hozzaadja az objektumot a tombhoz
            addRow(object, tbody) // Meghivja az addRow fuggvenyt a tablebody-val es az objektummal
        }
        for(const i of inputFields) {   // Vegigmegy a tombon
            i.value = '' // Beallitja az input elemek value-jat uresre
        }

    })   
}

/**
 * @param {Work2} object 
 * @param {HTMLDivElement} tbody 
 */
const addRow = (object, tbody) => { // Ez egy arrow function, ami egy uj sort hoz letre a megadott tablebody-val es objektummal
    const tr = document.createElement('tr') // Letrehoz egy tr elemet
    tbody.appendChild(tr) // Hozzaadja a tr-t a tbody-hoz

    const szerzoCell = document.createElement('td') // Letrehoz egy td elemet
    szerzoCell.textContent = object.szerzo // Beallitja a td tartalmat az objektum szerzo property-jere
    tr.appendChild(szerzoCell) // Hozzaadja a td-t a tr-hez

    const cimCell = document.createElement('td') // Letrehoz egy td elemet
    cimCell.textContent = object.cim // Beallitja a td tartalmat az objektum cim property-jere
    tr.appendChild(cimCell) // Hozzaadja a td-t a tr-hez

    const mufajCell = document.createElement('td') // Letrehoz egy td elemet
    mufajCell.textContent = object.mufaj // Beallitja a td tartalmat az objektum mufaj property-jere
    tr.appendChild(mufajCell) // Hozzaadja a td-t a tr-hez
}

/**
 * @param {HTMLDivElement} container 
 * @param {Work2[]} workArray 
 */
const createFileDownload = (container, workArray) => {  // Ez egy arrow function, ami egy file letolto gombot hoz letre a megadott containerben
    const download = document.createElement('button') // Letrehoz egy button elemet
    download.textContent = 'Letöltés' // Beallitja a button tartalmat
    container.appendChild(download) // Hozzaadja a button-t a container-hez
    download.addEventListener('click', () => {  // Hozzaad egy eseményfigyelőt a button-hoz, ami akkor fut le, amikor a felhasználó rákattint
        const link = document.createElement('a') // Letrehoz egy a elemet
        const contentArray = ['szerzo;cim;mufaj'] // Letrehoz egy tombot a file tartalmaval
        for(const work of workArray) { // Vegigmegy a tombon
            contentArray.push(`${work.szerzo};${work.mufaj};${work.cim}`) // Hozzaadja a tombhoz az objektumot
        }
        const content = contentArray.join('\n') // Letrehoz egy content valtozot, ami a tomb elemeit tartalmazza
        const file = new Blob([content]) // Letrehoz egy file valtozot, ami a content tombot tartalmazza
        link.href = URL.createObjectURL(file) // Beallitja a link href-jat a file-ra
        link.download = 'newdata.csv' // Beallitja a link download property-jat
        link.click() // Kattint a linkre, hogy letolthesse a file-t
        URL.revokeObjectURL(link.href) // Megsemmisiti a file-t
    })
}

/**
 * @param {HTMLDivElement} container 
 * @param {HTMLTableSectionElement} tbody 
 * @param {Work2[]} workArray 
 */
const createSortForm = (container, tbody, workArray) => { // Ez egy arrow function, ami egy sort formot hoz letre a megadott containerben
    const sortForm = div('sort') // Letrehoz egy sort div-et
    container.appendChild(sortForm) // Hozzaadja a sort div-et a container-hez

    const formForSort = document.createElement('form') // Letrehoz egy form elemet
    sortForm.appendChild(formForSort) // Hozzaadja a form elemet a sort div-hez
    const select = document.createElement('select') // Letrehoz egy select elemet
    formForSort.appendChild(select) // Hozzaadja a select elemet a form-hoz
    const options = [{  // Letrehoz egy tombot az option elemekkel
        value: '',  // Az option value-ja
        innerText: '',  // Az option innerText property-je
    },
    {
        value: 'szerzo',    // Az option value-ja
        innerText: 'Szerző',    // Az option innerText property-je
    },
    {
        value: 'cim',   // Az option value-ja
        innerText: 'Cím',   // Az option innerText property-je
    },
    {
        value: 'mufaj', // Az option value-ja
        innerText: 'Műfaj', // Az option innerText property-je
    }]
    for(const option of options) { // Vegigmegy a tombon
        const element = document.createElement('option') // Letrehoz egy option elemet
        element.value = option.value // Beallitja az option value-jat
        element.innerText = option.innerText // Beallitja az option innerText property-jat
        select.appendChild(element) // Hozzaadja az option elemet a select-hez
    }

    const sortButton = document.createElement('button') // Letrehoz egy button elemet
    sortButton.innerText = 'Rendezés' // Beallitja a button tartalmat
    formForSort.appendChild(sortButton) // Hozzaadja a button-t a form-hoz
    formForSort.addEventListener('submit', (e) => {   // Hozzaad egy eseményfigyelőt a formForsort-hez, ami akkor fut le, amikor az űrlapot elküldik
        e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
        const selectValue = select.value // Letrehoz egy selectValue valtozot, ami a select value-jat tartalmazza

        if (selectValue === '') {   // Ha a select value-ja ures, akkor
            tbody.innerHTML = '' // Kiüríti a táblázatot
            for (const work of workArray) { // Vegigmegy a tombon
                addRow(work, tbody) // Újra hozzáadja az eredeti elemeket
            }
            return // Visszater
        }

        const sortedArray = [...workArray]; // Másolatot készítünk a workArray-ról

        for (let i = 0; i < sortedArray.length - 1; i++) {  // Külső ciklus a rendezéshez
            for (let j = 0; j < sortedArray.length - i - 1; j++) {  // Buborék rendezés
                let compareResult   // Hasonlítunk a kiválasztott mező szerint
                if (selectValue === 'mufaj') { // Ha a select value-ja mufaj, akkor
                    const aSecondWord = sortedArray[j].mufaj.split(' ')[1] || sortedArray[j].mufaj  // Műfaj második szava vagy az egész műfaj
                    const bSecondWord = sortedArray[j + 1].mufaj.split(' ')[1] || sortedArray[j + 1].mufaj  // Műfaj második szava vagy az egész műfaj
                    compareResult = aSecondWord.localeCompare(bSecondWord) // Műfaj második szava szerint hasonlítunk
                } else {    // Ha nem mufaj, akkor a kiválasztott mező szerint hasonlítunk
                    compareResult = sortedArray[j][selectValue].localeCompare(sortedArray[j + 1][selectValue]) // A kiválasztott mező szerint hasonlítunk
                }
            
                if (compareResult > 0) { // Ha az aktuális elem nagyobb, mint a következő, akkor cserélünk
                    const temp = sortedArray[j] // Letrehoz egy ideiglenes valtozot, ami az aktuális elemet tartalmazza
                    sortedArray[j] = sortedArray[j + 1] // Beallitja az aktuális elemet a kovetkezo elemre
                    sortedArray[j + 1] = temp  // Beallitja a kovetkezo elemet az ideiglenes valtozora
                }
            }
        }

        tbody.innerHTML = '' // Beallitja a tbody innerHTML property-jat uresre
        for(const sortedElement of sortedArray){    // Vegigmegy a tombon
            addRow(sortedElement, tbody) // Meghivja az addRow fuggvenyt a tablebody-val es az objektummal
        }
    })
}