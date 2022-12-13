export default interface RepositoryInterface<T> {
    //recebe uma entidade genérica T e processa sem retorno de função assíncrono
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    //recebe um id e retorna uma entidade completa T
    find(id: string): Promise<T>;
    //retorna uma lista das entidades T
    findAll(): Promise<T>[];
} 