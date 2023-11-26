-- init.sql
-- 데이터베이스 선택
\c recipesoup;

-- UserRole Enum 타입 생성 (이미 존재하지 않는 경우)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'userrole') THEN
        CREATE TYPE userrole AS ENUM ('admin', 'user');
    END IF;
END
$$;

-- User 테이블 생성 (이미 존재하지 않는 경우)
CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role userrole DEFAULT 'user',
    isDeleted BOOLEAN
);

-- PostDiet 테이블 생성 (이미 존재하지 않는 경우)
CREATE TABLE IF NOT EXISTS "PostDiet" (
    id SERIAL PRIMARY KEY,
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    date TEXT,
    institute TEXT,
    peopleNum TEXT,
    price TEXT,
    recipeImg TEXT,
    explanation TEXT,
    recipeFile TEXT,
    whichSchool TEXT,
    isDeleted BOOLEAN DEFAULT FALSE,
    userId INTEGER REFERENCES "User"(id) -- User 테이블과의 관계 설정
);

-- Menu 테이블 생성 (이미 존재하지 않는 경우)
CREATE TABLE IF NOT EXISTS "Menu" (
    id SERIAL PRIMARY KEY,
    menuName TEXT,
    isProductUsed BOOLEAN,
    productName TEXT,
    productBrand TEXT,
    postId INTEGER REFERENCES "PostDiet"(id) ON DELETE CASCADE -- PostDiet 테이블과의 관계 설정
);

-- CommentDiet 테이블 생성 (이미 존재하지 않는 경우)
CREATE TABLE IF NOT EXISTS "CommentDiet" (
    id SERIAL PRIMARY KEY,
    createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    content TEXT,
    postId INTEGER REFERENCES "PostDiet"(id), -- PostDiet 테이블과의 관계 설정
    userId INTEGER REFERENCES "User"(id)      -- User 테이블과의 관계 설정
);

-- 어드민 권한을 가진 유저가 이미 존재하는지 확인하고, 없는 경우에만 새로운 유저 생성
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM "User" WHERE email = 'admin@admin.com') THEN
        INSERT INTO "User" (email, name, role, isDeleted)
        VALUES ('admin@admin.com', 'Admin User', 'admin', FALSE);
    END IF;
END
$$;