//Клас Port та його конструктор
class Port{
    constructor(location, docks) {
        this.location = location
        this.docks = docks
    }
}

//Task 7-a
const AddPort = (location, docks, ports) => {
    ports.push(new Port(location,docks))
}

//Task 7-b
const EditPort = (location, ports, new_location, new_docks) => {

    const port = FindPort(location,ports)

    if(port === null) return false;

    const id = ports.indexOf(port)

    ports[id].location = new_location
    ports[id].docks = new_docks

    return true;
}

//Task 7-c
const DeletePort = (location, ports) => {

    const port = FindPort(location,ports)

    if(port === null) return false;

    const id = ports.indexOf(port)

    ports.splice(id, 1)

    return true;
}

//Task 7-d
const FindPort = (location, ports) => {

    let result = null

    ports.forEach(port => port.location===location?result=port:null)

    return result;
}

//Експорт класів та фукнцій
exports.Port = Port

exports.AddPort = AddPort
exports.EditPort = EditPort
exports.DeletePort = DeletePort
exports.FindPort = FindPort