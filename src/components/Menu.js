import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import './Menu.css';

const menuData = {
  Appetizers: {
    subcategories: [
      {
        title: 'Vegetarian',
        items: [
          { name: 'Golgappe (Dahi Puri)', price: 8, description: 'Crispy puris filled with spiced potatoes and chickpeas, topped with creamy yogurt, tangy chutneys, and fresh herbs', tags: ['V'] },
          { name: 'Aloo Papdi Chaat', price: 8, description: 'Crispy papdi topped with spiced potatoes, chickpeas, creamy yogurt, tangy tamarind, mint chutneys, and fresh herbs', tags: ['V'] },
          { name: 'Vegetable Samosa (2 Pcs)', price: 6, description: 'Crispy golden pastry filled with spiced potatoes and green peas', tags: ['V'] },
          { name: 'Samosa Chaat', price: 8, description: 'Crushed vegetable samosas topped with creamy yogurt, tangy chutneys, and fresh herbs', tags: ['V'] },
          { name: 'Samosa with Chole', price: 10, description: 'Crispy vegetable samosas served with spiced chickpea curry, tangy chutneys, and fresh herbs', tags: ['V'] },
          { name: 'Onion Pakoras', price: 6, description: 'Crispy chickpea-battered onion fritters, lightly spiced. Served with mint and tamarind chutney', tags: ['V'] },
          { name: 'Vegetable Pakoras', price: 6, description: 'Crispy assorted vegetables dipped in spiced chickpea batter and fried to golden perfection', tags: ['V'] },
          { name: 'Paneer Pakoras', price: 12, description: 'Soft paneer slices dipped in spiced chickpea batter and fried until golden and crisp', tags: ['V'] },
          { name: 'Masala Loaded Fries', price: 10, description: 'Crispy fries topped with cheese, diced onions, tomatoes, jalapenos, and fresh herbs', tags: ['V'] },
          { name: 'Aloo Tikki Chaat', price: 8, description: 'Crispy potato patties topped with spiced chickpeas, creamy yogurt, tangy chutneys, and fresh herbs', tags: ['V'] },
          { name: 'Aloo Tikki with Chole', price: 10, description: 'Crispy potato patties served with spiced chickpea curry, tangy chutneys, and fresh herbs', tags: ['V'] },
          { name: 'Mushroom Galouti Kebab', price: 12, description: 'Awadhi-style kebab of finely minced mushrooms, slow-cooked with aromatic spices', tags: ['V'] },
          { name: 'Mix Vegetarian Platter', price: 14, description: 'A flavorful assortment of pakora, samosa, paneer pakora, onion bhaji, and papad, served hot', tags: ['V'] },
        ],
      },
      {
        title: 'Non-Vegetarian',
        items: [
          { name: 'Chicken 65', price: 14, description: 'Crispy fried chicken tossed with bold South Indian spices, curry leaves, and a hint of heat', tags: ['S'] },
          { name: 'Amritsari Fish Pakoras', price: 15, description: 'Tender fish fillets coated in spiced chickpea batter and fried until crisp and golden', tags: [] },
          { name: 'Non-Vegetarian Platter', price: 16, description: 'A hearty assortment of chicken tikka, seekh kebab, samosa, pakora, onion pakora, and papad', tags: [] },
        ],
      },
    ],
  },
  'Tandoori Grill': {
    subcategories: [
      {
        title: '',
        items: [
          { name: 'Chicken Tandoori (4 Pcs) Bone-In', price: 16, description: 'Classic yogurt-marinated chicken roasted in tandoori spices for a smoky and charred finish', tags: [] },
          { name: 'Chicken Tikka', price: 18, description: 'Tender white-meat chicken chunks marinated in yogurt, aromatic spices, and citrus juices, roasted in our clay oven', tags: [] },
          { name: 'Chicken Malai Tikka', price: 18, description: 'Succulent chicken pieces marinated with cashew paste, cream, cheese, and mild spices, roasted in our clay oven', tags: [] },
          { name: 'Paneer Tikka', price: 15, description: 'Soft paneer cubes marinated in yogurt and aromatic spices, then roasted in our clay oven', tags: ['V'] },
          { name: 'Lamb Seekh Kebab', price: 19, description: 'Juicy minced lamb blended with herbs and aromatic spices, roasted in our clay oven', tags: [] },
          { name: 'Lamb Tikka', price: 19, description: 'Tender lamb cubes marinated in yogurt, aromatic spices, and citrus, then roasted in our clay oven', tags: [] },
          { name: 'Fish Tikka', price: 21, description: 'Delicate fish pieces marinated in yogurt, aromatic spices, and citrus, then roasted in our clay oven', tags: [] },
          { name: 'Saffron Tandoori Shrimp', price: 22, description: 'Jumbo shrimp marinated with saffron, yogurt, and aromatic spices, then roasted in our clay oven for a delicate, smoky finish', tags: [] },
          { name: 'Nawabi Lamb Chops', price: 32, description: 'Succulent lamb chops marinated in royal spices and herbs, then grilled to a smoky, tender finish', tags: [] },
          { name: 'Mix Tandoori Platter', price: 24, description: 'Indulgent selection of chicken tikka, lamb tikka, seekh kebab, shrimp tandoori, and chicken tandoori', tags: [] },
        ],
      },
    ],
  },
  Entrées: {
    subcategories: [
      {
        title: 'Vegetable',
        items: [
          { name: 'Mixed Vegetable', price: 15, description: 'Medley of seasonal vegetables gently cooked with aromatic spices', tags: ['V'] },
          { name: 'Malai Kofta', price: 16, description: 'Delicate paneer and potato koftas simmered in a velvety tomato-cashew cream sauce', tags: ['V'] },
          { name: 'Mushroom Matar', price: 16, description: 'Fresh mushrooms and green peas cooked in a mildly spiced tomato gravy', tags: ['V'] },
          { name: 'Aloo Matar', price: 15, description: 'Punjabi style spiced potatoes with green peas in a light masala gravy', tags: ['V'] },
          { name: 'Navratan Korma', price: 16, description: 'Assorted vegetables in a mild savory cashew cream sauce', tags: ['V'] },
          { name: 'Aloo Gobhi', price: 15, description: 'Stir-fry potatoes and cauliflower, flavored with aromatic Indian spices', tags: ['V'] },
          { name: 'Methi Matar Malai', price: 16, description: 'Fresh fenugreek and peas in a creamy, aromatic curry', tags: ['V'] },
          { name: 'Baigan Bhartha', price: 16, description: 'Fire-roasted eggplant blended with tomatoes, onions, and light cream', tags: ['V'] },
          { name: 'Bhindi Masala', price: 16, description: 'Fresh and crisp okra cooked with onions, tomatoes and traditional spices', tags: ['V'] },
          { name: 'Aloo Saag', price: 15, description: 'Tender potatoes folded into spiced, lightly creamed spinach', tags: ['V'] },
        ],
      },
      {
        title: 'Paneer',
        items: [
          { name: 'Shahi Paneer', price: 17, description: 'Soft paneer cubes in a rich, mildly spiced cashew-cream gravy', tags: ['V'] },
          { name: 'Paneer Tikka Masala', price: 17, description: 'Char-grilled paneer cubes simmered in a rich, spiced tomato gravy', tags: ['V'] },
          { name: 'Paneer Makhni', price: 16, description: 'Tender paneer cubes in a velvety tomato butter sauce', tags: ['V'] },
          { name: 'Karahi Paneer', price: 16, description: 'Paneer sautéed with peppers, onions, and tomatoes in a bold, rustic masala', tags: ['V'] },
          { name: 'Paneer Bhurji', price: 16, description: 'Hand-crumbled paneer cooked street-style with spices, herbs, and slow-sautéed aromatics', tags: ['V'] },
          { name: 'Matar Paneer', price: 16, description: 'Green peas and soft paneer simmered in a rich, spiced tomato gravy', tags: ['V'] },
          { name: 'Palak Paneer', price: 16, description: 'Tender paneer in a slow cooked silky, spiced and lightly creamed spinach purée', tags: ['V'] },
        ],
      },
      {
        title: 'Dal',
        items: [
          { name: 'Chana Masala', price: 15, description: 'Slow-simmered chickpeas layered with tang, spice, and warmth', tags: ['V'] },
          { name: 'Dal Makhani', price: 15, description: 'Black lentils slow-cooked to a rich, buttery depth', tags: ['V'] },
          { name: 'Dal Tadka', price: 15, description: 'Comforting slow-cooked yellow lentils finished with sizzling cumin, garlic, and ghee', tags: ['V'] },
        ],
      },
      {
        title: 'Chicken',
        items: [
          { name: 'Chicken Tikka Masala', price: 19, description: 'Boneless chicken roasted in the clay oven, finished in our signature masala sauce', tags: [] },
          { name: 'Butter Chicken', price: 19, description: 'Shredded chicken in a velvety tomato-butter cream, finished with fenugreek and butter', tags: [] },
          { name: 'Chicken Korma', price: 18, description: 'Tender chicken simmered in a rich, mildly spiced cashew and cream-based gravy', tags: [] },
          { name: 'Punjabi Chicken Curry', price: 17, description: 'Dhaba-style chicken simmered low and slow in a bold Punjabi gravy', tags: ['S'] },
          { name: 'Karahi Chicken', price: 18, description: 'Boneless chicken sautéed with peppers, onions, and tomatoes in a bold, rustic masala', tags: [] },
          { name: 'Mango Chicken', price: 18, description: 'Sweet-tangy mango balanced with warm spices and tender boneless chicken', tags: [] },
          { name: 'Chicken Vindaloo', price: 18, description: 'Fiery, tangy boneless chicken and potatoes cooked in a sharp, chili-vinegar masala', tags: ['S'] },
          { name: 'Chicken Saag', price: 18, description: 'Tender boneless chicken in a slow cooked silky, spiced and lightly creamed spinach purée', tags: [] },
        ],
      },
      {
        title: 'Lamb',
        items: [
          { name: 'Lamb Tikka Masala', price: 21, description: 'Clay-oven charred lamb finished in our savory signature masala sauce', tags: [] },
          { name: 'Lamb Korma', price: 21, description: 'Gently simmered boneless lamb with mild cashew cream sauce and aromatic spices', tags: [] },
          { name: 'Lamb Curry', price: 19, description: 'Lamb (boneless) braised low and slow with onions, tomatoes, and warming spices', tags: [] },
          { name: 'Karahi Lamb', price: 20, description: 'Boneless lamb sautéed with peppers, onions, and tomatoes in a bold, rustic masala', tags: [] },
          { name: 'Lamb Bhunā', price: 20, description: "Slow-seared lamb cooked down with concentrated spices and caramelized onions. Chef's choice", tags: [] },
          { name: 'Lamb Vindaloo', price: 19, description: 'Fiery, tangy boneless slow cooked lamb and potatoes in a sharp, chili-vinegar masala', tags: ['S'] },
          { name: 'Lamb Saag', price: 19, description: 'Boneless lamb simmered gently in a velvety spinach purée with subtle spice', tags: [] },
          { name: 'Lamb Rogan Josh', price: 19, description: 'Tender lamb simmered in a rich, aromatic yogurt-based curry infused with Kashmiri chilies', tags: ['S'] },
        ],
      },
      {
        title: 'Goat',
        items: [
          { name: 'Goat Curry', price: 21, description: 'Tender goat slow-simmered in a rich, spiced onion-tomato gravy', tags: [] },
          { name: 'Goat Bhunna', price: 22, description: 'Slow-cooked goat sautéed in a thick, roasted masala with bold, aromatic spices', tags: [] },
        ],
      },
      {
        title: 'Seafood',
        items: [
          { name: 'Shrimp Coconut Curry', price: 22, description: 'Kerala Style, succulent jumbo shrimps simmered in a fragrant coconut curry with gentle spice', tags: [] },
          { name: 'Shrimp Tikka Masala', price: 23, description: 'Tandoor-roasted jumbo shrimp finished in our savory and buttery signature masala sauce', tags: [] },
          { name: 'Shrimp Curry', price: 22, description: 'Plump jumbo shrimp gently simmered in a deeply aromatic, spice-layered curry', tags: [] },
          { name: 'Fish Curry', price: 22, description: 'Fresh fish gently simmered in a deeply aromatic, spice-layered curry', tags: [] },
        ],
      },
    ],
  },
  'Indo Chinese': {
    subcategories: [
      {
        title: '',
        items: [
          { name: 'Cigar Spring Rolls', price: 10, description: 'Crispy, golden cigar-shaped rolls filled with a savory vegetable stuffing', tags: ['V'] },
          { name: 'Honey Chilli Potato', price: 10, description: 'Crispy fried potatoes tossed in a sweet and spicy honey-chili glaze with garlic and peppers', tags: ['V', 'S'] },
          { name: 'Chilli Paneer', price: 15, description: 'Crispy paneer cubes tossed in a spicy Indo-Chinese chili sauce with onion and bell pepper', tags: ['V', 'S'] },
          { name: 'Vegetarian Manchurian', price: 15, description: 'Crispy vegetable dumplings tossed in a bold Indo-Chinese garlic-chili sauce with peppers and scallions', tags: ['V'] },
          { name: 'Gobhi Manchurian', price: 15, description: 'Crispy cauliflower florets tossed in a bold Indo-Chinese garlic-chili sauce', tags: ['V'] },
          { name: 'Vegetable Hakka Noodles', price: 13, description: 'Wok-tossed noodles with fresh vegetables, garlic, soy, and bold street-style flavors. Add Chicken $3', tags: ['V'] },
          { name: 'Vegetable Fried Rice', price: 13, description: 'Wok-tossed rice with fresh vegetables, garlic, and savory Indo-Chinese seasonings. Add Chicken $3', tags: ['V'] },
          { name: 'Chilli Chicken', price: 15, description: 'Crispy chicken pieces tossed in a spicy Indo-Chinese chili sauce with garlic, onions, and bell peppers', tags: ['S'] },
        ],
      },
    ],
  },
  'Street Eats': {
    subcategories: [
      {
        title: '',
        items: [
          { name: 'Punjabi Chole Bhature', price: 17, description: 'Fluffy fried bhature served with slow-cooked spiced chickpea curry, onions, and pickles', tags: ['V'] },
          { name: 'Chole Puri', price: 15, description: 'Soft fried puris served with slow-cooked spiced chickpea curry, onions, and pickles', tags: ['V'] },
          { name: 'Plain Dosa', price: 12, description: 'South Indian rice-lentil crepe, lightly golden and served with traditional sambar and chutneys. Add Paneer $4', tags: ['V'] },
          { name: 'Masala Dosa', price: 15, description: 'South Indian rice-lentil crepe filled with spiced potato masala, served with sambar and chutneys', tags: ['V'] },
        ],
      },
    ],
  },
  'Breads & Rice': {
    subcategories: [
      {
        title: 'Naan Breads',
        items: [
          { name: 'Plain Naan', price: 4, description: 'Leavened white bread baked fresh in clay oven', tags: ['V'] },
          { name: 'Garlic Naan', price: 5, description: 'Leavened white bread topped with garlic & cilantro baked to order in the clay oven', tags: ['V'] },
          { name: 'Green Chili Naan', price: 5, description: 'Naan baked with fresh green chilies for gentle heat', tags: ['V', 'S'] },
          { name: 'Cheese Naan', price: 5, description: 'Naan stuffed with melted cheese', tags: ['V'] },
        ],
      },
      {
        title: 'Kulchas',
        items: [
          { name: 'Onion Kulcha', price: 5, description: 'Naan bread stuffed with diced onions & spices', tags: ['V'] },
          { name: 'Paneer Kulcha', price: 5, description: 'Naan stuffed with Indian cheese & spice', tags: ['V'] },
          { name: 'Peshawari Kulcha', price: 6, description: 'Naan stuffed with nuts & raisins', tags: ['V'] },
          { name: 'Keema Kulcha', price: 6, description: 'Naan stuffed with minced lamb and spices', tags: [] },
        ],
      },
      {
        title: 'Parathas & Rotis',
        items: [
          { name: 'Aloo Paratha', price: 5, description: 'Whole wheat flat bread stuffed with potatoes & spices, baked fresh in our clay oven', tags: ['V'] },
          { name: 'Lachha Paratha', price: 5, description: 'Whole wheat multi-layered bread baked fresh in clay oven and topped with butter', tags: ['V'] },
          { name: 'Tandoori Roti', price: 4, description: 'Whole wheat flat bread baked in tandoor oven', tags: ['V'] },
          { name: 'Tawa Roti', price: 3, description: 'Whole wheat flat bread on griddle', tags: ['V'] },
          { name: 'Bhatura', price: 3, description: 'Soft, puffed bread, deep-fried to golden perfection', tags: ['V'] },
          { name: 'Puri', price: 3, description: 'Crisp, puffed whole wheat bread', tags: ['V'] },
          { name: 'Bread Sampler', price: 14, description: 'Choose one Kulcha, One Parantha, and One Naan', tags: [] },
        ],
      },
      {
        title: 'Rice & Biryani',
        items: [
          { name: 'Basmati Rice', price: 4, description: 'Steamed basmati rice', tags: ['V'] },
          { name: 'Peas Rice', price: 8, description: 'Basmati rice with green peas', tags: ['V'] },
          { name: 'Saffron Rice', price: 6, description: 'Aromatic saffron-infused basmati rice', tags: ['V'] },
          { name: 'Veg Biryani', price: 15, description: 'Aromatic basmati rice cooked with mixed vegetable, infused with traditional spice', tags: ['V'] },
          { name: 'Chicken Biryani', price: 17, description: 'Aromatic basmati rice layered with tender chicken, finished with fried onions and herbs. Saffron Special', tags: [] },
          { name: 'Lamb Biryani', price: 18, description: 'Fragrant basmati rice layered with tender lamb, slow-steamed with aromatic spices', tags: [] },
          { name: 'Goat Biryani', price: 19, description: 'Slow-steamed bone-in goat biryani with rich aroma, layered spices and fried onions', tags: [] },
          { name: 'Shrimp Biryani', price: 21, description: 'Fragrant basmati rice layered with tender shrimp, aromatic spices, and slow-cooked to a flavorful finish', tags: [] },
        ],
      },
    ],
  },
  Drinks: {
    subcategories: [
      {
        title: 'Lassi',
        items: [
          { name: 'Mango Lassi', price: 6, description: 'Traditional yogurt drink blended with mango', tags: ['V'] },
          { name: 'Regular Lassi (Sweet/Salted)', price: 5, description: 'Classic yogurt drink, sweet or salted', tags: ['V'] },
          { name: 'Rose Lassi', price: 6, description: 'Yogurt drink infused with rose', tags: ['V'] },
          { name: 'Strawberry Lassi', price: 6, description: 'Yogurt drink blended with strawberry', tags: ['V'] },
        ],
      },
      {
        title: 'Shakes',
        items: [
          { name: 'Mango Shake', price: 6, description: '', tags: [] },
          { name: 'Chocolate Shake', price: 6, description: '', tags: [] },
          { name: 'Badam (Almond) Shake', price: 6, description: '', tags: [] },
          { name: 'Vanilla Shake', price: 6, description: '', tags: [] },
          { name: 'Strawberry Shake', price: 6, description: '', tags: [] },
        ],
      },
      {
        title: 'Coffee & Tea',
        items: [
          { name: 'Hot Coffee', price: 3, description: '', tags: [] },
          { name: 'Latte (Hot/Cold)', price: 5, description: 'Vanilla, Caramel, or Cinnamon', tags: [] },
          { name: 'Black Tea', price: 3, description: '', tags: [] },
          { name: 'Masala Tea', price: 4, description: 'Traditional spiced Indian tea', tags: [] },
          { name: 'Bombay Iced Tea', price: 4, description: '', tags: [] },
        ],
      },
      {
        title: 'Juices',
        items: [
          { name: 'Orange Juice', price: 5, description: '', tags: [] },
          { name: 'Apple Juice', price: 5, description: '', tags: [] },
          { name: 'Mango Juice', price: 5, description: '', tags: [] },
          { name: 'Cranberry Juice', price: 5, description: '', tags: [] },
        ],
      },
      {
        title: 'Soups & Salad',
        items: [
          { name: 'Dal Shorba (Lentil Soup)', price: 5, description: 'Traditional Indian soup made with lentils and vegetables', tags: ['V'] },
          { name: 'Mango Corn Soup', price: 6, description: 'Lightly spiced sweet-corn soup infused with ripe mango for a refreshing sweet-savory twist', tags: ['V'] },
          { name: 'Chicken Soup', price: 7, description: 'Slow-simmered broth with tender chicken, lentils, herbs, and spices', tags: [] },
          { name: 'Manchow Soup', price: 6, description: 'Mixed vegetables, garlic, soy, ground pepper, and ginger, finished with a spicy kick and crispy noodles. Add Chicken $2', tags: ['V'] },
          { name: 'Chana Kachumber Salad', price: 8, description: 'Refreshing mix of spiced chickpeas, cucumber, tomato, red onion, herbs, and roasted cashews, finished with fresh lime', tags: ['V'] },
          { name: 'Fresh Garden Salad', price: 6, description: 'Crisp seasonal vegetables tossed with chaat masala and fresh cilantro, served with lemon on the side', tags: ['V'] },
        ],
      },
    ],
  },
  Bar: {
    subcategories: [
      {
        title: 'Signature Cocktails',
        items: [
          { name: 'Spiced Masala Mojito', price: 12, description: '', tags: [] },
          { name: 'Ginger Turmeric Mule', price: 12, description: '', tags: [] },
          { name: 'Tamarind Whiskey Sour', price: 13, description: '', tags: [] },
          { name: 'Mango Chili Margarita', price: 13, description: '', tags: [] },
        ],
      },
      {
        title: 'Classic Cocktails',
        items: [
          { name: 'Bloody Mary', price: 11, description: '', tags: [] },
          { name: 'Old Fashioned', price: 12, description: '', tags: [] },
          { name: 'Espresso Martini', price: 13, description: '', tags: [] },
          { name: 'Long Island', price: 13, description: '', tags: [] },
          { name: 'Moscow Mule', price: 11, description: '', tags: [] },
          { name: 'Dirty Martini', price: 11, description: '', tags: [] },
        ],
      },
      {
        title: 'Mocktails',
        items: [
          { name: 'Pineapple Coconut Refresher', price: 8, description: '', tags: [] },
          { name: "Rosé Lychee Sparkler", price: 8, description: '', tags: [] },
          { name: 'Orange Cardamom Spritz', price: 8, description: '', tags: [] },
          { name: 'Spicy Mango Cooler', price: 8, description: '', tags: [] },
          { name: 'Fresh Lime Soda', price: 7, description: '', tags: [] },
        ],
      },
      {
        title: 'Wine (by the Glass)',
        items: [
          { name: 'House Wine', price: 7, description: 'Chardonnay, Pinot Grigio, Sauvignon Blanc, Rosé, Cabernet Sauvignon, Merlot, Pinot Noir, Zinfandel, Champagne', tags: [] },
          { name: 'Woodbridge Chardonnay', price: 9, description: 'Glass $9 / Bottle $27', tags: [] },
          { name: 'Woodbridge Pinot Grigio', price: 9, description: 'Glass $9 / Bottle $27', tags: [] },
          { name: 'Laplaya Sauvignon Blanc', price: 9, description: 'Glass $9 / Bottle $27', tags: [] },
          { name: 'Chateau Ste Michelle Riesling', price: 9, description: 'Glass $9 / Bottle $27', tags: [] },
          { name: 'Woodbridge Merlot', price: 9, description: 'Glass $9 / Bottle $27', tags: [] },
          { name: 'Robert Mondavi Cabernet', price: 9, description: 'Glass $9 / Bottle $27', tags: [] },
          { name: 'Mont Pellier Pinot Noir', price: 9, description: 'Glass $9 / Bottle $33', tags: [] },
          { name: 'Stella Rosa Rosé', price: 8, description: 'Glass $8 / Bottle $27', tags: [] },
          { name: 'Prosecco', price: 8, description: 'Glass $8 / Bottle $27', tags: [] },
          { name: 'Korbel Brut', price: null, description: 'Bottle $32', tags: [] },
        ],
      },
      {
        title: 'Beer',
        items: [
          { name: 'Bud Light', price: 5, description: '12oz bottle', tags: [] },
          { name: 'Stella Artois', price: 6, description: '12oz bottle', tags: [] },
          { name: 'Corona Premier / Extra', price: 6, description: '12oz bottle', tags: [] },
          { name: 'Heineken', price: 6, description: '12oz bottle', tags: [] },
          { name: 'Modelo', price: 6, description: '12oz bottle', tags: [] },
          { name: 'Michelob Ultra', price: 6, description: '12oz bottle / 16oz draft $6 / 22oz draft $7', tags: [] },
          { name: 'Blue Moon', price: 6, description: '16oz draft $6 / 22oz draft $7', tags: [] },
          { name: 'Mind Haze IPA', price: 6, description: '16oz draft $6 / 22oz draft $7', tags: [] },
          { name: '805', price: 6, description: '16oz draft $6 / 22oz draft $7', tags: [] },
        ],
      },
      {
        title: 'Indian Beer',
        items: [
          { name: 'Taj Mahal — Lager 4.5%', price: 7, description: '12oz $7 / 20oz $10', tags: [] },
          { name: 'Flying Horse — Lager 4.7%', price: null, description: '20oz $10', tags: [] },
          { name: 'Kingfisher — Lager 4.8%', price: 7, description: '12oz $7 / 20oz $10', tags: [] },
          { name: 'Hayward 5000 — Malt Liquor 7%', price: null, description: '20oz $10', tags: [] },
          { name: 'Old Monk — Lager 8%', price: null, description: '20oz $10', tags: [] },
        ],
      },
      {
        title: 'Spirits',
        items: [
          { name: 'Bourbon', price: null, description: 'Jim Beam $8 · Jack Daniels $9 · Bulleit $11 · Makers Mark $12', tags: [] },
          { name: 'Scotch', price: null, description: 'Chivas Regal $9 · JW Black $10 · JW Double Black $11 · JW Green $13 · JW Gold $14 · JW Blue $30', tags: [] },
          { name: 'Whiskey', price: null, description: 'Jameson $9 · Crown Royal $10 · Black Dog $12', tags: [] },
          { name: 'Single Malt', price: null, description: 'Glenlivet 12yr $13 · Glenfiddich 12yr $13 · Indri $15 · Amrut $17 · Macallan 12yr $18 · Macallan 15yr $26', tags: [] },
          { name: 'Tequila', price: null, description: '1800 Silver $11 · Patron Reposado $12 · Don Julio Blanco $12 · Patron Silver $14 · Don Julio 1942 $20', tags: [] },
          { name: 'Vodka', price: null, description: 'Absolut $7 · Titos $9 · Ketel One $11 · Grey Goose $12 · Ciroc $13', tags: [] },
          { name: 'Gin', price: null, description: 'Beefeater $9 · Bombay Sapphire $10 · Tanqueray $10 · Hendricks $13', tags: [] },
          { name: 'Rum', price: null, description: 'Bacardi Superior $9 · Bacardi Gold $9 · Captain Morgan $9 · Old Monk $10 · Kraken Dark $11 · Malibu $11', tags: [] },
          { name: 'Cognac', price: null, description: 'Courvoisier VS $12 · Martel VS $12 · Remy Martin VSOP $15 · Hennessy VSOP $16', tags: [] },
        ],
      },
    ],
  },
  'Party Trays': {
    subcategories: [
      {
        title: 'Appetizers',
        items: [
          { name: 'Vegetable Samosas', price: null, description: 'Small $45 / Large $80', tags: ['V'] },
          { name: 'Onion Pakoras', price: null, description: 'Small $40 / Large $70', tags: ['V'] },
          { name: 'Vegetable Pakoras', price: null, description: 'Small $40 / Large $70', tags: ['V'] },
          { name: 'Paneer Pakoras', price: null, description: 'Small $75 / Large $135', tags: ['V'] },
          { name: 'Chicken 65', price: null, description: 'Small $85 / Large $155', tags: ['S'] },
          { name: 'Aloo Tikki Chaat', price: null, description: 'Small $55 / Large $95', tags: ['V'] },
          { name: 'Mix Vegetarian Platter', price: null, description: 'Small $85 / Large $155', tags: ['V'] },
          { name: 'Non-Vegetarian Platter', price: null, description: 'Small $95 / Large $175', tags: [] },
        ],
      },
      {
        title: 'Vegetable Entrées',
        items: [
          { name: 'Mixed Vegetable', price: null, description: 'Small $75 / Large $140', tags: ['V'] },
          { name: 'Aloo Gobhi', price: null, description: 'Small $75 / Large $140', tags: ['V'] },
          { name: 'Navratan Korma', price: null, description: 'Small $80 / Large $150', tags: ['V'] },
          { name: 'Malai Kofta', price: null, description: 'Small $80 / Large $150', tags: ['V'] },
          { name: 'Bhindi Masala', price: null, description: 'Small $80 / Large $150', tags: ['V'] },
          { name: 'Baigan Bhartha', price: null, description: 'Small $80 / Large $150', tags: ['V'] },
        ],
      },
      {
        title: 'Paneer Entrées',
        items: [
          { name: 'Shahi Paneer', price: null, description: 'Small $85 / Large $160', tags: ['V'] },
          { name: 'Paneer Tikka Masala', price: null, description: 'Small $85 / Large $160', tags: ['V'] },
          { name: 'Paneer Makhni', price: null, description: 'Small $85 / Large $155', tags: ['V'] },
          { name: 'Palak Paneer', price: null, description: 'Small $85 / Large $155', tags: ['V'] },
          { name: 'Matar Paneer', price: null, description: 'Small $85 / Large $155', tags: ['V'] },
        ],
      },
      {
        title: 'Dal',
        items: [
          { name: 'Chana Masala', price: null, description: 'Small $65 / Large $120', tags: ['V'] },
          { name: 'Dal Makhani', price: null, description: 'Small $65 / Large $120', tags: ['V'] },
          { name: 'Dal Tadka', price: null, description: 'Small $65 / Large $120', tags: ['V'] },
        ],
      },
      {
        title: 'Chicken Entrées',
        items: [
          { name: 'Chicken Tikka Masala', price: null, description: 'Small $95 / Large $175', tags: [] },
          { name: 'Butter Chicken', price: null, description: 'Small $95 / Large $175', tags: [] },
          { name: 'Chicken Korma', price: null, description: 'Small $90 / Large $165', tags: [] },
          { name: 'Punjabi Chicken Curry', price: null, description: 'Small $85 / Large $155', tags: ['S'] },
          { name: 'Chicken Saag', price: null, description: 'Small $90 / Large $165', tags: [] },
        ],
      },
      {
        title: 'Lamb & Goat Entrées',
        items: [
          { name: 'Lamb Tikka Masala', price: null, description: 'Small $110 / Large $200', tags: [] },
          { name: 'Lamb Curry', price: null, description: 'Small $100 / Large $185', tags: [] },
          { name: 'Lamb Rogan Josh', price: null, description: 'Small $100 / Large $185', tags: ['S'] },
          { name: 'Goat Curry', price: null, description: 'Small $110 / Large $200', tags: [] },
        ],
      },
      {
        title: 'Rice & Biryani',
        items: [
          { name: 'Basmati Rice', price: null, description: 'Small $30 / Large $55', tags: ['V'] },
          { name: 'Saffron Rice', price: null, description: 'Small $40 / Large $70', tags: ['V'] },
          { name: 'Veg Biryani', price: null, description: 'Small $75 / Large $140', tags: ['V'] },
          { name: 'Chicken Biryani', price: null, description: 'Small $85 / Large $160', tags: [] },
          { name: 'Lamb Biryani', price: null, description: 'Small $95 / Large $175', tags: [] },
          { name: 'Goat Biryani', price: null, description: 'Small $100 / Large $185', tags: [] },
        ],
      },
      {
        title: 'Breads (per piece, minimum 20)',
        items: [
          { name: 'Plain Naan', price: 3, description: '', tags: ['V'] },
          { name: 'Garlic Naan', price: 4, description: '', tags: ['V'] },
          { name: 'Tandoori Roti', price: 3, description: '', tags: ['V'] },
          { name: 'Lachha Paratha', price: 4, description: '', tags: ['V'] },
          { name: 'Onion Kulcha', price: 4, description: '', tags: ['V'] },
        ],
      },
      {
        title: 'Desserts',
        items: [
          { name: 'Gulab Jamun', price: null, description: 'Small $55 / Large $100', tags: ['V'] },
          { name: 'Rasmalai', price: null, description: 'Small $65 / Large $120', tags: ['V'] },
          { name: 'Kheer (Rice Pudding)', price: null, description: 'Small $55 / Large $100', tags: ['V'] },
        ],
      },
    ],
  },
};

