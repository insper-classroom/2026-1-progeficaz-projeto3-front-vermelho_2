import './App.css'
import corujaLogo from './assets/logo.png'

function App() {
  return (
    <div className="page">
      <header className="topbar">
        <div className="brand" aria-label="Vocacionar">
          <img src={corujaLogo} alt="Logo" className="brand-mark" />
          <span className="brand-text">Vocacionar</span>
        </div>

        <nav className="nav" aria-label="Navegacao principal">
          <a href="#teste">Teste vocacional</a>
          <a href="#cursos">Explorar cursos</a>
          <a href="#comparar">Comparar</a>
        </nav>

        <button type="button" className="cta-top">
          Começar agora
        </button>
      </header>

      <main className="hero">
        
        <h1>
            Encontre um curso que combina <span>com você.</span>
            <br />
            
        </h1>

        <p className="hero-copy">
          Faça um teste rápido, explore cursos e compare opções para entender melhor seus interesses e possibilidades.
        </p>

        <div className="hero-actions">
          <a id="teste" className="button button-primary" href="#teste">
            Fazer teste vocacional <span aria-hidden="true">→</span>
          </a>
          <a id="cursos" className="button button-secondary" href="#cursos">
            Explorar cursos
          </a>
        </div>

        <a id="comparar" className="hero-link" href="#comparar">
          ou comparar dois cursos lado a lado <span aria-hidden="true">→</span>
        </a>
      </main>

      <section className="sample-card" aria-label="Previa do site">
        <div className="sample-card-top">
          <div>
            <p className="sample-label">Exemplo visual</p>
            <h2>Interface limpa, acolhedora e direta</h2>
          </div>
          <span className="sample-badge">Base inicial</span>
        </div>

        <div className="sample-grid">
          <article>
            <strong>Teste</strong>
            <p>Perguntas curtas para entender seu perfil.</p>
          </article>
          <article>
            <strong>Cursos</strong>
            <p>Lista com busca e detalhes.</p>
          </article>
          <article>
            <strong>Comparar</strong>
            <p>Dois cursos lado a lado.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default App
