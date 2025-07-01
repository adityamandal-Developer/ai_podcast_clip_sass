# 🎙️ AI Podcast Clipper Backend

A powerful Python backend service that automatically generates vertical video clips from podcast content using AI. Built with Modal for serverless deployment, WhisperX for transcription, and Google Gemini for intelligent moment identification.

## ✨ Features

- 🤖 **AI-Powered Transcription** - WhisperX with large-v2 model for accurate speech-to-text
- 🎯 **Smart Clip Detection** - Google Gemini identifies optimal Q&A moments
- 🎥 **Face Tracking** - Columbia face tracking for dynamic video framing
- 📱 **Vertical Video Generation** - Optimized 9:16 aspect ratio for social media
- 📝 **Automatic Subtitles** - Styled ASS subtitles with custom fonts
- ☁️ **Cloud Storage** - AWS S3 integration for video processing
- ⚡ **Serverless Deployment** - Modal for scalable GPU-powered processing

## 🛠️ Tech Stack

### Core Technologies
- **Modal** - Serverless GPU compute platform
- **Python 3.12** - Programming language
- **CUDA 12.4** - GPU acceleration
- **FFmpeg** - Video processing
- **OpenCV** - Computer vision

### AI & ML Libraries
- **WhisperX** - Speech transcription and alignment
- **Google Gemini 2.5** - Moment identification
- **NumPy** - Numerical computations
- **PyTorch** - Deep learning framework

### Video Processing
- **ffmpegcv** - Video I/O with GPU acceleration
- **pysubs2** - Subtitle generation
- **Columbia Face Tracker** - Face detection and tracking

### Cloud Services
- **AWS S3** - Video storage and delivery
- **Modal Volumes** - Model caching
- **Modal Secrets** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have:

### Required Accounts
- **Modal Account** - Sign up at [modal.com](https://modal.com)
- **AWS Account** - For S3 storage
- **Google AI Studio** - For Gemini API access

### Local Requirements
- **Python 3.8+** - For Modal CLI
- **Modal CLI** - Install with `pip install modal`
- **Git** - For cloning repositories

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-podcast-clipper-backend

# Install Modal CLI
pip install modal

# Login to Modal
modal token new
```

### 2. Environment Configuration

Create Modal secrets for your environment variables:

```bash
# Create Modal secret with all required variables
modal secret create ai-podcast-clip-sass \
  AWS_ACCESS_KEY_ID=your_aws_access_key \
  AWS_SECRET_ACCESS_KEY=your_aws_secret_key \
  AWS_DEFAULT_REGION=your_aws_region \
  GEMINI_API_KEY=your_gemini_api_key \
  AUTH_TOKEN=your_custom_auth_token
```

### 3. Prepare Dependencies

Create a `requirements.txt` file:

```txt
boto3==1.34.0
opencv-python==4.8.1.78
ffmpegcv==0.3.0
numpy==1.24.3
fastapi==0.104.1
pydantic==2.5.0
whisperx==3.1.1
google-generativeai==0.3.2
pysubs2==1.6.1
tqdm==4.66.1
Pillow==10.1.0
```

### 4. Directory Structure

Ensure your project has this structure:

```
ai-podcast-clipper-backend/
├── main.py                    # Main Modal application
├── requirements.txt           # Python dependencies
├── asd/                      # Columbia face tracker
│   ├── Columbia_test.py
│   ├── weight/
│   │   └── finetuning_TalkSet.model
│   └── ...
└── README.md
```

### 5. Deploy to Modal

```bash
# Deploy the application
modal deploy main.py

# Or run locally for testing
modal run main.py
```

## 🔧 Configuration

### AWS S3 Setup

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://ai-podcast-clipper-new
   ```

2. **Set Bucket Policy** (replace `your-bucket-name`):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {"AWS": "arn:aws:iam::YOUR-ACCOUNT:user/YOUR-USER"},
         "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::ai-podcast-clipper-new/*"
       }
     ]
   }
   ```

3. **Configure CORS** (if needed for web access):
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

### Google Gemini Setup

1. **Get API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com)
   - Create a new API key
   - Add to Modal secrets

2. **Test Connection**:
   ```python
   import google.generativeai as genai
   genai.configure(api_key="your-api-key")
   model = genai.GenerativeModel('gemini-pro')
   ```

### Columbia Face Tracker Setup

1. **Download Model**:
   - Place `finetuning_TalkSet.model` in `asd/weight/`
   - Ensure all Columbia dependencies are in `asd/` directory

2. **Font Installation**:
   The Modal image automatically installs Anton font for subtitles.

## 📡 API Usage

### Endpoint
```
POST https://your-modal-app-url/process_video
```

### Headers
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer your_auth_token"
}
```

### Request Body
```json
{
  "s3_key": "path/to/your/video.mp4"
}
```

