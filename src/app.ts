import { EventBridgeClient, ActivateEventSourceCommand, PutEventsCommandInput, PutEventsCommand } from "@aws-sdk/client-eventbridge";

//AWS.config.update({region: 'us-west-2'});
//const eventbridge = new AWS.EventBridge();

const client = new EventBridgeClient({ region: 'us-west-2' });

export const lambdaHandler = async (event: any): Promise<any> => {
	try {

		const entry = {
			Entries: [ 
				{
					Detail: JSON.stringify({
						"message": "Hello from publisher",
						"state": "new"
					}),
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
