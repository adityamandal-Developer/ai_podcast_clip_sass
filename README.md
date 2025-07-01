# 🎙️ AI PodClip Web

A modern web application for AI-powered podcast clipping and management. Built with Next.js 15, TypeScript, and a robust tech stack for seamless audio content processing.

## ✨ Features

- 🤖 AI-powered podcast clipping
- 👤 User authentication and authorization
- 💳 Stripe payment integration
- ☁️ AWS S3 file storage
- 📊 Dashboard with analytics
- 🔄 Background job processing with Inngest
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI components with Radix UI

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend & Database

- **Prisma** - Database ORM
- **NextAuth.js 5** - Authentication
- **bcryptjs** - Password hashing

### External Services

- **AWS S3** - File storage
- **Stripe** - Payment processing
- **Inngest** - Background job processing

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v10.8.2 or higher)
- **Database** (PostgreSQL, MySQL, or SQLite)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-podclip-web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="your-database-connection-string"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# AWS S3
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="your-aws-region"
AWS_S3_BUCKET_NAME="your-s3-bucket-name"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

### 4. Database Setup

#### Initialize Prisma and run migrations:

```bash
# Generate Prisma client
npm run postinstall

# Run database migrations
npm run db:migrate

# (Optional) Push schema changes for development
npm run db:push

# (Optional) Open Prisma Studio to view your data
npm run db:studio
```

#### If you need to start a local database:

```bash
# Make the script executable
chmod +x start-database.sh

# Run the database startup script
./start-database.sh
```

### 5. Development Server

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── actions/          # Server actions
│   ├── auth.ts
│   ├── generation.ts
│   ├── s3.ts
│   └── stripe.ts
├── app/              # Next.js App Router
│   ├── api/          # API routes
│   ├── dashboard/    # Dashboard pages
│   ├── demo/         # Demo page
│   ├── login/        # Authentication pages
│   └── signup/
├── components/       # React components
│   ├── ui/           # Reusable UI components
│   └── ...           # Feature-specific components
├── inngest/          # Background job functions
├── lib/              # Utility functions
├── schemas/          # Zod validation schemas
├── server/           # Server configuration
└── styles/           # Global styles
```

## 🔧 Available Scripts

### Development

```bash
npm run dev          # Start development server with Turbo
npm run build        # Build for production
npm run start        # Start production server
npm run preview      # Build and start production server
```

### Database

```bash
npm run db:generate  # Generate and run migrations
npm run db:migrate   # Deploy migrations
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run typecheck    # Run TypeScript checks
npm run check        # Run lint and typecheck
npm run format:check # Check code formatting
npm run format:write # Format code with Prettier
```

## 🔐 Authentication Setup

This project uses NextAuth.js v5 for authentication. To set up authentication providers:

1. Configure your authentication providers in `src/server/auth/config.ts`
2. Update the database schema if needed
3. Run database migrations: `npm run db:migrate`

## 💳 Stripe Integration

For payment processing:

1. Set up your Stripe account and get API keys
2. Configure webhook endpoints in your Stripe dashboard
3. Update the webhook handler in `src/app/api/webhooks/stripe/route.ts`

## ☁️ AWS S3 Setup

For file uploads and storage:

1. Create an S3 bucket in your AWS account
2. Set up appropriate IAM permissions
3. Configure CORS settings for your bucket
4. Update the S3 configuration in your environment variables

## 🔄 Background Jobs

This project uses Inngest for background job processing:

1. Set up your Inngest account
2. Configure event keys and signing keys
3. Deploy your functions to handle background tasks

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

Ensure all production environment variables are properly configured in your deployment platform.

### Database

Run migrations in production:

```bash
npm run db:migrate
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 🆘 Support

If you encounter any issues:

1. Check the existing issues in the repository
2. Run `npm run check` to verify your setup
3. Ensure all environment variables are properly configured
4. Check the console for any error messages

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
