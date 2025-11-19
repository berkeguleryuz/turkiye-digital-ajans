import React, { useState, useEffect } from "react";
import { BlogPost, Category, PALETTE } from "../types";
import { generateBlogPost } from "../services/geminiService";
import { api } from "../services/api";
import {
  LayoutDashboard,
  PenTool,
  LogOut,
  ArrowRight,
  Terminal,
  Sparkles,
  Edit3,
  FolderPlus,
  Tag,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Dialog } from "./ui/Dialog";

interface AdminPanelProps {
  posts: BlogPost[];
  onPostCreated: (post: BlogPost) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  posts,
  onPostCreated,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<
    "DASHBOARD" | "CREATE" | "CATEGORIES"
  >("DASHBOARD");

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

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

  const [createMode, setCreateMode] = useState<"AI" | "MANUAL">("AI");

  const [topic, setTopic] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const [manualData, setManualData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Admin",
    tags: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setGenError(null);
    try {
      const generatedData = await generateBlogPost(topic);
      const newPostData = {
        title: generatedData.title,
        excerpt: generatedData.excerpt,
        content: generatedData.content,
        author: generatedData.author || "SYS_ADMIN",
        tags: generatedData.tags || ["SİSTEM", "OTO"],
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        imageUrl: customImage || undefined,
        categoryId: selectedCategoryId || undefined,
      };

      const createdPost = await api.createPost(newPostData);
      onPostCreated(createdPost);
      setActiveTab("DASHBOARD");
      setTopic("");
      setCustomImage("");
      setSelectedCategoryId("");
    } catch (err) {
      setGenError("NÖRAL_BAĞLANTI_HATASI");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleManualSubmit = async () => {
    if (!manualData.title || !manualData.content) return;

    const slug = manualData.title
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const newPostData = {
      title: manualData.title,
      slug,
      excerpt:
        manualData.excerpt || manualData.content.substring(0, 100) + "...",
      content: manualData.content,
      author: manualData.author,
      tags: manualData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      imageUrl: manualData.imageUrl || undefined,
      categoryId: selectedCategoryId || undefined,
    };

    try {
      const createdPost = await api.createPost(newPostData);
      onPostCreated(createdPost);
      setActiveTab("DASHBOARD");
      setManualData({
        title: "",
        excerpt: "",
        content: "",
        author: "Admin",
        tags: "",
        imageUrl: "",
      });
      setSelectedCategoryId("");
      setDialog({
        isOpen: true,
        title: "BAŞARILI",
        message: "İçerik başarıyla yayınlandı.",
        type: "success",
      });
    } catch (error: any) {
      console.error("Failed to create post", error);
      setDialog({
        isOpen: true,
        title: "HATA",
        message: error.message || "İçerik oluşturulamadı.",
        type: "error",
      });
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const slug = newCategoryName
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      const newCategory = await api.createCategory({
        name: newCategoryName,
        slug,
      });
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setDialog({
        isOpen: true,
        title: "BAŞARILI",
        message: "Kategori başarıyla oluşturuldu.",
        type: "success",
      });
    } catch (error: any) {
      console.error("Failed to create category", error);
      const errorMessage =
        error.message || "Kategori oluşturulamadı. Bilinmeyen bir hata oluştu.";
      setDialog({
        isOpen: true,
        title: "HATA",
        message: errorMessage,
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-sans selection:bg-[#CCFF00] selection:text-black flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r-4 border-black flex flex-col">
        <div className="p-6 border-b-4 border-black bg-black text-white">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono font-bold"
          >
            <Terminal size={20} />
            <span>Ana Sayfa</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("DASHBOARD")}
            className={`w-full flex items-center gap-3 p-4 font-bold border-2 transition-all ${
              activeTab === "DASHBOARD"
                ? "bg-[#CCFF00] border-black shadow-[4px_4px_0px_0px_#000]"
                : "bg-white border-transparent hover:border-black hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard size={20} />
            <span>PANEL</span>
          </button>

          <button
            onClick={() => setActiveTab("CREATE")}
            className={`w-full flex items-center gap-3 p-4 font-bold border-2 transition-all ${
              activeTab === "CREATE"
                ? "bg-[#FF00FF] text-white border-black shadow-[4px_4px_0px_0px_#000]"
                : "bg-white border-transparent hover:border-black hover:bg-gray-50"
            }`}
          >
            <PenTool size={20} />
            <span>ÜRETİM</span>
          </button>

          <button
            onClick={() => setActiveTab("CATEGORIES")}
            className={`w-full flex items-center gap-3 p-4 font-bold border-2 transition-all ${
              activeTab === "CATEGORIES"
                ? "bg-[#00FFFF] border-black shadow-[4px_4px_0px_0px_#000]"
                : "bg-white border-transparent hover:border-black hover:bg-gray-50"
            }`}
          >
            <Tag size={20} />
            <span>KATEGORİLER</span>
          </button>
        </nav>

        <div className="p-4 border-t-4 border-black">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 p-3 font-bold bg-black text-white hover:bg-red-600 transition-colors"
          >
            <LogOut size={16} /> ÇIKIŞ
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === "DASHBOARD" && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b-4 border-black pb-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-black uppercase leading-none mb-2">
                  Komuta Merkezi
                </h1>
                <p className="font-mono text-gray-600">
                  /// YÖNETİCİ_MODU_AKTİF
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                <h3 className="font-mono text-sm text-gray-500 mb-2">
                  TOPLAM İÇERİK
                </h3>
                <p className="text-5xl font-black">{posts.length}</p>
              </div>
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                <h3 className="font-mono text-sm text-gray-500 mb-2">
                  KATEGORİLER
                </h3>
                <p className="text-5xl font-black">{categories.length}</p>
              </div>
              <div className="bg-[#CCFF00] border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                <h3 className="font-mono text-sm text-black mb-2">
                  SİSTEM DURUMU
                </h3>
                <p className="text-3xl font-black">OPERASYONEL</p>
              </div>
            </div>

            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000]">
              <div className="p-6 border-b-4 border-black bg-black text-white flex justify-between items-center">
                <h3 className="font-bold text-xl uppercase">İçerik Listesi</h3>
                <span className="font-mono text-sm">{posts.length} KAYIT</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100 border-b-4 border-black font-mono text-sm uppercase">
                    <tr>
                      <th className="p-4 border-r-2 border-black">ID</th>
                      <th className="p-4 border-r-2 border-black">Başlık</th>
                      <th className="p-4 border-r-2 border-black">Yazar</th>
                      <th className="p-4 border-r-2 border-black">Tarih</th>
                      <th className="p-4">Eylem</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium">
                    {posts.map((post) => (
                      <tr
                        key={post.id}
                        className="border-b-2 border-black hover:bg-[#f0f0f0]"
                      >
                        <td className="p-4 border-r-2 border-black font-mono text-xs">
                          #{post.id.substring(0, 6)}
                        </td>
                        <td className="p-4 border-r-2 border-black">
                          {post.title}
                        </td>
                        <td className="p-4 border-r-2 border-black">
                          {post.author}
                        </td>
                        <td className="p-4 border-r-2 border-black text-sm">
                          {new Date(post.date).toLocaleDateString("tr-TR")}
                        </td>
                        <td className="p-4">
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-sm font-bold hover:text-[#FF00FF]"
                          >
                            GÖRÜNTÜLE <ExternalLink size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "CREATE" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b-4 border-black pb-6">
              <h2 className="text-4xl font-black uppercase mb-2">
                İçerik Üretimi
              </h2>
              <p className="font-mono text-gray-600">/// YENİ_VERİ_GİRİŞİ</p>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setCreateMode("AI")}
                className={`flex-1 p-4 font-bold border-4 border-black transition-all ${
                  createMode === "AI"
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_#CCFF00]"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles size={20} /> AI SENTEZLEYİCİ
                </div>
              </button>
              <button
                onClick={() => setCreateMode("MANUAL")}
                className={`flex-1 p-4 font-bold border-4 border-black transition-all ${
                  createMode === "MANUAL"
                    ? "bg-black text-white shadow-[4px_4px_0px_0px_#FF00FF]"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Edit3 size={20} /> MANUEL EDİTÖR
                </div>
              </button>
            </div>

            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000]">
              {createMode === "AI" ? (
                <div className="space-y-6">
                  <div>
                    <label className="block font-bold mb-2">
                      KONU / BAŞLIK
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-[#f0f0f0] border-2 border-black p-4 font-bold focus:outline-none focus:bg-[#CCFF00] transition-colors"
                      placeholder="Örn: Web 3.0 ve Gelecek"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">
                      KATEGORİ (OPSİYONEL)
                    </label>
                    <select
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      className="w-full bg-[#f0f0f0] border-2 border-black p-4 font-bold focus:outline-none focus:bg-[#CCFF00] transition-colors"
                    >
                      <option value="">KATEGORİ SEÇİN</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-black text-white p-4 font-black text-xl hover:bg-[#CCFF00] hover:text-black border-4 border-transparent hover:border-black transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? "İŞLENİYOR..." : "ÜRETİMİ BAŞLAT"}
                  </button>

                  {genError && (
                    <div className="bg-red-100 border-2 border-red-500 text-red-600 p-4 font-bold">
                      HATA: {genError}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-bold mb-2">BAŞLIK</label>
                      <input
                        type="text"
                        value={manualData.title}
                        onChange={(e) =>
                          setManualData({
                            ...manualData,
                            title: e.target.value,
                          })
                        }
                        className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#FF00FF] focus:text-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-2">YAZAR</label>
                      <input
                        type="text"
                        value={manualData.author}
                        onChange={(e) =>
                          setManualData({
                            ...manualData,
                            author: e.target.value,
                          })
                        }
                        className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#FF00FF] focus:text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-2">KATEGORİ</label>
                    <select
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#FF00FF] focus:text-white transition-colors"
                    >
                      <option value="">KATEGORİ SEÇİN</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-2">İÇERİK</label>
                    <textarea
                      value={manualData.content}
                      onChange={(e) =>
                        setManualData({
                          ...manualData,
                          content: e.target.value,
                        })
                      }
                      className="w-full h-64 bg-[#f0f0f0] border-2 border-black p-4 font-mono focus:outline-none focus:bg-[#FF00FF] focus:text-white transition-colors"
                      placeholder="Markdown desteklenir..."
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-2">
                      ETİKETLER (Virgülle ayırın)
                    </label>
                    <input
                      type="text"
                      value={manualData.tags}
                      onChange={(e) =>
                        setManualData({ ...manualData, tags: e.target.value })
                      }
                      className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#FF00FF] focus:text-white transition-colors"
                      placeholder="TEKNOLOJİ, TASARIM, GELECEK"
                    />
                  </div>

                  <button
                    onClick={handleManualSubmit}
                    className="w-full bg-black text-white p-4 font-black text-xl hover:bg-[#FF00FF] hover:text-white border-4 border-transparent hover:border-black transition-all uppercase"
                  >
                    YAYINLA
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "CATEGORIES" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b-4 border-black pb-6">
              <h2 className="text-4xl font-black uppercase mb-2">
                Kategori Yönetimi
              </h2>
              <p className="font-mono text-gray-600">/// SİSTEM_ETİKETLERİ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                <h3 className="font-black text-xl uppercase mb-6 flex items-center gap-2">
                  <FolderPlus size={24} /> Yeni Kategori
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold mb-2">KATEGORİ ADI</label>
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full bg-[#f0f0f0] border-2 border-black p-3 font-bold focus:outline-none focus:bg-[#00FFFF] transition-colors"
                      placeholder="Örn: Yapay Zeka"
                    />
                  </div>
                  <button
                    onClick={handleCreateCategory}
                    className="w-full bg-black text-white p-3 font-black uppercase hover:bg-[#00FFFF] hover:text-black border-4 border-transparent hover:border-black transition-all"
                  >
                    OLUŞTUR
                  </button>
                </div>
              </div>

              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                <h3 className="font-black text-xl uppercase mb-6 flex items-center gap-2">
                  <Tag size={24} /> Mevcut Kategoriler
                </h3>
                <div className="max-h-[400px] overflow-y-auto space-y-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="p-3 border-2 border-black bg-[#f0f0f0] flex justify-between items-center group hover:bg-[#00FFFF] transition-colors"
                    >
                      <span className="font-bold">{cat.name}</span>
                      <span className="font-mono text-xs bg-black text-white px-2 py-1">
                        /{cat.slug}
                      </span>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <div className="text-center py-8 text-gray-500 font-mono">
                      HENÜZ KATEGORİ YOK
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Dialog
        isOpen={dialog.isOpen}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
      />
    </div>
  );
};
