---

# 📘 CBT Quiz API Documentation

## Models

### User

```txt
- email : string, required, unique, isEmail
- name : string, required
- password : string, required, min 5 characters
- role : string, default: 'user'
```

### Quiz

```txt
- title : string, required
- subject : string, required
- description : string, optional
```

### Question

```txt
- quizId : integer, required
- text : string, required
- imageUrl : text, optional
- optionA : string, required
- optionB : string, required
- optionC : string, required
- optionD : string, required
- explanation : text, required
- correctAnswer : string, enum('A','B','C','D'), required
```

### Submission

```txt
- userId : integer, required
- quizId : integer, required
- score : integer, default: 0
- startedAt : date, required
- finishedAt : date, optional
```

### Answer

```txt
- submissionId : integer, required
- questionId : integer, required
- userAnswer : string, enum('A','B','C','D'), required
- isCorrect : boolean, default: false
```

---

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /quizzes`
- `GET /quizzes/:id`
- `GET /quizzes/:id/questions`
- `POST /quizzes/:quizId/submissions`
- `PATCH /submissions/:id/answers`
- `POST /submissions/:id/finish`
- `GET /submissions`
- `GET /submissions/:id`

---

## 1. POST /register

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "email": "admin@mail.com"
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Name is required" }
OR
{ "message": "Email is required" }
OR
{ "message": "Invalid email format" }
OR
{ "message": "Email must be unique" }
OR
{ "message": "Password is required" }
OR
{ "message": "Password need at least 5 character" }
```

---

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Email is required" }
OR
{ "message": "Password is required" }
```

_Response (401 - Unauthorized)_

```json
{ "message": "Invalid email or password" }
```

---

## 3. GET /quizzes

Description:

- Get all quiz from database

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "ESPS IPS 4 SD - Kenampakan Alam dan Pemanfaatannya",
    "subject": "IPS",
    "description": "Soal latihan tentang kenampakan alam dan pemanfaatannya untuk kelas IV SD."
  },
  {
    "id": 2,
    "title": "ESPS Matematika 5 SD - Pecahan dan Operasinya",
    "subject": "Matematika",
    "description": "Soal latihan tentang konsep pecahan dan berbagai operasi hitungnya untuk kelas V SD."
  }
]
```

---

## 4. GET /quizzes/:id

Description:

- Get quiz detail

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

- params:

```json
{ "id": "integer" }
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "ESPS IPS 4 SD - Kenampakan Alam dan Pemanfaatannya",
  "subject": "IPS",
  "description": "Soal latihan tentang kenampakan alam dan pemanfaatannya untuk kelas IV SD."
}
```

_Response (404 - Not Found)_

```json
{ "message": "Quiz not found" }
```

---

## 5. GET /quizzes/:id/questions

Description:

- Get quiz with questions (without correctAnswer and explanation for security during quiz)

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

- params:

```json
{ "id": "integer" }
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "ESPS IPS 4 SD - Kenampakan Alam dan Pemanfaatannya",
  "subject": "IPS",
  "description": "Soal latihan tentang kenampakan alam dan pemanfaatannya untuk kelas IV SD.",
  "Questions": [
    {
      "id": 1,
      "quizId": 1,
      "text": "Permukaan bumi yang menjulang tinggi disebut ...",
      "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3",
      "optionA": "Laut",
      "optionB": "Selat",
      "optionC": "Gunung",
      "optionD": "Sungai"
    },
    {
      "id": 2,
      "quizId": 1,
      "text": "Salah satu manfaat sungai bagi manusia adalah ...",
      "imageUrl": null,
      "optionA": "Sumber air irigasi dan transportasi lokal",
      "optionB": "Tempat tambang emas",
      "optionC": "Membuat gunung baru",
      "optionD": "Lahan perkebunan kelapa sawit"
    }
  ]
}
```

_Response (404 - Not Found)_

```json
{ "message": "Quiz Question not found" }
```

---

## 6. POST /quizzes/:quizId/submissions

Description:

- Start a new quiz submission for the given quiz

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

- params:

```json
{ "quizId": "integer" }
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "quizId": 1,
  "userId": 1,
  "score": 0,
  "startedAt": "2025-10-07T14:00:00Z",
  "finishedAt": null
}
```

_Response (404 - Not Found)_

