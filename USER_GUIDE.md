# Tzeego Travel - User Guide

## Welcome to Your Enhanced Travel Platform! 🎉

This guide will help you understand all the improvements and features of your upgraded Tzeego website.

## 🎨 What's New?

### 1. **Professional Logo Integration**
Your Tzeego logo is now beautifully integrated throughout the website:
- **Header**: Logo appears in the top-left corner with hover animation
- **Hero Section**: Large animated logo in the center of the homepage
- **Mobile Menu**: Logo displayed in the mobile navigation
- **Footer**: Branding consistency maintained

### 2. **In-Page Search Results** ✨
**This is the biggest improvement!**

Previously, when users clicked "Search" on Travelpayouts widgets, they were redirected to external websites. Now:

- ✅ Search results **stay within your website**
- ✅ Results appear in an embedded iframe below the search form
- ✅ Smooth scroll animation to results section
- ✅ Professional loading indicators
- ✅ Users never leave your site during the search process

**How it works:**
1. User enters travel details (destination, dates, etc.)
2. Clicks "Search"
3. Results load **right on the same page** in a dedicated results container
4. User can view all options without being redirected
5. When ready to book, they click on a specific offer to complete the purchase

### 3. **Professional Design Enhancements**

#### Visual Improvements:
- **Modern Gradient Backgrounds**: Blue-to-red gradient in hero section
- **Smooth Animations**: Fade-in, slide-in, and scale effects
- **Custom Scrollbar**: Branded blue scrollbar
- **Hover Effects**: Cards lift and shadow on hover
- **Glass Morphism**: Semi-transparent effects with blur
- **Professional Typography**: Clean, readable fonts

#### Feature Cards:
Four professional feature cards showcasing:
- 🌟 Best Price Guarantee
- 🛡️ Secure Booking
- ⚡ Instant Confirmation
- 🏆 Cashback Rewards

### 4. **Enhanced User Experience**

#### Responsive Design:
- ✅ Perfect on mobile phones (320px+)
- ✅ Optimized for tablets (768px+)
- ✅ Full desktop experience (1024px+)

#### Dark/Light Theme:
- Toggle button in header
- Smooth theme transitions
- All components adapt to theme

#### Improved Navigation:
- Sticky header stays visible while scrolling
- Smooth scroll to sections
- Mobile-friendly hamburger menu

## 📱 Using the Website

### Homepage Sections:

1. **Hero Section**
   - Eye-catching gradient background
   - Animated Tzeego logo
   - Call-to-action buttons

2. **Why Choose Tzeego**
   - Feature cards with icons
   - Benefits overview

3. **Search & Compare** (Main Feature)
   - Tabs for Flights, Hotels, Cars, eSIMs
   - Integrated Travelpayouts widgets
   - **Results display in-page**

4. **About Us**
   - Company information
   - Mission statement

5. **FAQ**
   - Expandable question cards
   - Common queries answered

6. **Contact**
   - Contact information
   - Message form
   - Social media links

### Search Functionality:

#### For Flights:
1. Click "Flights" tab
2. Enter departure and destination cities
3. Select dates and passengers
4. Click "Search"
5. **Results appear on the same page below**
6. Browse options and click to book

#### For Hotels:
1. Click "Hotels" tab
2. Enter destination
3. Select check-in/check-out dates
4. Choose rooms and guests
5. Click "Search"
6. **Results display within the page**

#### For Rental Cars:
1. Click "Rent cars" tab
2. Enter pick-up location
3. Select dates and times
4. Click "Search"
5. **View results on the same page**

#### For eSIMs:
1. Click "E sim" tab
2. Select destination country
3. Choose data plan
4. Click "Search"
5. **Results shown in-page**

## 🔧 Technical Features

### Performance:
- Fast page load times
- Optimized images (Next.js Image component)
- Efficient code splitting
- Server-side rendering

### SEO:
- Proper meta tags
- Semantic HTML
- Optimized for search engines

### Accessibility:
- Keyboard navigation support
- ARIA labels
- Focus indicators
- Screen reader friendly

## 🎯 Key Benefits for Your Users

1. **No Redirects**: Users stay on your website throughout the search process
2. **Professional Appearance**: Modern, trustworthy design
3. **Easy Navigation**: Intuitive interface
4. **Fast Performance**: Quick loading and smooth interactions
5. **Mobile Friendly**: Works perfectly on all devices
6. **Branded Experience**: Your logo and colors throughout

## 🚀 Getting Started

### For Development:
```bash
cd tzeego-travel
pnpm install
pnpm dev
```
Visit: http://localhost:3000

### For Production:
```bash
pnpm build
pnpm start
```

## 📊 Travelpayouts Configuration

All widgets use your credentials:
- **Marker**: 661130.661130
- **TRS**: 446445
- **Target**: _self (keeps users on your site)
- **Theme**: Blue/Red matching your brand

## 🎨 Customization Options

### Colors:
Edit in `src/app/globals.css`:
- Primary: Blue (#2681ff)
- Secondary: Red (#ef4444)
- Accent: Yellow (#fbbf24)

### Logo:
Replace `public/images/tzeego-logo.jpg` with your updated logo

### Content:
Edit `src/app/page.tsx` to modify:
- Hero text
- Feature descriptions
- About section
- FAQ items
- Contact information

## 🔐 Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
GROQ_API_KEY=your_api_key
```

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🆘 Troubleshooting

### Widgets not loading?
- Check internet connection
- Verify Travelpayouts credentials
- Clear browser cache

### Logo not showing?
- Ensure `public/images/tzeego-logo.jpg` exists
- Check file permissions
- Rebuild the project

### Results redirecting externally?
- The JavaScript interceptor should prevent this
- Check browser console for errors
- Ensure scripts are loading properly

## 📞 Support

For technical support or questions:
- Email: support@tzeego.com
- Check the README.md for detailed documentation

## 🎉 Enjoy Your Enhanced Website!

Your Tzeego travel platform is now:
- ✅ More professional
- ✅ Better branded with your logo
- ✅ Keeps users on your site
- ✅ Provides excellent user experience
- ✅ Mobile-friendly and fast

Happy travels! 🌍✈️🏨🚗📱
