import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { INITIAL_DECKS } from './constants';
import { Deck, Word, AppMode } from './types';

// --- Text-to-Speech Helper ---
const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a French Canadian voice, fallback to any French
    const voices = window.speechSynthesis.getVoices();
    const frCA = voices.find(v => v.lang === 'fr-CA');
    const fr = voices.find(v => v.lang.startsWith('fr'));
    
    if (frCA) utterance.voice = frCA;
    else if (fr) utterance.voice = fr;
    
    utterance.lang = 'fr-CA';
    utterance.rate = 0.9; // Slightly slower for learning
    window.speechSynthesis.speak(utterance);
  }
};

// --- Components ---

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-primary text-white p-4 shadow-md flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <span className="text-3xl">⚜️</span>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Super Vocabulaire</h1>
      </div>
      <button onClick={() => navigate('/')} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm font-semibold transition">
        🏠 Accueil
      </button>
    </header>
  );
};

interface DeckCardProps {
  deck: Deck;
}

const DeckCard: React.FC<DeckCardProps> = ({ deck }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-blue-200 flex flex-col h-full transition-all hover:border-blue-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {deck.words.length} Mots
        </div>
        <span className="text-2xl">📚</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{deck.title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-medium">{deck.description}</p>
      
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button 
          onClick={() => navigate(`/deck/${deck.id}/${AppMode.FLASHCARDS}`)}
          className="bg-white hover:bg-blue-50 text-primary font-bold py-3 px-4 rounded-xl shadow-sm border-2 border-primary/20 hover:border-primary transition flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <span>📖</span> Étude
        </button>
        <button 
          onClick={() => navigate(`/deck/${deck.id}/${AppMode.QUIZ}`)}
          className="bg-secondary hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md border-b-4 border-pink-800 transition active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
        >
          <span>✍️</span> Dictée
        </button>
      </div>
    </div>
  );
};

const FlashcardGame = ({ deck, onExit }: { deck: Deck; onExit: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentWord = deck.words[currentIndex];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % deck.words.length);
    }, 200);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 < 0 ? deck.words.length - 1 : prev - 1));
    }, 200);
  };

  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Prononce le mot, fait une pause, puis la phrase d'exemple
    const textToSpeak = currentWord.exampleSentence 
      ? `${currentWord.french}. ${currentWord.exampleSentence}` 
      : currentWord.french;
    speak(textToSpeak);
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4 w-full h-full justify-center min-h-[80vh]">
      <div className="mb-6 flex items-center gap-4 text-slate-600 font-bold bg-white/50 px-4 py-1 rounded-full">
        <span>Carte {currentIndex + 1} / {deck.words.length}</span>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        className="relative w-full aspect-[4/3] md:aspect-[16/9] cursor-pointer perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border-b-8 border-primary flex flex-col items-center justify-center p-8">
            <span className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-4">Français</span>
            <h2 className="text-5xl md:text-7xl font-black text-black text-center mb-8 select-none tracking-tight">{currentWord.french}</h2>
            <button 
              onClick={playAudio}
              className="mt-4 bg-blue-100 hover:bg-blue-200 text-primary p-4 rounded-full transition-colors shadow-sm"
              aria-label="Écouter"
            >
              🔊
            </button>
            <p className="absolute bottom-6 text-slate-400 text-sm animate-pulse font-medium">Clique pour retourner 👆</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-900 rounded-3xl shadow-xl border-b-8 border-black flex flex-col items-center justify-center p-8 text-white">
            <div className="flex flex-col items-center text-center">
              <span className="bg-accent text-slate-900 px-3 py-1 rounded-full text-sm font-bold mb-6 shadow-sm">
                {currentWord.type}
              </span>
              
              {currentWord.exampleSentence && (
                <p className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                  « {currentWord.exampleSentence} »
                </p>
              )}
              
              {currentWord.english && (
                <div className="bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
                  <p className="text-slate-200 italic text-xl font-medium">
                    {currentWord.english}
                  </p>
                </div>
              )}
            </div>
            <button 
              onClick={playAudio}
              className="mt-8 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            >
              🔊
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-8 w-full justify-center">
        <button onClick={prevCard} className="bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 border-b-4 border-slate-300">
          ⬅️ Précédent
        </button>
        <button onClick={nextCard} className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 border-b-4 border-blue-800">
          Suivant ➡️
        </button>
      </div>
    </div>
  );
};

