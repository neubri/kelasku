---

# 📘 CBT Quiz API Documentation

## Models

### User

```txt
- email : string, required, unique, isEmail
- name : string, required
- password : string, required
- role : string, enum('student','teacher','admin'), default: 'student'
```

### Quiz

```txt
- title : string, required
- subject : string, required
- description : string
```

### Question

```txt
- quizId : integer, required
- text : string, required
- optionA : string, required
- optionB : string, required
- optionC : string, required
- optionD : string, required
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
- `POST /submissions`
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
  "email": "string",
  "name": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "email": "student@mail.com",
  "name": "Budi"
}
```

_Response (400 - Bad Request)_

```json
{ "message": "Email is required" }
OR
{ "message": "Invalid email format" }
OR
{ "message": "Email must be unique" }
OR
{ "message": "Name is required" }
OR
{ "message": "Password is required" }
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
{ "message": "Invalid email/password" }
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
    "title": "IPS Kelas 4 - Kenampakan Alam",
    "subject": "IPS",
    "description": "Soal tentang kenampakan alam"
  },
  {
    "id": 2,
    "title": "Matematika Dasar",
    "subject": "Matematika",
    "description": "Soal hitung perkalian dan pembagian"
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
  "title": "IPS Kelas 4 - Kenampakan Alam",
  "subject": "IPS",
  "description": "Soal tentang kenampakan alam"
}
```

_Response (404 - Not Found)_

```json
{ "message": "Quiz not found" }
```

---

## 5. GET /quizzes/:id/questions

Description:

- Get quiz questions (without correctAnswer)

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
    "text": "Permukaan bumi yang menjulang tinggi disebut ...",
    "optionA": "Laut",
    "optionB": "Selat",
    "optionC": "Gunung",
    "optionD": "Sungai"
  },
  {
    "id": 2,
    "text": "Salah satu manfaat sungai bagi manusia adalah ...",
    "optionA": "Sumber irigasi",
    "optionB": "Tempat tambang emas",
    "optionC": "Membuat gunung baru",
    "optionD": "Lahan perkebunan",
    "correctAnswer": "A"
  }
]
```

---

## 6. POST /quizzes/:quizId/submissions

Description:

- Start a new quiz submission for the given quiz.

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
  "id": 10,
  "quizId": 1,
  "userId": 2,
  "score": 0,
  "startedAt": "2025-10-04T14:00:00Z",
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

- Submit or update an answer

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

- params:

```json
{ "id": "integer" }
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
  "id": 55,
  "submissionId": 10,
  "questionId": 1,
  "userAnswer": "C",
  "isCorrect": true
}
```

---

## 8. POST /submissions/:id/finish

Description:

- Finish submission, calculate score

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
  "id": 10,
  "quizId": 1,
  "userId": 2,
  "score": 80,
  "startedAt": "2025-10-04T14:00:00Z",
  "finishedAt": "2025-10-04T14:25:00Z"
}
```

---

## 9. GET /submissions

Description:

- Get all submissions for logged user

Request:

- headers:

```json
{ "Authorization": "Bearer <string token>" }
```

_Response (200 - OK)_

```json
[
  {
    "id": 10,
    "quizId": 1,
    "score": 80,
    "startedAt": "2025-10-04T14:00:00Z",
    "finishedAt": "2025-10-04T14:25:00Z",
    "quiz": {
      "title": "IPS Kelas 4 - Kenampakan Alam"
    }
  }
]
```

---

## 10. GET /submissions/:id

Description:

- Get detail of one submission

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
  "id": 10,
  "quizId": 1,
  "score": 80,
  "answers": [
    { "questionId": 1, "userAnswer": "C", "isCorrect": true },
    { "questionId": 2, "userAnswer": "A", "isCorrect": true }
  ]
}
```

_Response (404 - Not Found)_

```json
{ "message": "Submission not found" }
```

---

## Global Error

_Response (401 - Unauthorized)_

```json
{ "message": "Invalid token" }
```

_Response (403 - Forbidden)_

```json
{ "message": "You are not authorized" }
```

_Response (500 - Internal Server Error)_

```json
{ "message": "Internal server error" }
```

---
