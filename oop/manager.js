/**
 * @typedef {{szerzo: string, mufaj: string, cim: string}} Work
 * 
 * @callback AddWorkCallback
 * @param {Work[]} work
 * @returns {void}
 */
class Manager{  // Manager osztaly letrehozasa
    /**
     * @type {Work[]} array
     */
    #array
    /**
     * @type {AddWorkCallback} addWorkCallback
     */
    #addWorkCallback
    /**
     * @type {RenderTableCallback} renderTableCallback
     */
    #renderTableCallback

    constructor(){
        this.#array = [] // Letrehoz egy ures tombot
    }

    /**
     * @param {AddWorkCallback} callback 
     */
    setAddWorkCallback(callback){   // Beallitja a callback-et
        this.#addWorkCallback = callback // Beallitja a callback-et
    }

    /**
     * 
     * @param {RenderTableCallback} callback 
     */
    setRenderTableCallback(callback){ // Beallitja a renderTableCallback-et
        this.#renderTableCallback = callback // Beallitja a renderTableCallback-et
    }

    /**
     * @param {AddWorkCallback} work 
     */
    addWork(work){ // Hozzaad egy munkat a tombhoz
        this.#array.push(work) // Hozzaadja a munkat a tombhoz
        this.#addWorkCallback(work) // Meghivja a callback-et
    }

    /**
     * 
     * @param {RenderTableCallback} callback 
     */
    filter(callback){
        const result = [] // Letrehoz egy ures tombot
        for(const work of this.#array){ // Vegigmegy a tomb elemein
            if(callback(work)){ // Ha a callback true-t ad vissza, akkor
                result.push(work) // Hozzaadja az elemet a tombhoz
            }
        }
        this.#renderTableCallback(result) // Meghivja a renderTableCallback-et
    }

    /**
     * @returns {Work[]} work
     */
    generateExportString(){
        const result = ['szerzo;cim;mufaj'] // Letrehoz egy tombot, ami a header-t tartalmazza
        for(const work of this.#array){ // Vegigmegy a tomb elemein
            result.push(`${work.szerzo};${work.cim};${work.mufaj}`) // Hozzaadja az elemet a tombhoz
        }
        return result.join('\n') // Visszaadja a tombot szovegkent
    }
}