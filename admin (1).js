/* ============================================
☕ DRINKPEDIA ADMIN - SECURE & FIXED (FINAL)
============================================ */
(function() {
    'use strict';
    
    // ==================== CONFIG ====================
    const CONFIG = {
        USERNAME: 'Admin',
        PASSWORD: 'Admin213',
        SESSION_TIMEOUT: 15 * 60 * 1000,
        MAX_ATTEMPTS: 5,
        LOCKOUT_TIME: 5 * 60 * 1000
    };

    // ==================== STATE ====================
    let state = {
        isLoggedIn: false,
        sessionStart: null,
        sessionTimer: null,
        attempts: 0,
        lastAttempt: null,
        isLocked: false,
        orders: []
    };

    // ==================== DRINKS DATA ====================
    const drinksData = {
        coffee: [
            { name: 'Espresso', price: 18000 },
            { name: 'Cappuccino', price: 25000 },
            { name: 'Latte', price: 28000 },
            { name: 'Americano', price: 22000 },
            { name: 'Cold Brew', price: 32000 },
            { name: 'V60 Pour Over', price: 35000 },
            { name: 'Affogato', price: 38000 }
        ],
        soda: [
            { name: 'Classic Cola', price: 15000 },
            { name: 'Lemon-Lime Soda', price: 15000 },
            { name: 'Ginger Ale', price: 18000 },
            { name: 'Virgin Mojito', price: 28000 },
            { name: 'Virgin Piña Colada', price: 32000 },
            { name: 'Energy Drink', price: 25000 }
        ],
        healthy: [
            { name: 'Green Tea', price: 20000 },
            { name: 'Earl Grey Tea', price: 22000 },
            { name: 'Fresh Orange Juice', price: 25000 },
            { name: 'Green Smoothie', price: 35000 },
            { name: 'Berry Smoothie', price: 38000 },
            { name: 'Matcha Latte', price: 32000 }
        ]
    };

    // ==================== UTILITY FUNCTIONS ====================
    function generateOrderId() {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.floor(100 + Math.random() * 900);
        return `DP-${date}-${random}`;
    }

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    function sanitizeInput(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function showSecurityAlert(message, type = 'warning') {
        const alert = document.getElementById('security-alert');
        if (alert) {
            alert.textContent = message;
            alert.className = 'security-alert show ' + (type === 'success' ? 'success' : '');
            setTimeout(() => {
                alert.className = 'security-alert';
            }, 3000);
        }
    }

    // ==================== LOCAL STORAGE ====================
    function loadOrders() {
        try {
            const saved = localStorage.getItem('drinkpedia_orders');
            state.orders = saved ? JSON.parse(saved) : [];
            
            const today = new Date().toLocaleDateString('id-ID');
            state.orders = state.orders.filter(o => 
                new Date(o.timestamp).toLocaleDateString('id-ID') === today
            );
        } catch (e) {
            console.warn('Load orders failed:', e);
            state.orders = [];
        }
    }

    function saveOrders() {
        try {
            localStorage.setItem('drinkpedia_orders', JSON.stringify(state.orders));
        } catch (e) {
            console.warn('Save orders failed:', e);
        }
    }

    // ==================== LOGIN SYSTEM ====================
    function checkRateLimit() {
        if (state.isLocked) {
            const timeSinceLock = Date.now() - state.lastAttempt;
            if (timeSinceLock < CONFIG.LOCKOUT_TIME) {
                const remaining = Math.ceil((CONFIG.LOCKOUT_TIME - timeSinceLock) / 1000);
                return { allowed: false, remaining: remaining };
            } else {
                state.isLocked = false;
                state.attempts = 0;
            }
        }
        return { allowed: true };
    }

    function updateAttemptCounter() {
        const counter = document.getElementById('attempt-counter');
        if (counter && state.attempts > 0) {
            const remaining = CONFIG.MAX_ATTEMPTS - state.attempts;
            counter.textContent = `⚠️ ${remaining} attempt(s) remaining before lockout`;
        }
    }

    async function handleLogin(event) {
        event.preventDefault();
        
        const rateCheck = checkRateLimit();
        if (!rateCheck.allowed) {
            document.getElementById('login-error').textContent = 
                `⛔ Too many attempts. Try again in ${rateCheck.remaining} seconds`;
            return;
        }
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('login-btn');
        const errorDiv = document.getElementById('login-error');
        
        loginBtn.disabled = true;
        loginBtn.textContent = '⏳ Verifying...';
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (username === CONFIG.USERNAME && password === CONFIG.PASSWORD) {
            state.attempts = 0;
            state.isLocked = false;
            errorDiv.textContent = '✅ Login successful!';
            errorDiv.className = 'error-msg success-msg';
            
            setTimeout(() => {
                startSession();
            }, 1000);
        } else {
            state.attempts++;
            state.lastAttempt = Date.now();
            
            if (state.attempts >= CONFIG.MAX_ATTEMPTS) {
                state.isLocked = true;
                errorDiv.textContent = '⛔ Account locked. Try again in 5 minutes';
            } else {
                errorDiv.textContent = '❌ Invalid username or password';
            }
            errorDiv.className = 'error-msg';
            updateAttemptCounter();
            
            loginBtn.disabled = false;
            loginBtn.textContent = '🔓 Login';
        }
    }

    function startSession() {
        state.isLoggedIn = true;
        state.sessionStart = Date.now();
        
        localStorage.setItem('dp_admin_session', JSON.stringify({
            token: Math.random().toString(36).substr(2),
            start: state.sessionStart,
            username: CONFIG.USERNAME
        }));
        
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        
        startSessionTimer();
        initDashboard();
        
        showSecurityAlert('✅ Welcome, ' + CONFIG.USERNAME, 'success');
    }

    function startSessionTimer() {
        const timerDisplay = document.getElementById('session-time');
        
        state.sessionTimer = setInterval(() => {
            const elapsed = Date.now() - state.sessionStart;
            const remaining = CONFIG.SESSION_TIMEOUT - elapsed;
            
            if (remaining <= 0) {
                logout('Session timeout');
                return;
            }
            
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            
            if (timerDisplay) {
                timerDisplay.textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                if (remaining <= 2 * 60 * 1000) {
                    timerDisplay.style.color = '#e74c3c';
                }
            }
            
            state.sessionStart = Date.now();
        }, 1000);
    }

    function logout(reason = 'User initiated') {
        state.isLoggedIn = false;
        
        if (state.sessionTimer) {
            clearInterval(state.sessionTimer);
        }
        
        localStorage.removeItem('dp_admin_session');
        
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('login-screen').style.display = 'flex';
        
        document.getElementById('login-form').reset();
        document.getElementById('login-error').textContent = '';
        document.getElementById('attempt-counter').textContent = '';
        
        showSecurityAlert('🚪 Logged out: ' + reason);
    }

    // ==================== DASHBOARD FUNCTIONS ====================
    function initDashboard() {
        populateDrinkSelect();
        loadOrders();
        renderTable();
        updateStats();
        
        setInterval(() => {
            loadOrders();
            renderTable();
            updateStats();
        }, 10000);
    }

    function populateDrinkSelect() {
        const select = document.getElementById('inputDrink');
        if (!select) return;
        
        let options = '<option value="">-- Choose Drink --</option>';
        ['coffee', 'soda', 'healthy'].forEach(cat => {
            drinksData[cat].forEach(drink => {
                options += `<option value="${drink.name}" data-price="${drink.price}">
                    ${drink.name} - ${formatRupiah(drink.price)}
                </option>`;
            });
        });
        select.innerHTML = options;
    }

    function addOrder() {
        const tableNo = document.getElementById('inputTable').value;
        const customerName = document.getElementById('inputName').value;
        const drinkSelect = document.getElementById('inputDrink');
        const drinkName = drinkSelect?.value;
        const drinkPrice = parseInt(drinkSelect?.options[drinkSelect.selectedIndex]?.getAttribute('data-price') || 0);
        const qty = parseInt(document.getElementById('inputQty').value) || 1;
        const note = document.getElementById('inputNote').value;

        if (!tableNo || !drinkName) {
            showSecurityAlert('⚠️ Table number and drink required', 'warning');
            return;
        }

        const newOrder = {
            id: generateOrderId(),
            timestamp: new Date().toISOString(),
            table: sanitizeInput(tableNo),
            customer: sanitizeInput(customerName) || 'Walk-in',
            items: [{ 
                name: sanitizeInput(drinkName), 
                price: drinkPrice, 
                qty: qty, 
                note: sanitizeInput(note) 
            }],
            total: drinkPrice * qty,
            status: 'pending_payment',
            notes: sanitizeInput(note)
        };

        state.orders.unshift(newOrder);
        saveOrders();
        renderTable();
        updateStats();
        
        printReceipt(newOrder);
        showSecurityAlert('✅ Order created: ' + newOrder.id, 'success');
        
        document.getElementById('inputTable').value = '';
        document.getElementById('inputName').value = '';
        document.getElementById('inputQty').value = '1';
        document.getElementById('inputNote').value = '';
        document.getElementById('inputTable').focus();
    }

    function renderTable() {
        const tbody = document.getElementById('order-list-body');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        if (state.orders.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">
                No orders today ☕
            </td></tr>`;
            return;
        }

        const STATUS_FLOW = {
            'pending_payment': { label: '⏳ Pending', next: 'paid' },
            'paid': { label: '💳 Paid', next: 'preparing' },
            'preparing': { label: '👨‍🍳 Preparing', next: 'ready' },
            'ready': { label: '✅ Ready', next: 'completed' },
            'completed': { label: '🎉 Completed', next: null }
        };

        state.orders.forEach(order => {
            const time = new Date(order.timestamp).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const status = STATUS_FLOW[order.status];
            const itemsStr = order.items.map(i => 
                `${i.qty}× ${i.name}${i.note ? ' ('+i.note+')' : ''}`
            ).join('<br>');

            const row = `
                <tr>
                    <td><div style="font-family:monospace;font-weight:700;color:var(--accent-gold)">
                        ${order.id}
                    </div></td>
                    <td>${time}</td>
                    <td><strong>#${order.table}</strong><br>
                        <small style="color:var(--text-muted)">${order.customer}</small>
                    </td>
                    <td>${itemsStr}</td>
                    <td style="font-weight:600;color:var(--accent-gold)">
                        ${formatRupiah(order.total)}
                    </td>
                    <td>
                        <span class="status-badge status-${order.status}">
                            ${status?.label || order.status}
                        </span>
                    </td>
                    <td>
                        ${status?.next ? `
                            <button class="action-btn btn-next" 
                                  onclick="updateStatus('${order.id}', '${status.next}')">
                                → Next
                            </button>
                        ` : ''}
                        <button class="action-btn btn-print" 
                              onclick='printReceiptById("${order.id}")'>
                            🖨️
                        </button>
                        ${order.status !== 'completed' ? `
                            <button class="action-btn btn-delete" 
                                  onclick="cancelOrder('${order.id}')">
                                🗑️
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    function updateStatus(orderId, newStatus) {
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            saveOrders();
            renderTable();
            updateStats();
            showSecurityAlert('✅ Order ' + orderId + ' updated to ' + newStatus, 'success');
        }
    }

    function cancelOrder(orderId) {
        if (confirm('🗑️ Cancel this order?')) {
            state.orders = state.orders.filter(o => o.id !== orderId);
            saveOrders();
            renderTable();
            updateStats();
            showSecurityAlert('🗑️ Order cancelled', 'success');
        }
    }

    function updateStats() {
        const stats = {
            total: state.orders.length,
            revenue: state.orders.reduce((sum, o) => sum + o.total, 0),
            pending: state.orders.filter(o => o.status === 'pending_payment').length,
            preparing: state.orders.filter(o => o.status === 'preparing').length,
            ready: state.orders.filter(o => o.status === 'ready').length
        };
        
        const el = document.getElementById('stat-count');
        if (el) el.textContent = stats.total;
        
        const rev = document.getElementById('stat-revenue');
        if (rev) rev.textContent = formatRupiah(stats.revenue);
        
        const pend = document.getElementById('stat-pending');
        if (pend) pend.textContent = stats.pending;
        
        const prep = document.getElementById('stat-preparing');
        if (prep) prep.textContent = stats.preparing;
        
        const ready = document.getElementById('stat-ready');
        if (ready) ready.textContent = stats.ready;
    }

    function printReceipt(order) {
        const recDate = document.getElementById('rec-date');
        const recOrderid = document.getElementById('rec-orderid');
        const recTable = document.getElementById('rec-table');
        const recCashier = document.getElementById('rec-cashier');
        const recItems = document.getElementById('rec-items');
        const recTotal = document.getElementById('rec-total');
        const recStatus = document.getElementById('rec-status');

        if (!recDate || !recOrderid) return;

        const orderDate = new Date(order.timestamp);
        const dateString = orderDate.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        const timeString = orderDate.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });

        recDate.textContent = `${dateString} ${timeString}`;
        recOrderid.textContent = order.id;
        recTable.textContent = `#${order.table}`;
        recCashier.textContent = order.customer || 'Walk-in';
        
        recItems.innerHTML = order.items.map(item => `
            <div class="receipt-item">
                <div class="receipt-item-header">
                    <span>${item.name}</span>
                    <span>${formatRupiah(item.price * item.qty)}</span>
                </div>
                <div class="receipt-item-qty">
                    ${item.qty}x @ ${formatRupiah(item.price)}
                </div>
                ${item.note ? `<div class="receipt-item-note">Note: ${item.note}</div>` : ''}
            </div>
        `).join('');
        
        recTotal.textContent = formatRupiah(order.total);
        recStatus.textContent = order.status.toUpperCase().replace('_', ' ');
        
        setTimeout(() => {
            window.print();
        }, 100);
    }

    function printReceiptById(orderId) {
        const order = state.orders.find(o => o.id === orderId);
        if (order) {
            printReceipt(order);
        } else {
            showSecurityAlert('❌ Order not found', 'warning');
        }
    }

    function searchOrderByCode() {
        const codeInput = document.getElementById('searchOrderCode');
        if (!codeInput) return;
        const code = codeInput.value.trim().toUpperCase();
        if (!code) {
            showSecurityAlert('⚠️ Masukkan kode order', 'warning');
            return;
        }

        const order = state.orders.find(o => o.id === code);

        if (order) {
            showSecurityAlert(`✅ Order ${code} ditemukan!`, 'success');
            
            const tableRows = document.querySelectorAll('#order-list-body tr');
            tableRows.forEach(row => {
                if (row.textContent.includes(code)) {
                    row.style.background = 'rgba(201, 169, 97, 0.2)';
                    setTimeout(() => row.style.background = '', 3000);
                }
            });
            
            openOrderDetail(order);
        } else {
            showSecurityAlert('❌ Kode order tidak ditemukan', 'error');
        }
    }

    function openOrderDetail(order) {
        const itemsHTML = order.items.map(item =>
            `<div style="display:flex; justify-content:space-between; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
                <span>${item.qty}× ${item.name}</span>
                <span>${formatRupiah(item.price * item.qty)}</span>
            </div>`
        ).join('');

        const modalHTML = `
            <div id="orderDetailModal" class="detail-modal active" style="z-index: 4000;">
                <div class="detail-content">
                    <div class="detail-header">
                        <div>
                            <div class="detail-title">${order.id}</div>
                            <div class="detail-subtitle">${new Date(order.timestamp).toLocaleString('id-ID')}</div>
                        </div>
                        <button class="detail-close" onclick="document.getElementById('orderDetailModal').remove()">✕</button>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>Meja:</strong> ${order.table}</p>
                        <p><strong>Pelanggan:</strong> ${order.customer}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${order.status}">${order.status}</span></p>
                    </div>

                    <div style="background: var(--card-bg); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        ${itemsHTML}
                        <div style="display:flex; justify-content:space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid var(--accent-gold); font-weight: 700; font-size: 18px; color: var(--accent-gold);">
                            <span>TOTAL</span>
                            <span>${formatRupiah(order.total)}</span>
                        </div>
                    </div>

                    ${order.status === 'pending_payment' ? `
                        <button onclick="processPayment('${order.id}')" class="btn-checkout" style="width: 100%;">
                            💳 Konfirmasi Pembayaran
                        </button>
                    ` : `
                        <button disabled class="btn-checkout" style="width: 100%; opacity: 0.5;">
                            ✅ Sudah Dibayar
                        </button>
                    `}
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function processPayment(orderId) {
        if (confirm('✅ Konfirmasi pembayaran untuk order ' + orderId + '?')) {
            updateStatus(orderId, 'paid');
            document.getElementById('orderDetailModal').remove();
            showSecurityAlert('💳 Pembayaran berhasil dikonfirmasi', 'success');
        }
    }

    // ==================== SECURITY FEATURES ====================
    function initSecurity() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showSecurityAlert('⛔ Right-click disabled');
            return false;
        });

        document.addEventListener('keydown', function(e) {
            if (
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.key === 's') ||
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase()))
            ) {
                e.preventDefault();
                showSecurityAlert('⛔ This action is restricted');
                return false;
            }
        });

        document.addEventListener('click', () => { state.sessionStart = Date.now(); });
        document.addEventListener('keypress', () => { state.sessionStart = Date.now(); });
        document.addEventListener('mousemove', () => { state.sessionStart = Date.now(); });
    }

    // ==================== INITIALIZATION ====================
    document.addEventListener('DOMContentLoaded', function() {
        initSecurity();
        
        const sessionData = localStorage.getItem('dp_admin_session');
        if (sessionData) {
            try {
                const session = JSON.parse(sessionData);
                const elapsed = Date.now() - session.start;
                if (elapsed < CONFIG.SESSION_TIMEOUT) {
                    state.sessionStart = session.start;
                    startSession();
                    return;
                }
            } catch (e) {
                localStorage.removeItem('dp_admin_session');
            }
        }
        
        console.log('%c🔐 DrinkPedia Admin Loaded', 'color: #c9a961; font-weight: bold');
    });

    // Expose functions globally
    window.handleLogin = handleLogin;
    window.logout = logout;
    window.addOrder = addOrder;
    window.updateStatus = updateStatus;
    window.cancelOrder = cancelOrder;
    window.printReceiptById = printReceiptById;
    window.searchOrderByCode = searchOrderByCode;
    window.processPayment = processPayment;
})();