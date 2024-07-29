export function handleEstrelasMateria() {
  const notaTotal = this.materia.contribuicoes.nota_total;
  const estrelas = this.$refs.estrelas;

  if (!estrelas) return;

  const applyFilter = (startIndex) => {
    for (let i = startIndex; i < estrelas.length; i++) {
      estrelas[i].style.filter = "invert(50%) opacity(30%)";
    }
  };

  const applyPartialOpacity = (index) => {
    estrelas[index].style.webkitMaskImage =
      "linear-gradient(to left, transparent 40%, black 60%)";
    estrelas[index].style.opacity = "1";
  };

  if (notaTotal < 1) {
    applyFilter(0);
  } else if (notaTotal === 1) {
    applyFilter(1);
  } else if (notaTotal === 2) {
    applyFilter(2);
  } else if (notaTotal === 3) {
    applyFilter(3);
  } else if (notaTotal === 4) {
    applyFilter(4);
  } else if (notaTotal < 2) {
    applyFilter(2);
    applyPartialOpacity(1);
  } else if (notaTotal < 3) {
    applyFilter(3);
    applyPartialOpacity(2);
  } else if (notaTotal < 4) {
    applyFilter(4);
    applyPartialOpacity(3);
  } else if (notaTotal < 5) {
    applyPartialOpacity(4);
  }
}
