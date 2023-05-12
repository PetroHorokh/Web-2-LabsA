const portModel = new Port()
function initAddForm () {
    const form = window.document.querySelector('#port-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const portData = {}
        formData.forEach((value, key) => {
            portData[key] = value
        })

        portModel.Create(portData)
    })
}
function initList () {
    window.jQuery('#port-list').DataTable({
        data: portModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Country', data: 'country' },
            { title: 'Number', data: 'number' },
            { title: 'Address', data: 'address' },
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

    portModel.Delete(formData)
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

    const update_country_input = window.document.querySelector('#update_country')
    update_country_input.value = formData.country

    const update_number_input = window.document.querySelector('#update_number')
    update_number_input.value = formData.number

    const update_address_input = window.document.querySelector('#update_address')
    update_address_input.value = formData.address

    form.addEventListener('submit', function (e){

        const newData = {
            id: formData.id,
            name: update_name_input.value,
            country: update_country_input.value,
            number: update_number_input.value,
            address: update_address_input.value,
        }

        portModel.Update(formData, newData)
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
    document.addEventListener('portListDataChanged', function (e) {
        const dataTable = window.jQuery('#port-list').DataTable()

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
