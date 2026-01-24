"use client";

import React, { useState, useEffect } from "react";
import { AdminPanel } from "@/components/AdminPanel";
import { BlogPost } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ViewState } from "@/types";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui/Dialog";
import { login } from "../actions";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        // Array olduğundan emin ol
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
        setPosts([]);
      }
    };

    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await login(password);
    if (isValid) {
      setIsAuthenticated(true);
    } else {
      setDialog({
        isOpen: true,
        title: "ERİŞİM REDDEDİLDİ",
        message: "Hatalı şifre girişi tespit edildi.",
        type: "error",
      });
    }
  };

  const handlePostCreated = (newPost: BlogPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost: BlogPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handlePostDeleted = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSetView = (view: ViewState) => {
    if (view === ViewState.HOME) router.push("/");
    if (view === ViewState.JOIN) router.push("/partner");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center font-mono relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-6 p-12 border-4 border-black bg-white shadow-[8px_8px_0px_0px_#000] relative z-10 max-w-md w-full"
        >
          <div className="bg-black text-white inline-block px-4 py-1 font-bold text-sm self-start mb-2">
            TÜRKİYE DİGİTAL
          </div>
          <h1 className="text-4xl font-black uppercase leading-none mb-4">
            Yönetim
            <br />
            Paneli
          </h1>

          <div className="space-y-2">
            <label className="font-bold text-sm">ERİŞİM ŞİFRESİ</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className="w-full bg-[#f0f0f0] border-4 border-black p-4 text-center text-xl font-bold focus:outline-none focus:bg-[#CCFF00] transition-colors placeholder:text-gray-400"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white p-4 font-black text-xl hover:bg-[#CCFF00] hover:text-black border-4 border-transparent hover:border-black transition-all uppercase"
          >
            Giriş Yap
          </button>

          <div className="text-xs text-gray-500 text-center mt-4">
            /// HEY! ///
          </div>
        </form>

        <Dialog
          isOpen={dialog.isOpen}
          onClose={() => setDialog({ ...dialog, isOpen: false })}
          title={dialog.title}
          message={dialog.message}
          type={dialog.type}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <AdminPanel
        posts={posts}
        onPostCreated={handlePostCreated}
        onPostUpdated={handlePostUpdated}
        onPostDeleted={handlePostDeleted}
        onLogout={handleLogout}
      />
    </div>
  );
}
