package br.com.godental.enumeration;

/**
 *
 * @author Hudson Schumaker
 */
public enum EnumIndAtivo {

    INATIVO(0, "Inativo"),
    ATIVO(1, "Ativo"),
    TODOS(2, "Todos");

    private final Integer indice;
    private final String descricao;

    private EnumIndAtivo(Integer indice, String descricao) {
        this.indice = indice;
        this.descricao = descricao;
    }

    public static EnumIndAtivo getIndAtivoByIndice(Integer indice) {

        switch (indice) {

            case 0:
                return EnumIndAtivo.INATIVO;

            case 1:
                return EnumIndAtivo.ATIVO;

            case 2:
                return EnumIndAtivo.TODOS;

            default:
                break;
        }
        return null;
    }

    //getters
    public Integer getIndice() {
        return indice;
    }

    public String getDescricao() {
        return descricao;
    }
}
