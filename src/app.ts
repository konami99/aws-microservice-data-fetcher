import { EventBridgeClient, ActivateEventSourceCommand, PutEventsCommandInput, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import axios from "axios";

const client = new EventBridgeClient();

export const lambdaHandler = async (event: any): Promise<any> => {
	try {

		const city = 'sydney';
		const unit = 'metric';
		const apiKey = 'e87991825328b10ee03463453976a4bb';

		const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);

		const total = { ...weatherData.data["main"], time: new Date() };
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
