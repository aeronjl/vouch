# vouch - A social feed for academic research

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

`vouch` is

```mermaid
graph TD
    A[User] --> B[Frontend React App]
    B -->|API Requests| C[GraphQL API]
    C --> D[Django Backend]
    D --> E[PostgreSQL Database]
    F[AWS S3] --> B
    G[AWS Amplify] --> B
    H[AWS RDS] --> E
    I[AWS EB] --> D
```