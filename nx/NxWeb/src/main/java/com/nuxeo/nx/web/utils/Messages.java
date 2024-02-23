package com.nuxeo.nx.web.utils;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;

public class Messages {

	public static FacesContext getMessagem(FacesMessage.Severity severity, String mensagem, String mensagemDetalhada) {
		FacesContext context = FacesContext.getCurrentInstance();
		FacesMessage message = new FacesMessage(severity, mensagem, mensagemDetalhada);
		context.addMessage(null, message);
		
		return context;
	}
}