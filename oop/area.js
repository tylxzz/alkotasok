class Area{ // Letrehoz egy Area osztalyt
    /**
     * @type {HTMLDivElement} div
     */
    #div

    /**
     * @returns {HTMLDivElement}
     */
    get div() { // Ez a getter visszaadja a #div változót
        return this.#div // Visszaadja a #div változót
    }

    /**
     * @param {className} className 
     */
    constructor(className) {    // Ez a konstruktor létrehoz egy új Area objektumot a megadott className-nel
        let container = document.querySelector('.containeroop') // Keres egy elemet a DOM-ban a className alapján
        if(!container) { // Ha nem találja, akkor létrehoz egy új div elemet
            container = document.createElement('div') // Létrehoz egy div elemet
            container.className = 'containeroop' // Beállítja a className-t
            document.body.appendChild(container) // Hozzáadja a body-hoz
        }
        this.#div = document.createElement('div') // Létrehoz egy új div elemet
        this.#div.className = className // Beállítja a className-t
        container.appendChild(this.#div) // Hozzáadja a container-hez
    }
}

class Table extends Area {  // Letrehoz egy Table osztalyt, ami az Area osztalybol szarmazik
    /**
     * 
     * @param {cssClass} cssClass 
     */
    constructor(cssClass) { // Ez a konstruktor létrehoz egy új Table objektumot a megadott cssClass-al
        super(cssClass) // Meghivja az Area osztaly konstruktorat a cssClass-al
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
    }
}

class Form extends Area {
    /**
     * @param {cssClass} cssClass 
     */
    constructor(cssClass) { // Ez a konstruktor létrehoz egy új Form objektumot a megadott cssClass-al
        super(cssClass) // Meghivja az Area osztaly konstruktorat a cssClass-al
        const form = document.createElement('form') // Letrehoz egy form elemet
        this.div.appendChild(form) // Hozzaadja a form-ot a div-hez
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
        }]
        
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
    }
}