gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".stack-card");

cards.forEach((card, i) => {
    // Only animate cards that aren't the last one
    if (i !== cards.length - 1) {
        gsap.to(card, {
            scale: 0.9,      // Shrink slightly as next card comes up
            opacity: 0.5,    // Fade out for depth
            scrollTrigger: {
                trigger: card,
                start: "top 10%", // When card hits the sticky top
                endTrigger: ".stack-section",
                end: "bottom bottom",
                scrub: true,
                pinSpacing: false
            }
        });
    }
});

// Horizontal Parallax for images inside cards
cards.forEach((card) => {
    const img = card.querySelector("img");
    gsap.to(img, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});
// --- LIVE PERFORMANCE COUNTER ENGINE ---
const stats = document.querySelectorAll(".stat-value");

stats.forEach((stat) => {
    const target = parseFloat(stat.getAttribute("data-target"));
    const isDecimal = stat.getAttribute("data-decimal") === "true";

    gsap.to(stat, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: stat,
            start: "top 90%", // Starts when the number enters the viewport
            toggleActions: "play none none none"
        },
        snap: { innerText: isDecimal ? 0.1 : 1 }, // Steps of 1, or 0.1 for decimals
        onUpdate: function() {
            // Add a '+' or 's' if needed
            if(target === 120) stat.innerText += "+";
            if(isDecimal) stat.innerText = parseFloat(stat.innerText).toFixed(1) + "s";
        }
    });
});