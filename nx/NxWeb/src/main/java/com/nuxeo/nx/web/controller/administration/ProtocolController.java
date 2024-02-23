package com.nuxeo.nx.web.controller.administration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.primefaces.PrimeFaces;

import com.nuxeo.nx.dto.ProtocolDto;
import com.nuxeo.nx.dto.ProviderDto;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named("protocolController")
@ViewScoped
public class ProtocolController implements Serializable {

	private static final long serialVersionUID = 1L;

	private ProtocolDto protocol;
	private List<ProtocolDto> protocols = new ArrayList<>();
	private ProtocolDto selected;
	private boolean renderListForm = true;
	private String nameProtocol = null;
	private List<ProtocolDto> filteredProtocols;
	private List<ProviderDto> providers = new ArrayList<ProviderDto>();
	private FacesContext context =null;

	@PostConstruct
	private void init() {
		renderListForm = true;
		System.out.println("PostConstruct");
		this.clean();
	}

	public void clean() {
		System.out.println("clean");
		
		if(this.protocol!=null) {
			System.out.println("Clean this.protocol.getId(): "+this.protocol.getId());
		}
		this.selected = null;
		this.protocol = null;
		this.protocol = new ProtocolDto();
		this.protocol.setProvider(new ProviderDto());
		
		providers = new ArrayList<ProviderDto>();
		ProviderDto provider = new ProviderDto();
		provider.setName("Claro");
		provider.setId(1L);
		
		providers.add(provider);
		
		provider = new ProviderDto();
		provider.setName("Tim");
		provider.setId(2L);
		
		providers.add(provider);	}



	public void searchProtocol() {
//		try {
			System.out.println("searchProtocol this.nameLogin: "+this.nameProtocol);

			if(this.nameProtocol!=null && !this.nameProtocol.isEmpty()) {
				
		        
//				context = FacesContext.getCurrentInstance();
//				context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),  ContextHelper.getResourceMsg("device_protocol_admin_save_error")) );

			}else {
				System.out.println("Tem que manda mensagem");
				FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "Panel Closed","Protocolo não encontrado");
		        FacesContext.getCurrentInstance().addMessage(null, message);
				
			}
//			if(this.nameProtocol!=null && !this.nameProtocol.isEmpty()) {
//				if (ContextHelper.getFacesContext().getExternalContext().isUserInRole("target_clients_child")) {
//					this.listLogin = this.loginFacade.findAllValidLoginClientChildsFetchTargetByNameLike(ContextHelper.getSessionInfo().getClientId(),this.nameLogin);
//				}
//				else {
//					this.listLogin = this.loginFacade.findAllValidLoginByClientFetchTargetByNameLike(ContextHelper.getSessionInfo().getClientId(),this.nameLogin);
//				}
//			}else {
//				if (ContextHelper.getFacesContext().getExternalContext().isUserInRole("target_clients_child")) {
//					this.listLogin = this.loginFacade.findAllValidLoginClientChildsFetchTarget(ContextHelper.getSessionInfo().getClientId());
//				}
//				else {
//					this.listLogin = this.loginFacade.findAllValidLoginByClientFetchTarget(ContextHelper.getSessionInfo().getClientId());
//				}
//			}
//		} catch (CoreDatabaseException e) {
//			e.printStackTrace();
//		}
	}
	
	public void renderedPage() {
		
		System.out.println("renderedPage init: "+this.renderListForm);
		this.renderListForm = false;
		System.out.println("renderedPage End: "+this.renderListForm);
	}
	
	public void back() {
		this.renderListForm = true;
	}

	public void save() {
		System.out.println("Save 1");
	//	try {


			if (this.protocol.getName() != null) {
				System.out.println("Save this.protocol.getId(): "+this.protocol.getId());
				System.out.println("Save this.protocol.getName(): "+this.protocol.getName());
				System.out.println("Save this.protocol.getSys_id(): "+this.protocol.getSys_id());
				//facade.update(this.protocol);
				//returnRedirect = this.back();
			} else {
				//facade.save(this.protocol);
			}
			this.clean();

	//		PrimeFaces.current().resetInputs("data_form");
	//		context = FacesContext.getCurrentInstance();
	 //       context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),  ContextHelper.getResourceMsg("device_protocol_admin_save_success")) );
			
	//	} catch (CoreDatabaseException e) {
//
	//		context = FacesContext.getCurrentInstance();
	//        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),  ContextHelper.getResourceMsg("device_protocol_admin_save_error")) );
	//		e.printStackTrace();
	//	}
	}

	public void remove() {
		if (this.protocol.getId() > 0) {
//			try {
//				facade.delete(this.protocol);
//				MessageGrowl grow = new MessageGrowl(ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),
//						ContextHelper.getResourceMsg("device_protocol_admin_delete_success"),
//						MessageGrowl.SEVERITY_INFO, 6000);
//				PrimeRequestContext.getCurrentInstance().getCallbackParams().put("Growl",grow.toJson());
//				this.clean();
//				context = FacesContext.getCurrentInstance();
//		        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO,ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),  ContextHelper.getResourceMsg("device_protocol_admin_delete_success")) );
//			} catch (CoreDatabaseException e) {
//
//				context = FacesContext.getCurrentInstance();
//		        context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),  ContextHelper.getResourceMsg("device_protocol_admin_delete_error")) );
//
//				e.printStackTrace();
//			}
		}
	}

	public void cancel() {
		this.selected = null;
		this.protocol = null;
		this.protocol = new ProtocolDto();

		PrimeFaces.current().resetInputs("data_form");

	}

	public void reset() {
		
		this.clean();
        PrimeFaces.current().resetInputs("data_form");
    }
	
	public void help() {
	}
}
