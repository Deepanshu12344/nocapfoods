import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Menu, ShoppingBag, Sparkles, Star, X } from "lucide-react";
import { useEffect, useState, type PointerEvent } from "react";

import beetrootMacro from "@/assets/beetroot-macro.jpg";
import beetrootPack from "@/assets/beetroot-pack.jpg";
import carouselBeetroot from "@/assets/carousel/beetroot.png";
import carouselMixVeg from "@/assets/carousel/mix-veg.png";
import carouselMoongDal from "@/assets/carousel/moong-dal.png";
import carouselRagiChia from "@/assets/carousel/ragi-chia.png";
import flipInfo from "@/assets/flip_info.png";
import heroImage from "@/assets/nocap-hero.jpg";
import jowarPuffs from "@/assets/jowar-puffs.jpg";
import logo from "@/assets/logo.png";
import moongDal from "@/assets/moong-dal.jpg";
import ragiChia from "@/assets/ragi-chia.jpg";
import secondSectionImage from "@/assets/second-sec.png";
import { BrandButton } from "@/components/brand-button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NoCap Foods | Snacks That Hit Different" },
      { name: "description", content: "Big flavor, real ingredients, and no palm oil. Discover NoCap's modern Indian snack lineup." },
      { property: "og:title", content: "NoCap Foods | Snacks That Hit Different" },
      { property: "og:description", content: "Big flavor, real ingredients, and no palm oil. Discover NoCap's modern Indian snack lineup." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { name: "Tangy Moong Dal", note: "High protein / Big crunch", image: moongDal, offset: "md:translate-y-8" },
  { name: "Ragi & Chia Sticks", note: "Fiber rich / Ancient grains", image: ragiChia, offset: "" },
  { name: "Beetroot Masala", note: "Root veg / Masala kick", image: beetrootPack, offset: "md:translate-y-12" },
  { name: "Mix-Veg", note: "Light bite / All-day snack", image: jowarPuffs, offset: "md:translate-y-4" },
];

const reviews = [
  {
    quote: "The Beetroot Masala is dangerously good. Finished a whole canister in one Netflix episode.",
    name: "Ananya S.",
    tag: "Beetroot Masala",
    stars: 5,
    className: "bg-coral text-cream md:col-span-7 md:min-h-[320px]",
    quoteSize: "text-4xl md:text-5xl",
    starClass: "fill-sun text-sun",
    delay: "",
  },
  {
    quote: "Finally a snack my kids fight over that I actually feel good about.",
    name: "Rahul M.",
    tag: "Ragi & Chia Sticks",
    stars: 5,
    className: "bg-indigo text-cream md:col-span-5",
    quoteSize: "text-3xl",
    starClass: "fill-sun text-sun",
    delay: "[animation-delay:100ms]",
  },
  {
    quote: "Crunchy, bold, zero palm oil — and Zepto had it at my door in 12 minutes.",
    name: "Priya K.",
    tag: "Tangy Moong Dal",
    stars: 4,
    className: "bg-coral-dark text-cream md:col-span-6",
    quoteSize: "text-3xl",
    starClass: "fill-sun text-sun",
    delay: "[animation-delay:180ms]",
  },
  {
    quote: "Grabbed the combo box for movie night. Gone before the interval.",
    name: "Dev A.",
    tag: "Super Saver Combo",
    stars: 5,
    className: "bg-ink text-cream md:col-span-6",
    quoteSize: "text-3xl",
    starClass: "fill-coral text-coral",
    delay: "[animation-delay:260ms]",
  },
];

const carouselSlides = [
  { image: carouselBeetroot, alt: "NoCap Beetroot Cream and Onion Chips" },
  { image: carouselMixVeg, alt: "NoCap mixed vegetable snack" },
  { image: carouselMoongDal, alt: "NoCap Tangy Moong Dal" },
  { image: carouselRagiChia, alt: "NoCap Ragi and Chia Sticks" },
];

