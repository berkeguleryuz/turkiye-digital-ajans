"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Marquee } from "@/components/Marquee";
import { Hero } from "@/components/Hero";
import { BlogCard } from "@/components/BlogCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Philosophy } from "@/components/Philosophy";
import { TechStack } from "@/components/TechStack";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { BlogPost, ViewState } from "@/types";
import { api } from "@/services/api";

// Boot Sequence Component - Clean & Professional
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Phase 1: Show logo
    setTimeout(() => setPhase(1), 100);

    // Phase 2: Show text
    setTimeout(() => setPhase(2), 400);

    // Phase 3: Exit
    setTimeout(() => {
      setPhase(3);
      setTimeout(onComplete, 400);
    }, 1400);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-50">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(204, 255, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204, 255, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative h-full flex flex-col justify-center items-center p-6">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-500 ease-out ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-20 h-20 border-4 border-[#CCFF00] flex items-center justify-center bg-black">
            <span className="text-[#CCFF00] text-4xl font-black">TD</span>
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl md:text-6xl font-black tracking-tight text-white mb-3 transition-all duration-500 ease-out ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          TÜRKİYE <span className="text-[#CCFF00]">DİGİTAL</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-sm md:text-base text-gray-400 tracking-widest font-mono transition-all duration-500 delay-100 ${
            phase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          YARATICI TEKNOLOJİ AJANSI
        </p>

        {/* Loading bar */}
        <div
          className={`mt-12 w-48 transition-all duration-300 ${
            phase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-1 bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-[#CCFF00] transition-all duration-700 ease-out"
              style={{ width: phase >= 2 ? "100%" : "0%" }}
            />
          </div>
        </div>
      </div>

      {/* Exit animation - slide up */}
      <div
        className={`absolute inset-0 bg-white transition-all duration-500 ease-in-out ${
          phase >= 3 ? "translate-y-0" : "translate-y-full"
        }`}
      />
    </div>
  );
};

export default function HomePage() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        const postsArray = Array.isArray(data) ? data : [];
        const formattedPosts = postsArray.map((post: BlogPost) => ({
          ...post,
          date: new Date(post.date).toLocaleDateString("tr-TR"),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = (newPost: BlogPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost: BlogPost) => {
    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-[#CCFF00] selection:text-black flex flex-col">
      {view !== ViewState.ADMIN && <Marquee />}
      {view !== ViewState.ADMIN && (
        <Navbar currentView={view} setView={setView} />
      )}

      <div className="flex-grow">
        {view === ViewState.HOME && (
          <div className="animate-in fade-in duration-700">
            <Hero setView={setView} />

            <Philosophy />

            <main className="container mx-auto px-4 md:px-8 py-20 border-t-4 border-black bg-[#F9F9F9]">
              <div className="flex justify-between items-end mb-16 border-b-4 border-black pb-6">
                <div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                    Bizden Haberler
                  </h2>
                  <p className="font-mono mt-2 text-gray-600">/// BLOG</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <div key={post.id} className="h-full min-h-[450px]">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            </main>

            <TechStack />

            <Newsletter />
          </div>
        )}

        {view === ViewState.ADMIN && (
          <AdminPanel
            posts={posts}
            onPostCreated={handleCreatePost}
            onPostUpdated={handleUpdatePost}
            onPostDeleted={handleDeletePost}
            onLogout={() => setView(ViewState.HOME)}
          />
        )}
      </div>

      {view !== ViewState.ADMIN && <Footer setView={setView} />}
    </div>
  );
}
