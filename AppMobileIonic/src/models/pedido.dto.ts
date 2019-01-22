import { RefDTO } from "./ref.dto";

export interface PedidoDTO {
    id: string;
    cliente: RefDTO;
    instante: string;
    enderecoDeEntrega: any;
    pagamento: any;
    itens: any[];
    valorTotal: string;
}