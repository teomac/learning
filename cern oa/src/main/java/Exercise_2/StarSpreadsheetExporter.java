package Exercise_2;

public class StarSpreadsheetExporter extends SpreadsheetExporter {

    public StarSpreadsheetExporter(SpreadsheetImpl sheet) {
        super(sheet);
    }

    public String export() {
        return super.exportSheet('*');
    }
}
