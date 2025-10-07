# 🎓 ChatGPTMCQ# ChatGPTMCQ# 🎓 MCQ Quiz Application# 🎓 MCQ Quiz Application# MCQ Quiz Website 🎯



A modern, interactive MCQ quiz platform that generates custom multiple-choice questions using ChatGPT. Built with Next.js 15, TypeScript, and Tailwind CSS.



## ✨ FeaturesA modern, interactive quiz platform that generates custom multiple-choice questions using ChatGPT. Built with Next.js, TypeScript, and Tailwind CSS.



- 🎯 **AI-Powered Quiz Generation** - Generate custom MCQ prompts for any topic with ChatGPT

- ⏱️ **Smart Timer System** - Configurable timer with pause/resume and auto-submit

- 📊 **Instant Results** - Comprehensive score breakdown with explanations## FeaturesA modern, fully responsive Multiple Choice Question (MCQ) quiz application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features a sticky countdown timer with pause/resume functionality, real-time progress tracking, and seamless Vercel deployment.

- 🎨 **Modern UI/UX** - Fully responsive design with smooth animations

- 🔒 **Privacy First** - All processing done locally in your browser



## 🚀 Quick Start### 🎯 Dynamic Quiz Generation



### Prerequisites- Generate custom MCQ prompts for any topic

- Node.js 18+ installed

- npm or yarn- Specify the number of questions (1-100)![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)A fully responsive, feature-rich Multiple Choice Question (MCQ) quiz application built with Next.js 15, TypeScript, and Tailwind CSS. Features a sticky countdown timer, complete pause/resume functionality, and seamless Vercel deployment.A fully client-side, serverless MCQ (Multiple Choice Question) quiz application built with Next.js 15, TypeScript, and Tailwind CSS 4. Perfect for creating and taking custom quizzes with real-time scoring, performance analytics, and a **fully responsive design** that works on all devices from mobile phones to ultra-wide monitors.



### Installation- Get AI-powered quiz questions in seconds



```bash![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

# Clone the repository

git clone https://github.com/itsrahulanshu/mcq-quiz-.git### ⏱️ Smart Timer System



# Navigate to project directory- Configurable quiz timer (1-60 minutes)![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

cd mcq-quiz-

- Pause and resume functionality

# Install dependencies

npm install- Auto-submit when time runs out![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)



# Run development server- Real-time countdown display

npm run dev

```![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?logo=next.js)## ✨ Features



Visit [http://localhost:3000](http://localhost:3000) to see the app.### 🎨 Beautiful UI/UX



## 📝 How to Use- Gradient-based modern design---



1. **Generate Prompt** - Enter your topic and number of questions- Fully responsive interface

2. **Copy to ChatGPT** - Use the generated prompt in ChatGPT

3. **Paste JSON** - Import the questions from ChatGPT's response- Smooth animations and transitions![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

4. **Start Quiz** - Take the quiz with timer

5. **View Results** - See your score and review answers- Step-by-step visual indicators



## 🛠️ Tech Stack## ✨ Features



- **Framework**: Next.js 15 with App Router### 📊 Instant Results

- **Language**: TypeScript

- **Styling**: Tailwind CSS 4- Comprehensive score breakdown![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)### 1. **Dynamic Question Loading**

- **Build Tool**: Turbopack

- **Deployment**: Vercel- Color-coded question review



## 📦 Project Structure- Export results as JSON### Core Functionality



```- See correct answers instantly

quiz/

├── app/              # Next.js app directory- 📝 **Custom Question Input** - Load questions via JSON format![License](https://img.shields.io/badge/license-MIT-green)- Paste custom questions in JSON format

├── components/       # React components

├── context/          # React Context (Timer)### 🔒 Privacy First

├── types/            # TypeScript types

└── public/           # Static assets- All data processed locally in browser- 📊 **Real-time Scoring** - Instant result calculation with detailed analytics

```

- No data collection or tracking

## 🌐 Deployment

- No user accounts required- 🔄 **Question Navigation** - Previous/Next buttons + Quick navigation grid- Load sample questions to get started quickly

### Deploy to Vercel

- Completely client-side

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/itsrahulanshu/mcq-quiz-)

