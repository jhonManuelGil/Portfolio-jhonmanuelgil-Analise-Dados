document.addEventListener('DOMContentLoaded', function () {

    const links = document.querySelectorAll('.navbar-nav .nav-link');
    const indicator = document.querySelector('.navbar-indicator')
    /**
     * Mueve el indicador de la navbar de forma suave
     * SOLO si el indicador existe en el DOM
     */
    function moveIndicator(link) {
        if (!indicator || !link) return;
    
        const rect = link.getBoundingClientRect();
        const parentRect = link.closest('.navbar-nav').getBoundingClientRect();
    
        indicator.style.width = rect.width + 'px';
        indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    }

    // Posición inicial segura
    const activeLink = document.querySelector('.navbar-nav .nav-link.active');
    if (activeLink && indicator) {
        moveIndicator(activeLink);
    }

    links.forEach(link => {
        link.addEventListener('click', function (e) {
        
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
        
            // Estado activo
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        
            // Movimiento del indicador (seguro)
            moveIndicator(this);
        
            // Scroll suave
            if (targetSection && targetId.startsWith('#')) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        
            // Cierre automático en mobile
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    })
});  

// Script para o botão do WhatsApp

document.addEventListener('DOMContentLoaded', () => {
    /**
     * WhatsApp seguro y universal
     * - Abre WhatsApp APP en dispositivos móviles
     * - Abre WhatsApp Web en escritorio
     * - Funciona con múltiples botones
     * - Ofusación mejorada del número
     */

    const whatsappButtons = document.querySelectorAll('.whatsappBtn');
    
    if (!whatsappButtons.length) {
        console.warn('No se encontraron botones de WhatsApp');
        return;
    }

    // Configuración centralizada (fácil de mantener)
    const WHATSAPP_CONFIG = {
      
        phoneNumber: () => {
            const parts = [
                String.fromCodePoint(0x35, 0x35),     
                String.fromCodePoint(0x31, 0x31),     
                String.fromCodePoint(0x39, 0x35, 0x38, 0x38, 0x33), 
                String.fromCodePoint(0x38, 0x37, 0x38, 0x32)        
            ];
            return parts.join('');
        },
        defaultMessage: 'Olá! Vim pelo seu site Análise de Dados e gostaria de mais informações.',
        // Patrones mejorados para detección de móviles
        mobilePatterns: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
        urls: {
            mobile: (phone, message) => `whatsapp://send?phone=${phone}&text=${message}`,
            desktop: (phone, message) => `https://web.whatsapp.com/send?phone=${phone}&text=${message}`
        }
    };

    // Función para detectar si es dispositivo móvil
    const isMobileDevice = () => WHATSAPP_CONFIG.mobilePatterns.test(navigator.userAgent);

    // Función para generar la URL de WhatsApp
    const generateWhatsAppUrl = (phone, message = WHATSAPP_CONFIG.defaultMessage) => {
        const encodedMessage = encodeURIComponent(message);
        const urlGenerator = isMobileDevice() 
            ? WHATSAPP_CONFIG.urls.mobile 
            : WHATSAPP_CONFIG.urls.desktop;
        
        return urlGenerator(phone, encodedMessage);
    };

    // Función manejadora del clic
    const handleWhatsAppClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const phone = WHATSAPP_CONFIG.phoneNumber();
            const url = generateWhatsAppUrl(phone);
            
            // Abrir en nueva pestaña (mejor UX para escritorio)
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            
            // Seguridad: prevenir posibles vulnerabilidades
            if (newWindow) {
                newWindow.opener = null;
            }
            
            // Opcional: tracking de analytics
            console.log('WhatsApp click tracked:', { phone, isMobile: isMobileDevice() });
            
        } catch (error) {
            console.error('Error al abrir WhatsApp:', error);
            // Fallback: abrir WhatsApp Web como último recurso
            const fallbackUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIG.phoneNumber()}`;
            window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Añadir event listeners a todos los botones
    whatsappButtons.forEach(button => {
        // Prevenir múltiples listeners (en caso de SPA o re-render)
        button.removeEventListener('click', handleWhatsAppClick);
        button.addEventListener('click', handleWhatsAppClick);
        
        // Mejorar accesibilidad
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', button.getAttribute('aria-label') || 'Contactar por WhatsApp');
    });

    // Opcional: Exportar función para uso programático
    window.openWhatsApp = (customMessage = '') => {
        const phone = WHATSAPP_CONFIG.phoneNumber();
        const message = customMessage || WHATSAPP_CONFIG.defaultMessage;
        const url = generateWhatsAppUrl(phone, message);
        window.open(url, '_blank', 'noopener,noreferrer');
    };
});