class Filter extends Area { // A Filter osztaly, ami az Area osztalybol szarmazik
    /**
     * 
     * @param {cssClass} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager) {    // Meghivja a szulo osztaly konstruktorat
        super(cssClass, manager)    // Meghivja a szulo osztaly konstruktorat

        const form = document.createElement('form') // Letrehoz egy form elemet
        this.div.appendChild(form) // Hozzaadja a form elemet a filter div-hez
        const select = document.createElement('select') // Letrehoz egy select elemet
        form.appendChild(select) // Hozzaadja a select elemet a form-hoz
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

        const input = document.createElement('input') // Letrehoz egy input elemet
        input.id = 'filterInput' // Beallitja az input id-jat
        form.appendChild(input) // Hozzaadja az input elemet a form-hoz

        const filterButton = this.createButton('Szűrés') // Letrehoz egy button elemet, ami a szures gombot jelenti
        form.appendChild(filterButton) // Hozzaadja a button-t a form-hoz
        form.addEventListener('submit', (e) => {   // Hozzaad egy eseményfigyelőt a form-hez, ami akkor fut le, amikor az űrlapot elküldik
            e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
            const filterInput = e.target.querySelector('#filterInput') // Letrehoz egy filterInput valtozot, ami a filter input elemet tartalmazza
            const select = e.target.querySelector('select') // Letrehoz egy select valtozot, ami a select elemet tartalmazza

            this.manager.filter((element) => {  // Meghivja a manager filter metodusat, ami szurja az elemeket
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
                }else{  // Ha a select value-ja ures, akkor
                    return true // Visszaadja a true-t
                }
            })
        })
    }
}