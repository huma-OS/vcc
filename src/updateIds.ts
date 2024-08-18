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
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-IMG-6548-2.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 16
  },
  {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-IMG-3921.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 17
  },
  {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograph-TF-shades.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 18
  },
    {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-2017-06-24-13-31-29.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 19
  },
  {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-IMG-5046.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 20
  },
  {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograph-blazonbanner3.png",
      id: 0 // Placeholder, will be updated
    },
    position: 21
  },
    {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-IMG-6500.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 22
  },
  {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-IMG-5343.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 23
  },
  {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photography-givenchy-mooncut.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 24
  },
    {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-2018-02-02-16-04-36.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 25
  },
  {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-2017-08-23-23-06-02.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 26
  },
  {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-IMG-7154.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 27
  },
    {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-File-07-12-2017-14-22-16.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 28
  },
  {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograph-le-bambino-jacquemus.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 29
  },
  {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-File-23-06-2017-01-34-35.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 30
  },
    {
    item: {
      "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-zipuphoody2.png",
      id: 0 // Placeholder, will be updated
    },
    position: 31
  },
  {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-GOPR0104.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 32
  },
   {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photography-loewe-sunglasses.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 33
  },
   {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograghy-2017-12-29-16-35-31.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 34
  },
   {
    item: {
     "category": "photography",
      "title": "PHOTOGRAPHY",
      imgUrl: "/img/photograph-valentino-garavani-small-leather-rockstud-shoulder-bag.jpg",
      id: 0 // Placeholder, will be updated
    },
    position: 35
  }

  // Add more items as needed
];

// Insert the new items at their respective positions
data.items = insertItems(data.items, newItems);

// Write the updated data back to the JSON file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('IDs updated and new items inserted successfully!');

export {}; // Add this line to ensure the file is treated as a module