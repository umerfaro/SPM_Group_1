const cron = require('node-cron');
const monitorRentals = require('./monitorRentals');
const sendRentalReminder = require('./sendRentalNotifications');

// Schedule monitoring overdue rentals daily at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running daily rental monitoring...');
    monitorRentals();
});
  
// Schedule sending rental reminders daily at 8 AM
cron.schedule('0 8 * * *', () => {
    console.log('Sending rental reminders...');
    sendRentalReminder();
});
