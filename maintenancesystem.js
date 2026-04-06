const openMaintenancePage = true; // Set to true to enable
const maintenanceUrl = 'maintenance.html';

// Only redirect if maintenance is ON and the user isn't already there
if (openMaintenancePage && !window.location.pathname.includes(maintenanceUrl)) {
    window.location.href = maintenanceUrl;
}
