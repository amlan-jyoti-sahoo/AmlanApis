const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use the hosting platform's port, or default to 3000 locally
// --- 1. SIMULATED DATABASE DATA ---
// A simple array to simulate a table of names (countries in this case)
const namesDatabase = [
    // --- Initial List Expansion (1-22) ---
    {
        id: 1,
        name: "Afghanistan",
        capital: "Kabul",
        color: "Black",
        national_food: "Kabuli Pulao",
        key_fact: "Home to the historic Buddhas of Bamiyan valley."
    },
    {
        id: 2,
        name: "Brazil",
        capital: "Brasília",
        color: "Green",
        national_food: "Feijoada",
        key_fact: "Houses most of the Amazon Rainforest."
    },
    {
        id: 3,
        name: "Canada",
        capital: "Ottawa",
        color: "Red",
        national_food: "Poutine",
        key_fact: "Has the longest coastline of any country in the world."
    },
    {
        id: 4,
        name: "Denmark",
        capital: "Copenhagen",
        color: "Red",
        national_food: "Smørrebrød",
        key_fact: "Known for the concept of 'Hygge' (coziness)."
    },
    {
        id: 5,
        name: "Egypt",
        capital: "Cairo",
        color: "Gold",
        national_food: "Koshari",
        key_fact: "Home to the Great Pyramid of Giza."
    },
    {
        id: 6,
        name: "France",
        capital: "Paris",
        color: "Blue",
        national_food: "Pot-au-feu",
        key_fact: "The Louvre Museum is the world's largest art museum."
    },
    {
        id: 7,
        name: "Germany",
        capital: "Berlin",
        color: "Black",
        national_food: "Sauerbraten",
        key_fact: "Home to the world-famous Oktoberfest festival."
    },
    {
        id: 8,
        name: "India",
        capital: "New Delhi",
        color: "Saffron",
        national_food: "Khichdi",
        key_fact: "Birthplace of four major world religions: Hinduism, Buddhism, Jainism, and Sikhism."
    },
    {
        id: 9,
        name: "Japan",
        capital: "Tokyo",
        color: "White",
        national_food: "Sushi",
        key_fact: "Consists of 6,852 islands, with four main ones."
    },
    {
        id: 10,
        name: "Kenya",
        capital: "Nairobi",
        color: "Green",
        national_food: "Ugali",
        key_fact: "A world leader in geothermal energy production."
    },
    {
        id: 11,
        name: "Lebanon",
        capital: "Beirut",
        color: "Red",
        national_food: "Kibbeh",
        key_fact: "The national flag features a stylized Cedar of Lebanon tree."
    },
    {
        id: 12,
        name: "Mexico",
        capital: "Mexico City",
        color: "Green",
        national_food: "Mole",
        key_fact: "The largest Spanish-speaking country by population."
    },
    {
        id: 13,
        name: "Norway",
        capital: "Oslo",
        color: "Blue",
        national_food: "Fårikål",
        key_fact: "Known for its stunning deep coastal fjords."
    },
    {
        id: 14,
        name: "Oman",
        capital: "Muscat",
        color: "White",
        national_food: "Shuwa",
        key_fact: "Home to the Wadi Shab, a popular gorge and oasis."
    },
    {
        id: 15,
        name: "Peru",
        capital: "Lima",
        color: "Red",
        national_food: "Ceviche",
        key_fact: "Location of the ancient Inca city of Machu Picchu."
    },
    {
        id: 16,
        name: "Qatar",
        capital: "Doha",
        color: "Maroon",
        national_food: "Machbūs",
        key_fact: "Was the first Middle Eastern nation to host the FIFA World Cup."
    },
    {
        id: 17,
        name: "Russia",
        capital: "Moscow",
        color: "White",
        national_food: "Borscht",
        key_fact: "Spans 11 different time zones."
    },
    {
        id: 18,
        name: "Spain",
        capital: "Madrid",
        color: "Yellow",
        national_food: "Paella",
        key_fact: "Famous for its traditional Flamenco dance and music."
    },
    {
        id: 19,
        name: "Thailand",
        capital: "Bangkok",
        color: "Red",
        national_food: "Pad Thai",
        key_fact: "Is the only Southeast Asian country never to have been colonized by a European power."
    },
    {
        id: 20,
        name: "Uganda",
        capital: "Kampala",
        color: "Yellow",
        national_food: "Matoke",
        key_fact: "Home to Bwindi Impenetrable Forest, a refuge for mountain gorillas."
    },
    {
        id: 21,
        name: "Vietnam",
        capital: "Hanoi",
        color: "Red",
        national_food: "Phở",
        key_fact: "Famous for the stunning limestone islands of Ha Long Bay."
    },
    {
        id: 22,
        name: "Yemen",
        capital: "Sana'a",
        color: "Black",
        national_food: "Saltah",
        key_fact: "Features ancient skyscrapers built from mud brick in Shibam."
    },
    // --- Added Countries (23-35) ---
    {
        id: 23,
        name: "Argentina",
        capital: "Buenos Aires",
        color: "Light Blue",
        national_food: "Asado",
        key_fact: "The tango dance originated in its capital city."
    },
    {
        id: 24,
        name: "Australia",
        capital: "Canberra",
        color: "Green",
        national_food: "Meat Pie",
        key_fact: "The Great Barrier Reef is the world's largest coral reef system."
    },
    {
        id: 25,
        name: "China",
        capital: "Beijing",
        color: "Red",
        national_food: "Peking Duck",
        key_fact: "Home to the largest structure ever built, the Great Wall."
    },
    {
        id: 26,
        name: "Italy",
        capital: "Rome",
        color: "Green",
        national_food: "Pasta",
        key_fact: "Features the Colosseum, the largest ancient amphitheater ever built."
    },
    {
        id: 27,
        name: "New Zealand",
        capital: "Wellington",
        color: "Black",
        national_food: "Hāngi",
        key_fact: "The first country in the world to grant women the right to vote (1893)."
    },
    {
        id: 28,
        name: "Nigeria",
        capital: "Abuja",
        color: "Green",
        national_food: "Jollof Rice",
        key_fact: "Africa's largest economy and most populous nation."
    },
    {
        id: 29,
        name: "Portugal",
        capital: "Lisbon",
        color: "Green",
        national_food: "Bacalhau",
        key_fact: "Has the oldest continuously running border in Europe (with Spain)."
    },
    {
        id: 30,
        name: "South Korea",
        capital: "Seoul",
        color: "White",
        national_food: "Kimchi",
        key_fact: "A global leader in technology and internet connectivity."
    },
    {
        id: 31,
        name: "Sweden",
        capital: "Stockholm",
        color: "Blue",
        national_food: "Köttbullar (Meatballs)",
        key_fact: "Home to the Nobel Prize and the original Icehotel."
    },
    {
        id: 32,
        name: "South Africa",
        capital: "Pretoria (Exec.), Cape Town (Legis.), Bloemfontein (Judic.)",
        color: "Gold",
        national_food: "Biltong",
        key_fact: "The only country in the world with three capital cities."
    },
    {
        id: 33,
        name: "United Kingdom",
        capital: "London",
        color: "Red",
        national_food: "Fish and Chips",
        key_fact: "Features Stonehenge, a prehistoric monument dating back to 3000 BC."
    },
    {
        id: 34,
        name: "United States",
        capital: "Washington, D.C.",
        color: "Red, White, and Blue",
        national_food: "Hamburger",
        key_fact: "Contains 50 states and is the world's third-largest country by area."
    },
    {
        id: 35,
        name: "Venezuela",
        capital: "Caracas",
        color: "Yellow",
        national_food: "Pabellón criollo",
        key_fact: "Home to Angel Falls, the world's highest uninterrupted waterfall."
    }
];
const TOTAL_COUNT = namesDatabase.length;

