# JasyAI - AI Gateway Application

A well-organized, maintainable AI gateway application built with modern JavaScript patterns and Cloudflare Workers.

## 🚀 One-Click Deploy

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/jasysai)

**Click the button above to deploy instantly to Cloudflare Workers!**

✅ **Free Plan Compatible** - Deploy without any paid features!

Or follow the [manual deployment guide](DEPLOYMENT.md) for custom setup.

See [Free Plan Setup Guide](FREE_PLAN_SETUP.md) for detailed free plan configuration.

## 🎯 Latest Updates

### ✅ Free Plan Ready (January 2026)
- Removed all paid Cloudflare features
- CPU limits configuration removed
- Successfully deployed to production
- Full compatibility with Cloudflare Workers Free Plan

### 📊 Deployment Status
- **Status**: ✅ Successfully Deployed
- **URL**: https://jasysai.jasyscom-corp.workers.dev
- **Plan**: Cloudflare Workers Free Plan
- **Last Updated**: January 18, 2026

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

### Modular Architecture
- **Separation of Concerns**: Each module has a single responsibility
- **Dependency Injection**: Clean dependencies between modules
- **Index Files**: Clean exports for easy importing

### Authentication System
- User registration and login
- Admin authentication
- Session management
- API key authentication

### Dashboard System
- **User Dashboard**: Credit management, API keys, chat history
- **Admin Dashboard**: User management, system settings, usage analytics

### API Layer
- OpenAI-compatible API endpoints
- RESTful API design
- Proper error handling
- Request validation

### Database Layer
- KV storage abstraction
- Usage tracking and billing
- Session management
- Data persistence

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
- `auth.pages.js`: Login, register, and admin login UI components
- `index.js`: Authentication module exports

### Routes (`src/routes/`)
- `router.js`: Main request router with route resolution logic
- `auth.routes.js`: User authentication routes (`/auth/login`, `/auth/register`)
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
# Deploy to Cloudflare Workers Free Plan
npm run deploy

# Or using wrangler directly
wrangler deploy

# Preview locally
npm run dev
```

### Environment Variables
- `JASYSAI_KV`: KV namespace binding (Free tier: 1GB storage)
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