const commands = [
  {name:'Gerar folha (teste)', cmd:'siape folha gerar --ano 2026 --mes 06', tags:['folha','gerar','pagamento']},
  {name:'Consultar servidor', cmd:'siape servidor consultar --matricula 123456', tags:['consulta','servidor','cadastro']},
  {name:'Exportar relatórios', cmd:'siape relatorio exportar --tipo resumo', tags:['relatorio','export']},
  {name:'Validar lotes', cmd:'siape lote validar --id LOTE123', tags:['lote','validar']}
];

const procedures = [
  {title:'Envio de alterações cadastrais', summary:'Passos para submeter mudanças no cadastro do servidor.', steps:['Verificar documentação','Atualizar formulário no sistema','Enviar para RH','Acompanhar protocolo']},
  {title:'Geração da folha de pagamento', summary:'Checklist mínimo antes de gerar a folha.', steps:['Conferir lotes pendentes','Validar servidores ativos','Executar rotina de testes','Gerar folha em ambiente de homologação']}
];

const $commands = document.getElementById('commands');
const $procedures = document.getElementById('procedures');
const $search = document.getElementById('search');
const $modal = document.getElementById('modal');
const $modalTitle = document.getElementById('modalTitle');
const $modalBody = document.getElementById('modalBody');
const $closeModal = document.getElementById('closeModal');
const $printBtn = document.getElementById('printBtn');

function renderCommands(list){
  $commands.innerHTML = '';
  list.forEach(item=>{
    const li = document.createElement('li'); li.className='command';
    const left = document.createElement('div'); left.className='cmd-left';
    const meta = document.createElement('div');
    const name = document.createElement('div'); name.className='cmd-name'; name.textContent = item.name;
    const txt = document.createElement('div'); txt.className='cmd-text'; txt.textContent = item.cmd;
    meta.appendChild(name); meta.appendChild(txt);
    left.appendChild(meta);
    const actions = document.createElement('div');
    const copyBtn = document.createElement('button'); copyBtn.className='btn-small'; copyBtn.textContent='Copiar';
    copyBtn.onclick = ()=>{ navigator.clipboard.writeText(item.cmd); copyBtn.textContent='Copiado'; setTimeout(()=>copyBtn.textContent='Copiar',1200) };
    const detailsBtn = document.createElement('button'); detailsBtn.className='btn-small'; detailsBtn.style.marginLeft='8px'; detailsBtn.textContent='Procedimento';
    detailsBtn.onclick = ()=>openModal(item.name, `<pre style="white-space:pre-wrap">${escapeHtml(item.cmd)}</pre>`);
    actions.appendChild(copyBtn); actions.appendChild(detailsBtn);
    li.appendChild(left); li.appendChild(actions);
    $commands.appendChild(li);
  })
}

function renderProcedures(){
  $procedures.innerHTML='';
  procedures.forEach(p=>{
    const card = document.createElement('article'); card.className='procedure';
    const h = document.createElement('h3'); h.textContent = p.title;
    const s = document.createElement('p'); s.className='muted'; s.textContent = p.summary;
    const btn = document.createElement('button'); btn.className='btn-small'; btn.textContent='Abrir';
    btn.onclick = ()=>openModal(p.title, '<ol>'+p.steps.map(st=>'<li>'+st+'</li>').join('')+'</ol>');
    card.appendChild(h); card.appendChild(s); card.appendChild(btn);
    $procedures.appendChild(card);
  })
}

function openModal(title, html){
  $modalTitle.textContent = title;
  $modalBody.innerHTML = html;
  $modal.setAttribute('aria-hidden','false');
}
function closeModal(){ $modal.setAttribute('aria-hidden','true'); }

$closeModal.addEventListener('click', closeModal);
$modal.addEventListener('click', (e)=>{ if(e.target===$modal) closeModal(); });

$search.addEventListener('input', ()=>{
  const q = $search.value.trim().toLowerCase();
  if(!q) return renderCommands(commands);
  const filtered = commands.filter(c=> (c.name+c.cmd+(c.tags||[]).join(' ')).toLowerCase().includes(q));
  renderCommands(filtered);
});

document.addEventListener('keydown', (e)=>{
  if(e.key === '/') { e.preventDefault(); $search.focus(); }
  if(e.key.toLowerCase() === 'p' && (e.ctrlKey || e.metaKey)===false && document.activeElement!==$search) { window.print(); }
});

$printBtn.addEventListener('click', ()=>window.print());

function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// inicialização
renderCommands(commands);
renderProcedures();
