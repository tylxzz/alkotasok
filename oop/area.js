class Area{ // Letrehoz egy Area osztalyt
    /**
     * @type {HTMLDivElement} div
     */
    #div

    /**
     * @type {Manager} manager
     */
    #manager

    /**
     * @returns {HTMLDivElement}
     */
    get div() { // Ez a getter visszaadja a #div változót
        return this.#div // Visszaadja a #div változót
    }

    /**
     * @returns {Manager}
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
     * @returns {HTMLDivElement}
     */
    #getContainerDiv() {
        let container = document.querySelector('.containeroop') // Keres egy elemet a DOM-ban a className alapján
        if(!container) { // Ha nem találja, akkor létrehoz egy új div elemet
            container = document.createElement('div') // Létrehoz egy div elemet
            container.className = 'containeroop' // Beállítja a className-t
            document.body.appendChild(container) // Hozzáadja a body-hoz
        }
        return container // Visszaadja a container-t
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
        this.manager.setAddWorkCallback((work) => { // Beallitja a setAddWorkCallback() fuggvenyt, ami meghivja a callback-et, amikor egy uj munkat hoznak letre
            const tr = document.createElement('tr') // Letrehoz egy tr elemet

            const szerzo = document.createElement('td') // Letrehoz egy td elemet
            szerzo.textContent = work.szerzo // Beallitja a td tartalmat az objektum szerzo property-jere
            tr.appendChild(szerzo) // Hozzaadja a td-t a tr-hez

            const mufaj = document.createElement('td') // Letrehoz egy td elemet
            mufaj.textContent = work.mufaj // Beallitja a td tartalmat az objektum mu property-jere
            tr.appendChild(mufaj) // Hozzaadja a td-t a tr-hez

            const cim = document.createElement('td') // Letrehoz egy td elemet
            cim.textContent = work.cim // Beallitja a td tartalmat az objektum cim property-jere
            tr.appendChild(cim) // Hozzaadja a td-t a tr-hez
            tbody.appendChild(tr) // Hozzaadja a tr-t a tbody-hoz
        })
    }

    /**
     * @returns {HTMLTableSectionElement}
     */
    #createTable() {
        const table = document.createElement('table') // Letrehoz egy table elemet
        this.div.appendChild(table) // Hozzaadja a table-t a div-hez
        const th = document.createElement('thead') // Letrehoz egy th elemet
        table.appendChild(th) // Hozzaadja a th-t a table-hez
        const tr = document.createElement('tr') // Letrehoz egy tr elemet
        th.appendChild(tr) // Hozzaadja a tr-t a table-hez
        const thCells = ['Szerző', 'Műfaj', 'Cím'] // Letrehoz egy tombot a th cellak neveivel
        for(const content of thCells) { // Vegigmegy a tombon
            const thcell =  document.createElement('th') // Letrehoz egy th cellat
            thcell.innerHTML = content // Beallitja a cell tartalmat
            tr.appendChild(thcell) // Hozzaadja a cellat a th-hez
        }
        const tbody = document.createElement('tbody') // Letrehoz egy tbody elemet
        table.appendChild(tbody) // Hozzaadja a tbody-t a table-hez
        return tbody // Visszaadja a tbody-t
    }
}

class Form extends Area {
    /**
     * @type {FormField[]} formFieldArray
     */
    #formFieldArray

