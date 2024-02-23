package com.nuxeo.nx.web.controller.administration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.primefaces.PrimeFaces;

import com.nuxeo.nx.dto.CommandTypeIntegrationDto;
import com.nuxeo.nx.dto.CustomerDto;
import com.nuxeo.nx.dto.DeviceDto;
import com.nuxeo.nx.dto.DevicePeripheralDto;
import com.nuxeo.nx.dto.PeripheralDto;
import com.nuxeo.nx.dto.PhoneLineDto;
import com.nuxeo.nx.dto.ProtocolDto;
import com.nuxeo.nx.dto.ProviderDto;
import com.nuxeo.nx.model.PeripheralInputOutput;
import com.nuxeo.nx.web.utils.AdapterController;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Named("deviceController")
@ViewScoped
public class DeviceController implements Serializable {

	private static final long serialVersionUID = 1L;

	private boolean renderListForm = true;
	private String nameDevice = null;
	private List<DeviceDto> listDevice = new ArrayList<>();
	private List<PhoneLineDto> listPhone = new ArrayList<>();
	private List<ProtocolDto> listProtocol = new ArrayList<>();
	private DeviceDto device = new DeviceDto();
	private DeviceDto selected;
	private List<DeviceDto> filteredDevices;
	private List<ProtocolDto> allProtocols = new ArrayList<>();
	private List<ProviderDto> listProvider;
	private String providerSelected;
	private PeripheralInputOutput peripheralInputOutput = null;
	private List<PeripheralDto> listPeripheral = new ArrayList<>();
	private Set<DevicePeripheralDto> listDevicePeripheral = new HashSet<>();
	private AdapterController adapter = null;
	private List<CommandTypeIntegrationDto> listCommandTypeIntegration;
	 
	
	@PostConstruct
	private void init() {
		renderListForm = true;
		System.out.println("PostConstruct");
		System.out.println("renderListForm init: "+renderListForm);
		this.clean();
	}

	public void clean() {
		System.out.println("clean");
		this.nameDevice = null;
		if(this.nameDevice!=null) {
			System.out.println("Clean this.company.getId(): "+this.device.getId());
		}
		this.selected = null;
		this.device = null;
		this.device = new DeviceDto();
		this.device.setPhoneLine(new PhoneLineDto());
		this.device.setProtocol(new ProtocolDto());
		this.device.getProtocol().setProvider(new ProviderDto());
		this.providerSelected = "";
		this.listProtocol = new ArrayList<>(this.allProtocols);
		this.peripheralInputOutput = new PeripheralInputOutput();
		this.listPeripheral = new ArrayList<>();
		this.listCommandTypeIntegration = new ArrayList<>();
		this.device.setCommandTypeIntegration(new CommandTypeIntegrationDto());
		
//		if (!ContextHelper.getFacesContext().getExternalContext().isUserInRole("sysadmin_super_client")) {
//			this.superClient = false;
//			this.client.setLoginClient(ContextHelper.getSessionInfo().getClientLogin());
//		} else {
//			this.superClient = true;
//		}

		
	}



	public void searchDevice() {
//		try {
			System.out.println("searchCustomer this.nameCustomer: "+this.nameDevice);

			if(this.nameDevice!=null && !this.nameDevice.isEmpty()) {
				
		        
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


			if (this.device.getName() != null) {
				System.out.println("Save this.customer.getId(): "+this.device.getId());
				System.out.println("Save this.customer.getName(): "+this.device.getName());
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
		if (this.device.getId() > 0) {
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
		this.device = new DeviceDto();
		PrimeFaces.current().resetInputs("data_form");

	}

	public void reset() {
		
		this.clean();
        PrimeFaces.current().resetInputs("data_form");
    }
	
	public void help() {
	}
}
