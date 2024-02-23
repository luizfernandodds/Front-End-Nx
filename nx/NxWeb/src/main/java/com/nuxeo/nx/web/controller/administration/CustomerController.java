package com.nuxeo.nx.web.controller.administration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.primefaces.PrimeFaces;

import com.nuxeo.nx.dto.CityDto;
import com.nuxeo.nx.dto.CustomerContactDto;
import com.nuxeo.nx.dto.CustomerDto;
import com.nuxeo.nx.dto.StateDto;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named("customerController")
@ViewScoped
public class CustomerController implements Serializable {

	private static final long serialVersionUID = 1L;

	private CustomerDto customer;
	private List<CustomerDto> listCustomer = new ArrayList<>();
	private CustomerDto selected;
	private boolean renderListForm = true;
	private String nameCustomer = null;
	private List<CustomerDto> filteredCustomer;
	private List<CityDto> listCity = new ArrayList<>();
	private List<StateDto> listState = new ArrayList<>();
	private FacesContext context =null;
	private Boolean editable;
	private Boolean superClient;
	private Boolean customerActive;
	
	@PostConstruct
	private void init() {
		renderListForm = true;
		System.out.println("PostConstruct");
		System.out.println("renderListForm init: "+renderListForm);
		this.clean();
	}

	public void clean() {
		this.editable = true;
		System.out.println("clean");
		this.nameCustomer = null;
		if(this.customer!=null) {
			System.out.println("Clean this.company.getId(): "+this.customer.getId());
		}
		this.selected = null;
		this.customer = new CustomerDto();
		this.customer.setCity(new CityDto());
		this.customer.getCity().setState(new StateDto());
		this.customer.setContactFinancial(new CustomerContactDto());
		this.customer.setContactAdministrative(new CustomerContactDto());
		listCity = new ArrayList<CityDto>();
		listState = new ArrayList<StateDto>();
		
//		if (!ContextHelper.getFacesContext().getExternalContext().isUserInRole("sysadmin_super_client")) {
//			this.superClient = false;
//			this.client.setLoginClient(ContextHelper.getSessionInfo().getClientLogin());
//		} else {
//			this.superClient = true;
//		}
		this.superClient = true;
		this.customerActive = true;
		
		StateDto state = new StateDto();
		state.setId(2L);
		state.setName("Paraná");
		state.setUf("PR");
		
		listState.add(state);

		CityDto city = new CityDto();
		city.setName("Curitiba");
		city.setId(1L);
		city.setState(state);
		
		listCity.add(city);	
		
	}



	public void searchCustomer() {
//		try {
			System.out.println("searchCustomer this.nameCustomer: "+this.nameCustomer);

			if(this.nameCustomer!=null && !this.nameCustomer.isEmpty()) {
				
		        
//				context = FacesContext.getCurrentInstance();
//				context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),  ContextHelper.getResourceMsg("device_protocol_admin_save_error")) );

			}else {
				System.out.println("Tem que manda mensagem");
				FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "Panel Closed","Empresa não encontrado");
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


			if (this.customer.getName() != null) {
				System.out.println("Save this.customer.getId(): "+this.customer.getId());
				System.out.println("Save this.customer.getName(): "+this.customer.getName());
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
	
	public String populateCustomer(CustomerDto customer) {
		System.out.println("populatecustomer");
		
		return null;
	}
	

	public void remove() {
		if (this.customer.getId() > 0) {
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
		this.customer = null;
		this.customer = new CustomerDto();
		this.editable = Boolean.valueOf(true);
		PrimeFaces.current().resetInputs("data_form");

	}

	public void reset() {
		
		this.clean();
        PrimeFaces.current().resetInputs("data_form");
    }
	
	public void help() {
	}
}
