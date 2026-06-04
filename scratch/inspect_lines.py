with open("app/components/ResumeAnalyzer.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
for idx in [2490, 2495, 2496, 2497, 2498, 2499, 2500, 2530, 2531, 2532, 2533, 2724, 2725, 2726, 2727, 2885, 2886, 2887, 2888, 2889, 2890]:
    if idx < len(lines):
        print(f"Line {idx+1}: {lines[idx].strip()}")
