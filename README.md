# user-management-app

This open source project is a Flask web application focused on user management, utilizing MongoDB for data storage. It's designed to be a collaborative project, and we welcome contributions from the community.

## Features

- **User Authentication**: Log in and log out functionality.
- **User Registration**: Ability for new users to register.
- **Session Management**: Managed by Flask-Login.
- **Password Hashing**: Implemented using Flask-Bcrypt.
- **MongoDB Integration**: User data stored in MongoDB.

## Technologies Used

- **Flask**: A micro web framework written in Python.
- **Flask-WTF & Flask-Login**: Extensions for form handling and user session management.
- **Flask-Bcrypt**: Provides Bcrypt hashing utilities.
- **PyMongo**: MongoDB driver for Python.
- **MongoDB**: A NoSQL database.

## Getting Started

### Prerequisites

- Python
- MongoDB

### Installation

1. **Clone the Repository**:
   ```bash
   git clone [repository-url]
2. **Install Dependencies**:
   ```bash
   pip install Flask Flask-WTF Flask-Login Flask-Bcrypt pymongo certifi
   ```
3. **Setup MongoDB**:
- Ensure MongoDB is running
- Update the connection URI in the application configuration

4. **Run the Application**:
    ```
    python app.py
    ```


## Contributing
We welcome contributions of all forms. Here are some ways you can contribute:

- **Submitting Patches and Enhancements**: Fork the repository and submit pull requests with your changes.
- **Reporting Issues**: Use the GitHub Issues section to report bugs and suggest enhancements.
- **Documentation**: Help improve or translate the documentation.
- **Community Support**: Help others in the community understand and use the project.
### Guidelines
- Ensure your code adheres to the project's coding standards.
- Write tests for new functionalities.
- Update the documentation as needed.