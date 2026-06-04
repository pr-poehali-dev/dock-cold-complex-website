import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/082f9bd9-ef07-46a9-b824-cf13f33f4888/files/897d53b8-3668-4801-a4ec-a7bbe7e6818f.jpg";

const NAV_ITEMS = [
  { label: "О НАС", href: "#about" },
  { label: "УСЛУГИ", href: "#services" },
  { label: "ИНФРАСТРУКТУРА", href: "#capacity" },
  { label: "ГАЛЕРЕЯ", href: "#gallery" },
  { label: "КОНТАКТЫ", href: "#contacts" },
];

const STATS = [
  { value: "155 м", label: "длина причала" },
  { value: "6 000 т", label: "вместимость склада" },
  { value: "−20°C", label: "температурный режим" },
  { value: "24/7", label: "охрана и мониторинг" },
];

const PIER_SERVICES = [
  "Приём и отгрузка судов различного класса",
  "Погрузочно-разгрузочные работы (включая тяжеловесные и нестандартные грузы)",
  "Временное хранение на открытых и крытых площадках",
  "Обработка каботажных грузов",
  "Координация с транспортными компаниями и экспедиторами",
];

const COLD_SERVICES = [
  "Соблюдение заданного температурного режима на всём сроке хранения",
  "Контроль влажности и воздухообмена для сохранности продукции",
  "Раздельное хранение партий с маркировкой и учётом",
  "Санитарная обработка помещений по графику и по требованию",
  "Доступ к данным мониторинга для ваших специалистов (по согласованию)",
];

const ADVANTAGES = [
  {
    icon: "Shield",
    title: "Надёжность",
    text: "Новое оборудование и регулярные ТО исключают сбои в поддержании температуры и работе причала.",
  },
  {
    icon: "Layers",
    title: "Гибкость",
    text: "Возможность обработки как полных судовых партий, так и мелких отправок.",
  },
  {
    icon: "BarChart2",
    title: "Прозрачность",
    text: "Онлайн-отчётность по остаткам, температуре, операциям с грузом.",
  },
  {
    icon: "Lock",
    title: "Безопасность",
    text: "Охрана, видеонаблюдение, контроль доступа, страхование ответственности.",
  },
  {
    icon: "Link",
    title: "Логистическая синергия",
    text: "Удобное расположение причала относительно склада сокращает время и стоимость перевалки.",
  },
];

