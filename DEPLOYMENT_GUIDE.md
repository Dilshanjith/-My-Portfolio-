# Deploying MERN Stack Portfolio

## Prerequisites
1. Push your code to a GitHub repository.
2. Ensure your directory structure is:
   - `frontend/`
   - `backend/`

---

## Part 1: Deploy Backend to Microsoft Azure (App Service)

1. **Log in to Azure Portal** (portal.azure.com).
2. **Create a Resource**: Search for "Web App" and create a new one.
   - **Subscription**: Select yours.
   - **Resource Group**: Create new or select existing.
   - **Name**: Give a unique name (e.g., `my-portfolio-api`).
   - **Publish**: Code.
   - **Runtime Stack**: Node 18 LTS (or 20 LTS).
   - **Operating System**: Linux (Recommended for Node.js).
   - **Region**: Select one close to you.
   - **Plan**: Select Free (F1) or Basic (B1) for starting.
3. **Review + Create**: Click create and wait for deployment.

### Configuration (Environment Variables)
1. Go to your new Web App resource.
2. On left menu, under **Settings**, click **Configuration** (or **Environment Variables**).
3. Add the following **Application Settings**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `PORT`: `8080` (Azure App Service often expects this or just uses defaults, but setting it explicitly is good in code. Modify server.js to use `process.env.PORT || 8080`).

### Deployment via GitHub
1. In the Web App menu, go to **Deployment Center**.
2. **Source**: Select **GitHub**.
3. **Authorize** your account and select your **Organization**, **Repository**, and **Branch**.
4. **Build settings**:
   - Due to the `backend` subfolder, Azure might try to build the root.
   - **Option A (Easy)**: Use the generated Workflow file details.
   - **Option B (Recommended for Monorepo)**: Azure will generate a workflow file in `.github/workflows`. You might need to edit it to point to the `backend` folder.

**CRITICAL**: Since your backend is in a subfolder, you need to tell Azure to run `npm install` and start inside `backend`.
- Go to **Configuration** -> **General Settings**.
- **Startup Command**: `cd backend && npm install && npm start`

---

## Part 2: Deploy Frontend to Vercel

1. **Log in to Vercel** (vercel.com) using GitHub.
2. **Add New Project**: Click "Add New..." -> "Project".
3. **Import Git Repository**: Select your Portfolio repository.
4. **Configure Project**:
   - **Framework Preset**: Vite (should detect automatically).
   - **Root Directory**: Click "Edit" and select `frontend`.
5. **Environment Variables**:
   - Add `VITE_API_URL`.
   - Value: The URL of your deployed Azure Backend (e.g., `https://my-portfolio-api.azurewebsites.net/api`).
   - **Note**: Ensure you remove any trailing slash if your code adds it, or match your local setup.
6. **Deploy**: Click "Deploy".

---

## Post-Deployment Checks
1. Update your MongoDB Network Access (Allow Access from Azure IP or Allow All `0.0.0.0/0` if testing).
2. Check the Vercel app. If images don't load, remember that local file uploads (`/uploads`) **WILL NOT WORK** seamlessly on cloud hosting without persistent storage (Azure Blob Storage / AWS S3).
   - *Recommendation*: For a cloud deployment, switch image uploading to use a service like Cloudinary, or just link external image URLs.
