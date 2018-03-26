package br.com.godental.enumeration;

/**
 *
 * @author hudsonschumaker
 */
public enum EnumTipoDocumento {

    RG(1L, "Carteira de Identidade"),
    CTPS(2L, "Carteira de Trabalho"),
    PIS_PASEP(3L, "PIS/PASEP"),
    CNH(4L, "Carteira de Habilitação"),
    PASSAPORTE(5L, "Passaporte"),
    CPF(7L, "CPF"),
    CNPJ(8L, "CNPJ"),
    MEI(9L, "MEI");

    private final Long indice;
    private final String descricao;

    EnumTipoDocumento(Long indice, String descricao) {
        this.indice = indice;
        this.descricao = descricao;
    }

    public static EnumTipoDocumento getTipoDocumentoByIndice(int indice) {

        switch (indice) {

            case 1:
                return EnumTipoDocumento.RG;

            case 2:
                return EnumTipoDocumento.CTPS;

            case 3:
                return EnumTipoDocumento.PIS_PASEP;

            case 4:
                return EnumTipoDocumento.CNH;

            case 5:
                return EnumTipoDocumento.PASSAPORTE;

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