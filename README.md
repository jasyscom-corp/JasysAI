# JasyAI - AI Gateway Application

A well-organized, maintainable AI gateway application built with modern JavaScript patterns and Cloudflare Workers.

## 🚀 One-Click Deploy

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/jasysai)

**Click the button above to deploy instantly to Cloudflare Workers!**

✅ **Free Plan Compatible** - Deploy without any paid features!

Or follow the [manual deployment guide](DEPLOYMENT.md) for custom setup.

See [Free Plan Setup Guide](FREE_PLAN_SETUP.md) for detailed free plan configuration.

## 🎯 Latest Updates

### ✅ Complete System Implementation (January 2026)
- **SEO System**: Comprehensive meta tags, structured data, and optimization
- **Guest Chat System**: Instant access with 10-message limit per session
- **User Chat System**: Full-featured chat with model selection and history
- **Admin Dashboard**: Complete management interface with user, content, and settings management
- **Payment System**: Package purchasing with credit system integration
- **Database**: KV storage integration and billing system
- **API**: OpenAI-compatible endpoints with model management
- **Layout Consistency**: Unified main layout across all pages with footer and navigation
- **Link Validation**: All button links and page actions verified for validity

### 📊 Deployment Status
- **Status**: ✅ Successfully Deployed
- **URL**: https://ai.jasyscom.workers.dev
- **Plan**: Cloudflare Workers Free Plan
- **Last Updated**: January 18, 2026

### 🔐 Security Features
- **Cloudflare Access Integration**: JWT validation for secure authentication
- **Zero-Trust Security**: All requests validated through Cloudflare Access
- **Dynamic URL Detection**: Automatic domain adaptation without code changes
- **Role-Based Access**: Separate user and admin authentication flows

### 📱 Mobile Responsiveness
- **Responsive Dashboards**: Mobile-optimized user and admin interfaces
- **Touch-Friendly Navigation**: Collapsible mobile menus with smooth animations
- **Adaptive Layouts**: Optimized for all screen sizes and devices

## 🏗️ Project Structure

The application follows a clean, modular architecture optimized for Cloudflare Workers:

```
src/
├── config/                 # Configuration management
│   ├── index.js           # Main configuration exports
│   ├── app.config.js      # Application settings
│   └── config.service.js  # Dynamic configuration service
├── auth/                   # Authentication system
│   ├── index.js           # Auth module exports
│   ├── auth.service.js    # Authentication business logic
│   └── auth.pages.js      # Login/register pages
├── dashboard/              # Dashboard components
│   ├── admin/             # Admin dashboard
│   │   ├── index.js
│   │   ├── admin.controller.js
│   │   └── admin.pages.js
│   └── users/             # User dashboard
│       ├── index.js
│       ├── user.controller.js
│       └── user.pages.js
├── routes/                 # Routing system
│   ├── index.js           # Route exports
│   ├── router.js          # Main router with route resolution
│   ├── auth.routes.js     # Authentication routes (login, register)
│   ├── admin.routes.js    # Admin routes (login, dashboard, API)
│   ├── user.routes.js     # User routes (dashboard, profile)
│   └── api.routes.js      # API routes (chat, usage, settings)
├── db/                     # Database layer
│   ├── index.js           # Database exports
│   └── database.js        # KV storage abstraction and billing
├── models/                 # Data models
│   ├── index.js           # Model exports
│   ├── user.model.js      # User data model
│   ├── chat.model.js      # Chat/message model
│   ├── apikey.model.js    # API key model
│   └── usage.model.js     # Usage tracking model
├── utils/                  # Utility functions
│   ├── index.js           # Utility exports
│   ├── assets.js          # Static assets and constants
│   ├── helpers.js         # Helper functions
│   └── logger.js          # Structured logging system
├── worker.js              # Main Cloudflare Worker entry point
└── index.js               # Application entry point and exports
```

### Directory Breakdown

- **`config/`** - Application configuration and settings management
- **`auth/`** - Authentication services and UI components
- **`dashboard/`** - Admin and user dashboard components
- **`routes/`** - HTTP route handlers and routing logic
- **`db/`** - Database abstraction layer for KV storage
- **`models/`** - Data models with validation and business logic
- **`utils/`** - Shared utilities and helper functions
- **`worker.js`** - Cloudflare Worker main handler
- **`index.js`** - Application entry point and module exports

## 🚀 Key Features

