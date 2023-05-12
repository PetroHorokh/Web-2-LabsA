const docked_shipModel = new Docked_ship()
const dockModel = new Dock()
const shipModel = new Ship()
const portModel = new Port()

function initAddForm () {

    const dock_input = document.querySelector('#dock')
    dockModel.Select().forEach(element => {
        dock_input.innerHTML += `<option value="${element.number}">: ${element.port} -: ${element.number} -: ${element.capacity}</option>`
    })

    const ship_input = document.querySelector('#ship')
    shipModel.Select().forEach(element => {
        ship_input.innerHTML += `<option value="${element.number}">: ${element.name} -: ${element.number} -: ${element.tonnage}</option>`
    })

    const form = window.document.querySelector('#docked_ship-add-form')
    form.addEventListener('submit', function (e) {

        const formData = new FormData(e.target)

        const docked_shipData = {}
        formData.forEach((value, key) => {
            docked_shipData[key] = value
        })

        const docked_ships_amount = docked_shipModel.Select().filter(elem => elem.dock===docked_shipData.dock).length

        const dock_capacity = dockModel.Select().filter(elem => elem.number===docked_shipData.dock)[0].capacity

        if(dock_capacity > docked_ships_amount){
            docked_shipModel.Create(docked_shipData)
        }
    })
}
function initList () {
    window.jQuery('#docked_ship-list').DataTable({
        data: docked_shipModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Ship', data: 'ship' },
            { title: 'Dock', data: 'dock' },
            {
                data: null,
                title: 'Action',
                wrap: true,
                render: function (item) {
                    const def = JSON.stringify(item)
                    return `<div>
                        <div class="btn-group"> <button type="button"  id="btn_delete" class="btn_delete btn-warning " data-item='${def}'>Delete</button></div>
                    </div>`
                },
            },
        ]
    })
}
function initEventToDeleteButtons() {
    const elems = document.querySelectorAll('#btn_delete')

    elems.forEach((item) => {
        item.addEventListener('click', function () {
            initDeleteElement(item.dataset.item)
        })
    })
}
function initDeleteElement(row) {
    const formData = JSON.parse(row)

    docked_shipModel.Delete(formData)
}
function initListEvents () {
    document.addEventListener('docked_shipListDataChanged', function (e) {
        const dataTable = window.jQuery('#docked_ship-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}
function initShipsOnSpecificDock() {

    const dock_input = document.querySelector('#report_dock')
    dockModel.Select().forEach(element => {
        dock_input.innerHTML += `<option value="${element.number}"> dock\'s port: ${element.port} - dock\'s number: ${element.number} - dock\'s capacity: ${element.capacity}</option>`
    })

    const form = window.document.querySelector('#report-ships_on_specific_dock-form')
    form.addEventListener('submit', function (e) {

        const docked_ships_numbers = docked_shipModel.Select().filter(elem => elem.dock=dock_input.value).map(elem => elem.ship)

        const ships = shipModel.Select().filter(elem => docked_ships_numbers.includes(elem.number))

        const ship_output = document.querySelector('#report_ship')

        ships.forEach(elem => {
            ship_output.innerHTML += `<option value=""">ship\'s name: ${elem.name} - ship\'s number: ${elem.number} - ship\'s country: ${elem.country} - ship\'s tonnage: ${elem.tonnage}</option>`
        })
        e.preventDefault()
    })

}
function initDocksAndShipsOnSpecificPort() {
    const port_input = document.querySelector('#report_port')
    portModel.Select().forEach(element => {
        port_input.innerHTML += `<option value="${element.number}"> port\'s name: ${element.name} - port\'s country: ${element.country} - port\'s number: ${element.number}</option>`
    })

    const form = window.document.querySelector('#report-ships_docks_on_specific_port-form')
    form.addEventListener('submit',function (e) {
        const dock_numbers = dockModel.Select().filter(elem => elem.port===port_input.value).map(elem => elem.number)

        const docked_ships_numbers = docked_shipModel
            .Select()
            .filter(elem => dock_numbers
                .includes(elem.dock))
            .map(elem => elem.ship)

        const docked_ship = shipModel
            .Select()
            .filter(ship => docked_ships_numbers
                .includes(ship.number))
            .map(elem => ({
                dock: docked_shipModel
                    .Select()
                    .filter(dock => dock.ship===elem.number)
                    .map(dock => dock.dock)[0],
                name: elem.name,
                number: elem.number,
            }))

        const docks_ships_output = document.querySelector('#report_docks_ship')
        docked_ship.forEach(element => {
            docks_ships_output.innerHTML += `<option> dock: ${element.dock} - ship\'s name: ${element.name} - ship\'s number: ${element.number}</option>`
        })

        e.preventDefault()
    })
}
window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
    initEventToDeleteButtons()
    initShipsOnSpecificDock()
    initDocksAndShipsOnSpecificPort()
})
