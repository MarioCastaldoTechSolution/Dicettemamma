const WHATSAPP_NUMBER = "393793417872";

const PRODUCTS = {
  "nun-t-fida-e-nisciun": {
    title: "Portachiave \"Nun t'fidà e nisciun\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#1",
    previewTitle: "Nun t'fidà e nisciun",
    image: "prodotti/1.png",
    base: "#21b8ff",
    accent: "#fffaf0",
  },
  "san-genna-m-arraccumann": {
    title: "Portachiave \"San Gennà, m'arraccumann\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#2",
    previewTitle: "San Gennà, m'arraccumann",
    image: "prodotti/2.png",
    base: "#111111",
    accent: "#fffaf0",
  },
  "nun-si-buon-manc-sott-uoglio": {
    title: "Portachiave \"Nun si buon manc sott'uoglio\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#3",
    previewTitle: "Nun si buon manc sott'uoglio",
    image: "prodotti/3.png",
    base: "#ff5f5f",
    accent: "#fffaf0",
  },
  "citazione-4": {
    title: "Portachiave \"Sit buttun ca n'apponten..\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#4",
    previewTitle: "Sit buttun ca n'apponten..",
    image: "prodotti/4.png",
    base: "#ffd447",
    accent: "#111111",
  },
  "citazione-5": {
    title: "Portachiave \"Veritevenn bene cà se more\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#5",
    previewTitle: "Veritevenn bene cà se more",
    image: "prodotti/5.png",
    base: "#53e0aa",
    accent: "#111111",
  },
  "citazione-6": {
    title: "Portachiave \"A'luntan m'parit tutta brava ggent\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#6",
    previewTitle: "A'luntan m'parit tutta brava",
    image: "prodotti/6.png",
    base: "#ff5f5f",
    accent: "#fffaf0",
  },
  "citazione-7": {
    title: "Portachiave \"Nun sai tenè tre cicere mmocca\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#7",
    previewTitle: "Nun sai tenè tre cicere mmoc",
    image: "prodotti/7.png",
    base: "#21b8ff",
    accent: "#fffaf0",
  },
  "citazione-8": {
    title: "Portachiave \"'A femmena bella nasce maretata\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#8",
    previewTitle: "'A femmena bella nasce maret",
    image: "prodotti/8.png",
    base: "#111111",
    accent: "#fffaf0",
  },
  "citazione-9": {
    title: "Portachiave \"Mo che torna patete sient\"",
    description: "Portachiave con citazione napoletana scelto dalla sezione Portachiavi.",
    price: "4,90 €",
    badge: "#9",
    previewTitle: "Mo che torna patete sient",
    image: "prodotti/9.png",
    base: "#ffd447",
    accent: "#111111",
  },
  "combo-portachiavi": {
    title: "Combo portachiavi Dicette Mammà",
    description: "Set coordinato con più portachiavi Dicette Mammà.",
    price: "12,90 €",
    badge: "#10",
    previewTitle: "Combo portachiavi Dicette Ma",
    image: "prodotti/combo.png",
    base: "#ff8fb3",
    accent: "#111111",
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initRevealAnimations();
  initOrderForm();
  initProductShortcuts();
  initCatalogFilters();
  initProductOrderPage();
  drawAllCanvases();

  window.addEventListener("resize", debounce(drawAllCanvases, 120));
  if (document.fonts) {
    document.fonts.ready.then(drawAllCanvases);
  }
});

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#site-menu");
  const navLinks = [...document.querySelectorAll(".nav-menu a")];
  const currentUrl = new URL(window.location.href);
  const anchorLinks = navLinks.filter((link) => {
    const linkUrl = new URL(link.getAttribute("href"), window.location.href);
    return linkUrl.pathname === currentUrl.pathname && linkUrl.hash;
  });
  const sections = anchorLinks
    .map((link) => document.querySelector(new URL(link.getAttribute("href"), window.location.href).hash))
    .filter(Boolean);

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

  if (!("IntersectionObserver" in window) || sections.length === 0) {
    return;
  }

  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeHref = `#${entry.target.id}`;
        anchorLinks.forEach((link) => {
          const linkUrl = new URL(link.getAttribute("href"), window.location.href);
          link.classList.toggle("is-active", linkUrl.hash === activeHref);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => activeObserver.observe(section));
}
function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item) => revealObserver.observe(item));
}

