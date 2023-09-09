<img width="86" alt="Screen Shot 2023-09-09 at 11 36 30 pm" src="https://github.com/konami99/aws-microservice-data-visualiser/assets/166879/cd5e4bb5-b0c0-423b-b4ea-338d656acee2">
<img width="92" alt="Screen Shot 2023-09-09 at 11 43 45 pm" src="https://github.com/konami99/aws-microservice-data-visualiser/assets/166879/2bc76552-0f82-47ec-8803-9a43cc1f9f62">
<img width="165" alt="Screen Shot 2023-09-09 at 11 38 01 pm" src="https://github.com/konami99/aws-microservice-data-visualiser/assets/166879/349bc8cf-4a8e-4832-b8b7-bad798b2bbb3">

# Building a weather monitor with SAM and Terraform

![weather_monitor drawio](https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/43487afb-b5ec-4b2c-84b8-a1ec66d29812)

Part 2 - [Weather data state machine](https://github.com/konami99/aws-microservice-state-machine)

Part 3 - [Weather data visualiser](https://github.com/konami99/aws-microservice-data-visualiser)

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

## SAM template

`template.yaml`

Let's go through the important part in SAM template.

This part creates a Lambda function and gives it permission to push events to EventBridge.
<img width="1026" alt="Screen Shot 2023-09-03 at 6 19 20 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/88f89618-bd9d-4d6e-bfc7-bd576a1167d7">

This part creates an EventBridge scheduler and gives it necessary permission to invoke Lambda.
<img width="748" alt="Screen Shot 2023-09-03 at 6 21 40 pm" src="https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/0e35d002-606e-4ee8-84b8-4f947389b077">

## Passing env vars from GitHub secrets to SAM
The openweathermap API key is passed from GitHub secrets to Lambda so Lambda can call the API to get the weather data.

To define env vars, first create `Parameters` and `Environment: Variables` blocks in SAM template:

`template.yaml`

![Screen Shot 2023-09-05 at 5 05 50 pm](https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/73e09eb2-cf71-44de-a7c9-33d199b7683f)

Then, in GitHub workflows, use `--parameter-overrides` to pass env var. Of course, you can use different API key for staging and production environments.

`.github/workflows/production.yml`

![Screen Shot 2023-09-05 at 5 07 13 pm](https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/109ab448-2538-4683-aafa-f7d41e1ac5e0)

Finally, you will be able to use env var in the Lambda:

`src/app.ts`

![Screen Shot 2023-09-05 at 5 06 45 pm](https://github.com/konami99/aws-microservice-data-fetcher/assets/166879/b2da8a7f-b77b-45c4-a4a9-af4811e53ef3)
