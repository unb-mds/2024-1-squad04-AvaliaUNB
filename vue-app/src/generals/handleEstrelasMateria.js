export function handleEstrelasMateria() {
  if (this.materia.contribuicoes.nota_total / 2 < 1) {
    const estrelas = this.$refs.estrelas;
    if (estrelas) {
      estrelas.forEach((estrela) => {
        estrela.style.filter = "invert(50%) opacity(30%)";
      });
    }
  } else if (this.materia.contribuicoes.nota_total == 1) {
    const estrelas = this.$refs.estrelas;
    for (let i = 1; i < estrelas.length; i++) {
      estrelas[i].style.filter = "invert(50%) opacity(30%)";
    }
  } else if (this.materia.contribuicoes.nota_total == 2) {
    const estrelas = this.$refs.estrelas;
    for (let i = 2; i < estrelas.length; i++) {
      estrelas[i].style.filter = "invert(50%) opacity(30%)";
    }
  } else if (this.materia.contribuicoes.nota_total == 3) {
    const estrelas = this.$refs.estrelas;
    for (let i = 3; i < estrelas.length; i++) {
      estrelas[i].style.filter = "invert(50%) opacity(30%)";
    }
  } else if (this.materia.contribuicoes.nota_total == 4) {
    const estrelas = this.$refs.estrelas;
    estrelas[4].style.filter = "invert(50%) opacity(30%)";
  } else if (this.materia.contribuicoes.nota_total == 5) {
    return;
  } else if (this.materia.contribuicoes.nota_total < 2) {
    const estrelas = this.$refs.estrelas;
    for (let i = 2; i < estrelas.length; i++) {
      estrelas[i].style.filter = "invert(50%) opacity(30%)";
    }
    estrelas[1].style.webkitMaskImage =
      "linear-gradient(to left, transparent 40%, black 60%)";
    estrelas[1].style.opacity = "1";
  } else if (this.materia.contribuicoes.nota_total < 3) {
    const estrelas = this.$refs.estrelas;
    for (let i = 3; i < estrelas.length; i++) {
      estrelas[i].style.filter = "invert(50%) opacity(30%)";
    }
    estrelas[2].style.webkitMaskImage =
      "linear-gradient(to left, transparent 40%, black 60%)";
    estrelas[2].style.opacity = "1";
  } else if (this.materia.contribuicoes.nota_total < 4) {
    const estrelas = this.$refs.estrelas;
    for (let i = 4; i < estrelas.length; i++) {
      estrelas[i].style.filter = "invert(50%) opacity(30%)";
    }
    estrelas[3].style.webkitMaskImage =
      "linear-gradient(to left, transparent 40%, black 60%)";
    estrelas[3].style.opacity = "1";
  } else if (this.materia.contribuicoes.nota_total < 5) {
    const estrelas = this.$refs.estrelas;
    estrelas[4].style.webkitMaskImage =
      "linear-gradient(to left, transparent 40%, black 60%)";
    estrelas[4].style.opacity = "1";
  }
}
