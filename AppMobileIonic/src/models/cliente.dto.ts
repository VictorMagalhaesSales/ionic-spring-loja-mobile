import { EnderecoDTO } from "./endereco.dto";

export class ClienteDTO {
    id : string;
    nome : string;
    email : string;
    cpfOuCnpj: string;
    telefones: string[];
    enderecos: EnderecoDTO[];
    tipo: string;
    perfis: string[];
    imageUrl : string = 'assets/imgs/avatar.jpg'
}