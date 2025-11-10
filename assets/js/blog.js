/**
 * blog.js - Gestión del blog
 * - Carga y renderiza posts desde archivos Markdown
 * - Búsqueda de posts por título/contenido
 * - Visualización en modal
 * - Lazy loading de imágenes
 */

// Lista de posts disponibles (agregar nuevos posts aquí)
const BLOG_POSTS = [
    {
        slug: '2025-01-bienvenida',
        file: 'posts/2025-01-bienvenida.md',
        title: 'Bienvenidos a Delavalle Asesores',
        date: '2025-01-15',
        excerpt: 'Te damos la bienvenida a nuestro blog jurídico donde compartiremos conocimiento legal accesible.',
        tags: ['bienvenida', 'general'],
        author: 'Equipo Delavalle'
    },
    {
        slug: '2025-02-checklist-legal',
        file: 'posts/2025-02-checklist-legal.md',
        title: 'Checklist Legal para Nuevas Empresas',
        date: '2025-02-10',
        excerpt: 'Guía completa de requisitos legales que toda empresa debe cumplir al iniciar operaciones.',
        tags: ['empresarial', 'guía', 'checklist'],
        author: 'Dr. Juan Delavalle'
    },
    {
        slug: '2025-03-asesoria-primera-visita',
        file: 'posts/2025-03-asesoria-primera-visita.md',
        title: 'Qué Esperar en tu Primera Consulta Legal',
        date: '2025-03-05',
        excerpt: 'Preparación y consejos para aprovechar al máximo tu primera cita con un abogado.',
        tags: ['consulta', 'guía', 'consejos'],
        author: 'Dra. María Torres'
    }
];

// Cache de posts cargados
const postsCache = {};

/**
 * Cargar todos los posts y mostrarlos
 */
async function loadAllPosts() {
    const container = document.getElementById('posts-container');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    container.innerHTML = '<div class="col-span-full text-center py-8"><p class="text-gray-500 dark:text-gray-400">Cargando artículos...</p></div>';
    
    try {
        // Ordenar posts por fecha (más recientes primero)
        const sortedPosts = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Generar cards
        container.innerHTML = '';
        sortedPosts.forEach(post => {
            container.appendChild(createPostCard(post));
        });
        
        // Re-inicializar iconos
        lucide.createIcons();
        
        if (noResults) {
            noResults.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error cargando posts:', error);
        container.innerHTML = '<div class="col-span-full text-center py-8"><p class="text-red-500">Error al cargar los artículos</p></div>';
    }
}

/**
 * Cargar posts recientes para la página de inicio
 * @param {number} count - Número de posts a cargar
 */
async function loadRecentPosts(count = 3) {
    const container = document.getElementById('recent-posts');
    
    if (!container) return;
    
    try {
        // Obtener los posts más recientes
        const recentPosts = [...BLOG_POSTS]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, count);
        
        container.innerHTML = '';
        recentPosts.forEach(post => {
            container.appendChild(createPostCard(post));
        });
        
        // Re-inicializar iconos
        lucide.createIcons();
    } catch (error) {
        console.error('Error cargando posts recientes:', error);
    }
}

/**
 * Crear tarjeta de post
 * @param {Object} post - Datos del post
 * @returns {HTMLElement}
 */
function createPostCard(post) {
    const card = document.createElement('article');
    card.className = 'bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group';
    
    // Formatear fecha
    const formattedDate = formatDate(post.date);
    
    card.innerHTML = `
        <div class="p-6">
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <i data-lucide="calendar" class="w-4 h-4 mr-2"></i>
                <time datetime="${post.date}">${formattedDate}</time>
            </div>
            <h3 class="font-display text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                ${post.title}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                ${post.excerpt}
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${post.tags.map(tag => `
                    <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full">
                        ${tag}
                    </span>
                `).join('')}
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                    <i data-lucide="user" class="w-4 h-4 inline mr-1"></i>
                    ${post.author}
                </span>
                <span class="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:underline">
                    Leer más
                    <i data-lucide="arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
                </span>
            </div>
        </div>
    `;
    
    // Event listener para abrir el post
    card.addEventListener('click', () => openPost(post.slug));
    
    return card;
}

/**
 * Abrir post en modal
 * @param {string} slug - Slug del post
 */
