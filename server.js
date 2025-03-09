const express = require('express'); 
const app = express();
const port = 3000;  


app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

let employees = [];

app.get('/about', (req, res) => {
  res.json({ message: 'About Page' });
});


app.get('/employees', (req, res) => {
  res.json(employees);
});

app.get('/employees/:employee_id', (req, res) => {
  const { employee_id } = req.params;
  const employee = employees.find(emp => emp.employee_id == employee_id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

app.post('/employees', (req, res) => {
  const { employee_id, name, email } = req.body;
  const newEmployee = { employee_id, name, email };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.put('/employees/:employee_id', (req, res) => {
  const { employee_id } = req.params;
  const { name, email } = req.body;
  const updatedEmployee = { employee_id, name, email };
  employees = employees.map(employee =>
    (employee.employee_id == employee_id ? updatedEmployee : employee)
  );
  res.json(updatedEmployee);
});


app.delete('/employees/:employee_id', (req, res) => {
  const { employee_id } = req.params;
  employees = employees.filter(employee => employee.employee_id != employee_id);
  res.status(204).send();
});

app.post('/submit', (req, res) => {
  res.json({ message: 'Form Submitted' });
});
app.put('/update', (req, res) => {
  res.json({ message: 'Update Successful' });
});
app.delete('/delete', (req, res) => {
  res.json({ message: 'Delete Successful' });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
