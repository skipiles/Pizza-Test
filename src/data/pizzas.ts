import type { Pizza } from '../entities/cart/model/CartContext'

export const pizzas: Pizza[] = [
  {
    id: 'pepperoni',
    name: 'Пепперони',
    basePrice: 500,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf39dda97082912be8d1f3f2b233.avif',
    ingredients: [
      { id: 'mozzarella', name: 'сыр моцарелла', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152f0cb67721b2e278cdffa797eb.png' },
      { id: 'spicy-sauce', name: 'острый соус', price: 30, imageUrl: 'https://png.pngtree.com/png-clipart/20250518/original/pngtree-spicy-chili-sauce-in-a-white-bowl-png-image_21025548.png' },
      { id: 'olives', name: 'оливки', price: 40, imageUrl: 'https://www.pngarts.com/files/4/Olives-Download-Transparent-PNG-Image.png' },
      { id: 'extra-pepperoni', name: 'доп. пепперони', price: 70, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152b6e6978a188ec97d9bd52e7d2.png' }
    ]
  },
  {
    id: 'margherita',
    name: 'Маргарита',
    basePrice: 400,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf3d788b78d491891a6da5e94bf1.avif',
    ingredients: [
      { id: 'basil', name: 'базилик', price: 20, imageUrl: 'https://foni.papik.pro/uploads/posts/2024-09/foni-papik-pro-qyzy-p-kartinki-bazilik-na-prozrachnom-fone-14.png' },
      { id: 'cherry', name: 'помидоры черри', price: 40, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152a8428737d9f6b19c1b2329749.png' },
      { id: 'extra-cheese', name: 'доп. сыр', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152f32e47035aefbe8c971c54502.png' },
      { id: 'pesto', name: 'песто', price: 30, imageUrl: 'https://png.pngtree.com/png-vector/20250307/ourmid/pngtree-fresh-green-pesto-sauce-in-white-ceramic-bowl-png-image_15733339.png' }
    ]
  },
  {
    id: 'four-cheese',
    name: 'Четыре сыра',
    basePrice: 550,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf48e02377e9adc0b190c9676321.avif',
    ingredients: [
      { id: 'gorgonzola', name: 'горгонзола', price: 60, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199153050ea707cbed48b92097e095f.png' },
      { id: 'cheddar', name: 'чеддер', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152f32e47035aefbe8c971c54502.png' },
      { id: 'cream-sauce', name: 'сливочный соус', price: 30, imageUrl: 'https://png.pngtree.com/png-vector/20241211/ourmid/pngtree-creamy-white-dip-topped-with-herbs-and-served-in-a-small-png-image_14695045.png' },
      { id: 'mushrooms', name: 'грибы', price: 40, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152bfda5723f8bbecc43a35f83f1.png' }
    ]
  },
  {
    id: 'hawaiian',
    name: 'Гавайская',
    basePrice: 480,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf530345746e98039478001d5108.avif',
    ingredients: [
      { id: 'extra-pineapple', name: 'доп. ананас', price: 30, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152b81587495b19ba8008c567f5d.png' },
      { id: 'ham', name: 'ветчина', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152d7fd075a9b11d17f8acaf1670.png' },
      { id: 'spicy-sauce-2', name: 'острый соус', price: 30, imageUrl: 'https://png.pngtree.com/png-clipart/20250518/original/pngtree-spicy-chili-sauce-in-a-white-bowl-png-image_21025548.png' },
      { id: 'mozzarella-2', name: 'моцарелла', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152f0cb67721b2e278cdffa797eb.png' }
    ]
  },
  {
    id: 'bbq',
    name: 'Барбекю',
    basePrice: 530,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf2cc87a79baa946c53b634615f4.avif',
    ingredients: [
      { id: 'chicken', name: 'курица', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152e59157089adb89948280ebb10.png' },
      { id: 'bacon', name: 'бекон', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/019915303b5377fd97915878fdf2a9f0.png' },
      { id: 'onion', name: 'лук', price: 20, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152bec117341ad729b24870b55f3.png' },
      { id: 'bbq-sauce', name: 'соус барбекю', price: 30, imageUrl: 'https://menu2go.ru/images/food/75/75_20210405164450_2577.png' }
    ]
  },
  {
    id: 'veggie',
    name: 'Вегетарианская',
    basePrice: 450,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf29e76179b88bdbf2ec5527bba3.avif',
    ingredients: [
      { id: 'eggplant', name: 'баклажаны', price: 40, imageUrl: 'https://png.pngtree.com/png-vector/20250508/ourmid/pngtree-eggplant-vegetables-png-image_16221559.png' },
      { id: 'zucchini', name: 'цукини', price: 40, imageUrl: 'https://png.pngtree.com/png-clipart/20250501/original/pngtree-fresh-zucchini-vegetable-image-for-cooking-healthy-food-ingredient-recipes-and-png-image_20925187.png' },
      { id: 'bell-pepper', name: 'перец болгарский', price: 30, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152da27677a7a24a41b4eddfcedd.png' },
      { id: 'broccoli', name: 'брокколи', price: 30, imageUrl: 'https://png.pngtree.com/png-clipart/20201208/original/pngtree-a-green-delicious-broccoli-png-image_5515345.jpg' }
    ]
  },
  {
    id: 'meat',
    name: 'Мясная',
    basePrice: 560,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf3b88d5772695c7f9e557b5b196.avif',
    ingredients: [
      { id: 'salami', name: 'салями', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152e43a67720a2c59d63081e66a5.png' },
      { id: 'bacon-2', name: 'бекон', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/019915303b5377fd97915878fdf2a9f0.png' },
      { id: 'chicken-2', name: 'курица', price: 50, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152e59157089adb89948280ebb10.png' },
      { id: 'beef', name: 'говядина', price: 70, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/01991530635b73ecb1a22658b49e1653.png' }
    ]
  },
  {
    id: 'diablo',
    name: 'Дьябло',
    basePrice: 520,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf439a007604880d0231be87cd3e.avif',
    ingredients: [
      { id: 'jalapeno', name: 'халапеньо', price: 30, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152c7eb27553a08f57c8c9861ac3.png' },
      { id: 'spicy-sauce-3', name: 'острый соус', price: 30, imageUrl: 'https://png.pngtree.com/png-clipart/20250518/original/pngtree-spicy-chili-sauce-in-a-white-bowl-png-image_21025548.png' },
      { id: 'extra-pepperoni-2', name: 'доп. пепперони', price: 70, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152b6e6978a188ec97d9bd52e7d2.png' },
      { id: 'red-onion', name: 'лук красный', price: 20, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152bec117341ad729b24870b55f3.png' }
    ]
  },
  {
    id: 'mushroom',
    name: 'С грибами',
    basePrice: 470,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf4e67f474f991f04a46a49af5e6.avif',
    ingredients: [
      { id: 'porcini', name: 'белые грибы', price: 50, imageUrl: 'https://png.pngtree.com/png-vector/20250724/ourmid/pngtree-fresh-white-button-mushrooms-delicious-and-nutritious-ingredients-png-image_16826430.webp' },
      { id: 'truffle', name: 'трюфельное масло', price: 60, imageUrl: 'https://www.sessatartufi.com/180-large_default/tartufo-bianco-tuber-magnatum-pico.jpg' },
      { id: 'champignon', name: 'шампиньоны', price: 40, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152bfda5723f8bbecc43a35f83f1.png' },
      { id: 'onion-2', name: 'лук', price: 20, imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/0199152bec117341ad729b24870b55f3.png' }
    ]
  },
  {
    id: 'seafood',
    name: 'С морепродуктами',
    basePrice: 600,
    imageUrl: 'https://media.dodostatic.net/image/r:584x584/0198bf5147f27780a3290a82692e7a36.avif',
    ingredients: [
      { id: 'shrimp', name: 'креветки', price: 80, imageUrl: 'https://png.pngtree.com/png-clipart/20231116/original/pngtree-one-tasty-shrimp-food-photo-png-image_13593528.png' },
      { id: 'squid', name: 'кальмары', price: 70, imageUrl: 'https://produktoff.kz/pictures/product/big/21899_big.png' },
      { id: 'mussels', name: 'мидии', price: 60, imageUrl: 'https://png.pngtree.com/png-clipart/20240307/original/pngtree-close-up-of-a-mussel-png-image_14532765.png' },
      { id: 'lemon', name: 'лимон', price: 10, imageUrl: 'https://free-png.ru/wp-content/uploads/2022/02/free-png.ru-141.png' }
    ]
  }
]
