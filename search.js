document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const searchButton = document.getElementById('search-button');

    // Datos de ejemplo para simular la búsqueda (en una aplicación real, esto vendría de una base de datos)
    const productos = [
        { nombre: 'Manzanas Orgánicas', categoria: 'frutas', precio: 1200, descripcion: 'Manzanas frescas cultivadas sin pesticidas.' },
        { nombre: 'Naranjas', categoria: 'frutas', precio: 1000, descripcion: 'Naranjas jugosas y dulces.' },
        { nombre: 'Plátanos', categoria: 'frutas', precio: 800, descripcion: 'Plátanos maduros y nutritivos.' },
        { nombre: 'Paltas Hass', categoria: 'frutas', precio: 3800, descripcion: 'Paltas maduras y cremosas, perfectas para guacamole.' },
        { nombre: 'Mangos', categoria: 'frutas', precio: 2500, descripcion: 'Mangos dulces y jugosos, fruta de temporada.' },
        
        { nombre: 'Zanahorias', categoria: 'verduras', precio: 800, descripcion: 'Zanahorias frescas y crujientes.' },
        { nombre: 'Lechugas', categoria: 'verduras', precio: 600, descripcion: 'Lechugas hidropónicas.' },
        { nombre: 'Tomates', categoria: 'verduras', precio: 1200, descripcion: 'Tomates maduros y jugosos.' },
        { nombre: 'Papas', categoria: 'verduras', precio: 900, descripcion: 'Papas nuevas, ideales para guisos.' },
        
        { nombre: 'Carne de Vacuno', categoria: 'carnes', precio: 8500, descripcion: 'Carne de vacuno premium, criado en praderas naturales.' },
        { nombre: 'Pollo', categoria: 'carnes', precio: 4500, descripcion: 'Pollo fresco de corral.' },
        { nombre: 'Cerdo', categoria: 'carnes', precio: 6000, descripcion: 'Carne de cerdo de primera calidad.' },
        { nombre: 'Cordero', categoria: 'carnes', precio: 9000, descripcion: 'Cordero tierno y jugoso.' },
        
        { nombre: 'Leche Fresca', categoria: 'lacteos', precio: 1500, descripcion: 'Leche fresca pasteurizada.' },
        { nombre: 'Queso', categoria: 'lacteos', precio: 4000, descripcion: 'Queso artesanal maduro.' },
        { nombre: 'Yogurt', categoria: 'lacteos', precio: 1800, descripcion: 'Yogurt natural sin azúcar añadida.' },
        { nombre: 'Mantequilla', categoria: 'lacteos', precio: 2500, descripcion: 'Mantequilla cremosa.' },
        { nombre: 'Huevos de Campo', categoria: 'lacteos', precio: 2800, descripcion: 'Huevos frescos de gallinas libres de jaula.' },
        
        { nombre: 'Semillas', categoria: 'insumos', precio: 3000, descripcion: 'Semillas orgánicas para huerto.' },
        { nombre: 'Fertilizantes', categoria: 'insumos', precio: 5000, descripcion: 'Fertilizantes naturales.' },
        { nombre: 'Herramientas', categoria: 'insumos', precio: 15000, descripcion: 'Herramientas para jardinería.' },
        { nombre: 'Abono', categoria: 'insumos', precio: 4000, descripcion: 'Abono orgánico.' },
        { nombre: 'Heno Premium', categoria: 'insumos', precio: 12000, descripcion: 'Heno de alta calidad para alimentación animal.' },
        
        { nombre: 'Salmón', categoria: 'pescados/mariscos', precio: 12000, descripcion: 'Salmón fresco de alta calidad.' },
        { nombre: 'Camarones', categoria: 'pescados/mariscos', precio: 8000, descripcion: 'Camarones frescos y jugosos.' },
        { nombre: 'Atún', categoria: 'pescados/mariscos', precio: 10000, descripcion: 'Atún fresco, ideal para sushi.' },
        { nombre: 'Merluza', categoria: 'pescados/mariscos', precio: 7000, descripcion: 'Merluza fresca y suave.' },
        { nombre: 'loco', categoria: 'pescados/mariscos', precio: 15000, descripcion: 'loco fresco y jugoso.' },
        { nombre: 'Algas Marinas', categoria: 'pescados/mariscos', precio: 6500, descripcion: 'Algas marinas para caldos y preparaciones gourmet.' },
    ];


    // Función para realizar la búsqueda
    function realizarBusqueda() {
        const terminoBusqueda = searchInput.value.toLowerCase().trim();
        const categoriaSeleccionada = categoryFilter.value.toLowerCase();
        
        // Si no hay término de búsqueda y no hay categoría seleccionada, no hacer nada
        if (terminoBusqueda === '' && categoriaSeleccionada === '') {
            alert('Por favor, ingresa un término de búsqueda o selecciona una categoría.');
            return;
        }
        
        // Filtrar productos según el término de búsqueda y la categoría
        const resultados = productos.filter(producto => {
            // Verificar si el producto coincide con el término de búsqueda
            const coincideTermino = terminoBusqueda === '' || 
                                  producto.nombre.toLowerCase().includes(terminoBusqueda) || 
                                  producto.descripcion.toLowerCase().includes(terminoBusqueda);
            
            // Verificar si el producto coincide con la categoría seleccionada
            const coincideCategoria = categoriaSeleccionada === '' || 
                                     producto.categoria === categoriaSeleccionada;
            
            // El producto debe coincidir tanto con el término como con la categoría
            return coincideTermino && coincideCategoria;
        });
        
        // Mostrar resultados (en una aplicación real, esto actualizaría el DOM)
        if (resultados.length > 0) {
            // En una aplicación real, aquí se actualizaría la interfaz con los resultados
            console.log('Resultados de búsqueda:', resultados);
            
            // Simulación: Redirigir a la página de productos con parámetros de búsqueda
            let url = 'productos.html?';
            
            if (terminoBusqueda !== '') {
                url += `busqueda=${encodeURIComponent(terminoBusqueda)}`;
            }
            
            if (categoriaSeleccionada !== '') {
                url += `${terminoBusqueda !== '' ? '&' : ''}categoria=${encodeURIComponent(categoriaSeleccionada)}`;
            }
            
            // Redirigir a la página de productos con los parámetros de búsqueda
            window.location.href = url;
        } else {
            alert('No se encontraron productos que coincidan con tu búsqueda.');
        }
    }

    // Event listeners
    searchButton.addEventListener('click', realizarBusqueda);
    
    // También permitir búsqueda al presionar Enter en el campo de búsqueda
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            realizarBusqueda();
        }
    });

    // Función para cargar productos destacados (simulación)
    function cargarProductosDestacados() {
        console.log('Cargando productos destacados...');
        // En una aplicación real, aquí se cargarían los productos destacados desde una API o base de datos
    }

    // Inicializar la página
    cargarProductosDestacados();
});
