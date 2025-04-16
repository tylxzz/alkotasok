class Area{ // Letrehoz egy Area osztalyt
    /**
     * @type {HTMLDivElement} div
     */
    #div    // Ez a property a div elemet tarolja, ami a tablazatot tartalmazza

    /**
     * @type {Manager} manager
     */
    #manager    // Ez a property a manager objektumot tarolja, ami a tablazatot kezeli

    /**
     * @returns {HTMLDivElement} div
     */
    get div() { // Ez a getter visszaadja a #div változót
        return this.#div // Visszaadja a #div változót
    }

    /**
     * @returns {Manager} manager
     */
    get manager() { // Ez a getter visszaadja a #manager változót
        return this.#manager // Visszaadja a #manager változót
    }

    /**
     * @param {className} className 
     * @param {Manager} manager
     */
    constructor(className, manager) { // Ez a konstruktor létrehoz egy új Area objektumot a megadott className-el es manager-el
        this.#manager = manager // Beallitja a #manager-t
        const container = this.#getContainerDiv() // Meghivja a getContainerDiv() fuggvenyt, ami visszaadja a container-t
        this.#div = document.createElement('div') // Letrehoz egy div elemet
        this.#div.className = className // Beallitja a className-t
        container.appendChild(this.#div) // Hozzaadja a div-et a container-hez
    }

    /**
     * @returns {HTMLDivElement} container
     */
    #getContainerDiv() {    // Ez a fuggveny letrehoz egy uj container div-et
        let container = document.querySelector('.containeroop') // Keres egy elemet a DOM-ban a className alapján
        if(!container) { // Ha nem találja, akkor létrehoz egy új div elemet
            container = document.createElement('div') // Létrehoz egy div elemet
            container.className = 'containeroop' // Beállítja a className-t
            document.body.appendChild(container) // Hozzáadja a body-hoz
        }
        return container // Visszaadja a container-t
    }

    /**
     * 
     * @param {HTMLLabelElement} label 
     * @returns {HTMLButtonElement} button
     */
    createButton(label) {   // Ez a fuggveny letrehoz egy uj button-t
        const button = document.createElement('button') // Letrehoz egy button elemet
        button.textContent = label // Beallitja a button tartalmat
        return button // Visszaadja a button-t
    }
}

class Table extends Area {  // Letrehoz egy Table osztalyt, ami az Area osztalybol szarmazik
    /**
     * @param {cssClass} cssClass 
     * @param {Manager} manager
     */
    constructor(cssClass, manager) { // Ez a konstruktor létrehoz egy új Table objektumot a megadott cssClass-al es manager-el
        super(cssClass, manager) // Meghivja az Area osztaly konstruktorat a cssClass-al es a manager-el
        const tbody = this.#createTable() // Meghivja a createTable() fuggvenyt, ami visszaadja a tbody-t
        this.manager.setAddWorkCallback(this.#addWorkCallback(tbody)) // Beallitja a callback-et, ami meghivja a createWorkRow() fuggvenyt
        this.manager.setRenderTableCallback(this.#renderTableCallack(tbody)) // Beallitja a renderTableCallback-et, ami meghivja a createWorkRow() fuggvenyt
    }

    /**
     * @param {HTMLTableSectionElement} tbody
     * @returns {(array: Work[]) => void} 
     */
    #renderTableCallack(tbody) { // Ez a fuggveny letrehozza a tablazatot
        return (array) => { // Visszaad egy fuggvenyt, ami megkapja a tombot
            tbody.innerHTML = '' // Beallitja a tbody-t uresre
            for(const work of array) { // Vegigmegy a tombon
                this.#createWorkRow(work, tbody) // Meghivja a createPersonRow() fuggvenyt, ami letrehozza a sort
            }
        }
    }

    /**
     * @param {HTMLTableSectionElement} tbody
     * @returns {(work: Work) => void}
     */
    #addWorkCallback(tbody) { // Ez a fuggveny letrehozza a callback-et
        return (work) => { // Visszaad egy fuggvenyt, ami megkapja a work-et
            this.#createWorkRow(work, tbody) // Meghivja a createPersonRow() fuggvenyt, ami letrehozza a sort
        }
    }

