import os

html_path = r"c:\Users\gowsi\ai-resume-analyzer\resume-analyzer-ui.html"
tsx_path = r"c:\Users\gowsi\ai-resume-analyzer\app\components\ResumeAnalyzer.tsx"

for path in [html_path, tsx_path]:
    if not os.path.exists(path):
        print(f"File not found: {path}")
        exit(1)

with open(tsx_path, "r", encoding="utf-8") as f:
    tsx_content = f.read()

start_tag_tsx = "      <style dangerouslySetInnerHTML={{ __html: `"
end_tag_tsx = "      `}} />"

start_idx_tsx = tsx_content.find(start_tag_tsx)
end_idx_tsx = tsx_content.find(end_tag_tsx)

new_css = """
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body { min-height: 100vh; overflow-x: hidden; background: #0a0a0a; color: #F5F5F5; font-family: 'Syne', sans-serif; font-size: 16px; line-height: 1.7; }
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
          font-size: 18px;
          font-weight: 600;
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
        .split-layout {
          display: flex;
          width: 100vw;
          min-height: 100vh;
        }
        .split-left {
          width: 50%;
          min-height: 100vh;
          background: #0d0d0d;
          padding: 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 214, 0, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 214, 0, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }
        .split-left-content {
          position: relative;
          z-index: 2;
        }
        .left-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 64px;
        }
        .left-logo-icon {
          width: 48px;
          height: 48px;
          border: 2px solid var(--yellow);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--yellow);
          font-size: 24px;
        }
        .left-logo-text {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .left-headline {
          font-family: 'Syne', sans-serif;
          font-size: 52px;
          font-weight: 800;
          color: #F5F5F5;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }
        .left-subtext {
          font-size: 18px;
          color: #777;
          line-height: 1.7;
          margin-bottom: 48px;
          max-width: 460px;
        }
        .left-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bullet-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 16px;
          height: 44px;
          color: #CCCCCC;
        }
        .bullet-icon {
          color: var(--yellow);
          font-size: 20px !important;
        }
        .left-stats-row {
          display: flex;
          gap: 12px;
          position: relative;
          z-index: 2;
          margin-top: 48px;
        }
        .stat-chip {
          background: var(--bg3);
          border: 1px solid #222;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .stat-chip .mono {
          font-family: 'DM Mono', monospace;
          font-size: 20px;
          font-weight: 500;
          color: #FFD600;
        }
        .stat-chip .label {
          font-size: 13px;
          color: #666;
        }
        .split-right {
          width: 50%;
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }
        .auth-container {
          width: 100%;
          max-width: 480px;
          padding: 0;
          background: transparent;
          border: none;
        }
        .auth-header {
          margin-bottom: 32px;
          text-align: center;
        }
        .auth-header .logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .auth-header .logo i {
          color: var(--yellow);
          font-size: 36px !important;
        }
        .auth-header .logo-text {
          font-size: 20px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
        }
        .auth-title {
          font-family: 'Syne', sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: #F5F5F5;
          margin-bottom: 10px;
          letter-spacing: -0.5px;
        }
        .auth-sub {
          font-size: 16px;
          color: #777;
          margin-bottom: 36px;
        }
        .sso-btn {
          width: 100%;
          background: #111;
          border: 1.5px solid #2a2a2a;
          border-radius: 10px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #F5F5F5;
          font-weight: 500;
          font-size: 16px;
          transition: background 0.2s, border-color 0.2s;
          margin-bottom: 28px;
        }
        .sso-btn:hover {
          background: var(--bg2);
          border-color: var(--yellow);
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
          font-size: 14px;
        }
        .auth-divider::before, .auth-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .form-group {
          margin-bottom: 20px;
          position: relative;
        }
        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #AAAAAA;
          margin-bottom: 8px;
        }
        .input-wrapper {
          position: relative;
        }
        .input-wrapper i {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text3);
          font-size: 18px;
          transition: color 0.2s;
        }
        .input-wrapper .eye-toggle {
          left: auto;
          right: 14px;
          cursor: pointer;
        }
        .form-control {
          width: 100%;
          height: 54px;
          background: #0d0d0d;
          border: 1.5px solid #222;
          border-radius: 10px;
          padding: 0 18px 0 42px;
          color: #F5F5F5;
          font-size: 16px;
          outline: none;
          transition: border-color 0.15s;
        }
        .form-control::placeholder {
          font-size: 16px;
          color: #444;
        }
        .form-control:focus {
          border-color: #FFD600;
          box-shadow: none;
        }
        .form-control.error {
          border-color: var(--red) !important;
        }
        .field-error-msg {
          color: var(--red2);
          font-size: 11px;
          margin-top: 4px;
        }
        .forgot-link {
          display: block;
          text-align: right;
          font-size: 14px;
          color: var(--yellow2);
          text-decoration: none;
          margin-top: 6px;
        }
        .forgot-link:hover {
          text-decoration: underline;
        }
        .strength-wrapper {
          margin-top: 8px;
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
          margin-top: 24px;
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
          font-size: 13px;
          color: #444;
          margin-top: 20px;
        }
        .error-banner {
          background: rgba(211, 47, 47, 0.1);
          border: 1px solid var(--red);
          color: var(--red2);
          border-radius: 8px;
          padding: 12px;
          font-size: 13px;
          margin-bottom: 20px;
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
        }
        .nav-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          list-style: none;
        }
        .nav-item button {
          width: 100%;
          height: 48px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
          color: #666;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
          border: none;
          background: none;
          text-align: left;
          border-left: 3px solid transparent;
        }
        .nav-item button:hover {
          background: #111;
          color: #CCC;
        }
        .nav-item.active button {
          background: #1a1800;
          color: #FFD600;
          border-left: 3px solid #FFD600;
          font-weight: 600;
        }
        .nav-item.active button i {
          color: #FFD600;
        }
        .nav-item button i {
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
        }
        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 34px;
          font-weight: 700;
          color: #F5F5F5;
          margin-bottom: 32px;
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
          height: 46px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0 12px 0 36px;
          color: var(--text);
          font-size: 13px;
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
          font-size: 13px;
          transition: background 0.2s, color 0.2s;
          background: none;
          border: none;
          text-align: left;
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
          min-height: 280px;
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
          font-size: 72px !important;
          color: #FFD600;
          transition: transform 0.2s;
        }
        .dropzone.dragover .dropzone-icon {
          transform: scale(1.1);
        }
        .dropzone-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 600;
          color: #F5F5F5;
        }
        .dropzone-sub {
          font-size: 14px;
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
          font-size: 12px;
          color: var(--text3);
        }
        .change-file-btn {
          font-size: 13px;
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
          font-size: 13px;
          font-weight: 600;
          color: #FFD600;
          border: 1.5px solid #FFD600;
          padding: 4px 14px;
          border-radius: 4px;
          background: transparent;
          margin-left: 8px;
          text-transform: none;
        }
        .helper-text {
          font-size: 13px;
          color: #555;
          margin-top: 8px;
        }
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          row-gap: 16px;
          column-gap: 48px;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          height: 48px;
          font-size: 14px;
          color: #CCCCCC;
          cursor: pointer;
          gap: 12px;
        }
        .checkbox-item input[type="checkbox"] {
          appearance: none;
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border: 2px solid #333;
          border-radius: 5px;
          background: var(--bg);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: border-color 0.2s;
          margin-right: 0;
          flex-shrink: 0;
        }
        .checkbox-item input[type="checkbox"]:checked {
          background: #FFD600;
          border-color: #FFD600;
        }
        .checkbox-item input[type="checkbox"]::after {
          content: "";
          position: absolute;
          left: 6px;
          top: 3px;
          width: 6px;
          height: 10px;
          border: solid #0a0a0a;
          border-width: 0 2.5px 2.5px 0;
          transform: rotate(45deg);
          opacity: 0;
        }
        .checkbox-item input[type="checkbox"]:checked::after {
          opacity: 1;
        }
        .usage-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .usage-row span:first-child {
          font-size: 14px;
          color: #555;
        }
        .usage-row span:last-child {
          font-size: 14px;
          color: #666;
          float: right;
        }
        .usage-bar {
          height: 8px;
          background: #1a1a1a;
          border-radius: 4px;
          width: 100%;
          overflow: hidden;
          margin: 12px 0 24px;
        }
        .usage-fill {
          height: 100%;
          background: #FFD600;
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
          transform: translateY(-1px);
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
          height: 58px;
          width: 100%;
          font-size: 18px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          background: #FFD600;
          color: #0a0a0a;
          border-radius: 10px;
          letter-spacing: 0.02em;
        }
        .upload-container .primary-btn:hover {
          background: #ffe033;
          transform: translateY(-2px);
        }
        .upload-container .primary-btn:disabled {
          background: #1a1a00;
          color: #333;
          cursor: not-allowed;
          transform: none;
        }
        .processing-container {
          max-width: 560px;
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
          stroke-linecap: round;
          stroke-dasharray: 60 200;
          animation: spin 2s linear infinite;
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
          font-size: 48px;
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
          font-size: 14px;
          height: 60px;
          padding: 0 20px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg2);
          color: var(--text3);
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .stage-item.active {
          color: var(--text);
          border-color: var(--yellow);
          background: var(--bg3);
        }
        .stage-item.complete {
          color: #7bc742;
          border-color: rgba(123, 199, 66, 0.2);
          background: rgba(123, 199, 66, 0.02);
        }
        .stage-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .stage-left i {
          font-size: 18px !important;
        }
        .stage-item.complete .stage-left span {
          text-decoration: line-through;
          opacity: 0.6;
        }
        .stage-right {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .stage-item.active .stage-right {
          color: var(--yellow);
          animation: pulseText 1s infinite alternate;
        }
        @keyframes pulseText {
          to { opacity: 0.4; }
        }
        .processing-complete-msg {
          font-family: 'Syne', sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: #7bc742;
          margin-top: 16px;
        }
        .results-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
        }
        .hero-score-card {
          background: #111111;
          border: 1px solid #1e1e1e;
          border-left: 3px solid #FFD600;
          border-radius: 14px;
          padding: 36px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }
        .hero-score-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hero-score-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #555;
        }
        .hero-score-filename {
          font-size: 22px;
          font-weight: 700;
        }
        .role-pill {
          display: inline-block;
          border: 1px solid var(--yellow);
          color: var(--yellow);
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
          width: fit-content;
        }
        .status-pills-row {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .status-pill {
          font-size: 13px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .status-pill.pass {
          background: rgba(123, 199, 66, 0.1);
          color: #7bc742;
        }
        .status-pill.warn {
          background: rgba(255, 214, 0, 0.1);
          color: var(--yellow2);
        }
        .status-pill.fail {
          background: rgba(211, 47, 47, 0.1);
          color: var(--red2);
        }
        .score-ring-wrap {
          position: relative;
          width: 190px;
          height: 190px;
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
          stroke-dasharray: 522;
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
          font-size: 16px;
          color: #555;
          margin-top: 2px;
        }
        .metric-row {
          height: 52px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .metric-header {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #AAA;
        }
        .metric-header span.mono {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          color: #F5F5F5;
        }
        .metric-bar-bg {
          height: 10px;
          background: var(--bg3);
          border-radius: 5px;
          width: 100%;
          overflow: hidden;
          margin-top: 10px;
        }
        .metric-bar-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .metric-bar-fill.red { background: var(--red); }
        .metric-bar-fill.yellow { background: var(--yellow); }
        .metric-bar-fill.green { background: #7bc742; }
        .issues-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .issue-item {
          display: flex;
          align-items: center;
          gap: 14px;
          min-height: 72px;
          padding: 20px 0;
          border: none;
          background: transparent;
          border-bottom: 1px solid #1a1a1a;
        }
        .issue-item:last-child {
          border-bottom: none;
        }
        .issue-item.red { border-left: none; }
        .issue-item.yellow { border-left: none; }
        .issue-item.green { border-left: none; }
        .issue-item i {
          font-size: 18px !important;
          flex-shrink: 0;
        }
        .issue-item.red i { color: var(--red2); }
        .issue-item.yellow i { color: var(--yellow2); }
        .issue-item.green i { color: #7bc742; }
        .issue-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .issue-heading {
          font-size: 15px;
          font-weight: 600;
          color: #F5F5F5;
        }
        .issue-desc {
          font-size: 15px;
          line-height: 1.6;
          color: #777;
        }
        .keywords-card-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .keywords-badge {
          font-size: 14px;
          font-weight: 600;
          color: var(--yellow);
        }
        .keyword-section-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text3);
          margin-bottom: 12px;
          margin-top: 16px;
        }
        .keywords-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .keyword-pill {
          font-size: 14px;
          padding: 6px 16px;
          border-radius: 8px;
          font-weight: 500;
          border: 1px solid transparent;
        }
        .keyword-pill.found {
          background: rgba(123, 199, 66, 0.05);
          border-color: rgba(123, 199, 66, 0.2);
          color: #7bc742;
        }
        .keyword-pill.missing {
          background: rgba(211, 47, 47, 0.05);
          border-color: rgba(211, 47, 47, 0.2);
          color: var(--red2);
        }
        .keywords-legend {
          display: flex;
          gap: 16px;
          font-size: 11px;
          color: var(--text3);
          margin-top: 24px;
          border-top: 1px solid var(--border);
          padding-top: 12px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .legend-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .legend-indicator.found { background: #7bc742; }
        .legend-indicator.missing { background: var(--red); }
        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .outline-btn {
          width: 100%;
          height: 54px;
          background: none;
          border: 1.5px solid var(--yellow);
          color: var(--yellow);
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 24px;
          transition: background 0.2s, color 0.2s;
        }
        .outline-btn:hover {
          background: var(--yellow);
          color: var(--bg);
        }
        .outline-btn i {
          font-size: 18px !important;
        }
        .ghost-btn {
          width: 100%;
          height: 54px;
          background: none;
          border: 1.5px solid var(--yellow);
          color: var(--yellow);
          border-radius: 10px;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 24px;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .ghost-btn:hover {
          background: var(--bg3);
          border-color: var(--yellow);
          color: var(--text);
        }
        .ghost-btn i {
          font-size: 18px !important;
        }
        .tab-feedback-card {
          margin-top: 24px;
        }
        .tabs-header {
          display: flex;
          border-bottom: 1px solid var(--border);
          gap: 24px;
          margin-bottom: 20px;
        }
        .tab-btn {
          background: none;
          border: none;
          color: var(--text3);
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          padding: 14px 28px;
          position: relative;
          transition: color 0.2s;
        }
        .tab-btn:hover {
          color: var(--text2);
        }
        .tab-btn.active {
          color: var(--yellow);
          border-bottom: 2.5px solid #FFD600;
        }
        .tab-pane {
          display: none;
        }
        .tab-pane.active {
          display: block;
        }
        .issues-tab-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .suggestion-row {
          display: flex;
          gap: 16px;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg3);
          margin-bottom: 12px;
        }
        .suggestion-num {
          width: 24px;
          height: 24px;
          background: var(--yellow);
          color: var(--bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }
        .suggestion-text {
          font-size: 14px;
          line-height: 1.4;
        }
        .ai-rewrite-pane {
          padding: 8px;
        }
        .ai-rewrite-desc {
          font-size: 14px;
          color: var(--text2);
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
          font-size: 13px;
          font-weight: 600;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .ai-rewrite-btn:hover {
          background: var(--bg2);
          border-color: var(--yellow);
          color: var(--yellow);
        }
        .feedback-container {
          max-width: 640px;
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
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, border-color 0.2s;
        }
        .emoji-btn:hover {
          transform: scale(1.1);
        }
        .emoji-btn.selected {
          border-color: var(--yellow);
          background: #1a1800;
          transform: scale(1.1);
        }
        .pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 32px;
        }
        .pill-tag {
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--text2);
          height: 44px;
          padding: 0 22px;
          border-radius: 8px;
          font-size: 14px;
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
          height: 58px;
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
        .feedback-success h3 {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .feedback-success p {
          color: var(--text2);
          font-size: 14px;
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .history-filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 16px;
        }
        .filter-tabs {
          display: flex;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 4px;
          gap: 4px;
        }
        .filter-tab {
          background: none;
          border: none;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text2);
          border-radius: 6px;
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
          padding: 16px;
          background: var(--bg3);
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #555;
          border-bottom: 1px solid var(--border);
        }
        .history-table td {
          padding: 0 16px;
          height: 60px;
          border-bottom: 1px solid var(--border);
          color: var(--text2);
          font-size: 15px;
        }
        .history-table tr:last-child td {
          border-bottom: none;
        }
        .history-table tr:hover td {
          background: rgba(255, 255, 255, 0.01);
          color: var(--text);
        }
        .score-badge {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          padding: 5px 14px;
          border-radius: 6px;
          font-size: 14px;
        }
        .score-badge.green { background: rgba(123, 199, 66, 0.1); color: #7bc742; }
        .score-badge.yellow { background: rgba(255, 214, 0, 0.1); color: var(--yellow2); }
        .score-badge.red { background: rgba(211, 47, 47, 0.1); color: var(--red2); }
        .table-actions {
          display: flex;
          gap: 12px;
        }
        .table-actions button {
          height: 40px;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          padding: 0 16px;
          border-radius: 10px;
        }
        .table-action-link {
          color: var(--yellow);
          text-decoration: none;
          font-weight: 600;
          font-size: 13px;
          background: none;
          border: none;
        }
        .table-action-link:hover {
          text-decoration: underline;
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
          z-index: 200;
          padding: 0 16px;
          align-items: center;
          justify-content: space-between;
        }
        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .mobile-logo i {
          color: var(--yellow);
          font-size: 20px;
        }
        .mobile-logo-text {
          font-size: 16px;
          font-weight: 800;
        }
        .mobile-btn {
          background: none;
          border: none;
          color: var(--text);
          font-size: 22px;
        }
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #0d0d0d;
          border-top: 1px solid #1e1e1e;
          z-index: 200;
          align-items: center;
          justify-content: space-around;
        }
        .mobile-nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #666;
          text-decoration: none;
          font-size: 10px;
          font-weight: 500;
          gap: 4px;
          background: none;
          border: none;
        }
        .mobile-nav-link.active {
          color: #FFD600;
        }
        .mobile-nav-link i {
          font-size: 20px;
        }
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: 150;
          display: none;
        }
        .sidebar-overlay.active {
          display: block;
        }
        #splash-view {
          position: fixed;
          inset: 0;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        .splash-logo-container {
          position: relative;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .splash-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .splash-svg rect {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawPath 0.8s ease forwards;
          animation-delay: 0.3s;
        }
        .splash-svg path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawPath 0.8s ease forwards;
          animation-delay: 0.3s;
        }
        #scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--yellow);
          top: 50%;
          transform: translateY(-50%) scaleX(0);
          transform-origin: left;
          animation: sweep 0.4s ease forwards;
          animation-delay: 2s;
        }
        .splash-title {
          font-family: 'Syne', sans-serif;
          font-size: 50px;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 8px;
          animation: fadeInUp 0.5s ease forwards;
          animation-delay: 1.1s;
          opacity: 0;
          transform: translateY(20px);
        }
        .splash-tagline {
          font-size: 16px;
          color: #777;
          margin-bottom: 32px;
          animation: fadeInUp 0.4s ease forwards;
          animation-delay: 1.6s;
          opacity: 0;
          transform: translateY(10px);
        }
        .splash-dots {
          display: flex;
          gap: 10px;
          animation: fadeIn 0.3s ease forwards;
          animation-delay: 2.4s;
          opacity: 0;
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
        @media (max-width: 768px) {
          html {
            font-size: 16px;
          }
          body {
            font-size: 16px;
          }
          .split-layout {
            flex-direction: column;
          }
          .split-left {
            display: none;
          }
          .split-right {
            width: 100%;
            padding: 40px 24px;
          }
          .auth-container {
            max-width: 100%;
            padding: 32px 24px;
          }
          .auth-title {
            font-size: 32px;
          }
          .sidebar {
            display: none;
          }
          .main-panel {
            margin-left: 0;
            width: 100%;
            min-height: 100vh;
            padding: 20px 16px;
          }
          .topbar {
            left: 0;
          }
          .mobile-header {
            display: flex;
          }
          .mobile-bottom-nav {
            display: flex;
          }
          .topbar {
            display: none;
          }
          .app-shell {
            padding-top: 56px;
            padding-bottom: 60px;
          }
          .content-body {
            padding: 20px 16px 76px 16px;
          }
          .card, .upload-container .card {
            padding: 24px 20px;
          }
          .dropzone {
            min-height: 200px;
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
tsx_updated = tsx_updated.replace('<svg className="score-ring-svg" viewBox="0 0 200 200">', '<svg className="score-ring-svg" viewBox="0 0 190 190">')
tsx_updated = tsx_updated.replace('<circle cx="100" cy="100" r="88" className="score-ring-bg" />', '<circle cx="95" cy="95" r="83" className="score-ring-bg" />')
tsx_updated = tsx_updated.replace("style={{ strokeDasharray: '553', strokeDashoffset: `${553 * (1 - score / 100)}` }}", "style={{ strokeDasharray: '522', strokeDashoffset: `${522 * (1 - score / 100)}` }}")
tsx_updated = tsx_updated.replace('r="88" className="score-ring-fill"', 'r="83" className="score-ring-fill"')

with open(tsx_path, "w", encoding="utf-8") as f:
    f.write(tsx_updated)

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

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
    html_updated = html_updated.replace('<svg class="score-ring-svg" viewBox="0 0 200 200">', '<svg class="score-ring-svg" viewBox="0 0 190 190">')
    html_updated = html_updated.replace('<circle cx="100" cy="100" r="88" class="score-ring-bg" />', '<circle cx="95" cy="95" r="83" class="score-ring-bg" />')
    html_updated = html_updated.replace('<circle cx="100" cy="100" r="88" class="score-ring-fill" id="results-ring-element" />', '<circle cx="95" cy="95" r="83" class="score-ring-fill" id="results-ring-element" />')
    
    # Update JS strokeDashoffset multipliers in HTML
    html_updated = html_updated.replace("const offset = 553 * (1 - current.score / 100);", "const offset = 522 * (1 - current.score / 100);")
    
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_updated)

print("SaaS scale synchronization executed!")
