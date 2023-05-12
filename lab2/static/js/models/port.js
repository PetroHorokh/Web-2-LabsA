class Port extends BaseModel {
    constructor () {
        super('ports', 'number')
        this.fields = this.fields.concat(['name', 'country', 'number','address'])
    }
}