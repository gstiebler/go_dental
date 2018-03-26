package br.com.godental.enumeration;

/**
 *
 * @author hudsonschumaker
 */
public enum EnumSexo {

    MASCULINO("M", "Masculino"),
    FEMININO("F", "Feminino");

    private final String indice;
    private final String descricao;

    private EnumSexo(String indice, String descricao) {
        this.indice = indice;
        this.descricao = descricao;
    }

    public static EnumSexo getSexoByIndice(String id) {
        for (EnumSexo enumSexo : EnumSexo.values()) {
            if (enumSexo.indice.equals(id)) {
                return enumSexo;
            }
        }
        return null;
    }

    public String getIndice() {
        return indice;
    }


    public String getDescricao() {
        return descricao;
    }
}