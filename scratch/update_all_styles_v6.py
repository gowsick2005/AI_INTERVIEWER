import os

html_path = r"c:\Users\gowsi\ai-resume-analyzer\resume-analyzer-ui.html"
tsx_path = r"c:\Users\gowsi\ai-resume-analyzer\app\components\ResumeAnalyzer.tsx"

for path in [html_path, tsx_path]:
    if not os.path.exists(path):
        print(f"File not found: {path}")
        exit(1)

with open(tsx_path, "r", encoding="utf-8") as f:
    tsx_content = f.read().replace("\r\n", "\n")

start_tag_tsx = "      <style dangerouslySetInnerHTML={{ __html: `"
end_tag_tsx = "      `}} />"

start_idx_tsx = tsx_content.find(start_tag_tsx)
end_idx_tsx = tsx_content.find(end_tag_tsx)

if start_idx_tsx == -1 or end_idx_tsx == -1:
    print("Could not find style tag markers in TSX!")
    exit(1)

new_css = """
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; scroll-behavior: smooth; }
        body { min-height: 100vh; overflow-x: hidden; background: #0a0a0a; color: #F5F5F5; font-family: 'Poppins', 'Inter', sans-serif; font-size: 16px; line-height: 1.7; user-select: none; -webkit-user-select: none; }
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
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100vw;
          min-height: 100vh;
          background: radial-gradient(circle at center, #1c1a00 0%, #0a0a0a 100%);
          padding: 40px 24px;
        }
        .auth-container {
          width: 100%;
          max-width: 520px;
          padding: 48px 44px;
          background: rgba(17, 17, 17, 0.95);
          border: 1.5px solid #222;
          border-radius: 16px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(255, 214, 0, 0.02);
          backdrop-filter: blur(16px);
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
          font-size: 15px;
          font-weight: 500;
          color: #AAAAAA;
          margin-bottom: 8px;
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
          height: 56px;
          background: #0d0d0d;
          border: 1.5px solid #222;
          border-radius: 10px;
          padding: 0 18px 0 48px;
          color: #F5F5F5;
          font-size: 16px;
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
        }
        .app-shell {
          display: flex;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        .sidebar {
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
          margin-left: 220px;
          min-height: 100vh;
          background: var(--bg);
          width: calc(100% - 220px);
          padding: 40px 48px;
          transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .topbar {
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
        }
        .page-title {
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
          padding: 88px 40px 32px 40px;
        }
        .dashboard-panel {
          width: 100%;
        }
        .card {
          background: #111111;
          border: 1px solid #1e1e1e;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 36px 40px;
          margin-bottom: 28px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .upload-container {
          width: 100%;
        }
        .upload-container .card {
          background: #111111;
          border: 1px solid #1e1e1e;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 36px 40px;
          margin-bottom: 28px;
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
        }
        .upload-container .primary-btn {
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
            margin-left: 0;
            width: 100%;
            min-height: 100vh;
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
            margin-left: 80px !important;
            width: calc(100% - 80px) !important;
            padding: 32px 36px;
          }
          .topbar {
            left: 80px !important;
            padding: 0 24px;
          }
        }
        @media (min-width: 1440px) {
          .main-panel {
            padding: 48px 64px;
          }
          .card, .upload-container .card {
            padding: 40px 48px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
"""

tsx_updated = tsx_content[:start_idx_tsx] + start_tag_tsx + new_css + tsx_content[end_idx_tsx:]

# Apply score ring SVG modifications inside ResumeAnalyzer.tsx (viewBox, cx, cy, r, dasharray, dashoffset)
tsx_updated = tsx_updated.replace('<svg className="score-ring-svg" viewBox="0 0 190 190">', '<svg className="score-ring-svg" viewBox="0 0 160 160">')
tsx_updated = tsx_updated.replace('<circle cx="95" cy="95" r="83" className="score-ring-bg" />', '<circle cx="80" cy="80" r="70" className="score-ring-bg" />')
tsx_updated = tsx_updated.replace('<circle cx="60" cy="60" r="83" className="score-ring-fill" style={{ strokeDasharray: \'522\', strokeDashoffset: `${522 * (1 - score / 100)}` }} />', '<circle cx="80" cy="80" r="70" className="score-ring-fill" style={{ strokeDasharray: \'440\', strokeDashoffset: `${440 * (1 - score / 100)}` }} />')

with open(tsx_path, "w", encoding="utf-8") as f:
    f.write(tsx_updated)

print("TSX updated!")

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read().replace("\r\n", "\n")

start_tag_html = "  <style>"
end_tag_html = "  </style>"

start_idx_html = html_content.find(start_tag_html)
end_idx_html = html_content.find(end_tag_html)

if start_idx_html == -1:
    start_tag_html = "<style>"
    start_idx_html = html_content.find(start_tag_html)

if end_idx_html == -1:
    end_tag_html = "</style>"
    end_idx_html = html_content.find(end_tag_html)

if start_idx_html != -1 and end_idx_html != -1:
    html_updated = html_content[:start_idx_html] + start_tag_html + new_css + html_content[end_idx_html:]
    
    # Replace score ring SVG circles inside HTML
    html_updated = html_updated.replace('<svg class="score-ring-svg" viewBox="0 0 190 190">', '<svg class="score-ring-svg" viewBox="0 0 160 160">')
    html_updated = html_updated.replace('<circle cx="95" cy="95" r="83" class="score-ring-bg" />', '<circle cx="80" cy="80" r="70" class="score-ring-bg" />')
    html_updated = html_updated.replace('<circle cx="95" cy="95" r="83" class="score-ring-fill" id="results-ring-element" />', '<circle cx="80" cy="80" r="70" class="score-ring-fill" id="results-ring-element" />')
    
    # Update JS strokeDashoffset multipliers in HTML
    html_updated = html_updated.replace("const offset = 522 * (1 - current.score / 100);", "const offset = 440 * (1 - current.score / 100);")

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_updated)

print("SaaS scale synchronization executed!")
