// 👇 SUBSTITUA pelas SUAS credenciais
const supabaseUrl = "https://saexzdhlesaomczxcxlk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZXh6ZGhsZXNhb21jenhjeGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDIyMDIsImV4cCI6MjA5MDAxODIwMn0.XFls2ymzat9Nm2TSjry6qZzkQbIceLvEBMocA18cvcg";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function carregarProdutos() {
  const { data, error } = await supabase.from("produtos").select("*");

  if (error) {
    console.error("❌ SUPABASE ERROR:", error);
    document.getElementById(
      "vitrine"
    ).innerHTML = `<p style="color:red">Erro: ${error.message}</p>`;
    return;
  }

  renderizarProdutos(data || []);
}

function renderizarProdutos(produtos) {
  const vitrine = document.getElementById("vitrine");
  vitrine.innerHTML =
    produtos
      .map(
        (p) => `
        <div class="card-produto">
            <img src="${
              p.imagem
            }" onerror="this.src='https://via.placeholder.com/300?text=IMG'">
            <span class="categoria">${p.categoria}</span>
            <h3>${p.nome}</h3>
            <div class="preco">R$ ${parseFloat(p.preco).toLocaleString(
              "pt-BR"
            )}</div>
        </div>
    `
      )
      .join("") || '<p style="color:white;text-align:center">Sem produtos</p>';
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
