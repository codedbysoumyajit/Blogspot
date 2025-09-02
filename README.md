# 🚀 DevSpace - Your Personal AI-Powered Blog

Welcome to DevSpace, a modern, full-featured blogging platform built with Next.js and supercharged with generative AI capabilities. This project provides a personal space to share thoughts, stories, and ideas, all managed through a clean and intuitive dashboard.

![DevSpace Homepage](https://placehold.co/800x400?text=DevSpace+App+Screenshot)

## ✨ Features

- **📝 Full-featured Blog:** Create, read, update, and delete blog posts with a rich Markdown editor.
- **🤖 AI Content Generation:** Stuck on a blank page? Provide a topic and let AI draft a title, description, and even the full post content for you.
- **🧠 AI Summarization:** Allow readers to get a quick summary of any article with a single click.
- **❤️ Engagement:** Readers can "like" posts to show their appreciation.
- **🔐 Secure Admin:** A protected dashboard for managing your content, with authentication handled by secure cookies.
- **📱 PWA Ready:** Install the app on any device for a native-like experience and offline access.
- **🎨 Modern UI:** A sleek, responsive interface built with Tailwind CSS and ShadCN UI components.
- **🌗 Dark Mode:** A beautiful dark theme for comfortable reading at night.
- **Pagination:** Easily navigate through a large number of posts.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- A MongoDB database (you can get a free one from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add the following variables.

    ```env
    # MongoDB Connection
    MONGODB_URI="your_mongodb_connection_string"
    MONGODB_DB="devspace" # Or your preferred database name

    # Admin Credentials
    ADMIN_EMAIL="admin@example.com"
    ADMIN_PASSWORD="your_secure_password"

    # JWT Secret for Sessions
    # Generate a secure, random string (e.g., `openssl rand -base64 32`)
    JWT_SECRET_KEY="your_super_secret_jwt_key"

    # Genkit / Google AI API Key
    # Get yours from Google AI Studio: https://aistudio.google.com/app/apikey
    GEMINI_API_KEY="your_google_ai_api_key"
    ```

### Running the Application

1.  **Run the development server:**
    ```sh
    npm run dev
    ```

2.  **Start the Genkit development service (in a separate terminal):**
    This enables the AI features to work locally.
    ```sh
    npm run genkit:watch
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result. You can access the admin dashboard by navigating to `/login`.

## 📁 Project Structure

```
.
├── src
│   ├── ai                 # Genkit flows and configuration
│   ├── app                # Next.js App Router pages and layouts
│   ├── components         # Reusable React components (UI, Forms, etc.)
│   ├── hooks              # Custom React hooks
│   ├── lib                # Core logic, database connection, definitions
│   └── public             # Static assets (icons, images)
├── .env.local             # Environment variables (untracked)
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

Built with ❤️ in Firebase Studio.
