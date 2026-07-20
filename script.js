document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'dogShoppingCartV2';
    const ITEMS_PER_PAGE = 9;
    const LOREM_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    const products = [
        { id: 'hydraulic-excavator', name: 'Hydraulic Excavator', category: 'Excavators', condition: 'New', price: 45000, originalPrice: 52941, rating: 4.5, reviews: 156, popularity: 156, date: '2026-07-18', badge: '-15%' },
        { id: 'heavy-duty-bulldozer', name: 'Heavy-Duty Bulldozer', category: 'Bulldozers', condition: 'New', price: 75000, originalPrice: 93750, rating: 5, reviews: 289, popularity: 289, date: '2026-07-17', badge: '-20%' },
        { id: 'wheel-loader', name: 'Wheel Loader', category: 'Loaders', condition: 'Used', price: 38500, originalPrice: 42777, rating: 4.5, reviews: 201, popularity: 201, date: '2026-07-16', badge: '-10%' },
        { id: 'mobile-crane', name: 'Mobile Crane', category: 'Cranes', condition: 'New', price: 125000, originalPrice: 125000, rating: 5, reviews: 342, popularity: 342, date: '2026-07-15', badge: 'New' },
        { id: 'jackhammer', name: 'Jackhammer', category: 'Drills', condition: 'Refurbished', price: 2250, originalPrice: 3000, rating: 4, reviews: 567, popularity: 567, date: '2026-07-14', badge: '-25%' },
        { id: 'soil-compactor', name: 'Soil Compactor', category: 'Compactors', condition: 'Used', price: 18700, originalPrice: 21250, rating: 4.5, reviews: 423, popularity: 423, date: '2026-07-13', badge: '-12%' },
        { id: 'telescopic-handler', name: 'Telescopic Handler', category: 'Loaders', condition: 'New', price: 28500, originalPrice: 28500, rating: 5, reviews: 298, popularity: 298, date: '2026-07-12', badge: 'New' },
        { id: 'crawler-excavator', name: 'Crawler Excavator', category: 'Excavators', condition: 'Used', price: 62000, originalPrice: 71000, rating: 4.5, reviews: 214, popularity: 214, date: '2026-07-11', badge: '-13%' },
        { id: 'compact-excavator', name: 'Compact Excavator', category: 'Excavators', condition: 'Refurbished', price: 49500, originalPrice: 54889, rating: 4, reviews: 173, popularity: 173, date: '2026-07-10', badge: '-10%' },
        { id: 'large-excavator', name: 'Large Excavator', category: 'Excavators', condition: 'New', price: 68000, originalPrice: 76000, rating: 5, reviews: 198, popularity: 198, date: '2026-07-09', badge: '-11%' },
        { id: 'front-loader', name: 'Front Loader', category: 'Loaders', condition: 'Used', price: 42500, originalPrice: 49000, rating: 4.5, reviews: 188, popularity: 188, date: '2026-07-08', badge: '-13%' },
        { id: 'skid-steer-loader', name: 'Skid-Steer Loader', category: 'Loaders', condition: 'New', price: 32500, originalPrice: 34900, rating: 4.5, reviews: 246, popularity: 246, date: '2026-07-07', badge: '-7%' },
        { id: 'boom-lift', name: 'Boom Lift', category: 'Cranes', condition: 'Used', price: 54500, originalPrice: 60000, rating: 4, reviews: 141, popularity: 141, date: '2026-07-06', badge: '-9%' },
        { id: 'rough-terrain-crane', name: 'Rough-Terrain Crane', category: 'Cranes', condition: 'Refurbished', price: 98000, originalPrice: 108000, rating: 5, reviews: 167, popularity: 167, date: '2026-07-05', badge: '-9%' },
        { id: 'rotary-hammer-drill', name: 'Rotary Hammer Drill', category: 'Drills', condition: 'New', price: 980, originalPrice: 1200, rating: 4.5, reviews: 382, popularity: 382, date: '2026-07-04', badge: '-18%' },
        { id: 'demolition-hammer', name: 'Demolition Hammer', category: 'Drills', condition: 'Used', price: 1400, originalPrice: 1700, rating: 4, reviews: 264, popularity: 264, date: '2026-07-03', badge: '-18%' },
        { id: 'plate-compactor', name: 'Plate Compactor', category: 'Compactors', condition: 'New', price: 3500, originalPrice: 3900, rating: 4.5, reviews: 311, popularity: 311, date: '2026-07-02', badge: '-10%' },
        { id: 'road-roller', name: 'Road Roller', category: 'Compactors', condition: 'Used', price: 26500, originalPrice: 30000, rating: 4, reviews: 132, popularity: 132, date: '2026-07-01', badge: '-12%' },
        { id: 'mini-bulldozer', name: 'Mini Bulldozer', category: 'Bulldozers', condition: 'Refurbished', price: 14900, originalPrice: 17000, rating: 4.5, reviews: 119, popularity: 119, date: '2026-06-30', badge: '-12%' },
        { id: 'tower-crane', name: 'Tower Crane', category: 'Cranes', condition: 'New', price: 165000, originalPrice: 180000, rating: 5, reviews: 221, popularity: 221, date: '2026-06-29', badge: '-8%' }
    ].map(function (product) {
        return Object.assign({}, product, {
            description: LOREM_DESCRIPTION,
            image: 'img/logo-placeholder.png',
            imageAlt: product.name
        });
    });

    const catalogGrid = document.querySelector('.products-grid-large');
    const featuredGrid = document.getElementById('featured-products-grid');
    const sortSelect = document.getElementById('sort');
    const resultCountSpan = document.getElementById('result-count');
    const pageNumbers = document.getElementById('page-numbers');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const filterBtn = document.querySelector('.filter-btn');
    const resetFilterBtn = document.getElementById('reset-filter-btn');

    const state = {
        sortBy: sortSelect ? sortSelect.value : 'Newest',
        currentPage: 1,
        filters: {
            categories: [],
            conditions: [],
            priceRange: ''
        }
    };

    function setupCartLinks() {
        document.querySelectorAll('a[href$="shopping_cart.html"]').forEach(function (link) {
            link.classList.add('cart-link');
            if (!link.querySelector('.cart-count')) {
                const badge = document.createElement('span');
                badge.className = 'cart-count';
                badge.setAttribute('aria-label', 'Items in cart');
                badge.textContent = '0';
                link.appendChild(badge);
            }
        });
    }

    function formatMoney(value) {
        return '$' + Number(value).toLocaleString();
    }

    function getCart() {
        let rawCart = [];

        try {
            rawCart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (error) {
            rawCart = [];
        }

        const normalized = [];

        rawCart.forEach(function (item) {
            if (!item || !item.name) return;

            const quantity = Math.max(1, Number(item.quantity) || 1);
            const existing = normalized.find(function (entry) {
                return entry.id === item.id || entry.name === item.name;
            });

            if (existing) {
                existing.quantity += quantity;
            } else {
                normalized.push({
                    id: item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name: item.name,
                    price: Number(item.price) || 0,
                    image: item.image || 'img/logo-placeholder.png',
                    quantity: quantity
                });
            }
        });

        return normalized;
    }

    function saveCart(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    function getCartTotalItems() {
        return getCart().reduce(function (sum, item) {
            return sum + item.quantity;
        }, 0);
    }

    function updateCartCount(animate) {
        const totalItems = getCartTotalItems();

        document.querySelectorAll('.cart-count').forEach(function (cartCount) {
            cartCount.textContent = totalItems;
        });

        if (animate) {
            document.querySelectorAll('.cart-link').forEach(function (cartLink) {
                cartLink.classList.remove('cart-bump');
                void cartLink.offsetWidth;
                cartLink.classList.add('cart-bump');
            });
        }
    }

    function animateItemToCart(sourceElement) {
        const cartLink = document.querySelector('.cart-link');
        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!cartLink || !sourceElement || reduceMotion) {
            updateCartCount(true);
            return;
        }

        const sourceRect = sourceElement.getBoundingClientRect();
        const cartRect = cartLink.getBoundingClientRect();

        if (!sourceRect.width || !sourceRect.height) {
            updateCartCount(true);
            return;
        }

        const flyingItem = sourceElement.cloneNode(true);
        flyingItem.className = 'flying-cart-item';
        flyingItem.style.left = sourceRect.left + 'px';
        flyingItem.style.top = sourceRect.top + 'px';
        flyingItem.style.width = sourceRect.width + 'px';
        flyingItem.style.height = sourceRect.height + 'px';
        document.body.appendChild(flyingItem);

        const destinationX = cartRect.left + (cartRect.width / 2) - sourceRect.left - (sourceRect.width / 2);
        const destinationY = cartRect.top + (cartRect.height / 2) - sourceRect.top - (sourceRect.height / 2);

        requestAnimationFrame(function () {
            flyingItem.style.transform = 'translate(' + destinationX + 'px, ' + destinationY + 'px) scale(0.12) rotate(18deg)';
            flyingItem.style.opacity = '0.1';
        });

        let animationFinished = false;
        function finishCartAnimation() {
            if (animationFinished) return;
            animationFinished = true;
            flyingItem.remove();
            updateCartCount(true);
        }

        flyingItem.addEventListener('transitionend', finishCartAnimation, { once: true });
        setTimeout(finishCartAnimation, 900);
    }

    function addToCart(productId, quantity, sourceElement) {
        const product = products.find(function (item) {
            return item.id === productId;
        });

        if (!product) return null;

        const amount = Math.min(99, Math.max(1, Number(quantity) || 1));
        const cart = getCart();
        const existing = cart.find(function (item) {
            return item.id === product.id;
        });

        if (existing) {
            existing.quantity += amount;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: amount
            });
        }

        saveCart(cart);
        updateCartCount(false);
        animateItemToCart(sourceElement);
        return product;
    }

    function getSelectedValues(selector) {
        return Array.from(document.querySelectorAll(selector + ':checked')).map(function (input) {
            return input.value;
        });
    }

    function collectFilterValues() {
        state.filters.categories = getSelectedValues('input[name="category"]');
        state.filters.conditions = getSelectedValues('input[name="condition"]');
        const selectedPrice = document.querySelector('input[name="price"]:checked');
        state.filters.priceRange = selectedPrice ? selectedPrice.value : '';
    }

    function applyFilters(list) {
        return list.filter(function (product) {
            const categoryMatch = state.filters.categories.length === 0 || state.filters.categories.includes(product.category);
            const conditionMatch = state.filters.conditions.length === 0 || state.filters.conditions.includes(product.condition);
            let priceMatch = true;

            if (state.filters.priceRange === 'under-5000') {
                priceMatch = product.price < 5000;
            } else if (state.filters.priceRange === '5000-15000') {
                priceMatch = product.price >= 5000 && product.price <= 15000;
            } else if (state.filters.priceRange === '15000-50000') {
                priceMatch = product.price > 15000 && product.price <= 50000;
            } else if (state.filters.priceRange === '50000-plus') {
                priceMatch = product.price > 50000;
            }

            return categoryMatch && conditionMatch && priceMatch;
        });
    }

    function getSortedProducts(list) {
        const sorted = list.slice();

        if (state.sortBy === 'Price: Low to High') {
            sorted.sort(function (a, b) { return a.price - b.price; });
        } else if (state.sortBy === 'Price: High to Low') {
            sorted.sort(function (a, b) { return b.price - a.price; });
        } else if (state.sortBy === 'Best Rated') {
            sorted.sort(function (a, b) { return b.rating - a.rating; });
        } else if (state.sortBy === 'Most Popular') {
            sorted.sort(function (a, b) { return b.popularity - a.popularity; });
        } else {
            sorted.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
        }

        return sorted;
    }

    function renderStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let index = 0; index < fullStars; index += 1) {
            stars += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) stars += '<i class="fas fa-star-half-alt"></i>';

        for (let index = fullStars + (hasHalfStar ? 1 : 0); index < 5; index += 1) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    function createProductCard(product) {
        const badgeClass = product.badge === 'New' ? 'new-badge' : 'discount-badge';
        const originalPrice = product.originalPrice !== product.price
            ? '<span class="original-price">' + formatMoney(product.originalPrice) + '</span>'
            : '';

        return `
            <article class="product-card" data-id="${product.id}" tabindex="0" role="button" aria-label="View ${product.name} details">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.imageAlt}">
                    <span class="${badgeClass}">${product.badge}</span>
                </div>
                <div class="product-info">
                    <p class="product-meta">${product.category} | ${product.condition}</p>
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="rating">
                        ${renderStars(product.rating)}
                        <span>(${product.reviews} reviews)</span>
                    </div>
                    <div class="price-section">
                        <span class="price">${formatMoney(product.price)}</span>
                        ${originalPrice}
                    </div>
                    <button class="add-to-cart" type="button" data-product-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </article>
        `;
    }

    function renderFeaturedProducts() {
        if (!featuredGrid) return;
        featuredGrid.innerHTML = products.slice(0, 3).map(createProductCard).join('');
    }

    function renderPagination(totalPages) {
        if (!pageNumbers) return;

        pageNumbers.innerHTML = '';
        for (let page = 1; page <= totalPages; page += 1) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'page-btn' + (page === state.currentPage ? ' active' : '');
            button.dataset.page = page;
            button.textContent = page;
            pageNumbers.appendChild(button);
        }

        if (prevBtn) prevBtn.disabled = state.currentPage === 1;
        if (nextBtn) nextBtn.disabled = state.currentPage === totalPages;
    }

    function renderCatalogProducts() {
        if (!catalogGrid) return;

        const filteredProducts = applyFilters(products);
        const sortedProducts = getSortedProducts(filteredProducts);
        const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));

        if (state.currentPage > totalPages) state.currentPage = totalPages;

        const startIndex = (state.currentPage - 1) * ITEMS_PER_PAGE;
        const pageProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        catalogGrid.innerHTML = pageProducts.length
            ? pageProducts.map(createProductCard).join('')
            : '<p class="empty-products-message">No products match your selected filters.</p>';

        if (resultCountSpan) resultCountSpan.textContent = filteredProducts.length;
        renderPagination(totalPages);
    }

    function resetFilters() {
        document.querySelectorAll('input[name="category"], input[name="condition"], input[name="price"]').forEach(function (input) {
            input.checked = false;
        });

        state.filters.categories = [];
        state.filters.conditions = [];
        state.filters.priceRange = '';
        state.currentPage = 1;
        renderCatalogProducts();
    }

    const productModal = document.getElementById('product-modal');
    const modalName = document.getElementById('modal-product-name');
    const modalMeta = document.getElementById('modal-product-meta');
    const modalRating = document.getElementById('modal-product-rating');
    const modalDescription = document.getElementById('modal-product-description');
    const modalPrice = document.getElementById('modal-product-price');
    const modalOriginalPrice = document.getElementById('modal-product-original-price');
    const modalImage = document.getElementById('modal-product-image');
    const modalBadge = document.getElementById('modal-product-badge');
    const modalQuantity = document.getElementById('modal-quantity');
    const modalQtyMinus = document.getElementById('modal-qty-minus');
    const modalQtyPlus = document.getElementById('modal-qty-plus');
    const modalAddToCart = document.getElementById('modal-add-to-cart');
    const modalCartMessage = document.getElementById('modal-cart-message');
    let activeModalProductId = '';

    function openProductModal(productId) {
        if (!productModal) return;

        const product = products.find(function (item) {
            return item.id === productId;
        });

        if (!product) return;

        activeModalProductId = product.id;
        modalName.textContent = product.name;
        modalMeta.textContent = product.category + ' | ' + product.condition;
        modalRating.innerHTML = renderStars(product.rating) + '<span>(' + product.reviews + ' reviews)</span>';
        modalDescription.textContent = product.description;
        modalPrice.textContent = formatMoney(product.price);
        modalOriginalPrice.textContent = product.originalPrice !== product.price ? formatMoney(product.originalPrice) : '';
        modalImage.src = product.image;
        modalImage.alt = product.imageAlt;
        modalBadge.textContent = product.badge;
        modalBadge.className = 'modal-product-badge ' + (product.badge === 'New' ? 'is-new' : 'is-discount');
        modalQuantity.value = 1;
        modalCartMessage.textContent = '';
        modalAddToCart.classList.remove('added');
        modalAddToCart.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';

        productModal.classList.add('show');
        productModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        setTimeout(function () { modalQuantity.focus(); }, 100);
    }

    function closeProductModal() {
        if (!productModal) return;
        productModal.classList.remove('show');
        productModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    function changeModalQuantity(change) {
        const current = Math.max(1, Number(modalQuantity.value) || 1);
        modalQuantity.value = Math.min(99, Math.max(1, current + change));
    }

    function attachProductGridEvents(grid) {
        if (!grid) return;

        grid.addEventListener('click', function (event) {
            const addButton = event.target.closest('.add-to-cart');
            const card = event.target.closest('.product-card');

            if (addButton) {
                event.stopPropagation();
                const image = card ? card.querySelector('.product-image img') : null;
                const product = addToCart(addButton.dataset.productId, 1, image);

                if (product) {
                    addButton.classList.add('added');
                    addButton.innerHTML = '<i class="fas fa-check"></i> Added';
                    setTimeout(function () {
                        addButton.classList.remove('added');
                        addButton.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
                    }, 1000);
                }
                return;
            }

            if (card) openProductModal(card.dataset.id);
        });

        grid.addEventListener('keydown', function (event) {
            const card = event.target.closest('.product-card');
            if (!card || event.target.closest('button')) return;

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProductModal(card.dataset.id);
            }
        });
    }

    if (productModal) {
        productModal.addEventListener('click', function (event) {
            if (event.target.closest('[data-close-modal]')) closeProductModal();
        });

        modalQtyMinus.addEventListener('click', function () { changeModalQuantity(-1); });
        modalQtyPlus.addEventListener('click', function () { changeModalQuantity(1); });
        modalQuantity.addEventListener('change', function () {
            this.value = Math.min(99, Math.max(1, Number(this.value) || 1));
        });

        modalAddToCart.addEventListener('click', function () {
            const quantity = Math.min(99, Math.max(1, Number(modalQuantity.value) || 1));
            const product = addToCart(activeModalProductId, quantity, modalImage);
            if (!product) return;

            modalCartMessage.textContent = quantity + ' x ' + product.name + ' added to your cart.';
            modalAddToCart.classList.add('added');
            modalAddToCart.innerHTML = '<i class="fas fa-check"></i> Added to Cart';

            setTimeout(function () {
                modalAddToCart.classList.remove('added');
                modalAddToCart.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
            }, 1200);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && productModal.classList.contains('show')) {
                closeProductModal();
            }
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            state.sortBy = this.value;
            state.currentPage = 1;
            renderCatalogProducts();
        });
    }

    if (filterBtn) {
        filterBtn.addEventListener('click', function () {
            collectFilterValues();
            state.currentPage = 1;
            renderCatalogProducts();
        });
    }

    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', resetFilters);
    }

    if (pageNumbers) {
        pageNumbers.addEventListener('click', function (event) {
            const button = event.target.closest('.page-btn[data-page]');
            if (!button) return;
            state.currentPage = Number(button.dataset.page);
            renderCatalogProducts();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (state.currentPage > 1) {
                state.currentPage -= 1;
                renderCatalogProducts();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            const totalPages = Math.max(1, Math.ceil(applyFilters(products).length / ITEMS_PER_PAGE));
            if (state.currentPage < totalPages) {
                state.currentPage += 1;
                renderCatalogProducts();
            }
        });
    }

    const shopNowButton = document.querySelector('.cta-button');
    if (shopNowButton) {
        shopNowButton.addEventListener('click', function () {
            window.location.href = 'products.html';
        });
    }

    setupCartLinks();
    renderFeaturedProducts();
    renderCatalogProducts();
    attachProductGridEvents(featuredGrid);
    attachProductGridEvents(catalogGrid);
    updateCartCount(false);

    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutTotal = document.getElementById('checkout-total');
    const clearCartButton = document.getElementById('clear-cart-btn');
    const paymentForm = document.getElementById('payment-form');
    const paymentMethod = document.getElementById('payment-method');
    const paymentAmount = document.getElementById('payment-amount');
    const paymentSuccess = document.getElementById('payment-success');
    const successMessage = document.getElementById('success-message');

    if (cartItemsContainer && checkoutTotal) {
        let cart = getCart();

        function calculateCartTotal() {
            return cart.reduce(function (total, item) {
                return total + (item.price * item.quantity);
            }, 0);
        }

        function renderCart() {
            cart = getCart();

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
                checkoutTotal.textContent = formatMoney(0);

                if (paymentForm) {
                    paymentForm.reset();
                    if (paymentSuccess) paymentSuccess.classList.remove('show');
                    if (paymentForm.parentElement) paymentForm.parentElement.style.display = '';
                }
                return;
            }

            cartItemsContainer.innerHTML = cart.map(function (item) {
                return `
                    <div class="cart-item-row" data-id="${item.id}">
                        <div class="cart-item-information">
                            <strong>${item.name}</strong>
                            <span>${formatMoney(item.price)} each</span>
                        </div>
                        <div class="cart-item-actions">
                            <button type="button" class="qty-btn qty-minus" data-id="${item.id}">-</button>
                            <input class="qty-input" type="number" min="1" max="99" value="${item.quantity}" data-id="${item.id}" aria-label="Quantity for ${item.name}">
                            <button type="button" class="qty-btn qty-plus" data-id="${item.id}">+</button>
                            <button type="button" class="remove-cart-item" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
            }).join('');

            checkoutTotal.textContent = formatMoney(calculateCartTotal());
        }

        cartItemsContainer.addEventListener('click', function (event) {
            const minus = event.target.closest('.qty-minus');
            const plus = event.target.closest('.qty-plus');
            const remove = event.target.closest('.remove-cart-item');
            if (!minus && !plus && !remove) return;

            const control = minus || plus || remove;
            const updatedCart = getCart();
            const index = updatedCart.findIndex(function (item) {
                return item.id === control.dataset.id;
            });

            if (index === -1) return;

            if (minus) {
                updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity - 1);
            } else if (plus) {
                updatedCart[index].quantity = Math.min(99, updatedCart[index].quantity + 1);
            } else {
                updatedCart.splice(index, 1);
            }

            saveCart(updatedCart);
            cart = updatedCart;
            renderCart();
            updateCartCount(true);
        });

        cartItemsContainer.addEventListener('change', function (event) {
            const input = event.target.closest('.qty-input');
            if (!input) return;

            const quantity = Math.min(99, Math.max(1, Number(input.value) || 1));
            const updatedCart = getCart();
            const index = updatedCart.findIndex(function (item) {
                return item.id === input.dataset.id;
            });

            if (index === -1) return;

            updatedCart[index].quantity = quantity;
            saveCart(updatedCart);
            cart = updatedCart;
            renderCart();
            updateCartCount(true);
        });

        if (clearCartButton) {
            clearCartButton.addEventListener('click', function () {
                localStorage.removeItem(STORAGE_KEY);
                cart = [];
                renderCart();
                updateCartCount(true);
            });
        }

        if (paymentForm) {
            paymentForm.addEventListener('submit', function (event) {
                event.preventDefault();
                cart = getCart();

                if (cart.length === 0) {
                    alert('Your cart is empty.');
                    return;
                }

                const selectedMethod = paymentMethod.value;
                const enteredAmount = Number(paymentAmount.value);
                const requiredAmount = calculateCartTotal();

                if (!selectedMethod) {
                    alert('Please select a payment method.');
                    return;
                }

                if (enteredAmount <= 0) {
                    alert('Please enter a valid payment amount.');
                    return;
                }

                if (enteredAmount < requiredAmount) {
                    alert('Insufficient payment. Please enter at least ' + formatMoney(requiredAmount));
                    return;
                }

                if (successMessage) {
                    successMessage.textContent = 'Your mock payment of ' + formatMoney(enteredAmount) + ' using ' + selectedMethod + ' was successful.';
                }

                if (paymentSuccess) paymentSuccess.classList.add('show');
                if (paymentForm.parentElement) paymentForm.parentElement.style.display = 'none';
                localStorage.removeItem(STORAGE_KEY);
                updateCartCount(true);

                if (paymentSuccess) {
                    paymentSuccess.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        renderCart();
    }
});
