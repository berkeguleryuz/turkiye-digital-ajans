import React from "react";
import { BlogPost } from "../types";
import { ArrowUpRight, Disc, Maximize2 } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
  rotate?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  rotate = "rotate-0",
}) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`
        block group relative w-full h-full cursor-pointer transition-transform duration-300 hover:-translate-y-2
        ${rotate}
      `}
    >
      <div className="absolute top-4 left-4 w-full h-full bg-black rounded-none z-0 transition-all duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>

      <div
        className={`absolute top-2 left-2 w-full h-full ${post.color} border-4 border-black z-10`}
      ></div>

      <div className="relative w-full h-full bg-white border-4 border-black z-20 flex flex-col justify-between transition-transform duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1">
        <div className="bg-black text-white p-2 flex justify-between items-center border-b-4 border-black">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-white"></div>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-black text-white text-xs font-black px-2 py-1 uppercase border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h3 className="text-3xl md:text-4xl font-black leading-[0.9] mb-4 uppercase break-words group-hover:text-[#737ef9] transition-colors">
            {post.title}
          </h3>

          <div className="relative mb-6">
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-black"></div>
            <p className="font-mono text-sm md:text-base leading-tight pl-4 text-gray-900 line-clamp-4">
              {post.excerpt}
            </p>
          </div>
        </div>

        <div className="p-4 border-t-4 border-black bg-gray-50 flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2">
            <Disc
              className={`w-5 h-5 ${post.color.replace(
                "bg-",
                "text-"
              )} animate-spin-slow`}
            />
            <span className="font-bold text-sm uppercase">{post.author}</span>
          </div>
          <div className="bg-black text-white p-2 group-hover:bg-[#FF00FF] transition-colors">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
};