function initOrderForm() {
  const form = document.querySelector("#orderForm");
  const preview = document.querySelector("#messagePreview");
  const whatsappLink = document.querySelector("#whatsappOrderLink");

  if (!form || !preview || !whatsappLink) {
    return;
  }

  const savedProduct = window.sessionStorage.getItem("selectedProduct");
  const typeSelect = document.querySelector("#keychainType");
  if (savedProduct && typeSelect) {
    typeSelect.value = savedProduct;
    window.sessionStorage.removeItem("selectedProduct");
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const message = buildWhatsAppMessage(new FormData(form));
    preview.textContent = message;
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    whatsappLink.classList.remove("is-disabled");
    whatsappLink.focus({ preventScroll: true });
  });

  whatsappLink.addEventListener("click", (event) => {
    if (whatsappLink.classList.contains("is-disabled")) {
      event.preventDefault();
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "click_whatsapp_order", {
        event_category: "order",
        event_label: document.querySelector("#keychainType").value || "non specificato",
      });
    }
  });
}
function initProductShortcuts() {
  const select = document.querySelector("#keychainType");

  document.querySelectorAll(".product-card").forEach((card) => {
    const action = card.querySelector(".product-action");
    const productName = card.dataset.product;

    if (!action || !productName) {
      return;
    }

    action.addEventListener("click", () => {
      window.sessionStorage.setItem("selectedProduct", productName);

      if (select) {
        select.value = productName;
      }

      if (typeof window.gtag === "function") {
        window.gtag("event", "select_product", {
          item_name: productName,
        });
      }
    });
  });
}

