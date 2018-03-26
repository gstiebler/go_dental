package br.com.godental.enumeration;

/**
 *
 * @author hudsonschumaker
 */
public enum EnumNivelEscolaridade {

    SEM(1L, "Sem instrução"),
    FUNDAMENTAL(2L, "Ensino Fundamental"),
    MEDIO(3L, "Ensino Médio"),
    SUPERIOR(4L, "Ensino Superior"),
    POS(5L, "Pós Graduação"),
    MESTRADO(6L, "Mestrado"),
    DOUTORADO(7L, "Doutorado");

    private final Long indice;
    private final String descricao;

    private EnumNivelEscolaridade(Long indice, String descricao) {
        this.indice = indice;
        this.descricao = descricao;
    }

    public static EnumNivelEscolaridade getNivelEscolaridadeByIndice(Long id) {
        for (EnumNivelEscolaridade enumNivelEscol : EnumNivelEscolaridade.values()) {
            if (enumNivelEscol.indice.equals(id)) {
                return enumNivelEscol;
            }
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
