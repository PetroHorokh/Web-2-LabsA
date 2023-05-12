class Dock extends BaseModel {
    constructor () {
        super('docks', 'number')
        this.fields = this.fields.concat(['port','number','capacity'])
    }
}