# Tzeego Travel - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers the best deployment experience.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Enhanced Tzeego Travel"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `GROQ_API_KEY`
   - Click "Deploy"

3. **Done!** Your site will be live in ~2 minutes

**Benefits:**
- ✅ Free SSL certificate
- ✅ Automatic deployments on git push
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Free tier available

---

### Option 2: Netlify

#### Steps:

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your GitHub repo
   - Add environment variables in Netlify dashboard
   - Deploy

**Benefits:**
- ✅ Free SSL
- ✅ Easy setup
- ✅ Good performance

---

### Option 3: VPS/Cloud Server (DigitalOcean, AWS, etc.)

For full control over your deployment.

#### Prerequisites:
- Ubuntu 22.04 server
- Node.js 18+ installed
- Domain name (optional)

#### Steps:

1. **Connect to your server**
   ```bash
   ssh user@your-server-ip
   ```

2. **Install Node.js and pnpm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pnpm
   ```

3. **Upload your project**
   ```bash
   # On your local machine
   scp -r tzeego-travel user@your-server-ip:/home/user/
   ```

4. **Install dependencies and build**
   ```bash
   cd /home/user/tzeego-travel
   pnpm install
   pnpm build
   ```

5. **Set up environment variables**
   ```bash
   nano .env.local
   # Add your environment variables
   ```

6. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

7. **Start the application**
   ```bash
   pm2 start pnpm --name "tzeego" -- start
   pm2 save
   pm2 startup
   ```

8. **Set up Nginx as reverse proxy**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/tzeego
   ```

   Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/tzeego /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. **Set up SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

**Benefits:**
- ✅ Full control
- ✅ Custom configuration
- ✅ Can handle high traffic

---

### Option 4: Docker Deployment

#### Create Dockerfile:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install -g pnpm && pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Deploy with Docker:

```bash
# Build
docker build -t tzeego-travel .

# Run
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -e GROQ_API_KEY=your_key \
  tzeego-travel
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Set strong environment variables
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable security headers
- [ ] Configure CSP (Content Security Policy)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

---

## 🌐 Custom Domain Setup

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL is automatic

### For Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. SSL is automatic

### For VPS:
1. Point your domain's A record to server IP
2. Configure Nginx (see above)
3. Set up SSL with Certbot

---

## 📊 Performance Optimization

### Before Deployment:

1. **Optimize Images**
   - Already using Next.js Image component ✅
   - Consider WebP format for better compression

2. **Enable Caching**
   - Configure CDN caching headers
   - Use service workers for offline support

3. **Minification**
   - Next.js handles this automatically ✅

4. **Code Splitting**
   - Next.js handles this automatically ✅

---

## 🔍 Monitoring

### Recommended Tools:

1. **Vercel Analytics** (if using Vercel)
   - Built-in performance monitoring
   - Real user metrics

2. **Google Analytics**
   - Add tracking code to layout.tsx

3. **Sentry** (Error Tracking)
   ```bash
   pnpm add @sentry/nextjs
   ```

4. **Uptime Monitoring**
   - UptimeRobot
   - Pingdom
   - StatusCake

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test (if you have tests)
      # Add deployment steps here
```

---

## 📱 Testing Before Production

1. **Local Testing**
   ```bash
   pnpm build
   pnpm start
   ```
   Test on http://localhost:3000

2. **Mobile Testing**
   - Use Chrome DevTools mobile emulation
   - Test on real devices

3. **Cross-Browser Testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

4. **Performance Testing**
   - Run Lighthouse audit
   - Check Core Web Vitals

---

## 🆘 Troubleshooting

### Build Fails:
- Check Node.js version (18+)
- Clear `.next` folder and rebuild
- Check for TypeScript errors

### Environment Variables Not Working:
- Ensure they start with `NEXT_PUBLIC_` for client-side
- Restart dev server after changes
- Check spelling and formatting

### Widgets Not Loading:
- Check Travelpayouts credentials
- Verify network connectivity
- Check browser console for errors

---

## 📞 Support

For deployment issues:
- Check Next.js documentation: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- Email: support@tzeego.com

---

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Logo displays properly
- [ ] All widgets function
- [ ] Search results stay in-page
- [ ] Mobile responsive
- [ ] Dark/Light theme works
- [ ] Forms submit correctly
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Error monitoring set up
- [ ] Backup strategy in place

---

**Congratulations on deploying your enhanced Tzeego Travel platform! 🎉**
