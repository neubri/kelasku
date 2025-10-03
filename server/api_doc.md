# Kelasku CBT API Documentation

## Models

### User

```md
- name : string, required
- email : string, required, unique, isEmail
- password : string, required (stored as bcrypt hash)
- role : enum('user','admin'), default: 'user'
```

### Quiz

```md
- title : string, required
- subject : string, required
- description : string, optional
```

### Question

```md
- quizId : integer, required (FK to Quiz)
- text : string, required
- optionA : string, required
- optionB : string, required
- optionC : string, required
- optionD : string, required
- correctAnswer : enum('A','B','C','D'), required
```

### Submission

```md
- userId : integer, required (FK to User)
- quizId : integer, required (FK to Quiz)
- score : decimal (0–100), default: 0
- startedAt : datetime, required
- finishedAt : datetime, optional
```

### Answer

```md
- submissionId : integer, required (FK to Submission)
- questionId : integer, required (FK to Question)
- userAnswer : enum('A','B','C','D'), required
- isCorrect : boolean, default: false
```

---

## Relationship

- **User (1) → (N) Submission**
- **Quiz (1) → (N) Question**
- **Quiz (1) → (N) Submission**
- **Submission (1) → (N) Answer**
- **Question (1) → (N) Answer**

---

## Endpoints

### Auth

- `POST /register`
- `POST /login`

### Quiz

- `GET /quizzes`
- `GET /quizzes/:id`
- `GET /quizzes/:id/questions`

_(admin only)_

- `POST /quizzes`
- `POST /quizzes/:id/questions`
- `PATCH /questions/:id`
- `DELETE /questions/:id`

### Submission

- `POST /submissions`
- `PATCH /submissions/:id/answers`
- `POST /submissions/:id/finish`

### History

- `GET /submissions`
- `GET /submissions/:id`

---

## 1. POST /register

**Request**

```json
{
  "name": "Leo",
  "email": "leo@mail.com",
  "password": "secret123"
}
```

**Response 201 - Created**

```json
{
  "id": 1,
  "name": "Leo",
  "email": "leo@mail.com"
}
```

**Response 400 - Bad Request**

```json
{ "message": "Email must be unique" }
```

---

## 2. POST /login

**Request**

```json
{
  "email": "leo@mail.com",
  "password": "secret123"
}
```

**Response 200 - OK**

```json
{ "access_token": "string" }
```

**Response 401 - Unauthorized**

```json
{ "message": "Invalid email/password" }
```

---

## 3. GET /quizzes

**Description**: ambil semua quiz.

**Response 200 - OK**

```json
[
  {
    "id": 1,
    "title": "IPS Bab 1",
    "subject": "IPS",
    "description": "Kenampakan Alam"
  },
  { "id": 2, "title": "Matematika Bab 2", "subject": "Matematika" }
]
```

---

## 4. GET /quizzes/:id/questions

**Description**: ambil semua soal dari quiz (tanpa correctAnswer).

**Response 200 - OK**

```json
[
  {
    "id": 10,
    "text": "Permukaan bumi yang menjulang tinggi adalah...",
    "optionA": "Laut",
    "optionB": "Selat",
    "optionC": "Gunung",
    "optionD": "Sungai"
  }
]
```

---

## 5. POST /submissions

**Description**: mulai quiz.

**Request**

```json
{ "quizId": 1 }
```

**Response 201 - Created**

```json
{
  "id": 5,
  "quizId": 1,
  "userId": 1,
  "score": 0,
  "startedAt": "2025-10-02T10:00:00Z"
}
```

---

## 6. PATCH /submissions/:id/answers

**Description**: simpan jawaban user.

**Request**

```json
{ "questionId": 10, "userAnswer": "C" }
```

**Response 200 - OK**

```json
{
  "id": 100,
  "submissionId": 5,
  "questionId": 10,
  "userAnswer": "C",
  "isCorrect": true
}
```

---

## 7. POST /submissions/:id/finish

**Description**: kumpulkan jawaban & hitung nilai.

**Response 200 - OK**

```json
{
  "id": 5,
  "quizId": 1,
  "userId": 1,
  "score": 80,
  "finishedAt": "2025-10-02T11:00:00Z"
}
```

---

## 8. GET /submissions

**Description**: ambil semua histori nilai user login.

**Response 200 - OK**

```json
[
  {
    "id": 5,
    "quizId": 1,
    "score": 80,
    "startedAt": "2025-10-02T10:00:00Z",
    "finishedAt": "2025-10-02T11:00:00Z"
  },
  {
    "id": 6,
    "quizId": 2,
    "score": 70
  }
]
```

---

## 9. GET /submissions/:id

**Description**: detail submission.

**Response 200 - OK**

```json
{
  "id": 5,
  "quizId": 1,
  "score": 80,
  "answers": [
    { "questionId": 10, "userAnswer": "C", "isCorrect": true },
    { "questionId": 11, "userAnswer": "A", "isCorrect": false }
  ]
}
```

---

## Global Error

**401 - Unauthorized**

```json
{ "message": "Invalid token" }
```

**403 - Forbidden**

```json
{ "message": "You are not authorized" }
```

**404 - Not Found**

```json
{ "message": "Data not found" }
```

**500 - Internal Server Error**

```json
{ "message": "Internal server error" }
```
