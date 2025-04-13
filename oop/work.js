class Work{
    /**
     * @type {string} szerzo
     */
    #szerzo
    /**
     * @type {string} mufaj
     */
    #mufaj
    /**
     * @type {string} cim
     */
    #cim

    /**
     * @returns {string}
     */
    get szerzo(){
        return this.#szerzo
    }

    /**
     * @returns {string}
     */
    get mufaj(){
        return this.#mufaj
    }

    /**
     * @returns {string}
     */
    get cim(){
        return this.#cim
    }

    /**
     * 
     * @param {string} szerzo 
     * @param {string} mufaj 
     * @param {string} cim 
     */
    constructor(szerzo, mufaj, cim){
        this.#szerzo = szerzo
        this.#mufaj = mufaj
        this.#cim = cim
    }
}