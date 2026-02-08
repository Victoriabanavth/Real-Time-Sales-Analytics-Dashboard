/**
 * Real-Time Sales Analytics Dashboard
 * Interactive dashboard with Chart.js visualizations
 */

// Sample data generator
const generateSalesData = (days = 30) => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        data.push({
            date: date.toISOString().split('T')[0],
            revenue: Math.floor(Math.random() * 50000) + 20000,
            orders: Math.floor(Math.random() * 200) + 50,
            customers: Math.floor(Math.random() * 50) + 10
        });
    }

    return data;
};

// Sample transactions
const generateTransactions = (count = 10) => {
    const products = ['Analytics Pro', 'Data Suite', 'Dashboard Plus', 'Report Builder', 'Insight Engine'];
    const customers = ['Acme Corp', 'TechStart Inc', 'Innovate Labs', 'Data Dynamics', 'Cloud Nine'];
    const statuses = ['completed', 'pending', 'processing'];

    return Array.from({ length: count }, (_, i) => ({
        id: `ORD-${String(10000 + i).padStart(6, '0')}`,
        customer: customers[Math.floor(Math.random() * customers.length)],
        product: products[Math.floor(Math.random() * products.length)],
        amount: (Math.random() * 5000 + 500).toFixed(2),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));
};

// Chart configurations
let revenueChart, categoryChart, productsChart;

const initCharts = () => {
    const salesData = generateSalesData(30);

    // Revenue Trend Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: salesData.map(d => d.date.slice(5)),
            datasets: [
                {
                    label: 'Revenue',
                    data: salesData.map(d => d.revenue),
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                },
                {
                    label: 'Orders (x100)',
                    data: salesData.map(d => d.orders * 100),
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#6b6b7b' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#6b6b7b',
                        callback: value => '$' + (value / 1000) + 'K'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Enterprise', 'SMB', 'Startup', 'Individual'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#00ff88', '#00d4ff', '#8b5cf6', '#ff9f43'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#a0a0b0', padding: 15 }
                }
            },
            cutout: '70%'
        }
    });

    // Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    productsChart = new Chart(productsCtx, {
        type: 'bar',
        data: {
            labels: ['Analytics Pro', 'Data Suite', 'Dashboard+', 'Reports', 'Insights'],
            datasets: [{
                data: [85, 72, 65, 48, 35],
                backgroundColor: ['#00ff88', '#00d4ff', '#8b5cf6', '#ff9f43', '#ff6b6b'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#6b6b7b' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#a0a0b0' }
                }
            }
        }
    });
};

// Update KPIs
const updateKPIs = () => {
    const animateValue = (element, end, prefix = '', suffix = '') => {
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            element.textContent = prefix + current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    animateValue(document.getElementById('totalRevenue'), 847520, '$');
    animateValue(document.getElementById('totalOrders'), 3247);
    animateValue(document.getElementById('newCustomers'), 892);
    animateValue(document.getElementById('conversionRate'), 4.8, '', '%');

    document.getElementById('revenueChange').textContent = '+12.5%';
    document.getElementById('ordersChange').textContent = '+8.3%';
    document.getElementById('customersChange').textContent = '+15.2%';
    document.getElementById('conversionChange').textContent = '+2.1%';
};

// Populate table
const populateTable = () => {
    const transactions = generateTransactions(8);
    const tbody = document.getElementById('tableBody');

    tbody.innerHTML = transactions.map(t => `
    <tr>
      <td><strong>${t.id}</strong></td>
      <td>${t.customer}</td>
      <td>${t.product}</td>
      <td>$${t.amount}</td>
      <td><span class="status ${t.status}">${t.status}</span></td>
      <td>${t.date}</td>
    </tr>
  `).join('');
};

// Refresh data
const refreshData = () => {
    const salesData = generateSalesData(30);

    revenueChart.data.datasets[0].data = salesData.map(d => d.revenue);
    revenueChart.data.datasets[1].data = salesData.map(d => d.orders * 100);
    revenueChart.update();

    updateKPIs();
    populateTable();
};

// Export data
const exportData = () => {
    alert('Export functionality - In production, this would download a CSV file with the transaction data.');
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateKPIs();
    populateTable();

    // Time range change
    document.getElementById('timeRange').addEventListener('change', refreshData);
});