function Index() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [storyCursor, setStoryCursor] = useState({ visible: false, x: 0, y: 0, overImage: false });
  const addToCart = () => setCartCount((count) => count + 1);

  const updateStoryCursor = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    setStoryCursor({
      visible: true,
      x,
      y: event.clientY - bounds.top,
      overImage: x > bounds.width * 0.45,
    });
  };

  useEffect(() => {
    if (!carouselApi || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const autoplay = window.setInterval(() => carouselApi.scrollNext(), 5000);
    return () => window.clearInterval(autoplay);
  }, [carouselApi]);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".scroll-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => element.classList.add("scroll-reveal--visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("scroll-reveal--visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15 },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-coral selection:text-cream">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-background/90 backdrop-blur-xl">
        <div className="site-gutter site-shell flex h-20 items-center justify-between">
          <a href="#top" className="grid size-12 place-items-center rounded-sm bg-ink p-1.5" aria-label="NoCap home">
            <img src={logo} alt="NoCap" width={129} height={129} className="size-full object-contain" />
          </a>
          <nav className="hidden items-center gap-9 text-xs font-bold uppercase md:flex" aria-label="Main navigation">
            <a href="#flavors" className="transition-colors hover:text-coral-dark">Shop all</a>
            <a href="#proof" className="transition-colors hover:text-coral-dark">The proof</a>
            <a href="#reviews" className="transition-colors hover:text-coral-dark">Reviews</a>
            <a href="#story" className="transition-colors hover:text-coral-dark">Our story</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="relative grid size-10 place-items-center rounded-sm transition-colors hover:bg-ink/5" aria-label={`Shopping bag with ${cartCount} items`}>
              <ShoppingBag size={19} strokeWidth={2} />
              {cartCount > 0 && <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-coral text-[10px] font-bold text-cream">{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen((open) => !open)} className="grid size-10 place-items-center rounded-sm md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="site-gutter grid gap-4 border-t border-ink/10 bg-background py-6 font-display text-3xl md:hidden" aria-label="Mobile navigation">
            <a href="#flavors" onClick={() => setMenuOpen(false)}>Shop all</a>
            <a href="#proof" onClick={() => setMenuOpen(false)}>The proof</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="site-gutter site-shell grid grid-cols-1 gap-4 py-5 md:grid-cols-12 lg:py-8">
          <article className="group scroll-reveal relative min-h-[540px] overflow-hidden rounded-lg bg-coral md:col-span-8 md:min-h-[640px]">
            <img src={heroImage} alt="Colorful snack canisters bursting with beetroot chips, ragi sticks and moong dal" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-cream"><Sparkles size={15} /> Real ingredients. Wild flavor.</p>
              <h1 className="max-w-2xl font-display text-7xl leading-[0.84] text-cream sm:text-8xl md:text-9xl">Snacks<br />so good.</h1>
              <BrandButton onClick={addToCart} className="mt-6">Shop the drop <ArrowRight size={18} /></BrandButton>
            </div>
          </article>

          <div className="scroll-reveal grid gap-4 md:col-span-4">
            <article className="group relative min-h-72 overflow-hidden rounded-lg bg-indigo text-cream md:min-h-full">
              <img src={beetrootMacro} alt="Crisp beetroot chips with masala seasoning" width={816} height={816} className="absolute inset-0 size-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-indigo/85 via-indigo/20 to-indigo/60" />
              <div className="relative z-10 p-7 md:p-10">
                <span className="text-xs font-bold uppercase opacity-70">Best seller</span>
                <h2 className="mt-1 font-display text-5xl leading-none">Beetroot<br />Masala</h2>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-10">
                <p className="best-seller-cta font-display text-6xl leading-[0.84] sm:text-7xl md:text-8xl">Start<br />snacking better</p>
                <BrandButton tone="ink-coral" onClick={addToCart} className="mt-6">Shop the drop <ArrowRight size={18} /></BrandButton>
              </div>
            </article>
          </div>
        </section>

        <section id="proof" className="overflow-hidden bg-ink py-6 text-cream" aria-label="Product benefits">
          <div className="flex w-max whitespace-nowrap animate-marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center">
                <span className="mx-7 font-display text-5xl text-coral md:text-7xl">No palm oil</span><span className="font-display text-5xl">/</span>
                <span className="mx-7 font-display text-5xl text-coral-mid md:text-7xl">Real ingredients</span><span className="font-display text-5xl">/</span>
                <span className="mx-7 font-display text-5xl text-stroke md:text-7xl">Zero trans fat</span><span className="font-display text-5xl">/</span>
                <span className="mx-7 font-display text-5xl text-coral md:text-7xl">No artificial flavours</span><span className="font-display text-5xl">/</span>
              </div>
            ))}
          </div>
        </section>

        <section id="flavors" className="site-gutter site-shell py-24 lg:py-32">
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="mb-2 text-xs font-bold uppercase text-coral-dark">Pick your crunch</p><h2 className="font-display text-6xl leading-none sm:text-8xl">Choose your vibe.</h2></div>
            <a href="#flavors" className="group flex items-center gap-2 border-b-2 border-coral pb-1 text-xs font-bold uppercase">View all flavors <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a>
          </div>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-4">
            {products.map((product, index) => (
              <article key={product.name} className={`group ${product.offset}`}>
                <div className="scroll-reveal relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <img src={product.image} alt={`${product.name} snack canister`} loading="lazy" width={816} height={816} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button onClick={addToCart} aria-label={`Add ${product.name} to bag`} className="absolute bottom-3 right-3 grid size-11 translate-y-2 place-items-center rounded-full bg-cream text-ink opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"><ShoppingBag size={18} /></button>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div><h3 className="font-display text-3xl leading-none">{product.name}</h3><p className="mt-1 text-[11px] font-semibold uppercase text-muted-foreground">{product.note}</p></div>
                  <span className="text-sm font-bold">₹149</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="site-gutter site-shell pb-0 pt-20">
          <div>
            <article
              className="story-card scroll-reveal relative min-h-[430px] overflow-hidden rounded-lg bg-coral text-ink md:min-h-[520px]"
              onPointerEnter={updateStoryCursor}
              onPointerMove={updateStoryCursor}
              onPointerLeave={() => setStoryCursor((cursor) => ({ ...cursor, visible: false }))}
            >
              <img src={secondSectionImage} alt="Person pouring NoCap snacks from a canister into a bowl" width={1672} height={941} loading="lazy" className="story-card__image absolute inset-y-0 right-0 h-full w-full object-cover object-right md:w-[55%]" />
              <div className="story-card__content relative z-10 p-8 md:p-12">
                <p className="text-xs font-bold uppercase">No lies. No filler.</p>
                <h2 className="mt-16 max-w-xl font-display text-7xl leading-[0.9] sm:text-8xl">Crazy about chips.<br />Serious about people.</h2>
                <p className="mt-6 max-w-md text-base">Familiar flavor, smarter ingredients, and a crunch that never asks you to compromise.</p>
              </div>
              <span
                aria-hidden="true"
                className={`story-cursor ${storyCursor.visible ? "story-cursor--visible" : ""} ${storyCursor.overImage ? "story-cursor--coral" : "story-cursor--cream"}`}
                style={{ left: storyCursor.x, top: storyCursor.y }}
              >
                Start Snacking Better
              </span>
            </article>
          </div>
        </section>

        <section className="w-full py-24" aria-label="NoCap product highlights">
          <Carousel opts={{ loop: true }} setApi={(api) => setCarouselApi(api)} className="relative w-full">
            <CarouselContent className="ml-0">
              {carouselSlides.map((slide) => (
                <CarouselItem key={slide.alt} className="pl-0">
                  <div className="aspect-[2.2/1] w-full overflow-hidden bg-muted">
                    <img src={slide.image} alt={slide.alt} width={1858} height={846} loading="lazy" className="size-full object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 z-10 size-11 rounded-full border-0 bg-ink text-cream shadow-none hover:bg-ink/85 hover:text-cream focus-visible:ring-2 focus-visible:ring-cream disabled:bg-ink disabled:opacity-50 sm:left-6" />
            <CarouselNext className="right-3 z-10 size-11 rounded-full border-0 bg-ink text-cream shadow-none hover:bg-ink/85 hover:text-cream focus-visible:ring-2 focus-visible:ring-cream disabled:bg-ink disabled:opacity-50 sm:right-6" />
          </Carousel>
        </section>

        <section id="reviews" className="site-gutter site-shell pb-8 pt-0 lg:pb-16">
            <div className="scroll-reveal mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="mb-2 text-xs font-bold uppercase text-coral-dark">Real ones rate it</p><h2 className="font-display text-6xl leading-none sm:text-8xl">Word on the street.</h2></div>
            <div className="flex items-center gap-2 border-b-2 border-coral pb-1 text-xs font-bold uppercase">
              <Star size={15} className="fill-coral text-coral" /> 4.9 average · 2,300+ snackers
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {reviews.map((review) => (
              <article key={review.name} className={`scroll-reveal flex min-h-56 flex-col justify-between gap-8 rounded-lg p-7 md:p-8 ${review.className} ${review.delay}`}>
                <div>
                  <div className="flex gap-1" aria-label={`Rated ${review.stars} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={15} className={starIndex < review.stars ? review.starClass : "opacity-30"} />
                    ))}
                  </div>
                  <p className={`mt-5 font-display leading-[0.95] ${review.quoteSize}`}>“{review.quote}”</p>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div><p className="text-sm font-bold">{review.name}</p><p className="text-[11px] font-semibold uppercase opacity-70">{review.tag}</p></div>
                  <Sparkles size={18} className="shrink-0 opacity-50" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="site-gutter site-shell py-20">
          <div className="scroll-reveal relative grid overflow-hidden rounded-lg bg-indigo p-6 text-cream md:min-h-[500px] md:grid-cols-[minmax(0,1.5fr)_minmax(280px,1.15fr)] md:gap-10 md:p-12">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[15rem] leading-none text-cream/5">NOCAP NOCAP</span>
            <div className="relative z-10 flex flex-col justify-center py-10 text-left md:py-0">
              <p className="mb-4 text-xs font-bold uppercase text-coral">The super saver combo</p>
              <h2 className="font-display text-7xl leading-[0.88] sm:text-8xl">Your snack game<br />stops here.</h2>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <BrandButton tone="coral" onClick={() => setCartCount((count) => count + 4)} className="rounded-full px-10 text-2xl">Get the bundle <ArrowRight size={20} /></BrandButton>
                <span className="text-xs font-bold uppercase text-cream/60">Four crowd favorites. One box.</span>
              </div>
            </div>
            <div className="flip-card relative z-10 mt-2 min-h-72 rounded-lg outline-none md:mt-0 md:min-h-0" tabIndex={0} aria-label="Super Saver Combo product details">
              <div className="flip-card__inner rounded-lg">
                <div className="flip-card__face overflow-hidden rounded-lg">
                  <img src={heroImage} alt="NoCap snack canisters in the Super Saver Combo" width={1536} height={1024} loading="lazy" className="size-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-ink/65 px-5 py-4">
                    <p className="text-xs font-bold uppercase text-cream/75">Flip for the lineup</p>
                    <p className="mt-1 font-display text-4xl leading-none">The bundle.</p>
                  </div>
                </div>
                <div className="flip-card__face flip-card__back overflow-hidden rounded-lg">
                  <img src={flipInfo} alt="Super Saver Combo flavor lineup" width={1536} height={1024} loading="lazy" className="flip-card__back-image" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-gutter border-t border-ink/10 py-10">
        <div className="site-shell flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <a href="#top" className="grid size-11 place-items-center rounded-sm bg-ink p-1.5" aria-label="NoCap home">
              <img src={logo} alt="NoCap" width={129} height={129} className="size-full object-contain" />
            </a>
            <p className="mt-2 text-xs text-muted-foreground">For the real ones.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase text-muted-foreground"><a href="#top">Instagram</a><a href="#top">Contact</a><a href="#top">Privacy</a><a href="#top">Terms</a></div>
          <p className="text-[11px] font-bold uppercase text-muted-foreground">© 2026 NoCap Foods</p>
        </div>
      </footer>
    </div>
  );
}
