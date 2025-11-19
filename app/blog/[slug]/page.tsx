"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Share2,
  Check,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { BlogPost } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ViewState } from "@/types";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<ViewState>(ViewState.HOME);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/posts");
        const posts: BlogPost[] = await res.json();
        const foundPost = posts.find((p) => p.slug === params.slug);

        if (foundPost) {
          foundPost.date = new Date(foundPost.date).toLocaleDateString("tr-TR");
          setPost(foundPost);
        } else {
          router.push("/404");
        }
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug, router]);

  const handleShare = async (platform: "twitter" | "linkedin" | "copy") => {
    const url = window.location.href;
    const text = post
      ? `Check out "${post.title}" on Türkiye Digital`
      : "Check this out!";

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
        break;
    }
  };

  const handleSetView = (newView: ViewState) => {
    if (newView === ViewState.HOME) {
      router.push("/");
    } else if (newView === ViewState.JOIN) {
      router.push("/partner");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-white flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen font-sans selection:bg-[#CCFF00] selection:text-black flex flex-col">
      <Navbar currentView={ViewState.HOME} setView={handleSetView} />

      <div className="flex-grow relative bg-white/50">
        <div
          className={`absolute top-0 left-0 w-full h-96 ${post.color} border-b-4 border-black`}
        ></div>

        <div className="relative max-w-5xl mx-auto p-4 md:p-8 pt-32">
          <button
            onClick={() => router.push("/")}
            className="absolute top-8 left-4 md:left-0 bg-white border-4 border-black px-6 py-3 font-black flex items-center gap-2 shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all z-20"
          >
            <ArrowLeft size={24} /> ANASAYFAYA DÖN
          </button>

          <article className="bg-white border-4 border-black neo-brutal-shadow-lg relative animate-in slide-in-from-bottom-10 duration-500">
            <div className="h-12 bg-black flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white"></div>
              </div>
            </div>

            <div className="p-6 md:p-12 md:pb-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-8 mb-8 gap-4">
                <div className="w-full">
                  <div className="flex flex-wrap gap-3 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 font-mono font-bold text-sm border-2 border-black bg-gray-100 shadow-[2px_2px_0px_0px_#000]`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black leading-[0.95] uppercase text-black mb-4">
                    {post.title}
                  </h1>
                </div>
                <div className="min-w-max text-right font-mono text-sm font-bold bg-[#FDFD96] border-2 border-black p-3 shadow-[4px_4px_0px_0px_#000]">
                  <p>YAZAR: {post.author}</p>
                  <p>TARİH: {post.date}</p>
                </div>
              </div>

              <div className="prose prose-xl md:prose-2xl max-w-none font-sans text-black leading-relaxed">
                <p className="font-bold text-xl md:text-2xl mb-8 font-mono border-l-8 border-[#FF00FF] pl-6 py-2 bg-gray-50">
                  {post.excerpt}
                </p>
                <div className="whitespace-pre-line font-medium">
                  {post.content}
                </div>
              </div>
            </div>

            <div className="border-t-4 border-black p-4 md:p-8 bg-[#f0f0f0] flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                <span className="font-black text-xl whitespace-nowrap">
                  PAYLAŞIM_PROTOKOLÜ:
                </span>

                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex-1 md:flex-none bg-black text-white p-4 border-2 border-transparent hover:bg-[#1DA1F2] hover:text-white hover:border-black transition-all flex items-center justify-center gap-2 font-bold"
                  >
                    <BsTwitterX size={20} />{" "}
                    <span className="md:hidden">X</span>
                  </button>

                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex-1 md:flex-none bg-black text-white p-4 border-2 border-transparent hover:bg-[#0077B5] hover:text-white hover:border-black transition-all flex items-center justify-center gap-2 font-bold"
                  >
                    <BsLinkedin size={20} />{" "}
                    <span className="md:hidden">LINKEDIN</span>
                  </button>

                  <button
                    onClick={() => handleShare("copy")}
                    className="flex-1 md:flex-none bg-black text-white p-4 border-2 border-transparent hover:bg-[#CCFF00] hover:text-black hover:border-black transition-all flex items-center justify-center gap-2 font-bold min-w-[140px]"
                  >
                    {copied ? <Check size={20} /> : <LinkIcon size={20} />}
                    <span>{copied ? "KOPYALANDI" : "LİNKİ KOPYALA"}</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <Footer setView={handleSetView} />
    </div>
  );
}
