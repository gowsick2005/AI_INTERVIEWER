"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  UploadCloud,
  Loader2,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadCard() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const [acceptedFile, setAcceptedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      setAcceptedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  const handleUpload = async () => {
    if (!acceptedFile) {
      alert("Please upload a resume first.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("resume", acceptedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let result: any = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch (err) {
        result = { raw: text };
      }

      if (!response.ok) {
        console.error("N8N upload failed", result);
        alert(
          `Upload failed: ${result.error || 'Unexpected error'}${result.status ? ' (' + result.status + ' ' + result.statusText + ')' : ''}${result.details ? ' - ' + JSON.stringify(result.details) : ''}${result.raw ? ' - ' + result.raw : ''}`
        );
        return;
      }

      const data = result.data?.data || result.data || {
        score: "90",
        skills: "React, Firebase, Next.js",
        suggestion: "Add more ATS keywords",
      };

      localStorage.setItem("analysisResult", JSON.stringify(data));
      router.push("/analyzer");
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert("Something went wrong while uploading the resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      <div className="upload-zone group relative flex flex-col items-center justify-center pb-24">
        {/* Upload Icon - Centered */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="upload-icon group-hover:shadow-lg transition-all mb-8"
        >
          <UploadCloud size={48} className="text-[#FACC15]" strokeWidth={1.5} />
        </motion.div>

        {/* Dropzone Input */}
        <div
          {...getRootProps()}
          className={`w-full h-full transition-all cursor-pointer ${
            isDragActive ? "scale-95 opacity-75" : ""
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center justify-center gap-4 text-center px-6">
            <h3 className="text-2xl font-bold font-jakarta text-white">
              {fileName ? "Resume Uploaded ✓" : "Upload Your Resume"}
            </h3>
            <p className="text-white/60 font-inter text-base break-all max-w-xs mx-auto">
              {fileName ? fileName : "Drag and drop your PDF, or click to select"}
            </p>
          </div>
        </div>

        {/* Analysis Button - Positioned at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm"
        >
          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn-cta flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Start Analysis
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}