# Tzeego Travel - Professional Travel Booking Platform

![Tzeego Logo](public/images/tzeego-logo.jpg)

## Overview

Tzeego is a comprehensive travel metasearch platform that helps users find and compare the best deals on flights, hotels, rental cars, and eSIMs from hundreds of providers worldwide. Built with Next.js 15, React 19, and modern web technologies.

## ✨ Key Features

### 🔍 **In-Page Search Results**
- Search results display **within the same website** - no external redirects
- Seamless user experience with embedded Travelpayouts widgets
- Real-time price comparison from hundreds of travel providers

### 🎨 **Professional Design**
- Modern, responsive UI with smooth animations
- Dark/Light theme toggle
- Mobile-first responsive design
- Custom scrollbar and professional styling
- Glass morphism effects and gradient backgrounds

### 💰 **Cashback Rewards Program**
- Earn cashback on every booking
- Accumulate rewards for future travel
- Withdraw to bank account when threshold is met

### 🛠️ **Advanced Features**
- AI-powered travel assistant chat
- User authentication with Supabase
- Price alerts and notifications
- Multi-language support (Google Translate integration)
- Comprehensive FAQ section

### 🌐 **Multi-Service Search**
- **Flights**: Compare prices from airlines and OTAs
- **Hotels**: Find the best accommodation deals
- **Rental Cars**: Compare car rental options
- **eSIMs**: Get international data plans

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone or extract the project**
   ```bash
   cd tzeego-travel
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   The `.env.local` file should contain:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
tzeego-travel/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Homepage
│   │   └── globals.css              # Global styles
│   ├── components/                   # React components
│   │   ├── ui/                      # UI components (buttons, cards, etc.)
│   │   ├── ai-chat.tsx              # AI chat assistant
│   │   ├── auth-modal.tsx           # Authentication modal
│   │   ├── GoogleTranslate.tsx      # Translation widget
│   │   ├── theme-provider.tsx       # Theme context provider
│   │   └── travelpayouts-widgets-enhanced.tsx  # Enhanced widgets
│   ├── contexts/                     # React contexts
│   │   └── auth-context.tsx         # Authentication context
│   └── lib/                         # Utility functions
│       ├── supabase.ts              # Supabase client
│       └── utils.ts                 # Helper functions
├── public/
│   └── images/
│       └── tzeego-logo.jpg          # Tzeego logo
├── .env.local                       # Environment variables
├── next.config.mjs                  # Next.js configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🎯 Key Enhancements

### 1. **Logo Integration**
- Tzeego logo prominently displayed in header and footer
- Animated logo in hero section
- Responsive logo sizing for mobile devices

### 2. **In-Page Results Display**
- Custom JavaScript interceptor prevents external redirects
- Results displayed in iframe within the page
- Smooth scroll to results section
- Professional loading states

### 3. **Professional UI/UX**
- Custom animations (fade-in, slide-in, scale)
- Hover effects on cards and buttons
- Gradient backgrounds and modern color schemes
- Custom scrollbar styling
- Glass morphism effects

### 4. **Enhanced Features Section**
- Visual feature cards with icons
- Best Price Guarantee
- Secure Booking
- Instant Confirmation
- Cashback Rewards

## 🔧 Travelpayouts Integration

The website uses Travelpayouts widgets with the following IDs:
- **Marker**: 661130.661130
- **TRS**: 446445

### Widget Configuration

All widgets are configured to:
- Display results in-page (target=_self)
- Use custom branding colors (blue/red theme)
- Show powered-by attribution
- Support multiple currencies and languages

## 🎨 Customization

### Theme Colors

The color scheme uses:
- **Primary**: Blue (#2681ff)
- **Secondary**: Red (#ef4444)
- **Accent**: Yellow (#fbbf24)

### Fonts

The project uses system fonts with fallbacks for optimal performance.

### Animations

Custom CSS animations include:
- `fade-in`: Smooth entrance animations
- `slide-in-right/left`: Directional slides
- `scale-in`: Zoom effects
- `shimmer`: Loading states

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px+
- **Tablet**: Enhanced layout for 768px+
- **Desktop**: Full features for 1024px+

## 🔐 Authentication

User authentication is handled by Supabase with:
- Email/password login
- Sign up with email verification
- Session management
- Protected routes

## 🤖 AI Chat Assistant

Powered by Groq API, the AI assistant helps users with:
- Travel recommendations
- Booking assistance
- FAQ answers
- General travel queries

## 📊 Performance

- **Lighthouse Score**: 90+ (target)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🛡️ Security

- Environment variables for sensitive data
- Secure API endpoints
- HTTPS enforcement in production
- Input validation and sanitization

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For support, email support@tzeego.com or visit our contact page.

## 🌟 Credits

- **Design & Development**: Tzeego Team
- **Travel Data**: Travelpayouts API
- **Authentication**: Supabase
- **AI Assistant**: Groq
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

---

**Built with ❤️ by the Tzeego Team**
