// Node.js wrapper for Python dosha scoring model
const { PythonShell } = require('python-shell');
const path = require('path');

/**
 * Call Python dosha scoring model
 * @param {Object} assessmentData - Assessment responses
 * @returns {Promise<Object>} - Dosha analysis results
 */
function scoreAssessment(assessmentData) {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, 'doshaScoring.py');
    
    const options = {
      mode: 'text',
      pythonPath: 'python', // Use 'python' for Windows
      pythonOptions: ['-u'], // unbuffered output
      scriptPath: __dirname,
      args: [JSON.stringify(assessmentData)]
    };

    PythonShell.run('doshaScoring.py', options, (err, results) => {
      if (err) {
        console.error('Python execution error:', err);
        reject(new Error('Python execution failed: ' + err.message));
        return;
      }

      try {
        // Parse the JSON result from Python
        const result = JSON.parse(results[0]);
        resolve(result);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        reject(new Error('Failed to parse Python output: ' + parseError.message));
      }
    });
  });
}

module.exports = {
  score_assessment: scoreAssessment
};
