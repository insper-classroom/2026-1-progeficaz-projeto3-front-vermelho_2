import { useState } from "react"
import CourseSelector from "./CourseSelector"
import ComparisonTable from "./ComparisonTable"

export default function Compare() {
  const [courseA, setCourseA] = useState(null)
  const [courseB, setCourseB] = useState(null)

  return (
    <main className="compare-page">
      <h1>Compare cursos lado a lado</h1>
      <p>Escolha dois cursos para ver diferenças</p>

      <div className="compare-selectors">
        <CourseSelector title="Curso A" onSelect={setCourseA} selectedCourse={courseA} />
        <CourseSelector title="Curso B" onSelect={setCourseB} selectedCourse={courseB} />
      </div>

      {!courseA || !courseB ? (
        <div className="compare-empty">
          <p>Selecione 2 cursos para comparar</p>
        </div>
      ) : (
        <ComparisonTable courseA={courseA} courseB={courseB} />
      )}
    </main>
  )
}