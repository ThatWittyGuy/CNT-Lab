// import React, { useState } from 'react';

// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost';

// const initialMarks = {
//   sub1_mid: '', sub1_end: '',
//   sub2_mid: '', sub2_end: '',
//   sub3_mid: '', sub3_end: '',
//   sub4_mid: '', sub4_end: ''
// };

// export default function App() {
//   const [studentName, setStudentName] = useState('');
//   const [marks, setMarks] = useState(initialMarks);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     // allow empty or integer numbers up to 50
//     if (value === '' || (/^\d{1,3}$/.test(value) && Number(value) <= 50)) {
//       setMarks(prev => ({ ...prev, [name]: value }));
//     }
//   }

//   function validateInputs() {
//     if (!studentName.trim()) return 'Please enter student name';
//     for (const key of Object.keys(marks)) {
//       const v = marks[key];
//       if (v === '') return 'Please fill all marks';
//       const n = Number(v);
//       if (isNaN(n) || n < 0 || n > 50) return 'Marks must be numbers between 0 and 50';
//     }
//     return null;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError('');
//     setResult(null);

//     const err = validateInputs();
//     if (err) { setError(err); return; }

//     const payload = {
//       student_name: studentName,
//       ...Object.fromEntries(Object.entries(marks).map(([k, v]) => [k, Number(v)]))
//     };

//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE}/result_api/save_result.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();
//       setLoading(false);
//       if (!res.ok) {
//         setError(data?.error || 'Server error');
//         return;
//       }
//       // data contains sub1..sub4, avg_percentage, cgpa
//       setResult(data);
//     } catch (err) {
//       setLoading(false);
//       setError('Network error: ' + err.message);
//     }
//   }

//   // local computation (same formula as backend)
//   function computeLocally() {
//     const compute = (m, e) => ((Number(m) / 50.0) * 30.0 + (Number(e) / 50.0) * 70.0);
//     const s1 = compute(marks.sub1_mid, marks.sub1_end);
//     const s2 = compute(marks.sub2_mid, marks.sub2_end);
//     const s3 = compute(marks.sub3_mid, marks.sub3_end);
//     const s4 = compute(marks.sub4_mid, marks.sub4_end);
//     const avg = (s1 + s2 + s3 + s4) / 4.0;
//     const cgpa = avg / 10.0;
//     return {
//       per: [s1, s2, s3, s4].map(x => Number(x.toFixed(2))),
//       avg: Number(avg.toFixed(2)),
//       cgpa: Number(cgpa.toFixed(2))
//     };
//   }

//   const local = (marks.sub1_mid !== '') ? computeLocally() : null;

//   return (
//     <div className="container">
//       <h1>College Result Calculator</h1>
//       <p className="small">Enter marks (Mid out of 50, End out of 50). Mid = 30%, End = 70%.</p>

//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 12 }}>
//           <div className="label">Student Name</div>
//           <input className="input" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="e.g., John Doe" />
//         </div>

//         <div className="form-grid">
//           {['1','2','3','4'].map(num => (
//             <React.Fragment key={num}>
//               <div>
//                 <div className="label">Subject {num} Midsem (max 50)</div>
//                 <input
//                   className="input"
//                   name={`sub${num}_mid`}
//                   type="number"
//                   min="0"
//                   max="50"
//                   step="1"
//                   value={marks[`sub${num}_mid`]}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <div className="label">Subject {num} Endsem (max 50)</div>
//                 <input
//                   className="input"
//                   name={`sub${num}_end`}
//                   type="number"
//                   min="0"
//                   max="50"
//                   step="1"
//                   value={marks[`sub${num}_end`]}
//                   onChange={handleChange}
//                 />
//               </div>
//             </React.Fragment>
//           ))}
//         </div>

//         {error && <div className="error">{error}</div>}

//         <div style={{ marginTop: 12 }}>
//           <button className="button" type="submit" disabled={loading}>
//             {loading ? 'Calculating...' : 'Calculate & Save'}
//           </button>
//         </div>
//       </form>

