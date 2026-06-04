"use client";

import { useEffect, useState } from "react";
import CircularProgress from "../components/CircularProgress";
import { Download, Repeat } from "lucide-react";

export default function ResultPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("analysisResult");
    if (storedData) setData(JSON.parse(storedData));
  }, []);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold">Loading Result...</div>
        </div>
      </div>
    );

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'resume-analysis.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container-max mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Resume Analysis</h1>
            <p className="soft-muted">Detailed ATS & recruiter-style feedback</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => { localStorage.removeItem('analysisResult'); location.reload(); }} className="px-4 py-2 rounded-xl hover:bg-white/5 transition"> <Repeat size={16} /> Analyze Another</button>
            <button onClick={downloadReport} className="btn-glow px-4 py-2 rounded-xl flex items-center gap-2"><Download size={16} /> Download Report</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-2xl flex items-center justify-center">
            <CircularProgress value={Number(data.score) || 82} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">Strengths</h3>
              <ul className="list-disc ml-5 soft-muted">
                <li>Clear technical skills section</li>
                <li>Strong ATS-friendly keywords</li>
                <li>Well structured experience bullets</li>
              </ul>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(data.missingSkills || ['Leadership','AWS','Docker']).map((s, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/6">{s}</span>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-2">Recommended Improvements</h3>
              <p className="soft-muted">{data.suggestion || 'Add more measurable results and keywords relevant to the job description.'}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="glass p-4 rounded-2xl">Keyword Optimization chart (placeholder)</div>
          <div className="glass p-4 rounded-2xl">Recruiter feedback card</div>
          <div className="glass p-4 rounded-2xl">Export options and tips</div>
        </div>
      </div>
    </div>
  );
}