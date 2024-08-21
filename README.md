# Assessment
# Project Overview

This project involves the development of a contact management web application. Initially, the project was intended to use Angular for the frontend. However, I decided to implement the application using an empty .NET Framework template instead of Angular. This approach allowed for a more integrated development process, leveraging the .NET ecosystem for both frontend and backend components.

## Implementation Details

### .NET Framework Frontend
- **Integrated Frontend and Backend**: Instead of using Angular, the frontend was developed using ASP.NET MVC within the .NET Framework. This provided a seamless integration between the user interface and the backend services.
- **Razor Views**: I used Razor Views to create the UI for managing contacts. This included pages for adding, viewing, editing, and deleting contacts.
- **Server-Side Rendering**: The choice of .NET Framework allowed for server-side rendering, which improves performance and simplifies SEO for the application.
- **Styling and UI**: I incorporated HTML, CSS, and Bootstrap to design a clean and intuitive user interface. The layout is responsive and user-friendly, suitable for typical contact management tasks.

### SQL Database
- **Database Schema**: A SQL Server database was designed and implemented to store contacts. The schema includes fields such as name, email, phone number, and address.
- **Data Integrity**: Primary and foreign keys were used where applicable to ensure data integrity.

### C# Backend API
- **RESTful API**: I developed a RESTful API using C# in the .NET Framework to handle CRUD operations for contact management.
- **User Authentication**: Implemented JWT-based authentication for secure user login and session management. User credentials are securely hashed and stored in the database.
- **Data Operations**: The API handles all data operations, including adding, viewing, editing, and deleting contacts. Input validation and error handling are also implemented to ensure robustness.

### User Authentication
- **JWT Authentication**: Implemented JWT tokens for secure user authentication. This ensures that only authenticated users can access and modify contact information.
- **Secure Password Storage**: User passwords are securely hashed before storage in the SQL Server database, adhering to best practices in security.