    /**
     * @param {cssClass} cssClass 
     * @param {HTMLElement} elements
     * @param {Manager} manager
     */
    constructor(cssClass, elements, manager) { // Ez a konstruktor létrehoz egy új Form objektumot a megadott cssClass-al es elements-el es manager-el
        super(cssClass, manager) // Meghivja az Area osztaly konstruktorat a cssClass-al es a manager-el
        this.#formFieldArray = [] // Letrehoz egy ures tombot a formField-eknek
        const form = document.createElement('form') // Letrehoz egy form elemet
        this.div.appendChild(form) // Hozzaadja a form-ot a div-hez
        for(const element of elements) {  // Vegigmegy a tombon
            const formField = new FormField(element.id, element.label) // Letrehoz egy uj FormField objektumot a megadott id-val es label-el
            this.#formFieldArray.push(formField) // Hozzaadja a FormField objektumot a tombhoz
            form.appendChild(formField.getDiv()) // Hozzaadja a FormField objektumot a form-hoz
        }
        
        const button = document.createElement('button') // Letrehoz egy button elemet
        button.textContent = 'Hozzáadás' // Beallitja a button tartalmat
        form.appendChild(button) // Hozzaadja a button-t a formhoz
        form.addEventListener('submit', (e) => {    // Hozzaad egy eseményfigyelőt a form-hoz, ami akkor fut le, amikor az űrlapot elküldik
            e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
            const object = {} // Letrehoz egy ures objektumot
            let valid = true // Beallitja a valid valtozot true-ra
            for(const formField of this.#formFieldArray) { // Vegigmegy a tombon
                formField.error = ''  // Beallitja az error-t uresre
                if(formField.value === '') { // Ha az input value ures
                    formField.error = 'Kötelező mező' // Beallitja az error-t
                    valid = false // Beallitja a valid valtozot false-ra
                }
                object[formField.id] = formField.value // Beallitja az objektumot az input elem id-javal es value-javal
            }
            if(valid){
                const work = new Work(object.szerzo, object.mufaj, object.cim) // Letrehoz egy uj Work objektumot az objektumbol
                this.manager.addWork(work) // Hozzaadja az objektumot a managerhez
            }
        })
    }
}

class Upload extends Area {
    constructor(cssClass, manager) {    // Ez a konstruktor létrehoz egy új Upload objektumot a megadott cssClass-al es manager-el
        super(cssClass, manager) // Meghivja az Area osztaly konstruktorat a cssClass-al es a manager-el
        const input = document.createElement('input') // Letrehoz egy input elemet
        input.id = 'fileinput' // Beallitja az input id-jat
        input.type = 'file' // Beallitja az input type-jat
        this.div.appendChild(input) // Hozzaadja az input elemet a div1-hez
        input.addEventListener('change', (e) => { // Hozzaad egy eseményfigyelőt az input-hoz, ami akkor fut le, amikor a felhasználó fájlt választ
            const file = e.target.files[0] // Beallitja a file-t az input file-javal
            const reader = new FileReader() // Letrehoz egy FileReader objektumot
            reader.onload = () => {
                const lines = reader.result.split('\n') // Beallitja a lines-t a reader.result-javal, ami egy tombot tartalmaz
                const remove = lines.slice(1) // Beallitja a remove-t a lines elso elemevel
                for(const line of remove){
                    const trimmed = line.trim() // Beallitja a trimmed-t a line trimelt value-javal
                    const fields = trimmed.split(';') // Beallitja a fields-t a trimmed split-javal
                    const work = new Work(fields[0], fields[2], fields[1]) // Letrehoz egy uj Work objektumot a fields tombbol
                    this.manager.addWork(work) // Hozzaadja az objektumot a managerhez
                }
            }
            reader.readAsText(file) // Beallitja a reader-t a file-javal
        })
    }

}

class FormField {
    /**
     * @type {string} id
     */
    #id
    /**
     * @type {HTMLInputElement} input
     */
    #input
    /**
     * @type {HTMLLabelElement} label
     */
    #label
    /**
     * @type {HTMLSpanElement} error
     */
    #error

    /**
     * @returns {string}
     */
    get id() {
        return this.#id // Visszaadja az id-t
    }

    /**
     * @returns {HTMLInputElement}
     */
    get value() {
        return this.#input.value // Visszaadja az input value-jat
    }

    /**
     * @returns {HTMLInputElement}
     */
    set error(value) {
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
     * @returns {HTMLDivElement}
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