package com.nuxeo.nx.web.controller.administration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.primefaces.PrimeFaces;

import com.nuxeo.nx.dto.CityDto;
import com.nuxeo.nx.dto.CompanyDto;
import com.nuxeo.nx.dto.StateDto;
import com.nuxeo.nx.web.helpers.ContextHelper;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named("companyController")
@ViewScoped
public class CompanyController implements Serializable {

	private static final long serialVersionUID = 1L;

	private CompanyDto company;
	private List<CompanyDto> listCompany = new ArrayList<>();
	private CompanyDto selected;
	private boolean renderListForm = true;
	private String nameCompany = null;
	private List<CompanyDto> filteredCompany;
	private List<CityDto> listCity = new ArrayList<>();
	private List<StateDto> listState = new ArrayList<>();
	private FacesContext context =null;
	private Boolean editable;
	
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
		this.nameCompany = null;
		if(this.company!=null) {
			System.out.println("Clean this.company.getId(): "+this.company.getId());
		}
		this.selected = null;
		this.company = null;
		this.company = new CompanyDto();
		this.company.setCity(new CityDto());
		this.company.getCity().setState(new StateDto());;
		
		listCity = new ArrayList<CityDto>();
		listState = new ArrayList<StateDto>();
		
		
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



	public void searchCompany() {
//		try {
			System.out.println("searchProtocol this.nameLogin: "+this.nameCompany);

			if(this.nameCompany!=null && !this.nameCompany.isEmpty()) {
				
		        
//				context = FacesContext.getCurrentInstance();
//				context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR,ContextHelper.getResourceMsg("device_protocol_admin_msg_head"),  ContextHelper.getResourceMsg("device_protocol_admin_save_error")) );

			}else {
				System.out.println("Tem que manda mensagem");
				FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, ContextHelper.getResourceMsg("company_title"), ContextHelper.getResourceMsg("lbl_register_is_empty"));
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


			if (this.company.getName() != null) {
				System.out.println("Save this.protocol.getId(): "+this.company.getId());
				System.out.println("Save this.protocol.getName(): "+this.company.getName());
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
	
	public String populateCompany(CompanyDto company) {
		System.out.println("populateCompany");
		
		return null;
	}
	

	public void remove() {
		if (this.company.getId() > 0) {
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
		this.company = null;
		this.company = new CompanyDto();
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
