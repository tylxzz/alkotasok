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
     * @param {AddWorkCallback} work 
     */
    addWork(work){ // Hozzaad egy munkat a tombhoz
        this.#array.push(work) // Hozzaadja a munkat a tombhoz
        this.#addWorkCallback(work) // Meghivja a callback-et
    }
}