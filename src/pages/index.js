import Head from 'next/head';
import { useState, useEffect } from 'react';
import { getPageContent, getAllContent } from '../utils/content';

export async function getStaticProps() {
  const page = getPageContent('content/pages/index.json');
  const associations = getAllContent('content/data/associations').sort((a, b) => (a.order || 0) - (b.order || 0));
  const evenements = getAllContent('content/data/evenements').sort((a, b) => new Date(a.date) - new Date(b.date));
  return { props: { page, associations, evenements } };
}

export default function Home({ page, associations, evenements }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = ['Accueil', 'Le collectif', 'Associations', 'Agenda', 'Contact'];

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const badgeStyle = (type) => {
    if (type === 'mobilisation') return { background: 'rgba(230,57,70,0.15)', color: '#E63946' };
    if (type === 'culture') return { background: 'rgba(42,157,143,0.15)', color: '#2A9D8F' };
    if (type === 'formation') return { background: 'rgba(69,123,157,0.15)', color: '#457B9D' };
    return { background: 'rgba(168,162,158,0.15)', color: '#A8A29E' };
  };

  const badgeLabel = (type) => {
    const labels = { mobilisation: 'Mobilisation', culture: 'Culture', formation: 'Formation', reunion: 'Réunion' };
    return labels[type] || type;
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.heroSubtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl' : ''}`}>
        <a href="#accueil" className="font-mono text-sm font-bold tracking-widest">
          <span className="text-red-militant">8</span> MARS 49
        </a>
        <ul className="hidden md:flex gap-8 items-center list-none">
          {navItems.map(item => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="nav-link font-mono text-xs tracking-[0.15em] uppercase text-cream pb-2 hover:text-red-militant">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-cream text-2xl bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0A0A0A]/97 z-[100] flex flex-col justify-center items-center gap-8">
          {navItems.map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} onClick={() => setMenuOpen(false)}
              className="font-mono text-lg tracking-[0.15em] uppercase text-cream hover:text-red-militant">
              {item}
            </a>
          ))}
        </div>
      )}

      <main data-sb-object-id="content/pages/index.json">

        {/* HERO */}
        <section id="accueil" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(230,57,70,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(155,34,38,0.1)_0%,transparent_50%),radial-gradient(ellipse_at_50%_80%,rgba(244,162,97,0.08)_0%,transparent_50%)]" />
          <div className="relative z-10">
            <div className="font-mono text-xs tracking-[0.3em] uppercase text-red-militant mb-8 animate-fade-up animate-fade-up-1">
              Collectif féministe · Angers
            </div>
            <h1 className="font-serif font-bold leading-[1.05] max-w-[900px] text-[clamp(2.5rem,8vw,6rem)] animate-fade-up animate-fade-up-2" data-sb-field-path="heroTagline">
              Nos droits<br />ne sont <span className="text-red-militant">jamais</span><br />acquis.
            </h1>
            <p className="font-sans text-[clamp(1rem,2.5vw,1.3rem)] text-muted mt-6 max-w-[600px] leading-relaxed animate-fade-up animate-fade-up-3" data-sb-field-path="heroSubtitle">
              {page.heroSubtitle}
            </p>
            <div className="mt-10 flex gap-4 flex-wrap justify-center animate-fade-up animate-fade-up-4">
              <a href="#agenda" className="btn-primary inline-block bg-red-militant text-white font-mono text-xs tracking-[0.15em] uppercase px-9 py-4 rounded-md">
                Prochains événements
              </a>
              <a href="#le-collectif" className="btn-outline inline-block bg-transparent text-cream border border-dark-borderLight font-mono text-xs tracking-[0.15em] uppercase px-7 py-3 rounded-md">
                Qui sommes-nous
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.2em] opacity-40 animate-bounce-scroll">↓</div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-borderLight to-transparent" />

        {/* LE COLLECTIF */}
        <section id="le-collectif" className="max-w-[1100px] mx-auto py-24 px-6">
          <h2 className="font-serif font-bold text-[clamp(1.8rem,4vw,3rem)] mb-4 inline-block">
            Le collectif
            <span className="block w-[60px] h-1 bg-red-militant mt-3" />
          </h2>
          <p className="font-sans text-lg text-muted max-w-[650px] leading-relaxed mb-12" data-sb-field-path="collectifDescription">
            {page.collectifDescription}
          </p>

          <div className="bg-dark-card border-l-4 border-red-militant p-12 rounded-r-xl mb-12">
            <p className="font-serif text-lg leading-[1.8] italic text-[#D6D3D1]" data-sb-field-path="manifesto">
              {page.manifesto}
            </p>
          </div>

          <div className="flex gap-12 flex-wrap">
            <div className="text-center">
              <div className="font-mono text-[2.5rem] font-bold text-red-militant">{associations.length}</div>
              <div className="font-sans text-xs text-dim uppercase tracking-[0.1em] mt-1">Organisations membres</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-[2.5rem] font-bold text-red-militant" data-sb-field-path="statManifestants">{page.statManifestants}</div>
              <div className="font-sans text-xs text-dim uppercase tracking-[0.1em] mt-1">Manifestant·es en nov. 2025</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-[2.5rem] font-bold text-red-militant">49</div>
              <div className="font-sans text-xs text-dim uppercase tracking-[0.1em] mt-1">Maine-et-Loire</div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-borderLight to-transparent" />

        {/* ASSOCIATIONS */}
        <section id="associations" className="max-w-[1100px] mx-auto py-24 px-6">
          <h2 className="font-serif font-bold text-[clamp(1.8rem,4vw,3rem)] mb-4 inline-block">
            Nos organisations
            <span className="block w-[60px] h-1 bg-red-militant mt-3" />
          </h2>
          <p className="font-sans text-lg text-muted max-w-[650px] leading-relaxed mb-12">
            Associations, collectifs et syndicats uni·es par un même combat pour les droits des femmes et l'égalité.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {associations.map((a) => (
              <div key={a._slug} className="assoc-card relative overflow-hidden bg-dark-card border border-dark-border rounded-xl p-8"
                style={{ '--accent-color': a.color }}
                data-sb-object-id={`content/data/associations/${a._slug}.json`}>
                <div className="text-3xl mb-4" data-sb-field-path="icon">{a.icon}</div>
                <div className="font-mono text-sm font-bold tracking-[0.05em] mb-3" data-sb-field-path="name">{a.name}</div>
                <div className="font-sans text-sm text-dim leading-relaxed" data-sb-field-path="description">{a.description}</div>
                {a.url && (
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-red-militant hover:text-red-dark">
                    Voir le site →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-borderLight to-transparent" />

        {/* AGENDA */}
        <section id="agenda" className="max-w-[1100px] mx-auto py-24 px-6">
          <h2 className="font-serif font-bold text-[clamp(1.8rem,4vw,3rem)] mb-4 inline-block">
            Agenda
            <span className="block w-[60px] h-1 bg-red-militant mt-3" />
          </h2>
          <p className="font-sans text-lg text-muted max-w-[650px] leading-relaxed mb-12">
            Les prochains rendez-vous du collectif. Rejoignez-nous dans la rue, dans les salles, partout où les droits des femmes se défendent.
          </p>
          <div>
            {evenements.map((ev) => (
              <div key={ev._slug} className="event-card flex flex-col md:flex-row gap-4 md:gap-8 py-8 border-b border-[#1C1C1C] items-start"
                data-sb-object-id={`content/data/evenements/${ev._slug}.json`}>
                <div className="font-mono text-xs text-red-militant tracking-[0.1em] uppercase min-w-[130px] pt-1" data-sb-field-path="date">
                  {formatDate(ev.date)}
                </div>
                <div>
                  {ev.type_evenement && (
                    <span className="inline-block font-mono text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-2"
                      style={badgeStyle(ev.type_evenement)} data-sb-field-path="type_evenement">
                      {badgeLabel(ev.type_evenement)}
                    </span>
                  )}
                  <div className="font-serif text-xl font-bold mb-2" data-sb-field-path="title">{ev.title}</div>
                  <div className="font-sans text-sm text-dim leading-relaxed" data-sb-field-path="description">{ev.description}</div>
                  {ev.lieu && (
                    <div className="font-sans text-xs text-dim italic mt-1" data-sb-field-path="lieu">📍 {ev.lieu}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-borderLight to-transparent" />

        {/* CONTACT */}
        <section id="contact" className="max-w-[1100px] mx-auto py-24 px-6">
          <h2 className="font-serif font-bold text-[clamp(1.8rem,4vw,3rem)] mb-4 inline-block">
            Contact
            <span className="block w-[60px] h-1 bg-red-militant mt-3" />
          </h2>
          <p className="font-sans text-lg text-muted max-w-[650px] leading-relaxed mb-12" data-sb-field-path="contactText">
            {page.contactText}
          </p>
          <div className="max-w-[500px]">
            <form name="contact" method="POST" data-netlify="true" netlifyHoneypot="bot-field">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden"><input name="bot-field" /></p>
              <input className="form-field w-full bg-dark-card border border-dark-border rounded-lg px-5 py-4 text-cream font-sans text-sm mb-4 placeholder:text-[#555]"
                type="text" name="name" placeholder="Votre nom ou organisation" required />
              <input className="form-field w-full bg-dark-card border border-dark-border rounded-lg px-5 py-4 text-cream font-sans text-sm mb-4 placeholder:text-[#555]"
                type="email" name="email" placeholder="Votre email" required />
              <textarea className="form-field w-full bg-dark-card border border-dark-border rounded-lg px-5 py-4 text-cream font-sans text-sm mb-4 placeholder:text-[#555] resize-y"
                name="message" rows={5} placeholder="Votre message..." required />
              <button type="submit" className="btn-primary bg-red-militant text-white font-mono text-xs tracking-[0.15em] uppercase px-9 py-4 rounded-md border-none cursor-pointer">
                Envoyer
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#1C1C1C] py-12 px-6 text-center font-sans text-sm text-[#555]">
        <div className="font-mono text-xs mb-2">
          <span className="text-red-militant">8</span> MARS 49
        </div>
        <div>Collectif féministe · Angers · Maine-et-Loire</div>
        <div className="mt-2 text-xs text-dark-borderLight">
          Contre les violences sexistes et sexuelles — Pour l'égalité
        </div>
      </footer>
    </>
  );
}