- 📈 **Progress Tracking** - Visual progress bar and answered question counter

Or manually:

## How It Works

```bash

# Build for production- 🎯 **Result Review** - Comprehensive breakdown of correct/wrong answers with explanations## ✨ Features- Real-time validation of question format

npm run build

1. **Generate Prompt**: Enter topic name and number of questions

# Deploy to Vercel

vercel deploy2. **Copy to ChatGPT**: Use the generated prompt in ChatGPT

```

3. **Import Questions**: Paste the JSON response from ChatGPT

## 📄 License

4. **Start Quiz**: Take the quiz with a timer### Timer System- Support for multiple quiz sessions

MIT License - feel free to use this project for learning or personal use.

5. **View Results**: See your score and review answers

## 👨‍💻 Author

- ⏱️ **Sticky Header Timer** - Always visible countdown timer

**Rahulanshu**

## Tech Stack

- GitHub: [@itsrahulanshu](https://github.com/itsrahulanshu)

- Repository: [mcq-quiz-](https://github.com/itsrahulanshu/mcq-quiz-)- 🚀 **Auto-start** - Timer begins automatically when quiz loads### 🎯 Core Functionality- Optional question IDs and explanations



---- **Framework**: Next.js 15 with App Router



Made with ❤️ by Rahulanshu- **Language**: TypeScript- ⏸️ **Pause/Resume** - Complete pause functionality with visual feedback


- **Styling**: Tailwind CSS 4

- **State Management**: React Context API- ⏰ **Auto-submit** - Quiz automatically submits when timer reaches 0- **Load Custom Questions**: JSON-based question input with ChatGPT integration guide

- **Build Tool**: Turbopack

- 🎨 **Color-coded States**:

## Getting Started

  - 🟣 Purple: Normal operation- **Sample Questions**: Pre-loaded demo questions to get started instantly### 2. **Interactive Quiz Interface**

```bash

# Install dependencies  - 🟠 Orange: Paused state

npm install

  - 🔴 Red: Critical (< 60 seconds)- **Real-time Scoring**: Instant calculation of results with detailed analytics- One question at a time with clean, modern UI

# Run development server

npm run dev



# Build for production### Pause Protection- **Review Mode**: Comprehensive review of wrong and correct answers with explanations- Visual highlighting of selected options with gradient effects

npm run build

When paused, **ALL** quiz interactions are disabled:

# Start production server

npm start- ❌ Option selection (radio buttons)- **Export Results**: Download questions as JSON or copy to clipboard- Next/Previous navigation buttons (adaptive text on mobile)

```

- ❌ Navigation buttons (Previous/Next)

Open [http://localhost:3000](http://localhost:3000) to see the application.

- ❌ Submit button- Question navigator showing answered/unanswered status (5-16 columns adaptive grid)

## Deployment

- ❌ Quick navigation grid

This project is ready to deploy on Vercel with zero configuration:

- ✅ Visual overlay with "Quiz Paused" message### ⏱️ Timer System- Progress bar with percentage tracking

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/itsrahulanshu/mcq-quiz-)



## Repository

### Responsive Design- **Sticky Header**: Timer always visible at the top, even when scrolling- **Fully responsive** on all screen sizes

GitHub: [https://github.com/itsrahulanshu/mcq-quiz-](https://github.com/itsrahulanshu/mcq-quiz-)

- 📱 **Mobile-first** - Optimized for all screen sizes

## License

- 💻 **Desktop-ready** - Efficient use of larger screens- **Auto-start**: Automatically begins countdown when quiz loads

MIT License - feel free to use this project for personal or commercial purposes.

- 🎯 **Touch-friendly** - Large tap targets for mobile devices

---

- ✨ **Smooth animations** - Professional transitions and effects- **Pause/Resume**: Full pause functionality with one-click controls### 3. **Smart Timer with Presets**

Made with ✨❤️ by Rahulanshu



---- **Auto-submit**: Quiz automatically submits when timer reaches 0- **8 timer presets**: 5, 10, 15, 20, 30, 45, 60, 90 minutes + custom input



## 🏗️ Project Structure- **Visual Indicators**:- Start, Pause, and Reset controls



```  - 🟣 Purple: Normal state (> 60s remaining)- Visual countdown with color-coded warnings (purple → orange → red)

quiz/

├── app/  - 🟠 Orange: Paused state- Animated progress bar showing time remaining

│   ├── favicon.ico          # App icon

│   ├── globals.css          # Global styles  - 🔴 Red: Critical (< 60s remaining)- Auto-submit when time expires

│   ├── layout.tsx           # Root layout with TimerProvider

│   └── page.tsx             # Main quiz page- **Progress Bar**: Visual countdown progress- **Sticky positioning on desktop** (stays visible while scrolling)

├── components/

│   ├── QuestionCard.tsx     # Question display with options

│   ├── QuestionInput.tsx    # Question loading screen

│   ├── QuizHeader.tsx       # Sticky timer header### 🚫 Pause Protection### 4. **Comprehensive Results & Analytics**

│   └── ResultCard.tsx       # Results display

├── context/When paused, ALL interactions are disabled:- Total score and percentage with performance-based gradients

│   └── TimerContext.tsx     # Global timer state management

├── types/- Radio button selection (option choices)- Correct vs. wrong answer breakdown with color-coded cards

│   └── quiz.ts              # TypeScript interfaces

├── public/                  # Static assets- Previous/Next navigation- Detailed review of incorrect answers with explanations

├── .gitignore              # Git ignore rules

├── next.config.ts          # Next.js configuration- Submit button- Collapsible correct answers section

├── package.json            # Dependencies

├── postcss.config.mjs      # PostCSS config- Quick navigation grid- Performance-based feedback messages (Outstanding! 🌟 to Don't give up! 📚)

├── tailwind.config.ts      # Tailwind configuration

├── tsconfig.json           # TypeScript config- Visual overlay with "Quiz Paused" message- Visual accuracy indicator with animated progress bar

├── vercel.json             # Vercel deployment config

└── README.md               # This file- Reduced content opacity for clear feedback

```

### 5. **Export & Share**

---

### 📱 Responsive Design- Copy all questions and answers to clipboard (instant feedback)

## 🛠️ Technologies Used

- **Mobile-first approach** with 7 breakpoint system- Export questions as downloadable JSON file

| Technology | Version | Purpose |

|------------|---------|---------|- **Adaptive layouts**: base → xs → sm → md → lg → xl → 2xl- Easy sharing of quiz content

| **Next.js** | 15.5.4 | React framework with App Router |

| **React** | 19.1.0 | UI library |- **Touch-friendly**: Large tap targets for mobile devices- Maintain question format for reuse

| **TypeScript** | 5.x | Type safety |

| **Tailwind CSS** | 4.x | Utility-first styling |- **Desktop optimized**: Efficient use of screen space

| **Turbopack** | Built-in | Fast development & production builds |

### 6. **Fully Responsive Design** 📱💻🖥️

---

### 🎨 User Experience- **7 breakpoint levels**: base, xs (480px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

## 🚀 Getting Started

- Smooth animations and transitions- **Mobile-first approach**: Optimized for phones (320px+)

### Prerequisites

- **Node.js** 18.x or higher- Color-coded feedback- **Desktop side-by-side layout**: Timer and question in columns (≥1280px)

- **npm** or **yarn** package manager

- Progress tracking- **Sticky timer on desktop**: Stays visible while scrolling

### Installation

- Quick navigation grid- **Progressive enhancement**: Spacing, fonts, and layouts scale across breakpoints

1. **Clone the repository**

   ```bash- Accessibility-friendly design- **No overflow**: All elements adapt smoothly during browser resize

   git clone <repository-url>

   cd quiz- Clean, modern interface- **Touch-friendly**: Minimum 44px tap targets on mobile

   ```

- **Adaptive navigation grid**: 5 columns (mobile) to 16 columns (ultra-wide)

2. **Install dependencies**

   ```bash## 🚀 Quick Start- Smooth transitions and modern gradient animations

   npm install

   ```



3. **Run development server**### Prerequisites### 7. **ChatGPT Integration Guide**

   ```bash

   npm run dev- Node.js 18+ - Built-in "How to Use ChatGPT" guide with copy-paste prompt

   ```

- npm or yarn- Step-by-step instructions for generating quiz questions

4. **Open in browser**

   ```- Custom format request for ChatGPT

   http://localhost:3000

   ```### Installation- Perfect for educational content creation



### Available Scripts



```bash```bash## 📋 Question Format

npm run dev     # Start development server with Turbopack

npm run build   # Create production build# Clone the repository

npm start       # Start production server

```git clone https://github.com/YOUR_USERNAME/mcq-quiz-app.gitQuestions should be provided in the following JSON format:



---cd mcq-quiz-app



## 📖 How to Use```json



### 1. Load Questions# Install dependencies[



**Option A: Sample Questions (Built-in)**npm install  {

- Click **"Load Sample Questions"** button

- 5 demo questions will load instantly    "id": 1,



**Option B: Custom Questions (JSON)**# Run development server    "question": "What is the capital of France?",

1. Click **"How to Use"** in header

2. Copy the ChatGPT promptnpm run dev    "options": {

3. Replace `[YOUR TOPIC]` with your subject

4. Generate questions in ChatGPT```      "A": "London",

5. Copy JSON output

6. Paste in text area      "B": "Berlin",

7. Set timer duration

8. Click **"Load Questions"**Open [http://localhost:3000](http://localhost:3000) in your browser.      "C": "Paris",



**JSON Format:**      "D": "Madrid"

```json

[### Building for Production    },

  {

    "id": 1,    "answer": "C",

    "question": "What is the capital of France?",

    "options": {```bash    "explanation": "Paris is the capital and largest city of France, known for the Eiffel Tower and rich cultural heritage."

      "A": "London",

      "B": "Berlin",# Create production build  }

      "C": "Paris",

      "D": "Madrid"npm run build]

    },

    "answer": "C",```

    "explanation": "Paris is the capital of France."

  }# Start production server

]

```npm start**Note:** 



**Required Fields:**```- `id` field is optional - helps in tracking questions

- `question` (string)

- `options` (object with A, B, C, D)- `explanation` field is optional - shows detailed explanation in results

- `answer` ("A" | "B" | "C" | "D")

## 📖 How to Use- Without these fields, the basic format still works:

**Optional Fields:**

- `id` (number)```json

- `explanation` (string)

### 1. Load Questions[

### 2. Take the Quiz

  {

1. ⏱️ Timer starts automatically

2. 📝 Select answers by clicking options**Option A: Use Sample Questions**    "question": "What is 2 + 2?",

3. ◀️▶️ Navigate using Previous/Next buttons

4. 🔢 Jump to any question using quick navigation- Click "Load Sample Questions" button    "options": {"A": "3", "B": "4", "C": "5", "D": "6"},

5. ⏸️ Pause anytime using header button

6. ✅ Submit when complete or wait for auto-submit- 5 demo questions will be loaded instantly    "answer": "B"



### 3. Review Results  }



- 📊 View score, accuracy, and statistics**Option B: Generate with ChatGPT**]

- ❌ Review wrong answers with explanations

- ✅ See correct answers1. Click "How to Use" in the header```

- 🔄 Restart to retake quiz

2. Copy the ChatGPT prompt

---

3. Replace `[YOUR TOPIC]` with your subject## 🛠️ Tech Stack

## 🚀 Deploy to Vercel

4. Paste in ChatGPT and generate questions

### Quick Deploy (Recommended)

5. Copy the JSON output- **Framework:** Next.js 15 (App Router)

1. **Push to GitHub**

   ```bash6. Paste into the text area- **Language:** TypeScript

   git init

   git add .7. Set timer duration- **Styling:** Tailwind CSS

   git commit -m "Initial commit"

   git remote add origin <your-repo-url>8. Click "Load Questions"- **Deployment:** Vercel (Free Plan)

   git push -u origin main

   ```- **State Management:** React Hooks (useState, useCallback)



2. **Deploy on Vercel****ChatGPT Prompt Example:**

   - Go to [vercel.com](https://vercel.com)

   - Click **"New Project"**```## Getting Started

   - Import your GitHub repository

   - Click **"Deploy"**Generate 20 MCQ questions on React Hooks in this exact JSON format:

   - Done! 🎉

[First, install dependencies:

### CLI Deploy

  {

```bash

# Install Vercel CLI    "id": 1,```bash

npm i -g vercel

    "question": "What is the purpose of useState hook?",npm install

# Login

vercel login    "options": {```



# Deploy      "A": "To manage side effects",

vercel --prod

```      "B": "To manage component state",Then run the development server:



### Vercel Configuration      "C": "To create context",



The `vercel.json` file is pre-configured:      "D": "To optimize performance"```bash



```json    },npm run dev

{

  "buildCommand": "npm run build",    "answer": "B",```

  "outputDirectory": ".next",

  "framework": "nextjs",    "explanation": "useState is used to add state to functional components"

  "installCommand": "npm install",

  "regions": ["iad1"]  }Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

}

```]



---```## 📦 Deployment to Vercel



## 🔧 Environment Variables



**No environment variables required!** This app runs entirely client-side.### 2. Take the Quiz### Option 1: Deploy via Vercel Dashboard



---



## 🎨 Key Components- Timer starts automatically1. Push your code to GitHub



### TimerContext (Global State)- Select answers by clicking options2. Go to [vercel.com](https://vercel.com)

```tsx

const { - Use Previous/Next to navigate3. Click "New Project"

  timeLeft,      // Remaining seconds

  isRunning,     // Timer active state- Use Quick Navigation grid for jumping to questions4. Import your repository

  isPaused,      // Pause state

  startTimer,    // Start timer (minutes)- Pause anytime using header button5. Click "Deploy"

  pauseTimer,    // Pause countdown

  resumeTimer,   // Resume countdown- Submit when complete or wait for auto-submit

  stopTimer      // Stop timer

} = useTimer();### Option 2: Deploy via Vercel CLI

```

### 3. Review Results

### QuizHeader (Sticky Timer)

- Always visible at top (position: sticky)1. Install Vercel CLI:

- Progress bar with embedded timer text

- Pause/Resume button- View score, accuracy, and statistics```bash

- Color-coded visual states

- Warning messages- Review wrong answers with explanationsnpm install -g vercel



### QuestionCard (Question Display)- See correct answers```

- Responsive option buttons

- Disabled state when paused- Export questions for later

- Visual feedback on selection

- Progress indicator- Restart to take again2. Deploy:



---```bash



## 🧪 Testing Checklist## 🏗️ Project Structurevercel



Before deploying:```



- [ ] Timer auto-starts on quiz load```

- [ ] Pause disables all inputs

- [ ] Resume re-enables everythingmcq-quiz-app/## 📁 Project Structure

- [ ] Auto-submit on timer = 0

- [ ] Navigation works correctly├── app/

- [ ] Quick navigation grid functional

- [ ] Mobile responsive (320px+)│   ├── layout.tsx           # Root layout with TimerProvider```

- [ ] Desktop responsive (1024px+)

- [ ] Results calculate accurately│   ├── page.tsx             # Main quiz orchestrationquiz/

- [ ] Restart clears everything

│   └── globals.css          # Global styles├── app/

---

├── components/│   ├── page.tsx          # Main quiz page with state management

## 📊 Build Performance

│   ├── QuestionCard.tsx     # Question display with pause support│   ├── layout.tsx        # Root layout

```

Route (app)                Size    First Load JS│   ├── QuestionInput.tsx    # Question loading screen│   └── globals.css       # Global styles

┌ ○ /                   8.72 kB        122 kB

└ ○ /_not-found            0 B         114 kB│   ├── QuizHeader.tsx       # Sticky timer header├── components/



○  (Static) - prerendered as static content│   ├── ResultCard.tsx       # Results display│   ├── QuestionInput.tsx # Component for loading questions (with timer selection)

```

│   └── Timer.tsx            # Legacy timer component│   ├── QuestionCard.tsx  # Component for displaying questions (fully responsive)

- **Build Size**: ~122 KB First Load JS (Excellent!)

- **Build Time**: < 2 seconds├── context/│   ├── Timer.tsx         # Timer component with controls (sticky on desktop)

- **Static Generation**: All pages pre-rendered

- **Optimization**: Automatic code splitting│   └── TimerContext.tsx     # Global timer state management│   └── ResultCard.tsx    # Results display component (responsive grid)



---├── types/├── types/



## 🐛 Troubleshooting│   └── quiz.ts              # TypeScript interfaces│   └── quiz.ts           # TypeScript interfaces (Question, QuizResult)



### Build Issues├── public/                  # Static assets├── app/

```bash

# Clear cache and rebuild├── vercel.json             # Vercel deployment config│   ├── page.tsx          # Main quiz page (responsive grid layout)

rm -rf .next node_modules

npm install├── DEPLOYMENT.md           # Detailed deployment guide│   └── globals.css       # Global styles with custom xs breakpoint

npm run build

```├── package.json            # Dependencies├── RESPONSIVE_DESIGN.md  # Complete responsive design documentation



### Timer Not Starting└── README.md               # This file├── RESPONSIVE_SUMMARY.md # Quick overview of responsive features

- Verify `TimerProvider` wraps app in `layout.tsx`

- Check `startTimer()` called in quiz load handler```├── TESTING_GUIDE.md      # Step-by-step responsive testing guide

- Check browser console for errors

└── package.json          # Dependencies and scripts

### Deployment Issues

- Ensure `vercel.json` is committed## 🛠️ Technology Stack```

- Check Vercel build logs

- Verify Node.js version (18+)



---- **Framework**: Next.js 15.5.4 (App Router)## 📱 Responsive Design



## 📝 License- **Language**: TypeScript 5



This project is open source and available under the [MIT License](LICENSE).- **Styling**: Tailwind CSS 3This application is **fully responsive** and adapts to all screen sizes:



---- **State Management**: React Context API



## 🙏 Acknowledgments- **Build Tool**: Turbopack### Mobile (320px - 1023px):



- **Next.js Team** - Amazing React framework- **Deployment**: Vercel- **Stacked vertical layout** (Timer above Question)

- **Vercel** - Seamless hosting platform

- **Tailwind CSS** - Utility-first styling- **Package Manager**: npm- Compact spacing and fonts

- **React Team** - Context API

- 5-12 column navigation grid

---

## 🎨 Key Components- Touch-friendly buttons (≥44px)

## 📧 Support

- Shortened button text ("Prev" instead of "Previous")

For issues or questions:

- Open an issue on GitHub### TimerContext

- Check documentation above

- Review Vercel deployment logsGlobal state management for timer:### Desktop (1280px - 1535px):



---```tsx- **Side-by-side grid layout** (Timer: 33% | Question: 67%)



## 🔮 Future Enhancementsconst { - **Sticky timer** (stays visible while scrolling)



- [ ] User authentication  timeLeft,        // Remaining seconds- 14-column navigation grid

- [ ] Quiz history tracking

- [ ] Leaderboard system  isRunning,       // Timer active- Full button text ("Previous Question")

- [ ] Multiple categories

- [ ] Difficulty levels  isPaused,        // Pause state- Larger fonts and spacing

- [ ] Dark mode

- [ ] PDF export  startTimer,      // Start(minutes)

- [ ] Email results

  pauseTimer,      // Pause### Ultra-wide (1536px+):

---

  resumeTimer,     // Resume- **Optimized proportions** (Timer: 25% | Question: 75%)

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**

  stopTimer        // Stop- 16-column navigation grid

🌟 **Star this repo if you find it helpful!**

} = useTimer();- Maximum font sizes

```- Container max-width: 1600px



### QuizHeader### Breakpoints:

Sticky header with timer:- **xs** (480px): Stats grid 1→3 cols, headers horizontal

- Always visible (position: sticky, z-50)- **sm** (640px): Increased spacing, 8-col navigation

- Pause/Resume button- **md** (768px): Tablet-optimized, 10-col navigation

- Color-coded states- **lg** (1024px): Maximum mobile spacing, 12-col navigation

- Progress bar- **xl** (1280px): **Desktop layout starts**, sticky timer

- Responsive sizing- **2xl** (1536px): Ultra-wide optimization



### QuestionCard**Test it**: Resize your browser from 320px to 1920px and watch the layout adapt!  

Question display:**Documentation**: See [RESPONSIVE_DESIGN.md](RESPONSIVE_DESIGN.md) for complete technical details.

- Option selection (disabled when paused)

- Visual feedback## 🎯 Usage

- Responsive layout

- Progress indicator1. **Load Questions:**

   - Paste your JSON-formatted questions in the text area

## 📊 Quiz Data Format   - Or click "Load Sample Questions" to try it out

   - **Select timer duration** from presets (5-90 mins) or enter custom

```json   - Click "Load Questions" to start

[

  {2. **Take the Quiz:**

    "id": 1,   - Read each question carefully

    "question": "Your question text?",   - Click on an option to select your answer (visual gradient feedback)

    "options": {   - Use Next/Previous buttons or question numbers to navigate

      "A": "First option",   - Monitor the timer (sticky on desktop, color-coded warnings)

      "B": "Second option",   - Click "Submit Quiz" when done (or it auto-submits when time runs out)

      "C": "Third option",

      "D": "Fourth option"3. **Review Results:**

    },   - View your score, percentage, and performance-based message

    "answer": "C",   - Review all wrong answers with correct solutions and explanations

    "explanation": "Optional explanation text"   - Expand correct answers section to see all answers

  }   - Copy questions or export as JSON for reuse

]   - Click "Restart Quiz" to take another quiz

```

## 💡 ChatGPT Integration

**Required Fields:**

- `question`: stringUse ChatGPT to generate quiz questions:

- `options`: object with A, B, C, D keys

- `answer`: "A" | "B" | "C" | "D"1. **Click "How to Use ChatGPT"** button in the question input section

2. **Copy the provided prompt** (includes format specification)

**Optional Fields:**3. **Paste in ChatGPT** and add your topic (e.g., "OSI Model networking questions")

- `id`: number4. **Copy generated JSON** and paste back into the quiz app

- `explanation`: string5. **Load and start** your custom quiz!



## 🚀 DeploymentExample prompt:

```

### Deploy to Vercel (Recommended)Generate 20 multiple-choice questions on [YOUR TOPIC] in JSON format...

```

**One-click deploy:**

```bash## 🔒 Privacy

npx vercel --prod

```- **100% Client-Side:** All data stays in your browser

- **No Server Required:** Fully static site

**Or use Vercel Dashboard:**- **No Data Collection:** No analytics or tracking

1. Push code to GitHub- **No Database:** Questions are loaded from user input

2. Import repository at [vercel.com](https://vercel.com)

3. Click Deploy## 📝 License

4. Done! 🎉

This project is open source and available under the MIT License.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

### Deploy to Other Platforms

**Note:** This is a completely serverless application that can be deployed on Vercel's free plan without any backend costs.

**Netlify:**

```bash
npm run build
# Deploy .next folder
```

**AWS Amplify:**
- Build command: `npm run build`
- Output directory: `.next`

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Timer auto-starts on quiz load
- [ ] Pause disables all inputs
- [ ] Resume re-enables all inputs
- [ ] Auto-submit on timer = 0
- [ ] Navigation works correctly
- [ ] Quick jump navigation
- [ ] Mobile responsive
- [ ] Results calculation accurate
- [ ] Export functionality works
- [ ] Restart clears everything

### Run Linter
```bash
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Tailwind CSS for styling utilities
- React team for Context API

## 📧 Contact

For questions or support:
- Open an issue on GitHub
- Email: your-email@example.com

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Quiz history tracking
- [ ] Leaderboard system
- [ ] Multiple quiz categories
- [ ] Difficulty levels
- [ ] Timed per-question mode
- [ ] Sound effects
- [ ] Dark mode
- [ ] Multi-language support
- [ ] PDF export
- [ ] Email results

---

**Made with ❤️ using Next.js and TypeScript**

[⬆ Back to top](#-mcq-quiz-application)