    /**
     * 
     * @param {Work} work 
     * @param {TableSectionElement} tbody 
     */
    #createWorkRow(work, tbody) { // Ez a fuggveny letrehoz egy uj sort a tablaban
        const tr = document.createElement('tr') // Letrehoz egy tr elemet
        this.#createCell(tr, work.szerzo) // Meghivja a createCell() fuggvenyt, ami letrehozza a cellat
        this.#createCell(tr, work.cim) // Meghivja a createCell() fuggvenyt, ami letrehozza a cellat
        this.#createCell(tr, work.mufaj) // Meghivja a createCell() fuggvenyt, ami letrehozza a cellat
        tbody.appendChild(tr) // Hozzaadja a sort a tbody-hoz
    }

    /**
     * 
     * @param {HTMLTableRowElement} row 
     * @param {string} textContent 
     * @param {string} type 
     */
    #createCell(row, textContent, type='td') { // Ez a fuggveny letrehoz egy uj cellat a tablaban
        const cell = document.createElement(type) // Letrehoz egy cellat
        cell.textContent = textContent // Beallitja a cell tartalmat
        row.appendChild(cell) // Hozzaadja a cellat a row-hoz
    }

    /**
     * @returns {HTMLTableSectionElement} tbody
     */
    #createTable() { // Ez a fuggveny letrehoz egy uj tablazatot
        const table = document.createElement('table') // Letrehoz egy table elemet
        this.div.appendChild(table) // Hozzaadja a table-t a div-hez
        const th = document.createElement('thead') // Letrehoz egy th elemet
        table.appendChild(th) // Hozzaadja a th-t a table-hez
        const tr = document.createElement('tr') // Letrehoz egy tr elemet
        th.appendChild(tr) // Hozzaadja a tr-t a table-hez
        const thCells = ['Szerző', 'Cím', 'Műfaj'] // Letrehoz egy tombot a th cellak neveivel
        for(const content of thCells) { // Vegigmegy a tombon
            this.#createCell(tr, content, 'th') // Meghivja a createCell() fuggvenyt, ami letrehozza a cellat
        }
        const tbody = document.createElement('tbody') // Letrehoz egy tbody elemet
        table.appendChild(tbody) // Hozzaadja a tbody-t a table-hez
        return tbody // Visszaadja a tbody-t
    }
}

class Form extends Area {   // Letrehoz egy Form osztalyt, ami az Area osztalybol szarmazik
    /**
     * @type {FormField[]} formFieldArray
     */
    #formFieldArray // Ez a property a formField-eket tarolja, amik a formban vannak

    /**
     * @param {cssClass} cssClass 
     * @param {{ id: string, label: string }[]} elements
     * @param {Manager} manager
     */
    constructor(cssClass, elements, manager) { // Ez a konstruktor létrehoz egy új Form objektumot a megadott cssClass-al es elements-el es manager-el
        super(cssClass, manager) // Meghivja az Area osztaly konstruktorat a cssClass-al es a manager-el
        this.#formFieldArray = [] // Letrehoz egy ures tombot a formField-eknek
        const form = this.#createForm(elements) // Meghivja a createForm() fuggvenyt, ami visszaadja a formot
        form.addEventListener('submit', this.#formsubmit()) // Hozzaad egy eseményfigyelőt a form-hoz, ami akkor fut le, amikor az űrlapot elküldik
    }

    /**
     * 
     * @param {{ id: string, label: string }[]} fieldElements 
     * @returns {HTMLFormElement} form
     */
    #createForm(fieldElements) { // Ez a fuggveny letrehoz egy uj formot
        const form = document.createElement('form') // Letrehoz egy form elemet
        this.div.appendChild(form) // Hozzaadja a form-ot a div-hez
        for(const element of fieldElements) { // Vegigmegy a tombon
            const formField = new FormField(element.id, element.label) // Letrehoz egy uj FormField objektumot a megadott id-val es label-el
            this.#formFieldArray.push(formField) // Hozzaadja a FormField objektumot a tombhoz
            form.appendChild(formField.getDiv()) // Hozzaadja a FormField objektumot a form-hoz
        }

        const button = this.createButton('Hozzáadás') // Letrehoz egy button elemet
        form.appendChild(button) // Hozzaadja a button-t a formhoz

        return form // Visszaadja a formot
    }

