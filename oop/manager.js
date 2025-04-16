/** 
 * @callback WorkCallback
 * @param {Work[]} works
 * @returns {void}
 */
class Manager{  // Manager osztaly letrehozasa
    /**
     * @type {Work[]} array
     */
    #array  // Letrehoz egy ures tombot, ami a Work objektumokat tartalmazza
    /**
     * @type {WorkCallback} addWorkCallback
     */
    #addWorkCallback    // Letrehoz egy ures tombot, ami a Work objektumokat tartalmazza
    /**
     * @type {WorkCallback} renderTableCallback
     */
    #renderTableCallback    // Letrehoz egy ures tombot, ami a Work objektumokat tartalmazza

    constructor(){  // Konstruktor letrehozasa
        this.#array = [] // Letrehoz egy ures tombot
    }

    /**
     * @param {WorkCallback} callback 
     */
    setAddWorkCallback(callback){   // Beallitja a callback-et
        this.#addWorkCallback = callback // Beallitja a callback-et
    }

    /**
     * 
     * @param {WorkCallback} callback 
     */
    setRenderTableCallback(callback){ // Beallitja a renderTableCallback-et
        this.#renderTableCallback = callback // Beallitja a renderTableCallback-et
    }

    /**
     * @param {Work} work 
     */
    addWork(work){ // Hozzaad egy munkat a tombhoz
        this.#array.push(work) // Hozzaadja a munkat a tombhoz
        this.#addWorkCallback(work) // Meghivja a callback-et
    }

    /**
     * 
     * @param {(a: Work, b: Work) => number} callback 
     */
    sort(callback) { // Rendez egy tombot a callback alapjan
        const sortedArray = this.#array.slice(); // Másolatot készít a tömbről a slice() metódussal
    
        for (let i = 0; i < sortedArray.length - 1; i++) {  // A rendezéshez szükséges külső ciklus
            for (let j = 0; j < sortedArray.length - i - 1; j++) {  // A rendezéshez szükséges belső ciklus
                if (callback(sortedArray[j], sortedArray[j + 1]) > 0) { // Ha a callback visszatérési értéke nagyobb, mint 0, akkor cserélünk
                    const temp = sortedArray[j]    // Ideiglenes változó létrehozása
                    sortedArray[j] = sortedArray[j + 1]    // Az aktuális elem értékének beállítása a következő elem értékére
                    sortedArray[j + 1] = temp  // A következő elem értékének beállítása az aktuális elem értékére
                }
            }
        }
    
        this.#renderTableCallback(sortedArray) // Meghívja a renderTableCallback-et a rendezett tömbbel
    }

    /**
     * @returns {string} work
     */
    generateExportString(){ // Letrehoz egy export stringet
        const result = ['szerzo;cim;mufaj'] // Letrehoz egy tombot, ami a header-t tartalmazza
        for(const work of this.#array){ // Vegigmegy a tomb elemein
            result.push(`${work.szerzo};${work.cim};${work.mufaj}`) // Hozzaadja az elemet a tombhoz
        }
        return result.join('\n') // Visszaadja a tombot szovegkent
    }
}