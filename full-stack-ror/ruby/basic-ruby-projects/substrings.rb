def substrings(string, dictionary)
  substring_collection = Hash.new(0)
  split_string = string.downcase.split(" ")

  dictionary.each do |entry|
    split_string.each do |fragment|
      substring_collection[entry] += 1 if fragment.include?(entry.downcase)
    end
  end

  substring_collection
end