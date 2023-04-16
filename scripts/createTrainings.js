//Execution Example: node scripts/createTrainings.js http://localhost:1337 testApiKey Monday 16:00:00 16:30:00 18:00:00  2023-08-01 2023-08-31 
const axios = require('axios');



// Define the function to create the events
const createEvents = async (startDate, endDate, apiHost, apiKey) => {
    // Define the event data to be created for each weekday
    const eventTemplate = {
        title: 'Training',
        type: 'training',
        startTime: startTime,
        meetTime: meetTime,
        endTime: endTime
  };
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    if (days[currentDate.getDay()] === weekday) { 
      console.log('StartDate: ' + currentDate.toISOString());
      const eventData = {
        data: {
            ...eventTemplate,
            startDate: currentDate.toISOString(),
        }
      };
      try {
        // Make the API request to create the event object
        const response = await axios.post(apiHost + '/api/events', eventData);

        // Log the response from the API
        console.log(response.data);
      } catch (error) {
        // Handle any errors that occur
        console.error(error);
      }
    }
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
};

// Get the command line arguments
const args = process.argv.slice(2);
const apiHost = args[0];
const apiKey = args[1];
const weekday = args[2];
const startTime = args[3];
const meetTime = args[4];
const endTime = args[5];
const startDate = new Date(args[6] + 'T12:00:00.000Z');
const endDate = new Date(args[7]+ 'T12:00:00.000Z');


// Call the createEvents function to create the events
createEvents(startDate, endDate, apiHost, apiKey);
