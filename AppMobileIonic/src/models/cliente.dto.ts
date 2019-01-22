import { EnderecoDTO } from "./endereco.dto";

export class ClienteDTO {
    id : string;
    nome : string;
    email : string;
    senha: string;
    cpfOuCnpj: string;
    telefones: string[];
    enderecos: EnderecoDTO[];
    tipo: any;
    perfis: string[];
    imageUrl : string = 'assets/imgs/avatar.jpg'
}