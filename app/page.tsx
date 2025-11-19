"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Marquee } from "@/components/Marquee";
import { Hero } from "@/components/Hero";
import { BlogCard } from "@/components/BlogCard";
import { AdminPanel } from "@/components/AdminPanel";
import { Philosophy } from "@/components/Philosophy";
import { TechStack } from "@/components/TechStack";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { JoinNetwork } from "@/components/JoinNetwork";
import { BlogPost, ViewState } from "@/types";
import { Terminal } from "lucide-react";

const api = {
  getPosts: async () => {
    const res = await fetch("/api/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  },

  createPost: async (postData: any) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
  },

  getCategories: async () => {
    const res = await fetch("/api/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  createCategory: async (categoryData: { name: string; slug: string }) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryData),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },

  getComments: async (postId: string) => {
    const res = await fetch(`/api/comments/${postId}`);
    if (!res.ok) throw new Error("Failed to fetch comments");
    return res.json();
  },

  createComment: async (
    postId: string,
    commentData: { content: string; author: string }
  ) => {
    const res = await fetch(`/api/comments/${postId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) throw new Error("Failed to create comment");
    return res.json();
  },
};

export default function HomePage() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  // Boot Sequence Animation
  useEffect(() => {
    const logs = [
      "ÇEKİRDEK BAŞLATILIYOR...",
      "VARLIKLAR YÜKLENİYOR...",
      "GÜVENLİ BAĞLANTI SAĞLANIYOR...",
      "SİSTEM HAZIR.",
    ];

    let delay = 0;
    logs.forEach((log, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setBootLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => setIsBooting(false), 500);
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        const formattedPosts = data.map((post: any) => ({
          ...post,
          date: new Date(post.date).toLocaleDateString("tr-TR"),
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async (newPost: BlogPost) => {
    try {
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error("Error updating posts:", error);
    }
  };

  if (isBooting) {
    return (
      <div className="h-screen w-full bg-black text-[#CCFF00] font-mono p-8 flex flex-col justify-end">
        <div className="mb-8">
          <Terminal size={48} className="mb-4" />
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            TÜRKİYE_DİJİTAL
          </h1>
        </div>
        <div className="space-y-2">
          {bootLogs.map((log, i) => (
            <div
              key={i}
              className="border-l-2 border-[#CCFF00] pl-2 animate-in slide-in-from-left-2 duration-200"
            >
              {`> ${log}`}
            </div>
          ))}
          <div className="w-4 h-6 bg-[#CCFF00] animate-pulse inline-block"></div>
        </div>
      </div>
    );
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
                <div className="hidden md:block">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {posts.map((post, index) => (
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
            onLogout={() => setView(ViewState.HOME)}
          />
        )}
      </div>

      {view !== ViewState.ADMIN && <Footer setView={setView} />}
    </div>
  );
}