const GALLERY_IMAGES = [
  { src: HERO_IMAGE, label: "Морской причал" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", label: "Грузовые операции" },
  { src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80", label: "Холодильный комплекс" },
  { src: "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800&q=80", label: "Причальная зона" },
  { src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80", label: "Складской комплекс" },
  { src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80", label: "Перевалка грузов" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", cargo: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const aboutSection = useInView();
  const statsSection = useInView();
  const servicesSection = useInView();
  const capacitySection = useInView();
  const advantagesSection = useInView();
  const gallerySection = useInView();
  const contactsSection = useInView();

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--ocean-deep)", color: "var(--text-primary)" }}>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(10,22,40,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(0,180,216,0.15)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--ice-blue), #0077b6)" }}
            >
              <Icon name="Anchor" size={16} className="text-white" />
            </div>
            <div>
              <div className="section-title font-bold text-sm tracking-widest" style={{ color: "var(--ice-blue)" }}>
                ООО «АСПЕРС»
              </div>
              <div className="text-xs" style={{ color: "var(--text-secondary)", fontFamily: "'Golos Text', sans-serif" }}>
                ПОРТОВО-ЛОГИСТИЧЕСКИЙ СЕРВИС
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="nav-link bg-transparent border-none cursor-pointer p-0"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("#contacts")}
            className="hidden md:block btn-primary px-5 py-2 rounded text-sm font-semibold"
          >
            СВЯЗАТЬСЯ
          </button>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--ice-blue)" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 pb-6 flex flex-col gap-4"
            style={{ backgroundColor: "rgba(10,22,40,0.98)" }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="nav-link text-left bg-transparent border-none cursor-pointer py-2"
                style={{ color: "var(--text-primary)" }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="btn-primary px-5 py-3 rounded text-sm font-semibold mt-2"
            >
              СВЯЗАТЬСЯ
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--ocean-deep)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.6) 60%, rgba(10,22,40,1) 100%)",
          }}
        />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
            style={{
              border: "1px solid rgba(0,180,216,0.3)",
              backgroundColor: "rgba(0,180,216,0.08)",
              color: "var(--ice-blue)",
              fontSize: "0.75rem",
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            <Icon name="MapPin" size={12} />
            г. ВЛАДИВОСТОК · УЛ. КАЛИНИНА 243
          </div>

          <h1
            className="section-title font-bold mb-6 animate-fade-in-up"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.05, animationDelay: "0.2s", opacity: 0 }}
          >
            ООО «АСПЕРС»<br />
            <span className="gradient-text">ПОРТОВО-ЛОГИСТИЧЕСКИЙ</span><br />
            СЕРВИС
          </h1>

          <p
            className="text-lg mb-10 mx-auto max-w-2xl animate-fade-in-up"
            style={{
              color: "var(--text-secondary)",
              animationDelay: "0.4s",
              opacity: 0,
              fontFamily: "'Golos Text', sans-serif",
              lineHeight: 1.7,
            }}
          >
            Портово-логистические услуги с рефрижераторным хранением грузов.<br />
            Причал 155 м · Склад 6 000 т · Температура до −20°C
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            <button
              onClick={() => scrollTo("#contacts")}
              className="btn-primary px-8 py-4 rounded text-base font-semibold"
            >
              ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="btn-outline px-8 py-4 rounded text-base font-semibold"
            >
              НАШИ УСЛУГИ
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ color: "var(--text-secondary)", animationDelay: "1.2s", opacity: 0 }}
        >
          <span className="text-xs tracking-widest section-title">ЛИСТАЙТЕ</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS BAR */}
      <div
        ref={statsSection.ref}
        style={{
          backgroundColor: "var(--ocean-mid)",
          borderTop: "1px solid rgba(0,180,216,0.15)",
          borderBottom: "1px solid rgba(0,180,216,0.15)",
        }}
      >
        <div className="container mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`text-center ${statsSection.inView ? "animate-counter-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="stat-number text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm uppercase tracking-wider section-title" style={{ color: "var(--text-secondary)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-section">
        <div className="container mx-auto px-6">
          <div ref={aboutSection.ref} className="grid md:grid-cols-2 gap-16 items-center">
            <div className={aboutSection.inView ? "animate-slide-in-left" : "opacity-0"}>
              <div className="text-xs tracking-widest mb-4 section-title" style={{ color: "var(--ice-blue)" }}>
                О КОМПАНИИ
              </div>
              <h2 className="section-title font-bold text-4xl md:text-5xl mb-6" style={{ lineHeight: 1.1 }}>
                ЕДИНЫЙ ЛОГИСТИЧЕСКИЙ<br />
                <span className="gradient-text">КОМПЛЕКС</span>
              </h2>
              <p className="mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Мы предлагаем комплексные логистические услуги по обработке и хранению грузов
                с использованием современного морского причала и мощного холодильного комплекса.
              </p>
              <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Причал №1, расположенный во Владивостоке на ул. Калинина 243, оснащён
                крановым и перевалочным оборудованием, обеспечен подъездными путями для
                автотранспорта и железнодорожных составов.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Круглосуточная охрана и видеонаблюдение",
                  "Подключение судов к береговой электросети",
                  "Новое холодильное оборудование последнего поколения",
                  "Система мониторинга температуры в реальном времени",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0,180,216,0.15)", color: "var(--ice-blue)" }}
                    >
                      <Icon name="Check" size={12} />
                    </div>
                    <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative ${aboutSection.inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(0,180,216,0.2)" }}>
                <img src={HERO_IMAGE} alt="Морской причал Владивосток" className="w-full h-80 object-cover" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 p-4 rounded-lg"
                style={{
                  backgroundColor: "var(--ocean-mid)",
                  border: "1px solid rgba(0,180,216,0.25)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,180,216,0.15)", color: "var(--ice-blue)" }}
                  >
                    <Icon name="Anchor" size={20} />
                  </div>
                  <div>
                    <div className="section-title font-bold text-lg" style={{ color: "var(--ice-blue)" }}>
                      Причал №1
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Владивосток · ул. Калинина 243
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24" style={{ backgroundColor: "var(--ocean-mid)" }}>
        <div className="container mx-auto px-6">
          <div ref={servicesSection.ref} className="text-center mb-16">
            <div
              className={`text-xs tracking-widest mb-4 section-title ${servicesSection.inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ color: "var(--ice-blue)" }}
            >
              ЧТО МЫ ДЕЛАЕМ
            </div>
            <h2
              className={`section-title font-bold text-4xl md:text-5xl ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              НАШИ УСЛУГИ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`card-marine rounded-xl p-8 ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(0,180,216,0.2), rgba(0,119,182,0.2))", color: "var(--ice-blue)" }}
                >
                  <Icon name="Anchor" size={28} />
                </div>
                <div>
                  <h3 className="section-title font-bold text-2xl">Услуги причала</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Причал №1, г. Владивосток</p>
                </div>
              </div>
              <div className="divider-marine mb-6" />
              <div className="space-y-3 mb-6">
                {PIER_SERVICES.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon name="ChevronRight" size={16} className="mt-1 flex-shrink-0" style={{ color: "var(--ice-blue)" }} />
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.12)" }}>
                  <div className="section-title font-bold" style={{ color: "var(--ice-blue)" }}>155 м</div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>длина причала</div>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: "rgba(0,180,216,0.08)", border: "1px solid rgba(0,180,216,0.12)" }}>
                  <div className="section-title font-bold" style={{ color: "var(--ice-blue)" }}>24/7</div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>охрана</div>
                </div>
              </div>
            </div>

            <div
              className={`card-marine rounded-xl p-8 ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.35s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(72,202,228,0.2), rgba(0,180,216,0.1))", color: "var(--ice-bright)" }}
                >
                  <Icon name="Snowflake" size={28} />
                </div>
                <div>
                  <h3 className="section-title font-bold text-2xl">Холодильный комплекс</h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Рефрижераторное хранение</p>
                </div>
              </div>
              <div className="divider-marine mb-6" />
              <div className="space-y-3 mb-6">
                {COLD_SERVICES.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon name="ChevronRight" size={16} className="mt-1 flex-shrink-0" style={{ color: "var(--ice-bright)" }} />
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: "rgba(72,202,228,0.08)", border: "1px solid rgba(72,202,228,0.12)" }}>
                  <div className="section-title font-bold" style={{ color: "var(--ice-bright)" }}>6 000 т</div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>вместимость</div>
                </div>
                <div className="p-3 rounded-lg text-center" style={{ backgroundColor: "rgba(72,202,228,0.08)", border: "1px solid rgba(72,202,228,0.12)" }}>
                  <div className="section-title font-bold" style={{ color: "var(--ice-bright)" }}>−20°C</div>
                  <div className="text-xs" style={{ color: "var(--text-secondary)" }}>режим хранения</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-8 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 ${servicesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.5s", backgroundColor: "rgba(244,165,36,0.06)", border: "1px solid rgba(244,165,36,0.2)" }}
          >
            <Icon name="Info" size={24} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--gold)" }}>Тарифы — индивидуально</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                Стоимость рассчитывается в зависимости от объёма, номенклатуры и срока хранения.
                Скидки при долгосрочных контрактах. Возможны постоплата и гибкие графики расчётов.
              </p>
            </div>
            <button
              onClick={() => scrollTo("#contacts")}
              className="px-5 py-2 rounded text-sm flex-shrink-0 font-semibold section-title tracking-wider transition-all"
              style={{ border: "2px solid var(--gold)", color: "var(--gold)", backgroundColor: "transparent" }}
            >
              ЗАПРОСИТЬ РАСЧЁТ
            </button>
          </div>
        </div>
      </section>

      {/* CAPACITY */}
      <section id="capacity" className="py-24 bg-section grid-overlay">
        <div className="container mx-auto px-6">
          <div ref={capacitySection.ref} className="text-center mb-16">
            <div
              className={`text-xs tracking-widest mb-4 section-title ${capacitySection.inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ color: "var(--ice-blue)" }}
            >
              ИНФРАСТРУКТУРА
            </div>
            <h2
              className={`section-title font-bold text-4xl md:text-5xl ${capacitySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              ПРОИЗВОДСТВЕННЫЕ МОЩНОСТИ
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`card-marine rounded-xl p-8 ${capacitySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="section-title font-bold text-2xl mb-6 flex items-center gap-3">
                <Icon name="Anchor" size={24} style={{ color: "var(--ice-blue)" }} />
                Причал №1
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "Ruler", label: "Длина причала", value: "155 метров" },
                  { icon: "Truck", label: "Подъезд", value: "Автотранспорт и ж/д составы" },
                  { icon: "Zap", label: "Электроснабжение", value: "Подключение судов к береговой сети" },
                  { icon: "Camera", label: "Безопасность", value: "Круглосуточная охрана и видеонаблюдение" },
                  { icon: "Package", label: "Оснащение", value: "Крановое и перевалочное оборудование" },
                  { icon: "Warehouse", label: "Хранение", value: "Открытые и крытые площадки" },
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(0,180,216,0.1)" }}>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(0,180,216,0.1)", color: "var(--ice-blue)" }}
                    >
                      <Icon name={spec.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs mb-0.5 section-title tracking-wide" style={{ color: "var(--text-secondary)" }}>{spec.label}</div>
                      <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`card-marine rounded-xl p-8 ${capacitySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.35s" }}
            >
              <h3 className="section-title font-bold text-2xl mb-6 flex items-center gap-3">
                <Icon name="Snowflake" size={24} style={{ color: "var(--ice-bright)" }} />
                Холодильный комплекс
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "Archive", label: "Вместимость", value: "6 000 тонн" },
                  { icon: "Thermometer", label: "Температурный режим", value: "До −20°C (стабильно)" },
                  { icon: "Activity", label: "Мониторинг", value: "Датчики в каждой зоне, архивирование" },
                  { icon: "Bell", label: "Оповещения", value: "При отклонении температуры" },
                  { icon: "FlaskConical", label: "Санобработка", value: "По графику и по требованию" },
                  { icon: "Monitor", label: "Онлайн-доступ", value: "Данные мониторинга для клиентов" },
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(72,202,228,0.1)" }}>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(72,202,228,0.1)", color: "var(--ice-bright)" }}
                    >
                      <Icon name={spec.icon} size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs mb-0.5 section-title tracking-wide" style={{ color: "var(--text-secondary)" }}>{spec.label}</div>
                      <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-24" style={{ backgroundColor: "var(--ocean-mid)" }}>
        <div className="container mx-auto px-6">
          <div ref={advantagesSection.ref} className="text-center mb-16">
            <div
              className={`text-xs tracking-widest mb-4 section-title ${advantagesSection.inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ color: "var(--ice-blue)" }}
            >
              ПОЧЕМУ МЫ
            </div>
            <h2
              className={`section-title font-bold text-4xl md:text-5xl ${advantagesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              ПРЕИМУЩЕСТВА РАБОТЫ С НАМИ
            </h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={i}
                className={`card-marine rounded-xl p-6 text-center ${advantagesSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.1 + i * 0.12}s` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, rgba(0,180,216,0.2), rgba(0,119,182,0.1))", color: "var(--ice-blue)" }}
                >
                  <Icon name={adv.icon} size={22} />
                </div>
                <h4 className="section-title font-bold text-sm mb-2 tracking-wide">{adv.title.toUpperCase()}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-section">
        <div className="container mx-auto px-6">
          <div ref={gallerySection.ref} className="text-center mb-16">
            <div
              className={`text-xs tracking-widest mb-4 section-title ${gallerySection.inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ color: "var(--ice-blue)" }}
            >
              ФОТО
            </div>
            <h2
              className={`section-title font-bold text-4xl md:text-5xl ${gallerySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              ГАЛЕРЕЯ
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${gallerySection.inView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s`, border: "1px solid rgba(0,180,216,0.1)" }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(0deg, rgba(10,22,40,0.9) 0%, transparent 60%)" }}
                >
                  <span className="section-title text-sm font-bold tracking-wide" style={{ color: "var(--ice-blue)" }}>
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ backgroundColor: "var(--ocean-mid)" }}>
        <div className="container mx-auto px-6">
          <div ref={contactsSection.ref} className="text-center mb-16">
            <div
              className={`text-xs tracking-widest mb-4 section-title ${contactsSection.inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ color: "var(--ice-blue)" }}
            >
              СВЯЗЬ
            </div>
            <h2
              className={`section-title font-bold text-4xl md:text-5xl ${contactsSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              КОНТАКТЫ
            </h2>
            <p
              className={`mt-4 max-w-xl mx-auto ${contactsSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ color: "var(--text-secondary)", animationDelay: "0.2s" }}
            >
              Отправьте заявку — мы подготовим персональное предложение с расчётом стоимости
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div
              className={`card-marine rounded-xl p-8 ${contactsSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="section-title font-bold text-xl mb-6">ОТПРАВИТЬ ЗАЯВКУ</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs tracking-wider section-title block mb-2" style={{ color: "var(--text-secondary)" }}>
                    ИМЯ / КОМПАНИЯ
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,180,216,0.2)",
                      color: "var(--text-primary)",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                    placeholder="Иванов Иван / ООО Рыба ДВ"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider section-title block mb-2" style={{ color: "var(--text-secondary)" }}>
                    ТЕЛЕФОН
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,180,216,0.2)",
                      color: "var(--text-primary)",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider section-title block mb-2" style={{ color: "var(--text-secondary)" }}>
                    НОМЕНКЛАТУРА И ОБЪЁМ ГРУЗА
                  </label>
                  <input
                    type="text"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,180,216,0.2)",
                      color: "var(--text-primary)",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                    placeholder="Мороженая рыба, 500 т"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-wider section-title block mb-2" style={{ color: "var(--text-secondary)" }}>
                    ДОПОЛНИТЕЛЬНО
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,180,216,0.2)",
                      color: "var(--text-primary)",
                      fontFamily: "'Golos Text', sans-serif",
                    }}
                    placeholder="Желаемые даты, особые требования..."
                  />
                </div>
                <button className="btn-primary w-full py-4 rounded-lg text-sm font-bold tracking-wider">
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
              </div>
            </div>

            <div
              className={`flex flex-col gap-6 ${contactsSection.inView ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.35s" }}
            >
              <div className="card-marine rounded-xl p-6">
                <h3 className="section-title font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={18} style={{ color: "var(--ice-blue)" }} />
                  АДРЕС
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  г. Владивосток<br />
                  ул. Калинина 243<br />
                  Причал №1, ПК
                </p>
              </div>

              <div className="card-marine rounded-xl p-6">
                <h3 className="section-title font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Clock" size={18} style={{ color: "var(--ice-blue)" }} />
                  РЕЖИМ РАБОТЫ
                </h3>
                <div className="space-y-2" style={{ color: "var(--text-secondary)" }}>
                  <div className="flex justify-between">
                    <span>Причал и склад</span>
                    <span style={{ color: "var(--ice-blue)" }}>24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Офис</span>
                    <span style={{ color: "var(--ice-blue)" }}>Пн–Пт: 9:00–18:00</span>
                  </div>
                </div>
              </div>

              <div className="card-marine rounded-xl p-6">
                <h3 className="section-title font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="ListOrdered" size={18} style={{ color: "var(--ice-blue)" }} />
                  КАК НАЧАТЬ РАБОТУ
                </h3>
                <div className="space-y-4">
                  {[
                    { n: "1", text: "Отправьте заявку с описанием груза и датами" },
                    { n: "2", text: "Мы подготовим персональное предложение" },
                    { n: "3", text: "Заключаем договор и согласовываем поставку" },
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 section-title font-bold text-sm"
                        style={{ backgroundColor: "rgba(0,180,216,0.15)", color: "var(--ice-blue)" }}
                      >
                        {step.n}
                      </div>
                      <p className="text-sm leading-relaxed pt-1" style={{ color: "var(--text-secondary)" }}>{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "var(--ocean-deep)", borderTop: "1px solid rgba(0,180,216,0.15)" }}>
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--ice-blue), #0077b6)" }}
              >
                <Icon name="Anchor" size={16} className="text-white" />
              </div>
              <div>
                <div className="section-title font-bold text-sm tracking-widest" style={{ color: "var(--ice-blue)" }}>
                  ООО «АСПЕРС»
                </div>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Портово-логистический сервис · Владивосток
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="nav-link bg-transparent border-none cursor-pointer text-xs"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-center" style={{ color: "var(--text-secondary)" }}>
              © 2024 ООО «Асперс» · Владивосток
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}