// --- 2. API ENDPOINT WITH PAGINATION LOGIC ---
app.get('/names', (req, res) => {
    // 3. Extract and Sanitize Parameters
    // Parse query parameters, defaulting to 20 for limit and 0 for offset
    const defaultLimit = 5;
    const defaultOffset = 0;

    // Use parseInt() to ensure they are treated as numbers
    let limit = parseInt(req.query.limit) || defaultLimit;
    let offset = parseInt(req.query.offset) || defaultOffset;

    // Optional: Add bounds checks
    if (limit <= 0) {
        return res.status(400).json({ error: "Limit must be positive" });
    } 
    if(offset < 0) {
        return res.status(400).json({ error: "Provide a correct offset. It should be non-negative." });
    }
    
    // Cap limit to prevent fetching too much data at once
    limit = Math.min(limit, 100); 

    // --- 4. Apply Pagination Logic (Simulating SQL LIMIT/OFFSET) ---
    // JavaScript Array.slice(start, end)
    const startIndex = offset;
    const endIndex = offset + limit;

    const paginatedNames = namesDatabase.slice(startIndex, endIndex);

    // --- 5. Construct and Send Response ---
    const response = {
        meta: {
            total_count: TOTAL_COUNT,
            limit: limit,
            offset: offset,
            // You could also calculate next/prev URLs here
        },
        data: paginatedNames,
    };

    res.status(200).json(response);
});

// --- 6. START THE SERVER ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/names?offset=0&limit=5`);
});