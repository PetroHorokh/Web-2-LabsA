class Ship extends BaseModel {
    constructor () {
        super('ships', 'number')
        this.fields = this.fields.concat(['name','number','country','tonnage'])
    }
}