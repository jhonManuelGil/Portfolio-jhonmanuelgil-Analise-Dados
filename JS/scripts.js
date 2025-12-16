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
    });

});