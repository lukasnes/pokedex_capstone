const menuBtn = document.querySelector('[data-menu-btn]')
const sidebar = document.querySelector('[data-sidebar]')

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open')
})