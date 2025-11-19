export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  postId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  color: string;
  imageUrl?: string;
  categoryId?: string;
  category?: Category;
  comments?: Comment[];
}

export interface Proposal {
  id: string;
  name: string;
  company?: string;
  email: string;
  projectType: string;
  budget: string;
  status: string;
  createdAt: string;
}

export enum ViewState {
  HOME = "HOME",
  POST = "POST",
  ADMIN = "ADMIN",
  JOIN = "JOIN",
}

export const PALETTE = [
  "bg-[#CCFF00]",
  "bg-[#FF00FF]",
  "bg-[#00FFFF]",
  "bg-[#FF6B6B]",
];
