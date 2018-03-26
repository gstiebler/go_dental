package br.com.godental.enumeration;

/**
 *
 * @author hudsonschumaker
 */
public enum EnumSimNao {

    /* Não mudar ordem do enum pois a entidade usa o EnumType ORDINAL. */
    NAO(0, "Não"),
    SIM(1, "Sim");

    private final Integer indice;
    private final String descricao;

    private EnumSimNao(Integer indice, String descricao) {
        this.indice = indice;
        this.descricao = descricao;
    }

    public static EnumSimNao valueFromIndice(int indice) {
        for (EnumSimNao enumSimNao : EnumSimNao.values()) {
            if (enumSimNao.indice == indice) {
                return enumSimNao;
            }
        }
        return null;
    }

    public Integer getIndice() {
        return indice;
    }

    public String getDescricao() {
        return descricao;
    }
}
