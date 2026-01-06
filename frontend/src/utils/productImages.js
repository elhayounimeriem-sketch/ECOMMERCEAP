// Utilitaire pour obtenir des images de produits basées sur la catégorie
export const getProductImage = (product) => {
  // Si le produit a déjà une image, l'utiliser
  if (product.image && product.image.trim() !== '') {
    return product.image;
  }

  // Utiliser des images de placeholder fiables avec des couleurs selon la catégorie
  const categoryColors = {
    'robes': { bg: 'ff69b4', text: 'ffffff' }, // Rose pour robes
    'sac': { bg: '8b4513', text: 'ffffff' },   // Marron pour sacs
    't-shirt': { bg: '4169e1', text: 'ffffff' }, // Bleu pour t-shirts
  };

  const colors = categoryColors[product.category] || categoryColors['t-shirt'];
  
  // Utiliser l'ID du produit pour créer une variation
  let seed = 0;
  if (product._id) {
    const idStr = product._id.toString();
    seed = parseInt(idStr.slice(-2), 16) || 0;
  }
  
  // Utiliser placeholder.com qui est très fiable
  const productName = product.name ? encodeURIComponent(product.name.substring(0, 20)) : 'Product';
  return `https://via.placeholder.com/800x1000/${colors.bg}/${colors.text}?text=${productName}`;
};

// Alternative avec Picsum Photos (images aléatoires mais belles)
export const getProductImagePicsum = (product) => {
  if (product.image && product.image.trim() !== '') {
    return product.image;
  }

  const categorySeeds = {
    'robes': [200, 201, 202, 203, 204, 205],
    'sac': [300, 301, 302, 303, 304, 305],
    't-shirt': [400, 401, 402, 403, 404, 405],
  };

  const seeds = categorySeeds[product.category] || categorySeeds['t-shirt'];
  
  let index = 0;
  if (product._id) {
    const idStr = product._id.toString();
    index = parseInt(idStr.slice(-1), 16) % seeds.length;
  }
  
  const seed = seeds[index];
  return `https://picsum.photos/seed/${seed}/800/1000`;
};

// Alternative avec Unsplash Source (service officiel Unsplash)
export const getProductImageUnsplash = (product) => {
  if (product.image && product.image.trim() !== '') {
    return product.image;
  }

  const categoryKeywords = {
    'robes': ['dress', 'fashion', 'woman', 'clothing'],
    'sac': ['bag', 'handbag', 'purse', 'accessory'],
    't-shirt': ['tshirt', 'shirt', 'clothing', 'apparel'],
  };

  const keywords = categoryKeywords[product.category] || categoryKeywords['t-shirt'];
  
  let index = 0;
  if (product._id) {
    const idStr = product._id.toString();
    index = parseInt(idStr.slice(-1), 16) % keywords.length;
  }
  
  const keyword = keywords[index];
  // Utiliser Unsplash Source API (gratuite et fiable)
  return `https://source.unsplash.com/800x1000/?${keyword}`;
};
