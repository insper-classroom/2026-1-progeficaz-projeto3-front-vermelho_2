import { useMemo, useState } from 'react'
import './App.css'
import corujaLogo from './assets/logo.png'
import Quiz from './components/Quiz'
import Compare from './components/Compare'
import ExploreCourses from './components/ExploreCourses'

const demoCourse = {
  Curso: 'Bacharelado em Dinâmicas de Relacionamento Interpessoal (Como ficar com alguém)',
  Descricao:
    'Este curso oferece uma abordagem acadêmica e prática sobre as complexidades das interações humanas e a conquista afetiva. Os alunos estudam desde a psicologia do desejo até as nuances da comunicação não verbal, aprendendo a criar conexões genuínas e saudáveis. O currículo abrange a gestão de expectativas, a superação da timidez e o desenvolvimento da autoconfiança, capacitando o estudante a navegar com sucesso no complexo cenário dos relacionamentos modernos, sempre pautado no respeito e no consentimento mútuo.',
  Faculdades: [
    {
      Faculdade: 'Academia de Habilidades Sociais',
      Local: 'Campus Sedução',
      Disponibilidade: 'Privado',
      Mensalidade: 'R$ 450,00',
    },
    {
      Faculdade: 'Universidade Federal de Psicologia Aplicada',
      Local: 'Campus Norte',
      Disponibilidade: 'Público',
    },
  ],
  Carreiras: ['Consultor de Relacionamentos', 'Coach de Dating', 'Analista de Comportamento Social'],
  Profissionalizacoes: ['Linguagem Corporal', 'Inteligência Emocional', 'Técnicas de Persuasão Ética'],
}

function App() {
  const [query, setQuery] = useState('')
  const [currentView, setCurrentView] = useState('home')

  const normalizedQuery = useMemo(() => query.trim().toLowerCase(), [query])

  const courseMatches =
    normalizedQuery.length > 0 &&
    (demoCourse.Curso.toLowerCase().includes(normalizedQuery) ||
      demoCourse.Descricao.toLowerCase().includes(normalizedQuery) ||
      demoCourse.Carreiras.some((career) => career.toLowerCase().includes(normalizedQuery)))

  const openCoursePage = () => {
    if (courseMatches || normalizedQuery.length > 0) {
      setCurrentView('course')
    }
  }

  const goHome = () => {
    setCurrentView('home')
    setQuery('')
  }

  const openQuiz = () => {
    setCurrentView('quiz')
  }

  const openExplore = () => {
    setCurrentView('explore')
  }

  const openCompare = () => {
    setCurrentView('compare')
  }

  return (
    <div className="page">
      <header className="topbar">
        <button type="button" className="brand" onClick={goHome} aria-label="Voltar para início">
          <img src={corujaLogo} alt="Logo do Vocacionar" className="brand-mark" />
          <span className="brand-text">Vocacionar</span>
        </button>

        <nav className="nav" aria-label="Navegação principal">
          <a
            href="#teste"
            onClick={(event) => {
              event.preventDefault()
              openQuiz()
            }}
          >
            Teste vocacional
          </a>

          <a
            href="#cursos"
            onClick={(event) => {
              event.preventDefault()
              openExplore()
            }}
          >
            Explorar cursos
          </a>

          <a
            href="#comparar"
            onClick={(event) => {
              event.preventDefault()
              openCompare()
            }}
          >
            Comparar
          </a>
        </nav>
      </header>

      {currentView === 'home' && (
        <main className="hero">
          <p className="hero-kicker">Seu futuro começa com uma escolha mais clara</p>

          <h1>
            Descubra sua carreira ideal <span>em minutos.</span>
          </h1>

          <p className="hero-copy">
            Faça um teste rápido, explore cursos e compare opções para tomar uma decisão com mais
            confiança sobre seu futuro acadêmico.
          </p>

          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={openQuiz}>
              Descobrir minha carreira <span aria-hidden="true">→</span>
            </button>

            <button type="button" className="button button-secondary" onClick={openExplore}>
              Explorar cursos
            </button>
          </div>

          <div className="hero-search" aria-label="Buscar curso">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Buscar curso, área ou carreira..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  openCoursePage()
                }
              }}
            />

            <button type="button" className="search-submit" onClick={openCoursePage}>
              Buscar
            </button>
          </div>

          <button type="button" className="compare-link" onClick={openCompare}>
            ou comparar dois cursos lado a lado <span aria-hidden="true">→</span>
          </button>

          <section className="steps" aria-label="Como funciona">
            <article className="step">
              <span className="step-icon">🧠</span>
              <h3>Teste</h3>
              <p>Responda perguntas rápidas para entender seu perfil.</p>
            </article>

            <article className="step">
              <span className="step-icon">🔎</span>
              <h3>Explore</h3>
              <p>Veja cursos, áreas, duração e salário médio.</p>
            </article>

            <article className="step">
              <span className="step-icon">⚖️</span>
              <h3>Compare</h3>
              <p>Compare opções lado a lado antes de decidir.</p>
            </article>
          </section>
        </main>
      )}

      {currentView === 'quiz' && <Quiz onBack={goHome} />}

      {currentView === 'explore' && <ExploreCourses />}

      {currentView === 'compare' && <Compare />}

      {currentView === 'course' && (
        <main className="course-page">
          <section className="course-hero card-panel">
            <h1>{demoCourse.Curso}</h1>
            <p>{demoCourse.Descricao}</p>
          </section>

          <section className="course-layout">
            <article className="card-panel">
              <h2>Faculdades</h2>

              <div className="faculty-list">
                {demoCourse.Faculdades.map((faculty) => (
                  <div key={`${faculty.Faculdade}-${faculty.Local}`} className="faculty-card">
                    <strong>{faculty.Faculdade}</strong>
                    <span>{faculty.Local}</span>
                    <span>{faculty.Disponibilidade}</span>
                    {faculty.Mensalidade && <span>{faculty.Mensalidade}</span>}
                  </div>
                ))}
              </div>
            </article>

            <article className="card-panel">
              <h2>Carreiras</h2>

              <ul className="detail-list">
                {demoCourse.Carreiras.map((career) => (
                  <li key={career}>{career}</li>
                ))}
              </ul>
            </article>

            <article className="card-panel">
              <h2>Profissionalizações</h2>

              <ul className="detail-list">
                {demoCourse.Profissionalizacoes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </section>

          <button type="button" className="back-button" onClick={goHome}>
            Voltar para a página inicial
          </button>
        </main>
      )}
    </div>
  )
}

export default App