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

document.addEventListener('DOMContentLoaded', function () {

    /**
     * Redirección segura a WhatsApp.
     * - Funciona para TODOS los botones con clase .whatsappBtn
     * - El número no aparece en el HTML
     
     */

    const whatsappButtons = document.querySelectorAll('.whatsappBtn');
    if (!whatsappButtons.length) return;

    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            
            const p = String.fromCharCode(53, 53);

            
            const d = String.fromCharCode(49, 49);

           
            const n1 = String.fromCharCode(57, 53, 56, 56, 51);

            
            const n2 = String.fromCharCode(56, 55, 56, 50);

          
            const phone = p + d + n1 + n2;

            const message = encodeURIComponent(
                'Olá! Vim pelo seu site 🌐 de Análise de Dados e gostaria de mais informações.'
            );

            // Abre WhatsApp App / Web automáticamente
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
    });

});
