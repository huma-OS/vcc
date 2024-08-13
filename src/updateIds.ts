import fs from 'fs';
import path from 'path';

interface Item {
  category: string;
  title: string;
  url?: string;
  imgUrl: string;
  id: number;
}

// Path to your JSON file
const filePath = path.join(__dirname, '../data/db.json');

// Check if the file exists
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

// Read the JSON file
const data: { items: Item[] } = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Function to update IDs
const updateIds = (items: Item[]): Item[] => {
  return items.map((item, index) => ({
    ...item,
    id: index + 1
  }));
};

// Function to insert new items at specific positions
const insertItems = (items: Item[], newItems: { item: Item, position: number }[]): Item[] => {
  newItems.forEach(({ item, position }) => {
    items.splice(position, 0, item);
  });
  return updateIds(items);
};

// New items to insert
const newItems = [
  {
    item: {
      category: "videography",
      title: "VIDEOGRAPHY",
      imgUrl: "/img/0907-MW-OD-ROW-02-L.jpeg",
      id: 0 // Placeholder, will be updated
    },
    position: 5
  },
  {
    item: {
      category: "art-direction-&-design",
      title: "ART DIRECTION & DESIGN",
      imgUrl: "/img/0907-MW-OD-ROW-02-L.jpeg",
      id: 0 // Placeholder, will be updated
    },
    position: 20
  }
  // Add more items as needed
];

// Insert the new items at their respective positions
data.items = insertItems(data.items, newItems);

// Write the updated data back to the JSON file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('IDs updated and new items inserted successfully!');

export {}; // Add this line to ensure the file is treated as a module