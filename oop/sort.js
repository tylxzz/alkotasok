class Sort extends Area { // A Sort osztaly, ami az Area osztalybol szarmazik
    /**
     * 
     * @param {cssClass} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager) {    // Meghivja a szulo osztaly konstruktorat
        super(cssClass, manager)    // Meghivja a szulo osztaly konstruktorat

        const form = document.createElement('form') // Letrehoz egy form elemet
        this.div.appendChild(form) // Hozzaadja a form elemet a sort div-hez
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

        const sortButton = this.createButton('Rendezés') // Letrehoz egy button elemet, ami a szures gombot jelenti
        form.appendChild(sortButton) // Hozzaadja a button-t a form-hoz
        form.addEventListener('submit', (e) => {   // Hozzaad egy eseményfigyelőt a form-hez, ami akkor fut le, amikor az űrlapot elküldik
            e.preventDefault() // Megakadályozza az alapértelmezett űrlap elküldést
            const selectValue = select.value // Beallitja a select value-jat

            this.manager.sort((a, b) => {   // Meghivja a manager sort metodusat, ami rendez egy tombot a callback alapjan
                if (selectValue === '') { // Ha a select value üres, akkor nem rendezünk    
                    return // Nem rendezünk, az eredeti sorrend marad
                }
        
                if (selectValue === 'mufaj') {  // Ha a select value mufaj, akkor a mufaj szerint rendezünk
                    const aSecondWord = a.mufaj.split(' ')[1] || a.mufaj    // Műfaj második szava vagy az egész műfaj
                    const bSecondWord = b.mufaj.split(' ')[1] || b.mufaj    // Műfaj második szava vagy az egész műfaj
                    return aSecondWord.localeCompare(bSecondWord) // Műfaj második szava szerint rendez
                }
        
                return a[selectValue].localeCompare(b[selectValue]) // A kiválasztott mező szerint rendez
            })
        })
    }
}