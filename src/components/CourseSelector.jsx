const coursesMock = [
  { name: "Engenharia Civil", area: "Exatas" },
  { name: "Medicina", area: "Biológicas" },
  { name: "Direito", area: "Humanas" },
  { name: "Psicologia", area: "Humanas" },
]

export default function CourseSelector({ title, onSelect }) {
  return (
    <div className="course-selector">
      <h3>{title}</h3>

      {coursesMock.map((course) => (
        <button
          key={course.name}
          className="course-item"
          onClick={() => onSelect(course)}
        >
          <strong>{course.name}</strong>
          <span>{course.area}</span>
        </button>
      ))}
    </div>
  )
}