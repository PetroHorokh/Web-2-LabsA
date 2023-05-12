const dockModel = new Dock()
const portModel = new Port()
function initAddForm () {

    const port_input = document.querySelector('#port')
    portModel.Select().forEach(element => {
        port_input.innerHTML += `<option value="${element.number}">port\'s name: ${element.name} - port\'s number: ${element.number} - port\'s country: ${element.country}</option>`
    })

    const form = window.document.querySelector('#dock-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const dockData = {}
        formData.forEach((value, key) => {
            if(key==='capacity') {
                if(Number.isInteger(parseInt(value, 10)) && parseInt(value, 10)>0) {dockData[key] = parseInt(value, 10)}
                return false
            }
            else{ dockData[key] = value }
        })

        dockModel.Create(dockData)
    })
}
function initList () {
    window.jQuery('#dock-list').DataTable({
        data: dockModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Port', data: 'port' },
            { title: 'Number', data: 'number' },
            { title: 'Capacity', data: 'capacity' },
            {
                data: null,
                title: 'Action',
                wrap: true,
                render: function (item) {
                    const def = JSON.stringify(item)
                    return `<div>
                        <div class="btn-group"> <button type="button"  id="btn_delete" class="btn_delete btn-warning " data-item='${def}'>Delete</button></div>
                        <div class="btn-group"> <button type="button"  id="btn_update" class="btn_update btn-primary " data-item='${def}'>Update</button></div>
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

    dockModel.Delete(formData)
}
function initUpdateElementForm(row) {
    const formData = JSON.parse(row)

    const form = document.querySelector('#update-form')
    form.style.display = 'block'

    const cancel_update_button = document.querySelector('#btn-cancel')
    cancel_update_button.addEventListener('click',function (){
        form.style.display = 'none'
    })

    const update_port_input = document.querySelector('#update_port')
    portModel.Select().forEach(element => {
        update_port_input.innerHTML += `<option value="${element.number}">port\'s name: ${element.name} - port\'s number: ${element.number} - port\'s country: ${element.country}</option>`
    })

    const update_number_input = window.document.querySelector('#update_number')
    update_number_input.value = formData.number


    const update_capacity_input = window.document.querySelector('#update_capacity')
    update_capacity_input.value = formData.capacity

    form.addEventListener('submit', function (e){

        const newData = {
            id: formData.id,
            port: update_port_input.value,
            number: update_number_input.value,
            capacity: update_capacity_input.value,
        }

        dockModel.Update(formData, newData)
    })
}
function initEventToUpdateButtons() {
    const elems = document.querySelectorAll('#btn_update')

    elems.forEach((item) => {
        item.addEventListener('click', function () {
            initUpdateElementForm(item.dataset.item)
        })
    })
}
function initListEvents () {
    document.addEventListener('dockListDataChanged', function (e) {
        const dataTable = window.jQuery('#dock-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
    initEventToDeleteButtons()
    initEventToUpdateButtons()
})