//       <div className="results">
//         {local && (
//           <>
//             <h3>Local Preview</h3>
//             <table className="table">
//               <thead>
//                 <tr><th>Sub 1</th><th>Sub 2</th><th>Sub 3</th><th>Sub 4</th><th>Avg %</th><th>CGPA</th></tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{local.per[0]}</td>
//                   <td>{local.per[1]}</td>
//                   <td>{local.per[2]}</td>
//                   <td>{local.per[3]}</td>
//                   <td>{local.avg}</td>
//                   <td>{local.cgpa}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </>
//         )}

//         {result && (
//           <div style={{ marginTop: 14 }}>
//             <h3>Saved Result</h3>
//             <div className="success">Saved as ID: {result.id}</div>
//             <div className="small">
//               <strong>Server values:</strong>
//             </div>
//             <table className="table" style={{marginTop:8}}>
//               <thead>
//                 <tr><th>Sub1</th><th>Sub2</th><th>Sub3</th><th>Sub4</th><th>Avg %</th><th>CGPA</th></tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{Number(result.sub1).toFixed(2)}</td>
//                   <td>{Number(result.sub2).toFixed(2)}</td>
//                   <td>{Number(result.sub3).toFixed(2)}</td>
//                   <td>{Number(result.sub4).toFixed(2)}</td>
//                   <td>{Number(result.avg_percentage).toFixed(2)}</td>
//                   <td>{Number(result.cgpa).toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost';

const initialMarks = {
  sub1_mid: '', sub1_end: '',
  sub2_mid: '', sub2_end: '',
  sub3_mid: '', sub3_end: '',
  sub4_mid: '', sub4_end: ''
};

