document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    menuToggle?.addEventListener('click', () => {
        const isHidden = sidebar.classList.contains('-translate-x-full');
        
        if (isHidden) {
            sidebar.classList.remove('-translate-x-full');
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            sidebar.classList.add('-translate-x-full');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}); 