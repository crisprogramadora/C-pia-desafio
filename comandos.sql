create database copia_desafio;

CREATE TABLE "usuarios" (
  "id" serial NOT NULL,
  "nome" text NOT NULL,
  "email" text NOT NULL,
  "senha" text NOT NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "email" UNIQUE ("email")
);

INSERT INTO usuarios (id,nome,email,senha)
VALUES
  (1,'Judith Garza','vulputate.nisi.sem@protonmail.ca',767237),
  (2,'Hayley Dillard','in.faucibus@yahoo.couk',42901),
  (3,'Holly Morris','nulla.dignissim@google.net',374169),
  (4,'Lana Hess','vulputate.risus@hotmail.org',171024),
  (5,'Wang Salinas','pellentesque.habitant.morbi@icloud.ca',54251),
  (6,'Zenaida Downs','phasellus.libero@aol.net',380373),
  (7,'Tanek Snider','aliquet.odio@google.org',175948),
  (8,'Cynthia Coleman','id.ante.nunc@hotmail.couk',412393),
  (9,'Mary Chang','lobortis.augue@aol.ca',606874),
  (10,'Teagan Strickland','sagittis@yahoo.org',159079);
INSERT INTO usuarios (id,nome,email,senha)
VALUES
  (11,'Brynn Hammond','elit.elit@hotmail.edu',545466),
  (12,'Drake Bowman','nunc.sed@icloud.net',480877),
  (13,'Belle Klein','at@icloud.couk',939257),
  (14,'John Mcbride','velit.dui@outlook.org',212716),
  (15,'Wanda Estrada','sem.mollis@protonmail.ca',217610),
  (16,'Sylvester Campos','auctor.odio@aol.edu',159060),
  (17,'Hope Booth','dui@aol.couk',647643),
  (18,'Dacey Willis','risus.quis@aol.ca',929455),
  (19,'Ishmael Bradford','lectus.rutrum@icloud.couk',138335),
  (20,'Rooney Briggs','est@aol.net',310770);

CREATE TABLE "materias" (
  "id" serial NOT NULL,
  "nome" text NOT NULL,
  PRIMARY KEY ("id")
);

INSERT INTO materias (id,nome)
VALUES
  (1,'Back-end'),
  (2,'Front-end'),
  (3,'Carreira'),
  (4,'Mobile'),
  (5,'Design'),
  (6,'Dados'),
  (7,'SQL');

DROP TABLE IF EXISTS "resumos"; 

CREATE TABLE "resumos" (
  "id" serial NOT NULL,
  "usuario_id" serial NOT NULL,
  "materia_id" serial NOT NULL,
  "titulo" text,
  "topicos" text NOT NULL,
  "descricao" text NOT NULL,
  "criado" timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "fk_resumos_usuarios_1" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id"),
  CONSTRAINT "fk_resumos_materias_2" FOREIGN KEY ("materia_id") REFERENCES "materias" ("id")
);