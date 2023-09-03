# Weather data fetcher

![weather_monitor drawio](https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/43487afb-b5ec-4b2c-84b8-a1ec66d29812)

This repo is the "data fetcher" part of the weather monitor. It is comprised of a Lambda function and EventBridge. The Lambda function pulls weather data from api.openweathermap.org and sends the retrieved data to EventBridge.

## Deploying to multi-accounts on AWS
The lambda function is developed and tested on local machine. Once commited to GitHub, GitHub actions will deploy to AWS using SAM. SAM will also create an EventBridge schedule and necessary IAM role to trigger Lambda periodically.

SAM will push to multiple AWS accounts using assume role.
<img width="578" alt="Screen Shot 2023-09-03 at 5 41 12 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/26c32853-5d23-41e3-b691-7a5ec6e65f01">

The IAM role needs to give permission to Tools Account.
<img width="621" alt="Screen Shot 2023-09-03 at 5 43 15 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/2cf3ecf5-8bef-4ead-a0c1-5532ba0f1e66">
