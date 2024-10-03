package Exercise_2;

import Exercise_2.SpreadsheetExporter;
import Exercise_2.SpreadsheetImpl;

public class DashSpreadsheetExporter extends SpreadsheetExporter {

    public DashSpreadsheetExporter(SpreadsheetImpl sheet) {
        super(sheet);
    }

    public String export() {
        return super.exportSheet('-');
    }
}