function initCatalogFilters() {
  const catalog = document.querySelector("#productCatalog");
  const searchInput = document.querySelector("#catalogSearch");
  const sortSelect = document.querySelector("#catalogSort");
  const filterButtons = [...document.querySelectorAll(".filter-chip")];
  const count = document.querySelector("#catalogCount");

  if (!catalog) {
    return;
  }

  const cards = [...catalog.querySelectorAll(".product-card")];
  let activeFilter = "all";

  const updateCatalog = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const sortedCards = [...cards].sort((a, b) => {
      const sortMode = sortSelect?.value || "featured";
      const priceA = Number(a.dataset.price || 0);
      const priceB = Number(b.dataset.price || 0);
      const nameA = a.dataset.product || "";
      const nameB = b.dataset.product || "";

      if (sortMode === "price-asc") return priceA - priceB;
      if (sortMode === "price-desc") return priceB - priceA;
      if (sortMode === "name-asc") return nameA.localeCompare(nameB, "it");
      return 0;
    });

    sortedCards.forEach((card) => catalog.appendChild(card));

    let visible = 0;
    cards.forEach((card) => {
      const text = `${card.dataset.product || ""} ${card.textContent}`.toLowerCase();
      const categories = card.dataset.category || "";
      const matchesSearch = !query || text.includes(query);
      const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
      const isVisible = matchesSearch && matchesFilter;

      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visible += 1;
    });

    if (count) {
      count.textContent = `${visible} portachiavi disponibili`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      updateCatalog();
    });
  });

  searchInput?.addEventListener("input", updateCatalog);
  sortSelect?.addEventListener("change", updateCatalog);
  updateCatalog();
}
function initProductOrderPage() {
  const page = document.querySelector("[data-product-page]");
  if (!page) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("prodotto") || "nun-t-fida-e-nisciun";
  const product = PRODUCTS[slug] || PRODUCTS["nun-t-fida-e-nisciun"];
  const title = document.querySelector("#productTitle");
  const description = document.querySelector("#productDescription");
  const price = document.querySelector("#productPrice");
  const badge = document.querySelector("#productBadge");
  const type = document.querySelector("#productType");
  const note = document.querySelector("#productNote");
  const image = document.querySelector("#productPreviewImage");
  const canvas = document.querySelector("#productPreviewCanvas");
  const form = document.querySelector("#productOrderForm");
  const baseColor = document.querySelector("#detailBaseColor");
  const textColor = document.querySelector("#detailTextColor");
  const customText = document.querySelector("#customText");

  document.title = `${product.title} | Dicette Mammà`;
  title.textContent = product.title;
  description.textContent = product.description;
  price.textContent = product.price;
  badge.textContent = product.badge;
  type.value = product.title;
  note.textContent = product.note || "Ti porteremo su WhatsApp con il messaggio già compilato. Il prodotto viene confermato solo dopo risposta.";

  if (product.image && image) {
    image.src = product.image;
    image.alt = product.title;
    image.classList.remove("is-hidden");
    canvas.classList.add("is-hidden");
  } else {
    image?.classList.add("is-hidden");
    canvas.classList.remove("is-hidden");
    canvas.dataset.title = product.previewTitle;
    canvas.dataset.base = product.base;
    canvas.dataset.accent = product.accent;
    canvas.dataset.note = product.musicNote || "";
  }

  if (baseColor) baseColor.value = product.base;
  if (textColor) textColor.value = product.accent;
  if (customText) customText.placeholder = `Es. ${product.previewTitle}`;

  const updatePreview = () => {
    if (product.image) {
      return;
    }

    canvas.dataset.base = baseColor.value;
    canvas.dataset.accent = textColor.value;
    canvas.dataset.title = customText?.value.trim() || product.previewTitle;
    drawProductCanvas(canvas);
  };

  baseColor?.addEventListener("change", updatePreview);
  textColor?.addEventListener("change", updatePreview);
  customText?.addEventListener("input", updatePreview);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const message = buildProductWhatsAppMessage(product, formData);
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
function buildProductWhatsAppMessage(product, formData) {
  const optionText = (id) => {
    const select = document.querySelector(id);
    return select ? select.options[select.selectedIndex].text : "-";
  };
  const get = (name) => {
    const value = formData.get(name);
    return value && String(value).trim() ? String(value).trim() : "-";
  };

  return [
    "Ciao, vorrei ordinare un portachiavi Dicette Mammà.",
    `Prodotto: ${product.title}`,
    `Prezzo: ${product.price}`,
    `Colorazione base: ${optionText("#detailBaseColor")}`,
    `Colore scritta: ${optionText("#detailTextColor")}`,
    `Quantità: ${get("detailQuantity")}`,
    `Nome cliente: ${get("detailCustomerName")}`,
    `Codice sconto: ${get("detailDiscount")}`,
    `Note: ${get("detailNotes")}`,
  ].join("\n");
}
function buildWhatsAppMessage(formData) {
  const get = (name) => {
    const value = formData.get(name);
    return value && String(value).trim() ? String(value).trim() : "-";
  };

  return [
    "Ciao, vorrei ordinare un portachiavi Dicette Mammà.",
    `Nome: ${get("customerName")}`,
    `Contatto: ${get("customerContact")}`,
    `Tipo portachiave: ${get("keychainType")}`,
    `Frase: ${get("phrase")}`,
    `Nome da inserire: ${get("nameToAdd")}`,
    `Colore base: ${get("baseColor")}`,
    `Colore scritta: ${get("textColor")}`,
    `Link canzone: ${get("songLink")}`,
    `Quantità: ${get("quantity")}`,
    `Note: ${get("notes")}`,
  ].join("\n");
}

function drawAllCanvases() {
  const heroCanvas = document.querySelector("#heroCanvas");
  if (heroCanvas) {
    drawHeroCanvas(heroCanvas);
  }

  document.querySelectorAll(".product-canvas").forEach(drawProductCanvas);
}

function drawHeroCanvas(canvas) {
  const { ctx, width, height } = prepareCanvas(canvas);

  ctx.fillStyle = "#e9fbff";
  roundedRect(ctx, 0, 0, width, height, 28);
  ctx.fill();

  drawBlob(ctx, width * 0.12, height * 0.22, width * 0.2, "#ffd447");
  drawBlob(ctx, width * 0.84, height * 0.18, width * 0.16, "#53e0aa");
  drawBlob(ctx, width * 0.78, height * 0.78, width * 0.22, "#ff8fb3");
  drawConfetti(ctx, width, height, 44, "hero");

  drawKeychain(ctx, {
    x: width * 0.08,
    y: height * 0.2,
    w: width * 0.32,
    h: height * 0.43,
    base: "#ff5f5f",
    accent: "#ffd447",
    label: "Dicette",
    rotation: -0.18,
  });

  drawKeychain(ctx, {
    x: width * 0.36,
    y: height * 0.12,
    w: width * 0.34,
    h: height * 0.5,
    base: "#111111",
    accent: "#53e0aa",
    label: "Mammà",
    rotation: 0.09,
  });

  drawKeychain(ctx, {
    x: width * 0.55,
    y: height * 0.42,
    w: width * 0.34,
    h: height * 0.43,
    base: "#21b8ff",
    accent: "#ffd447",
    label: "Aggia fa'",
    rotation: -0.08,
  });
}

function drawProductCanvas(canvas) {
  const { ctx, width, height } = prepareCanvas(canvas);
  const base = canvas.dataset.base || "#ff5f5f";
  const accent = canvas.dataset.accent || "#ffd447";
  const label = canvas.dataset.title || "Dicette";
  const note = canvas.dataset.note || "";

  ctx.fillStyle = mixColor(base, "#fff6df", 0.76);
  ctx.fillRect(0, 0, width, height);
  drawConfetti(ctx, width, height, 18, label);

  drawKeychain(ctx, {
    x: width * 0.2,
    y: height * 0.18,
    w: width * 0.6,
    h: height * 0.62,
    base,
    accent,
    label,
    note,
    rotation: label.length % 2 === 0 ? 0.06 : -0.06,
  });
}

function drawKeychain(ctx, options) {
  const { x, y, w, h, base, accent, label, note = "", rotation = 0 } = options;
  const darkBase = mixColor(base, "#151515", 0.28);
  const readableText = contrastColor(accent);

  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(rotation);
  ctx.translate(-w / 2, -h / 2);

  ctx.fillStyle = "rgba(21, 21, 21, 0.24)";
  roundedRect(ctx, 14, 17, w, h, 28);
  ctx.fill();

  ctx.fillStyle = darkBase;
  roundedRect(ctx, 8, 10, w, h, 28);
  ctx.fill();

  ctx.fillStyle = base;
  roundedRect(ctx, 0, 0, w, h, 28);
  ctx.fill();

  ctx.strokeStyle = "#151515";
  ctx.lineWidth = 4;
  roundedRect(ctx, 0, 0, w, h, 28);
  ctx.stroke();

  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = contrastColor(base);
  ctx.lineWidth = 1;
  for (let lineY = h * 0.18; lineY < h * 0.9; lineY += 9) {
    ctx.beginPath();
    ctx.moveTo(w * 0.12, lineY);
    ctx.lineTo(w * 0.88, lineY);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#fffaf0";
  ctx.strokeStyle = "#151515";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.18, Math.max(12, w * 0.08), 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = accent;
  ctx.lineWidth = Math.max(5, w * 0.025);
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.08, Math.max(14, w * 0.09), Math.PI * 0.05, Math.PI * 1.55);
  ctx.stroke();

  ctx.fillStyle = accent;
  roundedRect(ctx, w * 0.12, h * 0.36, w * 0.76, h * 0.32, 17);
  ctx.fill();
  ctx.strokeStyle = "#151515";
  ctx.lineWidth = 3;
  roundedRect(ctx, w * 0.12, h * 0.36, w * 0.76, h * 0.32, 17);
  ctx.stroke();

  ctx.fillStyle = readableText;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${Math.max(17, Math.min(32, w * 0.13))}px ui-sans-serif, system-ui, sans-serif`;
  drawWrappedText(ctx, label, w / 2, h * 0.52, w * 0.64, Math.max(21, w * 0.14));

  if (note) {
    drawMusicCode(ctx, w * 0.64, h * 0.7, w * 0.18, note);
  }

  ctx.restore();
}

function drawMusicCode(ctx, x, y, size, note) {
  ctx.fillStyle = "#fffaf0";
  roundedRect(ctx, x, y, size, size, 8);
  ctx.fill();
  ctx.strokeStyle = "#151515";
  ctx.lineWidth = 2;
  roundedRect(ctx, x, y, size, size, 8);
  ctx.stroke();

  ctx.fillStyle = "#151515";
  ctx.font = `900 ${size * 0.55}px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(note, x + size / 2, y + size / 2);
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(nextLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  });

  lines.push(line);

  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((lineText, index) => {
    ctx.fillText(lineText, x, startY + index * lineHeight);
  });
}

