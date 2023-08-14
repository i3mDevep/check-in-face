# Employee Time Tracking Frontend

This project is the frontend part of the Employee Time Tracking application, which utilizes Amazon Rekognition for facial recognition to track employee clock-ins and clock-outs. The frontend is built using Nx, nx-vite, Amplify, Cypress, and Apollo for GraphQL.

## Project Overview

The frontend of the Employee Time Tracking application provides a user interface for employees to interact with the system. Employees can easily clock in and out using facial recognition and view their time records.

You can create workers and associate images to them, so Amazon Rekognition can identify the face of each worker

![create worker](https://github.com/i3mDevep/check-in-face/blob/main/src/assets/01-worker-create.gif)

Here you can see how the algorithm is already able to identify whose face it is

![rekog worker](https://github.com/i3mDevep/check-in-face/blob/main/src/assets/02-worker-recog.gif)


## Features

- **Facial Recognition**: Employees can use facial recognition to clock in and out.
- **User Interface**: The frontend provides a user-friendly interface for interactions.
- **GraphQL**: Apollo is used for GraphQL queries and mutations to interact with the backend.
- **Authentication**: Amplify is used for user authentication and handling identity pool integration.
- **CDN**: The application uses a CDN to efficiently serve images.
- **Integration Tests**: Cypress is used for end-to-end testing of the user interface.

## Getting Started

1. Clone the repository to your local machine.
2. Navigate to the frontend directory.
3. Set up environment variables by creating a `.env` file in the root directory of the frontend. Refer to the backend https://github.com/i3mDevep/check-in-face-backend/tree/main README for the required values.
4. Start the development server using `pnpm start`.

## Environment Variables

Ensure you have the following environment variables set in the `.env` file:

- `VITE_CDN_IMAGES_WORKER`: Domain name of the CloudFront distribution for worker images.
- `VITE_API_URL`: URL of the AWS AppSync GraphQL endpoint.
- `VITE_API_KEY`: API key generated for AWS AppSync.
- `VITE_IDENTITY_POOL_ID`: Amazon Cognito Identity Pool ID.
- `VITE_BUCKET_IMAGES_WORKER`: Name of the Amazon S3 bucket for worker images.

## Running Tests

To run end-to-end tests using Cypress, use the following command:

```bash
pnpm nx run e2e:e2e 
