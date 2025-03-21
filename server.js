/*const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const DATA_FILE = 'students.json';

const readData = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// 🟢 جلب جميع الطلاب
app.get('/students', (req, res) => {
    res.json(readData());
});

// 🔵 جلب طالب معين حسب الـ ID
app.get('/students/:id', (req, res) => {
    const students = readData();
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (student) {
        res.json(student);
    } else {
        res.status(400).json({ message: "Student not found" });
    }
});

// 🟠 إضافة طالب جديد
app.post('/students', (req, res) => {
    const students = readData();
    const newStudent = { id: students.length + 1, ...req.body };
    students.push(newStudent);
    writeData(students);
    res.json({ message: "Student added", student: newStudent });
});

// 🔴 تعديل بيانات طالب معين
app.put('/students/:id', (req, res) => {
    const students = readData();
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        students[index] = { ...students[index], ...req.body };
        writeData(students);
        res.json(students[index]);
    } else {
        res.status(400).json({ message: "Student not found" });
    }
});

// ⚫ حذف طالب معين
app.delete('/students/:id', (req, res) => {
    let students = readData();
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        const deleted = students.splice(index, 1)[0];
        writeData(students);
        res.json({ message: "Student deleted", student: deleted });
    } else {
        res.status(400).json({ message: "Student not found" });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});*/


const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());


const DATA_FILE = 'students.json';

const readData = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};
app.get('/students', (req, res) => {
    res.json(readData());
});
app.post('/students', (req, res) => {
    const students = readData();
    const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: "Name and City are required" });
  }
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    city
  };
    students.push(newStudent);
    writeData(students);
    res.json({ message: "Student added", student: newStudent });
});
app.put('/students/:id', (req, res) => {
    const students = readData();
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        students[index] = { ...students[index], ...req.body };
        writeData(students);
        res.json(students[index]);
    } else {
        res.status(400).json({ message: "Student not found" });
    }
});
app.delete('/students/:id', (req, res) => {
    let students = readData();
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index !== -1) {
        const deleted = students.splice(index, 1)[0];
        writeData(students);
        res.json({ message: "Student deleted", student: deleted });
    } else {
        res.status(400).json({ message: "Student not found" });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


