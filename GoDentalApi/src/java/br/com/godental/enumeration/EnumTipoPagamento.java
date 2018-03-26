package br.com.godental.enumeration;

/**
 *
 * @author hudsonschumaker
 */
public enum EnumTipoPagamento {
    CREDITO(1L, "Crédito"),
    DEBITO(2L, "Débito"),
    BOLETO(3L, "Boleto");
    
    private final Long indice;
    private final String descricao;
    
    EnumTipoPagamento(Long indice, String descricao) {
        this.indice = indice;
        this.descricao = descricao;
    }
    
    public static EnumTipoPagamento getTipoPagamentoByIndice(int indice) {

        switch (indice) {

            case 1:
                return EnumTipoPagamento.CREDITO;

            case 2:
                return EnumTipoPagamento.DEBITO;

            case 3:
                return EnumTipoPagamento.BOLETO;

            default:
                break;
        }
        return null;
    }
    
    public Long getIndice() {
        return indice;
    }

    public String getDescricao() {
        return descricao;
    }
}