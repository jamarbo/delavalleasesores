/**
 * form.js - Gestión del formulario de contacto
 * - Validación de campos
 * - Honeypot para evitar spam
 * - Rate limiting con localStorage
 * - Envío con Formspree o EmailJS
 */

// CONFIGURACIÓN - Elige uno de estos servicios:

// OPCIÓN 1: Formspree (https://formspree.io)
// 1. Crea una cuenta en https://formspree.io
// 2. Crea un nuevo formulario y obtén tu endpoint
// 3. Reemplaza 'XXXXXXX' con tu ID de formulario
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXX';
const USE_FORMSPREE = true; // Cambiar a true para usar Formspree

// OPCIÓN 2: EmailJS (https://www.emailjs.com)
// 1. Crea una cuenta en https://www.emailjs.com
// 2. Configura tu servicio de email
// 3. Crea una plantilla de email
// 4. Reemplaza estos valores con los tuyos
const EMAILJS_CONFIG = {
    serviceID: 'YOUR_SERVICE_ID',
    templateID: 'YOUR_TEMPLATE_ID',
    publicKey: 'YOUR_PUBLIC_KEY'
};

// Rate limiting: permitir solo 1 envío cada 2 minutos
const RATE_LIMIT_MS = 2 * 60 * 1000; // 2 minutos

/**
 * Inicializar formulario
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', handleSubmit);
});

/**
 * Manejar envío del formulario
 * @param {Event} e - Evento de submit
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const messageDiv = document.getElementById('form-message');
    
    // Verificar honeypot (campo oculto que solo los bots llenan)
    const honeypot = document.getElementById('bot-field');
    if (honeypot && honeypot.value !== '') {
        console.warn('Bot detectado');
        return;
    }
    
    // Verificar rate limiting
    if (!checkRateLimit()) {
        showMessage('Por favor espera unos minutos antes de enviar otro mensaje.', 'warning', messageDiv);
        return;
    }
    
    // Validar campos
    if (!validateForm(form)) {
        return;
    }
    
    // Deshabilitar botón y mostrar loading
    submitBtn.disabled = true;
    submitText.textContent = 'Enviando...';
    hideMessage(messageDiv);
    
    try {
        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Eliminar campo honeypot de los datos
        delete data['bot-field'];
        
        // Enviar según la configuración
        let success;
        if (USE_FORMSPREE) {
            success = await sendWithFormspree(data);
        } else {
            success = await sendWithEmailJS(data);
        }
        
        if (success) {
            showMessage(
                '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
                'success',
                messageDiv
            );
            form.reset();
            updateRateLimit();
        } else {
            throw new Error('Error al enviar el mensaje');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showMessage(
            'Hubo un error al enviar el mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.',
            'error',
            messageDiv
        );
    } finally {
        // Re-habilitar botón
        submitBtn.disabled = false;
        submitText.textContent = 'Enviar mensaje';
        
        // Re-inicializar iconos
        lucide.createIcons();
    }
}

/**
 * Enviar con Formspree
 * @param {Object} data - Datos del formulario
 * @returns {Promise<boolean>}
 */
async function sendWithFormspree(data) {
    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        return response.ok;
    } catch (error) {
        console.error('Error con Formspree:', error);
        return false;
    }
}

/**
 * Enviar con EmailJS
 * @param {Object} data - Datos del formulario
 * @returns {Promise<boolean>}
 */
async function sendWithEmailJS(data) {
    try {
        // Verificar que EmailJS esté disponible
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS no está cargado. Agrega el script en el HTML.');
            return false;
        }
        
        // Inicializar EmailJS con la clave pública
        emailjs.init(EMAILJS_CONFIG.publicKey);
        
        // Enviar email
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone || 'No proporcionado',
                subject: data.subject,
                message: data.message
            }
        );
        
        return response.status === 200;
    } catch (error) {
        console.error('Error con EmailJS:', error);
        return false;
    }
}

/**
 * Validar formulario
 * @param {HTMLFormElement} form - Formulario a validar
 * @returns {boolean}
 */
function validateForm(form) {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    
    // Validar nombre
    if (!name.value.trim()) {
        showFieldError(name, 'Por favor ingresa tu nombre');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showFieldError(email, 'Por favor ingresa un email válido');
        return false;
    }
    
    // Validar asunto
    if (!subject.value.trim()) {
        showFieldError(subject, 'Por favor ingresa un asunto');
        return false;
    }
    
    // Validar mensaje
    if (!message.value.trim() || message.value.trim().length < 10) {
        showFieldError(message, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    return true;
}

/**
 * Mostrar error en un campo
 * @param {HTMLElement} field - Campo con error
 * @param {string} message - Mensaje de error
 */
function showFieldError(field, message) {
    field.focus();
    field.classList.add('border-red-500');
    
    // Crear o actualizar mensaje de error
    let errorMsg = field.parentElement.querySelector('.field-error');
    if (!errorMsg) {
        errorMsg = document.createElement('p');
        errorMsg.className = 'field-error text-red-500 text-sm mt-1';
        field.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
    
    // Quitar error al empezar a escribir
    field.addEventListener('input', () => {
        field.classList.remove('border-red-500');
        if (errorMsg) {
            errorMsg.remove();
        }
    }, { once: true });
}

/**
 * Mostrar mensaje de estado
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success', 'error', 'warning'
 * @param {HTMLElement} container - Contenedor del mensaje
 */
function showMessage(message, type, container) {
    if (!container) return;
    
    const colors = {
        success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-500',
        error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-500',
        warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-500'
    };
    
    const icons = {
        success: 'check-circle',
        error: 'alert-circle',
        warning: 'alert-triangle'
    };
    
    container.className = `p-4 rounded-lg border-l-4 ${colors[type]} flex items-start`;
    container.innerHTML = `
        <i data-lucide="${icons[type]}" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"></i>
        <span>${message}</span>
    `;
    container.classList.remove('hidden');
    
    // Re-inicializar iconos
    lucide.createIcons();
    
    // Scroll al mensaje
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Ocultar mensaje
 * @param {HTMLElement} container - Contenedor del mensaje
 */
function hideMessage(container) {
    if (!container) return;
    container.classList.add('hidden');
}

/**
 * Verificar rate limiting
 * @returns {boolean}
 */
function checkRateLimit() {
    const lastSubmit = localStorage.getItem('lastFormSubmit');
    if (!lastSubmit) return true;
    
    const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
    return timeSinceLastSubmit > RATE_LIMIT_MS;
}

/**
 * Actualizar timestamp de rate limiting
 */
function updateRateLimit() {
    localStorage.setItem('lastFormSubmit', Date.now().toString());
}

/**
 * Limpiar rate limiting (para testing)
 */
function clearRateLimit() {
    localStorage.removeItem('lastFormSubmit');
}

// Exportar para uso global
window.clearRateLimit = clearRateLimit;
