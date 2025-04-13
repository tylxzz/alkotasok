class Area{
    #div

    get div() { // Ez a getter visszaadja a #div változót
        return this.#div // Visszaadja a #div változót
    }

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
    constructor(cssClass) { // Ez a konstruktor létrehoz egy új Table objektumot a megadott cssClass-al
        super(cssClass) // Meghivja az Area osztaly konstruktorat a cssClass-al
        const table = document.createElement('table') // Letrehoz egy table elemet
        this.div.appendChild(table) // Hozzaadja a table-t a div-hez
        const th = document.createElement('th') // Letrehoz egy th elemet
        table.appendChild(th) // Hozzaadja a th-t a table-hez
        const tr = document.createElement('tr') // Letrehoz egy tr elemet
        table.appendChild(tr) // Hozzaadja a tr-t a table-hez
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