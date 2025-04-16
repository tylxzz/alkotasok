const array = [] // Letrehoz egy ures tombot
const container = div('container') // Letrehoz egy container div-et
document.body.appendChild(container)   // hozzaadja a body-hoz
createTable(container, (tbody) => {  // Letrehozza a table-t a containerben
    createForm(tbody, container, array) // Letrehozza a formot a tablebody-val es a containerrel
    createFileUpload(tbody, container, array) // Letrehozza a file uploadot a tablebody-val es a containerrel
    createFileDownload(container, array) // Letrehozza a file letolto gombot a containerben
    createSortForm(container, tbody, array) // Letrehozza a filter formot a containerben
})