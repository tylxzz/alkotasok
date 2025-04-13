class Area{
    constructor(className) {    // Ez a konstruktor létrehoz egy új Area objektumot a megadott className-nel
        let container = document.querySelector('.container') // Keres egy elemet a DOM-ban a className alapján
        if(!container) { // Ha nem találja, akkor létrehoz egy új div elemet
            container = document.createElement('div') // Létrehoz egy div elemet
            container.className = 'container' // Beállítja a className-t
            document.body.appendChild(container) // Hozzáadja a body-hoz
        }
        const div = document.createElement('div') // Létrehoz egy új div elemet
        div.className = className // Beállítja a className-t
        container.appendChild(div) // Hozzáadja a container-hez
    }
}