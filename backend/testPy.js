const { PythonShell } = require("python-shell");

PythonShell.run(
  "../ai/advisory_logic.py",
  {
    pythonPath: "../venv/Scripts/python.exe",
    args: ["Cotton", "Loam"],
  },
  (err, results) => {
    console.log("ERROR:", err);
    console.log("RESULTS:", results);
  }
);
