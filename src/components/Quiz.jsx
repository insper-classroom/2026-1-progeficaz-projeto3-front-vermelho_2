import { useState } from 'react'
import { quizQuestions } from '../data/quizQuestions'

const results = {
  exatas: {
    perfil: 'Você tem um perfil analítico, lógico e gosta de resolver problemas.',
    cursos: ['Engenharia', 'Ciência da Computação', 'Sistemas de Informação'],
  },
  humanas: {
    perfil: 'Você tem um perfil comunicativo, reflexivo e gosta de entender pessoas e sociedade.',
    cursos: ['Direito', 'Psicologia', 'Relações Internacionais'],
  },
  biologicas: {
    perfil: 'Você tem um perfil cuidadoso, observador e interessado em saúde, vida e bem-estar.',
    cursos: ['Medicina', 'Biomedicina', 'Enfermagem'],
  },
  criativas: {
    perfil: 'Você tem um perfil criativo, expressivo e gosta de transformar ideias em projetos.',
    cursos: ['Design', 'Publicidade', 'Arquitetura'],
  },
}

export default function Quiz({ onBack }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const currentQuestion = quizQuestions[step]
  const selectedOption = answers[currentQuestion.id]
  const isLastQuestion = step === quizQuestions.length - 1

  const answeredQuestions = Object.keys(answers).length
  const progress = result
    ? 100
    : Math.round((answeredQuestions / quizQuestions.length) * 100)

  function handleSelect(option) {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    })
  }

  function handleNext() {
    if (!selectedOption) return

    if (!isLastQuestion) {
      setStep(step + 1)
      return
    }

    const scores = {
      exatas: 0,
      humanas: 0,
      biologicas: 0,
      criativas: 0,
    }

    Object.values(answers).forEach((answer) => {
      scores[answer.area] += 1
    })

    const bestArea = Object.keys(scores).reduce((best, area) =>
      scores[area] > scores[best] ? area : best
    )

    setResult(results[bestArea])
  }

  function handlePrevious() {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  function resetQuiz() {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    return (
      <main className="quiz-page">
        <section className="quiz-card">
          <p className="quiz-label">Resultado do teste</p>

          <h1>Seu perfil vocacional</h1>

          <p className="quiz-result-text">{result.perfil}</p>

          <h2>Cursos que podem combinar com você:</h2>

          <div className="quiz-course-list">
            {result.cursos.map((course) => (
              <span key={course} className="quiz-course-pill">
                {course}
              </span>
            ))}
          </div>

          <div className="quiz-nav">
            <button type="button" className="button button-secondary" onClick={resetQuiz}>
              Refazer teste
            </button>

            <button type="button" className="button button-primary" onClick={onBack}>
              Voltar para início
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="quiz-page">
      <section className="quiz-card">
        <div className="quiz-progress-header">
          <span>
            Pergunta {step + 1} de {quizQuestions.length}
          </span>
          <strong>{progress}%</strong>
        </div>

        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="quiz-label">Teste vocacional</p>

        <h1>{currentQuestion.question}</h1>

        <div className="quiz-options">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption?.text === option.text

            return (
              <button
                key={option.text}
                type="button"
                className={`quiz-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.text}
              </button>
            )
          })}
        </div>

        <div className="quiz-nav">
          <button
            type="button"
            className="button button-secondary"
            onClick={handlePrevious}
            disabled={step === 0}
          >
            Voltar
          </button>

          <button
            type="button"
            className="button button-primary"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {isLastQuestion ? 'Ver resultado' : 'Próxima'}
          </button>
        </div>
      </section>
    </main>
  )
}