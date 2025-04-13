class Manager{  // Manager osztaly letrehozasa
    /**
     * @type {Array} array
     */
    #array
    /**
     * @type {callback} addWorkCallback
     */
    #addWorkCallback

    constructor(){
        this.#array = [] // Letrehoz egy ures tombot
    }

    /**
     * @param {callback} callback 
     */
    setAddWorkCallback(callback){
        this.#addWorkCallback = callback // Beallitja a callback-et
    }

    /**
     * @param {callback} work 
     */
    addWork(work){ // Hozzaad egy munkat a tombhoz
        this.#array.push(work) // Hozzaadja a munkat a tombhoz
        if(this.#addWorkCallback) this.#addWorkCallback(work) // Ha van callback, akkor meghivja a callback-et a munkaval
    }
}