const categories = Object.keys(menuData);

const tagLabels = {
  V: 'Vegetarian',
  S: 'Spicy',
};

function Menu() {
  const [activeTab, setActiveTab] = useState('Appetizers');
  const menuGridRef = useRef(null);
  const tabsRef = useRef(null);
  const indicatorRef = useRef(null);
  const gsapCtxRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Event listener for external tab selection — moved after handleTabChange definition below

  /* ---- Sliding tab indicator ---- */
  const updateIndicator = useCallback((tabName) => {
    if (!tabsRef.current || !indicatorRef.current) return;
    const activeBtn = tabsRef.current.querySelector(`.menu-tab.active`);
    if (!activeBtn) return;

    const tabsRect = tabsRef.current.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    gsap.to(indicatorRef.current, {
      x: btnRect.left - tabsRect.left,
      width: btnRect.width,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, []);

  /* ---- Initial indicator position ---- */
  useLayoutEffect(() => {
    requestAnimationFrame(() => updateIndicator(activeTab));
  }, [activeTab, updateIndicator]);

  /* ---- Price count-up effect ---- */
  const animatePrices = useCallback((container) => {
    if (!container) return;
    const priceEls = container.querySelectorAll('.menu-item-price');
    priceEls.forEach((el) => {
      const text = el.textContent;
      const match = text.match(/\$(\d+)/);
      if (!match) return;
      const target = parseInt(match[1], 10);
      const proxy = { val: 0 };
      gsap.to(proxy, {
        val: target,
        duration: 0.3,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = `$${Math.round(proxy.val)}`;
        },
      });
    });
  }, []);

  /* ---- Track activeTab in a ref for stable callbacks ---- */
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;

  /* ---- Tab switch with staggered animation ---- */
  const handleTabChange = useCallback((newTab) => {
    if (newTab === activeTabRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const container = menuGridRef.current;
    if (!container) {
      setActiveTab(newTab);
      isAnimatingRef.current = false;
      return;
    }

    const currentItems = container.querySelectorAll('.menu-item, .menu-subcategory-title, .menu-tray-info');

    /* Animate out */
    const tl = gsap.timeline({
      onComplete() {
        setActiveTab(newTab);
        isAnimatingRef.current = false;
      },
    });

    if (currentItems.length > 0) {
      tl.to(currentItems, {
        opacity: 0,
        y: 12,
        duration: 0.3,
        stagger: 0.02,
        ease: 'power2.in',
      });
    } else {
      tl.to({}, { duration: 0.05 });
    }
  }, []);

  useEffect(() => {
    const handler = (e) => handleTabChange(e.detail);
    window.addEventListener('select-menu-tab', handler);
    return () => window.removeEventListener('select-menu-tab', handler);
  }, [handleTabChange]);

  /* ---- Animate in new items after tab state updates ---- */
  useLayoutEffect(() => {
    const container = menuGridRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const newItems = container.querySelectorAll('.menu-item, .menu-subcategory-title, .menu-tray-info');

      gsap.fromTo(
        newItems,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: 'power3.out',
          onComplete() {
            animatePrices(container);
          },
        },
      );

      /* ---- Subcategory gold line draw-in ---- */
      const subTitles = container.querySelectorAll('.menu-subcategory-title');
      subTitles.forEach((title) => {
        gsap.fromTo(
          title,
          { '--line-scale': 0 },
          { '--line-scale': 1, duration: 0.6, delay: 0.3, ease: 'power2.out' },
        );
      });
    }, container);

    gsapCtxRef.current = ctx;
    return () => ctx.revert();
  }, [activeTab, animatePrices]);

  const { subcategories } = menuData[activeTab];

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        <div className="menu-header reveal">
          <span className="eyebrow">The Menu</span>
          <h2>Explore Our <em>Flavors</em></h2>
        </div>

        <div className="menu-tabs reveal" ref={tabsRef}>
          <div className="menu-tab-indicator" ref={indicatorRef} />
          {categories.map((cat) => (
            <button
              key={cat}
              className={`menu-tab ${activeTab === cat ? 'active' : ''}`}
              onClick={() => handleTabChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={menuGridRef}>
          {activeTab === 'Party Trays' && (
            <div className="menu-tray-info">
              <p><strong>Small Tray</strong> — serves 10-15 guests</p>
              <p><strong>Large Tray</strong> — serves 25-30 guests</p>
              <p className="menu-tray-note">For orders or questions, call us at <a href="tel:+16616794271">(661) 679-4271</a> or submit an <a href="#inquiries">inquiry</a>.</p>
            </div>
          )}

          {subcategories.map((sub) => (
            <div key={sub.title || 'main'} className="menu-subcategory">
              {sub.title && <h3 className="menu-subcategory-title">{sub.title}</h3>}
              <div className="menu-grid">
                {sub.items.map((item) => (
                  <div className="menu-item" key={item.name}>
                    <div className="menu-item-header">
                      <span className="menu-item-name">
                        {item.name}
                        {item.tags && item.tags.length > 0 && (
                          <span className="menu-item-tags">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`tag tag-${tag.toLowerCase()}`}
                                title={tagLabels[tag]}
                              >
                                {tag}
                              </span>
                            ))}
                          </span>
                        )}
                      </span>
                      {item.price !== null && (
                        <span className="menu-item-price">${item.price}</span>
                      )}
                    </div>
                    {item.description && (
                      <p className="menu-item-description">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="menu-legend">
          <span className="legend-item"><span className="tag tag-v">V</span> Vegetarian</span>
          <span className="legend-item"><span className="tag tag-s">S</span> Spicy</span>
        </div>

        <div className="menu-cta reveal">
          <p className="menu-cta__text">Ready to order?</p>
          <div className="menu-cta__buttons">
            <a
              href="https://www.doordash.com/store/saffron-indian-food-&-bar-bakersfield-41931145/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Order Online
            </a>
            <a href="#inquiries" className="btn btn-ghost">
              Plan an Event
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
