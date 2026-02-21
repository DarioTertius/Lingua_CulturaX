// No final do arquivo script.js, atualize a função displayResults:

function displayResults(results, searchTerm) {
  const searchResults = document.querySelector(".search-results-sidebar");
  if (!searchResults) return;

  const t = translations[currentLang];

  if (results.length === 0) {
    searchResults.innerHTML = `<p class="no-results">${t.noResults} "${searchTerm}"</p>`;
    searchResults.classList.add("active");
    return;
  }

  let html = '<ul class="results-list">';

  results.forEach((item) => {
    const title = item.title[currentLang];
    const content = item.content[currentLang];
    const preview = content.substring(0, 100) + (content.length > 100 ? "..." : "");

    html += `
      <li class="result-item" onclick="scrollToSection('${item.section}')">
        <h3>✨ ${title}</h3>
        <p>${preview}</p>
      </li>
    `;
  });

  html += "</ul>";
  searchResults.innerHTML = html;
  searchResults.classList.add("active");
}

// Atualizar a função scrollToSection para esconder resultados:
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const searchResults = document.querySelector(".search-results-sidebar");
  const searchInput = document.getElementById("searchInput");

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    
    section.style.animation = "none";
    setTimeout(() => {
      section.style.animation = "fadeIn 0.5s ease-out";
    }, 10);
    
    if (searchResults) searchResults.classList.remove("active");
    if (searchInput) searchInput.value = "";
  }
}

// ===============================
// CONFIGURAÇÃO DE IDIOMA
// ===============================
let currentLang = "pt";

const translations = {
  pt: {
    noResults: "Nenhum resultado encontrado para"
  },
  de: {
    noResults: "Keine Ergebnisse gefunden für"
  }
};

// ===============================
// BASE DE DADOS DA BUSCA
// ===============================
const searchData = [
  // ===== SEÇÕES DA PÁGINA =====
  {
    type: "section",
    section: "boasvindas",
    title: {
      pt: "Bem-vindos",
      de: "Willkommen"
    },
    content: {
      pt: "Aprender alemão e conhecer a cultura germânica.",
      de: "Deutsch lernen und die deutsche Kultur kennenlernen."
    }
  },
  {
    type: "section",
    section: "cursos",
    title: {
      pt: "Cursos de Idiomas",
      de: "Sprachkurse"
    },
    content: {
      pt: "Cursos de alemão e português para diferentes públicos.",
      de: "Deutsch- und Portugiesischkurse für verschiedene Zielgruppen."
    }
  },
  {
    type: "section",
    section: "conteudo",
    title: {
      pt: "Material de Apoio",
      de: "Lernmaterial"
    },
    content: {
      pt: "Gramática, vocabulário, cultura e pronúncia.",
      de: "Grammatik, Wortschatz, Kultur und Aussprache."
    }
  },

  // ===== CURSOS (PÁGINAS) =====
  {
    type: "page",
    url: "alemao-para-lusofonos.html",
    title: {
      pt: "Alemão para Brasileiros e Portugueses",
      de: "Deutsch für Brasilianer und Portugiesen"
    },
    content: {
      pt: "Curso de alemão para falantes de português.",
      de: "Deutschkurs für portugiesischsprachige Lernende."
    }
  },
  {
    type: "page",
    url: "portugues-para-alemaes.html",
    title: {
      pt: "Português para Alemães",
      de: "Portugiesisch für Deutsche"
    },
    content: {
      pt: "Curso de português para falantes de alemão.",
      de: "Portugiesischkurs für deutschsprachige Lernende."
    }
  },

  // ===== BLOG =====
  {
    type: "page",
    url: "blog/blog.html",
    title: {
      pt: "Blog LinguaCultura",
      de: "LinguaCultura Blog"
    },
    content: {
      pt: "Artigos sobre língua alemã, cultura e aprendizado.",
      de: "Artikel über deutsche Sprache, Kultur und Lernen."
    }
  }
];

// ===============================
// FUNÇÃO PRINCIPAL DE BUSCA
// ===============================
function performSearch() {
  const input = document.getElementById("searchInput");
  const term = input.value.trim().toLowerCase();

  if (!term) return;

  const results = searchData.filter((item) => {
    const title = item.title[currentLang].toLowerCase();
    const content = item.content[currentLang].toLowerCase();
    return title.includes(term) || content.includes(term);
  });

  displayResults(results, term);
}

// ===============================
// EXIBIR RESULTADOS
// ===============================
function displayResults(results, searchTerm) {
  const searchResults = document.querySelector(".search-results-sidebar");
  if (!searchResults) return;

  const t = translations[currentLang];

  if (results.length === 0) {
    searchResults.innerHTML = `<p class="no-results">${t.noResults} "${searchTerm}"</p>`;
    searchResults.classList.add("active");
    return;
  }

  let html = '<ul class="results-list">';

  results.forEach((item) => {
    const title = item.title[currentLang];
    const content = item.content[currentLang];
    const preview =
      content.substring(0, 100) + (content.length > 100 ? "..." : "");

    if (item.type === "section") {
      html += `
        <li class="result-item" onclick="scrollToSection('${item.section}')">
          <h3>✨ ${title}</h3>
          <p>${preview}</p>
        </li>
      `;
    } else {
      html += `
        <li class="result-item" onclick="window.location.href='${item.url}'">
          <h3>🔗 ${title}</h3>
          <p>${preview}</p>
        </li>
      `;
    }
  });

  html += "</ul>";
  searchResults.innerHTML = html;
  searchResults.classList.add("active");
}

// ===============================
// SCROLL PARA SEÇÃO
// ===============================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  const searchResults = document.querySelector(".search-results-sidebar");
  const searchInput = document.getElementById("searchInput");

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    section.style.animation = "none";
    setTimeout(() => {
      section.style.animation = "fadeIn 0.5s ease-out";
    }, 10);
  }

  if (searchResults) searchResults.classList.remove("active");
  if (searchInput) searchInput.value = "";
}

// ===============================
// BUSCAR COM ENTER
// ===============================
document.getElementById("searchInput")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

// Função para expandir/recolher itens
function toggleExpand(element) {
  const header = element;
  const content = header.nextElementSibling;
  
  // Toggle da classe 'active'
  header.classList.toggle('active');
  content.classList.toggle('active');
}

// Carrosel KIDS

let slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;

document.querySelector('.next').addEventListener('click', () => {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
});

document.querySelector('.prev').addEventListener('click', () => {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[currentIndex].classList.add('active');
});
