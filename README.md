# Simple Login, Registration, and Forgot Password System

This project demonstrates a simple user authentication system using Express.js, Sequelize, JSON Web Tokens (JWT), MySQL2, and Nodemailer.

## Features

- User registration with encrypted passwords and email verification
- User login with JWT-based authentication
- Forgot password functionality with a password reset and email verification

## Getting Started

To get the project up and running on your local machine, follow these steps.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Milandak19/MST-Coding-Test.git
   ```

2. Install dependencies:

   ```bash
   cd MST-Coding-Test
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

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/verify`: Verify a new user.
- `POST /api/auth/signin`: Log in with registered credentials and get a JWT.
- `POST /api/auth/signout`: Log out with registered credentials and delete a JWT.
- `POST /api/auth/forgot-password`: Initiate the forgot password process.
- `POST /api/reset-password`: Reset the user's password using a reset token.

## Technologies Used

- Express.js
- Sequelize (MySQL2)
- JSON Web Tokens (JWT)
- Nodemailer

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
