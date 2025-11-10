/**
 * main.js - Funcionalidades principales del sitio
 * - Menú hamburguesa responsive
 * - Toggle de tema claro/oscuro
 * - Botón volver arriba
 * - Inicialización de iconos Lucide
 * - Año actual en footer
 */

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos de Lucide
    lucide.createIcons();
    
    // Configurar año actual en el footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Menú móvil
    initMobileMenu();
    
    // Tema claro/oscuro
    initThemeToggle();
    
    // Botón volver arriba
    initBackToTop();
    
    // Botón flotante de WhatsApp (animación de entrada)
    initWhatsAppButton();
});

/**
 * Inicializar menú móvil hamburguesa
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
        
        // Re-inicializar iconos después de mostrar el menú
        lucide.createIcons();
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Inicializar toggle de tema claro/oscuro
 * Guarda la preferencia en localStorage y respeta prefers-color-scheme
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    
    // Obtener tema guardado o usar preferencia del sistema
    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Aplicar tema
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
        
        // Re-inicializar iconos después de cambiar tema
        lucide.createIcons();
    };
    
    // Aplicar tema inicial
    applyTheme(getTheme());
    
    // Toggle de tema
    const toggleTheme = () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };
    
    // Event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', toggleTheme);
    }
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

/**
 * Inicializar botón "Volver arriba"
 * Muestra el botón cuando se hace scroll hacia abajo
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100');
        }
    });
    
    // Scroll suave hacia arriba al hacer clic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Inicializar botón flotante de WhatsApp
 * Añade animación de entrada suave
 */
function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-float');
    
    if (!whatsappBtn) return;
    
    // Pequeño delay para animación de entrada
    setTimeout(() => {
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.transform = 'scale(0.8)';
        whatsappBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.transform = 'scale(1)';
        }, 100);
    }, 500);
}

/**
 * Utilidad: Scroll suave a un elemento
 * @param {string} selector - Selector CSS del elemento
 */
function smoothScrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Utilidad: Formatear fecha en español
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('es-ES', options);
}

/**
 * Utilidad: Debounce para optimizar eventos frecuentes
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar funciones para uso global
window.smoothScrollTo = smoothScrollTo;
window.formatDate = formatDate;
window.debounce = debounce;
