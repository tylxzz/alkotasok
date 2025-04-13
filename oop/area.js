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
     * @param {cssClass} cssClass 
     * @param {HTMLElement} elements
     * @param {Manager} manager
     */
    constructor(cssClass, elements, manager) { // Ez a konstruktor létrehoz egy új Form objektumot a megadott cssClass-al es elements-el es manager-el
        super(cssClass, manager) // Meghivja az Area osztaly konstruktorat a cssClass-al es a manager-el
        const form = document.createElement('form') // Letrehoz egy form elemet
        this.div.appendChild(form) // Hozzaadja a form-ot a div-hez
        for(const element of elements) {  // Vegigmegy a tombon
            const field = div('field') // Letrehoz egy field div-et
            form.appendChild(field) // Hozzaadja a field div-et a formhoz
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
        form.appendChild(button) // Hozzaadja a button-t a formhoz
        form.addEventListener('submit', (e) => {    // Hozzaad egy eseményfigyelőt a form-hoz, ami akkor fut le, amikor az űrlapot elküldik
            e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
            const object = {} // Letrehoz egy ures objektumot
            const inputFields = e.target.querySelectorAll('input') // Letrehoz egy tombot az input elemekkel
            for(const field of inputFields) { // Vegigmegy a tombon
                object[field.id] = field.value // Beallitja az objektumot az input elem id-javal es value-javal
            }
            const work = new Work(object.szerzo, object.mufaj, object.cim) // Letrehoz egy uj Work objektumot az objektumbol
            this.manager.addWork(work) // Hozzaadja az objektumot a managerhez
        })
    }
}