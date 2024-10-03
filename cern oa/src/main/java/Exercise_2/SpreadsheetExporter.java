package Exercise_2;

public abstract class SpreadsheetExporter {
    protected final SpreadsheetImpl sheet;

    public SpreadsheetExporter(SpreadsheetImpl sheet) {
        this.sheet = sheet;
    }

    public String exportSheet(char emptyCellChar) {
        StringBuilder s = new StringBuilder();

        s.append(sheet.getRows() + "," + sheet.getColumns() + "#");

        for (int i=0; i< sheet.getRows(); i++) {
            for (int j=0; j< sheet.getColumns(); j++) {
                String content = sheet.get(i, j);
                if(content.isEmpty()) {
                    s.append(emptyCellChar);
                } else {
                    s.append(content).append(emptyCellChar);
                }

            }
        }
        return s.toString();
    }
}
