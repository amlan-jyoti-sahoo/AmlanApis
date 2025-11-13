// --- 1. IMPORTS & SETUP ---
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes (important for Snack / web)
app.use(cors());

const PORT = process.env.PORT || 3000;

// --- 2. SIMULATED DATABASE DATA ---
const namesDatabase =[
    { id: 1, name: "Afghanistan", capital: "Kabul", color: "#000000", national_food: "Kabuli Pulao", key_fact: "Home to the historic Buddhas of Bamiyan valley." },
    { id: 2, name: "Brazil", capital: "Brasília", color: "#009739", national_food: "Feijoada", key_fact: "Houses most of the Amazon Rainforest." },
    { id: 3, name: "Canada", capital: "Ottawa", color: "#FF0000", national_food: "Poutine", key_fact: "Has the longest coastline in the world." },
    { id: 4, name: "Denmark", capital: "Copenhagen", color: "#C60C30", national_food: "Smørrebrød", key_fact: "Known for the concept of 'Hygge' (coziness)." },
    { id: 5, name: "Egypt", capital: "Cairo", color: "#FFD700", national_food: "Koshari", key_fact: "Home to the Great Pyramid of Giza." },
    { id: 6, name: "France", capital: "Paris", color: "#0055A4", national_food: "Baguette", key_fact: "Has the Eiffel Tower and is known for art and wine." },
    { id: 7, name: "Germany", capital: "Berlin", color: "#000000", national_food: "Sauerbraten", key_fact: "Famous for engineering and Oktoberfest." },
    { id: 8, name: "India", capital: "New Delhi", color: "#FF9933", national_food: "Biryani", key_fact: "Home to the Taj Mahal and diverse cultures." },
    { id: 9, name: "Japan", capital: "Tokyo", color: "#BC002D", national_food: "Sushi", key_fact: "Land of the Rising Sun." },
    { id: 10, name: "Kenya", capital: "Nairobi", color: "#006400", national_food: "Ugali", key_fact: "Famous for wildlife safaris." },
    { id: 11, name: "Mexico", capital: "Mexico City", color: "#006847", national_food: "Tacos", key_fact: "Home of Aztec and Mayan civilizations." },
    { id: 12, name: "Nepal", capital: "Kathmandu", color: "#DC143C", national_food: "Dal Bhat", key_fact: "Home to Mount Everest." },
    { id: 13, name: "Nigeria", capital: "Abuja", color: "#008751", national_food: "Jollof Rice", key_fact: "Most populous country in Africa." },
    { id: 14, name: "Norway", capital: "Oslo", color: "#BA0C2F", national_food: "Fårikål", key_fact: "Land of fjords and Northern Lights." },
    { id: 15, name: "Pakistan", capital: "Islamabad", color: "#01411C", national_food: "Nihari", key_fact: "Hosts one of the highest paved roads in the world." },
    { id: 16, name: "Russia", capital: "Moscow", color: "#0033A0", national_food: "Borscht", key_fact: "Largest country by area." },
    { id: 17, name: "Singapore", capital: "Singapore", color: "#ED2939", national_food: "Hainanese Chicken Rice", key_fact: "A city-state known for cleanliness." },
    { id: 18, name: "South Africa", capital: "Pretoria", color: "#007847", national_food: "Biltong", key_fact: "Has three capitals and 11 official languages." },
    { id: 19, name: "South Korea", capital: "Seoul", color: "#003478", national_food: "Kimchi", key_fact: "Known for K-pop and advanced technology." },
    { id: 20, name: "Spain", capital: "Madrid", color: "#AA151B", national_food: "Paella", key_fact: "Home to flamenco and vibrant culture." },
    { id: 21, name: "Sri Lanka", capital: "Colombo", color: "#FFB300", national_food: "Rice and Curry", key_fact: "Known as the Pearl of the Indian Ocean." },
    { id: 22, name: "Sweden", capital: "Stockholm", color: "#005BAA", national_food: "Köttbullar", key_fact: "Famous for innovation and IKEA." },
    { id: 23, name: "Switzerland", capital: "Bern", color: "#FF0000", national_food: "Fondue", key_fact: "Known for chocolate and neutrality." },
    { id: 24, name: "Thailand", capital: "Bangkok", color: "#A51931", national_food: "Pad Thai", key_fact: "Land of Smiles." },
    { id: 25, name: "Turkey", capital: "Ankara", color: "#E30A17", national_food: "Kebab", key_fact: "Straddles two continents: Asia and Europe." },
    { id: 26, name: "United Kingdom", capital: "London", color: "#00247D", national_food: "Fish and Chips", key_fact: "Has a constitutional monarchy." },
    { id: 27, name: "United States", capital: "Washington D.C.", color: "#B22234", national_food: "Hamburger", key_fact: "World's largest economy." },
    { id: 28, name: "Vietnam", capital: "Hanoi", color: "#DA251D", national_food: "Phở", key_fact: "Known for its rice terraces and coffee." },
    { id: 29, name: "Italy", capital: "Rome", color: "#008C45", national_food: "Pizza", key_fact: "Home of the Roman Empire and Colosseum." },
    { id: 30, name: "Indonesia", capital: "Jakarta", color: "#CE1126", national_food: "Nasi Goreng", key_fact: "World's largest island country." },
    { id: 31, name: "Bangladesh", capital: "Dhaka", color: "#006A4E", national_food: "Hilsa Fish Curry", key_fact: "World's 8th most populous country." },
    { id: 32, name: "Argentina", capital: "Buenos Aires", color: "#75AADB", national_food: "Asado", key_fact: "Home to tango and Patagonia." },
    { id: 33, name: "Australia", capital: "Canberra", color: "#FFCD00", national_food: "Meat Pie", key_fact: "Has more kangaroos than people." },
    { id: 34, name: "China", capital: "Beijing", color: "#DE2910", national_food: "Peking Duck", key_fact: "World's most populous country." },
    { id: 35, name: "Greece", capital: "Athens", color: "#0D5EAF", national_food: "Moussaka", key_fact: "Birthplace of democracy." }
  ];

const TOTAL_COUNT = namesDatabase.length;

// --- 3. PAGINATED API ENDPOINT ---
app.get('/names', (req, res) => {
  const defaultLimit = 5;
  const defaultOffset = 0;

  let limit = parseInt(req.query.limit) || defaultLimit;
  let offset = parseInt(req.query.offset) || defaultOffset;

  if (limit <= 0) {
    return res.status(400).json({ error: "Limit must be positive" });
  }
  if (offset < 0) {
    return res.status(400).json({ error: "Offset must be non-negative" });
  }

  limit = Math.min(limit, 100);

  const paginatedNames = namesDatabase.slice(offset, offset + limit);

  res.status(200).json({
    meta: {
      total_count: TOTAL_COUNT,
      limit,
      offset,
      next_offset: offset + limit < TOTAL_COUNT ? offset + limit : null,
      prev_offset: offset - limit >= 0 ? offset - limit : null,
    },
    data: paginatedNames,
  });
});

// --- 4. START SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`👉 Try: http://localhost:${PORT}/names?offset=0&limit=5`);
});
