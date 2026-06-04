import json

log_path = r"C:\Users\gowsi\.gemini\antigravity\brain\997d2139-07dc-44be-b49b-cd9c4499368d\.system_generated\logs\transcript.jsonl"

with open(log_path, "r", encoding="utf-8") as f:
    for line in f:
        try:
            step = json.loads(line)
            if step.get("step_index") == 806:
                print("Found Step 806!")
                print("Keys:", step.keys())
                print("Content length:", len(step.get("content", "")))
                print("Tool calls:", step.get("tool_calls"))
                print("Content snippet:", step.get("content", "")[:500])
        except Exception as e:
            pass
