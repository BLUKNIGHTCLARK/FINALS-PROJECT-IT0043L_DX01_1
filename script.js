// Sorting and Pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort');
    const productGrid = document.querySelector('.products-grid-large');
    const resultCountSpan = document.getElementById('result-count');
    const itemsPerPage = 12;
    let currentPage = 1;
    let allProducts = [];

    // Get all product cards
    function getProductCards() {
        return Array.from(document.querySelectorAll('.products-grid-large .product-card'));
    }

    // Display products for the current page
    function displayPage(page) {
        const products = getProductCards();
        const totalPages = Math.ceil(products.length / itemsPerPage);
        
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        
        currentPage = page;

        // Hide all products
        products.forEach(product => {
            product.style.display = 'none';
        });

        // Show only products for current page
        const startIdx = (page - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        
        for (let i = startIdx; i < endIdx && i < products.length; i++) {
            products[i].style.display = '';
        }

        // Update active page button
        document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === page) {
                btn.classList.add('active');
            }
        });

        // Update prev/next button disabled state
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) prevBtn.disabled = page === 1;
        if (nextBtn) nextBtn.disabled = page === totalPages;

        // Update result counter
        if (resultCountSpan) {
            const showing = Math.min(endIdx, products.length);
            resultCountSpan.textContent = showing;
        }
    }

    // Sort products based on selected option
    function sortProducts(sortBy) {
        let products = getProductCards();

        switch(sortBy) {
            case 'Newest':
                products.sort((a, b) => {
                    const dateA = new Date(a.dataset.date || '2025-12-01');
                    const dateB = new Date(b.dataset.date || '2025-12-01');
                    return dateB - dateA;
                });
                break;

            case 'Price: Low to High':
                products.sort((a, b) => {
                    const priceA = parseInt(a.dataset.price || 0);
                    const priceB = parseInt(b.dataset.price || 0);
                    return priceA - priceB;
                });
                break;

            case 'Price: High to Low':
                products.sort((a, b) => {
                    const priceA = parseInt(a.dataset.price || 0);
                    const priceB = parseInt(b.dataset.price || 0);
                    return priceB - priceA;
                });
                break;

            case 'Best Rated':
                products.sort((a, b) => {
                    const ratingA = parseFloat(a.dataset.rating || 0);
                    const ratingB = parseFloat(b.dataset.rating || 0);
                    return ratingB - ratingA;
                });
                break;

            case 'Most Popular':
                products.sort((a, b) => {
                    const popA = parseInt(a.dataset.popularity || 0);
                    const popB = parseInt(b.dataset.popularity || 0);
                    return popB - popA;
                });
                break;
        }

        // Re-render products
        products.forEach(product => {
            productGrid.appendChild(product);
        });

        // Reset to page 1 after sorting
        displayPage(1);
    }

    // Add event listener to sort dropdown
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }

    // Add event listeners to pagination buttons
    document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.dataset.page);
            displayPage(page);
        });
    });

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            displayPage(currentPage - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            displayPage(currentPage + 1);
        });
    }

    // Add data attributes to existing products if missing
    const products = getProductCards();
    products.forEach((product, index) => {
        if (!product.dataset.price) {
            const priceText = product.querySelector('.price')?.textContent || '$0';
            const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
            product.dataset.price = price;
        }

        if (!product.dataset.rating) {
            const stars = product.querySelectorAll('.rating i');
            let rating = 0;
            stars.forEach(star => {
                if (star.classList.contains('fa-star')) rating += 1;
                if (star.classList.contains('fa-star-half-alt')) rating += 0.5;
            });
            product.dataset.rating = rating;
        }

        if (!product.dataset.date) {
            product.dataset.date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        }

        if (!product.dataset.popularity) {
            const reviewsText = product.querySelector('.rating span')?.textContent || '(0 reviews)';
            const popularity = parseInt(reviewsText.replace(/[^0-9]/g, '')) || 0;
            product.dataset.popularity = popularity;
        }
    });

    // Initialize pagination
    displayPage(1);

    // Filter functionality
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const checkedCategories = Array.from(document.querySelectorAll('.filter-group input[type="checkbox"]:checked'))
                .map(cb => cb.parentElement.textContent.trim());
            
            alert('Filters applied! Showing filtered results.');
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('.product-info h3').textContent;
            const price = this.closest('.product-card').querySelector('.price').textContent;
            alert(productName + ' (' + price + ') added to cart!');
        });
    });
});