async function openPost(slug) {
    const post = BLOG_POSTS.find(p => p.slug === slug);
    
    if (!post) {
        console.error('Post no encontrado:', slug);
        return;
    }
    
    const modal = document.getElementById('post-modal');
    const content = document.getElementById('post-content');
    
    if (!modal || !content) return;
    
    // Mostrar modal con loading
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    content.innerHTML = '<div class="text-center py-12"><p class="text-gray-500 dark:text-gray-400">Cargando...</p></div>';
    
    try {
        // Cargar contenido del post (desde cache o fetch)
        let markdown;
        if (postsCache[slug]) {
            markdown = postsCache[slug];
        } else {
            const response = await fetch(post.file);
            if (!response.ok) throw new Error('Error al cargar el post');
            markdown = await response.text();
            postsCache[slug] = markdown;
        }
        
        // Convertir Markdown a HTML
        const html = marked.parse(markdown);
        
        // Renderizar post
        const formattedDate = formatDate(post.date);
        content.innerHTML = `
            <div class="mb-6">
                <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <i data-lucide="calendar" class="w-4 h-4 mr-2"></i>
                    <time datetime="${post.date}">${formattedDate}</time>
                    <span class="mx-3">•</span>
                    <i data-lucide="user" class="w-4 h-4 mr-2"></i>
                    ${post.author}
                </div>
                <h1 class="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    ${post.title}
                </h1>
                <div class="flex flex-wrap gap-2">
                    ${post.tags.map(tag => `
                        <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-semibold rounded-full">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div class="prose prose-lg dark:prose-invert max-w-none">
                ${html}
            </div>
        `;
        
        // Aplicar lazy loading a imágenes
        applyLazyLoading(content);
        
        // Re-inicializar iconos
        lucide.createIcons();
        
        // Actualizar URL sin recargar
        if (window.location.pathname.includes('blog.html')) {
            history.pushState(null, '', `?post=${slug}`);
        }
        
        // Scroll al inicio del modal
        modal.scrollTo(0, 0);
        
    } catch (error) {
        console.error('Error cargando post:', error);
        content.innerHTML = '<div class="text-center py-12"><p class="text-red-500">Error al cargar el artículo</p></div>';
    }
}

/**
 * Cerrar modal del post
 */
function closePostModal() {
    const modal = document.getElementById('post-modal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    
    // Limpiar URL si estamos en blog.html
    if (window.location.pathname.includes('blog.html') && window.location.search) {
        history.pushState(null, '', window.location.pathname);
    }
}

/**
 * Búsqueda de posts
 * @param {string} query - Término de búsqueda
 */
function searchPosts(query) {
    const container = document.getElementById('posts-container');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
        // Si no hay búsqueda, mostrar todos los posts
        loadAllPosts();
        return;
    }
    
    // Filtrar posts
    const results = BLOG_POSTS.filter(post => {
        return post.title.toLowerCase().includes(normalizedQuery) ||
               post.excerpt.toLowerCase().includes(normalizedQuery) ||
               post.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
               post.author.toLowerCase().includes(normalizedQuery);
    });
    
    // Mostrar resultados
    container.innerHTML = '';
    
    if (results.length === 0) {
        if (noResults) {
            noResults.classList.remove('hidden');
        }
    } else {
        if (noResults) {
            noResults.classList.add('hidden');
        }
        results.forEach(post => {
            container.appendChild(createPostCard(post));
        });
    }
    
    // Re-inicializar iconos
    lucide.createIcons();
}

/**
 * Aplicar lazy loading a imágenes dentro del contenido
 * @param {HTMLElement} container - Contenedor con imágenes
 */
function applyLazyLoading(container) {
    const images = container.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.classList.add('rounded-lg', 'shadow-md');
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Configurar búsqueda si estamos en blog.html
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchPosts(e.target.value);
        }, 300));
    }
    
    // Configurar botón de cerrar modal
    const closeButton = document.getElementById('close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closePostModal);
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    const modal = document.getElementById('post-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePostModal();
            }
        });
    }
    
    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePostModal();
        }
    });
});

// Exportar funciones para uso global
window.loadAllPosts = loadAllPosts;
window.loadRecentPosts = loadRecentPosts;
window.openPost = openPost;
window.searchPosts = searchPosts;
