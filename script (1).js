/* ============================================
☕ DRINKPEDIA - COMPLETE SCRIPT (FIXED)
============================================ */

/* ==================== DATA MINUMAN ==================== */
const drinksData = {
    coffee: {
        name: 'Coffee', icon: '☕',
        tabs: ['All', 'Hot', 'Cold', 'Specialty'],
        drinks: [
            { name: 'Espresso', price: 18000, type: 'Hot', origin: 'Italy', year: '1884',
              description: 'Minuman kopi pekat yang dibuat dengan mengekstrak biji kopi yang digiling halus dengan air panas bertekanan tinggi.',
              ingredients: '• 18-20g kopi Arabica/Robusta grind halus\n• Air panas 90-96°C\n• Tekanan 9 bar\n• Volume: 30ml',
              history: 'Espresso diciptakan di Turin, Italia oleh Angelo Moriondo (1884). Disempurnakan Luigi Bezzera (1901).' },
            { name: 'Cappuccino', price: 25000, type: 'Hot', origin: 'Italy', year: '1900s',
              description: 'Minuman kopi Italia dengan espresso, steamed milk, dan milk foam perbandingan 1:1:1.',
              ingredients: '• 1 shot espresso (30ml)\n• 60ml steamed milk\n• 60ml milk foam\n• Optional: cocoa/cinnamon',
              history: 'Berkembang di Italia awal 1900-an. Nama dari ordo Capuchin karena warna mirip jubah biarawan.' },
            { name: 'Latte', price: 28000, type: 'Hot', origin: 'Italy', year: '1950s',
              description: 'Caffè Latte: espresso + steamed milk + microfoam tipis. Lebih creamy dari cappuccino.',
              ingredients: '• 1-2 shot espresso\n• 180-240ml steamed milk\n• Thin microfoam layer',
              history: 'Populer di Italia 1950-an. Tren global via Starbucks (1980-90an). Latte art berkembang di Seattle.' },
            { name: 'Americano', price: 22000, type: 'Hot', origin: 'Italy/Europe', year: 'WWII Era',
              description: 'Espresso + air panas. Rasa mirip drip coffee tapi dengan karakter espresso.',
              ingredients: '• 1-2 shot espresso\n• 120-180ml air panas\n• Optional: gula/susu',
              history: 'Diciptakan tentara Amerika di Italia saat WWII. Mencairkan espresso agar mirip kopi filter rumah.' },
            { name: 'Cold Brew', price: 32000, type: 'Cold', origin: 'Japan/USA', year: '1600s/1960s',
              description: 'Kopi seduh dingin 12-24 jam. Smooth, less acidic, manis alami.',
              ingredients: '• 100g coarse ground coffee\n• 1L air dingin\n• Rasio 1:8-1:10\n• Steeping: 12-24 jam',
              history: 'Metode Kyoto-style (Jepang, abad 17). Populer di Amerika 1960-an. Modern via Todd Simpson (2000-an).' },
            { name: 'V60 Pour Over', price: 35000, type: 'Hot', origin: 'Japan', year: '2004',
              description: 'Manual brewing dengan dripper kerucut. Hasil: clean, bright, kompleks.',
              ingredients: '• 15g medium-fine ground\n• 250ml air 92-96°C\n• Rasio 1:16-1:17\n• Brew time: 2-3 menit',
              history: 'Dikembangkan Hario (Jepang, 2004). "V" = kerucut, "60" = sudut 60°. Populer di third wave coffee.' },
            { name: 'Affogato', price: 38000, type: 'Specialty', origin: 'Italy', year: '1950s',
              description: 'Dessert coffee: vanilla gelato + shot espresso panas. Perpaduan panas-dingin, pahit-manis.',
              ingredients: '• 2 scoop vanilla gelato\n• 1-2 shot hot espresso\n• Optional: amaretto/biscotti',
              history: 'Asal Italia 1950-an. "Affogato" = "tenggelam" (es krim drowning dalam espresso).' }
        ]
    },
    soda: {
        name: 'Soda & Fizz', icon: '🥤',
        tabs: ['All', 'Classic', 'Mocktail', 'Energy'],
        drinks: [
            { name: 'Classic Cola', price: 15000, type: 'Classic', origin: 'USA', year: '1886',
              description: 'Soda dengan rasa kola nut + vanilla. Manis, asam, carbonation menyegarkan.',
              ingredients: '• Carbonated water\n• Sugar/HFCS\n• Caramel color\n• Phosphoric acid\n• Natural flavors',
              history: 'Coca-Cola oleh Dr. John Pemberton (Atlanta, 1886). Awalnya obat patent di Jacobs\' Pharmacy.' },
            { name: 'Lemon-Lime Soda', price: 15000, type: 'Classic', origin: 'USA', year: '1929',
              description: 'Soda lemon-lime segar. Clear, crisp, carbonation tinggi.',
              ingredients: '• Carbonated water\n• Sugar/HFCS\n• Citric acid\n• Natural lemon & lime flavors',
              history: '7Up oleh Charles Leiper Grigg (1929). Awalnya "Bib-Label Lithiated Lemon-Lime Soda".' },
            { name: 'Ginger Ale', price: 18000, type: 'Classic', origin: 'Ireland/Canada', year: '1850s',
              description: 'Soda rasa jahe spicy. Varian: Golden (strong) & Dry/Pale (mild).',
              ingredients: '• Carbonated water\n• Sugar\n• Ginger extract\n• Citric acid\n• Natural flavors',
              history: 'Irlandia 1850-an. Canada Dry oleh John McLaughlin (1904) jadi standar modern.' },
            { name: 'Virgin Mojito', price: 28000, type: 'Mocktail', origin: 'Cuba', year: '1500s/1900s',
              description: 'Mocktail mint + lime + soda water. Segar, non-alkohol, perfect untuk cuaca panas.',
              ingredients: '• Fresh mint (10-12 leaves)\n• ½ lime juice\n• 2 tsp sugar\n• Soda water\n• Ice',
              history: 'Havana, Kuba abad 16. Awalnya obat petani tebu. Hemingway populerkan di El Floridita (1930-40an).' },
            { name: 'Virgin Piña Colada', price: 32000, type: 'Mocktail', origin: 'Puerto Rico', year: '1954',
              description: 'Mocktail tropis creamy: nanas + kelapa. Signature Puerto Rico yang refreshing.',
              ingredients: '• 120ml pineapple juice\n• 60ml coconut cream\n• 60ml heavy cream\n• 2 cups ice',
              history: 'Oleh Ramón "Monchito" Marrero di Caribe Hilton (1954). Official drink Puerto Rico (1978).' },
            { name: 'Energy Drink', price: 25000, type: 'Energy', origin: 'Thailand/Japan', year: '1960s/1997',
              description: 'Minuman berenergi: kafein + taurine + B-vitamins. Boost energi & fokus.',
              ingredients: '• Carbonated water\n• Sugar/sweeteners\n• Caffeine (80mg)\n• Taurine\n• B-vitamins',
              history: 'Lipovitan (Jepang, 1962). Krating Daeng (Thailand, 1976). Red Bull global oleh Mateschitz (1987).' }
        ]
    },
    healthy: {
        name: 'Healthy & Others', icon: '🍃',
        tabs: ['All', 'Tea', 'Juice', 'Smoothie'],
        drinks: [
            { name: 'Green Tea', price: 20000, type: 'Tea', origin: 'China', year: '2737 BC',
              description: 'Teh Camellia sinensis tidak teroksidasi. Kaya antioksidan (catechins), banyak manfaat kesehatan.',
              ingredients: '• 1 tsp green tea leaves/matcha\n• 200ml air 70-80°C\n• Optional: honey/lemon',
              history: 'Ditemukan Kaisar Shen Nung (China, 2737 SM). Bagian integral budaya China & Jepang ribuan tahun.' },
            { name: 'Earl Grey Tea', price: 22000, type: 'Tea', origin: 'England', year: '1830s',
              description: 'Teh hitam + minyak bergamot. Aroma citrus khas, rasa sophisticated.',
              ingredients: '• 1 Earl Grey tea bag\n• 200ml boiling water\n• Optional: milk/sugar/lemon',
              history: 'Dinamai Charles Grey, PM Inggris (1830-34). Bergamot oil untuk tiru rasa teh China langka.' },
            { name: 'Fresh Orange Juice', price: 25000, type: 'Juice', origin: 'Global', year: 'Ancient times',
              description: 'Jus jeruk segar kaya vitamin C. Menyegarkan, best consumed fresh untuk nutrisi maksimal.',
              ingredients: '• 3-4 fresh oranges\n• Optional: pulp for fiber\n• Ice (optional)\n• Yield: ~200ml',
              history: 'Jeruk dari Asia Tenggara ribuan tahun. Jus populer di Amerika awal 1900-an. Pasteurization (1940s) buat massal.' },
            { name: 'Green Smoothie', price: 35000, type: 'Smoothie', origin: 'USA', year: '1990s',
              description: 'Smoothie sehat: spinach/kale + buah. Kaya nutrisi, fiber, vitamins. Perfect breakfast/detox.',
              ingredients: '• 2 cups spinach/kale\n• 1 frozen banana\n• ½ cup pineapple/mango\n• 1 cup almond water',
              history: 'Dipopulerkan Victoria Boutenko (1990-an) via "Green Smoothie Revolution". Trend global 2010-an.' },
            { name: 'Berry Smoothie', price: 38000, type: 'Smoothie', origin: 'USA', year: '1970s',
              description: 'Smoothie mixed berries: strawberry, blueberry, raspberry. Kaya antioksidan, rasa manis-asam segar.',
              ingredients: '• ½ cup mixed berries (frozen)\n• 1 banana\n• 1 cup yogurt\n• ½ cup milk\n• 1 tsp honey',
              history: 'Trend California 1970-an via health food stores. Steven Kuhnau buat blender komersial pertama.' },
            { name: 'Matcha Latte', price: 32000, type: 'Tea', origin: 'Japan', year: '12th century',
              description: 'Matcha powder + steamed milk. Creamy, earthy, sedikit pahit. Kaya antioksidan.',
              ingredients: '• 1-2 tsp matcha (ceremonial)\n• 60ml hot water 80°C\n• 180ml steamed milk\n• 1-2 tsp honey',
              history: 'Matcha dari China (abad 9), dibawa biksu Buddha ke Jepang (abad 12). Tea ceremony Jepang. Populer global 2000-an.' }
        ]
    }
};

