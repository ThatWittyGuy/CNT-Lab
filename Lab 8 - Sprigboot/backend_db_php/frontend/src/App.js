import React, { useState, useEffect } from "react";

function App() {
  const [studentName, setStudentName] = useState("");
  const [marks, setMarks] = useState({
    subject1_midsem: "",
    subject1_endsem: "",
    subject2_midsem: "",
    subject2_endsem: "",
    subject3_midsem: "",
    subject3_endsem: "",
    subject4_midsem: "",
    subject4_endsem: ""
  });

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/get_results.php")
      .then(res => res.json())
      .then(data => setResults(data));
  }, []);

  const handleChange = (e) => {
    setMarks({ ...marks, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentName) {
      alert("Enter student name");
      return;
    }

    for (let key in marks) {
      const val = marks[key];
      if (val === "" || val < 0 || val > 100) {
        alert("Enter valid marks between 0 and 100");
        return;
      }
    }

    const dataToSend = { student_name: studentName };
    for (let key in marks) dataToSend[key] = parseFloat(marks[key]);

    fetch("http://localhost:8000/save_result.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    })
      .then(res => res.json())
      .then(() => {
        setStudentName("");
        setMarks({
          subject1_midsem: "",
          subject1_endsem: "",
          subject2_midsem: "",
          subject2_endsem: "",
          subject3_midsem: "",
          subject3_endsem: "",
          subject4_midsem: "",
          subject4_endsem: ""
        });
        return fetch("http://localhost:8000/get_results.php");
      })
      .then(res => res.json())
      .then(data => setResults(data));
  };

  const calculateCGPA = (result) => {
    const subjects = [1, 2, 3, 4];
    let totalWeightedMarks = 0;
    for (let sub of subjects) {
      const mid = parseFloat(result[`subject${sub}_midsem`]);
      const end = parseFloat(result[`subject${sub}_endsem`]);
      totalWeightedMarks += (mid * 0.3) + (end * 0.7);
    }
    const avgPercent = totalWeightedMarks / subjects.length;
    return (avgPercent / 10).toFixed(2);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>College Result Calculator</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name: </label>
          <input
            type="text"
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            required
          />
        </div>

        {[1, 2, 3, 4].map(num => (
          <div key={num} style={{ marginTop: 10 }}>
            <h4>Subject {num}</h4>
            <label>Midsem (30% weight): </label>
            <input
              type="number"
              name={`subject${num}_midsem`}
              value={marks[`subject${num}_midsem`]}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
            <br />
            <label>Endsem (70% weight): </label>
            <input
              type="number"
              name={`subject${num}_endsem`}
              value={marks[`subject${num}_endsem`]}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>
        ))}

        <br />
        <button type="submit">Save Result</button>
      </form>

      <h3>Saved Results</h3>
      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Student</th>
            {[1, 2, 3, 4].map(num => (
              <th key={`midhead${num}`}>Sub{num} Mid</th>
            ))}
            {[1, 2, 3, 4].map(num => (
              <th key={`endhead${num}`}>Sub{num} End</th>
            ))}
            <th>CGPA</th>
          </tr>
        </thead>
        <tbody>
          {results.map(res => (
            <tr key={res.id}>
              <td>{res.student_name}</td>
              {[1, 2, 3, 4].map(num => (
                <td key={`mid${num}`}>{res[`subject${num}_midsem`]}</td>
              ))}
              {[1, 2, 3, 4].map(num => (
                <td key={`end${num}`}>{res[`subject${num}_endsem`]}</td>
              ))}
              <td>{calculateCGPA(res)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
