def bubble_sort(array)
  (array.length - 1).times do
    array_before_pass = array.dup

    array.each_with_index do |num, i|
      if (i != array.length - 1) && (num > array[i + 1])
        array[i], array[i + 1] = array[i + 1], array[i]
      end
    end
    
    break if array == array_before_pass
  end

  array
end