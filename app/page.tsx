'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, Instagram, Mail, Phone, MapPin, Sparkles, Palette, Eye, ArrowRight, Star } from 'lucide-react';

export default function EclatLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

 useEffect(() => {
  if (typeof window === 'undefined') return;

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);

    const sections = ['inicio', 'nosotros', 'servicios', 'galeria', 'contacto'];
    const current = sections.find((section) => {
      const el = document.getElementById(section);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });
    if (current) setActiveSection(current);
  };

  // throttle simple con rAF para mousemove
  let ticking = false;
  const handleMouseMove = (e: MouseEvent) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      ticking = false;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);

const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  setMenuOpen(false);
};

const openImageModal = (src: string) => {
  setSelectedImage(src);
  setModalOpen(true);
};

const closeImageModal = () => {
  // if a video is open, pause and reset it
  if (videoRef.current) {
    try {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    } catch {
      // ignore
    }
  }
  setModalOpen(false);
  setSelectedImage(null);
};

  const services = [
    {
      title: "Ilustración de Moda Profesional",
      desc: "Creación de ilustraciones artísticas y técnicas que representan colecciones, prendas o conceptos de diseño.",
      icon: "01",
      includes: [
        "Figurines de moda (tradicional y digital).",
        "Representación de texturas, siluetas y caídas de tela.",
        "Ilustraciones personalizadas para diseñadores y marcas.",
        "Retratos de estilo editorial para campañas o presentaciones visuales."
      ]
    },
    {
      title: "Ilustración Digital y Conceptual",
      desc: "Desarrollo de ilustraciones digitales con enfoque contemporáneo, ideales para presentaciones, portafolios o redes profesionales.",
      icon: "02",
      includes: [
        "Diseño de personajes y estilización de figuras.",
        "Ilustraciones digitales en alta resolución para impresión o difusión online.",
        "Bocetos conceptuales de colecciones."
      ]
    },
    {
      title: "Formación y Talleres Creativos",
      desc: "Espacios de aprendizaje artístico dirigidos a estudiantes y profesionales del diseño.",
      icon: "03",
      includes: [
        "Talleres de ilustración de moda tradicional y digital.",
        "Capacitaciones en color, anatomía y composición visual.",
        "Asesoría para portafolios de ilustración o presentación de colecciones."
      ]
    },
    {
      title: "Proyectos Personalizados",
      desc: "Desarrollamos piezas visuales exclusivas según las necesidades de cada cliente o proyecto creativo.",
      icon: "04",
      includes: [
        "Encargos artísticos y colaboraciones editoriales.",
        "Diseño de obras para exposiciones o material corporativo.",
        "Ilustraciones únicas de moda para regalos, exhibiciones o coleccionismo.",
 
      ]
    }
    
  ];

  return (
    <div className="bg-[#0b0b0c] text-white overflow-hidden">
      {/* Cursor personalizado */}
      <div 
        className="fixed w-4 h-4 rounded-full border-2 border-[#D4AF37] pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0b0b0c] backdrop-blur-xl shadow-2xl border-b border-[#D4AF37]/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-3xl font-extralight tracking-[0.2em]">
            <span className="relative">
              <span className="text-[#D4AF37] animate-pulse">É</span>
              <span className="text-white/90">CLAT</span>
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#D4AF37] via-[#f5e6a6] to-transparent"></div>
            </span>
          </div>
          
          <div className="hidden md:flex gap-12 items-center">
            {['inicio', 'nosotros', 'servicios', 'galería', 'contacto'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === 'galería' ? 'galeria' : item)}
                className={`relative text-xs uppercase tracking-[0.3em] transition-all duration-300 group ${
                  activeSection === (item === 'galería' ? 'galeria' : item)
                    ? 'text-[#D4AF37]'
                    : 'text-white/50 hover:text-white/90'
                }`}
              >
                {item}
                <span className={`absolute -bottom-2 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                  activeSection === (item === 'galería' ? 'galeria' : item) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          <button 
            className="md:hidden text-[#D4AF37] relative group"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
            <span className="absolute inset-0 border border-[#D4AF37] scale-0 group-hover:scale-110 transition-transform duration-300"></span>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0b0b0c]/98 backdrop-blur-xl border-t border-[#D4AF37]/20 animate-slideDown">
            <div className="flex flex-col gap-6 p-8">
              {['inicio', 'nosotros', 'servicios', 'galería', 'contacto'].map((item, idx) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === 'galería' ? 'galeria' : item)}
                  className="text-left text-sm uppercase tracking-[0.3em] text-white/70 hover:text-[#D4AF37] transition-colors relative pl-8"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="absolute left-0 text-[#D4AF37]">0{idx + 1}</span>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
        {/* Fondo animado */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#9c7c2b]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Grid animado */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl">
          <div className="mx-auto mb-6 w-36 md:w-5xl">
            <Image src="/img/logo.png" alt="Éclat logo" width={350} height={240} className="object-contain mx-auto" />
          </div>
          {/* Decoración superior */}
          <div className="mb-12 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
            <Star className="text-[#D4AF37] w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
          </div>

          <h1 className="text-8xl md:text-[180px] font-thin mb-8 tracking-[0.15em] leading-none">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f5e6a6] to-[#D4AF37] animate-gradient bg-[length:200%_auto]">
              ÉCLAT
            </span>
          </h1>
          
          <div className="relative inline-block mb-4">
            <p className="text-2xl md:text-4xl font-extralight text-white/80 tracking-[0.4em]">
              FASHION ILLUSTRATION
            </p>
            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
          </div>

          <p className="text-xl md:text-3xl italic text-[#f5e6a6] my-16 font-light tracking-wide">
            La elegancia de la moda en cada línea
          </p>

          <button 
            onClick={() => scrollToSection('nosotros')}
            className="group relative px-12 py-5 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] uppercase tracking-[0.3em] text-sm overflow-hidden transition-all duration-700 hover:text-[#0b0b0c] hover:border-[#f5e6a6] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explorar
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#f5e6a6] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            <div className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700"></div>
          </button>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-40 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Título con decoración */}
          <div className="text-center mb-32">
            <div className="inline-block relative">
              <span className="text-8xl md:text-9xl font-thin absolute -top-16 left-1/2 -translate-x-1/2 text-[#D4AF37]/5 tracking-[0.2em]">ABOUT</span>
              <h2 className="text-6xl md:text-7xl font-thin mb-6 tracking-[0.15em] relative">
                <span className="text-white/40">QUIÉNES</span>
                <span className="text-[#D4AF37] ml-6">SOMOS</span>
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-32 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <Sparkles className="text-[#D4AF37] w-6 h-6" />
              <div className="h-px w-32 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-start mb-32">
            <div className="space-y-8 text-white/70 leading-loose text-lg">
              <p className="relative pl-6 border-l-2 border-[#D4AF37]">
                <span className="text-[#D4AF37] font-medium text-xl">Éclat Fashion Illustration Ltda.</span>   es una empresa santandereana dedicada al arte visual aplicado a la moda. 
                Nos especializamos en la creación de ilustraciones que capturan la esencia del diseño, la textura y la silueta de cada prenda, transformando ideas en obras gráficas llenas de elegancia y autenticidad.


              </p>
              <p className="text-white/60">
                <span className="text-[#D4AF37] font-medium text-xl">Éclat Fashion Illustration Ltda,</span> transformamos la visión de la moda en un lenguaje visual único. Cada trazo, línea y textura nace del equilibrio entre sensibilidad artística y conocimiento técnico, dando vida a 
                ilustraciones que comunican estilo, emoción y autenticidad.

              </p>
              <p className="text-white/60">
                Nuestro propósito es reinterpretar la moda desde el arte, creando imágenes que capturan la esencia de cada diseño y revelan la identidad de quienes los imaginan. Colaboramos con diseñadores, 
                marcas y editoriales que buscan más que una representación: buscan una expresión visual que hable por sí sola.

              </p>
              <p className="text-white/60">
                En Éclat, la ilustración no solo acompaña la moda —la eleva. Es nuestra manera de celebrar la creatividad, la elegancia y el poder de imaginar

              </p>
              
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                <div className="relative p-6 bg-gradient-to-br from-[#D4AF37]/5 to-transparent border border-[#D4AF37]/20 group hover:border-[#D4AF37] transition-all duration-500">
                  <Eye className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                  <h3 className="text-[#D4AF37] font-light mb-3 uppercase tracking-[0.2em] text-sm">Misión</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Inspirar y transformar las ideas de los diseñadores en ilustraciones que reflejen estilo, elegancia y autenticidad.
                  </p>
                </div>
                
                <div className="relative p-6 bg-gradient-to-br from-[#D4AF37]/5 to-transparent border border-[#D4AF37]/20 group hover:border-[#D4AF37] transition-all duration-500">
                  <Sparkles className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                  <h3 className="text-[#D4AF37] font-light mb-3 uppercase tracking-[0.2em] text-sm">Visión</h3>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Ser reconocidos en 2030 como la empresa líder en ilustración de moda en Colombia.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group space-y-8">
              {/* Card 1: Nombre Comercial */}
              <div className="relative bg-gradient-to-br from-[#1a1a1c] to-[#0b0b0c] p-8 border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-500">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]"></div>
                
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-lg mb-4 flex items-center gap-2">
                   Nombre Comercial
                </h4>
                <p className="text-white text-2xl font-light mb-3">Éclat Fashion Illustration</p>
                <p className="text-white/50 text-sm leading-relaxed mb-2">
                  (Art. 516, 583, 587, 602, 606 y 607 C.C.)
                </p>
                <p className="text-white/60 text-base">
                  Registrado en la Oficina de Propiedad Industrial de la Superintendencia de Industria y Comercio
                </p>
              </div>

              {/* Card 2: Lema Comercial */}
              <div className="relative bg-gradient-to-br from-[#1a1a1c] to-[#0b0b0c] p-8 border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-500">
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-lg mb-4 flex items-center gap-2">
                  Nuestro Lema
                </h4>
                <p className="text-white text-xl italic font-light mb-3">
                  La elegancia de la moda en cada línea
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-2">
                  (Art. 175 de la Decisión 486 de la Comunidad Andina de Naciones)
                </p>
              </div>

              {/* Card 3: Datos de Registro */}
              <div className="relative bg-gradient-to-br from-[#1a1a1c] to-[#0b0b0c] p-8 border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-all duration-500">
                <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-lg mb-6 flex items-center gap-2">
                   Datos de Registro Mercantil
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[#D4AF37] text-sm uppercase tracking-wider mb-1">Cámara de Comercio</p>
                    <p className="text-white/80 text-sm">Cámara de Comercio de Bucaramanga</p>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#D4AF37] text-sm mb-1">INSCRIPCIÓN</p>
                      <p className="text-white/80 text-sm">S00031245</p>
                      <p className="text-white/50 text-sm">12 de abril de 2024</p>
                    </div>
                    <div>
                      <p className="text-[#D4AF37] text-sm mb-1">NIT</p>
                      <p className="text-white/80 text-sm">901987654-3</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
                  
                  <div>
                    <p className="text-[#D4AF37] text-sm mb-1">TIPO DE SOCIEDAD</p>
                    <p className="text-white/80 text-sm">Sociedad de Responsabilidad Limitada – LTDA.</p>
                  </div>
                  
                  <div>
                    <p className="text-[#D4AF37] text-sm mb-1">TIPO DE ENTIDAD</p>
                    <p className="text-white/80 text-sm">Empresa de servicios creativos e ilustración digital</p>
                  </div>
                  
                  <div>
                    <p className="text-[#D4AF37] text-sm mb-1">CÓDIGO CIIU</p>
                    <p className="text-white/80 text-sm">7410 - Actividades de diseño especializado</p>
                  </div>
                  
                  <div>
                    <p className="text-[#D4AF37] text-sm mb-1">ACCIONISTAS</p>
                    <p className="text-white/80 text-sm">3 accionistas de nacionalidad colombiana</p>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#D4AF37]/5 p-4 border border-[#D4AF37]/20">
                      <p className="text-[#D4AF37] text-sm mb-2">ACTIVO TOTAL</p>
                      <p className="text-white text-lg font-light">$200.000.000</p>
                    </div>
                    <div className="bg-[#D4AF37]/5 p-4 border border-[#D4AF37]/20">
                      <p className="text-[#D4AF37] text-sm mb-2">PATRIMONIO</p>
                      <p className="text-white text-lg font-light">$100.000.000</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[#D4AF37] text-sm mb-1">DURACIÓN</p>
                    <p className="text-white/80 text-sm">10 años, prorrogables automáticamente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid Mejorada */}
          <div className="mt-32">
            <h3 className="text-5xl font-thin text-center mb-20 tracking-[0.2em]">
              <span className="text-white/40">NUESTRAS</span>
              <span className="text-[#D4AF37] ml-4">CREACIONES</span>
            </h3>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="group relative aspect-square overflow-hidden bg-[#1a1a1c] border border-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-700 cursor-pointer"
                  onClick={() => openImageModal(`/img/${item}.jpeg`)}
                >
                  <Image src={`/img/${item}.jpeg`} alt={`Obra ${item}`} fill className="object-contain" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/40 via-[#9c7c2b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                      <div className="mx-auto mb-3 transition-colors duration-500 opacity-0 group-hover:opacity-100">
                        <Palette className="text-[#D4AF37]/60" size={48} />
                      </div>
                      <p className="text-[#D4AF37]/40 group-hover:text-[#D4AF37] text-xs uppercase tracking-[0.3em] transition-colors duration-500">Obra {item}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#D4AF37]/50 transition-all duration-700 scale-90 group-hover:scale-100"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#D4AF37]/[0.02]"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-32">
            <div className="inline-block relative">
              <span className="text-8xl md:text-9xl font-thin absolute -top-16 left-1/2 -translate-x-1/2 text-[#D4AF37]/5 tracking-[0.2em]">SERVICES</span>
              <h2 className="text-6xl md:text-7xl font-thin mb-6 tracking-[0.15em] relative">
                <span className="text-white/40">NUESTROS</span>
                <span className="text-[#D4AF37] ml-6">SERVICIOS</span>
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-32 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
              <Star className="text-[#D4AF37] w-6 h-6" />
              <div className="h-px w-32 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {services.map((service, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                <div className="relative h-full p-10 bg-gradient-to-br from-[#1a1a1c] to-[#0b0b0c] border border-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-all duration-700 overflow-hidden">
                  {/* Número grande de fondo */}
                  <span className="absolute -top-6 -right-6 text-9xl font-thin text-[#D4AF37]/5 group-hover:text-[#D4AF37]/10 transition-colors duration-700">{service.icon}</span>
                  
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] to-[#9c7c2b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  
                  <div className="relative">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] transition-colors duration-500">
                      <span className="text-[#D4AF37] group-hover:text-[#0b0b0c] font-thin text-2xl transition-colors duration-500">{service.icon}</span>
                    </div>
                    
                    <h3 className="text-2xl font-light mb-4 text-white/90 group-hover:text-[#D4AF37] tracking-wide transition-colors duration-500">
                      {service.title}
                    </h3>
                    
                    <p className="text-white/50 leading-relaxed text-base group-hover:text-white/70 transition-colors duration-500">
                      {service.desc}
                    </p>
                    {service.includes && (
                      <ul className="mt-4 text-white/60 text-base list-disc list-inside space-y-1">
                        {service.includes.map((inc, i) => (
                          <li key={i}>{inc}</li>
                        ))}
                      </ul>
                    )}
                    

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <div className="inline-block relative">
              <span className="text-8xl md:text-9xl font-thin absolute -top-16 left-1/2 -translate-x-1/2 text-[#D4AF37]/5 tracking-[0.2em]">GALLERY</span>
              <h2 className="text-6xl md:text-7xl font-thin mb-6 tracking-[0.15em] relative">
                <span className="text-[#D4AF37]">GALERÍA</span>
                <span className="text-white/40 ml-6">DE ELEGANCIA</span>
              </h2>
            </div>
            <p className="text-white/50 max-w-2xl mx-auto mt-8 text-lg leading-relaxed">
              Cada trazo cuenta una historia. Explora nuestra colección de ilustraciones que transforman ideas en arte visual.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="group relative aspect-[3/4] overflow-hidden bg-[#1a1a1c] border border-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-700 cursor-pointer"
                onClick={() => openImageModal(`/video/${item}.mp4`)}
              >

                <video
                  src={`/video/${item}.mp4`}
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Efecto dorado */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Ícono central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-[#D4AF37]/20 group-hover:tesxt-[#D4AF37]/60 group-hover:scale-125 transition-all duration-700" size={64} />
                </div>

                {/* Texto inferior */}
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-[#0b0b0c] to-transparent">
                  <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm mb-2">Colección {item}</p>
                  <div className="h-px w-16 bg-[#D4AF37]"></div>
                </div>

                {/* Flecha superior derecha */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 border-2 border-[#D4AF37] flex items-center justify-center backdrop-blur-sm">
                    <ArrowRight className="text-[#D4AF37] w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-transparent"></div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-block relative">
              <span className="text-8xl md:text-9xl font-thin absolute -top-16 left-1/2 -translate-x-1/2 text-[#D4AF37]/5 tracking-[0.2em]">CONTACT</span>
              <h2 className="text-6xl md:text-7xl font-thin mb-6 tracking-[0.15em] relative">
                <span className="text-[#D4AF37]">CONTACTO</span>
              </h2>
            </div>
            <p className="text-white/50 text-lg mt-8">
              Transformemos tus ideas en ilustraciones extraordinarias
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-[#1a1a1c] to-[#0b0b0c] border border-[#D4AF37]/30 p-12 md:p-16">
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#D4AF37]"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#D4AF37]"></div>
            
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div className="group">
                  <div className="flex items-start gap-5 p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:bg-[#D4AF37]/5">
                    <MapPin className="text-[#D4AF37] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={28} />
                    <div>
                      <p className="text-white/90 mb-1 font-light">Calle 42 #28-15, Local 203</p>
                      <p className="text-white/50 text-sm">Bucaramanga, Santander</p>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-5 p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:bg-[#D4AF37]/5">
                    <Phone className="text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={28} />
                    <a href="tel:6076359090" className="text-white/90 hover:text-[#D4AF37] transition-colors font-light">
                      (607) 635 9090
                    </a>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-5 p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:bg-[#D4AF37]/5">
                    <Mail className="text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={28} />
                    <a href="mailto:pinponstg@gmail.com" className="text-white/90 hover:text-[#D4AF37] transition-colors font-light break-all">
                      pinponstg@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="NOMBRE"
                    className="w-full bg-transparent border-2 border-[#D4AF37]/20 p-5 text-white placeholder:text-white/30 placeholder:tracking-[0.2em] focus:border-[#D4AF37] focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  />
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="EMAIL"
                    className="w-full bg-transparent border-2 border-[#D4AF37]/20 p-5 text-white placeholder:text-white/30 placeholder:tracking-[0.2em] focus:border-[#D4AF37] focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  />
                </div>
                
                <div className="relative">
                  <textarea 
                    placeholder="MENSAJE"
                    rows={5}
                    className="w-full bg-transparent border-2 border-[#D4AF37]/20 p-5 text-white placeholder:text-white/30 placeholder:tracking-[0.2em] focus:border-[#D4AF37] focus:outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  />
                </div>
                
                <button type="submit" className="group relative w-full bg-[#D4AF37] text-[#0b0b0c] py-5 uppercase tracking-[0.3em] text-sm font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Enviar Mensaje
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f5e6a6] to-[#D4AF37] transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#D4AF37]/20 py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-thin tracking-[0.2em] mb-4">
                <span className="text-[#D4AF37]">ÉCLAT</span>
              </h3>
              <p className="text-white/40 text-sm italic mb-6 leading-relaxed">
                La elegancia de la moda en cada línea
              </p>
              <div className="flex gap-4">
                <a href="#" className="group w-12 h-12 border border-[#D4AF37]/30 hover:border-[#D4AF37] flex items-center justify-center transition-all duration-300 hover:bg-[#D4AF37]/10">
                  <Instagram className="text-white/60 group-hover:text-[#D4AF37] transition-colors" size={20} />
                </a>
                <a href="mailto:contacto@eclatillustration.co" className="group w-12 h-12 border border-[#D4AF37]/30 hover:border-[#D4AF37] flex items-center justify-center transition-all duration-300 hover:bg-[#D4AF37]/10">
                  <Mail className="text-white/60 group-hover:text-[#D4AF37] transition-colors" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs mb-6">Navegación</h4>
              <div className="space-y-3">
                {['Inicio', 'Nosotros', 'Servicios', 'Galería', 'Contacto'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-white/50 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs mb-6">Contacto</h4>
              <div className="space-y-3 text-white/50 text-sm">
                <p>Calle 42 #28-15, Local 203</p>
                <p>Bucaramanga, Santander</p>
                <p className="pt-2">(607) 635 9090</p>
                <p>pinponstg@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#D4AF37]/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-xs">
                © 2025 Éclat Fashion Illustration Ltda.
              </p>
              <p className="text-white/30 text-xs">
                NIT 901987654-3 • Bucaramanga, Colombia
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
      {/* Image Modal */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80" onClick={closeImageModal}>
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeImageModal} className="absolute -top-8 -right-8 bg-[#D4AF37] text-[#0b0b0c] rounded-full w-10 h-10 flex items-center justify-center">X</button>
                {selectedImage && selectedImage.endsWith('.mp4') ? (
                  <video
                    ref={videoRef}
                    src={selectedImage}
                    className="object-contain max-h-[90vh] w-auto"
                    controls
                    autoPlay
                    loop={false}
                    playsInline
                  />
                ) : (
                  <Image src={selectedImage ?? ''} alt="Selected" width={1200} height={800} className="object-contain max-h-[90vh]" />
                )}
              </div>
        </div>
      )}
    </div>
  );
}