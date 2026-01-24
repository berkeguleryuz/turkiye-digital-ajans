import React, { useState } from "react";
import { generateBlogPost } from "../services/geminiService";
import { BlogPost, PALETTE } from "../types";
import { Loader2, Sparkles, Terminal, Cpu } from "lucide-react";

interface CreatePostProps {
  onPostCreated: (post: BlogPost) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const generatedData = await generateBlogPost(topic);

      const slug = generatedData.title
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: generatedData.title,
        slug,
        excerpt: generatedData.excerpt,
        content: generatedData.content,
        author: generatedData.author || "AI_ARCHITECT",
        date: new Date().toLocaleDateString(),
        tags: generatedData.tags || ["AI", "GENERATED"],
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };

      onPostCreated(newPost);
    } catch (err) {
      setError("FAILED TO CONNECT TO NEURAL NET. TRY AGAIN.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh] flex flex-col items-center justify-center">
      <div className="relative w-full max-w-3xl">
        <div className="absolute -top-4 -left-4 w-full h-full bg-black z-0"></div>

        <div className="relative bg-[#D9D9D9] border-4 border-black p-2 z-10">
          <div className="bg-[#000080] text-white p-2 mb-2 flex justify-between items-center font-mono font-bold">
            <div className="flex items-center gap-2">
              <Terminal size={16} />
              <span>AI_GENERATOR.EXE</span>
            </div>
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-[#D9D9D9] border-t border-l border-white border-b border-r border-black"></div>
              <div className="w-4 h-4 bg-[#D9D9D9] border-t border-l border-white border-b border-r border-black"></div>
              <div className="w-4 h-4 bg-red-600 border-t border-l border-red-400 border-b border-r border-red-800"></div>
            </div>
          </div>

          <div className="bg-white border-4 border-black p-8 md:p-12 flex flex-col gap-6">
            <div className="text-center mb-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-2">
                Fabricate
                <br />
                Reality
              </h2>
              <p className="font-mono text-sm bg-black text-white inline-block px-2">
                ENTER PARAMETERS FOR GENERATION
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold font-mono text-lg flex items-center gap-2">
                <Cpu size={20} /> INPUT_PROMPT:
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe the artifact you wish to manifest..."
                rows={3}
                className="w-full bg-black text-[#00FF00] p-4 font-mono text-lg border-4 border-gray-400 focus:outline-none focus:border-[#FF00FF] resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-600 text-white font-bold font-mono p-4 border-4 border-red-900">
                ERROR: {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !topic}
              className="relative group bg-[#CCFF00] text-black text-2xl font-black py-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              <span className="flex items-center justify-center gap-3">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles />
                )}
                {isLoading ? "COMPUTING..." : "EXECUTE"}
              </span>
            </button>

            <div className="border-t-2 border-dashed border-gray-400 pt-4 mt-2 flex justify-between text-xs font-mono text-gray-500">
              <span>MEM: 64KB OK</span>
              <span>MODEL: GEMINI-2.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
