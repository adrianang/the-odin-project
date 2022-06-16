def caesar_cipher(string, factor)
  key = "abcdefghijklmnopqrstuvwxyz"

  string.split("")
        .map do |char|
          if key.include?(char)
            key[(key.index(char) + factor) % 26] 
          elsif key.include?(char.downcase)
            key[(key.index(char.downcase) + factor) % 26].upcase
          else
            char
          end
        end
        .join("")
end