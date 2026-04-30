export default function ComparisonTable({ courseA, courseB }) {
  return (
    <div className="compare-table">
      <div className="compare-header">
        <div></div>
        <div>{courseA.name}</div>
        <div>{courseB.name}</div>
      </div>

      <div className="compare-row">
        <span>Área</span>
        <span>{courseA.area}</span>
        <span>{courseB.area}</span>
      </div>

      <div className="compare-row">
        <span>Duração</span>
        <span>5 anos</span>
        <span>6 anos</span>
      </div>

      <div className="compare-row">
        <span>Salário médio</span>
        <span>R$ 7.000</span>
        <span>R$ 12.000</span>
      </div>
    </div>
  )
}