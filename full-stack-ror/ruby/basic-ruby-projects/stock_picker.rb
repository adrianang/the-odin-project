def stock_picker(prices)
  best_days = [0, 0]

  prices.each_with_index do |buy_price, buy_day|
    prices.each_with_index do |sell_price, sell_day|
      if (buy_day < sell_day)
        possible_profit = sell_price - buy_price
        best_days_profit = prices[best_days.last] - prices[best_days.first]
        best_days = [buy_day, sell_day] if possible_profit > best_days_profit
      end
    end
  end

  best_days
end