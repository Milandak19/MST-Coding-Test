# Simple Login, Registration, and Forgot Password System

This project demonstrates a simple user authentication system using Express.js, Sequelize, JSON Web Tokens (JWT), and MySQL2.

## Features

- User registration with encrypted passwords
- User login with JWT-based authentication
- Forgot password functionality with password reset

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install dependencies:

   ```bash
   cd your-repo
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory based on `.env.example`.
2. Update the `.env` file with your MySQL database credentials and JWT secret.

### Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Access the API at `http://localhost:3000` (or the port you've configured).

### API Endpoints

- `POST /api/register`: Register a new user.
- `POST /api/login`: Log in with registered credentials and get a JWT.
- `POST /api/forgot-password`: Initiate the forgot password process.
- `POST /api/reset-password`: Reset the user's password using a reset token.

## Technologies Used

- Express.js
- Sequelize (MySQL2)
- JSON Web Tokens (JWT)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
