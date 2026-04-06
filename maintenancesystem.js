const openMaintenancePage = true; // Set to true to enable
const maintenanceUrl = 'SniffGo/maintenance.html';

// Get current page filename
const currentPage = window.location.pathname.split('/').pop();

// Only redirect if maintenance is ON and not already on maintenance page
if (openMaintenancePage && currentPage !== 'maintenance.html') {
    window.location.href = maintenanceUrl;
}