/* ==================== GLOBAL VARIABLES ==================== */
let currentCategory = null;
let currentTab = 'All';
let cart = [];

/* ==================== VIEWPORT HEIGHT FIX ==================== */
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH, { passive: true });

/* ==================== NAVIGATION ==================== */
function goToStep2() {
    document.getElementById('step-1').style.display = 'none';
    document.getElementById('step-2').style.display = 'flex';
    window.scrollTo(0, 0);
}

function goToStep3() {
    document.getElementById('step-2').style.display = 'none';
    document.getElementById('step-3').style.display = 'block';
    window.scrollTo(0, 0);
}

/* ==================== CATEGORY MODAL ==================== */
function openCategoryModal(category) {
    currentCategory = category;
    const data = drinksData[category];
    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalCategoryName').textContent = data.name;
    
    const tabNav = document.getElementById('tabNav');
    tabNav.innerHTML = '';
    data.tabs.forEach((tab, index) => {
        const btn = document.createElement('button');
        btn.className = 'tab-btn' + (index === 0 ? ' active' : '');
        btn.textContent = tab;
        btn.onclick = () => switchTab(tab, btn);
        tabNav.appendChild(btn);
    });
    
    currentTab = data.tabs[0];
    renderTable(data.drinks);
    
    document.getElementById('categoryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
    document.body.style.overflow = '';
    currentCategory = null;
}

function closeCategoryModalOnOverlay(event) {
    if (event.target === event.currentTarget) closeCategoryModal();
}

function switchTab(tab, btn) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const data = drinksData[currentCategory];
    renderTable(data.drinks);
}

