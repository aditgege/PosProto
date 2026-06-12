import type { Product, ProductCategory } from './types'

export const productMockData: ProductCategory = {
  'breakfast': [
    { id: 'b-01', name: 'Pancake', price: 25000, color: 'border-l-8 border-emerald-100' },
    { id: 'b-02', name: 'Croissant', price: 18000, color: 'border-l-8 border-emerald-200' },
    { id: 'b-03', name: 'Omelette', price: 22000, color: 'border-l-8 border-emerald-300' },
    { id: 'b-04', name: 'French Toast', price: 27000, color: 'border-l-8 border-emerald-400' },
    { id: 'b-05', name: 'Cereal Bowl', price: 15000, color: 'border-l-8 border-emerald-100' },
    { id: 'b-06', name: 'Avocado Toast', price: 32000, color: 'border-l-8 border-emerald-300' },
    { id: 'b-07', name: 'Bagel', price: 12000, color: 'border-l-8 border-emerald-200' },
    { id: 'b-08', name: 'Scrambled Egg', price: 20000, color: 'border-l-8 border-emerald-100' },
    { id: 'b-09', name: 'Granola', price: 16000, color: 'border-l-8 border-emerald-200' },
    { id: 'b-10', name: 'Waffle', price: 28000, color: 'border-l-8 border-emerald-400' },
    { id: 'b-11', name: 'English Muffin', price: 14000, color: 'border-l-8 border-emerald-100' },
    { id: 'b-12', name: 'Hash Brown', price: 11000, color: 'border-l-8 border-emerald-300' },
    { id: 'b-13', name: 'Banana Split', price: 30000, color: 'border-l-8 border-emerald-200' },
  ],
  'soups': [
    { id: 's-01', name: 'Tomato Soup', price: 18000, color: 'border-l-8 border-pink-100' },
    { id: 's-02', name: 'Chicken Soup', price: 22000, color: 'border-l-8 border-pink-200' },
    { id: 's-03', name: 'Mushroom Soup', price: 20000, color: 'border-l-8 border-pink-300' },
    { id: 's-04', name: 'Pumpkin Soup', price: 19000, color: 'border-l-8 border-pink-200' },
    { id: 's-05', name: 'Minestrone', price: 21000, color: 'border-l-8 border-pink-400' },
    { id: 's-06', name: 'Broccoli Soup', price: 17000, color: 'border-l-8 border-pink-100' },
    { id: 's-07', name: 'Seafood Soup', price: 35000, color: 'border-l-8 border-pink-300' },
    { id: 's-08', name: 'Corn Soup', price: 16000, color: 'border-l-8 border-pink-200' },
  ],
  'pasta': [
    { id: 'p-01', name: 'Spaghetti Bolognese', price: 35000, color: 'border-l-8 border-cyan-100' },
    { id: 'p-02', name: 'Fettuccine Alfredo', price: 38000, color: 'border-l-8 border-cyan-200' },
    { id: 'p-03', name: 'Penne Arrabiata', price: 32000, color: 'border-l-8 border-cyan-300' },
    { id: 'p-04', name: 'Lasagna', price: 42000, color: 'border-l-8 border-cyan-400' },
    { id: 'p-05', name: 'Pasta Carbonara', price: 36000, color: 'border-l-8 border-cyan-100' },
    { id: 'p-06', name: 'Mac & Cheese', price: 28000, color: 'border-l-8 border-cyan-200' },
    { id: 'p-07', name: 'Linguine Pesto', price: 34000, color: 'border-l-8 border-cyan-300' },
    { id: 'p-08', name: 'Ravioli', price: 40000, color: 'border-l-8 border-cyan-400' },
    { id: 'p-09', name: 'Gnocchi', price: 33000, color: 'border-l-8 border-cyan-100' },
    { id: 'p-10', name: 'Tagliatelle', price: 37000, color: 'border-l-8 border-cyan-200' },
  ],
  'sushi': [
    { id: 'su-01', name: 'Salmon Nigiri', price: 12000, color: 'border-l-8 border-purple-100' },
    { id: 'su-02', name: 'Tuna Nigiri', price: 13000, color: 'border-l-8 border-purple-200' },
    { id: 'su-03', name: 'California Roll', price: 25000, color: 'border-l-8 border-purple-300' },
    { id: 'su-04', name: 'Dragon Roll', price: 32000, color: 'border-l-8 border-purple-400' },
    { id: 'su-05', name: 'Eel Nigiri', price: 15000, color: 'border-l-8 border-purple-100' },
    { id: 'su-06', name: 'Tempura Roll', price: 28000, color: 'border-l-8 border-purple-200' },
    { id: 'su-07', name: 'Spicy Tuna Roll', price: 26000, color: 'border-l-8 border-purple-300' },
    { id: 'su-08', name: 'Shrimp Nigiri', price: 11000, color: 'border-l-8 border-purple-100' },
    { id: 'su-09', name: 'Maki Roll', price: 20000, color: 'border-l-8 border-purple-200' },
    { id: 'su-10', name: 'Sashimi', price: 35000, color: 'border-l-8 border-purple-400' },
    { id: 'su-11', name: 'Rainbow Roll', price: 30000, color: 'border-l-8 border-purple-300' },
    { id: 'su-12', name: 'Philadelphia Roll', price: 27000, color: 'border-l-8 border-purple-200' },
    { id: 'su-13', name: 'Unagi Roll', price: 33000, color: 'border-l-8 border-purple-400' },
    { id: 'su-14', name: 'Crab Roll', price: 24000, color: 'border-l-8 border-purple-100' },
    { id: 'su-15', name: 'Avocado Roll', price: 18000, color: 'border-l-8 border-purple-200' },
  ],
  'main-course': [
    { id: 'mc-01', name: 'Grilled Chicken', price: 45000, color: 'border-l-8 border-pink-50' },
    { id: 'mc-02', name: 'Beef Steak', price: 65000, color: 'border-l-8 border-pink-100' },
    { id: 'mc-03', name: 'Fish & Chips', price: 38000, color: 'border-l-8 border-pink-200' },
    { id: 'mc-04', name: 'Roasted Lamb', price: 72000, color: 'border-l-8 border-pink-300' },
    { id: 'mc-05', name: 'Grilled Salmon', price: 55000, color: 'border-l-8 border-pink-100' },
    { id: 'mc-06', name: 'BBQ Ribs', price: 68000, color: 'border-l-8 border-pink-200' },
    { id: 'mc-07', name: 'Stir Fry Tofu', price: 30000, color: 'border-l-8 border-pink-50' },
  ],
  'desserts': [
    { id: 'd-01', name: 'Chocolate Cake', price: 25000, color: 'border-l-8 border-stone-100' },
    { id: 'd-02', name: 'Cheesecake', price: 28000, color: 'border-l-8 border-stone-200' },
    { id: 'd-03', name: 'Tiramisu', price: 30000, color: 'border-l-8 border-stone-300' },
    { id: 'd-04', name: 'Ice Cream', price: 15000, color: 'border-l-8 border-stone-100' },
    { id: 'd-05', name: 'Apple Pie', price: 22000, color: 'border-l-8 border-stone-200' },
    { id: 'd-06', name: 'Brownies', price: 20000, color: 'border-l-8 border-stone-300' },
    { id: 'd-07', name: 'Panna Cotta', price: 26000, color: 'border-l-8 border-stone-100' },
    { id: 'd-08', name: 'Mousse', price: 24000, color: 'border-l-8 border-stone-200' },
    { id: 'd-09', name: 'Crepe', price: 18000, color: 'border-l-8 border-stone-100' },
  ],
  'drinks': [
    { id: 'dr-01', name: 'Mineral Water', price: 5000, color: 'border-l-8 border-rose-100' },
    { id: 'dr-02', name: 'Orange Juice', price: 12000, color: 'border-l-8 border-rose-200' },
    { id: 'dr-03', name: 'Iced Tea', price: 8000, color: 'border-l-8 border-rose-300' },
    { id: 'dr-04', name: 'Lemonade', price: 10000, color: 'border-l-8 border-rose-100' },
    { id: 'dr-05', name: 'Soda', price: 7000, color: 'border-l-8 border-rose-200' },
    { id: 'dr-06', name: 'Milkshake', price: 18000, color: 'border-l-8 border-rose-300' },
    { id: 'dr-07', name: 'Smoothie', price: 22000, color: 'border-l-8 border-rose-400' },
    { id: 'dr-08', name: 'Coffee', price: 15000, color: 'border-l-8 border-rose-200' },
    { id: 'dr-09', name: 'Hot Chocolate', price: 16000, color: 'border-l-8 border-rose-300' },
    { id: 'dr-10', name: 'Matcha Latte', price: 20000, color: 'border-l-8 border-rose-100' },
    { id: 'dr-11', name: 'Coconut Water', price: 12000, color: 'border-l-8 border-rose-100' },
  ],
  'alcohol': [
    { id: 'al-01', name: 'Beer', price: 35000, color: 'border-l-8 border-green-100' },
    { id: 'al-02', name: 'Red Wine', price: 55000, color: 'border-l-8 border-green-200' },
    { id: 'al-03', name: 'White Wine', price: 50000, color: 'border-l-8 border-green-300' },
    { id: 'al-04', name: 'Cocktail', price: 45000, color: 'border-l-8 border-green-400' },
    { id: 'al-05', name: 'Whisky', price: 75000, color: 'border-l-8 border-green-200' },
    { id: 'al-06', name: 'Vodka', price: 65000, color: 'border-l-8 border-green-100' },
    { id: 'al-07', name: 'Mocktail', price: 30000, color: 'border-l-8 border-green-300' },
    { id: 'al-08', name: 'Sake', price: 60000, color: 'border-l-8 border-green-100' },
    { id: 'al-09', name: 'Champagne', price: 85000, color: 'border-l-8 border-green-200' },
    { id: 'al-10', name: 'Martini', price: 55000, color: 'border-l-8 border-green-400' },
    { id: 'al-11', name: 'Margarita', price: 40000, color: 'border-l-8 border-green-300' },
    { id: 'al-12', name: 'Rum', price: 58000, color: 'border-l-8 border-green-200' },
  ],
}

export function getProductsByCategory(categoryId: keyof typeof productMockData): Product[] {
  return productMockData[categoryId]
}

export function getProductById(id: string): Product | undefined {
  for (const products of Object.values(productMockData)) {
    const found = products.find(p => p.id === id)
    if (found)
      return found
  }
  return undefined
}
