import { useState } from 'react';

const GettingStarted = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSummary('');
    setError('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/gettingStarted', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSummary(data.summary);
      } else {
        setError('Error summarizing resume.');
      }
    } catch (error) {
      setError('Error submitting the form.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='resume-parse'>
        <div className="resume-input">
          <h1>Upload Your Resume</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept=".pdf,.docx" required />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="resume-summary">
          <h2>Summary:</h2>
          {summary && <p>{summary}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default GettingStarted;