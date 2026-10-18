const WHATSAPP_NUMBER = "393793417872";

const PRODUCTS = {
  "cappellino-segnaposto": {
    slug: "cappellino-segnaposto",
    title: "Cappellino segnaposto personalizzabile",
    shortTitle: "Cappellino segnaposto",
    category: "Natale · personalizzabile",
    description:
      "Una decorazione natalizia con nome personalizzato, perfetta come segnaposto o piccolo regalo da appendere.",
    price: "5,90 €",
    badge: "Più natalizio",
    image: "assets/cappellino-segnaposto.png",
    cta: "Personalizza il cappellino",
    customLabel: "Nome da inserire",
    customPlaceholder: "Es. Gennaro",
    customHelp: "Ideale per nomi, cognomi o piccoli testi brevi.",
  },
  "mini-quadretto": {
    slug: "mini-quadretto",
    title: "Mini quadretto personalizzabile",
    shortTitle: "Mini quadretto",
    category: "Casa · regalo · magnetico",
    description:
      "Un mini quadretto ispirato ai modi di dire napoletani, da personalizzare con una frase breve o con un nome.",
    price: "7,90 €",
    badge: "Originale",
    image: "assets/mini-quadretto.png",
    cta: "Crea il tuo quadretto",
    customLabel: "Frase o nome da inserire",
    customPlaceholder: "Es. Ies' speranno che me la cavo",
    customHelp: "Consigliamo una frase breve su 1–3 righe.",
  },
  "portachiavi": {
    slug: "portachiavi",
    title: "Portachiavi personalizzabile",
    shortTitle: "Portachiavi",
    category: "Best seller · tascabile",
    description:
      "Il classico Dicette Mammà: una frase, un nome o un modo di dire da portare sempre con te.",
    price: "4,90 €",
    badge: "Best seller",
    image: "home-portachiavi.png",
    cta: "Scegli il portachiavi",
    customLabel: "Frase o nome da inserire",
    customPlaceholder: "Es. Nun t'fidà e nisciun",
    customHelp: "Perfetto per frasi brevi, soprannomi e dediche.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initRevealAnimations();
  renderProductGrid("featuredGrid", Object.keys(PRODUCTS));
  renderProductGrid("catalogGrid", Object.keys(PRODUCTS));
  initProductPage();
});

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#site-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      });
    });
  }
}

function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
}

function renderProductGrid(containerId, slugs) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = slugs
    .map((slug) => {
      const product = PRODUCTS[slug];
      return `
        <article class="product-card soft-shadow">
          <div class="product-media">
            <img class="product-photo" src="${product.image}" alt="${product.title}">
            <span class="product-badge">${product.badge}</span>
          </div>
          <div class="product-info">
            <span class="eyebrow eyebrow-inline">${product.category}</span>
            <h3>${product.shortTitle}</h3>
            <p>${product.description}</p>
            <div class="product-bottom">
              <strong>${product.price}</strong>
              <a href="prodotto.html?prodotto=${product.slug}" class="mini-link">Personalizza</a>
            </div>
          </div>
        </article>`;
    })
    .join("");
}

function initProductPage() {
  const page = document.querySelector("[data-product-page]");
  if (!page) return;

  const slug = new URLSearchParams(window.location.search).get("prodotto") || "portachiavi";
  const product = PRODUCTS[slug] || PRODUCTS.portachiavi;

  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };

  document.title = `${product.shortTitle} | Dicette Mammà`;
  setText("#productCategory", product.category);
  setText("#productBadge", product.badge);
  setText("#productTitle", product.title);
  setText("#productDescription", product.description);
  setText("#productPrice", product.price);
  setText("#customTextLabel", product.customLabel);
  setText("#customTextHelp", product.customHelp);
  setText("#productNote", "L'ordine viene inviato su WhatsApp già compilato, così puoi confermare ogni dettaglio prima della produzione.");

  const typeField = document.querySelector("#productType");
  const customField = document.querySelector("#detailCustomText");
  const image = document.querySelector("#productPreviewImage");
  if (typeField) typeField.value = product.title;
  if (customField) customField.placeholder = product.customPlaceholder;
  if (image) {
    image.src = product.image;
    image.alt = product.title;
  }

  const form = document.querySelector("#productOrderForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const message = buildWhatsAppMessage(product, data);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (typeof window.gtag === "function") {
      window.gtag("event", "click_whatsapp_order", {
        event_category: "order",
        event_label: product.title,
      });
    }

    window.open(url, "_blank", "noopener");
  });
}

function buildWhatsAppMessage(product, formData) {
  const get = (name) => {
    const value = formData.get(name);
    return value && String(value).trim() ? String(value).trim() : "-";
  };

  return [
    "Ciao, vorrei ordinare un prodotto Dicette Mammà.",
    `Prodotto: ${product.title}`,
    `Prezzo indicativo: ${product.price}`,
    `${product.customLabel}: ${get("detailCustomText")}`,
    `Colore base: ${get("detailBaseColor")}`,
    `Colore scritta / dettaglio: ${get("detailTextColor")}`,
    `Quantità: ${get("detailQuantity")}`,
    `Nome cliente: ${get("detailCustomerName")}`,
    `Contatto: ${get("detailContact")}`,
    `Note: ${get("detailNotes")}`,
  ].join("\n");
}
