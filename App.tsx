import React, { useState, useEffect } from 'react';
import { BillCalculator } from './components/BillCalculator';
import { TariffDetails } from './components/TariffDetails';
import { SeoContent } from './components/SeoContent';

const SunIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-amber-500"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
);

const MoonIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
);


interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => (
  <header className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <div 
        className="flex items-center text-left"
        aria-label="TNEB Bill Calculator"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 md:h-8 md:w-8 mr-2 md:mr-3 text-sky-500 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 3L7 12h4l-1 8 7-12h-4l1-8z" />
        </svg>
        <div>
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
            TNEB Bill Calculator
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
            தமிழ்நாடு மின்சார வாரிய கட்டணக் கால்குலேட்டர்
          </p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition-colors"
        aria-label={theme === 'dark' ? 'Activate light mode' : 'Activate dark mode'}
        >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="w-full py-8 mt-12 border-t border-slate-200 dark:border-slate-700">
    <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
      <div className="flex justify-center items-center flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 mb-6">
        <a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-xs sm:text-sm">Blog</a>
        <a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-xs sm:text-sm">About</a>
        <a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-xs sm:text-sm">Privacy Policy</a>
      </div>
      <div className="text-xs max-w-2xl mx-auto space-y-2">
        <p>
          *This is an estimation tool. The final bill from TNEB may include taxes and other adjustments not accounted for here.
        </p>
        <p>
          <span>Built for informational purposes. </span>
          <a
            href="https://www.tnebltd.gov.in/bill-calculator/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sky-600 dark:text-sky-400 hover:underline"
          >
            Official TNEB Tariff
          </a>
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (storedPrefs) {
        return storedPrefs;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // default
  });

  const [view, setView] = useState<'calculator' | 'tariff'>('calculator');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow w-full container mx-auto p-4 sm:p-6 md:p-8">
        {view === 'calculator' ? (
          <>
            <BillCalculator onShowTariff={() => setView('tariff')} />
            <div className="mt-16 sm:mt-20">
              <SeoContent />
            </div>
          </>
        ) : (
          <TariffDetails onBack={() => setView('calculator')} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;