    /**
     * 
     * @returns {(e: Event) => void}
     */
    #formsubmit() { // Ez a fuggveny letrehoz egy uj formot
        return(e) => {  // Hozzaad egy eseményfigyelőt a form-hoz, ami akkor fut le, amikor az űrlapot elküldik
            e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
            if(this.#validate()){
                const object = this.#getObject() // Meghivja a getObject() fuggvenyt, ami visszaadja az objektumot
                const work = new Work(object.szerzo, object.cim, object.mufaj) // Letrehoz egy uj Work objektumot az objektumbol
                this.manager.addWork(work) // Hozzaadja az objektumot a managerhez

                for (const formField of this.#formFieldArray) { // Vegigmegy a tombon
                    formField.value = ''; // Beállítja az input mező értékét üresre
                }
            }
        }
    }

    /**
     * @returns {boolean} valid
     */
    #validate() {   // Ez a fuggveny letrehoz egy uj validatort
        let valid = true // Beallitja a valid valtozot true-ra
        for(const formField of this.#formFieldArray) { // Vegigmegy a tombon
            formField.error = ''  // Beallitja az error-t uresre
            if(formField.value === '') { // Ha az input value ures
                formField.error = 'Kötelező mező' // Beallitja az error-t
                valid = false // Beallitja a valid valtozot false-ra
            }
        }
        return valid // Visszaadja a valid valtozot
    }

    /**
     * 
     * @returns {{ [key: string]: string }} object
     */
    #getObject(){   // Ez a fuggveny letrehoz egy uj objektumot
        const object = {} // Letrehoz egy ures objektumot
        for(const formField of this.#formFieldArray) { // Vegigmegy a tombon
            object[formField.id] = formField.value // Beallitja az objektumot az input elem id-javal es value-javal
        }
        return object // Visszaadja az objektumot
    }
}

class UploadDownload extends Area { // Letrehoz egy UploadDownload osztalyt, ami az Area osztalybol szarmazik
    /**
     * 
     * @param {cssClass} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager) {    // Ez a konstruktor létrehoz egy új Upload objektumot a megadott cssClass-al es manager-el
        super(cssClass, manager) // Meghivja az Area osztaly konstruktorat a cssClass-al es a manager-el
        const input = document.createElement('input') // Letrehoz egy input elemet
        input.id = 'fileinput' // Beallitja az input id-jat
        input.type = 'file' // Beallitja az input type-jat
        this.div.appendChild(input) // Hozzaadja az input elemet a div1-hez
        input.addEventListener('change', this.#import()) // Hozzaad egy eseményfigyelőt az input-hoz, ami akkor fut le, amikor a felhasználó rákattint
        const button = this.createButton('Letöltés') // Letrehoz egy button elemet
        this.div.appendChild(button) // Hozzaadja a button-t a div1-hez
        button.addEventListener('click', this.#export()) // Hozzaad egy eseményfigyelőt a button-hoz, ami akkor fut le, amikor a felhasználó rákattint
    }

    /**
     * 
     * @returns {(e: Event) => void}
     */
    #export() { // Ez a fuggveny letrehoz egy uj exportot
        return () => {  // Ez a fuggveny letrehoz egy uj exportot
            const link = document.createElement('a') // Letrehoz egy a elemet
            const content = this.manager.generateExportString() // Beallitja a content-t a manager generateExportString-javal
            const file = new Blob([content]) // Letrehoz egy file-t a content-bol
            link.href = URL.createObjectURL(file) // Beallitja a link href-jat a file-javal
            link.download = 'newdata.csv' // Beallitja a letoltes nevet
            link.click() // Meghivja a linket
            URL.revokeObjectURL(link.href) // Megszunteti a linket
        }
    }

    /**
     * 
     * @returns {(e: Event) => void}
     */
    #import() { // Ez a fuggveny letrehoz egy uj importot
        return (e) => { // Hozzaad egy eseményfigyelőt a button-hoz, ami akkor fut le, amikor a felhasználó rákattint
            const file = e.target.files[0] // Beallitja a file-t az input file-javal
            const reader = new FileReader() // Letrehoz egy FileReader objektumot
            reader.onload = () => { // Beallitja a reader onload property-jat
                const lines = reader.result.split('\n') // Beallitja a lines-t a reader.result-javal, ami egy tombot tartalmaz
                const remove = lines.slice(1) // az első sort eltávolítja a lines tombbol
                for(const line of remove){  // Vegigmegy a tombon
                    const trimmed = line.trim() // Beallitja a trimmed-t a line trimelt value-javal
                    const fields = trimmed.split(';') // Beallitja a fields-t a trimmed split-javal
                    const work = new Work(fields[0], fields[1], fields[2]) // Letrehoz egy uj Work objektumot a fields tombbol
                    this.manager.addWork(work) // Hozzaadja az objektumot a managerhez
                }
            }
            reader.readAsText(file) // Beallitja a reader-t a file-javal
        }
    }

}

