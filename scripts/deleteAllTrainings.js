const axios = require('axios');

// Authorization token for your Strapi instance
const apiKey = 'your_api_key_here';

// Type of events to delete
const eventTitle = 'training';

async function deleteEventsByTitle(apiHost) {
  try {
    // Get all events that match the given type
    const response = await axios.get(`${apiHost}/api/events?_where[title]=${eventTitle}`);
    
    // Delete each event
    const events = response?.data?.data;
    for (const event of events) {
      await axios.delete(`${apiHost}/api/events/${event.id}`);
      console.log(`Deleted event "${event.id}"`);
    }
    
    console.log(`Deleted ${events.length} events of title "${eventTitle}"`);
  } catch (error) {
    console.error(`Error deleting events: ${error}`);
  }
}
const args = process.argv.slice(2);
const apiHost = args[0];

deleteEventsByTitle(apiHost);
