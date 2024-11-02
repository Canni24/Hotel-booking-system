// Lightbox effect
document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox';
        overlay.innerHTML = `
            <img src="${img.src}" alt="Image" class="lightbox-img">
            <span class="close">&times;</span>
        `;
        document.body.appendChild(overlay);
        
        // Close the lightbox when the close button is clicked
        const closeBtn = overlay.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        // Close the lightbox when clicking outside the image
        overlay.addEventListener('click', (e) => {
            if (e.target !== overlay.querySelector('.lightbox-img')) {
                document.body.removeChild(overlay);
            }
        });
    });
});
