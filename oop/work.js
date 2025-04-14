class Work{
    /**
     * @type {string} szerzo
     */
    #szerzo
    /**
     * @type {string} cim
     */
    #cim
    /**
     * @type {string} mufaj
     */
    #mufaj

    /**
     * @returns {string}
     */
    get szerzo(){ // Ez a getter visszaadja a #szerzo property-t
        return this.#szerzo // Visszaadja a #szerzo property-t
    }

    /**
     * @returns {string}
     */
    get cim(){  // Ez a getter visszaadja a #cim property-t
        return this.#cim    // Visszaadja a #cim property-t
    }
    
    /**
     * @returns {string}
     */
    get mufaj(){    // Ez a getter visszaadja a #mufaj property-t
        return this.#mufaj  // Visszaadja a #mufaj property-t
    }

    /**
     * 
     * @param {string} szerzo 
     * @param {string} cim 
     * @param {string} mufaj 
     */
    constructor(szerzo, mufaj, cim){    // Ez a konstruktor létrehoz egy új Work objektumot a megadott szerzo, mufaj es cim property-kkel
        this.#szerzo = szerzo   // Beallitja a #szerzo property-t
        this.#cim = cim // Beallitja a #cim property-t
        this.#mufaj = mufaj // Beallitja a #mufaj property-t
    }
}