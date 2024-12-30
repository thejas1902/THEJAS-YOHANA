document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav .links a");

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, 
                    behavior: "smooth"
                });
            }
        });
    });

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove("active"));
                    if (navLink) navLink.classList.add("active");
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach(section => observer.observe(section));
});
