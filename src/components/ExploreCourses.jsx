import './ExploreCourses.css'

import { useMemo, useState } from 'react'

const areas = ['Todas', 'Exatas', 'Humanas', 'Biológicas', 'Tecnologia', 'Artes']

const courses = [
  {
    name: 'Engenharia Civil',
    area: 'Exatas',
    icon: '🏗️',
    description: 'Projeta e constrói pontes, prédios e infraestrutura.',
    duration: '5 anos',
    salary: 'R$ 7.500/mês',
  },
  {
    name: 'Medicina',
    area: 'Biológicas',
    icon: '🩺',
    description: 'Cuida da saúde das pessoas em diversas especialidades.',
    duration: '6 anos',
    salary: 'R$ 14.000/mês',
  },
  {
    name: 'Direito',
    area: 'Humanas',
    icon: '⚖️',
    description: 'Estuda leis e atua na justiça, advocacia e mediação.',
    duration: '5 anos',
    salary: 'R$ 6.000/mês',
  },
  {
    name: 'Psicologia',
    area: 'Humanas',
    icon: '🧠',
    description: 'Estuda o comportamento humano e os processos mentais.',
    duration: '5 anos',
    salary: 'R$ 5.500/mês',
  },
  {
    name: 'Ciência da Computação',
    area: 'Tecnologia',
    icon: '💻',
    description: 'Cria sistemas, aplicativos, algoritmos e soluções digitais.',
    duration: '4 anos',
    salary: 'R$ 8.000/mês',
  },
  {
    name: 'Design',
    area: 'Artes',
    icon: '🎨',
    description: 'Cria soluções visuais, produtos digitais e experiências.',
    duration: '4 anos',
    salary: 'R$ 5.000/mês',
  },
]

export default function ExploreCourses() {
  const [search, setSearch] = useState('')
  const [selectedArea, setSelectedArea] = useState('Todas')

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())

      const matchesArea = selectedArea === 'Todas' || course.area === selectedArea

      return matchesSearch && matchesArea
    })
  }, [search, selectedArea])

  return (
    <main className="explore-page">
      <section className="explore-header">
        <h1>Explore cursos</h1>
        <p>
          Procure por nome ou navegue por área de conhecimento. Cada curso tem uma
          visão geral com duração, salário médio e descrição.
        </p>

        <div className="explore-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder="Buscar curso (ex: medicina, design...)"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="area-filters">
          <span className="filter-label">Área:</span>

          {areas.map((area) => (
            <button
              key={area}
              type="button"
              className={`area-filter ${selectedArea === area ? 'active' : ''}`}
              onClick={() => setSelectedArea(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </section>

      <section className="courses-grid">
        {filteredCourses.map((course) => (
          <article key={course.name} className="course-card">
            <div className="course-card-top">
              <span className="course-icon">{course.icon}</span>
              <span className={`course-area area-${course.area.toLowerCase()}`}>
                {course.area}
              </span>
            </div>

            <h2>{course.name}</h2>
            <p>{course.description}</p>

            <div className="course-info">
              <span>◷ {course.duration}</span>
              <strong>{course.salary}</strong>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}