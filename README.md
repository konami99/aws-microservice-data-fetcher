# Weather data fetcher

![weather_monitor drawio](https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/43487afb-b5ec-4b2c-84b8-a1ec66d29812)

This repo is the "data fetcher" part of the weather monitor. It is comprised of a Lambda function and EventBridge. The Lambda function pulls weather data from api.openweathermap.org and sends the retrieved data to EventBridge.

## Deploying to multi-accounts on AWS
The lambda function is developed and tested on local machine. Once commited to GitHub, GitHub actions will deploy to AWS using SAM. SAM will also create an EventBridge schedule and necessary IAM role to trigger Lambda periodically.

SAM will push to multiple AWS accounts using assume role.
<img width="578" alt="Screen Shot 2023-09-03 at 5 41 12 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/26c32853-5d23-41e3-b691-7a5ec6e65f01">

For Tools Account to be able to assume role, the IAM role needs to give permission to Tools Account.
<img width="621" alt="Screen Shot 2023-09-03 at 5 43 15 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/2cf3ecf5-8bef-4ead-a0c1-5532ba0f1e66">

I also created two environments on GitHub to store credentials. So when SAM deploys, it will grab necessary credentials depending on which environment it is in.
<img width="1142" alt="Screen Shot 2023-09-03 at 6 05 59 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/678b4a77-6bc5-42c4-bb35-c552c1a48b4a">

`.github/workflows/production.yml`

Specifying prod environment, GitHub actions will pull credentials from prod.
<img width="1031" alt="Screen Shot 2023-09-03 at 6 08 56 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/b3d89693-2b6f-4f5c-b790-40f89bf93d8d">

`.github/workflows/staging.yml`

Specifying staging environment, GitHub actions will pull credentials from staging.
<img width="1001" alt="Screen Shot 2023-09-03 at 6 09 44 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/7ed703e5-85ba-425e-ba4d-8a21b01e7845">

Next SAM will assume role to deploy to prod and staging.
<img width="977" alt="Screen Shot 2023-09-03 at 6 14 56 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/66f2140d-e213-4753-8ad5-dc4a458a0514">
