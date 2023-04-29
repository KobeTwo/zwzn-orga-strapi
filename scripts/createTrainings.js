//Execution Example: node scripts/createTrainings.js http://localhost:1337 testApiKey Monday 16:00:00 16:30:00 18:00:00  2023-08-01 2023-08-31 
const axios = require('axios');
const moment = require('moment-timezone');



// Define the function to create the events
const createEvents = async (startDate, endDate, apiHost, apiKey) => {
    // Define the event data to be created for each weekday
    const eventTemplate = {
        title: 'Training',
        type: 'training'
  };
  moment.tz.setDefault('Europe/Berlin');
  let currentDate = moment.tz(startDate + 'T12:00:00', 'Europe/Berlin');
  console.log(currentDate);
  let startTimeDate = moment.tz(startDate + 'T' + startTime , 'Europe/Berlin');
  console.log(startTimeDate);
  let meetTimeDate = moment.tz(startDate + 'T' + meetTime, 'Europe/Berlin');
  let endTimeDate = moment.tz(startDate + 'T' + endTime, 'Europe/Berlin');
  const endDateTZ = moment.tz(endDate, 'Europe/Berlin');

  console.log(currentDate);
  console.log(endDateTZ);
  while (currentDate.isBefore(endDateTZ)) {
    
    if (currentDate.format('dddd') === weekday) { 
      console.log(currentDate.format('dddd'));
      console.log(currentDate.format('YYYY-MM-DD HH:mm:ss:ssZ'));
        console.log(currentDate.clone().utc().format('YYYY-MM-DD HH:mm:ss:ssZ'));
        console.log(startTimeDate.format('YYYY-MM-DD HH:mm:ss:ssZ'));
        console.log(startTimeDate.clone().utc().format('YYYY-MM-DD HH:mm:ss:ssZ'));
      const eventData = {
        data: {
            ...eventTemplate,
            startDateTime: startTimeDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            meetDateTime: meetTimeDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            endDateTime: endTimeDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
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
    console.log(currentDate.format('BEFORE ADD:' + 'YYYY-MM-DD HH:mm:ss:ssZ'));
    currentDate = currentDate.add(1, 'day');
    startTimeDate = startTimeDate.add(1, 'day');
    meetTimeDate = meetTimeDate.add(1, 'day');
    endTimeDate = endTimeDate.add(1, 'day');
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
const startDate = args[6];
const endDate = args[7];


// Call the createEvents function to create the events
createEvents(startDate, endDate, apiHost, apiKey);
