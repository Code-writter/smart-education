# Smart Education Platform 🎓

A modern, scalable education platform built with a microservices architecture using Turborepo. This monorepo contains the backend server and shared UI components for a comprehensive e-learning solution.

## 🚀 Features

- **User Authentication** - Secure JWT-based authentication system
- **Email Verification** - Account activation via email
- **API First** - RESTful API design with Express.js
- **Type Safety** - Full TypeScript support across the codebase
- **Monorepo** - Shared code and configurations using Turborepo
- **Scalable** - Built with scalability in mind using MongoDB and Redis

## 🏗️ Project Structure

This monorepo uses Turborepo and includes the following packages/apps:

### Apps

- `server`: Backend API server built with Express.js and TypeScript
  - User authentication and authorization
  - RESTful API endpoints
  - Database models and schemas
  - Email services

### Packages

- `@repo/ui`: Shared React component library
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer with EJS templates
- **Package Manager**: npm
- **Monorepo**: Turborepo

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 10.9.0
- MongoDB instance
- Redis server

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/smart-education.git
   cd smart-education
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `apps/server` directory with the following variables:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   NODEMAILER_EMAIL=your_email@example.com
   NODEMAILER_PASSWORD=your_email_password
   ORIGIN=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Authentication

- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - User login
- `GET /api/v1/logout` - Logout user
- `GET /api/v1/me` - Get current user profile

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your-username/smart-education](https://github.com/your-username/smart-education)

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
