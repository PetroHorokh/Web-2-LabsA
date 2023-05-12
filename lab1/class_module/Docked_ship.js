//Під'єднання модуля, отримати функцію FindShip
const ship_manager = require("./Ship")

//Клас Docked_ship та його конструктор
class Docked_ship {
    constructor(number, type) {
        this.number = number
        this.type = type
    }
}

//Task 7-l.1
const ShipArrival = (ship, dock) => {

    if(dock.amount_of_places === dock.docked_ships.length){

        console.log('There is no place in this dock')

        return false;
    }

    dock.docked_ships.push(new Docked_ship(ship.number,ship.type))

    return true;
}

//Task 7-l.2
const ShipDeparture = (number, dock) => {

    const ship =  ship_manager.FindShip(number,dock.docked_ships)

    if(ship === null) {

        console.log('There is no ship with such number')

        return false;
    }

    const id = dock.docked_ships.indexOf(ship)

    dock.docked_ships.splice(id, 1)

    return true;
}

//Експорт класів та фукнцій
exports.Docked_ship = Docked_ship

exports.ShipArrival = ShipArrival
exports.ShipDeparture = ShipDeparture