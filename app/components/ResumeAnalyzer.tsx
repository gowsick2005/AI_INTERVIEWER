'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function ResumeAnalyzer() {
  const [view, setView] = useState<'splash' | 'signup' | 'login' | 'upload' | 'analysis' | 'result' | 'feedback' | 'history' | 'settings'>('splash');
  const [isSplashFading, setIsSplashFading] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [jdInput, setJdInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [currentFileName, setCurrentFileName] = useState('resume_v3.pdf');
  const [activeResultsTab, setActiveResultsTab] = useState<'issues' | 'suggestions' | 'rewrite'>('issues');

  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackPills, setFeedbackPills] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const [historyList, setHistoryList] = useState<any[]>([]);
  const [historyFilter, setHistoryFilter] = useState('all');
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const animCursor = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseRef.current.x}px`;
        dotRef.current.style.top = `${mouseRef.current.y}px`;
      }
      if (ringRef.current) {
        ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
        ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
        ringRef.current.style.left = `${ringPosRef.current.x}px`;
        ringRef.current.style.top = `${ringPosRef.current.y}px`;
      }
      animId = requestAnimationFrame(animCursor);
    };
    animCursor();

    const handleMouseDown = () => {
      document.documentElement.style.setProperty('--cursor-scale', '0.8');
    };
    const handleMouseUp = () => {
      document.documentElement.style.setProperty('--cursor-scale', '1');
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    if (view === 'splash') {
      const t1 = setTimeout(() => {
        setIsSplashFading(true);
      }, 3200);
      const t2 = setTimeout(() => {
        const storedUser = localStorage.getItem('resumeai_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setView('upload');
        } else {
          setView('signup');
        }
      }, 3700);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [view]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('resumeai_analyses');
    if (!storedHistory) {
      const defaultHistory = [
        { id: '1', name: 'frontend_developer_resume.pdf', date: '28 May 2026', score: 82, status: 'ATS Ready' },
        { id: '2', name: 'fullstack_engineer.pdf', date: '20 May 2026', score: 71, status: 'Skills Match' },
        { id: '3', name: 'senior_react_dev.pdf', date: '12 May 2026', score: 54, status: 'Weak Summary' }
      ];
      localStorage.setItem('resumeai_analyses', JSON.stringify(defaultHistory));
      setHistoryList(defaultHistory);
    } else {
      setHistoryList(JSON.parse(storedHistory));
    }

    const storedUser = localStorage.getItem('resumeai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [view]);

  useEffect(() => {
    if (view === 'result') {
      const storedCurrent = localStorage.getItem('resumeai_current');
      if (storedCurrent) {
        const parsed = JSON.parse(storedCurrent);
        setScore(parsed.score);
        setCurrentFileName(parsed.filename);
        setAnalysisResult(parsed);
      } else {
        setScore(76);
        setCurrentFileName('resume_v3.pdf');
        setAnalysisResult(null);
      }
    }
  }, [view]);

  const getPasswordStrength = (val: string) => {
    let strength = 0;
    if (val.length >= 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;
    return strength;
  };

  const strengthScore = getPasswordStrength(signupPassword);
  const passwordsMatch = signupPassword === signupConfirm || signupConfirm.length === 0;

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    const userData = { name: signupName, email: signupEmail };
    localStorage.setItem('resumeai_user', JSON.stringify(userData));
    setUser(userData);
    setView('upload');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'demo@resumeai.com' && loginPassword === 'demopass123') {
      const userData = { name: 'Demo User', email: loginEmail };
      localStorage.setItem('resumeai_user', JSON.stringify(userData));
      setUser(userData);
      setView('upload');
    } else {
      setLoginError(true);
    }
  };

  const handleSSO = () => {
    const userData = { name: 'Google User', email: 'sso.user@gmail.com' };
    localStorage.setItem('resumeai_user', JSON.stringify(userData));
    setUser(userData);
    setView('upload');
  };

  const handleLogout = () => {
    localStorage.removeItem('resumeai_user');
    setUser(null);
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirm('');
    setLoginEmail('');
    setLoginPassword('');
    setLoginError(false);
    setSelectedFile(null);
    setAnalysisResult(null);
    setView('login');
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
    }
  };

  const clearUploadedFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileName('');
    setFileSize('');
  };

  const startAnalysisSequence = async () => {
    if (!selectedFile) return;
    setView('analysis');
    setAnalysisProgress(0);
    let progressVal = 0;
    let isFetchComplete = false;
    let apiResult: any = null;
    const interval = setInterval(() => {
      if (progressVal < 95) {
        progressVal += Math.floor(Math.random() * 8) + 2;
        if (progressVal > 95) progressVal = 95;
        setAnalysisProgress(progressVal);
      } else if (isFetchComplete) {
        progressVal = 100;
        setAnalysisProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          const finalScore = apiResult?.score ?? 76;
          const currentResult = {
            score: finalScore,
            filename: apiResult?.filename || fileName || 'resume_v3.pdf',
            sections: apiResult?.sections || { experience: 88, skills: 80, summary: 52, education: 95, impact: 44 },
            keywords: apiResult?.keywords || { found: ['Python', 'React', 'REST API', 'SQL', 'Git'], missing: ['Docker', 'CI/CD', 'Kubernetes'] },
            issues: apiResult?.issues || [
              { heading: "Weak Professional Summary", detail: "Your summary is too brief and lacks metrics showing past frontend project sizes.", type: "red" },
              { heading: "Lacks measurable metric impact", detail: "Include concrete numbers, e.g., speed increases or team sizes, in experience bullet points.", type: "red" },
              { heading: "Missing keywords", detail: "The scanner noted 3 core keywords missing compared to standard descriptions.", type: "yellow" }
            ],
            suggestions: apiResult?.suggestions || [
              { num: 1, detail: "Add measurable results (e.g. Optimized React rendering tree, boosting PageSpeed by 35%) to your first job point." },
              { num: 2, detail: "Incorporate missing skill tags directly into relevant bullet points rather than just listing them in the sidebar." }
            ]
          };
          localStorage.setItem('resumeai_current', JSON.stringify(currentResult));
          const history = JSON.parse(localStorage.getItem('resumeai_analyses') || '[]');
          const status = finalScore >= 80 ? 'ATS Ready' : finalScore >= 60 ? 'Skills Match' : 'Weak Summary';
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const d = new Date();
          const dateStr = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
          history.unshift({
            id: String(Date.now()),
            name: currentResult.filename,
            date: dateStr,
            score: finalScore,
            status: status
          });
          localStorage.setItem('resumeai_analyses', JSON.stringify(history));
          setView('result');
        }, 600);
      }
    }, 150);
    try {
      const formData = new FormData();
      formData.append('data', selectedFile);
      formData.append('jobDescription', jdInput);
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK || 'https://succesgm01.app.n8n.cloud/webhook/resume-upload';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network error');
      }
      console.log('[DEBUG] 1. Request success: Received response with status', response.status);
      const rawText = await response.text();
      console.log('[DEBUG] 2. Response body:', rawText);
      
      let parsedJson = JSON.parse(rawText);
      // Fix n8n default behavior returning array
      if (Array.isArray(parsedJson) && parsedJson.length > 0) {
        console.log('[DEBUG] 3. n8n returned an array. Extracting first item.');
        apiResult = parsedJson[0];
      } else {
        apiResult = parsedJson;
      }
      
      console.log('[DEBUG] 4. State payload ready:', apiResult);
      isFetchComplete = true;
    } catch (err) {
      apiResult = {
        score: Math.floor(Math.random() * 20) + 65,
        filename: fileName || 'resume_v3.pdf'
      };
      isFetchComplete = true;
    }
  };

  const viewHistoryRow = (name: string, rowScore: number) => {
    localStorage.setItem('resumeai_current', JSON.stringify({ score: rowScore, filename: name }));
    setView('result');
  };

  const toggleFeedbackPill = (tag: string) => {
    if (feedbackPills.includes(tag)) {
      setFeedbackPills(feedbackPills.filter(p => p !== tag));
    } else {
      setFeedbackPills([...feedbackPills, tag]);
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedbackRating === 0) {
      alert('Please select an emoji rating!');
      return;
    }
    setFeedbackSubmitted(true);
  };

  const triggerRewrite = (type: string) => {
    let promptText = "";
    if (type === 'summary') {
      promptText = "Rewrite the professional summary to match high-priority frontend keywords and raise ATS score.";
    } else if (type === 'experience') {
      promptText = "Restructure project bullet points using the STAR format with metric metrics.";
    } else if (type === 'skills') {
      promptText = "Optimize structural alignment of key programming languages, database, and tool tags.";
    }
    alert(`AI rewrite request initiated:\n\n"${promptText}"`);
  };

  const getInitials = (nameStr: string) => {
    return nameStr.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'JD';
  };

  const stages = [
    { threshold: 15, text: 'Uploading and parsing resume...' },
    { threshold: 35, text: 'Extracting text and structure...' },
    { threshold: 58, text: 'Running ATS compatibility scan...' },
    { threshold: 78, text: 'Matching keywords against job description...' },
    { threshold: 95, text: 'Generating AI recommendations...' }
  ];

  const filteredHistory = historyList.filter(row => {
    if (historyFilter === 'week') {
      return row.date.includes('May') || row.date.includes('Jun');
    }
    return true;
  }).filter(row => row.name.toLowerCase().includes(historySearchQuery.toLowerCase()));

  const [mobileSidebarActive, setMobileSidebarActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', userSelect: 'none', WebkitUserSelect: 'none' }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />

      <style dangerouslySetInnerHTML={{ __html: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { font-size: 16px; margin: 0; padding: 0; overflow: hidden; }
        body { height: 100vh; overflow: hidden; background: #0a0a0a; color: #F5F5F5; font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; user-select: none; -webkit-user-select: none; }
        :root {
          --bg: #0a0a0a;
          --bg2: #111111;
          --bg3: #1a1a1a;
          --border: #222222;
          --border2: #333333;
          --yellow: #FFD600;
          --yellow2: #FFF176;
          --red: #D32F2F;
          --red2: #FF5252;
          --text: #F5F5F5;
          --text2: #AAAAAA;
          --text3: #555555;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Syne', sans-serif;
          color: #F5F5F5;
          text-transform: none;
        }
        h1 {
          font-family: 'Syne', sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: #F5F5F5;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        h2 {
          font-family: 'Syne', sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: #F5F5F5;
          margin-bottom: 32px;
          letter-spacing: -0.5px;
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #F5F5F5;
          text-transform: none;
          letter-spacing: 0;
          margin-bottom: 20px;
        }
        .mono {
          font-family: 'DM Mono', monospace;
        }
        #cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--yellow);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%) scale(var(--cursor-scale, 1));
          transition: width 0.15s, height 0.15s, transform 0.15s;
        }
        #cursor-ring {
          position: fixed;
          width: 36px;
          height: 36px;
          border: 1.5px solid var(--yellow);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%) scale(var(--cursor-scale, 1));
          transition: width 0.2s, height 0.2s, background 0.2s, transform 0.2s;
          mix-blend-mode: difference;
        }
        body:has(a:hover, button:hover, [onclick]:hover, input:hover, textarea:hover, select:hover, label:hover) #cursor-dot {
          width: 14px;
          height: 14px;
        }
        body:has(a:hover, button:hover, [onclick]:hover, input:hover, textarea:hover, select:hover, label:hover) #cursor-ring {
          width: 52px;
          height: 52px;
          background: rgba(255, 214, 0, 0.06);
        }
        #splash-view {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          z-index: 999999;
          opacity: 1;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        #splash-view.fade-out {
          opacity: 0;
          transform: scale(1.05);
          pointer-events: none;
        }
        .splash-logo-container {
          position: relative;
          width: 140px;
          height: 140px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 25px rgba(255, 214, 0, 0.3));
          animation: logoPulse 2s ease-in-out infinite alternate;
        }
        @keyframes logoPulse {
          0% { transform: scale(0.95); filter: drop-shadow(0 0 15px rgba(255, 214, 0, 0.2)); }
          100% { transform: scale(1.05); filter: drop-shadow(0 0 45px rgba(255, 214, 0, 0.6)); }
        }
        .splash-svg {
          width: 100%;
          height: 100%;
        }
        #scan-line {
          position: absolute;
          top: 50%;
          left: 5%;
          width: 90%;
          height: 3px;
          background: #FFD600;
          box-shadow: 0 0 15px #FFD600;
          animation: sweep 2.5s ease-in-out infinite alternate;
        }
        @keyframes sweep {
          0% { top: 15%; opacity: 0.3; }
          50% { opacity: 1; }
          100% { top: 85%; opacity: 0.3; }
        }
        .splash-title {
          font-family: 'Syne', sans-serif;
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -1.5px;
          color: #F5F5F5;
          margin-bottom: 12px;
        }
        .splash-tagline {
          font-size: 16px;
          color: #888;
          margin-bottom: 32px;
        }
        .splash-dots {
          display: flex;
          gap: 8px;
        }
        .splash-dots span {
          width: 14px;
          height: 14px;
          background: var(--yellow);
          border-radius: 50%;
          animation: pulseDot 1s infinite alternate;
        }
        .splash-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .splash-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        .split-layout {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(circle at 50% 40%, #201e00 0%, #0a0a0a 70%);
          overflow-y: auto;
          padding: 40px 24px;
        }
        .auth-container {
          width: 100%;
          max-width: 560px;
          padding: 52px 52px;
          background: #111111;
          border: 1.5px solid #2a2a2a;
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
        }
        .auth-header {
          text-align: center;
        }
        .auth-header .logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .auth-header .logo i {
          color: var(--yellow);
          font-size: 40px !important;
        }
        .auth-header .logo-text {
          font-size: 22px;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
        }
        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 40px;
          font-weight: 800;
          color: #F5F5F5;
          margin-bottom: 10px;
          letter-spacing: -1.5px;
          text-align: center;
        }
        .auth-sub {
          font-size: 16px;
          color: #666;
          text-align: center;
          margin-bottom: 36px;
        }
        .sso-btn {
          width: 100%;
          background: #111;
          border: 1.5px solid #2a2a2a;
          border-radius: 10px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #F5F5F5;
          font-weight: 600;
          font-size: 16px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          margin-bottom: 28px;
          cursor: pointer;
        }
        .sso-btn:hover {
          background: var(--bg2);
          border-color: var(--yellow);
          transform: translateY(-2px);
        }
        .sso-btn svg {
          width: 22px;
          height: 22px;
        }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 24px;
          color: #444;
          font-size: 15px;
        }
        .auth-divider::before, .auth-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .form-group {
          margin-bottom: 24px;
          position: relative;
        }
        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #BBBBBB;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
        }
        .input-wrapper {
          position: relative;
        }
        .input-wrapper i {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text3);
          font-size: 18px;
          transition: color 0.2s;
        }
        .input-wrapper .eye-toggle {
          left: auto;
          right: 16px;
          cursor: pointer;
        }
        .form-control {
          width: 100%;
          height: 52px;
          background: #0e0e0e;
          border: 1.5px solid #2a2a2a;
          border-radius: 10px;
          padding: 0 18px 0 48px;
          color: #F5F5F5;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .form-control::placeholder {
          font-size: 16px;
          color: #444;
        }
        .form-control:focus {
          border-color: #FFD600;
          box-shadow: 0 0 0 4px rgba(255, 214, 0, 0.15);
        }
        .form-control.error {
          border-color: var(--red) !important;
        }
        .field-error-msg {
          color: var(--red2);
          font-size: 15px;
          margin-top: 6px;
        }
        .forgot-link {
          display: block;
          text-align: right;
          font-size: 15px;
          color: var(--yellow2);
          text-decoration: none;
          margin-top: 8px;
        }
        .forgot-link:hover {
          text-decoration: underline;
        }
        .strength-wrapper {
          margin-top: 10px;
        }
        .strength-bar {
          display: flex;
          gap: 4px;
          height: 4px;
          width: 100%;
        }
        .strength-seg {
          flex: 1;
          height: 100%;
          background: var(--border);
          border-radius: 2px;
          transition: background 0.3s;
        }
        .auth-footer-text {
          text-align: center;
          font-size: 15px;
          color: #666;
          margin-top: 28px;
        }
        .auth-footer-text span {
          color: #FFD600;
          cursor: pointer;
          font-weight: 600;
        }
        .trust-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 15px;
          color: #444;
          margin-top: 24px;
        }
        .error-banner {
          background: rgba(211, 47, 47, 0.1);
          border: 1px solid var(--red);
          color: var(--red2);
          border-radius: 8px;
          padding: 14px;
          font-size: 15px;
          margin-bottom: 24px;
        }
        .auth-container .primary-btn {
          width: 100%;
          height: 56px;
          background: #FFD600;
          color: #0a0a0a;
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 800;
          border: none;
          border-radius: 12px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 6px 20px rgba(255, 214, 0, 0.22);
          margin-top: 4px;
        }
        .auth-container .primary-btn:hover {
          background: #ffe033;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255, 214, 0, 0.32);
        }
        .app-shell {
          position: fixed;
          inset: 0;
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #0a0a0a;
        }
        .sidebar {
          width: 240px;
          height: 100vh;
          background: #0d0d0d;
          border-right: 1px solid #1e1e1e;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 100;
          flex-shrink: 0;
          overflow: hidden;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sidebar-top {
          padding: 24px 16px;
        }
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
          padding-left: 8px;
        }
        .sidebar-logo i {
          color: var(--yellow);
          font-size: 36px !important;
        }
        .sidebar-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #F5F5F5;
          transition: opacity 0.3s;
        }
        .nav-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          list-style: none;
        }
        .nav-item button, .nav-item a {
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
          color: #666;
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s, border-left 0.2s;
          border: none;
          background: none;
          text-align: left;
          border-left: 3px solid transparent;
          cursor: pointer;
        }
        .nav-item button:hover, .nav-item a:hover {
          background: #111;
          color: #CCC;
        }
        .nav-item.active button, .nav-item.active a {
          background: #1a1800;
          color: #FFD600;
          border-left: 3px solid #FFD600;
          font-weight: 600;
        }
        .nav-item.active button i, .nav-item.active a i {
          color: #FFD600;
        }
        .nav-item button i, .nav-item a i {
          font-size: 20px !important;
          color: inherit;
          transition: color 0.2s;
        }
        .sidebar-bottom {
          padding: 16px;
          border-top: 1px solid #1e1e1e;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          background: var(--yellow);
          color: var(--bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
          position: relative;
        }
        .user-info {
          flex: 1;
          min-width: 0;
          transition: opacity 0.3s;
        }
        .user-name {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .user-email {
          font-size: 13px;
          color: #555;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .logout-btn {
          color: var(--text3);
          background: none;
          border: none;
          font-size: 16px;
          padding: 4px;
          transition: color 0.2s;
          cursor: pointer;
        }
        .logout-btn:hover {
          color: var(--red2);
        }
        .main-panel {
          position: absolute;
          left: 240px;
          top: 0;
          right: 0;
          bottom: 0;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .topbar {
          height: 64px;
          background: #0d0d0d;
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 90;
          flex-shrink: 0;
          box-shadow: 0 1px 0 #1e1e1e;
        }
        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #F5F5F5;
          margin-bottom: 0;
          letter-spacing: -0.3px;
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .search-wrapper {
          position: relative;
          width: 220px;
        }
        .search-wrapper i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text3);
          font-size: 16px;
        }
        .search-input {
          width: 100%;
          height: 48px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0 12px 0 36px;
          color: var(--text);
          font-size: 15px;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          border-color: var(--yellow);
        }
        .notif-bell {
          position: relative;
          font-size: 20px;
          color: var(--text2);
          background: none;
          border: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .notif-bell:hover {
          color: var(--yellow);
        }
        .notif-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: var(--red);
          border-radius: 50%;
        }
        .topbar-avatar {
          width: 40px;
          height: 40px;
          background: var(--yellow);
          color: var(--bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          position: relative;
        }
        .user-dropdown {
          position: absolute;
          top: 44px;
          right: 0;
          width: 160px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          border-radius: 8px;
          padding: 8px 0;
          display: none;
          flex-direction: column;
          z-index: 110;
        }
        .user-dropdown.active {
          display: flex;
        }
        .dropdown-item {
          padding: 8px 16px;
          color: var(--text2);
          text-decoration: none;
          font-size: 15px;
          transition: background 0.2s, color 0.2s;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          width: 100%;
        }
        .dropdown-item:hover {
          background: var(--bg2);
          color: var(--yellow);
        }
        .content-body {
          padding: 40px 48px 48px;
          max-width: 1280px;
          width: 100%;
          flex: 1;
        }
        .dashboard-panel {
          width: 100%;
        }
        .card {
          background: #111111;
          border: 1px solid #202020;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 32px 36px;
          margin-bottom: 24px;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }
        .upload-container {
          width: 100%;
        }
        .upload-container .card {
          background: #111111;
          border: 1px solid #202020;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 32px 36px;
          margin-bottom: 24px;
          width: 100%;
        }
        .dropzone {
          min-height: 260px;
          border: 2px dashed #2a2a2a;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 32px;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
          cursor: pointer;
        }
        .dropzone.dragover {
          border-color: #FFD600;
          background: rgba(255, 214, 0, 0.03);
        }
        .dropzone.selected {
          border: 2px solid var(--yellow);
        }
        .dropzone-icon {
          font-size: 64px !important;
          color: #FFD600;
          transition: transform 0.2s;
        }
        .dropzone.dragover .dropzone-icon {
          transform: scale(1.1);
        }
        .dropzone-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #F5F5F5;
        }
        .dropzone-sub {
          font-size: 15px;
          color: #555;
          margin-top: 4px;
        }
        .dropzone-btn {
          height: 54px;
          padding: 0 32px;
          font-size: 16px;
          border: 1.5px solid #FFD600;
          color: #FFD600;
          border-radius: 10px;
          background: transparent;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          margin-top: 8px;
        }
        .dropzone-btn:hover {
          background: rgba(255, 214, 0, 0.08);
        }
        .selected-file-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .selected-file-box i {
          font-size: 40px;
          color: var(--yellow2);
        }
        .filename {
          font-size: 15px;
          font-weight: 600;
        }
        .filesize {
          font-size: 15px;
          color: var(--text3);
        }
        .change-file-btn {
          font-size: 15px;
          color: var(--yellow);
          text-decoration: underline;
          background: none;
          border: none;
          margin-top: 4px;
        }
        .jd-textarea {
          width: 100%;
          height: 160px;
          background: #0d0d0d;
          border: 1.5px solid #222;
          border-radius: 10px;
          padding: 16px 18px;
          color: #F5F5F5;
          font-size: 16px;
          line-height: 1.7;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
        }
        .jd-textarea::placeholder {
          font-size: 16px;
          color: #444;
        }
        .jd-textarea:focus {
          border-color: #FFD600;
        }
        .optional-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          color: #666;
          border: 1px solid #222;
          padding: 2px 8px;
          border-radius: 12px;
          vertical-align: middle;
          margin-left: 8px;
          font-family: 'DM Mono', monospace;
        }
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 15px;
          color: #AAAAAA;
          user-select: none;
        }
        .checkbox-label input[type="checkbox"] {
          appearance: none;
          width: 22px;
          height: 22px;
          border: 1.5px solid var(--border2);
          border-radius: 6px;
          outline: none;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          position: relative;
        }
        .checkbox-label input[type="checkbox"]:checked {
          background: var(--yellow);
          border-color: var(--yellow);
        }
        .checkbox-label input[type="checkbox"]:checked::after {
          content: "✓";
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0a0a0a;
          font-size: 14px;
          font-weight: 800;
        }
        .primary-btn {
          width: 100%;
          height: 52px;
          background: #FFD600;
          color: #0a0a0a;
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(255, 214, 0, 0.18);
        }
        .primary-btn:hover {
          background: #ffe033;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 214, 0, 0.28);
        }
        .primary-btn:active {
          transform: scale(0.98);
          box-shadow: none;
        }
        .primary-btn:disabled {
          background: #1a1a00;
          color: #444;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .upload-container .primary-btn {
          height: 56px;
          width: 100%;
          font-size: 17px;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          background: #FFD600;
          color: #0a0a0a;
          border-radius: 10px;
          letter-spacing: 0.02em;
          box-shadow: 0 6px 20px rgba(255, 214, 0, 0.25);
          transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
        }
        .upload-container .primary-btn:hover {
          background: #ffe033;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255, 214, 0, 0.35);
        }
        .upload-container .primary-btn:disabled {
          background: #1a1a00;
          color: #444;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .processing-container {
          width: 100%;
          margin: 40px auto;
          text-align: center;
        }
        .processing-graphic {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spinner-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .spinner-svg circle {
          fill: none;
          stroke: var(--border);
          stroke-width: 8 !important;
        }
        .spinner-svg .spinner-arc {
          stroke: var(--yellow);
          stroke-width: 8 !important;
          stroke-dasharray: 201;
          stroke-dashoffset: 120;
          stroke-linecap: round;
          animation: spin 1.4s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(270deg); }
        }
        .processing-graphic i {
          font-size: 28px !important;
          color: var(--yellow);
        }
        .progress-percent {
          font-family: 'DM Mono', monospace;
          font-size: 52px;
          font-weight: 500;
          color: #FFD600;
          margin-bottom: 32px;
        }
        .stages-list {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .stage-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          height: 60px;
          padding: 0 20px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg2);
        }
        .stage-item.active {
          border-color: var(--yellow);
          background: rgba(255, 214, 0, 0.02);
        }
        .stage-item.complete {
          border-color: #FFD600;
        }
        .stage-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .stage-left i {
          font-size: 18px !important;
          color: var(--text3);
        }
        .stage-item.active .stage-left i {
          color: var(--yellow);
        }
        .stage-item.complete .stage-left i {
          color: #FFD600;
        }
        .stage-right {
          font-size: 15px;
          font-weight: 600;
          color: var(--text3);
        }
        .stage-item.active .stage-right {
          color: var(--yellow);
        }
        .stage-item.complete .stage-right {
          color: #FFD600;
        }
        .results-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .results-header-right {
          display: flex;
          gap: 12px;
        }
        .results-heading-text {
          font-size: 28px;
          font-weight: 700;
        }
        .overall-score-txt {
          font-size: 15px;
          color: var(--text3);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .overall-score-desc {
          font-size: 15px;
          color: var(--text2);
          line-height: 1.6;
        }
        .score-badge {
          background: rgba(123, 199, 66, 0.1);
          color: #7bc742;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Mono', monospace;
          margin-left: 12px;
        }
        .score-badge.high {
          background: rgba(255, 214, 0, 0.1);
          color: #FFD600;
        }
        .score-badge.low {
          background: rgba(211, 47, 47, 0.1);
          color: var(--red2);
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-pill i {
          font-size: 14px !important;
        }
        .status-pill.pass {
          background: rgba(255, 214, 0, 0.1);
          color: #FFD600;
        }
        .status-pill.fail {
          background: rgba(211, 47, 47, 0.1);
          color: var(--red2);
        }
        .score-ring-wrap {
          position: relative;
          width: 160px;
          height: 160px;
        }
        .score-ring-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .score-ring-svg circle {
          fill: none;
          stroke-width: 12px !important;
        }
        .score-ring-bg {
          stroke: var(--border);
        }
        .score-ring-fill {
          stroke: var(--yellow);
          stroke-linecap: round;
          stroke-dasharray: 440;
          transition: stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .score-ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .score-ring-num {
          font-family: 'DM Mono', monospace;
          font-size: 48px;
          font-weight: 500;
          line-height: 1;
        }
        .score-ring-denom {
          font-size: 15px;
          color: #555;
          margin-top: 2px;
        }
        .metric-row {
          height: 52px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .metric-row:last-child {
          margin-bottom: 0;
        }
        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          font-weight: 500;
          color: var(--text2);
        }
        .metric-value {
          font-family: 'DM Mono', monospace;
          font-weight: 600;
          color: var(--text);
        }
        .metric-bar-bg {
          height: 8px;
          background: var(--bg3);
          border-radius: 4px;
          width: 100%;
          overflow: hidden;
        }
        .metric-bar-fill {
          height: 100%;
          background: var(--yellow);
          border-radius: 4px;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .metric-bar-fill.red {
          background: var(--red);
        }
        .results-tabs {
          display: flex;
          border-bottom: 1.5px solid var(--border);
          gap: 24px;
          margin-bottom: 28px;
        }
        .results-tab-btn {
          background: none;
          border: none;
          color: var(--text3);
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 600;
          padding: 10px 0;
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
        }
        .results-tab-btn:hover {
          color: var(--text2);
        }
        .results-tab-btn.active {
          color: var(--yellow);
        }
        .results-tab-btn.active::after {
          content: "";
          position: absolute;
          bottom: -1.5px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--yellow);
          border-radius: 3px 3px 0 0;
        }
        .tab-panel-content {
          display: none;
        }
        .tab-panel-content.active {
          display: block;
        }
        .section-strength-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 14px;
          background: var(--bg2);
          transition: border-color 0.2s;
        }
        .section-strength-row:hover {
          border-color: var(--border2);
        }
        .section-strength-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .section-strength-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(255, 214, 0, 0.05);
          color: var(--yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .section-strength-icon.red {
          background: rgba(211, 47, 47, 0.05);
          color: var(--red);
        }
        .section-strength-name {
          font-size: 15px;
          font-weight: 600;
        }
        .section-strength-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .mini-progress-bg {
          width: 80px;
          height: 6px;
          background: var(--bg3);
          border-radius: 3px;
          overflow: hidden;
        }
        .mini-progress-fill {
          height: 100%;
          background: var(--yellow);
        }
        .mini-progress-fill.red {
          background: var(--red);
        }
        .section-strength-pct {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          font-weight: 600;
          width: 36px;
          text-align: right;
        }
        .issues-summary {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
        }
        .issues-summary-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: var(--bg2);
          font-weight: 500;
        }
        .issues-summary-chip.red {
          color: var(--red2);
          border-color: rgba(211, 47, 47, 0.2);
          background: rgba(211, 47, 47, 0.02);
        }
        .issues-summary-chip.yellow {
          color: var(--yellow2);
          border-color: rgba(255, 214, 0, 0.2);
          background: rgba(255, 214, 0, 0.02);
        }
        .issue-item {
          display: flex;
          gap: 16px;
          padding: 20px 24px;
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 16px;
          background: var(--bg2);
          transition: transform 0.2s, border-color 0.2s;
        }
        .issue-item:hover {
          border-color: var(--border2);
        }
        .issue-item i {
          font-size: 20px !important;
          margin-top: 2px;
        }
        .issue-item.red i {
          color: var(--red2);
        }
        .issue-item.yellow i {
          color: var(--yellow2);
        }
        .issue-content {
          flex: 1;
        }
        .issue-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
        }
        .issue-title {
          font-size: 16px;
          font-weight: 600;
        }
        .issue-badge {
          font-size: 11px;
          font-weight: 600;
          font-family: 'DM Mono', monospace;
          padding: 2px 8px;
          border-radius: 12px;
        }
        .issue-badge.red {
          background: rgba(211, 47, 47, 0.1);
          color: var(--red2);
        }
        .issue-badge.yellow {
          background: rgba(255, 214, 0, 0.1);
          color: var(--yellow);
        }
        .issue-desc {
          font-size: 15px;
          color: var(--text2);
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .issue-action-box {
          background: var(--bg3);
          border-left: 3px solid var(--yellow);
          padding: 12px 18px;
          border-radius: 0 8px 8px 0;
          font-size: 15px;
        }
        .issue-action-box.red {
          border-left-color: var(--red);
        }
        .issue-action-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text3);
          text-transform: uppercase;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .issue-action-desc {
          color: var(--text);
          line-height: 1.5;
        }
        .keywords-card-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .keywords-score-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .keywords-score-bar-bg {
          width: 100px;
          height: 8px;
          background: var(--bg3);
          border-radius: 4px;
          overflow: hidden;
        }
        .keywords-score-bar-fill {
          height: 100%;
          background: var(--yellow);
          border-radius: 4px;
        }
        .keywords-score-pct {
          font-family: 'DM Mono', monospace;
          font-size: 15px;
          font-weight: 600;
        }
        .keywords-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }
        .keyword-item {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px 20px;
          background: var(--bg2);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.2s;
        }
        .keyword-item:hover {
          border-color: var(--border2);
        }
        .keyword-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .keyword-name {
          font-size: 16px;
          font-weight: 600;
        }
        .keyword-status {
          font-size: 11px;
          font-weight: 600;
          font-family: 'DM Mono', monospace;
          padding: 2px 8px;
          border-radius: 12px;
        }
        .keyword-status.found {
          background: rgba(255, 214, 0, 0.1);
          color: var(--yellow);
        }
        .keyword-status.missing {
          background: rgba(211, 47, 47, 0.1);
          color: var(--red2);
        }
        .keyword-frequency {
          font-size: 15px;
          color: var(--text3);
        }
        .keyword-frequency span {
          color: var(--text);
          font-weight: 600;
          font-family: 'DM Mono', monospace;
        }
        .quick-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .action-card {
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 24px;
          background: var(--bg2);
          display: flex;
          align-items: flex-start;
          gap: 16px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .action-card:hover {
          border-color: var(--yellow);
          background: rgba(255, 214, 0, 0.01);
        }
        .action-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(255, 214, 0, 0.05);
          color: var(--yellow);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }
        .action-info {
          flex: 1;
        }
        .action-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .action-desc {
          font-size: 14px;
          color: var(--text3);
          line-height: 1.5;
        }
        .ai-feedback-box {
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg2);
          overflow: hidden;
          margin-bottom: 24px;
        }
        .ai-feedback-header {
          background: var(--bg3);
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 16px;
        }
        .ai-feedback-header i {
          color: var(--yellow);
          font-size: 18px !important;
        }
        .ai-feedback-body {
          padding: 24px;
        }
        .ai-feedback-text {
          font-size: 15px;
          color: var(--text);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .ai-rewrite-buttons {
          display: flex;
          gap: 12px;
        }
        .ai-rewrite-btn {
          flex: 1;
          height: 44px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          border-radius: 8px;
          color: var(--text);
          font-size: 15px;
          font-weight: 600;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .ai-rewrite-btn:hover {
          background: var(--bg2);
          border-color: var(--yellow);
          color: var(--yellow);
        }
        .feedback-container {
          width: 100%;
          margin: 0 auto;
        }
        .feedback-title {
          font-family: 'Syne', sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: #F5F5F5;
          margin-bottom: 16px;
          text-align: center;
          letter-spacing: -0.5px;
        }
        .emoji-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
        }
        .emoji-btn {
          font-size: 40px;
          background: none;
          border: 2px solid #1e1e1e;
          width: 72px;
          height: 72px;
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .emoji-btn:hover {
          border-color: var(--yellow);
          background: rgba(255, 214, 0, 0.05);
          transform: scale(1.1);
        }
        .emoji-btn.selected {
          border-color: var(--yellow);
          background: rgba(255, 214, 0, 0.1);
          transform: scale(1.1);
        }
        .pills-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 32px;
        }
        .pill-tag {
          border: 1px solid var(--border);
          background: var(--bg2);
          padding: 8px 18px;
          border-radius: 20px;
          color: var(--text2);
          font-size: 15px;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .pill-tag:hover {
          border-color: var(--yellow);
          color: var(--text);
        }
        .pill-tag.selected {
          background: var(--yellow);
          color: var(--bg);
          border-color: var(--yellow);
        }
        .feedback-container .jd-textarea {
          height: 180px;
          font-size: 15px;
          padding: 16px 18px;
        }
        .feedback-container .primary-btn {
          height: 60px;
          font-size: 18px;
          font-weight: 700;
        }
        .feedback-success {
          text-align: center;
          padding: 48px 24px;
        }
        .feedback-success i {
          font-size: 64px;
          color: #7bc742;
          margin-bottom: 24px;
          display: block;
        }
        .feedback-success h2 {
          font-size: 28px;
          margin-bottom: 12px;
        }
        .feedback-success p {
          color: var(--text2);
          font-size: 15px;
          margin-bottom: 32px;
        }
        .history-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .filter-tabs {
          display: flex;
          gap: 8px;
          background: var(--bg2);
          padding: 4px;
          border-radius: 8px;
          border: 1px solid var(--border);
        }
        .filter-tab {
          background: none;
          border: none;
          color: var(--text3);
          font-size: 14px;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .filter-tab:hover {
          color: var(--text);
        }
        .filter-tab.active {
          background: var(--bg3);
          color: var(--yellow);
        }
        .history-table-container {
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg2);
          overflow-x: auto;
        }
        .history-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 15px;
        }
        .history-table th {
          background: var(--bg3);
          padding: 16px 24px;
          font-weight: 600;
          color: var(--text2);
          border-bottom: 1px solid var(--border);
        }
        .history-table td {
          padding: 18px 24px;
          border-bottom: 1px solid var(--border);
          color: var(--text);
        }
        .history-table tr:last-child td {
          border-bottom: none;
        }
        .history-score-col {
          font-weight: 700;
          font-family: 'DM Mono', monospace;
        }
        .history-score-col.high {
          color: #FFD600;
        }
        .history-score-col.mid {
          color: #FFD600;
        }
        .history-score-col.low {
          color: var(--red);
        }
        .history-empty {
          text-align: center;
          padding: 64px 24px;
          color: var(--text3);
        }
        .history-empty i {
          font-size: 48px !important;
          margin-bottom: 16px;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .settings-actions {
          margin-top: 32px;
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }
        .sec-btn {
          height: 54px;
          padding: 0 32px;
          font-size: 15px;
          border: 1.5px solid var(--border2);
          color: var(--text2);
          border-radius: 10px;
          background: transparent;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .sec-btn:hover {
          border-color: var(--text);
          color: var(--text);
        }
        .mobile-header {
          display: none;
          height: 56px;
          background: #0d0d0d;
          border-bottom: 1px solid #1e1e1e;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 105;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
        }
        .mobile-btn {
          background: none;
          border: none;
          color: var(--text2);
          font-size: 20px;
        }
        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mobile-logo i {
          color: var(--yellow);
          font-size: 28px !important;
        }
        .mobile-logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #F5F5F5;
        }
        .mobile-bottom-nav {
          display: none;
          height: 60px;
          background: #0d0d0d;
          border-top: 1px solid #1e1e1e;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 105;
          justify-content: space-around;
          align-items: center;
        }
        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #555;
          text-decoration: none;
          font-size: 10px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .mobile-nav-item i {
          font-size: 20px !important;
        }
        .mobile-nav-item.active {
          color: var(--yellow);
        }
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 99;
        }
        .splash-logo-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 24px;
        }
        .splash-svg {
          width: 100%;
          height: 100%;
        }
        .splash-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .splash-tagline {
          font-size: 15px;
          color: #555;
          margin-bottom: 24px;
        }
        .splash-dots {
          display: flex;
          gap: 6px;
        }
        .splash-dots span {
          width: 12px;
          height: 12px;
          background: var(--yellow);
          border-radius: 50%;
          animation: pulseDot 1s infinite alternate;
        }
        .splash-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .splash-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
        @keyframes sweep {
          0% { transform: translateY(-50%) scaleX(0); opacity: 0.8; }
          100% { transform: translateY(-50%) scaleX(1); opacity: 0; }
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes pulseDot {
          to { opacity: 0.2; transform: scale(0.8); }
        }
        .card i:not(.dropzone-icon):not(.issue-item i):not(.stage-left i):not(.sidebar i):not(.topbar i) {
          font-size: 28px !important;
        }
        @media (hover: none) and (pointer: coarse) {
          #cursor-dot, #cursor-ring {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          html {
            font-size: 16px;
          }
          body {
            font-size: 16px;
          }
          .split-layout {
            padding: 40px 16px;
          }
          .auth-container {
            max-width: 100%;
            padding: 36px 24px;
          }
          .auth-title {
            font-size: 32px;
          }
          .sidebar {
            display: none;
          }
          .sidebar.active {
            display: flex;
            width: 260px !important;
            z-index: 1000;
          }
          .sidebar-overlay.active {
            display: block;
          }
          .main-panel {
            left: 0 !important;
            padding: 24px 16px;
          }
          .topbar {
            display: none;
          }
          .mobile-header {
            display: flex;
          }
          .mobile-bottom-nav {
            display: flex;
          }
          .app-shell {
            padding-top: 56px;
            padding-bottom: 60px;
          }
          .content-body {
            padding: 24px 16px 76px 16px;
          }
          .card, .upload-container .card {
            padding: 24px 20px;
          }
          .dropzone {
            min-height: 200px;
            padding: 32px 20px;
          }
          .dropzone-icon {
            font-size: 56px !important;
          }
          .upload-container .primary-btn {
            height: 56px;
            font-size: 17px;
          }
          .score-ring-wrap {
            width: 150px;
            height: 150px;
          }
          .results-grid {
            grid-template-columns: 1fr;
          }
          .checkbox-grid {
            grid-template-columns: 1fr;
          }
          .hero-score-card {
            flex-direction: column;
            gap: 20px;
            text-align: center;
            align-items: center;
          }
          .hero-score-left {
            align-items: center;
          }
          .status-pills-row {
            justify-content: center;
          }
          .ai-rewrite-buttons {
            flex-direction: column;
            gap: 8px;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .sidebar {
            width: 80px !important;
          }
          .sidebar-logo-text,
          .nav-item button span,
          .nav-item a span,
          .user-info,
          .logout-btn {
            display: none !important;
          }
          .sidebar-logo {
            padding-left: 0 !important;
            justify-content: center;
          }
          .nav-item button, .nav-item a {
            padding: 0 !important;
            justify-content: center !important;
            border-left: none !important;
          }
          .sidebar-bottom {
            justify-content: center;
          }
          .main-panel {
            left: 80px !important;
          }
          .topbar {
            padding: 0 24px;
          }
        }
        @media (min-width: 1440px) {
          .main-panel {
            padding: 48px 64px 64px;
            max-width: 1440px;
          }
          .card, .upload-container .card {
            padding: 36px 44px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}} />

      <div id="cursor-dot" ref={dotRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>

      {view === 'splash' && (
        <div id="splash-view" style={{ opacity: isSplashFading ? 0 : 1, transform: isSplashFading ? 'scale(1.04)' : 'scale(1)', pointerEvents: isSplashFading ? 'none' : 'all', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
          <div className="splash-logo-container">
            <svg className="splash-svg" viewBox="0 0 60 60">
              <rect x="8" y="8" width="44" height="44" rx="10" stroke="#FFD600" strokeWidth="2.5" fill="none" />
              <path d="M20 36 L32 24 L28 24 L40 16" stroke="#FFD600" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div id="scan-line"></div>
          </div>
          <h1 className="splash-title">resumeAI</h1>
          <p className="splash-tagline">Powered by AI · Built for humans</p>
          <div className="splash-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      {(view === 'signup' || view === 'login') && (
        <div className="split-layout">

            {view === 'signup' ? (
              <div className="auth-container">
                <div className="auth-header">
                  <div className="logo">
                    <i className="ti ti-bolt"></i>
                    <span className="logo-text">resumeAI</span>
                  </div>
                  <h1 className="auth-title">Create your account</h1>
                  <p className="auth-sub">Free forever · No credit card</p>
                </div>

                <button className="sso-btn" onClick={handleSSO}>
                  <svg viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-7.98 0-4.4 3.53-7.979 7.86-7.979 2.47 0 4.12 1.025 5.06 1.926l3.245-3.121C18.3 1.92 15.54 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.977 0-.74-.08-1.305-.175-1.926l-10.618-.302z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="auth-divider">or sign up with email</div>

                <form onSubmit={handleSignupSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <i className="ti ti-user"></i>
                      <input type="text" className="form-control" placeholder="John Doe" required value={signupName} onChange={e => setSignupName(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                      <i className="ti ti-mail"></i>
                      <input type="email" className="form-control" placeholder="you@email.com" required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <i className="ti ti-lock"></i>
                      <input type="password" id="signup-pass-field" className="form-control" placeholder="••••••••" required value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
                      <i className="ti ti-eye eye-toggle" onClick={() => {
                        const input = document.getElementById('signup-pass-field') as HTMLInputElement;
                        if (input) input.type = input.type === 'password' ? 'text' : 'password';
                      }}></i>
                    </div>
                    <div className="strength-wrapper">
                      <div className="strength-bar">
                        <div className="strength-seg" style={{ background: strengthScore >= 1 ? (strengthScore === 1 ? 'var(--red)' : strengthScore === 2 ? '#FF6D00' : strengthScore === 3 ? 'var(--yellow)' : '#7BC742') : 'var(--border)' }}></div>
                        <div className="strength-seg" style={{ background: strengthScore >= 2 ? (strengthScore === 2 ? '#FF6D00' : strengthScore === 3 ? 'var(--yellow)' : '#7BC742') : 'var(--border)' }}></div>
                        <div className="strength-seg" style={{ background: strengthScore >= 3 ? (strengthScore === 3 ? 'var(--yellow)' : '#7BC742') : 'var(--border)' }}></div>
                        <div className="strength-seg" style={{ background: strengthScore >= 4 ? '#7BC742' : 'var(--border)' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="input-wrapper">
                      <i className="ti ti-lock"></i>
                      <input type="password" id="signup-confirm-field" className={`form-control ${!passwordsMatch ? 'error' : ''}`} placeholder="••••••••" required value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} />
                      <i className="ti ti-eye eye-toggle" onClick={() => {
                        const input = document.getElementById('signup-confirm-field') as HTMLInputElement;
                        if (input) input.type = input.type === 'password' ? 'text' : 'password';
                      }}></i>
                    </div>
                    {!passwordsMatch && <div className="field-error-msg">Passwords do not match</div>}
                  </div>

                  <button type="submit" className="primary-btn">Create Free Account →</button>
                </form>

                <p className="auth-footer-text">Already have an account? <span onClick={() => setView('login')}>Sign in</span></p>

                <div className="trust-row">
                  <span>🔒 Secure</span>
                  <span>⚡ Instant</span>
                  <span>✅ Free plan</span>
                </div>
              </div>
            ) : (
              <div className="auth-container">
                <div className="auth-header">
                  <div className="logo">
                    <i className="ti ti-bolt"></i>
                    <span className="logo-text">resumeAI</span>
                  </div>
                  <h1 className="auth-title">Welcome back</h1>
                  <p className="auth-sub">Sign in to your dashboard</p>
                </div>

                {loginError && (
                  <div className="error-banner">Invalid credentials. Please use demo@resumeai.com and demopass123.</div>
                )}

                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label>Email Address</label>
                    <div className="input-wrapper">
                      <i className="ti ti-mail"></i>
                      <input type="email" className="form-control" placeholder="you@email.com" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <i className="ti ti-lock"></i>
                      <input type="password" id="login-pass-field" className="form-control" placeholder="••••••••" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                      <i className="ti ti-eye eye-toggle" onClick={() => {
                        const input = document.getElementById('login-pass-field') as HTMLInputElement;
                        if (input) input.type = input.type === 'password' ? 'text' : 'password';
                      }}></i>
                    </div>
                    <a href="#" className="forgot-link" onClick={() => alert('Password reset link sent to demo account!')}>Forgot password?</a>
                  </div>

                  <button type="submit" className="primary-btn">Sign in →</button>
                </form>

                <p className="auth-footer-text">Don't have an account? <span onClick={() => setView('signup')}>Sign up free</span></p>

                <div className="trust-row">
                  <span>🔒 Secure</span>
                  <span>⚡ Instant</span>
                  <span>✅ Free plan</span>
                </div>
              </div>
            )}
        </div>
      )}

      {view !== 'splash' && view !== 'signup' && view !== 'login' && (
        <div className="app-shell">
          <div className={`sidebar-overlay ${mobileSidebarActive ? 'active' : ''}`} onClick={() => setMobileSidebarActive(false)}></div>
          <aside className={`sidebar ${mobileSidebarActive ? 'active' : ''}`}>
            <div className="sidebar-top">
              <div className="sidebar-logo">
                <i className="ti ti-bolt"></i>
                <span className="sidebar-logo-text">resumeAI</span>
              </div>
              <ul className="nav-list">
                <li className={`nav-item ${view === 'upload' ? 'active' : ''}`}><button onClick={() => { setView('upload'); setMobileSidebarActive(false); }}><i className="ti ti-upload"></i><span>Upload Resume</span></button></li>
                <li className={`nav-item ${view === 'result' ? 'active' : ''}`}><button onClick={() => { setView('result'); setMobileSidebarActive(false); }}><i className="ti ti-file-report"></i><span>Analysis Results</span></button></li>
                <li className={`nav-item ${view === 'feedback' ? 'active' : ''}`}><button onClick={() => { setView('feedback'); setMobileSidebarActive(false); }}><i className="ti ti-message"></i><span>Feedback</span></button></li>
                <li className={`nav-item ${view === 'history' ? 'active' : ''}`}><button onClick={() => { setView('history'); setMobileSidebarActive(false); }}><i className="ti ti-history"></i><span>History</span></button></li>
                <li className={`nav-item ${view === 'settings' ? 'active' : ''}`}><button onClick={() => { setView('settings'); setMobileSidebarActive(false); }}><i className="ti ti-settings"></i><span>Settings</span></button></li>
              </ul>
            </div>
            <div className="sidebar-bottom">
              <div className="user-avatar">{user ? getInitials(user.name) : 'JD'}</div>
              <div className="user-info">
                <div className="user-name">{user ? user.name : 'John Doe'}</div>
                <div className="user-email">{user ? user.email : 'john@example.com'}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout}><i className="ti ti-logout"></i></button>
            </div>
          </aside>

          <div className="main-panel">
            <header className="mobile-header">
              <button className="mobile-btn" onClick={() => setMobileSidebarActive(true)}><i className="ti ti-menu-2"></i></button>
              <div className="mobile-logo">
                <i className="ti ti-bolt"></i>
                <span className="mobile-logo-text">resumeAI</span>
              </div>
              <div className="topbar-avatar" onClick={() => setDropdownActive(!dropdownActive)}>{user ? getInitials(user.name) : 'JD'}</div>
            </header>

            <header className="topbar">
              <div className="page-title">
                {view === 'upload' && 'Upload Resume'}
                {view === 'analysis' && 'Analysis in Progress'}
                {view === 'result' && 'Analysis Results'}
                {view === 'feedback' && 'Send Feedback'}
                {view === 'history' && 'Resume History'}
                {view === 'settings' && 'Settings'}
              </div>
              <div className="topbar-right">
                <div className="search-wrapper">
                  <i className="ti ti-search"></i>
                  <input type="text" className="search-input" placeholder="Search files..." />
                </div>
                <button className="notif-bell"><i className="ti ti-bell"></i><div className="notif-badge"></div></button>
                <div className="topbar-avatar" onClick={() => setDropdownActive(!dropdownActive)}>
                  {user ? getInitials(user.name) : 'JD'}{' '}
                  <div className={`user-dropdown ${dropdownActive ? 'active' : ''}`}>
                    <button className="dropdown-item" onClick={() => { setView('settings'); setDropdownActive(false); }}>Settings</button>
                    <button className="dropdown-item" onClick={() => { handleLogout(); setDropdownActive(false); }}>Logout</button>
                  </div>
                </div>
              </div>
            </header>

            <div className="content-body">
              {view === 'upload' && (
                <div className="dashboard-panel">
                  <div className="upload-container">
                    <div className="card">
                      <h3 className="card-title">Select Resume</h3>
                      <div className={`dropzone ${fileName ? 'selected' : ''} ${isDragOver ? 'dragover' : ''}`}
                           onClick={() => document.getElementById('hidden-file-input-el')?.click()}
                           onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                           onDragLeave={() => setIsDragOver(false)}
                           onDrop={handleFileDrop}>
                        {fileName ? (
                          <div className="selected-file-box">
                            <i className="ti ti-file-text"></i>
                            <span className="filename">{fileName}</span>
                            <span className="filesize">{fileSize}</span>
                            <button className="change-file-btn" onClick={clearUploadedFile}>Change file</button>
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center' }}>
                            <i className="ti ti-file-text dropzone-icon"></i>
                            <p className="dropzone-title">Drop your resume here</p>
                            <p className="dropzone-sub">Supports PDF, DOCX, DOC · Max 10MB</p>
                            <button className="dropzone-btn" type="button" style={{ marginTop: '16px' }}>Select File</button>
                          </div>
                        )}
                        <input type="file" id="hidden-file-input-el" style={{ display: 'none' }} accept=".pdf,.docx,.doc" onChange={handleFileChange} />
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="card-title">Job Description <span className="optional-badge">Optional</span></h3>
                      <textarea className="jd-textarea" placeholder="Paste the job description here to improve keyword match accuracy by up to 40%..." value={jdInput} onChange={e => setJdInput(e.target.value)}></textarea>
                    </div>

                    <div className="card">
                      <h3 className="card-title">Analysis Options</h3>
                      <div className="checkbox-grid">
                        <label className="checkbox-item">
                          <input type="checkbox" checked disabled />
                          <span>ATS Score Analysis</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" defaultChecked />
                          <span>Keyword Matching</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" defaultChecked />
                          <span>Section Strength Audit</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" defaultChecked />
                          <span>AI Rewrite Suggestions</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" />
                          <span>Industry Benchmarking</span>
                        </label>
                        <label className="checkbox-item">
                          <input type="checkbox" defaultChecked />
                          <span>Grammar & Clarity Check</span>
                        </label>
                      </div>
                    </div>

                    <div className="usage-row">
                      <span>Monthly Free Limit</span>
                      <span>3 of 10 analyses used</span>
                    </div>
                    <div className="usage-bar" style={{ marginBottom: '24px' }}>
                      <div className="usage-fill"></div>
                    </div>

                    <button className="primary-btn" disabled={!fileName} onClick={startAnalysisSequence}>Start Analysis →</button>
                  </div>
                </div>
              )}

              {view === 'analysis' && (
                <div className="dashboard-panel">
                  <div className="processing-container">
                    <div className="processing-graphic">
                      <svg className="spinner-svg" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" />
                        <circle cx="40" cy="40" r="32" className="spinner-arc" />
                      </svg>
                      <i className="ti ti-file-text"></i>
                    </div>
                    <div className="progress-percent mono">{analysisProgress}%</div>

                    <div className="stages-list">
                      {stages.map((stage, idx) => {
                        const isComplete = analysisProgress >= stage.threshold;
                        const isActive = !isComplete && (idx === 0 || analysisProgress >= stages[idx - 1].threshold);
                        return (
                          <div key={idx} className={`stage-item ${isComplete ? 'complete' : isActive ? 'active' : ''}`}>
                            <div className="stage-left">
                              <i className={`ti ${isComplete ? 'ti-circle-check' : isActive ? 'ti-loader-quarter ti-spin' : 'ti-circle-dashed'}`}></i>
                              <span>{stage.text}</span>
                            </div>
                            <div className="stage-right">
                              {isComplete ? 'Complete' : isActive ? 'Processing...' : 'Pending'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {view === 'result' && (
                <div className="dashboard-panel">
                  <div className="hero-score-card">
                    <div className="hero-score-left">
                      <span className="hero-score-label">Resume Score</span>
                      <span className="hero-score-filename">{currentFileName}</span>
                      <span className="role-pill">Frontend Developer</span>
                      <div className="status-pills-row">
                        <div className="status-pill pass">ATS Ready</div>
                        <div className="status-pill fail">Weak Summary</div>
                        <div className="status-pill warn">Skills Match</div>
                      </div>
                    </div>
                    <div className="score-ring-wrap">
                      <svg className="score-ring-svg" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="70" className="score-ring-bg" />
                        <circle cx="80" cy="80" r="70" className="score-ring-fill" style={{ strokeDasharray: '440', strokeDashoffset: `${440 * (1 - score / 100)}` }} />
                      </svg>
                      <div className="score-ring-center">
                        <span className="score-ring-num mono">{score}</span>
                        <span className="score-ring-denom mono">/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="results-grid">
                    <div>
                      <div className="card">
                        <h3 className="card-title">Section Strength</h3>
                        <div className="metric-row">
                          <div className="metric-header"><span>Experience</span><span className="mono">{analysisResult?.sections?.experience ?? 88}%</span></div>
                          <div className="metric-bar-bg"><div className="metric-bar-fill green" style={{ width: `${analysisResult?.sections?.experience ?? 88}%` }}></div></div>
                        </div>
                        <div className="metric-row">
                          <div className="metric-header"><span>Skills</span><span className="mono">{analysisResult?.sections?.skills ?? 80}%</span></div>
                          <div className="metric-bar-bg"><div className="metric-bar-fill green" style={{ width: `${analysisResult?.sections?.skills ?? 80}%` }}></div></div>
                        </div>
                        <div className="metric-row">
                          <div className="metric-header"><span>Summary</span><span className="mono">{analysisResult?.sections?.summary ?? 52}%</span></div>
                          <div className="metric-bar-bg"><div className={`metric-bar-fill ${(analysisResult?.sections?.summary ?? 52) < 60 ? 'red' : (analysisResult?.sections?.summary ?? 52) < 80 ? 'yellow' : 'green'}`} style={{ width: `${analysisResult?.sections?.summary ?? 52}%` }}></div></div>
                        </div>
                        <div className="metric-row">
                          <div className="metric-header"><span>Education</span><span className="mono">{analysisResult?.sections?.education ?? 95}%</span></div>
                          <div className="metric-bar-bg"><div className="metric-bar-fill green" style={{ width: `${analysisResult?.sections?.education ?? 95}%` }}></div></div>
                        </div>
                        <div className="metric-row">
                          <div className="metric-header"><span>Impact</span><span className="mono">{analysisResult?.sections?.impact ?? 44}%</span></div>
                          <div className="metric-bar-bg"><div className={`metric-bar-fill ${(analysisResult?.sections?.impact ?? 44) < 60 ? 'red' : (analysisResult?.sections?.impact ?? 44) < 80 ? 'yellow' : 'green'}`} style={{ width: `${analysisResult?.sections?.impact ?? 44}%` }}></div></div>
                        </div>
                      </div>

                      <div className="card">
                        <h3 className="card-title">Issues Found</h3>
                        <div className="issues-list">
                          {(analysisResult?.issues || [
                            { heading: "Weak Professional Summary", detail: "Your summary is too brief and lacks metrics showing past frontend project sizes.", type: "red" },
                            { heading: "Lacks measurable metric impact", detail: "Include concrete numbers, e.g., speed increases or team sizes, in experience bullet points.", type: "red" },
                            { heading: "Missing keywords", detail: "The scanner noted 3 core keywords missing compared to standard descriptions.", type: "yellow" }
                          ]).map((issue: any, idx: number) => (
                            <div key={idx} className={`issue-item ${issue.type}`}>
                              <i className={`ti ${issue.type === 'red' ? 'ti-alert-circle' : issue.type === 'yellow' ? 'ti-info-circle' : 'ti-circle-check'}`}></i>
                              <div className="issue-content">
                                <span className="issue-heading">{issue.heading}</span>
                                <span className="issue-desc">{issue.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="card">
                        <div className="keywords-card-title-row">
                          <h3 className="card-title" style={{ margin: 0 }}>Keywords</h3>
                          <span className="keywords-badge mono">
                            {(analysisResult?.keywords?.found || ['Python', 'React', 'REST API', 'SQL', 'Git']).length} / {((analysisResult?.keywords?.found || ['Python', 'React', 'REST API', 'SQL', 'Git']).length) + ((analysisResult?.keywords?.missing || ['Docker', 'CI/CD', 'Kubernetes']).length)} Matched
                          </span>
                        </div>
                        <div className="keyword-section-label">Found Keywords</div>
                        <div className="keywords-wrap">
                          {(analysisResult?.keywords?.found || ['Python', 'React', 'REST API', 'SQL', 'Git']).map((k: string) => (
                            <span key={k} className="keyword-pill found">{k}</span>
                          ))}
                        </div>
                        <div className="keyword-section-label">Missing Keywords</div>
                        <div className="keywords-wrap">
                          {(analysisResult?.keywords?.missing || ['Docker', 'CI/CD', 'Kubernetes']).map((k: string) => (
                            <span key={k} className="keyword-pill missing">{k}</span>
                          ))}
                        </div>
                        <div className="keywords-legend">
                          <div className="legend-item">
                            <div className="legend-indicator found"></div>
                            <span>Found</span>
                          </div>
                          <div className="legend-item">
                            <div className="legend-indicator missing"></div>
                            <span>Missing</span>
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <h3 className="card-title">Quick Actions</h3>
                        <div className="actions-list">
                          <button className="outline-btn" onClick={() => alert('Downloading PDF report...')}><i className="ti ti-download"></i><span>Download PDF Report</span></button>
                          <button className="ghost-btn" onClick={() => { navigator.clipboard.writeText('Increase professional summary size. Use numbers, %, $ in bullets. Match keywords.'); alert('Improvement tips copied to clipboard!'); }}><i className="ti ti-copy"></i><span>Copy Improvement Tips</span></button>
                          <button className="ghost-btn" onClick={() => setView('upload')}><i className="ti ti-refresh"></i><span>Reanalyze with New JD</span></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card tab-feedback-card">
                    <div className="tabs-header">
                      <button className={`tab-btn ${activeResultsTab === 'issues' ? 'active' : ''}`} onClick={() => setActiveResultsTab('issues')}>Issues</button>
                      <button className={`tab-btn ${activeResultsTab === 'suggestions' ? 'active' : ''}`} onClick={() => setActiveResultsTab('suggestions')}>Suggestions</button>
                      <button className={`tab-btn ${activeResultsTab === 'rewrite' ? 'active' : ''}`} onClick={() => setActiveResultsTab('rewrite')}>AI Rewrite</button>
                    </div>
                    <div className="tab-panes">
                      <div className={`tab-pane ${activeResultsTab === 'issues' ? 'active' : ''}`}>
                        <div className="issues-tab-wrap">
                          {(analysisResult?.issues || [
                            { heading: "Summary Lacks Scope", detail: "Expand summary details to reflect technical stack expertise explicitly.", type: "red" },
                            { heading: "Formatting Outlines", detail: "Adjust structural alignment of section headers for parsing.", type: "yellow" }
                          ]).filter((i: any) => i.type !== 'green').map((issue: any, idx: number) => (
                            <div key={idx} className={`issue-item ${issue.type}`}>
                              <i className={`ti ${issue.type === 'red' ? 'ti-alert-circle' : 'ti-info-circle'}`}></i>
                              <div className="issue-content">
                                <span className="issue-heading">{issue.heading}</span>
                                <span className="issue-desc">{issue.detail}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={`tab-pane ${activeResultsTab === 'suggestions' ? 'active' : ''}`}>
                        {(analysisResult?.suggestions || [
                          { num: 1, detail: "Add measurable results (e.g. Optimized React rendering tree, boosting PageSpeed by 35%) to your first job point." },
                          { num: 2, detail: "Incorporate missing skill tags directly into relevant bullet points rather than just listing them in the sidebar." }
                        ]).map((s: any, idx: number) => (
                          <div key={idx} className="suggestion-row">
                            <span className="suggestion-num">{s.num}</span>
                            <span className="suggestion-text">{s.detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className={`tab-pane ${activeResultsTab === 'rewrite' ? 'active' : ''}`}>
                        <div className="ai-rewrite-pane">
                          <p className="ai-rewrite-desc">Generate instant, ATS-friendly rewrites for weaker sections of your resume using AI.</p>
                          <div className="ai-rewrite-buttons">
                            <button className="ai-rewrite-btn" onClick={() => triggerRewrite('summary')}>Summary ↗</button>
                            <button className="ai-rewrite-btn" onClick={() => triggerRewrite('experience')}>Experience ↗</button>
                            <button className="ai-rewrite-btn" onClick={() => triggerRewrite('skills')}>Skills ↗</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {view === 'feedback' && (
                <div className="dashboard-panel">
                  <div className="feedback-container">
                    {!feedbackSubmitted ? (
                      <div className="card">
                        <h3 className="feedback-title">How was your analysis?</h3>
                        <div className="emoji-row">
                          {[1, 2, 3, 4, 5].map((val) => {
                            const emojis = ['', '😞', '😐', '🙂', '😊', '🤩'];
                            return (
                              <button key={val} className={`emoji-btn ${feedbackRating === val ? 'selected' : ''}`} onClick={() => setFeedbackRating(val)}>
                                {emojis[val]}
                              </button>
                            );
                          })}
                        </div>
                        <h3 className="feedback-title">What worked well?</h3>
                        <div className="pills-grid">
                          {['Accurate score', 'Helpful suggestions', 'Clear layout', 'Fast analysis', 'Good keyword tips', 'Easy to use'].map(tag => (
                            <button key={tag} className={`pill-tag ${feedbackPills.includes(tag) ? 'selected' : ''}`} onClick={() => toggleFeedbackPill(tag)}>
                              {tag}
                            </button>
                          ))}
                        </div>

                        <h3 className="feedback-title">Tell us more</h3>
                        <div className="form-group">
                          <textarea className="jd-textarea" placeholder="Any other thoughts? We read every response..." value={feedbackText} onChange={e => setFeedbackText(e.target.value)}></textarea>
                        </div>

                        <button className="primary-btn" onClick={handleFeedbackSubmit}>Send Feedback →</button>
                      </div>
                    ) : (
                      <div className="card feedback-success">
                        <i className="ti ti-circle-check"></i>
                        <h3>Thank you!</h3>
                        <p>Your feedback helps us improve.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {view === 'history' && (
                <div className="dashboard-panel">
                  <div className="history-header">
                    <h2 className="page-title">Resume History</h2>
                    <div className="filter-tabs">
                      <button className={`filter-tab ${historyFilter === 'all' ? 'active' : ''}`} onClick={() => setHistoryFilter('all')}>All</button>
                      <button className={`filter-tab ${historyFilter === 'week' ? 'active' : ''}`} onClick={() => setHistoryFilter('week')}>This Week</button>
                      <button className={`filter-tab ${historyFilter === 'month' ? 'active' : ''}`} onClick={() => setHistoryFilter('month')}>This Month</button>
                    </div>
                    <div className="search-wrapper" style={{ width: '240px' }}>
                      <i className="ti ti-search"></i>
                      <input type="text" className="search-input" placeholder="Search history..." value={historySearchQuery} onChange={e => setHistorySearchQuery(e.target.value)} />
                    </div>
                  </div>

                  <div className="history-table-container">
                    <table className="history-table">
                      <thead>
                        <tr>
                          <th>File Name</th>
                          <th>Date</th>
                          <th>Score</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHistory.length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: 'var(--text3)' }}>No records found</td>
                          </tr>
                        ) : (
                          filteredHistory.map((row) => {
                            const cls = row.score >= 80 ? 'green' : row.score >= 60 ? 'yellow' : 'red';
                            return (
                              <tr key={row.id}>
                                <td>{row.name}</td>
                                <td className="mono">{row.date}</td>
                                <td><span className={`score-badge ${cls} mono`}>{row.score}</span></td>
                                <td>{row.status}</td>
                                <td className="table-actions">
                                  <button className="table-action-link" onClick={() => viewHistoryRow(row.name, row.score)}>View</button>
                                  <button className="table-action-link" onClick={() => alert(`Downloading ${row.name} PDF report...`)}>Download</button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {view === 'settings' && (
                <div className="dashboard-panel">
                  <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h3 className="card-title">Account Settings</h3>
                    <div className="form-group">
                      <label>Theme</label>
                      <select className="form-control" style={{ paddingLeft: '14px' }} disabled>
                        <option>Flat Dark Theme (Always)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Email Reports</label>
                      <label className="checkbox-item" style={{ marginTop: '8px' }}>
                        <input type="checkbox" defaultChecked />
                        <span>Send report copy on completion</span>
                      </label>
                    </div>
                    <button className="primary-btn" onClick={() => alert('Settings saved!')}>Save Settings</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav className="mobile-bottom-nav">
            <button className={`mobile-nav-link ${view === 'upload' ? 'active' : ''}`} onClick={() => setView('upload')}><i className="ti ti-upload"></i><span>Upload</span></button>
            <button className={`mobile-nav-link ${view === 'result' ? 'active' : ''}`} onClick={() => setView('result')}><i className="ti ti-file-report"></i><span>Results</span></button>
            <button className={`mobile-nav-link ${view === 'feedback' ? 'active' : ''}`} onClick={() => setView('feedback')}><i className="ti ti-message"></i><span>Feedback</span></button>
            <button className={`mobile-nav-link ${view === 'history' ? 'active' : ''}`} onClick={() => setView('history')}><i className="ti ti-history"></i><span>History</span></button>
            <button className={`mobile-nav-link ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><i className="ti ti-settings"></i><span>Settings</span></button>
          </nav>
        </div>
      )}
    </div>
  );
}