function renderTable(drinks) {
    const filteredDrinks = currentTab === 'All' ? drinks : drinks.filter(d => d.type === currentTab);
    
    let tableHTML = `
        <table class="drink-table">
            <thead>
                <tr>
                    <th>Nama Minuman</th>
                    <th>Tipe</th>
                    <th>Asal</th>
                    <th>Harga</th>
                </tr>
            </thead>
            <tbody>
                ${filteredDrinks.map(drink => `
                    <tr onclick="showDrinkDetail('${currentCategory}', '${drink.name}')">
                        <td class="drink-name">${drink.name}</td>
                        <td class="drink-type">${drink.type}</td>
                        <td class="drink-origin">${drink.origin}</td>
                        <td class="drink-name">${formatRupiah(drink.price)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div class="table-hint">💡 Klik pada minuman untuk melihat detail lengkap</div>
    `;
    document.getElementById('tabContent').innerHTML = tableHTML;
}

/* ==================== DETAIL MODAL ==================== */
function showDrinkDetail(category, drinkName) {
    const data = drinksData[category];
    const drink = data.drinks.find(d => d.name === drinkName);
    if (!drink) return;

    document.getElementById('detailTitle').textContent = drink.name;
    document.getElementById('detailSubtitle').textContent = `${drink.type} • ${drink.origin}`;
    document.getElementById('detailOrigin').textContent = drink.origin;
    document.getElementById('detailYear').textContent = drink.year;
    document.getElementById('detailDescription').textContent = drink.description;
    document.getElementById('detailIngredients').innerHTML = drink.ingredients.replace(/\n/g, '<br>');
    document.getElementById('detailHistory').textContent = drink.history;

    // Add/Update Add to Cart button
    let addToCartBtn = document.getElementById('detailAddToCartBtn');
    if (!addToCartBtn) {
        addToCartBtn = document.createElement('button');
        addToCartBtn.id = 'detailAddToCartBtn';
        addToCartBtn.className = 'btn-checkout';
        addToCartBtn.style.marginTop = '20px';
        addToCartBtn.innerHTML = '🛒 Tambah ke Keranjang';
        document.querySelector('.detail-content').appendChild(addToCartBtn);
    }
    addToCartBtn.onclick = () => {
        addToCart(category, drink.name);
        closeDetailModal();
        // Optional: auto open cart
        // toggleCart(); 
    };

    document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('active');
}

function closeDetailModalOnOverlay(event) {
    if (event.target === event.currentTarget) closeDetailModal();
}

/* ==================== CART SYSTEM ==================== */
function loadCart() {
    try {
        const saved = localStorage.getItem('drinkpedia_cart');
        cart = saved ? JSON.parse(saved) : [];
    } catch (e) {
        cart = [];
        console.error('Error loading cart:', e);
    }
}

function saveCart() {
    localStorage.setItem('drinkpedia_cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(category, drinkName) {
    const data = drinksData[category];
    const drink = data.drinks.find(d => d.name === drinkName);
    if (!drink) {
        showNotification('❌ Minuman tidak ditemukan', 'error');
        return;
    }

    const existing = cart.find(item => item.name === drinkName);
    if (existing) {
        existing.qty++;
        showNotification(`✅ ${drinkName} +1`, 'success');
    } else {
        cart.push({
            id: Date.now(),
            name: drink.name,
            price: drink.price,
            category: category,
            qty: 1
        });
        showNotification(`✅ ${drinkName} ditambahkan`, 'success');
    }
    saveCart();
    renderCartItems();
}

function updateQty(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    item.qty += change;
    if (item.qty <= 0) {
        removeFromCart(itemId);
        return;
    }
    saveCart();
    renderCartItems();
}

function removeFromCart(itemId) {
    const item = cart.find(i => i.id === itemId);
    const name = item ? item.name : 'Item';
    cart = cart.filter(i => i.id !== itemId);
    saveCart();
    renderCartItems();
    showNotification(`🗑️ ${name} dihapus`, 'info');
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('🗑️ Kosongkan seluruh keranjang?')) {
        cart = [];
        saveCart();
        renderCartItems();
        showNotification('🗑️ Keranjang dikosongkan', 'info');
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');
    
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div style="font-size:48px;margin-bottom:15px">🛒</div>
                <p>Keranjang masih kosong</p>
                <p style="font-size:13px;color:var(--text-muted);margin-top:10px">Yuk explore menu dan pesan minuman favoritmu!</p>
            </div>`;
        if (footer) footer.style.display = 'none';
        return;
    }

    let total = 0;
    let html = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-meta">${formatRupiah(item.price)} × ${item.qty}</div>
                </div>
                <div class="cart-item-price">${formatRupiah(itemTotal)}</div>
                <div class="cart-item-qty">
                    <button class="cart-qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                    <span style="font-size:14px;font-weight:600;min-width:20px;text-align:center">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>`;
    });
    html += `<button onclick="clearCart()" style="width:100%;margin-top:15px;padding:10px;background:transparent;border:1px dashed var(--border-color);color:var(--text-muted);border-radius:8px;cursor:pointer;font-size:13px">🗑️ Kosongkan Keranjang</button>`;
    
    container.innerHTML = html;
    if (totalEl) totalEl.textContent = formatRupiah(total);
    if (footer) footer.style.display = 'block';
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.textContent = totalQty;
        badge.style.display = totalQty > 0 ? 'block' : 'none';
        if (totalQty > 0) {
            badge.style.animation = 'none';
            badge.offsetHeight; /* trigger reflow */
            badge.style.animation = 'pulse 0.3s ease';
        }
    }
}

