import Address from './address';
//entidade anêmica - simplesmente armazena dados, não possue comportamentos(regras de negócio)
export default class Customer {

    //entidade é única - precisa de um id
    private _id: string;
    //numa entidade, os demais atributos mudam com o tempo
    private _name: string="";
    private _address!: Address;
    private _active: boolean;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._active = false;

        this.validate()
    }

    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get Address(): Address {
        return this._address;
    }

    set Address(address: Address){
        this._address = address
    }

    //imbuir com comportamentos - regras de negócio - expressividade dos métodos refletindo seus objetivos
    changeName(name: string) {
        this._name = name;
        this.validate()
    }

    deactivate() {
        this._active = false;
    }

    activate() {
        //endereco obrigatorio para emissao de NF
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true;
    }

    isActive():boolean {
        if (this._active === true){
            return true;
        }
        return false;
    }

    //uma entidade por padrão sempre vai precisar se autovalidar
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required")
        }
        
        if (this._name.length === 0) {
            throw new Error("Name is required")
        }

      
    }



}