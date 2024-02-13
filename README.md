# Route Planning Tool MVP Overview

## Introduction
The Route Planning Tool MVP is an innovative application that leverages cutting-edge technologies to optimize routes for users attending multiple jobs in various locations. This document provides a comprehensive overview of the application's architecture, algorithms, and the technologies used in its implementation.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Database:** SQLite

## Application Flow
### Home Page:
- Upon accessing the application, users are greeted with an intuitive home page featuring a sleek and modern map interface powered by the Google Maps JavaScript API.
- A user-friendly input field enables users to effortlessly input addresses for job locations, utilizing advanced geocoding capabilities to accurately pinpoint each location on the map.
- As users submit each address, dynamic markers are dynamically added to the map, providing visual representations of the job locations.

### Backend Server:
- The backend server, powered by Node.js, serves as the backbone of the application, handling incoming requests from the frontend and orchestrating complex route optimization calculations.
- Leveraging the power of asynchronous JavaScript and event-driven architecture, the server efficiently processes user requests, ensuring seamless and responsive performance.

### Route Optimization:
- Upon adding all job locations, users can initiate the route optimization process by clicking on the "Plan Route" button.
- Behind the scenes, the backend server employs sophisticated algorithms, including the Nearest Neighbor algorithm, to calculate the shortest and most efficient route to attend all jobs.
- The Nearest Neighbor algorithm intelligently selects the nearest unvisited location as the next destination from the current location, optimizing the route for minimal travel time and distance.
- The suggested route is dynamically generated and visually displayed on the map, providing users with a clear and concise path to navigate between job locations.

### Job Completion:
- As users progress through their jobs, they can conveniently mark each job as completed, providing valuable feedback for future route optimization calculations.
- Basic navigation guidance is seamlessly integrated into the application, offering users real-time visual cues and directions based on the suggested route line displayed on the map.

## Stack Used
### Frontend Stack:
- HTML: Provides the structural foundation for the web page, ensuring semantic markup and accessibility.
- CSS: Enhances the visual presentation of the web page, delivering a polished and aesthetically pleasing user interface.
- JavaScript: Drives the interactive and dynamic elements of the application, facilitating seamless user interactions and communication with the backend server.

### Backend Stack:
- Node.js: Empowers the backend server with unparalleled scalability and performance, enabling efficient request handling and route optimization calculations.
- SQLite: A lightweight and high-performance relational database system used to store user data, including job locations and completion status, ensuring data integrity and reliability.

## Conclusion
The Route Planning Tool MVP represents a groundbreaking advancement in route optimization technology, offering users a seamless and intuitive solution for efficiently navigating between multiple job locations. By harnessing the power of frontend and backend technologies, coupled with sophisticated algorithms, the application sets a new standard for route planning and job management, empowering users to streamline their workflows and maximize productivity.