### Example with cURL
```bash
curl -X POST "https://your-modal-app-url/process_video" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_auth_token" \
  -d '{"s3_key": "test1/example.mp4"}'
```

### Example with Python
```python
import requests

url = "https://your-modal-app-url/process_video"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer your_auth_token"
}
payload = {"s3_key": "test1/example.mp4"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

## 🔄 Processing Pipeline

### 1. Video Download
- Downloads video from S3 using provided key
- Stores temporarily in Modal container

### 2. Audio Extraction & Transcription
- Extracts audio using FFmpeg
- Transcribes with WhisperX large-v2 model
- Performs word-level alignment

### 3. Moment Identification
- Sends transcript to Google Gemini
- AI identifies optimal Q&A segments
- Returns clip boundaries (30-60 seconds)

### 4. Face Tracking
- Runs Columbia face tracker on each clip
- Generates face tracking data
- Scores facial expressions

### 5. Vertical Video Creation
- Creates 1080x1920 vertical format
- Dynamically crops based on face tracking
- Applies blur background for letterboxing

### 6. Subtitle Generation
- Creates ASS subtitle file
- Applies custom styling (Anton font)
- Syncs with word-level timestamps

### 7. Final Processing
- Combines video with subtitles
- Uploads final clip to S3
- Cleans up temporary files

## 📊 Performance & Costs

### GPU Requirements
- **Recommended**: L40S GPU (48GB VRAM)
- **Minimum**: A100 (40GB VRAM)
- **Processing Time**: ~2-5 minutes per clip

### Modal Costs (Approximate)
- **L40S**: ~$1.50/hour
- **Storage**: Volume costs for model caching
- **Network**: Data transfer costs

### Optimization Tips
1. **Model Caching**: Models are cached in Modal volumes
2. **Batch Processing**: Process multiple clips per session
3. **Efficient Cleanup**: Temporary files are automatically removed

## 🐛 Troubleshooting

### Common Issues

1. **CUDA Out of Memory**:
   ```bash
   # Reduce batch size in WhisperX
   result = self.whisperx_model.transcribe(audio, batch_size=8)
   ```

2. **S3 Access Denied**:
   ```bash
   # Check AWS credentials and bucket permissions
   aws s3 ls s3://ai-podcast-clipper-new
   ```

3. **Gemini API Errors**:
   ```bash
   # Verify API key and quota
   export GEMINI_API_KEY=your_key
   ```

4. **FFmpeg Issues**:
   ```bash
   # Check video format compatibility
   ffmpeg -i input.mp4 -f null -
   ```

### Debug Mode

Enable verbose logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Check Modal Logs

```bash
# View application logs
modal logs ai-podcast-clipper

# Stream real-time logs
modal logs ai-podcast-clipper --follow
```

## 📈 Scaling

### Horizontal Scaling
- Modal automatically scales based on demand
- Configure `retries` and `timeout` for reliability
- Use `scaledown_window` to optimize costs

### Vertical Scaling
- Increase GPU memory for larger videos
- Adjust batch sizes for transcription
- Optimize video resolution for faster processing

## 🔒 Security

### Best Practices
1. **Secure Secrets**: Use Modal secrets for all credentials
2. **Authentication**: Implement strong bearer tokens
3. **Input Validation**: Validate S3 keys and file types
4. **Network Security**: Restrict API access if needed

### Environment Variables
```bash
# Required secrets in Modal
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_DEFAULT_REGION=us-east-1
GEMINI_API_KEY=your_gemini_key
AUTH_TOKEN=your_secure_token
```

## 📚 Development

### Local Testing
```bash
# Test locally (requires GPU)
modal run main.py::main

# Deploy to Modal
modal deploy main.py
```

### Code Structure
- `AiPodcastClipper`: Main Modal class
- `process_video`: FastAPI endpoint
- `transcribe_video`: WhisperX integration
- `identify_moments`: Gemini AI integration
- `process_clip`: Video processing pipeline
- `create_vertical_video`: Video format conversion
- `create_subtitles_with_ffmpeg`: Subtitle generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Test with Modal: `modal run main.py`
4. Commit changes: `git commit -m 'Add new feature'`
5. Push to branch: `git push origin feature/new-feature`
6. Submit a pull request

## 🆘 Support

### Getting Help
1. Check Modal documentation: [docs.modal.com](https://modal.com/docs)
2. AWS S3 documentation: [aws.amazon.com/s3](https://aws.amazon.com/s3)
3. Google Gemini API: [ai.google.dev](https://ai.google.dev)

### Common Resources
- [Modal Examples](https://github.com/modal-labs/modal-examples)
- [WhisperX Documentation](https://github.com/m-bain/whisperX)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

---

Built with ❤️ using Modal, Python, and cutting-edge AI technologies.


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
