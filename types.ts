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
  "bg-[#FF6B6B]",
  "bg-[#4ECDC4]",
  "bg-[#FFE66D]",
  "bg-[#FF9F1C]",
  "bg-[#C7F464]",
  "bg-[#D93FD9]",
];
