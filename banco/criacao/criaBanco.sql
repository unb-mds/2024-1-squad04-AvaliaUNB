CREATE TABLE professor(
    cod_professor VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(100)
    foto_url VARCHAR(500)
);

CREATE TABLE avaliacao_professor (
    cod_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    nota_total INT CHECK (nota_total >= 0 AND nota_total <= 10),
    nota_didatica INT CHECK (nota_didatica >= 0 AND nota_didatica <= 10),
    nota_metodo_ensino INT CHECK (nota_metodo_ensino >= 0 AND nota_metodo_ensino <= 10),
    nota_metodologia INT CHECK (nota_metodologia >= 0 AND nota_metodologia <= 10),
    nota_acesso INT CHECK (nota_acesso >= 0 AND nota_acesso <= 10)
);


CREATE TABLE comentario_professor (
    cod_comentario INT AUTO_INCREMENT PRIMARY KEY,
    comentario TEXT,
    num_likes INT,
    num_dislikes INT
);

CREATE TABLE materia (
    cod_materia VARCHAR(100) PRIMARY KEY,
    nome VARCHAR(100),
    qtd_hrs_materia VARCHAR(20)
);

CREATE TABLE avaliacao_materia (
    cod_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    nota_total INT CHECK (nota_total >= 0 AND nota_total <= 10),
    nota_experiencia INT CHECK (nota_experiencia >= 0 AND nota_experiencia <= 10),
    nota_dificuldade INT CHECK (nota_dificuldade >= 0 AND nota_dificuldade <= 10)
);

CREATE TABLE comentario_materia (
    cod_comentario INT AUTO_INCREMENT PRIMARY KEY,
    comentario TEXT,
    num_likes INT,
    num_dislikes INT
);
CREATE TABLE professor_materia (
    cod_professor VARCHAR(100),
    cod_materia VARCHAR(100),
    PRIMARY KEY (cod_professor, cod_materia),
    FOREIGN KEY (cod_professor) REFERENCES professor(cod_professor) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cod_materia) REFERENCES materia(cod_materia) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE professor_avaliacao_usuario (
    cod_professor VARCHAR(100),
    cod_avaliacao INT,
    matricula INT,
cod_materia VARCHAR(100),
cod_comentario INT,
    PRIMARY KEY (cod_professor, cod_avaliacao),
    FOREIGN KEY (cod_professor) REFERENCES professor(cod_professor) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cod_avaliacao) REFERENCES avaliacao_professor(cod_avaliacao) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (cod_comentario) REFERENCES comentario_professor(cod_comentario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (matricula) REFERENCES usuario(matricula) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (cod_materia) REFERENCES materia(cod_materia) ON DELETE CASCADE ON UPDATE CASCADE,
);

CREATE TABLE professor_comentario_usuario (
    cod_professor VARCHAR(100),
    cod_comentario INT,
    matricula INT,
    PRIMARY KEY (cod_professor, cod_comentario),
    FOREIGN KEY (cod_professor) REFERENCES professor(cod_professor) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cod_comentario) REFERENCES comentario_professor(cod_comentario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (matricula) REFERENCES usuario(matricula) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE materia_avaliacao_usuario (
    cod_materia VARCHAR(100),
    cod_avaliacao INT,
    matricula INT,
cod_comentario INT 
    PRIMARY KEY (cod_materia, cod_avaliacao),
    FOREIGN KEY (cod_materia) REFERENCES materia(cod_materia) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (cod_comentario) REFERENCES materia(cod_materia) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cod_avaliacao) REFERENCES avaliacao_materia(cod_avaliacao) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (matricula) REFERENCES usuario(matricula) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE materia_comentario_usuario (
    cod_materia VARCHAR(100),
    cod_comentario INT,
    matricula INT,
    PRIMARY KEY (cod_materia, cod_comentario),
    FOREIGN KEY (cod_materia) REFERENCES materia(cod_materia) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cod_comentario) REFERENCES comentario_materia(cod_comentario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (matricula) REFERENCES usuario(matricula) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE usuario_like_dislike_professor (
    cod_comentario INT,
    matricula INT,
    like BOOLEAN,
    dislike BOOLEAN,
    PRIMARY KEY (cod_comentario, matricula),
    FOREIGN KEY (cod_comentario) REFERENCES comentario_professor(cod_comentario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (matricula) REFERENCES usuario(matricula) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE usuario_like_dislike_materia (
    cod_comentario INT,
    matricula INT,
    like BOOLEAN,
    dislike BOOLEAN,
    PRIMARY KEY (cod_comentario, matricula),
    FOREIGN KEY (cod_comentario) REFERENCES comentario_materia(cod_comentario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (matricula) REFERENCES usuario(matricula) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE usuario (
    matricula INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    curso VARCHAR(100),
    foto_url VARCHAR(500)
);

CREATE TABLE professor_graduacoes (
    cod_graduacao INT AUTO_INCREMENT PRIMARY KEY,
    cod_professor VARCHAR(255),
    graduacao VARCHAR(255),
    FOREIGN KEY (cod_professor) REFERENCES professor(cod_professor) ON DELETE CASCADE ON UPDATE CASCADE
);
