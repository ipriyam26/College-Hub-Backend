CREATE TYPE "OrderStatus" AS ENUM (
  'pending',
  'ready',
  'completed'
);

CREATE TYPE "Gender" AS ENUM (
  'male',
  'female'
);

CREATE TYPE "Course" AS ENUM (
  'CSE',
  'ECE',
  'EC',
  'ME',
  'BT'
);

CREATE TYPE "School" AS ENUM (
  'Engineering',
  'Business',
  'Law',
  'Media'
);

CREATE TYPE "Degree" AS ENUM (
  'BTech',
  'MTech',
  'BCA',
  'MCA',
  'BALLB',
  'BBALLB',
  'BBA',
  'Media',
  'BA'
);

CREATE TABLE "User" (
  "enrollment_no" varchar PRIMARY KEY,
  "first_name" varchar,
  "second_name" varchar,
  "age" int8,
  "gender" Gender,
  "hostler" boolean,
  "password" varchar,
  "email" varchar
);

CREATE TABLE "Hostle" (
  "enrollment_no" varchar PRIMARY KEY,
  "block" char,
  "floor" int2,
  "room_no" int4,
  "roommate" varchar
);

