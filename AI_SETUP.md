# 🤖 AI Chatbot Setup Guide

This portfolio includes intelligent AI chatbots that can answer questions about Danial's experience, skills, and projects. Follow this guide to enable full functionality.

## Quick Setup

### 1. Get a Free API Key
- Visit [Chutes AI](https://chutes.ai)
- Sign up for a free account
- Copy your API key from the dashboard

### 2. Configure Environment Variables
Create a `.env.local` file in the project root (same level as `package.json`) and add:

```bash
NEXT_PUBLIC_CHUTES_API_KEY=your_api_key_here
```

### 3. Restart Development Server
```bash
npm run dev
```

## What the AI Can Do

Once configured, the AI assistants can:

- **Career Story Assistant**: Answer detailed questions about Danial's experience, internships, and career journey
- **Smart Contact System**: Provide personalized responses based on whether you're a recruiter, student, or collaborator
- **Technical Discussions**: Discuss Danial's skills, projects, and technical decisions
- **Code Explanation**: Explain code examples and technical concepts

## Fallback Mode

If the API key is not configured, the chatbots will:
- Provide helpful fallback responses
- Guide you through the setup process
- Share basic information about Danial's background
- Direct you to contact information and social links

## Troubleshooting

### Chatbot not responding
- Check that your API key is correct
- Ensure the `.env.local` file is in the project root
- Restart the development server after adding the API key
- Check the browser console for error messages

### API key issues
- Verify your Chutes AI account is active
- Check that you have sufficient API credits
- Ensure the API key format is correct (no extra spaces)

## Support

If you're having trouble setting up the AI features:
- Check the browser console for detailed error messages
- Review the Chutes AI documentation
- Contact Danial at daao165@gmail.com for assistance

---

The AI features enhance the portfolio experience but are not required for the core functionality. The website works perfectly without them!

