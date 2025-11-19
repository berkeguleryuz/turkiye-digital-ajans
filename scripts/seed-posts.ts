const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding posts...");

  let category = await prisma.category.findUnique({
    where: { slug: "vaka-analizleri" },
  });

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: "Vaka Analizleri",
        slug: "vaka-analizleri",
      },
    });
  }

  const posts = [
    {
      title: "E-TİCARETTE YAPAY ZEKA DEVRİMİ",
      slug: "e-ticarette-yapay-zeka-devrimi",
      excerpt:
        "Geleneksel satış hunileri öldü. Yapay zeka destekli kişiselleştirme ile dönüşüm oranlarını %300 artırmanın yolları.",
      content:
        "E-ticaret dünyası hızla değişiyor. Artık sadece ürün listelemek yetmiyor. Kullanıcı davranışlarını analiz eden, onlara özel teklifler sunan ve satın alma yolculuğunu optimize eden yapay zeka sistemleri, rekabetin yeni belirleyicisi. Bu yazıda, Türkiye Digital olarak geliştirdiğimiz AI algoritmalarının müşterilerimize nasıl değer kattığını inceliyoruz.",
      author: "Sistem",
      tags: ["AI", "E-Ticaret", "Strateji"],
      color: "bg-[#CCFF00]",
      categoryId: category.id,
    },
    {
      title: "NEOBRÜTALİZM VE UI TASARIMI",
      slug: "neobrutalizm-ve-ui-tasarimi",
      excerpt:
        "Minimalizmden sıkılanlar için: Ham, cesur ve dikkat çekici. Neobrütaizm akımının modern web tasarımındaki yeri.",
      content:
        "Web tasarımı uzun süredir 'temiz' ve 'kurumsal' estetiğin hakimiyetindeydi. Ancak kullanıcılar artık farklı bir şeyler arıyor. Neobrütaizm, yüksek kontrastlı renkleri, kalın çizgileri ve alışılmadık tipografisiyle markaların sesini yükseltiyor. Tasarım ekibimizin bu akımı projelerimize nasıl entegre ettiğini keşfedin.",
      author: "Tasarım Ekibi",
      tags: ["UI/UX", "Tasarım", "Trend"],
      color: "bg-[#FF00FF]",
      categoryId: category.id,
    },
    {
      title: "NEXT.JS 14 İLE PERFORMANS OPTİMİZASYONU",
      slug: "next-js-14-ile-performans-optimizasyonu",
      excerpt:
        "Web Vitals skorlarınızı yeşile döndürün. Server Components ve Streaming ile milisaniyeler içinde yüklenen sayfalar.",
      content:
        "Hız, SEO ve kullanıcı deneyimi için kritik. Next.js 14'ün sunduğu yeni özellikler, özellikle Server Components, web uygulamalarının performansını kökten değiştiriyor. Bu teknik makalede, LCP ve CLS skorlarını iyileştirmek için kullandığımız ileri seviye teknikleri paylaşıyoruz.",
      author: "Dev Team",
      tags: ["Next.js", "Performance", "Code"],
      color: "bg-[#00FFFF]",
      categoryId: category.id,
    },
    {
      title: "DİJİTAL MARKALAŞMADA HİKAYE ANLATICILIĞI",
      slug: "dijital-markalasmada-hikaye-anlaticiligi",
      excerpt:
        "İnsanlar ürünleri değil, hikayeleri satın alır. Markanızın dijital dünyada yankı uyandıran bir anlatıya sahip olması neden önemli?",
      content:
        "Teknoloji ne kadar gelişirse gelişsin, insan psikolojisi değişmiyor. Hikayeler, bağ kurmanın en güçlü yolu. Veri odaklı stratejilerimizi, yaratıcı hikaye anlatıcılığıyla birleştirerek markaların hedef kitleleriyle derinlemesine etkileşim kurmasını sağlıyoruz.",
      author: "Strateji",
      tags: ["Branding", "Marketing", "Storytelling"],
      color: "bg-[#FF6B6B]",
      categoryId: category.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
