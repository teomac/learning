package Exercise_1;


import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {

        List<Object> list = Arrays.asList("b", "a", "c", "c", "e", "a", "c", "d", "c", "d");
        List<Object> duplicates = DuplicatesDetector.detectDuplicates(list);
        System.out.println(duplicates);
    }
}