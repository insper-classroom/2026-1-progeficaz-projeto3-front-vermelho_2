import { useMemo, useState } from 'react'
import './App.css'
import corujaLogo from './assets/logo.png'
import Quiz from './components/Quiz'
import Compare from './components/Compare'

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
  const [showSearch, setShowSearch] = useState(false)
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
      setShowSearch(false)
    }
  }

  const goHome = () => {
    setCurrentView('home')
    setQuery('')
    setShowSearch(false)
  }

  const openQuiz = () => {
    setCurrentView('quiz')
    setShowSearch(false)
  }

  const openCompare = () => {
    setCurrentView('compare')
    setShowSearch(false)
  }

  return (
    <div className="page">
      <header className="topbar">
        <button type="button" className="brand" onClick={goHome} aria-label="Voltar para início">
          <img src={corujaLogo} alt="Logo" className="brand-mark" />
          <span className="brand-text">Vocacionar</span>
        </button>

        <nav className="nav" aria-label="Navegacao principal">
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
              goHome()
              setShowSearch(true)
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

        <div className="search-shell">
          {showSearch && (
            <input
              autoFocus
              type="text"
              className="search-input"
              placeholder="Digite um curso"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  openCoursePage()
                }
              }}
            />
          )}

          <button
            type="button"
            className="search-button"
            aria-label="Pesquisar curso"
            onClick={() => {
              if (showSearch) {
                openCoursePage()
                return
              }

              setShowSearch(true)
            }}
          >
            <span aria-hidden="true">⌕</span>
          </button>
        </div>
      </header>

      {currentView === 'home' && (
        <main className="hero">
          <h1>
            Encontre um curso que combina <span>com você.</span>
          </h1>

          <p className="hero-copy">
            Descubra cursos e carreiras ideais com testes vocacionais, comparação entre opções e
            informações claras para ajudar você a decidir com mais confiança.
          </p>

          <div className="hero-actions">
            <button type="button" id="teste" className="button button-primary" onClick={openQuiz}>
              Fazer teste vocacional <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              id="cursos"
              className="button button-secondary"
              onClick={() => setShowSearch(true)}
            >
              Explorar cursos
            </button>
          </div>

          <button type="button" id="comparar" className="hero-link" onClick={openCompare}>
            ou comparar dois cursos lado a lado <span aria-hidden="true">→</span>
          </button>
        </main>
      )}

      {currentView === 'quiz' && <Quiz onBack={goHome} />}

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