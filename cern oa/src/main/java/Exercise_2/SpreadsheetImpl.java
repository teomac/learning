package Exercise_2;

public class SpreadsheetImpl {
    private final String[][] sheet;
    private final int rows;
    private final int columns;

    public SpreadsheetImpl(int rows, int columns) {
        this.rows = rows;
        this.columns = columns;
        sheet = new String[rows][columns];

        for (int i=0; i<sheet.length; i++) {
            for (int j=0; j<sheet[i].length; j++) {
                sheet[i][j] = "";
            }
        }
    }

    public String get(int a, int b) {
        if(a>=sheet.length || b>=sheet[0].length) {
            throw new IndexOutOfBoundsException();
        }
        return sheet[a][b];
    }

    public void put(int a, int b, String content) {
        if(a>=sheet.length || b>=sheet[0].length) {
            throw new IndexOutOfBoundsException();
        }
        if (isInteger(content)) {
            content = content.trim();
        }
        sheet[a][b] = content;
    }

    public ValueType getValueType(int a, int b) {
        if(a>=sheet.length || b>=sheet[0].length) {
            throw new IndexOutOfBoundsException();
        }
        String content = sheet[a][b];
        if (content.startsWith("=")) {
            return ValueType.FORMULA;
        }
        try {
            Integer.parseInt(content);
            return ValueType.INTEGER;
        } catch (NumberFormatException e) {
            return ValueType.STRING;
        }
    }

    private static boolean isInteger(String a) {
        try {
            Integer.parseInt(a.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public int getRows() {
        return rows;
    }

    public int getColumns() {
        return columns;
    }
}
