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

// IDs of items to delete
const idsToDelete = [0]; // List of IDs you want to delete

// Function to delete items by IDs
const deleteItems = (items: Item[], idsToDelete: number[]): Item[] => {
  return items.filter(item => !idsToDelete.includes(item.id));
};

// Delete the specified items
data.items = deleteItems(data.items, idsToDelete);

// Write the updated data back to the JSON file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('Items deleted successfully!');

export {}; // Add this line to ensure the file is treated as a module
