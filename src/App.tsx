/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Search, 
  Send, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Cpu, 
  Smartphone,
  Quote,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  UserCircle,
  SortAsc,
  SortDesc,
  FolderOpen,
  Sparkles,
  Zap,
  Dices
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  category: 'Hardware' | 'AI' | 'Web';
  image: string;
  tags: string[];
  date: string;
}

interface QuoteData {
  content: string;
  author: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

interface Skill {
  id: number;
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Hardware';
  icon: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Pipelined CPU",
    description: "A complex project implemented using LOGISIM. Started with a single-cycle CPU and evolved into a full pipelined architecture with hazard detection and forwarding.",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: ["Logisim", "COE301", "Computer Architecture"],
    date: "2023-11-15"
  },
  {
    id: 2,
    title: "AI Phone Classification",
    description: "Machine learning model built with Python to classify mobile devices based on technical specifications like RAM, storage, and battery capacity.",
    category: "AI",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    tags: ["Python", "Machine Learning", "Data Analysis"],
    date: "2024-01-20"
  },
  {
    id: 3,
    title: "Portfolio v1",
    description: "My first web development project focusing on HTML/CSS fundamentals and responsive design principles.",
    category: "Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    tags: ["HTML", "CSS", "Responsive"],
    date: "2023-09-01"
  }
];

const SKILLS: Skill[] = [
  { id: 1, name: 'React', category: 'Frontend', icon: '⚛️', proficiency: 'Advanced', description: 'Building interactive UIs with React hooks and patterns' },
  { id: 2, name: 'TypeScript', category: 'Frontend', icon: '📘', proficiency: 'Advanced', description: 'Type-safe JavaScript for scalable applications' },
  { id: 3, name: 'Tailwind CSS', category: 'Frontend', icon: '🎨', proficiency: 'Advanced', description: 'Utility-first CSS framework for rapid UI development' },
  { id: 4, name: 'Python', category: 'AI/ML', icon: '🐍', proficiency: 'Advanced', description: 'Machine learning and data analysis projects' },
  { id: 5, name: 'JavaScript', category: 'Frontend', icon: '⚡', proficiency: 'Advanced', description: 'Core language for web development' },
  { id: 6, name: 'Framer Motion', category: 'Frontend', icon: '🎬', proficiency: 'Intermediate', description: 'Smooth animations and transitions' },
  { id: 7, name: 'Git & GitHub', category: 'Backend', icon: '🔗', proficiency: 'Advanced', description: 'Version control and collaboration' },
  { id: 8, name: 'Vite', category: 'Frontend', icon: '⚙️', proficiency: 'Intermediate', description: 'Next-generation build tool for web development' },
  { id: 9, name: 'Computer Architecture', category: 'Hardware', icon: '💾', proficiency: 'Intermediate', description: 'CPU design and digital logic' },
  { id: 10, name: 'Data Science', category: 'AI/ML', icon: '📊', proficiency: 'Intermediate', description: 'Statistical analysis and predictive modeling' },
];