export default function App() {
  const [studentName, setStudentName] = useState('');
  const [marks, setMarks] = useState(initialMarks);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    // allow empty or integer numbers up to 50
    if (value === '' || (/^\d{1,3}$/.test(value) && Number(value) <= 50)) {
      setMarks(prev => ({ ...prev, [name]: value }));
    }
  }

  function validateInputs() {
    if (!studentName.trim()) return 'Please enter student name';
    for (const key of Object.keys(marks)) {
      const v = marks[key];
      if (v === '') return 'Please fill all marks';
      const n = Number(v);
      if (isNaN(n) || n < 0 || n > 50) return 'Marks must be numbers between 0 and 50';
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setResult(null);

    const err = validateInputs();
    if (err) { setError(err); return; }

    const payload = {
      student_name: studentName,
      ...Object.fromEntries(Object.entries(marks).map(([k, v]) => [k, Number(v)]))
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/result_api/save_result.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data?.error || 'Server error');
        return;
      }
      // data contains sub1..sub4, avg_percentage, cgpa
      setResult({ ...data, student_name: studentName });
    } catch (err) {
      setLoading(false);
      setError('Network error: ' + err.message);
    }
  }

  // local computation (same formula as backend)
  function computeLocally() {
    const compute = (m, e) => ((Number(m) / 50.0) * 30.0 + (Number(e) / 50.0) * 70.0);
    const s1 = compute(marks.sub1_mid, marks.sub1_end);
    const s2 = compute(marks.sub2_mid, marks.sub2_end);
    const s3 = compute(marks.sub3_mid, marks.sub3_end);
    const s4 = compute(marks.sub4_mid, marks.sub4_end);
    const avg = (s1 + s2 + s3 + s4) / 4.0;
    const cgpa = avg / 10.0;
    return {
      per: [s1, s2, s3, s4].map(x => Number(x.toFixed(2))),
      avg: Number(avg.toFixed(2)),
      cgpa: Number(cgpa.toFixed(2))
    };
  }

  const local = (marks.sub1_mid !== '') ? computeLocally() : null;

  // PDF generation
  const generateCertificate = () => {
    const cert = document.getElementById('certificate');
    if (!cert) return;
    html2canvas(cert).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${result.student_name}_Result_Certificate.pdf`);
    });
  };

  return (
    <div className="container">
      <h1>College Result Calculator</h1>
      <p className="small">Enter marks (Mid out of 50, End out of 50). Mid = 30%, End = 70%.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <div className="label">Student Name</div>
          <input className="input" value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="e.g., John Doe" />
        </div>

        <div className="form-grid">
          {['1','2','3','4'].map(num => (
            <React.Fragment key={num}>
              <div>
                <div className="label">Subject {num} Midsem (max 50)</div>
                <input
                  className="input"
                  name={`sub${num}_mid`}
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  value={marks[`sub${num}_mid`]}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="label">Subject {num} Endsem (max 50)</div>
                <input
                  className="input"
                  name={`sub${num}_end`}
                  type="number"
                  min="0"
                  max="50"
                  step="1"
                  value={marks[`sub${num}_end`]}
                  onChange={handleChange}
                />
              </div>
            </React.Fragment>
          ))}
        </div>

        {error && <div className="error">{error}</div>}

        <div style={{ marginTop: 12 }}>
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate & Save'}
          </button>
        </div>
      </form>

      <div className="results">
        {local && (
          <>
            <h3>Local Preview</h3>
            <table className="table">
              <thead>
                <tr><th>Sub 1</th><th>Sub 2</th><th>Sub 3</th><th>Sub 4</th><th>Avg %</th><th>CGPA</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{local.per[0]}</td>
                  <td>{local.per[1]}</td>
                  <td>{local.per[2]}</td>
                  <td>{local.per[3]}</td>
                  <td>{local.avg}</td>
                  <td>{local.cgpa}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {result && (
          <div style={{ marginTop: 14 }}>
            <h3>Saved Result</h3>
            <div className="success">Saved as ID: {result.id}</div>
            <div className="small">
              <strong>Server values:</strong>
            </div>
            <table className="table" style={{marginTop:8}}>
              <thead>
                <tr><th>Sub1</th><th>Sub2</th><th>Sub3</th><th>Sub4</th><th>Avg %</th><th>CGPA</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{Number(result.sub1).toFixed(2)}</td>
                  <td>{Number(result.sub2).toFixed(2)}</td>
                  <td>{Number(result.sub3).toFixed(2)}</td>
                  <td>{Number(result.sub4).toFixed(2)}</td>
                  <td>{Number(result.avg_percentage).toFixed(2)}</td>
                  <td>{Number(result.cgpa).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Certificate Section */}
            <div id="certificate" style={{marginTop:20, padding:20, border:"2px solid black", textAlign:"center", background:"white"}}>
              <h2>🏛️ ABC College of Engineering</h2>
              <h3>Certificate of Result</h3>
              <p>This is to certify that</p>
              <h2>{result.student_name}</h2>
              <p>has successfully completed the examinations with the following scores:</p>

              <table className="table" style={{margin:"20px auto", width:"80%"}}>
                <thead>
                  <tr><th>Subject</th><th>Final %</th></tr>
                </thead>
                <tbody>
                  <tr><td>Subject 1</td><td>{Number(result.sub1).toFixed(2)}</td></tr>
                  <tr><td>Subject 2</td><td>{Number(result.sub2).toFixed(2)}</td></tr>
                  <tr><td>Subject 3</td><td>{Number(result.sub3).toFixed(2)}</td></tr>
                  <tr><td>Subject 4</td><td>{Number(result.sub4).toFixed(2)}</td></tr>
                </tbody>
              </table>

              <h3>Average Percentage: {Number(result.avg_percentage).toFixed(2)}%</h3>
              <h3>CGPA: {Number(result.cgpa).toFixed(2)} / 10</h3>

              <p style={{marginTop:30}}>
                __________________________ <br />
                Principal, ABC College
              </p>
            </div>

            <button onClick={generateCertificate} className="button" style={{marginTop:20}}>
              Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
