export class ClienteDTO {
    id : string;
    nome : string;
    email : string;
    telefones: string[];
    enderecos: string[];
    tipo: string;
    perfis: string[];
    imageUrl : string = 'assets/imgs/avatar.jpg'
}