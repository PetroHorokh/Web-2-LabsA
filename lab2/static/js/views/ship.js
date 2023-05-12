const shipModel = new Ship()
function initAddForm () {
    const form = window.document.querySelector('#ship-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const shipData = {}
        formData.forEach((value, key) => {
            shipData[key] = value
        })

        shipModel.Create(shipData)
    })
}
function initList () {
    window.jQuery('#ship-list').DataTable({
        data: shipModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Number', data: 'number' },
            { title: 'Country', data: 'country' },
            { title: 'Tonnage', data: 'tonnage' },
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

    shipModel.Delete(formData)
}
function initUpdateElementForm(row) {
    const formData = JSON.parse(row)

    const form = document.querySelector('#update-form')
    form.style.display = 'block'

    const cancel_update_button = document.querySelector('#btn-cancel')
    cancel_update_button.addEventListener('click',function (){
        form.style.display = 'none'
    })

    const update_name_input = document.querySelector('#update_name')
    update_name_input.value = formData.name

    const update_number_input = window.document.querySelector('#update_number')
    update_number_input.value = formData.number

    const update_country_input = window.document.querySelector('#update_country')
    update_country_input.value = formData.country

    const update_tonnage_input = window.document.querySelector('#update_tonnage')
    update_tonnage_input.value = formData.tonnage

    form.addEventListener('submit', function (e){

        const newData = {
            id: formData.id,
            name: update_name_input.value,
            number: update_number_input.value,
            country: update_country_input.value,
            tonnage: update_tonnage_input.value,
        }

        shipModel.Update(formData, newData)
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
    document.addEventListener('shipListDataChanged', function (e) {
        const dataTable = window.jQuery('#ship-list').DataTable()

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