export default function App() {
  // --- State ---
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'github' | 'contact'>('about');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [quote] = useState<QuoteData>({ 
    content: "Move fast and break things.", 
    author: "Mark Zuckerberg" 
  });
  
  // Visitor State
  const [visitorName, setVisitorName] = useState(() => localStorage.getItem('visitorName') || '');
  const [visitorLevel, setVisitorLevel] = useState(() => localStorage.getItem('visitorLevel') || 'Beginner');
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('visitorName'));
  
  // Timer State
  const [sessionTime, setSessionTime] = useState(0);
  
  // GitHub Data State
  const GITHUB_USERNAME = 'Ali-Alhashim13';
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [reposError, setReposError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Skill Matching Game State
  const [skillA, setSkillA] = useState<Skill>(SKILLS[Math.floor(Math.random() * SKILLS.length)]);
  const [skillB, setSkillB] = useState<Skill>(SKILLS[Math.floor(Math.random() * SKILLS.length)]);
  const [gameScore, setGameScore] = useState(0);
  const [gameStreak, setGameStreak] = useState(0);
  const [gameMessage, setGameMessage] = useState('');
  const [gameLoading, setGameLoading] = useState(false);

  // --- Effects ---
  
  // Theme Persistence
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Session Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // GitHub Fetch (Requirement 2)
  useEffect(() => {
    if (activeTab === 'github' && repos.length === 0) {
      const fetchRepos = async () => {
        setReposLoading(true);
        setReposError(null);
        try {
          // Using the configurable GITHUB_USERNAME constant
          const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
          if (!response.ok) throw new Error('Could not fetch repositories');
          const data = await response.json();
          setRepos(data);
        } catch (err) {
          setReposError('Failed to load GitHub repositories. Please check your connection.');
        } finally {
          setReposLoading(false);
        }
      };
      fetchRepos();
    }
  }, [activeTab, repos.length]);

  // --- Helpers ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    const prefix = hour < 12 ? "Good Morning" : hour < 18 ? "Hi there, let's build!" : "Good Evening";
    return visitorName ? `${prefix}, ${visitorName}` : prefix;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Skill Matching Game Logic
  const getProficiencyLevel = (prof: string): number => {
    if (prof === 'Advanced') return 3;
    if (prof === 'Intermediate') return 2;
    return 1;
  };

  const generateNewRound = () => {
    let newSkillA = SKILLS[Math.floor(Math.random() * SKILLS.length)];
    let newSkillB = SKILLS[Math.floor(Math.random() * SKILLS.length)];
    // Ensure they're different
    while (newSkillB.id === newSkillA.id) {
      newSkillB = SKILLS[Math.floor(Math.random() * SKILLS.length)];
    }
    setSkillA(newSkillA);
    setSkillB(newSkillB);
    setGameMessage('');
    setGameLoading(false);
  };

  const handleSkillChoice = (selectedSkill: Skill) => {
    setGameLoading(true);
    const levelA = getProficiencyLevel(skillA.proficiency);
    const levelB = getProficiencyLevel(skillB.proficiency);
    const correctSkill = levelA > levelB ? skillA : levelB > levelA ? skillB : skillA;
    
    const isCorrect = selectedSkill.id === correctSkill.id;
    
    setTimeout(() => {
      if (isCorrect) {
        setGameScore(prev => prev + 1);
        setGameStreak(prev => prev + 1);
        setGameMessage(`✅ Correct! ${correctSkill.name} (${correctSkill.proficiency})`);
      } else {
        setGameStreak(0);
        setGameMessage(`❌ Wrong! ${correctSkill.name} (${correctSkill.proficiency}) is more advanced`);
      }
      setTimeout(() => {
        generateNewRound();
      }, 1500);
    }, 300);
  };

  // Complex Sorting & Filtering (Requirement 3)
  const filteredAndSortedProjects = useMemo(() => {
    let result = PROJECTS.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    result.sort((a, b) => {
      const valA = sortBy === 'date' ? new Date(a.date).getTime() : a.title.toLowerCase();
      const valB = sortBy === 'date' ? new Date(b.date).getTime() : b.title.toLowerCase();
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchQuery, sortBy, sortOrder]);

  const handleOnboardingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (visitorName.trim()) {
      localStorage.setItem('visitorName', visitorName);
      localStorage.setItem('visitorLevel', visitorLevel);
      setShowOnboarding(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    
    // Advanced Validation (Requirement 3)
    if (!formData.name.trim()) errors.name = "Please enter your name";
    if (formData.name.length < 2) errors.name = "Name must be at least 2 characters";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty";
    } else if (formData.message.length < 10) {
      errors.message = "Please write a bit more (at least 10 chars)";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
      // Clear success after 5s
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  // --- Render Helpers ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <motion.div 
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="prose dark:prose-invert max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <UserCircle className="w-12 h-12 text-emerald-600" />
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-0">About Me</h2>
                  {visitorLevel === 'Advanced' && <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded">Expert View</span>}
                </div>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I am currently learning the fundamentals of web development.
                I enjoy solving problems and creating responsive, user-friendly applications.
                I am particularly interested in Artificial Intelligence and how it can be integrated into modern software solutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <Cpu className="w-10 h-10 text-emerald-500 mb-4" />
                  <h3 className="font-bold mb-2">Architecture</h3>
                  <p className="text-sm text-slate-500">Experienced in logic design and CPU pipelining.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <Smartphone className="w-10 h-10 text-emerald-500 mb-4" />
                  <h3 className="font-bold mb-2">AI & ML</h3>
                  <p className="text-sm text-slate-500">Applying data science to solve classification problems.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                  <Code className="w-10 h-10 text-emerald-500 mb-4" />
                  <h3 className="font-bold mb-2">Web Dev</h3>
                  <p className="text-sm text-slate-500">Building responsive and interactive user interfaces.</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'skills':
        return (
          <motion.div 
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Skill Matching Game */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-emerald-600/20">
              <div className="space-y-8">
                {/* Header & Score */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">🎮 Skill Matching Game</h2>
                    <p className="text-emerald-100">Pick which skill is more advanced!</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                      <p className="text-xs text-emerald-100 uppercase font-bold">Score</p>
                      <p className="text-3xl font-black">{gameScore}</p>
                    </div>
                    {gameStreak > 0 && (
                      <div className="text-center px-4 py-2 bg-yellow-400/20 backdrop-blur-md rounded-xl border border-yellow-300/50">
                        <p className="text-xs text-yellow-100 uppercase font-bold">🔥 Streak</p>
                        <p className="text-2xl font-black">{gameStreak}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Game Message */}
                <AnimatePresence>
                  {gameMessage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`p-4 rounded-xl text-center font-bold ${
                        gameMessage.startsWith('✅') 
                          ? 'bg-green-400/20 border border-green-300/50 text-green-100'
                          : 'bg-red-400/20 border border-red-300/50 text-red-100'
                      }`}
                    >
                      {gameMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Skills Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Skill A */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSkillChoice(skillA)}
                    disabled={gameLoading}
                    className="p-6 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 hover:bg-white/20 rounded-2xl text-left transition-all disabled:opacity-50 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-5xl">{skillA.icon}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        skillA.proficiency === 'Advanced' ? 'bg-yellow-400/30 text-yellow-100' :
                        skillA.proficiency === 'Intermediate' ? 'bg-blue-400/30 text-blue-100' :
                        'bg-green-400/30 text-green-100'
                      }`}>
                        {skillA.proficiency}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{skillA.name}</h3>
                    <p className="text-emerald-100 text-sm mb-3">{skillA.category}</p>
                    <p className="text-emerald-50 text-sm line-clamp-2">{skillA.description}</p>
                    <p className="mt-4 text-xs text-emerald-200 font-bold uppercase">← Click to select</p>
                  </motion.button>

                  {/* Skill B */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSkillChoice(skillB)}
                    disabled={gameLoading}
                    className="p-6 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 hover:bg-white/20 rounded-2xl text-left transition-all disabled:opacity-50 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-5xl">{skillB.icon}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        skillB.proficiency === 'Advanced' ? 'bg-yellow-400/30 text-yellow-100' :
                        skillB.proficiency === 'Intermediate' ? 'bg-blue-400/30 text-blue-100' :
                        'bg-green-400/30 text-green-100'
                      }`}>
                        {skillB.proficiency}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{skillB.name}</h3>
                    <p className="text-emerald-100 text-sm mb-3">{skillB.category}</p>
                    <p className="text-emerald-50 text-sm line-clamp-2">{skillB.description}</p>
                    <p className="mt-4 text-xs text-emerald-200 font-bold uppercase">Click to select →</p>
                  </motion.button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setGameScore(0);
                    setGameStreak(0);
                    generateNewRound();
                  }}
                  className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-bold rounded-xl transition-all"
                >
                  🔄 Reset Game
                </button>
              </div>
            </div>

            {/* All Skills Grid */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">All Skills</h2>
                <p className="text-slate-500 dark:text-slate-400">Your complete skill set across all categories</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SKILLS.map((skill, idx) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all group shadow-sm hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{skill.icon}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                        skill.proficiency === 'Advanced' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200' :
                        skill.proficiency === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' :
                        'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
                      }`}>
                        {skill.proficiency}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{skill.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{skill.category}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'projects':
        return (
          <motion.div 
            key="projects"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">My Work</h2>
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-full md:w-48"
                  />
                </div>
                {/* Sort */}
                <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-1">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-sm focus:outline-none text-slate-600 dark:text-slate-300"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                  </select>
                  <button 
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="ml-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {filteredAndSortedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProjects.map((project) => (
                  <motion.div 
                    layout
                    key={project.id}
                    whileHover={{ y: -5 }}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-700"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 bg-slate-900/50 backdrop-blur text-white text-[10px] rounded-full text-center">
                          {project.date}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm pt-4 group/btn">
                        View Details <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500">No projects found matching your filters</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-emerald-600 font-medium hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.div>
        );
      case 'github':
        return (
          <motion.div 
            key="github"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <Github className="w-8 h-8 text-slate-900 dark:text-white" />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Active Repositories</h2>
            </div>
            
            {reposLoading ? (
              <div className="flex flex-col items-center py-20">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
                <p className="text-slate-500">Connecting to GitHub API...</p>
              </div>
            ) : reposError ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30 flex items-center gap-4">
                <AlertCircle className="w-6 h-6" />
                <p>{reposError}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map(repo => (
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    key={repo.id} 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <FolderOpen className="w-5 h-5 text-emerald-600" />
                        <span className="text-[10px] font-bold text-slate-400">★ {repo.stargazers_count}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 truncate">{repo.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-700/50">
                      <span className="text-[10px] font-mono text-emerald-600">{repo.language || 'Code'}</span>
                      <ExternalLink className="w-3 h-3 text-slate-300" />
                    </div>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div 
            key="contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Let's Connect</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Have a question or want to work together? Drop me a message!</p>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${formErrors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all`}
                    placeholder="Your name"
                  />
                  {formErrors.name && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${formErrors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all`}
                    placeholder="email@example.com"
                  />
                  {formErrors.email && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border ${formErrors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none`}
                    placeholder="How can I help you?"
                  />
                  {formErrors.message && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {formErrors.message}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-center gap-3 border border-emerald-100 dark:border-emerald-900/50"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans selection:bg-emerald-500/30">
      
      {/* --- Onboarding Modal (Requirement 4) --- */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome!</h2>
              <p className="text-slate-500 text-sm mb-6">Let's personalize your experience. How should I call you?</p>
              
              <form onSubmit={handleOnboardingSubmit} className="space-y-4">
                <input 
                  autoFocus
                  type="text" 
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                />
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience Level</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Beginner', 'Advanced'].map(lvl => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setVisitorLevel(lvl)}
                        className={`py-2 rounded-lg text-sm font-bold transition-all ${visitorLevel === lvl ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!visitorName.trim()}
                  className="w-full py-3 bg-slate-900 dark:bg-white dark:text-black text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  Enter Portfolio
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab('about')}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-600/30">A</div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">Alhashem</span>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-full border border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
              {(['about', 'skills', 'projects', 'github', 'contact'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize whitespace-nowrap ${
                    activeTab === tab 
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative group">
              <button 
                className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors flex-shrink-0 flex items-center gap-2 group-hover:ring-2 group-hover:ring-emerald-500/20 transition-all duration-300"
              >
                <UserCircle className="w-5 h-5" />
                <span className="hidden md:group-hover:block transition-all duration-300 text-sm font-bold truncate max-w-[80px]">
                  {visitorName || 'Visitor'}
                </span>
              </button>
              
              {/* Profile Card on Hover */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-[60] p-4 text-left">
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Current Visitor</p>
                <p className="text-slate-900 dark:text-white font-bold truncate leading-tight mb-1">{visitorName}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold text-white uppercase ${visitorLevel === 'Advanced' ? 'bg-purple-600' : 'bg-emerald-600'}`}>
                    Level: {visitorLevel}
                  </span>
                </div>
                
                <hr className="my-3 border-slate-100 dark:border-slate-800" />
                
                <button 
                  onClick={() => {
                    localStorage.removeItem('visitorName');
                    localStorage.removeItem('visitorLevel');
                    window.location.reload();
                  }}
                  className="w-full py-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-[10px] font-bold rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> Reset Profile
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Header --- */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase rounded-full"
            >
              {getGreeting()}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none"
            >
              Ali Alhashem<span className="text-emerald-600">.</span>
            </motion.h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg">
              CS Student @ KFUPM.
            </p>
          </div>

          {/* Static Quote Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:max-w-xs w-full"
          >
            <div className="p-6 bg-emerald-600 rounded-3xl text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden group">
              <Quote className="absolute -top-4 -left-4 w-24 h-24 text-white/10 rotate-12" />
              <div className="relative z-10 space-y-3">
                <p className="text-sm font-medium italic leading-relaxed">"{quote.content}"</p>
                <p className="text-xs font-bold text-emerald-200">— {quote.author}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-200 dark:border-slate-800 mt-20 relative">
        {/* Session Timer (Requirement 3) */}
        <div className="absolute -top-4 left-6 flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <Clock className="w-3 h-3 text-emerald-600" />
          <span>In-session: {formatTime(sessionTime)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Let's build something together.</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm transition-all hover:scale-110 active:scale-95">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm transition-all hover:scale-110 active:scale-95">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:a.alhashim75@gmail.com" className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 shadow-sm transition-all hover:scale-110 active:scale-95">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div className="text-left md:text-right space-y-2">
            <p className="text-slate-500 dark:text-slate-500 text-sm">© 2026 Ali Alhashem. Built with React & Tailwind.</p>
            <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">KFUPM • Assignment 4 • Professional Edition</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
