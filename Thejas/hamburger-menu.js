<script>
    const hamburger = document.querySelector('.hamburg');
    const cancel = document.querySelector('.cancel');
    const navLinks = document.querySelector('.nav-container .links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.add('active');
    hamburger.style.display = 'none';
    cancel.style.display = 'block';
    });

    cancel.addEventListener('click', () => {
        navLinks.classList.remove('active');
    hamburger.style.display = 'block';
    cancel.style.display = 'none';
    });
</script>
