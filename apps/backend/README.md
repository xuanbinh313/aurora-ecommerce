# This is sample an e commerce app

Language: Golang
Framework: Gin
Structure
```
ecommerce/
└── internal/
│   ├── config/                 --> config system
│   │   └── config.go           --> Read config .env
│   ├── db/                     --> Manage database connection (Singleton)
│   │   └── db.go               --> GORM Singleton Pattern
│   ├── category/
│   │   ├── domain/             --> Defined Model Category
│   │   │   └── category.go
│   │   ├── infra/              --> Connect DB and Migration for Category
│   │   │   └── migrate.go
│   │   └── repository/         --> Repository for Category
│   │       └── repository.go
│   └── product/
│       ├── domain/             --> Defined Model Product
│       │   └── product.go
│       ├── infra/              --> Connect DB and Migration for Product
│       │   └── migrate.go
│       └── repository/         --> Repository for Product
│           └── repository.go
└── cmd/
│   └── main.go                 --> Run Application
└── .env                        --> environment
```