### ✅ Free Plan Compatible
- **No Paid Features**: Works entirely on Cloudflare Workers Free Plan
- **CPU Limits**: Removed for free plan compatibility
- **KV Storage**: Uses free tier KV storage (1GB, 100K reads/day)
- **Cost**: $0/month for basic usage

### SEO System
- **Comprehensive Meta Tags**: Open Graph, Twitter Cards, schema.org
- **Dynamic Optimization**: Page-specific content and structured data
- **Responsive Design**: Mobile-friendly with SEO best practices
- **Performance Optimized**: Fast load times and efficient rendering

### Guest Chat System
- **Instant Access**: No login required
- **Message Limit**: 10 messages per session
- **Guest Models**: GPT-3.5 Turbo, Claude 3 Haiku, Llama 3.1 8B
- **Session Management**: Chat history per session

### User Chat System
- **Full-Featured Chat**: Model selection, chat history, and management
- **Model Unlocking**: Purchase packages to unlock premium models
- **Credits System**: Usage tracking and billing integration
- **Chat History**: Persistent chat storage and retrieval

### Admin Dashboard System
- **User Management**: View, search, delete users, add credits
- **Analytics**: Dashboard with user count, active users, total usage
- **Content Management**: Manage system content pages
- **Settings**: Platform configuration and management
- **Activity Logs**: User tracking and usage statistics

### Payment System
- **Three Packages**: Basic (25,000 IDR), Premium (50,000 IDR), Ultimate (100,000 IDR)
- **Model Unlocking**: Each package unlocks specific AI models
- **Credit System**: Deduction on purchase and usage tracking
- **Package Benefits**: Higher limits, premium models, priority support

### Landing Page System
- **Interactive Landing Page**: Modern, responsive design with Tailwind CSS
- **Feature Showcase**: Highlights AI capabilities and pricing
- **Call-to-Action**: Clear user registration and login flows
- **Security Focused**: No admin portal links exposed to users

### Authentication System
- User registration and login
- Admin authentication (separate portal)
- Session management
- API key authentication

### Dashboard System
- **User Dashboard**: Credit management, API keys, chat history
- **Admin Dashboard**: User management, system settings, usage analytics (secure access)

