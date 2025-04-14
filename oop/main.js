const separator = document.createElement('hr') // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator)    // Hozzaadja a separator-t a body-hoz

const fConfig = [{ // Letrehoz egy tombot az input elemek neveivel
    id: 'szerzo',   // Az id az input elem neve, ami a formban lesz
    label: 'Szerző', // Az input elem neve, ami a tableben lesz
},
{
    id: 'cim',  // Az id az input elem neve, ami a formban lesz
    label: 'Cím',    // Az input elem neve, ami a tableben lesz
},
{
    id: 'mufaj',   // Az id az input elem neve, ami a formban lesz
    label: 'Műfaj',  // Az input elem neve, ami a tableben lesz
}]
const manager = new Manager() // Letrehoz egy manager objektumot
const tableDiv = new Table('table', manager) // Letrehoz egy table div-et
const formDiv = new Form('form', fConfig, manager) // Letrehoz egy form div-et
const upload = new UploadDownload('upload', manager) // Letrehoz egy upload div-et