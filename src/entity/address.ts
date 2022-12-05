export default class Address {

    //não possui id é um conjunto de propriedades
    //atributos privados - veda alterações diretas nele
    //após criar não é possível alterar, pois não tem getters e setters, um novo objeto deve ser criado para substituir
    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";

    //todas as propriedades devem ser passadas como construtor
    constructor(street: string, number: number, zip:string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();
    }

    //autovalida, garantindo consistência
    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }

        if (this._number === 0) {
            throw new Error("Number is required");

        }

        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }

        if (this._city.length === 0) {
            throw new Error("City is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._city}`;
    }

}