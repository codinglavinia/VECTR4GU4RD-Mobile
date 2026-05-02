 🇷🇴 VectraGuard este o aplicație mobile și web pentru monitorizarea securității rețelei, combinând detecție bazată pe reguli și Machine Learning pentru alerte în timp real.

🇬🇧 VectraGuard is a application for mobile and web platforms. It integrates a native Android network sniffer implemented in Java (VpnService) with a React-based interface, combining rule-based detection in Python with Machine Learning for extraction and real-time monitoring and alert persistence.

🇪🇸 VectraGuard es una aplicación multiplataforma( móvil+ web) para la monitorización de seguridad de red, combinando detección basada en reglas y Machine Learning para alertas en tiempo real.

🇩🇪 VectraGuard ist eine Mobile- und Web-App zur Überwachung der Netzwerksicherheit, die regelbasierte Erkennung und Machine Learning für Echtzeitwarnungen kombiniert

##Project Architecture :
```
VectraGuard Multiplatform Application 
 ├── packages/
+│   ├── shared/                    # Shared React Native logic
+│   │   ├── src/
+│   │   │   ├── hooks/
+│   │   │   ├── utils/
+│   │   │   ├── types/
+│   │   │   └── services/
+│   │   ├── package.json
+│   │   └── tsconfig.json
+│   │
+│   └── web/                       # Web dashboard (React + Vite)
+│       ├── src/
+│       │   ├── pages/
+│       │   ├── components/
+│       │   ├── services/
+│       │   └── App.tsx
+│       ├── package.json
+│       ├── vite.config.ts
+│       └── tsconfig.json
+│
+├── apps/
+│   ├── mobile/                    # React Native + Expo (renamed from /app)
+│   │   ├── app/
+│   │   ├── package.json
+│   │   └── tsconfig.json
+│   │
+│   └── backend/                   # Node.js Express (renamed from /Backend)
+│       ├── src/
+│       ├── package.json
+│       └── tsconfig.json
+│
+├── services/
+│   └── ml-service/                # Python ML service
+│       ├── app.py
+│       ├── model.py
+│       ├── requirements.txt
+│       └── docker/ (optional)
+│
+├── android/                       # Android native modules
+│   ├── app/src/main/java/.../
+│   │   ├── VpnModule.java 
+│   │   └── PacketSnifferService.java
+│   └── build.gradle
+│
+└── root package.json              # Monorepo coordinator 
```
## Getting Started :

### Requirements :
*   [Node.js](https://nodejs.org/) (v18 or later recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/codinglavinia/VectraGuard-App
    cd https://github.com/codinglavinia/VectraGuard-App
    ```

2.  **Installing the necesary dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    *   Copy the `.env.example` file to a new file named `.env.local`:
        ```bash
        cp .env.example .env.local
        ```
    *   Open `.env.local` and configure the necessary variables (e.g., database connection details if you are setting up a real database). For now, the mock data will work without these.

### Running the Development Server

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will typically start the application on `http://localhost:3000` (or `http://localhost:9002` as per your `package.json`).

2.  **(Optional) Start Genkit development server (if using GenAI features):**
    Open a new terminal and run:
    ```bash
    npm run genkit:dev
    ```

## User Guide:

1.  **Registration:**
    *   Navigate to the `/register` page.
    *   Fill in your name, email, password, and preferred language.
    *   The first user to register will automatically be assigned the 'admin' role. Subsequent users will be 'user' by default.

2.  **Login:**
    *   Navigate to the `/login` page.
    *   Enter your registered email and password.

3.  **Dashboard:**
    *   After logging in, you will be redirected to the dashboard.
    *   The dashboard provides an overview of key metrics, recent activities, and quick links.

4.  **Navigation:**
    *   Use the sidebar to navigate between different modules .


5.  **User Profile and Settings:**
    *   Access your profile and settings from the user avatar dropdown in the header.
    *   **Profile Page:** View your details, and edit your bio.
    *   **Settings Page:** Change your email, password, and notification preferences.

6.  **System Notifications (Admin/Moderator):**
    *   Admins and Moderators can access the "System Notifications" section from the sidebar.
    *   Here, they can create, view, edit, and delete notification configurations.
    *   Notifications can be targeted to specific user roles (admin, moderator, user, all) and can be sent once or on a recurring basis.
    *   Users will receive these notifications via (simulated) email if their email notification setting is enabled in their profile settings.

## Connecting to the Database

The current application uses mock data. To connect to a real database:

1.  **Choose and set up your database:** (such as PostgreSQL, MySQL, MongoDB).
2.  **Install the necessary database client library for Node.js:**
    *   For PostgreSQL: `npm install pg`
    *   For MySQL: `npm install mysql2`
    *   For MongoDB: `npm install mongodb`
3.  **Update `.env.local`** with your database connection credentials.
4.  **Modify `src/lib/mockData.ts` (or create new service files):**
    *   Replace the functions that interact with the mock arrays (e.g., `getClientes`, `addCliente`) with functions that perform actual database queries using your chosen client library or an ORM (like Prisma or TypeORM).
    *   You will need to write SQL queries or use ORM methods to interact with your database tables/collections.
    *   Ensure your database schema matches the `src/types/index.ts` interfaces.

## Deployment :

### Vercel (Recommended)

1.  Push your project to a GitHub, GitLab, or Bitbucket repository.
2.  Sign up or log in to [Vercel](https://vercel.com/).
3.  Import your project from your Git provider.
4.  Configure environment variables in the Vercel project settings (especially for database connections and any API keys).
5.  Vercel will automatically build and deploy your application.

### Firebase Hosting

1.  Install Firebase CLI: `npm install -g firebase-tools`
2.  Login to Firebase: `firebase login`
3.  Initialize Firebase in your project: `firebase init hosting`
    *   Select your Firebase project.
    *   Configure as a single-page app (SPA): No (for Next.js with server-side rendering).
    *   Set your public directory to `.next` (or follow Next.js specific Firebase deployment guides).
4.  For dynamic Next.js features, you might need to set up Firebase Functions. Refer to the official [Firebase documentation for deploying Next.js apps](https://firebase.google.com/docs/hosting/frameworks/nextjs).
5.  Deploy: `firebase deploy`
