//Клас Ship та його конструктор
class Ship {
    constructor(number, type) {
        this.number = number
        this.type = type
    }
}

//Task 7-e
const AddShip = (number, type, ships) => {

    ships.push(new Ship(number,type))
}

//Task 7-f
const EditShip = (number, ships, new_number, new_type) => {

    const ship = FindShip(number,ships)

    if(ship === null) return false;

    const id = ships.indexOf(ship)

    ships[id].number = new_number
    ships[id].type = new_type

    return true;
}

//Task 7-g
const DeleteShip = (number, ships) => {

    const ship = FindShip(number,ships)

    if(ship === null) return false;

    const id = ships.indexOf(ship)

    ships.splice(id, 1)

    return true;
}

//Task 7-h
const FindShip = (number, ships) => {

    let result = null

    ships.forEach(ship => ship.number===number?result=ship:null)

    return result;
}

//Експорт класів та фукнцій
exports.Ship = Ship

exports.AddShip = AddShip
exports.EditShip = EditShip
exports.DeleteShip = DeleteShip
exports.FindShip = FindShip