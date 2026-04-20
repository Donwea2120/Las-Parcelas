const STOCK_STORAGE_KEY = 'ventas_productores_stock';
const SERVER_PRODUCTS_ENDPOINT = 'http://localhost:3000/api/products';

const defaultProducerProducts = [
    { id: 1, name: 'Mango Ataulfo', category: 'Frutas', stock: 32, price: 2500, image: 'img/mango.jpg' },
    { id: 2, name: 'Salmón Austral', category: 'Pescados', stock: 18, price: 8000, image: 'img/salmon.jpg' },
    { id: 3, name: 'Huevos de Campo', category: 'Lácteos', stock: 65, price: 2800, image: 'img/huevo.jpg' },
    { id: 4, name: 'Miel Orgánica', category: 'Otros', stock: 42, price: 5000, image: 'img/miel.jpg' },
    { id: 5, name: 'Almejas Frescas', category: 'Mariscos', stock: 24, price: 7200, image: 'img/almejas.jpg' }
];

function normalizeProductImage(product) {
    if (!product || typeof product.name !== 'string') return product;
    const nombre = product.name.toLowerCase();
    if (nombre.includes('mermelad')) {
        product.image = 'img/frascos.jfif';
    }
    if (nombre.includes('almeja')) {
        product.image = 'img/almejas.jpg';
    }
    return product;
}

function loadProducts() {
    const saved = localStorage.getItem(STOCK_STORAGE_KEY);
    if (!saved) {
        localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(defaultProducerProducts));
        return defaultProducerProducts.slice();
    }

    try {
        const products = JSON.parse(saved);
        if (Array.isArray(products)) {
            const normalizedProducts = products.map(normalizeProductImage);
            localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(normalizedProducts));
            return normalizedProducts;
        }
        throw new Error('Productos guardados no es un arreglo');
    } catch (error) {
        console.warn('Error leyendo productos del almacenamiento local:', error);
        localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(defaultProducerProducts));
        return defaultProducerProducts.slice();
    }
}

function saveProducts(products, options = { server: false }) {
    localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(products));

    if (options.server) {
        return syncProductsToServer(products);
    }

    return Promise.resolve(true);
}

function resetProducts() {
    localStorage.removeItem(STOCK_STORAGE_KEY);
    return loadProducts();
}

async function syncProductsToServer(products) {
    try {
        const response = await fetch(SERVER_PRODUCTS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        });

        return response.ok;
    } catch (error) {
        console.warn('No se pudo conectar con el servidor:', error);
        return false;
    }
}

async function fetchProductsFromServer() {
    try {
        const response = await fetch(SERVER_PRODUCTS_ENDPOINT);
        if (!response.ok) {
            return null;
        }
        const products = await response.json();
        return Array.isArray(products) ? products : null;
    } catch (error) {
        return null;
    }
}
