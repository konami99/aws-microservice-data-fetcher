# Weather data fetcher

![weather_monitor drawio](https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/43487afb-b5ec-4b2c-84b8-a1ec66d29812)

This repo is the "data fetcher" part of the weather monitor. It is comprised of a Lambda function and EventBridge. The Lambda function pulls weather data from api.openweathermap.org and sends the retrieved data to EventBridge.

## Deploying to multi-accounts on AWS
The lambda function is developed and tested on local machine. Once commited to GitHub, GitHub actions will deploy to AWS using SAM. SAM will also create an EventBridge schedule which will trigger Lambda to retrieve weather data periodically.
