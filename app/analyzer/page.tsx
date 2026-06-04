import ResumeAnalyzer from '@/app/components/ResumeAnalyzer';

export const metadata = {
  title: 'Resume Analyzer',
  description: 'Analyze and improve your resume',
};

export default function AnalyzerPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#1A1A1A]">
      <ResumeAnalyzer />
    </main>
  );
}
