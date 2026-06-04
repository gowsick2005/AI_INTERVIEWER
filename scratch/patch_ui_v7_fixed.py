# patch_ui_v7_fixed.py  -- ASCII-safe, no Unicode in print statements
import sys
import os

tsx_path = r"c:\Users\gowsi\ai-resume-analyzer\app\components\ResumeAnalyzer.tsx"

with open(tsx_path, "r", encoding="utf-8") as f:
    src = f.read().replace("\r\n", "\n")

hits = []
misses = []

def rep(label, old, new):
    global src
    if old in src:
        src = src.replace(old, new)
        hits.append(label)
    else:
        misses.append(label)

# ── 1. Root wrapper ──────────────────────────────────────────────────────────
rep(
    "root-wrapper",
    "style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}",
    "style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden', userSelect: 'none', WebkitUserSelect: 'none' }}"
)

# ── 2. html / body rule ──────────────────────────────────────────────────────
rep(
    "html-rule",
    "html { font-size: 16px; scroll-behavior: smooth; }",
    "html, body { font-size: 16px; margin: 0; padding: 0; overflow: hidden; }"
)

rep(
    "body-rule",
    "body { min-height: 100vh; overflow-x: hidden; background: #0a0a0a; color: #F5F5F5; font-family: 'Poppins', 'Inter', sans-serif; font-size: 16px; line-height: 1.7; user-select: none; -webkit-user-select: none; }",
    "body { height: 100vh; overflow: hidden; background: #0a0a0a; color: #F5F5F5; font-family: 'Inter', sans-serif; font-size: 16px; line-height: 1.6; user-select: none; -webkit-user-select: none; }"
)

# ── 3. splash-view: dead-center fixed overlay ────────────────────────────────
rep(
    "splash-view-css",
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
          transition: opacity 0.6s ease, transform 0.6s ease;
        }"""
)

# ── 4. split-layout: fixed fullscreen auth container ────────────────────────
rep(
    "split-layout-css",
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
)

# ── 5. auth-container: bigger card ──────────────────────────────────────────
rep(
    "auth-container-css",
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
          padding: 52px 52px;
          background: #111111;
          border: 1.5px solid #2a2a2a;
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
        }"""
)

# ── 6. form-control: 52px tall ──────────────────────────────────────────────
rep(
    "form-control-height",
    "          height: 56px;\n          background: #0d0d0d;\n          border: 1.5px solid #222;\n          border-radius: 10px;\n          padding: 0 18px 0 48px;\n          color: #F5F5F5;\n          font-size: 16px;\n          outline: none;\n          transition: border-color 0.25s, box-shadow 0.25s;",
    "          height: 52px;\n          background: #0e0e0e;\n          border: 1.5px solid #2a2a2a;\n          border-radius: 10px;\n          padding: 0 18px 0 48px;\n          color: #F5F5F5;\n          font-size: 16px;\n          font-family: 'Inter', sans-serif;\n          outline: none;\n          transition: border-color 0.25s, box-shadow 0.25s;"
)

# ── 7. form-group label ──────────────────────────────────────────────────────
rep(
    "form-group-label",
    "          font-size: 15px;\n          font-weight: 500;\n          color: #AAAAAA;\n          margin-bottom: 8px;",
    "          font-size: 14px;\n          font-weight: 600;\n          color: #BBBBBB;\n          margin-bottom: 8px;\n          letter-spacing: 0.01em;"
)

# ── 8. app-shell: locked fixed container ────────────────────────────────────
rep(
    "app-shell-css",
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
)

# ── 9. sidebar: 240px ───────────────────────────────────────────────────────
rep(
    "sidebar-width",
    """          width: 220px;
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
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);""",
    """          width: 240px;
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
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);"""
)

# ── 10. main-panel: absolute inside fixed app-shell, scrollable ─────────────
rep(
    "main-panel-css",
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
          display: flex;
          flex-direction: column;
          transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }"""
)

# ── 11. topbar: sticky inside scrollable panel ──────────────────────────────
rep(
    "topbar-css",
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
)

# ── 12. content-body: max-width grid ────────────────────────────────────────
rep(
    "content-body-css",
    "        .content-body {\n          padding: 88px 40px 32px 40px;\n        }",
    "        .content-body {\n          padding: 40px 48px 48px;\n          max-width: 1280px;\n          width: 100%;\n          flex: 1;\n        }"
)

# ── 13. page-title ───────────────────────────────────────────────────────────
rep(
    "page-title-css",
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
)

# ── 14. card ─────────────────────────────────────────────────────────────────
rep(
    "card-css",
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
)

rep(
    "upload-card-css",
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
)

# ── 15. primary-btn ──────────────────────────────────────────────────────────
rep(
    "primary-btn-css",
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
)

# ── 16. upload primary-btn ───────────────────────────────────────────────────
rep(
    "upload-primary-btn-css",
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
)

# ── 17. auth primary-btn ─────────────────────────────────────────────────────
rep(
    "auth-primary-btn-css",
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
)

# ── 18. tablet media query: sidebar 80px -> absolute main-panel left 80px ───
rep(
    "tablet-main-panel",
    "            margin-left: 80px !important;\n            width: calc(100% - 80px) !important;\n            padding: 32px 36px;",
    "            left: 80px !important;"
)
rep(
    "tablet-topbar",
    "            left: 80px !important;\n            padding: 0 24px;",
    "            padding: 0 24px;"
)

# ── 19. mobile media query: full width ──────────────────────────────────────
rep(
    "mobile-main-panel",
    "            margin-left: 0;\n            width: 100%;\n            min-height: 100vh;\n            padding: 24px 16px;",
    "            left: 0 !important;\n            padding: 24px 16px;"
)

# ── 20. 1440px breakpoint ────────────────────────────────────────────────────
rep(
    "large-padding",
    "            padding: 48px 64px;\n          }\n          .card, .upload-container .card {\n            padding: 40px 48px;",
    "            padding: 48px 64px 64px;\n            max-width: 1440px;\n          }\n          .card, .upload-container .card {\n            padding: 36px 44px;"
)

# ── 21. splash-view inline style (JSX) ──────────────────────────────────────
rep(
    "splash-jsx-style",
    "<div id=\"splash-view\" style={{ opacity: isSplashFading ? 0 : 1, transform: isSplashFading ? 'scale(1.04)' : 'none', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>",
    "<div id=\"splash-view\" style={{ opacity: isSplashFading ? 0 : 1, transform: isSplashFading ? 'scale(1.04)' : 'scale(1)', pointerEvents: isSplashFading ? 'none' : 'all', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>"
)

with open(tsx_path, "w", encoding="utf-8") as f:
    f.write(src)

print("HITS  :", len(hits))
print("MISSES:", len(misses))
for m in misses:
    print("  MISS ->", m)
print("Done!")
