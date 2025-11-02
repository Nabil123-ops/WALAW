# Tzeego Travel - Quick Start Guide

## 🚀 Get Your Website Running in 5 Minutes!

### Step 1: Extract the Files
Unzip `tzeego-travel-enhanced.zip` to your desired location.

### Step 2: Install Dependencies
Open terminal/command prompt in the project folder:

```bash
cd tzeego-travel
pnpm install
```

*Don't have pnpm? Install it first:*
```bash
npm install -g pnpm
```

### Step 3: Configure Environment Variables
The `.env.local` file is already included. Update it with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key_here
GROQ_API_KEY=your_groq_api_key_here
```

*Note: If you don't have these yet, the website will still work - just authentication and AI chat won't function.*

### Step 4: Start Development Server
```bash
pnpm dev
```

### Step 5: Open Your Browser
Visit: **http://localhost:3000**

**That's it! Your enhanced Tzeego website is now running! 🎉**

---

## 🎯 What You'll See

### Homepage Features:
1. **Header** - Logo, navigation, theme toggle, login/signup
2. **Hero Section** - Animated logo, gradient background, CTA buttons
3. **Features** - 4 professional feature cards
4. **Search Section** - Tabs for Flights, Hotels, Cars, eSIMs
5. **About Section** - Company information
6. **FAQ** - Expandable questions
7. **Contact** - Contact info and form
8. **Footer** - Logo and copyright

### Try These Features:
- ✅ Click the moon/sun icon to toggle dark/light theme
- ✅ Click on different tabs (Flights, Hotels, Cars, eSIM)
- ✅ Try searching for flights - results will appear on the same page!
- ✅ Scroll through the page to see smooth animations
- ✅ Resize your browser to see responsive design
- ✅ Open on mobile to see mobile-optimized layout

---

## 📝 Important Notes

### Travelpayouts Widgets:
The widgets are configured with your credentials:
- **Marker**: 661130.661130
- **TRS**: 446445

They should load automatically. If you see a loading spinner, wait a few seconds for the widgets to initialize.

### In-Page Results:
When you search, results will display **within the page** instead of redirecting to external sites. This is the main enhancement!

---

## 🔧 Common Commands

### Development:
```bash
pnpm dev          # Start development server
```

### Production:
```bash
pnpm build        # Build for production
pnpm start        # Start production server
```

### Other:
```bash
pnpm lint         # Check code quality
```

---

## 📱 Testing Checklist

Before deploying, test these:

- [ ] Logo appears in header
- [ ] Hero section shows animated logo
- [ ] All 4 tabs work (Flights, Hotels, Cars, eSIM)
- [ ] Widgets load properly
- [ ] Dark/Light theme toggle works
- [ ] Mobile menu opens on small screens
- [ ] FAQ items expand/collapse
- [ ] Contact form displays correctly
- [ ] Footer shows logo and copyright

---

## 🆘 Troubleshooting

### Widgets Not Loading?
- Check internet connection
- Wait 10-15 seconds for widgets to initialize
- Check browser console for errors (F12)

### Logo Not Showing?
- Ensure `public/images/tzeego-logo.jpg` exists
- Clear browser cache (Ctrl+Shift+R)

### Build Errors?
- Delete `node_modules` and `.next` folders
- Run `pnpm install` again
- Ensure Node.js version is 18 or higher

### Port 3000 Already in Use?
```bash
# Use a different port
pnpm dev -p 3001
```

---

## 📚 Next Steps

1. **Customize Content**
   - Edit `src/app/page.tsx` to change text
   - Update contact information
   - Modify FAQ questions

2. **Add Your Branding**
   - Replace logo if needed
   - Adjust colors in `src/app/globals.css`
   - Update meta tags in `src/app/layout.tsx`

3. **Deploy to Production**
   - See `DEPLOYMENT.md` for detailed instructions
   - Recommended: Deploy to Vercel (easiest)

4. **Set Up Analytics**
   - Add Google Analytics
   - Configure Vercel Analytics
   - Set up error monitoring

---

## 📖 Documentation Files

- **README.md** - Technical documentation
- **USER_GUIDE.md** - Detailed user guide
- **DEPLOYMENT.md** - Deployment instructions
- **ENHANCEMENTS_SUMMARY.md** - What was changed
- **QUICK_START.md** - This file

---

## 🌐 Live Preview

Your website is currently running at:
**https://3000-ivf51cvqt652sexow5qeu-a9b837ce.manus-asia.computer**

*Note: This is a temporary development URL. For production, you'll need to deploy to a hosting service.*

---

## ✅ You're All Set!

Your enhanced Tzeego travel website is ready to use. Explore all the features, customize the content, and when you're ready, deploy it to production!

**Need help?** Check the other documentation files or contact support@tzeego.com

---

**Happy travels! 🌍✈️**