const DicteeGame = ({ deck, onExit }: { deck: Deck; onExit: () => void }) => {
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Shuffle words for the quiz when deck changes
    const shuffled = [...deck.words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, [deck]);

  // Handle focus and auto-speech
  useEffect(() => {
    if (shuffledWords.length > 0 && status === 'idle' && !showSummary) {
      const timer = setTimeout(() => {
        // Only speak if we are in a valid state
        if (shuffledWords[currentIndex]) {
          speak(shuffledWords[currentIndex].french);
        }
      }, 500);
      
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return () => clearTimeout(timer);
    }
  }, [currentIndex, shuffledWords, status, showSummary]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;

    const currentWord = shuffledWords[currentIndex];
    const cleanInput = inputValue.trim().toLowerCase();
    const cleanTarget = currentWord.french.toLowerCase();

    if (cleanInput === cleanTarget) {
      setStatus('correct');
      setScore(s => s + 1);
      speak("Bravo !");
    } else {
      setStatus('wrong');
      speak(`Oups. Le mot était : ${currentWord.french}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue('');
      setStatus('idle');
    } else {
      setShowSummary(true);
      if (score === shuffledWords.length) speak("Incroyable ! Tu as tout réussi !");
      else speak("La dictée est terminée.");
    }
  };

  if (shuffledWords.length === 0) return <div className="p-10 text-center font-bold text-xl">Chargement...</div>;

  if (showSummary) {
    const percentage = Math.round((score / shuffledWords.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 animate-bounce-in">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border-b-8 border-secondary">
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Dictée terminée !</h2>
          <p className="text-slate-600 mb-6 font-medium">Voici ton résultat</p>
          
          <div className="text-6xl font-black text-primary mb-2">{percentage}%</div>
          <p className="text-xl font-bold text-slate-700 mb-8">{score} sur {shuffledWords.length}</p>
          
          <button 
            onClick={onExit}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-600 transition border-b-4 border-blue-800"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const currentWord = shuffledWords[currentIndex];
  // Create a masked sentence if available
  const maskedSentence = currentWord.exampleSentence 
    ? currentWord.exampleSentence.replace(new RegExp(currentWord.french, 'gi'), '_______')
    : 'Écris le mot entendu';

  return (
    <div className="max-w-xl mx-auto p-4 w-full min-h-[80vh] flex flex-col justify-center">
      {/* Progress Bar */}
      <div className="w-full bg-white rounded-full h-4 mb-8 shadow-sm border border-slate-200 p-0.5">
        <div 
          className="bg-secondary h-full rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex) / shuffledWords.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-b-8 border-slate-200">
        <div className="bg-blue-50 p-8 text-center border-b border-blue-100">
          <span className="uppercase text-xs font-bold text-blue-500 tracking-wider bg-blue-100 px-3 py-1 rounded-full">Mot {currentIndex + 1} / {shuffledWords.length}</span>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-6 leading-relaxed font-sans">
            {maskedSentence}
          </p>
          <button 
            onClick={() => speak(currentWord.french)}
            className="mt-6 bg-white text-primary hover:bg-blue-50 px-6 py-3 rounded-full font-bold shadow-md border border-blue-100 transition-transform active:scale-95 flex items-center gap-2 mx-auto"
          >
            🔊 Répéter le mot
          </button>
        </div>

        <div className="p-8 bg-slate-50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={status !== 'idle'}
                placeholder="Écris le mot ici..."
                className={`w-full text-center text-3xl font-bold p-6 rounded-2xl border-4 outline-none transition-all font-sans shadow-inner
                  ${
                  status === 'correct' ? 'border-green-500 bg-green-100 text-green-900' :
                  status === 'wrong' ? 'border-red-500 bg-red-100 text-red-900' :
                  'bg-white border-slate-300 focus:border-primary text-black placeholder:text-slate-300 focus:ring-4 focus:ring-blue-200'
                }`}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            
            {status === 'idle' && (
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-full bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all border-b-4 border-blue-800 active:translate-y-1 active:border-b-0 text-lg"
              >
                Vérifier
              </button>
            )}
          </form>

          {status === 'correct' && (
            <div className="mt-4 text-center animate-bounce">
              <p className="text-3xl font-black text-green-600 mb-4 drop-shadow-sm">🌟 Excellent !</p>
              <button onClick={handleNext} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg border-b-4 border-green-700 text-lg transition-transform active:scale-95">
                Mot suivant ➡️
              </button>
            </div>
          )}

          {status === 'wrong' && (
            <div className="mt-4 text-center">
              <p className="text-xl font-bold text-red-500 mb-2">Pas tout à fait...</p>
              <div className="bg-white p-4 rounded-xl border-2 border-slate-200 shadow-sm mb-4 inline-block">
                <p className="text-slate-500 text-sm mb-1 uppercase font-bold tracking-wider">La bonne réponse</p>
                <p className="text-3xl font-black text-slate-800">{currentWord.french}</p>
              </div>
              <button onClick={handleNext} className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg border-b-4 border-slate-800 text-lg transition-transform active:scale-95">
                Continuer ➡️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6 drop-shadow-sm">
          Salut ! 👋<br/><span className="text-primary">Qu'est-ce qu'on étudie ?</span>
        </h2>
        <p className="text-xl text-slate-600 font-medium">Choisis une liste de mots pour commencer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_DECKS.map((deck) => (
          <DeckCard 
            key={deck.id}
            deck={deck} 
          />
        ))}
      </div>
    </div>
  );
};

const SessionPage = () => {
  const { deckId, mode } = useParams<{ deckId: string; mode: string }>();
  const navigate = useNavigate();
  const deck = INITIAL_DECKS.find(d => d.id === deckId);

  if (!deck) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Oups ! Cette liste n'existe pas.</h2>
        <button 
          onClick={() => navigate('/')} 
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  if (mode === AppMode.FLASHCARDS) {
    return <FlashcardGame deck={deck} onExit={() => navigate('/')} />;
  }

  if (mode === AppMode.QUIZ) {
    return <DicteeGame deck={deck} onExit={() => navigate('/')} />;
  }

  return null;
};

// --- Main App ---

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 font-sans selection:bg-pink-200 selection:text-pink-900 pb-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deck/:deckId/:mode" element={<SessionPage />} />
          </Routes>
        </main>
        
        {/* Helper for loading fonts */}
        <style>{`
          @keyframes bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-bounce-in {
            animation: bounce-in 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
          }
        `}</style>
      </div>
    </HashRouter>
  );
}