export const motivationalQuotes = [
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    quote: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    quote: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    quote: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown"
  },
  {
    quote: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    quote: "Dream it. Wish it. Do it.",
    author: "Unknown"
  },
  {
    quote: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown"
  },
  {
    quote: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    quote: "Dream bigger. Do bigger.",
    author: "Unknown"
  },
  {
    quote: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  },
  {
    quote: "Wake up with determination. Go to bed with satisfaction.",
    author: "Unknown"
  },
  {
    quote: "Do something today that your future self will thank you for.",
    author: "Sean Patrick Flanery"
  },
  {
    quote: "Little things make big days.",
    author: "Unknown"
  },
  {
    quote: "It's going to be hard, but hard does not mean impossible.",
    author: "Unknown"
  },
  {
    quote: "Don't wait for opportunity. Create it.",
    author: "Unknown"
  },
  {
    quote: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown"
  }
];

export const getRandomMotivationalQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

export const getPerformanceBasedQuote = (percentage: number) => {
  let performanceQuotes: typeof motivationalQuotes;
  
  if (percentage >= 90) {
    // Excellent performance quotes
    performanceQuotes = [
      { quote: "Excellence is not a skill, it's an attitude.", author: "Ralph Marston" },
      { quote: "You are amazing! Keep up the outstanding work!", author: "Unknown" },
      { quote: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
      { quote: "Your hard work is paying off magnificently!", author: "Unknown" },
      { quote: "Outstanding performance! You're setting the bar high!", author: "Unknown" }
    ];
  } else if (percentage >= 75) {
    // Good performance quotes
    performanceQuotes = [
      { quote: "Good things happen to those who work hard.", author: "Unknown" },
      { quote: "You're doing great! Keep pushing forward!", author: "Unknown" },
      { quote: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
      { quote: "Great job! Your dedication is showing!", author: "Unknown" },
      { quote: "You're on the right track! Keep going!", author: "Unknown" }
    ];
  } else if (percentage >= 50) {
    // Encouraging quotes for average performance
    performanceQuotes = [
      { quote: "Every expert was once a beginner.", author: "Helen Hayes" },
      { quote: "Progress, not perfection, is the goal.", author: "Unknown" },
      { quote: "You're improving! Keep practicing!", author: "Unknown" },
      { quote: "The only way to improve is to keep trying.", author: "Unknown" },
      { quote: "Don't give up! You're getting better!", author: "Unknown" }
    ];
  } else {
    // Motivational quotes for lower performance
    performanceQuotes = [
      { quote: "Failure is simply the opportunity to begin again, this time more intelligently.", author: "Henry Ford" },
      { quote: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
      { quote: "The comeback is always stronger than the setback.", author: "Unknown" },
      { quote: "Every mistake is a learning opportunity.", author: "Unknown" },
      { quote: "You haven't failed until you stop trying.", author: "Unknown" }
    ];
  }
  
  const randomIndex = Math.floor(Math.random() * performanceQuotes.length);
  return performanceQuotes[randomIndex];
};