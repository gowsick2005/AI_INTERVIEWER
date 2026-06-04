import re

tsx_path = r"c:\Users\gowsi\ai-resume-analyzer\app\components\ResumeAnalyzer.tsx"

with open(tsx_path, "r", encoding="utf-8") as f:
    src = f.read().replace("\r\n", "\n")

# ─── 1. ROOT WRAPPER: lock the viewport so nothing can be dragged ─────────────
src = src.replace(
    "style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}",
    "style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', userSelect: 'none', WebkitUserSelect: 'none' }}"
)

# ─── 2. FONT IMPORTS: add Google Fonts (Syne + Inter) ────────────────────────
old_link = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />'
new_link = (
    '<link rel="preconnect" href="https://fonts.googleapis.com" />\n'
    '      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />\n'
    '      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&display=swap" />\n'
    '      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />'
)
src = src.replace(old_link, new_link)

# ─── 3. CSS BLOCK: replace every targeted rule ───────────────────────────────

REPLACEMENTS = [

    # ── html / body – kill overflow on body so the fixed root wrapper controls all scrolling
    (
        "html { font-size: 16px; scroll-behavior: smooth; }",
        "html, body { font-size: 16px; margin: 0; padding: 0; overflow: hidden; scroll-behavior: smooth; }"
    ),

    # ── body – prevent any unwanted horizontal scroll / drag
    (
        "body { min-height: 100vh; overflow-x: hidden; background: #0a0a0a; color: #F5F5F5; font-family: 'Poppins', 'Inter', sans-serif; font-size: 16px; line-height: 1.7; user-select: none; -webkit-user-select: none; }",
        "body { height: 100vh; overflow: hidden; background: #0a0a0a; color: #F5F5F5; font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; user-select: none; -webkit-user-select: none; }"
    ),

    # ── splash-view: bulletproof full-screen centering ────────────────────────
    (
        """        #splash-view {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 999999;
          opacity: 1;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }""",
        """        #splash-view {
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
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }"""
    ),

    # ── auth layout: full-screen centering, no scroll ────────────────────────
    (
        """        .split-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          min-height: 100vh;
          background: radial-gradient(circle at center, #1c1a00 0%, #0a0a0a 100%);
          padding: 40px 24px;
        }""",
        """        .split-layout {
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
        }"""
    ),

    # ── auth-container: larger card, more breathing room ─────────────────────
    (
        """        .auth-container {
          width: 100%;
          max-width: 520px;
          padding: 48px 44px;
          background: rgba(17, 17, 17, 0.95);
          border: 1.5px solid #222;
          border-radius: 16px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(255, 214, 0, 0.02);
          backdrop-filter: blur(16px);
        }""",
        """        .auth-container {
          width: 100%;
          max-width: 560px;
          padding: 56px 52px;
          background: #111111;
          border: 1.5px solid #2a2a2a;
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,214,0,0.04);
        }"""
    ),

    # ── auth title sizing ─────────────────────────────────────────────────────
    (
        """        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 40px;
          font-weight: 800;
          color: #F5F5F5;
          margin-bottom: 10px;
          letter-spacing: -1.5px;
          text-align: center;
        }""",
        """        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 34px;
          font-weight: 800;
          color: #F5F5F5;
          margin-bottom: 10px;
          letter-spacing: -1px;
          text-align: center;
        }"""
    ),

    # ── form-control: taller inputs, clearer text ─────────────────────────────
    (
        """        .form-control {
          width: 100%;
          height: 56px;
          background: #0d0d0d;
          border: 1.5px solid #222;
          border-radius: 10px;
          padding: 0 18px 0 48px;
          color: #F5F5F5;
          font-size: 16px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }""",
        """        .form-control {
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
        }"""
    ),

    # ── form-group label ──────────────────────────────────────────────────────
    (
        """        .form-group label {
          display: block;
          font-size: 15px;
          font-weight: 500;
          color: #AAAAAA;
          margin-bottom: 8px;
        }""",
        """        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #BBBBBB;
          margin-bottom: 8px;
          letter-spacing: 0.01em;
        }"""
    ),

    # ── app-shell: locked desktop shell ──────────────────────────────────────
    (
        """        .app-shell {
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }""",
        """        .app-shell {
          position: fixed;
          inset: 0;
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #0a0a0a;
        }"""
    ),

    # ── sidebar: locked 240px ─────────────────────────────────────────────────
    (
        """        .sidebar {
          width: 220px;
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
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }""",
        """        .sidebar {
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
        }"""
    ),

    # ── main-panel: offset 240px, scrollable, no page drag ───────────────────
    (
        """        .main-panel {
          margin-left: 220px;
          min-height: 100vh;
          background: var(--bg);
          width: calc(100% - 220px);
          padding: 40px 48px;
          transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }""",
        """        .main-panel {
          position: absolute;
          left: 240px;
          top: 0;
          right: 0;
          bottom: 0;
          height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--bg);
          padding: 0;
          transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }"""
    ),

    # ── topbar: bound to 240px offset ────────────────────────────────────────
    (
        """        .topbar {
          height: 60px;
          background: #0a0a0a;
          border-bottom: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          position: fixed;
          left: 220px;
          right: 0;
          top: 0;
          z-index: 90;
          transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }""",
        """        .topbar {
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
        }"""
    ),

    # ── content-body: inner scroll area with max-width grid ──────────────────
    (
        """        .content-body {
          padding: 88px 40px 32px 40px;
        }""",
        """        .content-body {
          padding: 40px 48px 48px;
          max-width: 1280px;
          width: 100%;
        }"""
    ),

    # ── page-title: prominent heading ─────────────────────────────────────────
    (
        """        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: #F5F5F5;
          margin-bottom: 28px;
          letter-spacing: -0.5px;
        }
        .topbar .page-title {
          margin-bottom: 0;
          font-size: 28px;
        }""",
        """        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #F5F5F5;
          margin-bottom: 0;
          letter-spacing: -0.3px;
        }"""
    ),

    # ── card: full-width, consistent padding ──────────────────────────────────
    (
        """        .card {
          background: #111111;
          border: 1px solid #1e1e1e;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 36px 40px;
          margin-bottom: 28px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }""",
        """        .card {
          background: #111111;
          border: 1px solid #202020;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 32px 36px;
          margin-bottom: 24px;
          width: 100%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }"""
    ),

    # ── upload-container .card: match above ───────────────────────────────────
    (
        """        .upload-container .card {
          background: #111111;
          border: 1px solid #1e1e1e;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 36px 40px;
          margin-bottom: 28px;
          width: 100%;
        }""",
        """        .upload-container .card {
          background: #111111;
          border: 1px solid #202020;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 32px 36px;
          margin-bottom: 24px;
          width: 100%;
        }"""
    ),

    # ── card-title: clear hierarchy ───────────────────────────────────────────
    (
        """        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #F5F5F5;
          text-transform: none;
          letter-spacing: 0;
          margin-bottom: 20px;
        }""",
        """        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #F5F5F5;
          text-transform: none;
          letter-spacing: 0;
          margin-bottom: 20px;
        }"""
    ),

    # ── primary-btn: taller, bolder ───────────────────────────────────────────
    (
        """        .primary-btn {
          width: 100%;
          height: 58px;
          background: #FFD600;
          color: #0a0a0a;
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          border: none;
          border-radius: 10px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .primary-btn:hover {
          background: #ffe033;
          transform: translateY(-2px);
        }
        .primary-btn:active {
          transform: scale(0.99);
        }
        .primary-btn:disabled {
          background: #1a1a00;
          color: #333;
          cursor: not-allowed;
          transform: none;
        }""",
        """        .primary-btn {
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
        }"""
    ),

    # ── upload primary-btn override ───────────────────────────────────────────
    (
        """        .upload-container .primary-btn {
          height: 64px;
          width: 100%;
          font-size: 20px;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          background: #FFD600;
          color: #0a0a0a;
          border-radius: 10px;
          letter-spacing: 0.02em;
          box-shadow: 0 8px 24px rgba(255, 214, 0, 0.25);
        }
        .upload-container .primary-btn:hover {
          background: #ffe033;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255, 214, 0, 0.35);
        }
        .upload-container .primary-btn:disabled {
          background: #1a1a00;
          color: #333;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }""",
        """        .upload-container .primary-btn {
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
        }"""
    ),

    # ── auth primary-btn ──────────────────────────────────────────────────────
    (
        """        .auth-container .primary-btn {
          width: 100%;
          height: 60px;
          background: #FFD600;
          color: #0a0a0a;
          font-family: 'Syne', sans-serif;
          font-size: 19px;
          font-weight: 800;
          border: none;
          border-radius: 10px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(255, 214, 0, 0.2);
        }
        .auth-container .primary-btn:hover {
          background: #ffe033;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(255, 214, 0, 0.3);
        }""",
        """        .auth-container .primary-btn {
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
        }"""
    ),

    # ── sec-btn: secondary actions ────────────────────────────────────────────
    (
        """        .sec-btn {
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
        }""",
        """        .sec-btn {
          height: 48px;
          padding: 0 28px;
          font-size: 14px;
          border: 1.5px solid var(--border2);
          color: var(--text2);
          border-radius: 10px;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
        }
        .sec-btn:hover {
          border-color: var(--text);
          color: var(--text);
          transform: translateY(-1px);
        }"""
    ),

    # ── ai-rewrite-btn: secondary action ─────────────────────────────────────
    (
        """        .ai-rewrite-btn {
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
        }""",
        """        .ai-rewrite-btn {
          flex: 1;
          height: 44px;
          background: var(--bg3);
          border: 1px solid var(--border2);
          border-radius: 8px;
          color: var(--text);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .ai-rewrite-btn:hover {
          background: var(--bg2);
          border-color: var(--yellow);
          color: var(--yellow);
          transform: translateY(-1px);
        }"""
    ),

    # ── results/history action buttons ───────────────────────────────────────
    (
        """        .filter-tab {
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
        }""",
        """        .filter-tab {
          background: none;
          border: none;
          color: var(--text3);
          font-size: 14px;
          font-weight: 600;
          padding: 7px 18px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .filter-tab:hover {
          color: var(--text);
          transform: translateY(-1px);
        }
        .filter-tab.active {
          background: var(--bg3);
          color: var(--yellow);
        }"""
    ),

    # ── history table: larger text ────────────────────────────────────────────
    (
        """        .history-table {
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
        }""",
        """        .history-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
        }
        .history-table th {
          background: var(--bg3);
          padding: 14px 24px;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text2);
          border-bottom: 1px solid var(--border);
        }
        .history-table td {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          color: var(--text);
          font-size: 14px;
        }"""
    ),

    # ── tablet media query: 80px sidebar + corrected main panel ──────────────
    (
        """          .main-panel {
            margin-left: 80px !important;
            width: calc(100% - 80px) !important;
            padding: 32px 36px;
          }
          .topbar {
            left: 80px !important;
            padding: 0 24px;
          }""",
        """          .main-panel {
            left: 80px !important;
          }
          .topbar {
            padding: 0 24px;
          }"""
    ),

    # ── mobile media query: full panel ───────────────────────────────────────
    (
        """          .main-panel {
            margin-left: 0;
            width: 100%;
            min-height: 100vh;
            padding: 24px 16px;
          }""",
        """          .main-panel {
            left: 0 !important;
            padding: 24px 16px;
          }"""
    ),

    # ── 1440px+ larger padding ────────────────────────────────────────────────
    (
        """          .main-panel {
            padding: 48px 64px;
          }
          .card, .upload-container .card {
            padding: 40px 48px;
          }""",
        """          .content-body {
            padding: 48px 64px 64px;
            max-width: 1440px;
          }
          .card, .upload-container .card {
            padding: 36px 44px;
          }"""
    ),

]

for old, new in REPLACEMENTS:
    if old in src:
        src = src.replace(old, new)
        print(f"  ✓ Patched: {old[:60].strip()!r}...")
    else:
        print(f"  ✗ MISSING: {old[:60].strip()!r}...")

# ─── 4. JSX: fix splash-view inline style for smooth centering ───────────────
src = src.replace(
    "<div id=\"splash-view\" style={{ opacity: isSplashFading ? 0 : 1, transform: isSplashFading ? 'scale(1.04)' : 'none', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>",
    "<div id=\"splash-view\" style={{ opacity: isSplashFading ? 0 : 1, transform: isSplashFading ? 'scale(1.04)' : 'scale(1)', transition: 'opacity 0.5s ease, transform 0.5s ease', pointerEvents: isSplashFading ? 'none' : 'all' }}>"
)

with open(tsx_path, "w", encoding="utf-8") as f:
    f.write(src)

print("\nAll patches applied to ResumeAnalyzer.tsx!")
