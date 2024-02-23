package com.nuxeo.nx.web.controller.administration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.primefaces.event.DragDropEvent;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import com.nuxeo.nx.web.utils.Messages;
import com.nuxeo.nx.web.controller.TesteCadLayoutController;
import com.nuxeo.nx.web.entity.Produto;

@Named("produtoController")
@ViewScoped
public class ProdutoController implements TesteCadLayoutController, Serializable {
	
	private static final long serialVersionUID = 1L;
	private Produto produto = new Produto();
	private String botao = "Salvar";
	
	@PostConstruct
	private void init() {
		Produto produto = new Produto();
		produto.setId(1);
		produto.setNome("Equipamento Suntech ST400HD");
		produto.setPreco(115F);
		this.clean();
	}
	
	public void salva(Produto produto) {
		
		if (produto.getNome().trim().equals("")) {
			Messages.getMessagem(FacesMessage.SEVERITY_ERROR, "O nome do produto é obrigatório!", "Produto");
		} else if (produto.getPreco() == null) {
			Messages.getMessagem(FacesMessage.SEVERITY_ERROR, "O preço do produto é obrigatório", "Preço");
		} else {
			
			if (produto.getId() == null || produto.getId() == 0) {
				Messages.getMessagem(FacesMessage.SEVERITY_INFO, "Produto cadastrado com sucesso!", "Preço");
				this.limpar();
			} else {
				Messages.getMessagem(FacesMessage.SEVERITY_INFO, "Produto alterado com sucesso!", "Preço");
				this.setBotao("Atualizar");
			}							
		}		
	}
	
	public String limpar() {
		System.out.println("limpar");
		
		if(this.produto!=null) {
			System.out.println("Id produto: "+this.produto.getId());
		}else {
			System.out.println("Produto é nulo");
		}
		
		this.produto.setNome("");
		this.produto.setPreco(null);
		
		if (this.produto.getId() == null || this.produto.getId() == 0)
			this.setBotao("Salvar");
		else
			this.setBotao("Atualizar");
		
		System.out.println("this.getBotao(): "+this.getBotao());
		return "index.xhtml";
	}
	
	public List<Produto> getProdutos() {
		List<Produto> listProduto = new ArrayList<>();
		Produto produto1 = new Produto();
		produto1.setId(1);
		produto1.setNome("Equipamento Suntech ST300HD");
		produto1.setPreco(15F);
		
		listProduto.add(produto1);

		Produto produto2 = new Produto();
		produto2.setId(2);
		produto2.setNome("Equipamento Queclink GV55");
		produto2.setPreco(180F);
		
		listProduto.add(produto2);

		return listProduto;
	}
	
	public String excluir(Integer id) {
//		ProdutoDAO dao = new ProdutoDAO();
//		dao.deletar(id);
		return "listar.xhtml";
	}
	
	public String editar(Produto produto) {
		System.out.println("editar");
		
		if(produto!=null) {
			System.out.println("Id produto: "+produto.getId());
			System.out.println("produto.getNome(): "+produto.getNome());
			System.out.println("produto.getPreco(): "+produto.getPreco());
		}else {
			System.out.println("Produto é nulo");
		}
		this.produto = produto;
		this.setBotao("Atualizar");
		return "index.xhtml";
	}
	
	public Produto getProduto() {
		return produto;
	}
	public void setProduto(Produto produto) {
		this.produto = produto;
	}
	public String getBotao() {
		return botao;
	}
	public void setBotao(String botao) {
		this.botao = botao;
	}

	@Override
	public void clean() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void save() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void remove() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void cancel() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void help() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onDrop(DragDropEvent event) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void buttonNew() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void buttonEdit(Object obj) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void buttonRemove(Object obj) {
		// TODO Auto-generated method stub
		
	}
	
	

}