```json
{ "message": "Quiz not found" }
```

---

## 7. PATCH /submissions/:id/answers

Description:

- Submit or update an answer for a specific question

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

- params:

```json
{ "id": "integer (submission id)" }
```

- body:

```json
{
  "questionId": 1,
  "userAnswer": "C"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "submissionId": 1,
  "questionId": 1,
  "userAnswer": "C",
  "isCorrect": true
}
```

_Response (404 - Not Found)_

```json
{ "message": "Submission not found" }
OR
{ "message": "Question not found" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized" }
```

---

## 8. POST /submissions/:id/finish

Description:

- Finish submission and calculate final score

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

- params:

```json
{ "id": "integer (submission id)" }
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "quizId": 1,
  "userId": 1,
  "score": 80,
  "startedAt": "2025-10-07T14:00:00Z",
  "finishedAt": "2025-10-07T14:30:00Z"
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Submission already finished" }
OR
{ "message": "No answers found" }
```

_Response (404 - Not Found)_

```json
{ "message": "Submission not found" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized" }
```

---

## 9. GET /submissions

Description:

- Get all submissions history for logged user

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "userId": 1,
    "quizId": 1,
    "score": 80,
    "startedAt": "2025-10-07T14:00:00Z",
    "finishedAt": "2025-10-07T14:30:00Z",
    "Quiz": {
      "title": "ESPS IPS 4 SD - Kenampakan Alam dan Pemanfaatannya"
    }
  },
  {
    "id": 2,
    "userId": 1,
    "quizId": 2,
    "score": 70,
    "startedAt": "2025-10-07T15:00:00Z",
    "finishedAt": "2025-10-07T15:25:00Z",
    "Quiz": {
      "title": "ESPS Matematika 5 SD - Pecahan dan Operasinya"
    }
  }
]
```

---

## 10. GET /submissions/:id

Description:

- Get detailed submission with all quiz questions, user answers, and explanations (optimized with single query for better performance)

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

- params:

```json
{ "id": "integer (submission id)" }
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "userId": 1,
  "quizId": 1,
  "score": 80,
  "startedAt": "2025-10-07T14:00:00Z",
  "finishedAt": "2025-10-07T14:30:00Z",
  "questions": [
    {
      "id": 1,
      "text": "Permukaan bumi yang menjulang tinggi disebut ...",
      "imageUrl": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3",
      "optionA": "Laut",
      "optionB": "Selat",
      "optionC": "Gunung",
      "optionD": "Sungai",
      "correctAnswer": "C",
      "explanation": "Gunung adalah bagian dari permukaan bumi yang menjulang tinggi di atas daerah sekitarnya dengan ketinggian minimal 600 meter dari permukaan laut.",
      "userAnswer": "C",
      "isCorrect": true
    },
    {
      "id": 2,
      "text": "Salah satu manfaat sungai bagi manusia adalah ...",
      "imageUrl": null,
      "optionA": "Sumber air irigasi dan transportasi lokal",
      "optionB": "Tempat tambang emas",
      "optionC": "Membuat gunung baru",
      "optionD": "Lahan perkebunan kelapa sawit",
      "correctAnswer": "A",
      "explanation": "Sungai sangat bermanfaat sebagai sumber air untuk irigasi pertanian dan sebagai jalur transportasi air untuk masyarakat lokal.",
      "userAnswer": "A",
      "isCorrect": true
    },
    {
      "id": 3,
      "text": "Kenampakan alam yang berupa cekungan besar berisi air asin adalah ...",
      "imageUrl": null,
      "optionA": "Danau",
      "optionB": "Laut",
      "optionC": "Sungai",
      "optionD": "Teluk",
      "correctAnswer": "B",
      "explanation": "Laut adalah cekungan besar yang berisi air asin dan merupakan bagian terbesar dari permukaan bumi.",
      "userAnswer": "A",
      "isCorrect": false
    }
  ]
}
```

_Response (404 - Not Found)_

```json
{ "message": "Submission not found" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized" }
```

---

## Global Error

_Response (401 - Unauthorized)_

```json
{ "message": "Invalid token" }
OR
{ "message": "User not found" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized" }
```

_Response (500 - Internal Server Error)_

```json
{ "message": "Internal Server Error" }
```

---
