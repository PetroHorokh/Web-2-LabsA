class Docked_ship extends BaseModel {
    constructor () {
        super('docked_ships', 'ship')
        this.fields = this.fields.concat(['ship','dock'])
    }
}