/* ==================== CHECKOUT & WHATSAPP ==================== */
function checkoutWhatsApp() {
    if (cart.length === 0) {
        showNotification('⚠️ Keranjang masih kosong', 'warning');
        return;
    }

    // 1. Generate Order ID Unik
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(100 + Math.random() * 900);
    const orderId = `DP-${date}-${random}`;

    // 2. Siapkan Data Order
    let total = 0;
    const items = cart.map(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        return {
            name: item.name,
            price: item.price,
            qty: item.qty,
            note: '' 
        };
    });

    const newOrder = {
        id: orderId,
        timestamp: new Date().toISOString(),
        table: 'Walk-in',
        customer: 'Pelanggan Umum',
        items: items,
        total: total,
        status: 'pending_payment',
        notes: 'Order dari Web Pembeli'
    };

    // 3. Simpan ke LocalStorage (Kunci yang sama dengan Admin)
    try {
        const existingOrders = JSON.parse(localStorage.getItem('drinkpedia_orders') || '[]');
        existingOrders.unshift(newOrder);
        localStorage.setItem('drinkpedia_orders', JSON.stringify(existingOrders));
    } catch (e) {
        showNotification('❌ Gagal menyimpan pesanan', 'error');
        return;
    }

    // 4. Tampilkan Order ID ke Pelanggan (Modal Sukses)
    showOrderSuccess(orderId, total);

    // 5. Kosongkan Keranjang
    cart = [];
    saveCart();

    // 6. Redirect ke WhatsApp (OPSIONAL - Aktifkan jika ingin langsung kirim WA)
    // GANTI NOMOR DI BAWAH INI DENGAN NOMOR TOKO ANDA (Format: 628...)
    const phoneNumber = "628123456789"; 
    const message = `Halo DrinkPedia, saya ingin konfirmasi pesanan.\n\n*Order ID:* ${orderId}\n*Total:* ${formatRupiah(total)}\n\nMohon infonya untuk pembayaran. Terima kasih!`;
    
    // Uncomment baris bawah ini jika ingin langsung membuka WhatsApp
    // window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

