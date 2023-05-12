//Під'єднання модулів через об'єкти
const port  = require("./Port")
const ship = require("./Ship")
const dock = require("./Dock")
const docked_ship = require("./Docked_ship")

//Експорт класів та фукнцій, отриманих з модулів
exports.Post = port.Port

exports.AddPort = port.AddPort
exports.EditPort = port.EditPort
exports.DeletePort = port.DeletePort
exports.FindPort = port.FindPort

exports.Ship = ship.Ship

exports.AddShip = ship.AddShip
exports.EditShip = ship.EditShip
exports.DeleteShip = ship.DeleteShip
exports.FindShip = ship.FindShip

exports.Dock = dock.Dock

exports.AddDock = dock.AddDock
exports.DeleteDock = dock.DeleteDock
exports.FindDock = dock.FindDock
exports.FindAllShipsInSpecificDock = dock.FindAllShipsInSpecificDock

exports.Docked_ship = docked_ship.Docked_ship

exports.ShipArrival = docked_ship.ShipArrival
exports.ShipDeparture = docked_ship.ShipDeparture