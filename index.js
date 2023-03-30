// express memudahkan server

// import / panggil package yg kita mau pakai pada aplikasi kita
const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// built in function di node js(?)
// proses baca file json nya dengan FS module, nah dibantu dengan JSON.parse
const persons = JSON.parse(fs.readFileSync(`${__dirname}/person.json`))

// memulai http server 
app.listen(PORT, () => {
    console.log(`App running on localhost: ${PORT}`)
})

// Soal Daily Task
// 1) bikin proses put/edit data sukses sampai data nya teredit di file json nya
app.put('/person/:id', (req, res) => {
  const id = req.params.id * 1;
  const personIndex = persons.findIndex(el => el.id === id);

  // cek id apakah ada di array persons, jika ada maka akan di update dengan req.body
  if (personIndex !== -1) {
  // menggabungkan nilai dari objek person dengan nilai baru yang sudah diterima dari req.body
    persons[personIndex] = { ...persons[personIndex], ...req.body };
    res.status(200).json({
      status: 'success',
      message: `Data dengan id ${id} berhasil diubah`,
      data: persons[personIndex]
    }); 
  } else { 
    res.status(404).json({ 
      status: 'fail',
      message: `Data dengan id ${id} tidak ditemukan`
    }); 
  }

  fs.writeFile(
      `${__dirname}/person.json`,
      JSON.stringify(persons),
      errr => {
          res.status(200).json({
              status: "success",
              message: `data dari id ${id} berhasil berubah`
          })
      }
  ) 
});

// 2) bikin validasi jika id tidak ditemukan dari params id nya di api get data by id, delete dan put 
app.get('/person/:id', (req, res) => {
  const id = req.params.id * 1;
  const person = persons.find(el => el.id === id);

  if (!person) {
      return res.status(404).json({
          status: "fail",
          message: "Person not found"
      });
  }

  res.status(200).json({
      status: "success",
      data: {
          person
      }
  });
});

app.delete('/person/:id', (req, res) => {
  const id = req.params.id * 1;
  const index = persons.findIndex(el => el.id === id);

  if (index === -1) {
      return res.status(404).json({
          status: "fail",
          message: "Person not found"
      });
  }

  persons.splice(index, 1);

  res.status(204).json({
      status: "success",
      data: null
  });

  fs.writeFile(
      `${__dirname}/person.json`,
      JSON.stringify(persons),
  ) 
});

app.put('/person/:id', (req, res) => {
  const id = req.params.id * 1;
  const person = persons.find(el => el.id === id);

  if (!person) {
      return res.status(404).json({
          status: "fail",
          message: "Person not found"
      });
  }

  const { name, age, eyeColor } = req.body;

  if (name) person.name = name;
  if (age) person.age = age;
  if (eyeColor) person.eyeColor = eyeColor;

  res.status(200).json({
      status: "success",
      data: {
          person
      }
  });

  fs.writeFile(
      `${__dirname}/person.json`,
      JSON.stringify(persons),
  ) 
});

// 3) bikin validasi di create/edit API utk request body
app.put('/person/:id', (req, res) => {
  const id = req.params.id * 1;
  const person = persons.find(el => el.id === id);

  if (!person) {
      return res.status(404).json({
          status: "fail",
          message: "Person not found"
      });
  }

  const { name, age, eyeColor } = req.body;

  if (name) person.name = name;
  if (age) person.age = age;
  if (eyeColor) person.eyeColor = eyeColor;

  res.status(200).json({
      status: "success",
      data: {
          person
      }
  });

  fs.writeFile(
      `${__dirname}/person.json`,
      JSON.stringify(persons),
  ) 
});