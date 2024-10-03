package Exercise_1;

import java.util.*;

public class DuplicatesDetector {
    public static List<Object> detectDuplicates(List<Object> list) {
        Set<Object> seen = new HashSet<>();
        Set<Object> duplicates = new HashSet<>();

        for (Object element : list) {
            if (seen.contains(element)) {
                duplicates.add(element);
            } else {
                seen.add(element);
            }
        }
        return new ArrayList<>(duplicates);

    }
}
