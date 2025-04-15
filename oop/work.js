class Work{
    /**
     * @type {string} szerzo
     */
    #szerzo // Ez a property a szerzo-t tartalmazza
    /**
     * @type {string} cim
     */
    #cim    // Ez a property a cim-t tartalmazza
    /**
     * @type {string} mufaj
     */
    #mufaj  // Ez a property a mufaj-t tartalmazza

    /**
     * @returns {string} szerzo
     */
    get szerzo(){ // Ez a getter visszaadja a #szerzo property-t
        return this.#szerzo // Visszaadja a #szerzo property-t
    }

    /**
     * @returns {string} cim
     */
    get cim(){  // Ez a getter visszaadja a #cim property-t
        return this.#cim    // Visszaadja a #cim property-t
    }
    
    /**
     * @returns {string} mufaj
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
    constructor(szerzo, cim, mufaj){    // Ez a konstruktor létrehoz egy új Work objektumot a megadott szerzo, mufaj es cim property-kkel
        this.#szerzo = szerzo   // Beallitja a #szerzo property-t
        this.#cim = cim // Beallitja a #cim property-t
        this.#mufaj = mufaj // Beallitja a #mufaj property-t
    }
}