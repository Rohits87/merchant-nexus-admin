# PaymentHub Admin Portal

A comprehensive payment service provider (PSP) admin portal built with Next.js, TypeScript, and Supabase. This application provides a complete solution for managing merchants, payment gateways, acquirer banks, and transaction processing.

## 🚀 Features

### Core Functionality
- **Merchant Management**: Complete merchant onboarding, configuration, and lifecycle management
- **Payment Gateway Integration**: Support for multiple payment gateways with real-time configuration
- **Acquirer Bank Management**: Comprehensive bank partnership and BIN range management
- **Transaction Processing**: Real-time transaction monitoring and reporting
- **User Access Control**: Role-based permissions and audit logging

### Technical Features
- **Modern Stack**: Built with Next.js 14, React 18, and TypeScript
- **Database**: Supabase PostgreSQL with real-time subscriptions
- **UI Components**: Shadcn/ui with Tailwind CSS for responsive design
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Charts & Analytics**: Recharts for data visualization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd merchant-nexus-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - The database schema is automatically managed through Supabase migrations
   - Sample data is included for development

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Global providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── layout/           # Layout components
│   ├── merchants/        # Merchant management
│   ├── gateways/         # Gateway management
│   ├── acquirers/        # Acquirer management
│   └── dashboard/        # Dashboard components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── integrations/         # External service integrations
│   └── supabase/        # Supabase client and types
└── supabase/            # Database migrations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Features

### Merchant Management
- Complete merchant onboarding workflow
- Multi-tab interface for merchant details
- Payment method configuration
- Address and contact management
- Technical configuration settings

### Payment Gateway Management
- Gateway registration and configuration
- Supported payment methods mapping
- API endpoint configuration
- SLA and timeout settings
- Real-time status monitoring

### Acquirer Bank Management
- Bank partnership management
- BIN range configuration
- Multi-currency support
- Contact and support information
- Status and maintenance tracking

### Dashboard & Analytics
- Real-time transaction metrics
- Revenue and volume tracking
- Interactive charts and graphs
- Performance monitoring
- System health indicators

## 🔐 Security Features

- Row Level Security (RLS) with Supabase
- Environment variable protection
- Type-safe database operations
- Input validation with Zod schemas
- Secure API endpoints

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Version History

- **v1.0.0** - Initial release with core PSP functionality
- **v1.1.0** - Added Next.js 14 support and improved performance
- **v1.2.0** - Enhanced UI/UX and added advanced analytics

---

Built with ❤️ using Next.js and Supabase