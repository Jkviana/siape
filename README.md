# SIAPE — Guia Operacional

Pequena página estática para consulta e uso dos comandos e procedimentos operacionais do **SIAPE** (Sistema Integrado de Administração de Recursos Humanos).

Objetivo
- Fornecer aos colaboradores uma referência rápida de comandos e procedimentos usados no processamento da folha e na gestão cadastral.

Como executar localmente
```bash
cd /workspaces/siape
python3 -m http.server 8000
# Abrir http://localhost:8000 no navegador
```

Arquivos principais
- [index.html](index.html) — página principal com busca e lista de comandos
- [styles.css](styles.css) — estilos da página
- [script.js](script.js) — lógica de busca, copiar e modal de procedimentos

Funcionalidades
- Busca em tempo real por comandos e tags
- Botão para copiar comandos ao clipboard
- Modal com procedimentos e passos
- Atalhos: `/` foca a busca e `p` imprime a página

Contribuições
- Atualize ou abra issues para sugestões e adições de comandos/procedimentos.

Licença
- Documento interno; ajustar conforme políticas do órgão.

