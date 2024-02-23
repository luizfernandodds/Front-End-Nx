package com.nuxeo.nx.web.controller.administration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.primefaces.PrimeFaces;
import org.primefaces.model.DualListModel;

import com.nuxeo.nx.dto.CustomerDto;
import com.nuxeo.nx.dto.LoginDto;
import com.nuxeo.nx.dto.ProfileDto;
import com.nuxeo.nx.dto.RoleDto;
import com.nuxeo.nx.dto.RoleLoginDto;
import com.nuxeo.nx.dto.TargetDto;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.model.SelectItem;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named("loginController")
@ViewScoped
public class LoginController implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<LoginDto> listLogin = new ArrayList<LoginDto>();
	private LoginDto login;
	private LoginDto user;
	private LoginDto selected;
	private String oldLogin;
	private DualListModel<TargetDto> pickLoginTargets;
	private DualListModel<RoleDto> pickLoginRoles;
	private List<ProfileDto> profiles;
	private List<LoginDto> filteredLogins;
	private boolean viewClientTargets;
	private String rePassword;
	private List<RoleLoginDto> listRoleLogin = new ArrayList<>();
	private List<CustomerDto> listCustomer = new ArrayList<>();
	private FacesContext context =null;
	private String nameLogin;
	private boolean renderListForm = true;
	
	@PostConstruct
	private void init() {
		renderListForm = true;
		System.out.println("PostConstruct");
		this.clean();
	}

	public void clean() {
		
	}



	public void searchLogin() {
//		try {
			System.out.println("searchLogin this.nameLogin: "+this.nameLogin);

			if(this.nameLogin!=null && !this.nameLogin.isEmpty()) {
				
		        
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


			if (this.login.getName() != null) {
				System.out.println("Save this.login.getId(): "+this.login.getId());
				System.out.println("Save this.login.getName(): "+this.login.getName());
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
		if (this.login.getId() > 0) {
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
		this.login = null;
		this.login = new LoginDto();

		PrimeFaces.current().resetInputs("data_form");

	}

	public void reset() {
		
		this.clean();
        PrimeFaces.current().resetInputs("data_form");
    }
	
	public void help() {
	}
	
	public List<SelectItem> getUtcList() {
		List<SelectItem> values = new ArrayList<SelectItem>();
		values.add(new SelectItem(-12, "UTC -12"));
		values.add(new SelectItem(-11, "UTC -11"));
		values.add(new SelectItem(-10, "UTC -10"));
		values.add(new SelectItem(-9, "UTC -9"));
		values.add(new SelectItem(-8, "UTC -8"));
		values.add(new SelectItem(-7, "UTC -7"));
		values.add(new SelectItem(-6, "UTC -6"));
		values.add(new SelectItem(-5, "UTC -5"));
		values.add(new SelectItem(-4, "UTC -4"));
		values.add(new SelectItem(-3, "UTC -3"));
		values.add(new SelectItem(-2, "UTC -2"));
		values.add(new SelectItem(-1, "UTC -1"));
		values.add(new SelectItem(0, "UTC 0"));
		values.add(new SelectItem(1, "UTC +1"));
		values.add(new SelectItem(2, "UTC +2"));
		values.add(new SelectItem(3, "UTC +3"));
		values.add(new SelectItem(4, "UTC +4"));
		values.add(new SelectItem(5, "UTC +5"));
		values.add(new SelectItem(6, "UTC +6"));
		values.add(new SelectItem(7, "UTC +7"));
		values.add(new SelectItem(8, "UTC +8"));
		values.add(new SelectItem(9, "UTC +9"));
		values.add(new SelectItem(10, "UTC +10"));
		values.add(new SelectItem(11, "UTC +11"));
		values.add(new SelectItem(12, "UTC +12"));
		return values;
	}
}