function drawBlob(ctx, x, y, radius, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(radius * 0.01);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.75);
  ctx.bezierCurveTo(radius * 0.9, -radius, radius, radius * 0.35, radius * 0.25, radius * 0.75);
  ctx.bezierCurveTo(-radius * 0.5, radius * 1.08, -radius, radius * 0.2, -radius * 0.78, -radius * 0.48);
  ctx.bezierCurveTo(-radius * 0.55, -radius * 1.05, -radius * 0.06, -radius * 0.8, 0, -radius * 0.75);
  ctx.fill();
  ctx.restore();
}

function drawConfetti(ctx, width, height, count, seedText) {
  const colors = ["#ff5f5f", "#ffd447", "#21b8ff", "#53e0aa", "#151515", "#ff8fb3"];
  const seed = stringSeed(seedText);

  for (let i = 0; i < count; i += 1) {
    const randX = seededRandom(seed + i * 3);
    const randY = seededRandom(seed + i * 5);
    const randSize = seededRandom(seed + i * 7);
    const size = 5 + randSize * 11;
    const x = randX * width;
    const y = randY * height;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(seededRandom(seed + i * 11) * Math.PI);
    ctx.fillStyle = colors[i % colors.length];
    roundedRect(ctx, -size / 2, -size / 2, size, size * 0.48, 3);
    ctx.fill();
    ctx.restore();
  }
}

function prepareCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width || canvas.width));
  const height = Math.max(1, Math.round(rect.height || canvas.height));
  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  return { ctx, width, height };
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function contrastColor(hexColor) {
  const rgb = hexToRgb(hexColor);
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.62 ? "#151515" : "#fffaf0";
}

function mixColor(first, second, weight) {
  const a = hexToRgb(first);
  const b = hexToRgb(second);

  const mix = (channel) => Math.round(a[channel] * (1 - weight) + b[channel] * weight);
  return `rgb(${mix("r")}, ${mix("g")}, ${mix("b")})`;
}

function hexToRgb(hexColor) {
  const normalized = hexColor.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function stringSeed(text) {
  return [...String(text)].reduce((total, char) => total + char.charCodeAt(0), 0) || 1;
}

function debounce(callback, wait) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  };
}
