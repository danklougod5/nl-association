import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Heart, 
  Users, 
  Gift, 
  Phone, 
  ChevronRight, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Target,
  Heart as HandHeart,
  Calendar,
  Quote,
  ArrowUp,
  ArrowRight,
  Send,
  Mail,
  MapPin,
  AlertCircle,
  Menu,
  X
} from 'lucide-react'

// --- Components ---

const ImageWithParallax = ({ src }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <div ref={ref} className="w-full h-[400px] md:h-[550px] rounded-3xl overflow-hidden relative">
      <motion.img 
        style={{ y }}
        src={src} 
        alt="NL Assoc" 
        className="absolute top-0 left-0 w-full h-[120%] object-cover"
      />
    </div>
  )
}

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 bg-white text-text border border-slate-200 rounded-full flex items-center justify-center shadow-xl hover:bg-slate-50 transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      <motion.a
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/2250717873267"
        target="_blank"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl mb-2"
      >
        <MessageCircle size={28} fill="white" />
      </motion.a>
    </div>
  )
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`glass-nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Heart size={22} fill="white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            NL <span className="text-primary">ASSOC.</span>
          </span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          <a href="#about" className="no-underline font-bold text-sm text-white/90 hover:text-primary transition-all">À PROPOS</a>
          <a href="#missions" className="no-underline font-bold text-sm text-white/90 hover:text-primary transition-all">NOS ACTIONS</a>
          <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
          <a href="https://moya-pay.com/p/pl_uz3bd18h" target="_blank" rel="noopener noreferrer" className="btn-primary hover:scale-105 active:scale-95">
            Faire un Don
          </a>
        </div>

        {/* Mobile Burger Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-white p-2"
            >
              <X size={32} />
            </button>
            <a href="#home" onClick={() => setIsOpen(false)} className="text-3xl font-black text-white no-underline">ACCUEIL</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="text-3xl font-black text-white no-underline">À PROPOS</a>
            <a href="#missions" onClick={() => setIsOpen(false)} className="text-3xl font-black text-white no-underline">NOS ACTIONS</a>
            <a href="#don" onClick={() => setIsOpen(false)} className="text-3xl font-black text-white no-underline">CONTACT</a>
            <div className="w-20 h-1 bg-primary rounded-full my-4"></div>
            <a 
              href="https://moya-pay.com/p/pl_uz3bd18h" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary py-4 px-10 text-xl"
            >
              FAIRE UN DON
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Hero = () => (
  <section id="home" className="hero min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-6 py-24 md:py-32 bg-[url('/hero-image.png')] bg-cover bg-center text-white max-w-none">
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 to-slate-900/90 z-10"></div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-20 max-w-5xl px-4"
    >
      <div className="badge inline-flex bg-white/10 backdrop-blur-md text-white border-white/20 px-4 py-2 rounded-full mb-8">
        <HandHeart size={16} />
        <span className="text-sm font-bold">Solidarité & Partage</span>
      </div>
      <h1 className="text-white text-5xl md:text-7xl mb-8 leading-[1.1]">
        Apporter de la <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">Lumière</span> là où l'espoir s'efface
      </h1>
      <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
        Nous sommes une famille engagée pour redonner le sourire aux orphelins et aux plus démunis en Côte d'Ivoire. Chaque geste est une graine d'espoir.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://moya-pay.com/p/pl_uz3bd18h" target="_blank" rel="noopener noreferrer" className="btn-primary py-4 px-10 text-lg">
          <Heart size={20} fill="white" /> FAIRE UN DON
        </a>
        <a href="#don" className="btn-secondary-ghost bg-transparent text-white border border-white/30 px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
          NOUS CONTACTER
        </a>
      </div>
    </motion.div>
  </section>
)

const Stats = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-slate-100">
    <div className="text-left">
      <h3 className="text-3xl md:text-4xl text-primary">+2.5M <span className="text-lg font-bold">CFA</span></h3>
      <p className="text-sm text-text-muted mt-1 uppercase tracking-widest font-bold">Dons récoltés</p>
    </div>
    <div className="text-left">
      <h3 className="text-3xl md:text-4xl text-text">12+</h3>
      <p className="text-sm text-text-muted mt-1 uppercase tracking-widest font-bold">Orphelinats soutenus</p>
    </div>
    <div className="text-left hidden md:block">
      <h3 className="text-3xl md:text-4xl text-text">100%</h3>
      <p className="text-sm text-text-muted mt-1 uppercase tracking-widest font-bold">Impact direct</p>
    </div>
  </div>
)

const Missions = () => {
  const missions = [
    { 
      title: "Soutien aux Orphelinats", 
      desc: "Fourniture de vivres, de kits scolaires et de matériel médical pour assurer le bien-être quotidien des enfants.",
      icon: <Gift className="w-7 h-7" />,
      image: "/mission-orphelinat.jpg",
      size: "bento-big"
    },
    { 
      title: "Éducation & Avenir", 
      desc: "Suivi scolaire complet pour donner à chaque enfant les outils de sa propre réussite.",
      icon: <Users className="w-5 h-5" />,
      size: "bento-small"
    },
    { 
      title: "Soins & Santé", 
      desc: "Assistance médicale d'urgence et campagnes de vaccination.",
      icon: <Target className="w-5 h-5" />,
      size: "bento-small"
    },
    { 
      title: "Action Communautaire", 
      desc: "Organisation d'événements caritatifs annuels (arbres de Noël, dons de la Tabaski).",
      icon: <HandHeart className="w-6 h-6" />,
      size: "bento-medium"
    }
  ]

  return (
    <section id="missions" className="py-32 md:py-56 px-6 max-w-7xl mx-auto">
      <div className="mb-24 md:mb-32">
        <div className="badge"><Users size={16} /> <span>Nos Missions</span></div>
        <h2 className="text-5xl md:text-8xl leading-[0.9] tracking-tighter">Une Action <span className="text-primary">Concrète</span> <br/>sur le Terrain</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {missions.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative group p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:border-primary-light transition-all ${
              m.size === 'bento-big' ? 'md:col-span-2 md:row-span-2' : 
              m.size === 'bento-medium' ? 'md:col-span-2 bg-white' : 'md:col-span-1 bg-white'
            }`}
            style={m.image ? { 
              backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9)), url(${m.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: 'white'
            } : m.size === 'bento-big' ? { backgroundColor: 'var(--color-primary-light)' } : {}}
          >
            <div className={`w-14 h-14 rounded-xl shadow-sm flex items-center justify-center mb-8 ${m.image ? 'bg-white/20 backdrop-blur-md text-white' : 'bg-white text-primary'}`}>
              {m.icon}
            </div>
            <div className="relative z-10">
              <h3 className={`text-2xl mb-4 ${m.image ? 'text-white' : 'text-text'}`}>{m.title}</h3>
              <p className={`text-base ${m.image ? 'text-white/80' : 'text-text-muted/80'}`}>{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const FeaturedProject = () => (
  <section className="py-32 md:py-56 px-6 max-w-[1400px] mx-auto overflow-visible">
    <div className="mb-24 text-center">
      <div className="badge py-2 px-6"><Target size={18} /> <span className="font-bold tracking-widest uppercase">Impact Réel</span></div>
      <h2 className="text-5xl md:text-7xl mt-4">Nos Projets <span className="text-primary font-serif italic text-6xl md:text-8xl block md:inline">en Cours</span></h2>
      <p className="max-w-2xl mx-auto mt-10 text-xl text-text-muted leading-relaxed">Découvrez comment vos dons transforment la réalité sur le terrain à travers nos initiatives majeures.</p>
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className="project-card-glass flex flex-col lg:flex-row rounded-[4rem] overflow-hidden min-h-[650px]"
    >
      <div className="flex-[1.1] relative overflow-hidden group h-[400px] lg:h-auto">
        <img src="/projet-phare.jpg" alt="Projet Phare" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-8 left-8 flex gap-3 z-10">
          <span className="bg-primary text-white text-[10px] uppercase font-black px-4 py-2 rounded-full">Prioritaire</span>
          <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] uppercase font-black px-4 py-2 rounded-full">En Cours</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/30"></div>
      </div>
      
      <div className="flex-[0.9] p-10 md:p-20 flex flex-col justify-center project-info-glass">
        <div className="flex items-center gap-3 text-primary font-black text-sm tracking-widest mb-6 uppercase">
          <div className="w-12 h-[2px] bg-primary"></div>
          Projet Vedette
        </div>
        <h2 className="text-white text-3xl md:text-5xl mb-8 leading-tight">Construction d'un Centre d'Accueil</h2>
        <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed">
          Un havre de paix permanent pour les enfants vulnérables, offrant toit, éducation et chaleur familiale.
        </p>
        
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4 font-bold">
            <span className="text-white/50 text-xs uppercase tracking-widest">Avancement des travaux</span>
            <span className="text-primary text-2xl">45%</span>
          </div>
          <div className="w-full h-[10px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '45%' }}
              transition={{ duration: 2, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            />
          </div>
        </div>
        
        <a href="https://moya-pay.com/p/pl_uz3bd18h" target="_blank" rel="noopener noreferrer" className="btn-white bg-white text-slate-900 px-10 py-5 rounded-full font-black text-base inline-flex items-center gap-4 hover:shadow-2xl transition-all self-start">
          SOUTENIR CE PROJET <ArrowRight size={20} />
        </a>
      </div>
    </motion.div>
  </section>
)

const Testimonials = () => {
  const testimonials = [
    { name: "Mariam K.", role: "Donatrice régulière", text: "L'engagement de NL Association est palpable. On voit concrètement où va chaque franc donné." },
    { name: "Jean-Paul D.", role: "Bénévole", text: "J'ai rejoint l'équipe il y a 2 ans et c'est la meilleure décision de ma vie. L'amour des enfants est notre moteur." },
    { name: "Awa T.", role: "Partenaire Social", text: "Une organisation sérieuse, transparente et surtout extrêmement proche du terrain." },
    { name: "Koffi N.", role: "Donateur", text: "Leur transparence est exemplaire. Les rapports d'activité montrent un impact réel." }
  ]

  const repeatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-24 overflow-hidden bg-white">
      <div className="px-6 mb-16 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl text-center">Ceux qui nous font <span className="text-primary">Confiance</span></h2>
      </div>
      
      <div className="relative">
        <motion.div 
          animate={{ x: [0, -1600] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 w-max"
        >
          {repeatedTestimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="w-[350px] md:w-[400px] bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <Quote className="text-primary mb-6 opacity-20" size={32} fill="currentColor" />
                <p className="italic text-lg text-text leading-relaxed">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center font-black text-primary border border-primary/10">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-extrabold text-sm">{t.name}</p>
                  <p className="text-[10px] text-text-muted flex items-center gap-2 uppercase tracking-widest font-black">
                    <span className="w-2 h-2 rounded-full bg-primary"></span> {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Edge masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  )
}

const ContactSection = () => (
  <section id="don" className="py-24 bg-bg-soft">
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:flex-[0.8]"
      >
        <div className="badge"><MessageCircle size={14} /> <span>Contact</span></div>
        <h2 className="text-5xl md:text-7xl leading-none mb-8">Rejoignez le <span className="italic text-primary block">Mouvement</span></h2>
        <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-12">
          Devenez missionnaire de la lumière ou partenaire. Notre équipe est à votre écoute pour transformer vos intentions en actions.
        </p>
        
        <div className="space-y-10">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-primary-light text-primary rounded-full flex items-center justify-center flex-shrink-0"><Phone size={24} /></div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-black text-text-muted mb-1">Téléphone</h4>
              <p className="text-xl font-black text-text">+225 07 17 873 267</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-primary-light text-primary rounded-full flex items-center justify-center flex-shrink-0"><Mail size={24} /></div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-black text-text-muted mb-1">Email</h4>
              <p className="text-xl font-black text-text">contact@nl-association.org</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:flex-[1.2] bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Nom complet</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all" placeholder="Ex: Nelly" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Email</label>
              <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all" placeholder="votre@email.com" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Sujet</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none">
              <option>Faire un don</option>
              <option>Devenir Bénévole</option>
              <option>Partenariat</option>
              <option>Autre question</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Votre message</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all" rows="4" placeholder="Comment pouvons-nous vous aider ?"></textarea>
          </div>
          <button type="submit" className="w-full bg-primary text-white p-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary-dark transition-all transform hover:-translate-y-1">
            ENVOYER LE MESSAGE <Send size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="bg-text text-white pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
      <div>
        <h3 className="text-2xl mb-8">NL ASSOCIATION</h3>
        <p className="text-white/50 text-base max-w-sm leading-loose">
          Défendre le sourire de chaque enfant, peu importe son histoire. Une famille unie par la solidarité.
        </p>
        <div className="flex gap-4 mt-8">
          <Instagram className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity" size={24} />
          <Facebook className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity" size={24} />
          <MessageCircle className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity" size={24} />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/40">Liens Rapides</h4>
        <ul className="space-y-4 font-bold">
          <li><a href="#home" className="text-white/60 hover:text-primary transition-colors no-underline">Accueil</a></li>
          <li><a href="#about" className="text-white/60 hover:text-primary transition-colors no-underline">À Propos</a></li>
          <li><a href="#missions" className="text-white/60 hover:text-primary transition-colors no-underline">Nos Actions</a></li>
          <li><a href="https://moya-pay.com/p/pl_uz3bd18h" target="_blank" className="text-white/60 hover:text-primary transition-colors no-underline">Faire un Don</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white/40">Contact</h4>
        <p className="text-white/60 mb-2">Abidjan, Côte d'Ivoire</p>
        <p className="text-white font-black">+225 07 17 873 267</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-widest text-white/30">
      &copy; 2026 NL ASSOCIATION. Conçu avec cœur en Côte d'Ivoire.
    </div>
  </footer>
)

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-20 items-center">
        <div>
          <div className="badge"><Users size={16} /> <span>Qui sommes-nous ?</span></div>
          <h2 className="text-4xl md:text-6xl mb-10 leading-tight">
            Plus qu'une Association, <br/><span className="text-primary italic">une Grande Famille</span>
          </h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Fondée en 2022, NL Association a pour mission d'apporter soutien et espoir aux plus démunis. 
            Grâce à vos dons, nous bâtissons une chaîne de solidarité inébranlable.
          </p>
          
          <div className="flex items-start gap-6 mb-12">
            <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center flex-shrink-0"><Calendar size={24} /></div>
            <div>
              <h4 className="font-black text-lg mb-1 italic">4e Édition en Décembre</h4>
              <p className="text-text-muted">Préparez-vous pour notre grand rendez-vous annuel de partage !</p>
            </div>
          </div>

          <Stats />
        </div>

        <div className="mt-16 lg:mt-0 relative group">
          <ImageWithParallax src="/hero-bg.jpg" />
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4 z-20 group-hover:scale-105 transition-transform duration-500">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center"><HandHeart size={24} /></div>
            <div>
              <p className="text-xs font-black text-text-muted mb-1 uppercase tracking-widest">Engagement</p>
              <p className="text-sm font-bold text-text">Vérifié par la communauté</p>
            </div>
          </div>
        </div>
      </section>

      <Missions />
      <FeaturedProject />
      <Testimonials />
      <ContactSection />
      <Footer />
      <FloatingActions />
    </div>
  )
}

export default App
