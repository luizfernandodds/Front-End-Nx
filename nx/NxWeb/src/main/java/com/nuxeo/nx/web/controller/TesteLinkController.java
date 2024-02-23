package com.nuxeo.nx.web.controller;

import java.io.Serializable;
import java.sql.Driver;
import java.util.List;

import org.primefaces.event.DragDropEvent;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

@Named("testeLink")
@ViewScoped
public class TesteLinkController implements TesteCadLayoutController, Serializable {
	private static final long serialVersionUID = 1L;
	
	private Boolean renderCadForm = false;
	
	@PostConstruct
	private void init() {
		this.clean();
	}

	@Override
	public void clean() {
	}
	
	@Override
	public void buttonNew() {
		this.clean();
		this.renderCadForm = true;
	}

	@Override
	public void buttonEdit(Object obj) {
		this.renderCadForm = true;
	}

	@Override
	public void buttonRemove(Object obj) {
	}
	
	@Override
	public void save() {
		this.clean();
	}

	@Override
	public void remove() {

		this.clean();
	}
	
	@Override
	public void cancel() {
		this.clean();
	}

	@Override
	public void help() {
		
	}

	@Override
	public void onDrop(DragDropEvent event) {
		
	}

	public Boolean getRenderCadForm() {
		return renderCadForm;
	}

	public void setRenderCadForm(Boolean renderCadForm) {
		this.renderCadForm = renderCadForm;
	}
	
	
}