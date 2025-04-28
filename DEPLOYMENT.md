# Deploying to Vercel

This guide explains how to deploy the Modbus Connector Portal to Vercel for web access.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [Firebase project](https://console.firebase.google.com/) (if you want to use the Firebase features)
3. Git installed on your computer

## Deployment Steps

### 1. Set up Firebase (Optional)

If you want to use Firebase features:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication and Firestore services
3. Get your Firebase configuration from Project Settings > General > Your Apps
4. You'll need these values for the environment variables in step 3

### 2. Deploy with Vercel (Easiest Method)

1. Fork this repository to your GitHub account
2. Go to [https://vercel.com/new](https://vercel.com/new)
3. Import your forked repository
4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Add Environment Variables (if using Firebase):
   - VITE_FIREBASE_API_KEY: Your Firebase API key
   - VITE_FIREBASE_AUTH_DOMAIN: Your Firebase auth domain
   - VITE_FIREBASE_PROJECT_ID: Your Firebase project ID
   - VITE_FIREBASE_STORAGE_BUCKET: Your Firebase storage bucket
   - VITE_FIREBASE_MESSAGING_SENDER_ID: Your Firebase messaging sender ID
   - VITE_FIREBASE_APP_ID: Your Firebase app ID
   - VITE_FIREBASE_MEASUREMENT_ID: Your Firebase measurement ID (optional)
6. Click "Deploy"

### 3. Deploy with Vercel CLI (Alternative Method)

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Navigate to your project directory:
   ```
   cd modbus-connector-portal-main
   ```

4. Create a `.env` file with your Firebase configuration (if using Firebase):
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

5. Deploy to Vercel:
   ```
   vercel
   ```

6. Follow the prompts to complete the deployment.

### 4. Update Your Project

When you make changes to your project, you can update your deployment:

**With GitHub Integration:**
- Simply push changes to your GitHub repository
- Vercel will automatically rebuild and deploy

**With Vercel CLI:**
- Navigate to your project directory
- Run `vercel` again to deploy

## Limitations for Web Deployment

Please note the following limitations when deploying as a web application:

1. **Modbus Communication**: Direct Modbus communication requires a backend server. The web version will need to communicate with your backend API for Modbus operations.
2. **Local File Access**: Web browsers restrict access to local files and hardware. Any features that require direct hardware access will need to be handled through a backend service.
3. **Serial Ports**: Web browsers cannot directly access serial ports. If your application needs to communicate with serial devices, you'll need to use your desktop application or set up a backend service.

## Accessing Your Deployed Application

After deployment, Vercel will provide you with a URL (like `https://your-project.vercel.app`). You can access your application through this URL from any device with internet access.

## Custom Domains

You can set up a custom domain for your Vercel deployment:

1. Go to your project on the Vercel dashboard
2. Click on "Settings" > "Domains"
3. Add your custom domain and follow the instructions 