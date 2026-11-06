'use strict';

/* ====== CONFIGURAÇÃO: edite aqui ====== */
const WHATSAPP = '5595991357558'; // DDI + DDD + número
const MENSAGEM = 'Olá! Vim pelo site da GBR Equipamentos Táticos.';

/* Produtos: troque "foto" pelo caminho da imagem em img/produtos/ */
const PRODUTOS = [
  { nome: 'Mochila tática',        categoria: 'Mochilas',   foto: 'img/produtos/mochila-1.jpg' },
  { nome: 'Mochila tática',        categoria: 'Mochilas',   foto: 'img/produtos/mochila-2.jpg' },
  { nome: 'Mochila transversal',   categoria: 'Mochilas',   foto: 'img/produtos/mochila-3.jpg' },
  { nome: 'Canivete',              categoria: 'Facas',      foto: 'img/produtos/canivete-1.jpg' },
  { nome: 'Faca tática',           categoria: 'Facas',      foto: 'img/produtos/faca-1.jpg' },
  { nome: 'Machadinha',            categoria: 'Facas',      foto: 'img/produtos/machadinha-1.jpg' },
  { nome: 'Cinto tático',          categoria: 'Cintos',     foto: 'img/produtos/cinto-1.jpg' },
  { nome: 'Cinto tático',          categoria: 'Cintos',     foto: 'img/produtos/cinto-2.jpg' },
  { nome: 'Coldre e porta-carregador', categoria: 'Acessórios', foto: 'img/produtos/acessorio-1.jpg' },
  { nome: 'Bolsa e porta-objetos', categoria: 'Acessórios', foto: 'img/produtos/acessorio-2.jpg' },
  { nome: 'Lanterna',              categoria: 'Lanternas',  foto: 'img/produtos/lanterna-1.jpg' },
  { nome: 'Lanterna de cabeça',    categoria: 'Lanternas',  foto: 'img/produtos/lanterna-2.jpg' }
];

/* Horário (0 = domingo ... 6 = sábado), em minutos desde 00:00 */
const h = (a, b) => [a * 60, b * 60];
const HORARIOS = {
  0: [],
  1: [h(8, 12), h(14, 18)], 2: [h(8, 12), h(14, 18)], 3: [h(8, 12), h(14, 18)],
  4: [h(8, 12), h(14, 18)], 5: [h(8, 12), h(14, 18)],
  6: [h(8, 12)]
};
/* ====================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const linkZap = (texto = MENSAGEM) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

// Links do WhatsApp
$$('[data-zap]').forEach(a => a.href = linkZap());

// Espaços de foto: mostra a imagem se existir; senão, o espaço tracejado
function prepararFoto(box) {
  const src = box.dataset.foto;
  if (!src) return box.classList.add('vazio');
  const img = new Image();
  img.alt = box.dataset.rotulo || '';
  img.loading = 'lazy';
  img.onload = () => box.append(img);
  img.onerror = () => box.classList.add('vazio');
  img.src = src;
}

// Produtos + filtros
const grade = $('#grade'), filtros = $('#filtros');
const categorias = ['Todos', ...new Set(PRODUTOS.map(p => p.categoria))];

filtros.innerHTML = categorias.map((c, i) =>
  `<button type="button" aria-pressed="${i === 0}">${c}</button>`).join('');

function mostrar(cat) {
  grade.innerHTML = '';
  PRODUTOS.filter(p => cat === 'Todos' || p.categoria === cat).forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<div class="ph" data-foto="${p.foto}" data-rotulo="Foto: ${p.nome}"></div>
      <div><small>${p.categoria}</small><h3>${p.nome}</h3>
      <a href="${linkZap('Olá! Tenho interesse em: ' + p.nome)}" target="_blank" rel="noopener">Perguntar no WhatsApp</a></div>`;
    grade.append(card);
    prepararFoto($('.ph', card));
  });
}
filtros.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('button', filtros).forEach(x => x.setAttribute('aria-pressed', x === b));
  mostrar(b.textContent);
});
mostrar('Todos');
$$('.ph[data-rotulo]:not(.card .ph)').forEach(prepararFoto);

// Aberto agora / dia de hoje
function atualizarStatus() {
  const agora = new Date(), dia = agora.getDay();
  const min = agora.getHours() * 60 + agora.getMinutes();
  const aberto = HORARIOS[dia].some(([a, b]) => min >= a && min < b);
  const el = $('#status');
  el.className = 'status ' + (aberto ? 'aberto' : 'fechado');
  el.textContent = aberto ? 'Aberto agora' : 'Fechado agora';
  $$('.horas tr').forEach(tr => tr.classList.toggle('hoje', tr.dataset.dias.split(',').includes(String(dia))));
}
atualizarStatus();
setInterval(atualizarStatus, 60000);

// Menu mobile
const btn = $('.menu-btn'), nav = $('#nav');
btn.addEventListener('click', () => {
  const abrir = !nav.classList.contains('aberto');
  nav.classList.toggle('aberto', abrir);
  btn.setAttribute('aria-expanded', abrir);
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') { nav.classList.remove('aberto'); btn.setAttribute('aria-expanded', false); }
});

$('#ano').textContent = new Date().getFullYear();