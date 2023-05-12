//Клас Dock та його конструктор
class Dock{
    constructor(number, amount_of_places) {
        this.number = number
        this.docked_ships = []
        this.amount_of_places  = amount_of_places
    }
}

//Task 7-i
const AddDock = (number, amount_of_places, port) => {

    port.docks.push(new Dock(number, amount_of_places))
}

//Task 7-j
const DeleteDock = (number, port) => {

    const dock = FindDock(number,port)

    if(dock === null) return false;

    const id = port.docks.indexOf(dock)

    port.docks.splice(id, 1)

    return true;
}

//Task 7-l.sub
const FindDock = (number, port) => {

    let result = null

    port.docks.forEach(dock => dock.number===number?result=dock:null)

    return result;
}

//Task 7-l
const FindAllShipsInSpecificDock = (port, dock_number) => {

    const dock = FindDock(dock_number, port)

    return dock.docked_ships;
}

//Експорт класів та фукнцій
exports.Dock = Dock

exports.AddDock = AddDock
exports.DeleteDock = DeleteDock
exports.FindDock = FindDock
exports.FindAllShipsInSpecificDock = FindAllShipsInSpecificDock