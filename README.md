# Chatroom App using SignalR (.NET)

## Overview

This project is a simple chatroom application developed for learning purposes. It utilizes SignalR, a library for adding real-time web functionality to applications.

The project is divided into two main components:

1. **Server-side (ASP.NET Core):**
    - This directory contains the server-side implementation of the chatroom using ASP.NET Core and SignalR.
    - The server facilitates real-time communication between clients.

2. **Client-side (HTML, CSS, JavaScript):**
    - This directory contains the client-side implementation of the chatroom.
    - The client communicates with the server using SignalR to enable real-time messaging.

## Project Structure

### Server-side

- `/ChatRoomApp`: ASP.NET Core project containing server-side code.
    - `ChatHub.cs`: SignalR hub for handling chat communication.
    - `Program.cs`: Configuration of the SignalR hub and other application settings.
    - ... (Other server-side files)

### Client-side

- `/WebChatClient`: Directory containing client-side code (HTML, CSS, JavaScript).
    - `index.html`: Main HTML file.
    - `style.css`: CSS styles for the chat application.
    - `app.js`: JavaScript file for handling client-side logic.
    - ... (Other client-side files)

## Getting Started

To run the chatroom application locally, follow these steps:

### Server-side

1. Navigate to the `/ChatRoomApp` directory.
2. Open the solution in Visual Studio or your preferred IDE.
3. Build and run the ASP.NET Core project.

### Client-side

1. Navigate to the `/WebChatClient` directory.
2. Open `index.html` in a web browser or your preferred code editor.

That's it! The chatroom application should now be running locally.

## Technologies Used

- ASP.NET Core
- SignalR
- HTML, CSS, JavaScript

## Acknowledgments

This project was created for educational purposes to learn about real-time web functionality using SignalR in ASP.NET Core.

Feel free to customize this template based on your specific project details. You can add more information about the technologies used, project contributors, or any additional features you implemented during your learning journey.