class FormField {   // Letrehoz egy FormField osztalyt, ami a form elemeket kezeli
    /**
     * @type {string} id
     */
    #id   // Ez a property az input elem id-jat tarolja
    /**
     * @type {HTMLInputElement} input
     */
    #input  // Ez a property az input elemet tarolja
    /**
     * @type {HTMLLabelElement} label
     */
    #label  // Ez a property a label elemet tarolja
    /**
     * @type {HTMLSpanElement} error
     */
    #error  // Ez a property az error elemet tarolja, ami a hiba uzenetet tartalmazza

    /**
     * @returns {string} id
     */
    get id() {  // Ez a getter visszaadja a #id property-t
        return this.#id // Visszaadja az id-t
    }

    /**
     * @returns {string} value
     */
    get value() {   // Ez a getter visszaadja a #input property-t
        return this.#input.value // Visszaadja az input value-jat
    }

    /**
     * @param {string} value
     */
    set value(value) {  // Ez a setter beallitja a #input property-t
        this.#input.value = value; // Beállítja az input mező értékét
    }

    /**
     * @param {string} value
     */
    set error(value) {  // Ez a setter beallitja a #error property-t
        return this.#error.textContent = value // Visszaadja az error-t az input value-javal
    }

    /**
     * 
     * @param {string} id 
     * @param {string} content 
     */
    constructor(id, content) { // Ez a konstruktor létrehoz egy új FormField objektumot a megadott id-val es content-el
        this.#id = id // Beallitja az id-t
        this.#input = document.createElement('input') // Letrehoz egy input elemet
        this.#input.id = id // Beallitja az input id-jat
        this.#label = document.createElement('label') // Letrehoz egy label elemet
        this.#label.htmlFor = id // Beallitja a label htmlFor-at az input elem id-jara 
        this.#label.textContent = content // Beallitja a label tartalmat az input elem nevére
        this.#error = document.createElement('span') // Letrehoz egy span elemet
        this.#error.className = 'error' // Beallitja a span className-jat
    }

    /**
     * @returns {HTMLDivElement} div1
     */
    getDiv(){
        const div1 = div('field') // Letrehoz egy field div-et
        const br1 = document.createElement('br') // Letrehoz egy sort
        const br2 = document.createElement('br') // Letrehoz egy sort
        const HTMLElements = [this.#label, br1, this.#input, br2, this.#error] // Letrehoz egy tombot az elemekkel
        for(const element of HTMLElements) { // Vegigmegy a tombon
            div1.appendChild(element) // Hozzaadja az elemet a div-hez
        }
        return div1 // Visszaadja a létrehozott div elemet
    }
}