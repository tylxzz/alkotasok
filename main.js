const div = (className) => {    // Ez egy arrow function, ami egy div elemet hoz létre a megadott className-nel
    const div = document.createElement('div')  // Létrehoz egy div elemet
    div.className = className  // Beállítja a className-t
    return div // Visszaadja a létrehozott div elemet
}

const container = div('container') // Letrehoz egy container div-et
document.body.appendChild(container)   // hozzaadja a body-hoz
const table = div('table') // Letrehoz egy table div-et

const form = div('form')  // Letrehoz egy form div-et

container.appendChild(table)    // Hozzaadja a table div-et a container-hez
container.appendChild(form)   // Hozzaadja a form div-et a container-hez