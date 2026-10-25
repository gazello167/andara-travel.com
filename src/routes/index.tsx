import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wallet,
} from "lucide-react";

import heroImage from "@/assets/hero-andara-travel.jpg";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Andara Travel — Carter & Rental Mobil Plus Sopir di Bandung" },
      {
        name: "description",
        content:
          "Jasa carter dan rental mobil plus sopir di Bandung. Antar-jemput bandara, stasiun, hotel, perjalanan dalam & luar kota dengan armada nyaman dan driver profesional.",
      },
      {
        property: "og:title",
        content: "Andara Travel — Carter & Rental Mobil Plus Sopir di Bandung",
      },
      {
        property: "og:description",
        content:
          "Armada bersih, driver berpengalaman, harga transparan. Pesan sekarang via WhatsApp, layanan 24 jam.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

//const WA_NUMBER = "628986940777";
const waLink = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const features = [
  {
    icon: ShieldCheck,
    title: "Driver Berpengalaman & Ramah",
    desc: "Sopir profesional yang hafal rute Bandung dan sekitarnya, santun serta siap membantu.",
  },
  {
    icon: Sparkles,
    title: "Armada Bersih & Terawat",
    desc: "Setiap unit dicuci dan diservis rutin agar perjalanan Anda selalu nyaman.",
  },
  {
    icon: Clock,
    title: "Penjemputan Tepat Waktu",
    desc: "Bandara Kertajati/CGK, Stasiun Bandung/Tegalluar, hingga hotel — selalu on time.",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    desc: "Penawaran jelas di awal, tanpa biaya tersembunyi dan tanpa drama di akhir sewa.",
  },
];

/*
const fleet = [
  {
    name: "Toyota Agya",
    desc: "City car hemat & lincah",
    seats: "3-4 penumpang",
    img: "https://www.toyota-bandung.com/wp-content/uploads/2026/07/toyota-agya-2026.jpg",
  },
  {
    name: "Toyota Calya",
    desc: "MPV hemat keluarga",
    seats: "5-6 penumpang",
    img: "https://www.toyota-bandung.com/wp-content/uploads/2026/07/toyota-calya.png",
  },
  {
    name: "Toyota Avanza",
    desc: "MPV andalan serbaguna",
    seats: "5-6 penumpang",
    img: "https://www.toyota-bandung.com/wp-content/uploads/2026/07/toyota-avanza.png",
  },
  {
    name: "Toyota Veloz",
    desc: "Premium MPV stylish & nyaman",
    seats: "5-6 penumpang",
    img: "https://www.toyota-bandung.com/wp-content/uploads/2026/07/toyota-veloz-2026.jpg",
  },
  {
    name: "Toyota Rush",
    desc: "SUV tangguh untuk segala medan",
    seats: "5-6 penumpang",
    img: "https://www.toyota-bandung.com/wp-content/uploads/2026/07/toyota-rush-2026.jpg",
  },
  {
    name: "Toyota Innova Zenix HEV",
    desc: "Medium MPV Hybrid super nyaman & mewah",
    seats: "6-7 penumpang",
    img: "https://www.toyota-bandung.com/wp-content/uploads/2026/07/toyota-innova-zenix-hev-2026.jpg",
  },
  {
    name: "Toyota HiAce Premio",
    desc: "Microbus VIP rombongan & perjalanan bisnis",
    seats: "11-15 penumpang",
    img: "https://toyota.gazello.my.id/wp-content/uploads/2022/10/toyota-premio.webp",
  },
];
*/

const services = [
  {
    icon: Plane,
    title: "Drop Off / Pick Up Bandara & Stasiun",
    desc: "Penjemputan Bandara Kertajati, Soekarno-Hatta, Stasiun Bandung dan Tegalluar.",
  },
  {
    icon: MapPin,
    title: "Antar Jemput Hotel & Wisata Bandung",
    desc: "Lembang, Ciwidey, Dago, Braga — keliling Bandung tanpa repot cari parkir.",
  },
  {
    icon: Car,
    title: "Perjalanan Dinas / Luar Kota",
    desc: "Jakarta, Jogja, Semarang hingga luar provinsi dengan driver siap jarak jauh.",
  },
  {
    icon: Users,
    title: "Carter Harian / Mingguan Plus Driver",
    desc: "Sewa fleksibel per hari atau per minggu, lengkap dengan sopir profesional.",
  },
];

const testimonials = [
  {
    name: "Rizky Pratama",
    role: "Perjalanan Dinas, Jakarta",
    text: "Driver jemput tepat waktu di Stasiun Bandung, mobilnya bersih dan wangi. Harga sesuai kesepakatan awal.",
  },
  {
    name: "Nadia Salsabila",
    role: "Liburan Keluarga",
    text: "Sewa HiAce untuk 13 orang ke Lembang dan Ciwidey. Sopirnya sabar dan paham rute wisata, anak-anak nyaman.",
  },
  {
    name: "Hendra Gunawan",
    role: "Airport Transfer",
    text: "Pesan via WhatsApp malam hari, paginya sudah standby di hotel. Pelayanan Andara Travel benar-benar rapi.",
  },
];

const faqs = [
  {
    q: "Apakah bisa sewa lepas kunci?",
    a: "Saat ini Andara Travel fokus pada layanan rental plus sopir agar perjalanan Anda lebih aman dan nyaman. Untuk kebutuhan khusus, silakan diskusikan dengan admin kami via WhatsApp.",
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "Pemesanan dikonfirmasi dengan DP, sisanya dapat dilunasi saat penjemputan. Pembayaran bisa via transfer bank maupun tunai.",
  },
  {
    q: "Apakah harga sudah termasuk BBM dan sopir?",
    a: "Harga carter dalam kota sudah termasuk sopir dan BBM. Untuk luar kota, tol, parkir, dan penginapan sopir menyesuaikan rute dan akan dijelaskan di awal.",
  },
  {
    q: "Berapa lama sebelumnya saya harus memesan?",
    a: "Disarankan H-1 agar unit dan sopir terjamin tersedia. Pemesanan mendadak tetap kami usahakan selama armada masih kosong.",
  },
];

function Index() {

const [content, setContent] = useState<{
    whatsapp: string;
    wa_message: string;
    hero_title: string;
    hero_subtitle: string;
    fleets: { name: string; price: string; capacity: string; image: string }[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/content.php")
      .then((res) => res.json())
      .then(setContent)
      .catch(() => {});
  }, []);

 const WA_NUMBER = content?.whatsapp || "6281234567890";
 const waLink = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// format "6281234567890" -> "+62 812-3456-7890"
 const formatPhoneDisplay = (raw: string) => {
  const local = raw.replace(/^62/, "");
  const first = local.slice(0, 3);
  const rest = local.slice(3).match(/.{1,4}/g) || [];
  return `+62 ${first}${rest.length ? "-" + rest.join("-") : ""}`;
};
  const fleet = (content?.fleets || []).map((f) => ({
  name: f.name,
  price: f.price,
  desc: f.capacity,
  seats: f.capacity,
  img: f.image.startsWith("http") ? f.image : `https://andara-travel.com${f.image}`,
}));
  
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
  {content?.logo_url ? (
    <img src={content.logo_url} alt="Andara Travel" className="h-12 w-auto" />
  ) : (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
      <Car className="h-5 w-5" />
    </span>
  )}
  <div className="leading-tight hidden">
    <p className="font-display text-base font-extrabold tracking-tight">Andara Travel</p>
    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Bandung</p>
  </div>
</div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
  {(content?.nav_items || []).map((item) => (
    <a key={item.href} className="transition-colors hover:text-primary" href={item.href}>
      {item.label}
    </a>
  ))}
</nav>
          <a className={cn(buttonVariants(), "bg-primary hover:bg-primary-deep")} href={waLink("Halo Andara Travel, saya ingin bertanya soal sewa mobil.")} target="_blank">
  {content?.header_cta_text || "Hubungi Admin"}
</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Armada Andara Travel dengan driver profesional di Bandung"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold-soft">
              <Star className="h-3.5 w-3.5" /> Melayani 24 Jam
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
  {content?.hero_title || "Jasa Carter & Rental Mobil Plus Sopir Terpercaya di Bandung"}
</h1>
<p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
  {content?.hero_subtitle || "Layanan Antar-Jemput Bandara, Stasiun, Hotel, serta Perjalanan Dalam & Luar Kota dengan Armada Nyaman dan Driver Profesional."}
</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className={cn(buttonVariants({size: "lg"}), "h-12 bg-whatsapp px-7 text-base font-semibold text-primary-foreground hover:bg-whatsapp/90")}
                  href={waLink(
                    "Halo Andara Travel, saya ingin memesan carter mobil plus sopir.",
                  )} target="_blank"
                >
                  Pesan Sekarang via WhatsApp
                </a>
              <a className={cn(buttonVariants({variant: "outline", size: "lg"}), "h-12 border-gold/60 bg-transparent px-7 text-base font-semibold text-gold hover:bg-gold hover:text-accent-foreground")} href="#armada">Lihat Armada</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/75">
              {["Driver profesional", "Harga transparan", "Armada terawat"].map((i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section id="keunggulan" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          eyebrow="Kenapa Andara Travel"
          title="Perjalanan Tenang, Pelayanan Matang"
          subtitle="Kami menjaga setiap detail agar Anda cukup duduk manis dan menikmati perjalanan."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Armada */}
      <section id="armada" className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="Katalog Armada"
            title="Pilih Unit Sesuai Kebutuhan Anda"
            subtitle="Dari city car hemat sampai microbus rombongan — semua plus sopir berpengalaman."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((car) => (
              <article
                key={car.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={car.img}
                    alt={car.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold">{car.name}</h3>
                    <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold text-accent-foreground">
                      {car.seats}
                    </span>
                  </div>
				  <p className="mt-1 text-sm font-semibold text-primary">{car.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{car.desc}</p>
                  <a className={cn(buttonVariants(), "mt-5 w-full bg-primary font-semibold hover:bg-primary-deep")}
                      href={waLink(
                        `Halo Andara Travel, saya ingin menyewa ${car.name} plus sopir.`,
                      )} target="_blank"
                    >
                      Sewa {car.name} via WA
                    </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Satu Armada untuk Semua Kebutuhan"
          subtitle="Sebutkan rute dan jadwalnya, sisanya biar kami yang atur."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="flex gap-5 rounded-2xl border border-border bg-card p-7"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Testimoni
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-primary-foreground md:text-4xl">
              Kata Pelanggan Kami
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-primary-foreground/12 bg-primary-foreground/6 p-7 backdrop-blur"
              >
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-semibold text-primary-foreground">{t.name}</p>
                  <p className="text-xs text-primary-foreground/60">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          subtitle="Belum terjawab? Chat admin kami kapan saja, 24 jam."
        />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div
          className="rounded-3xl px-8 py-14 text-center"
          style={{
            background: "var(--gradient-gold)",
            boxShadow: "var(--shadow-elegant)",
          }}
        >
          <h2 className="font-display text-3xl font-extrabold text-accent-foreground md:text-4xl">
            Siap Berangkat Bersama Andara Travel?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-accent-foreground/80 md:text-base">
            Konsultasikan rute dan jadwal Anda sekarang, admin kami siap membantu 24 jam.
          </p>
          <a className={cn(buttonVariants({size: "lg"}), "mt-8 h-12 bg-primary px-8 text-base font-semibold hover:bg-primary-deep")} href={waLink("Halo Andara Travel, saya ingin konsultasi pemesanan.")} target="_blank">
              Pesan via WhatsApp
            </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-deep py-14 text-primary-foreground/75">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
		<div>
  {content?.logo_url && (
    <img src={content.logo_url} alt="Andara Travel" className="h-8 w-auto mb-3" />
  )}
  <p className="font-display text-xl font-extrabold text-primary-foreground">Andara Travel</p>
  <p className="mt-3 text-sm leading-relaxed">
    Carter & rental mobil plus sopir di Bandung. Nyaman, tepat waktu, harga transparan.
  </p>
</div>
          <div>
            <p className="font-display font-bold text-primary-foreground">Alamat Operasional</p>
            <p className="mt-3 flex gap-2 text-sm">
  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
  {content?.footer_address || "Jl. Soekarno-Hatta, Kota Bandung, Jawa Barat"}
</p>
            <p className="mt-2 flex gap-2 text-sm">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              Jam Layanan: 24 Jam Setiap Hari
            </p>
          </div>
          <div>
            <p className="font-display font-bold text-primary-foreground">Kontak</p>
            <a href={`tel:+${WA_NUMBER}`} className="mt-3 flex gap-2 text-sm transition-colors hover:text-gold">
  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{formatPhoneDisplay(WA_NUMBER)}</a>
            <a href={waLink("Halo Andara Travel, saya ingin memesan.")} target="_blank" className="mt-2 inline-flex gap-2 text-sm transition-colors hover:text-gold">
  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
  {content?.footer_cta_text || "Chat WhatsApp Admin"}
</a>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-primary-foreground/10 px-4 pt-6 text-xs">
          © {new Date().getFullYear()} Andara Travel. Semua hak dilindungi.
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink("Halo Andara Travel, saya ingin memesan mobil plus sopir.")} target="_blank"
        aria-label="Chat WhatsApp Andara Travel"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-105"
        style={{ boxShadow: "var(--shadow-elegant)" }}
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Chat Admin</span>
      </a>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

