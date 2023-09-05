import { EventBridgeClient, ActivateEventSourceCommand, PutEventsCommandInput, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import axios from "axios";

const client = new EventBridgeClient();

export const lambdaHandler = async (event: any): Promise<any> => {
	try {

		const city = 'Sydney';
		const unit = 'metric';
		const apiKey = process.env.WEATHER_DATA_API_KEY;

		const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);

		const total = { ...weatherData.data["main"], city: city, time: new Date().getTime().toString() };
		console.log('weatherData:', JSON.stringify(total));

		const entry = {
			Entries: [ 
				{
					Detail: JSON.stringify(total),
					DetailType: 'Message',
					EventBusName: 'default',
					Source: 'demo.event',
				}
			]
		}

		const command = new PutEventsCommand(entry);

    const response = await client.send(command);

		console.log('Event sent to EventBridge:', response);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'hello world',
			}),
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'some error happened',
			}),
		};
	}
};