### API Layer
- OpenAI-compatible API endpoints with full compatibility
- RESTful API design with comprehensive error handling
- Request validation and rate limiting
- Multi-language SDK examples (Python, JavaScript, PHP, Go, Ruby, Java, C#)
- Dynamic documentation with live code examples
- Streaming support for real-time responses

### Database Layer
- KV storage abstraction
- Usage tracking and billing
- Session management
- Data persistence

## 🎨 Landing Page Features

### Modern Design
- **Responsive Layout**: Built with Tailwind CSS for mobile-first design
- **Interactive Elements**: Smooth animations and hover effects
- **Dark Theme**: Professional dark color scheme with gradient backgrounds
- **Navigation**: Sticky header with mobile menu support

### Content Sections
- **Hero Section**: Eye-catching headline with call-to-action buttons
- **Features Grid**: Showcase of platform capabilities with icons
- **Pricing Plans**: Transparent pricing with highlighted popular plan
- **API Documentation**: Quick start example and integration guide
- **Footer**: Complete site navigation and legal links

### Security Features
- **No Admin Links**: Admin portal access removed from user-facing pages
- **Separate Authentication**: User and admin login flows completely separated
- **Clean URLs**: Landing page at root (`/`), login at `/app`

## 📝 Content Management System

### Dynamic Content Pages
- **About Page**: `/about` - Company information and mission
- **Blog Page**: `/blog` - Latest news and updates
- **Contact Page**: `/contact` - Contact information and form
- **Privacy Policy**: `/privacy-policy` - Data protection policies
- **Terms of Service**: `/terms-of-service` - Service terms and conditions
- **Security Page**: `/security` - Security measures and practices

### Admin Content Management
- **Content Editor**: Rich text editor for page content
- **Real-time Updates**: Instant content updates without deployment
- **Version Tracking**: Track last updated timestamps
- **Preview Mode**: Preview changes before publishing
- **Export/Import**: Backup and restore content functionality

### Database Storage
- **Cloudflare D1**: Content stored in D1 database for persistence
- **Key-Value Structure**: Simple content storage with metadata
- **Admin Access**: Secure admin authentication for content updates
- **Automatic Caching**: Optimized content delivery

## 🛠️ Development

### Environment Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Deploy to Cloudflare Workers

### Key Configuration
- `JASYSAI_KV`: KV namespace for data storage
- OpenRouter API key configuration
- Admin credentials setup

### Development Patterns
- **Service Layer**: Business logic in services
- **Controller Layer**: Request handling in controllers
- **Model Layer**: Data structures in models
- **Utility Layer**: Helper functions in utils

## 📁 File Organization

### Configuration (`src/config/`)
- `app.config.js`: Application settings, AI model packages, pricing rates
- `config.service.js`: Dynamic configuration management and validation
- `index.js`: Centralized configuration exports

### Authentication (`src/auth/`)
- `auth.service.js`: User/admin authentication, session management, registration
- `auth.pages.js`: Landing page, login, register, and admin login UI components
- `index.js`: Authentication module exports

### Routes (`src/routes/`)
- `router.js`: Main request router with route resolution logic
- `auth.routes.js`: User authentication routes (`/`, `/app`, `/auth/login`, `/auth/register`)
- `admin.routes.js`: Admin routes (`/admin`, `/admin/login`, `/admin/dashboard`, `/api/admin/*`)
- `user.routes.js`: User dashboard routes (`/app`, `/app/dashboard`)
- `api.routes.js`: API endpoints (`/api/chat`, `/api/user/*`, `/api/*`)
- `index.js`: Route module exports

### Database (`src/db/`)
- `database.js`: KV storage abstraction, usage tracking, billing calculations
- `index.js`: Database module exports and utilities

### Models (`src/models/`)
- `user.model.js`: User data model with validation and methods
- `chat.model.js`: Chat and message data model
- `apikey.model.js`: API key management model
- `usage.model.js`: Usage tracking and billing model
- `index.js`: Model exports and relationships

### Utils (`src/utils/`)
- `helpers.js`: Common utility functions and helpers
- `logger.js`: Structured logging system with levels
- `assets.js`: Static assets, constants, and UI components
- `index.js`: Utility module exports

### Core Files
- `worker.js`: Main Cloudflare Worker entry point with fetch and scheduled handlers
- `index.js`: Application entry point and module re-exports

## 🔧 Deployment

### ✅ Free Plan Deployment
```bash
# Automatic deployment with KV setup (Windows/Mac/Linux)
npm run deploy:auto

# Or manual deployment
npm run deploy

# Preview locally
npm run dev
```

### 🔧 Automatic Setup
The deployment script automatically:
- Creates KV namespaces for data storage
- Binds KV to the worker
- Deploys to `https://ai.jasyscom.workers.dev`

### Environment Variables
- `JASYSAI_KV`: KV namespace binding (auto-created)
- `OPENROUTER_KEY`: OpenRouter API key
- `ADMIN_USER`: Admin username
- `ADMIN_PASS`: Admin password
- `JWT_SECRET`: JWT signing secret

### 📋 Free Plan Limits
- **Requests**: 100,000 per day
- **CPU Time**: 10ms per request
- **KV Storage**: 1GB total
- **KV Reads**: 100,000 per day
- **KV Writes**: 1,000 per day

> 💡 **Note**: This application is optimized for free plan usage. Monitor your usage in Cloudflare Dashboard.

## 📊 Monitoring

### Logging
- Structured JSON logging
- Request/response tracking
- Error logging with context
- Performance metrics

### Analytics
- Usage tracking per user
- Cost calculation and billing
- Model usage statistics
- System performance metrics

## 🔒 Security

### Authentication
- Secure session management
- API key authentication
- Role-based access control
- Input validation and sanitization

### Data Protection
- Encrypted data storage
- Secure API endpoints
- Rate limiting
- CORS configuration

## 🧪 Testing

### Structure
- Unit tests for models and services
- Integration tests for API endpoints
- End-to-end tests for user flows
- Performance testing

### Coverage
- Model validation
- Service business logic
- API endpoint testing
- Error handling validation

## 📈 Scalability

### Performance
- Efficient KV operations
- Minimal memory footprint
- Fast response times
- Optimized queries

### Architecture
- Stateless design
- Horizontal scaling ready
- Microservice-friendly
- Cloud-native

## 🔄 Maintenance

### Code Quality
- ESLint configuration
- Prettier formatting
- TypeScript definitions
- Documentation standards

### Updates
- Semantic versioning
- Backward compatibility
- Migration scripts
- Change logs

## 🤝 Contributing

### Guidelines
- Follow the established patterns
- Write tests for new features
- Update documentation
- Use conventional commits

### Code Style
- ES6+ modules
- Async/await patterns
- Error-first callbacks
- JSDoc documentation

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples
- Contact the development team

---

**Built with ❤️ using modern JavaScript and Cloudflare Workers**