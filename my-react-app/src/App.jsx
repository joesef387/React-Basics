import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const nextStudentId = useRef(1);

  function handleSubmit(event) {
    event.preventDefault();

    const studentName = name.trim();
    const studentCourse = course.trim();

    if (!studentName || !studentCourse) {
      setError('Please enter both a student name and a course.');
      return;
    }

    setStudents((currentStudents) => [
      ...currentStudents,
      {
        id: nextStudentId.current++,
        name: studentName,
        course: studentCourse,
      },
    ]);
    setName('');
    setCourse('');
    setError('');
  }

  function handleDelete(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-content">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span className="brand-name">Student Portal</span>
        </div>
      </header>

      <main className="page-content">
        <section className="welcome">
          <p className="eyebrow">REGISTRATION</p>
          <h1>Student Registration</h1>
          <p className="welcome-copy">
            Add students to your course roster and keep track of registrations.
          </p>
        </section>

        <div className="content-grid">
          <section className="panel form-panel" aria-labelledby="form-heading">
            <div className="panel-heading">
              <span className="section-icon" aria-hidden="true">
                +
              </span>
              <div>
                <h2 id="form-heading">Register a student</h2>
                <p>Enter the student details below.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="student-name">Student name</label>
                <input
                  id="student-name"
                  name="studentName"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError('');
                  }}
                  placeholder="e.g. Alex Johnson"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="student-course">Course</label>
                <input
                  id="student-course"
                  name="course"
                  type="text"
                  value={course}
                  onChange={(event) => {
                    setCourse(event.target.value);
                    setError('');
                  }}
                  placeholder="e.g. Introduction to React"
                  required
                />
              </div>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button className="submit-button" type="submit">
                Register student
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </section>

          <section className="panel roster-panel" aria-labelledby="roster-heading">
            <div className="roster-heading">
              <div className="panel-heading">
                <span className="section-icon roster-icon" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h2 id="roster-heading">Registered students</h2>
                  <p>Your current course roster.</p>
                </div>
              </div>
              <span className="student-count" aria-label={`${students.length} students`}>
                {students.length}
              </span>
            </div>

            {students.length === 0 ? (
              <div className="empty-state" aria-live="polite">
                <span className="empty-icon" aria-hidden="true">
                  ☷
                </span>
                <h3>No students yet</h3>
                <p>Registered students will appear here.</p>
              </div>
            ) : (
              <ul className="student-list" aria-live="polite">
                {students.map((student) => (
                  <li className="student-card" key={student.id}>
                    <span className="student-avatar" aria-hidden="true">
                      {student.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="student-details">
                      <h3>{student.name}</h3>
                      <p>{student.course}</p>
                    </div>
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => handleDelete(student.id)}
                      aria-label={`Delete ${student.name}`}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <footer className="page-footer">Student Registration App</footer>
      </main>
    </div>
  );
}

export default App;
