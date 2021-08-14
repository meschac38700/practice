<?php
namespace Meschac\Php;


class App{
  /**
   * Find 2 indexes in the array that the addition gives the target number
   * @param array numberArray Array of numbers
   * @param int target result expected
   * @return array of indexes or empty Array  
   */
  public static function twoSum(array $numberArray, int $target) : array{
    if(in_array($target, $numberArray)) return [array_search($target, $numberArray)];
    foreach ($numberArray as $index => $number){
      $complement = $target - $number;
      if($complement > 0 && in_array($complement, $numberArray) )
        return [$index, array_search($complement, $numberArray)];
    }
    return [];
  }
}

$numbers = [2, 4, 8, 16, 32];
$expected = [
  2 => [ 0 ],
  32 => [ 4 ],
  12 => [1, 2],
  34 => [0, 4],
  18 => [0, 3],
  42 => [],
];
foreach($expected as $target => $expect_indexes){
  assert(App::twoSum($numbers, $target) == $expect_indexes);
}
echo "Everything is OK" . PHP_EOL;