function showOrderSuccess(orderId, total) {
    // Hapus modal lama jika ada
    const oldModal = document.getElementById('successModal');
    if (oldModal) oldModal.remove();

    const modalHTML = `
        <div id="successModal" class="detail-modal active" style="z-index: 5000;" onclick="if(event.target === this) this.remove()">
            <div class="detail-content" style="text-align:center;">
                <div style="font-size:60px;margin-bottom:10px">✅</div>
                <h2 style="color:var(--accent-gold);margin-bottom:10px">Pesanan Diterima!</h2>
                <p style="color:var(--text-secondary);margin-bottom:20px">Silakan tunjukkan Kode Order ini ke kasir untuk melakukan pembayaran.</p>
                
                <div style="background: var(--card-bg); padding: 20px; border-radius: 12px; border: 2px dashed var(--accent-gold); margin-bottom: 20px;">
                    <p style="font-size: 14px; color: var(--text-muted);">KODE ORDER ANDA</p>
                    <p style="font-size: 32px; font-weight: 700; color: var(--text-primary); letter-spacing: 2px;">${orderId}</p>
                    <p style="font-size: 18px; color: var(--accent-gold); margin-top: 10px;">Total: ${formatRupiah(total)}</p>
                </div>

                <button onclick="document.getElementById('successModal').remove()" class="btn-checkout">
                    Tutup
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/* ==================== CART MODAL TOGGLE ==================== */
function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    const isActive = modal.classList.contains('active');
    modal.classList.toggle('active');
    document.body.style.overflow = isActive ? '' : 'hidden';
    if (!isActive) renderCartItems();
}

function closeCartOnOverlay(event) {
    if (event.target === event.currentTarget) toggleCart();
}

/* ==================== UTILS ==================== */
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
    const notification = document.createElement('div');
    notification.className = `cart-notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]||'ℹ️'}</span>
        <span class="notification-text">${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ==================== ANTI-COPY PROTECTION ==================== */
(function() {
    'use strict';
    const CONFIG = {
        showWarning: true,
        warningDuration: 3000,
        allowSelectOnInput: true,
        consoleWarning: true
    };

    function showWarningMessage(msg) {
        if (!CONFIG.showWarning) return;
        const existing = document.querySelector('.copy-warning-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'copy-warning-toast';
        toast.innerHTML = `<div class="toast-icon">⚠️</div><div class="toast-text">${msg||'Konten dilindungi hak cipta'}</div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, CONFIG.warningDuration);
    }

    document.addEventListener('contextmenu', function(e) {
        if (CONFIG.allowSelectOnInput && (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')) return;
        e.preventDefault();
        showWarningMessage('⛔ Klik kanan dinonaktifkan');
        return false;
    }, true);

    document.addEventListener('keydown', function(e) {
        const blocked = [
            {ctrl:true,key:'c'},{ctrl:true,key:'C'},{ctrl:true,key:'u'},{ctrl:true,key:'U'},
            {ctrl:true,key:'s'},{ctrl:true,key:'S'},{key:'F12'}
        ];
        const isBlocked = blocked.some(sc => {
            const ctrl = sc.ctrl ? (e.ctrlKey||e.metaKey) : true;
            return ctrl && e.key===sc.key;
        });

        if (isBlocked) {
            e.preventDefault();
            showWarningMessage('⛔ Aksi ini dinonaktifkan');
            return false;
        }
    }, true);

    if (CONFIG.consoleWarning) {
        console.log('%c⚠️ DRINKPEDIA PROTECTED', 'color:#c9a961;font-size:16px;font-weight:bold');
        console.log('%c© 2026 DrinkPedia Project - All Rights Reserved', 'color:#c9b8a8;font-size:12px');
    }
})();

/* ==================== KEYBOARD SHORTCUTS ==================== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCategoryModal();
        closeDetailModal();
        const cartModal = document.getElementById('cartModal');
        if (cartModal?.classList.contains('active')) toggleCart();
        const successModal = document.getElementById('successModal');
        if (successModal) successModal.remove();
    }
});

/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartBadge();
    renderCartItems();
    console.log('%c✅ DrinkPedia Loaded', 'color:#c9a961;font-weight:bold');
});

/* ============================================
🔒 DRINKPEDIA - ULTRA ANTI COPY PROTECTION
============================================ */
(function() {
    'use strict';

    // ==================== KONFIGURASI ====================
    const CONFIG = {
        showWarning: true,
        warningDuration: 3000,
        allowSelectOnInput: true,
        consoleWarning: true,
        watermark: true,
        watermarkText: '© DrinkPedia 2026 - Protected',
        blockDevTools: true,
        devToolsRedirect: true,
        redirectUrl: 'about:blank',
        maxDevToolsWarnings: 3,
        debugThreshold: 160
    };

    // ==================== STATE ====================
    let state = {
        devToolsWarnings: 0,
        lastDevToolsCheck: 0,
        isDevToolsOpen: false,
        consoleCleared: false
    };

    // ==================== TOAST NOTIFICATION ====================
    function showToast(message, type = 'warning', duration = CONFIG.warningDuration) {
        if (!CONFIG.showWarning) return;

        const existing = document.querySelector('.copy-warning-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'copy-warning-toast';
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span>
            <span class="toast-text">${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ==================== DISABLE RIGHT CLICK ====================
    document.addEventListener('contextmenu', function(e) {
        if (CONFIG.allowSelectOnInput && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        showToast('⛔ Klik kanan dinonaktifkan', 'warning');
        return false;
    }, true);

    // ==================== DISABLE TEXT SELECTION ====================
    document.addEventListener('selectstart', function(e) {
        if (CONFIG.allowSelectOnInput && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
            return;
        }
        if (e.target.tagName === 'BUTTON' || e.target.closest('.no-select-block')) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    document.addEventListener('mousedown', function(e) {
        if (e.detail > 1) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    // ==================== DISABLE DRAG & DROP ====================
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        showToast('⛔ Drag & drop dinonaktifkan', 'warning');
        return false;
    }, true);

    document.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }, true);

    // ==================== BLOCK KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', function(e) {
        const ctrl = e.ctrlKey || e.metaKey;
        const shift = e.shiftKey;
        const alt = e.altKey;
        const key = e.key.toLowerCase();

        // Daftar shortcut yang diblokir
        const blocked = [
            { ctrl: true, key: 'c' },      // Ctrl+C (Copy)
            { ctrl: true, key: 'x' },      // Ctrl+X (Cut)
            { ctrl: true, key: 'v' },      // Ctrl+V (Paste)
            { ctrl: true, key: 'u' },      // Ctrl+U (View Source)
            { ctrl: true, key: 's' },      // Ctrl+S (Save)
            { ctrl: true, key: 'p' },      // Ctrl+P (Print)
            { ctrl: true, key: 'a' },      // Ctrl+A (Select All)
            { ctrl: true, key: 'f' },      // Ctrl+F (Find)
            { ctrl: true, key: 'h' },      // Ctrl+H (History)
            { ctrl: true, shift: true, key: 'i' },  // Ctrl+Shift+I (DevTools)
            { ctrl: true, shift: true, key: 'j' },  // Ctrl+Shift+J (Console)
            { ctrl: true, shift: true, key: 'c' },  // Ctrl+Shift+C (Inspect)
            { ctrl: true, shift: true, key: 'k' },  // Ctrl+Shift+K (Clear Console)
            { ctrl: true, alt: true, key: 'i' },    // Ctrl+Alt+I
            { ctrl: true, alt: true, key: 'j' },    // Ctrl+Alt+J
            { key: 'f12' },                // F12 (DevTools)
            { key: 'printscreen' },        // PrintScreen
            { key: 'prtsc' },
            { key: 'scrolllock' },
            { key: 'pause' }
        ];

        const isBlocked = blocked.some(sc => {
            const ctrlMatch = sc.ctrl ? ctrl : true;
            const shiftMatch = sc.shift ? shift : true;
            const altMatch = sc.alt ? alt : true;
            return ctrlMatch && shiftMatch && altMatch && key === sc.key.toLowerCase();
        });

        if (isBlocked) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            let msg = '⛔ Aksi ini dinonaktifkan';
            if (['c'].includes(key)) msg = '⛔ Copy tidak diizinkan';
            if (['x'].includes(key)) msg = '⛔ Cut tidak diizinkan';
            if (['v'].includes(key)) msg = '⛔ Paste tidak diizinkan';
            if (['u'].includes(key)) msg = '⛔ View Source dilindungi';
            if (['s'].includes(key)) msg = '⛔ Save Page diblokir';
            if (['p'].includes(key)) msg = '⛔ Print diblokir';
            if (['f12', 'printscreen', 'prtsc'].includes(key)) msg = '⛔ Developer Tools dibatasi';
            if (['i', 'j'].includes(key) && shift) msg = '⛔ Inspect Element diblokir';

            showToast(msg, 'warning');
            
            // Log attempt
            console.warn('🔒 Blocked action:', key, e);
            
            return false;
        }
    }, true);

    document.addEventListener('keyup', function(e) {
        if (e.key === 'PrintScreen' || e.key === 'PrtSc') {
            showToast('⛔ Screenshot terdeteksi!', 'warning');
        }
    }, true);

    // ==================== PROTECT IMAGES ====================
    function protectImages() {
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('draggable', 'false');
            img.setAttribute('oncontextmenu', 'return false;');
            img.style.pointerEvents = 'none';
            img.style.userSelect = 'none';
            img.style.webkitUserSelect = 'none';

            // Tambah overlay jika belum ada
            if (!img.parentElement.classList.contains('img-protect-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'img-protect-wrapper';
                wrapper.style.position = 'relative';
                wrapper.style.display = 'inline-block';

                const overlay = document.createElement('div');
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.background = 'transparent';
                overlay.style.zIndex = '10';

                if (img.parentNode) {
                    img.parentNode.insertBefore(wrapper, img);
                    wrapper.appendChild(img);
                    wrapper.appendChild(overlay);
                }
            }
        });
    }

    // ==================== ADD PROTECTION STYLES ====================
    function addProtectionStyles() {
        const style = document.createElement('style');
        style.id = 'anti-copy-styles';
        style.textContent = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
            }
            
            input, textarea, [contenteditable="true"], .allow-select {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
            
            img {
                -webkit-user-drag: none !important;
                -khtml-user-drag: none !important;
                -moz-user-drag: none !important;
                -o-user-drag: none !important;
                user-drag: none !important;
                pointer-events: none !important;
            }
            
            .img-protect-wrapper {
                position: relative;
                display: inline-block;
            }
            
            .copy-warning-toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: linear-gradient(135deg, #c9a961, #6d4c41);
                color: #f5f0eb;
                padding: 15px 25px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 14px;
                font-weight: 600;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                z-index: 999999;
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: none;
                border: 2px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                letter-spacing: 0.5px;
            }
            
            .copy-warning-toast.show {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            
            .toast-icon {
                font-size: 18px;
            }
            
            .content-watermark {
                position: fixed;
                bottom: 20px;
                right: 20px;
                font-size: 11px;
                color: rgba(201, 169, 97, 0.25);
                pointer-events: none;
                z-index: 99999;
                font-weight: 700;
                letter-spacing: 2px;
                user-select: none;
                text-transform: uppercase;
            }
            
            @media print {
                body {
                    display: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==================== CONSOLE PROTECTION ====================
    function addConsoleWarning() {
        console.log('%c⚠️ DRINKPEDIA PROTECTED', 'color: #c9a961; font-size: 24px; font-weight: bold; background: #1a1512; padding: 10px;');
        console.log('%c🔒 Konten ini dilindungi hak cipta. Dilarang meng-copy tanpa izin.', 'color: #c9b8a8; font-size: 14px;');
        console.log('%c© 2026 DrinkPedia Project - All Rights Reserved', 'color: #c9b8a8; font-size: 12px;');
        console.log('%c⚠️ Developer Tools usage is monitored and logged.', 'color: #f87171; font-size: 12px; font-weight: bold;');

        // Clear console setiap 1 detik
        setInterval(() => {
            if (state.consoleCleared) {
                console.clear();
                console.log('%c⚠️ DRINKPEDIA PROTECTED', 'color: #c9a961; font-size: 20px; font-weight: bold;');
                console.log('%c🔒 Console dibersihkan otomatis untuk keamanan.', 'color: #c9b8a8; font-size: 12px;');
            }
        }, 1000);

        // Deteksi jika console dibuka
        const originalClear = console.clear;
        console.clear = function() {
            state.consoleCleared = true;
            showToast('⛔ Console clearing terdeteksi!', 'warning');
            originalClear.apply(console, arguments);
        };
    }

    // ==================== WATERMARK ====================
    function addWatermark() {
        const wm = document.createElement('div');
        wm.className = 'content-watermark';
        wm.textContent = CONFIG.watermarkText;
        document.body.appendChild(wm);
    }

    // ==================== DEVTOOLS DETECTION (MULTI-LAYER) ====================
    function detectDevToolsMethod1() {
        // Method 1: Window size difference
        const widthThreshold = window.outerWidth - window.innerWidth > CONFIG.debugThreshold;
        const heightThreshold = window.outerHeight - window.innerHeight > CONFIG.debugThreshold;
        return widthThreshold || heightThreshold;
    }

    function detectDevToolsMethod2() {
        // Method 2: Debugger statement timing
        const start = performance.now();
        debugger;
        const end = performance.now();
        return (end - start) > 100;
    }

    function detectDevToolsMethod3() {
        // Method 3: Console object manipulation
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                state.isDevToolsOpen = true;
                return 'devtools-detected';
            }
        });
        console.log(element);
        return state.isDevToolsOpen;
    }

    function checkDevTools() {
        if (!CONFIG.blockDevTools) return;

        const now = Date.now();
        if (now - state.lastDevToolsCheck < 1000) return;
        state.lastDevToolsCheck = now;

        let detected = false;

        // Check Method 1
        if (detectDevToolsMethod1()) {
            detected = true;
        }

        // Check Method 3 (non-blocking)
        if (detectDevToolsMethod3()) {
            detected = true;
        }

        if (detected) {
            state.devToolsWarnings++;
            state.isDevToolsOpen = true;

            if (state.devToolsWarnings >= CONFIG.maxDevToolsWarnings) {
                showToast('⛔ Terlalu banyak percobaan DevTools! Redirecting...', 'error', 2000);
                
                if (CONFIG.devToolsRedirect) {
                    setTimeout(() => {
                        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#1a1512;color:#c9a961;font-family:Poppins;text-align:center"><div><h1>⛔ ACCESS DENIED</h1><p>Developer Tools usage detected.</p><p>Page will redirect...</p></div></div>';
                        window.location.href = CONFIG.redirectUrl;
                    }, 2000);
                }
                return;
            }

            showToast(`⚠️ DevTools terdeteksi! (${state.devToolsWarnings}/${CONFIG.maxDevToolsWarnings})`, 'warning');
        } else {
            state.isDevToolsOpen = false;
        }
    }

    // ==================== ANTI-TAMPER ====================
    function preventTampering() {
        // Prevent removing protection styles
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    const antiCopyStyle = document.getElementById('anti-copy-styles');
                    if (!antiCopyStyle) {
                        addProtectionStyles();
                        showToast('⛔ Proteksi dipulihkan!', 'warning');
                    }
                }
            });
        });

        observer.observe(document.head, { childList: true, subtree: true });

        // Prevent disabling JavaScript
        window.addEventListener('beforeunload', function(e) {
            if (state.isDevToolsOpen) {
                localStorage.setItem('drinkpedia_devtools_abuse', 'true');
            }
        });
    }

    // ==================== CHECK PREVIOUS ABUSE ====================
    function checkPreviousAbuse() {
        const abuse = localStorage.getItem('drinkpedia_devtools_abuse');
        if (abuse === 'true') {
            localStorage.removeItem('drinkpedia_devtools_abuse');
            showToast('⚠️ Aktivitas mencurigakan terdeteksi sebelumnya', 'warning', 5000);
            state.devToolsWarnings = 2;
        }
    }

    // ==================== INITIALIZATION ====================
    function init() {
        addProtectionStyles();
        protectImages();
        
        if (CONFIG.consoleWarning) {
            addConsoleWarning();
        }
        
        if (CONFIG.watermark) {
            addWatermark();
        }

        checkPreviousAbuse();
        preventTampering();

        // Start DevTools detection
        if (CONFIG.blockDevTools) {
            setInterval(checkDevTools, 1000);
        }

        // Activity tracking
        document.addEventListener('click', () => { state.lastDevToolsCheck = 0; });
        document.addEventListener('keypress', () => { state.lastDevToolsCheck = 0; });
        document.addEventListener('mousemove', () => { state.lastDevToolsCheck = 0; });

        console.log('%c🔒 Ultra Anti-Copy Protection Loaded', 'color: #4ade80; font-weight: bold; font-size: 14px;');
    }

    // Run on DOM ready or immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();