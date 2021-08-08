import java.util.List;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public class App {

    /**
     * Find 2 indexes in the array that the addition gives the target number
     * @param numberArray Array of numbers
     * @param target result expected
     * @return Array of indexes or empty Array
     */
    public static int[]  twoSum(int[] numberArray, int target ){
        List<Integer> listNumbers = Arrays.stream(numberArray)
            .boxed()
            .collect(Collectors.toList());
        if(listNumbers.contains(target)) return new int[] {listNumbers.indexOf(target)};
        for(int i =0; i < numberArray.length; i++)
        {
            int complement = target - numberArray[i];
            if(complement > 0 && listNumbers.contains(complement))
            {
                return new int[] {i, listNumbers.indexOf(complement)};
            }
            
        }
        return new int[]{};
    }
    public static void main(String[] args) throws Exception {
        int[] numberArray = new int[] {2, 4, 8, 16, 32};

        Map<Integer, Object> expected = Map.of(
            12, new int[]{1, 2},
            34, new int[]{0, 4},
            18, new int[]{0, 3},
            16, new int[]{3},
            32, new int[]{4},
            42, new int[]{}
        );

        for (Map.Entry<Integer, Object> item : expected.entrySet()) {
            assert App.twoSum(numberArray, item.getKey()) == item.getValue();
        }

        System.out.println("Everything is OK");
    }   
}
