# Event Management Platform

A full-stack event management platform that allows users to create, manage, and join events. The application supports real-time updates for event attendees, event creation, and filtering events based on their time (upcoming or past).

## Links
[Event Pulse](https://eventpulse-event-management.web.app)

## Features

- **Event Creation**: Users can create events by providing details like event name, description, date/time, and image.
- **Real-Time Updates**: Socket.IO is used to handle real-time attendee updates for events.
- **Event Filtering**: Events can be filtered by "Upcoming" or "Past".
- **Image Upload**: Event images are uploaded to Cloudinary for storage.
- **Authentication**: Secure routes using JWT (JSON Web Tokens) for verifying users.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lottie, Axios, React Icons
- **Backend**: Node.js, Express, MongoDB
- **Real-Time Communication**: Socket.IO
- **Image Hosting**: Cloudinary
- **Environment Management**: `.env` file for sensitive information like API keys

## Installation

### Prerequisites

- Node.js and npm (Node Package Manager) installed
- MongoDB database (local or cloud)

### Clone the repository

```bash
git clone https://github.com/your-username/event-management-platform.git
cd event-management-platform