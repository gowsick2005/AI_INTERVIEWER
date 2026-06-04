with open("app/components/ResumeAnalyzer.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

part1 = lines[:2532]
part2 = lines[2727:]

new_content = "".join(part1 + part2)

with open("app/components/ResumeAnalyzer.tsx", "w", encoding="utf-8") as f:
    f.write(new_content)

print("TSX file successfully reconstructed!")
