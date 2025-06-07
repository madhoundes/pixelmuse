# PixelMuse - AI Image & Video Generator

[![GitHub License](https://img.shields.io/github/license/madhoundes/pixelmuse)](https://github.com/madhoundes/pixelmuse/blob/main/LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-purple.svg)](https://vitejs.dev/)

**PixelMuse** is a powerful AI-powered image and video generation platform that leverages modern web technologies to provide an intuitive interface for creating stunning visual content. Built with React, TypeScript, and powered by Vite for lightning-fast development.

## 🚀 Features

- **AI Image Generation**: Generate high-quality images from text prompts
- **Reference Image Support**: Upload reference images for enhanced generation
- **Multiple Quality Options**: Choose between LOW, MEDIUM, and HD quality outputs
- **Thumbnail Generator**: Create eye-catching thumbnails for videos and content
- **User Profile Management**: Comprehensive user profile and settings management
- **Real-time Preview**: Live preview of generated content
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI/UX**: Beautiful, dark-themed interface with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Type Safety**: TypeScript 5.5.3
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Iconify React & Lucide React
- **Animations**: Framer Motion 10.16.4
- **Routing**: React Router DOM 6.22.3
- **Charts**: Recharts 2.12.2
- **UI Components**: Headless UI 1.7.18

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Option 1: Clone from GitHub

```bash
# Clone the repository
git clone https://github.com/madhoundes/pixelmuse.git

# Navigate to the project directory
cd pixelmuse

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Option 2: Install from Bolt.new

If this project was created using **Bolt.new**, you can also install it directly:

1. **Visit Bolt.new**: Go to [bolt.new](https://bolt.new)
2. **Import Project**: Use the import feature to clone this repository
3. **Automatic Setup**: Bolt.new will automatically handle the installation process
4. **Start Coding**: Begin developing immediately in the cloud environment

#### Bolt.new Installation Steps:

```bash
# If using Bolt.new's CLI tool
npx create-bolt-app pixelmuse --template=https://github.com/madhoundes/pixelmuse

# Or import directly in Bolt.new interface:
# 1. Open https://bolt.new
# 2. Click "Import from GitHub"
# 3. Enter: https://github.com/madhoundes/pixelmuse
# 4. Click "Import"
```

### Option 3: Manual Installation

```bash
# Create a new directory
mkdir pixelmuse
cd pixelmuse

# Initialize a new Node.js project
npm init -y

# Install all dependencies
npm install react@^18.3.1 react-dom@^18.3.1 @iconify/react@^4.1.1 clsx@^2.0.0 framer-motion@^10.16.4 lucide-react@^0.344.0 tailwind-merge@^2.0.0 @headlessui/react@^1.7.18 focus-trap-react@^10.2.3 react-router-dom@^6.22.3 recharts@^2.12.2

# Install dev dependencies
npm install -D @eslint/js@^9.9.1 @types/react@^18.3.5 @types/react-dom@^18.3.0 @vitejs/plugin-react@^4.3.1 autoprefixer@^10.4.18 eslint@^9.9.1 eslint-plugin-react-hooks@^5.1.0-rc.0 eslint-plugin-react-refresh@^0.4.11 globals@^15.9.0 postcss@^8.4.35 tailwindcss@^3.4.1 typescript@^5.5.3 typescript-eslint@^8.3.0 vite@^5.4.2

# Copy the source files from this repository
# Then run the development server
npm run dev
```

## 🚀 Quick Start

After installation, you can start the development server:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
pixelmuse/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── profile/        # User profile components
│   │   ├── pricing/        # Pricing related components
│   │   ├── notifications/  # Notification components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Sidebar.tsx     # Application sidebar
│   │   ├── EditorPanel.tsx # Main editor interface
│   │   ├── ImageUploader.tsx # Image upload component
│   │   ├── ThumbnailGenerator.tsx # AI thumbnail generator
│   │   ├── PreviewPanel.tsx # Preview component
│   │   └── FeaturesSidebar.tsx # Features sidebar
│   ├── utils/              # Utility functions
│   │   ├── cn.ts          # Class name utility
│   │   ├── dateUtils.ts   # Date utilities
│   │   ├── profileMockData.ts # Mock data for development
│   │   └── typewriterSuggestions.ts # Typewriter effect
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite environment types
├── public/                # Static assets
├── package.json           # Project dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # ESLint configuration
└── README.md             # This file
```

## 🎨 Usage

### Generate AI Images

1. **Enter Prompt**: Type your image description in the prompt textarea
2. **Upload Reference** (Optional): Upload a reference image for better results
3. **Select Quality**: Choose from LOW, MEDIUM, or HD quality
4. **Generate**: Click the "Generate Thumbnail" button
5. **Preview**: View and select from generated options

### Navigate the Interface

- **Sidebar**: Access different generation tools and features
- **Editor Panel**: Main workspace for creating and editing content
- **Preview Panel**: Real-time preview of your generated content
- **Profile**: Manage your account and view generation history

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=your_api_endpoint
VITE_API_KEY=your_api_key

# Image Generation Service
VITE_IMAGE_SERVICE_URL=your_image_service_url
VITE_IMAGE_SERVICE_KEY=your_image_service_key
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```javascript
// Modify colors, fonts, and other design tokens
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      }
    }
  }
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bolt.new** - For providing an excellent development platform
- **React Team** - For the amazing React framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **TypeScript Team** - For bringing type safety to JavaScript

## 🔗 Links

- **Live Demo**: [https://pixelmuse.app](https://pixelmuse.app) _(if deployed)_
- **Documentation**: [GitHub Wiki](https://github.com/madhoundes/pixelmuse/wiki)
- **Issues**: [Report a Bug](https://github.com/madhoundes/pixelmuse/issues)
- **Discussions**: [Join the Community](https://github.com/madhoundes/pixelmuse/discussions)

## 📧 Support

If you have any questions or need help getting started:

- **GitHub Issues**: [Create an Issue](https://github.com/madhoundes/pixelmuse/issues)
- **Email**: your-email@example.com
- **Discord**: Join our community server

---

**Made with ❤️ by [Madhoundes](https://github.com/madhoundes)**

*Built with React, TypeScript, and powered by AI* 