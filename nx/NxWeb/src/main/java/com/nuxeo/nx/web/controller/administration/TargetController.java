package com.nuxeo.nx.web.controller.administration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.primefaces.PrimeFaces;
import org.primefaces.model.TreeNode;

import com.nuxeo.nx.dto.CustomerDto;
import com.nuxeo.nx.dto.DeviceDto;
import com.nuxeo.nx.dto.LoginDto;
import com.nuxeo.nx.dto.TargetDto;
import com.nuxeo.nx.dto.TargetModelDto;
import com.nuxeo.nx.dto.TargetTypeDto;
import com.nuxeo.nx.web.helpers.ContextHelper;

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
@Named("targetController")
@ViewScoped
public class TargetController implements Serializable {

	private static final long serialVersionUID = 1L;

	private TargetDto target;
	private List<TargetDto> listTarget = new ArrayList<>();
	private List<TargetModelDto> targetModels = new ArrayList<>();
	private List<TargetTypeDto> targetTypes = new ArrayList<>();
	private List<DeviceDto> listDevices = new ArrayList<>();
	private List<LoginDto> userLogins;
	private List<LoginDto> clientLogins;
	private HashMap<Long, List<Long>> userLoginsTargets;
	private List<TargetDto> filteredTargets;
	private LoginDto user;
	private TreeNode treeRoot;
	private TreeNode[] selectedNodes;
	private String valueSearch = "";
	private boolean renderDevice = true;	
	private String nameTarget;
	private boolean renderListForm = true;
	
	@PostConstruct
	private void init() {
		renderListForm = true;
		System.out.println("PostConstruct");
		System.out.println("renderListForm init: "+renderListForm);
		this.clean();
	}

	public void clean() {
		this.target = new TargetDto();
		this.target.setTargetModel(new TargetModelDto());
		this.target.setTargetType(new TargetTypeDto());
		this.target.setDevice(new DeviceDto());
		this.target.setDriver(null);
		this.clientLogins = null;
		this.renderDevice=true;
		CustomerDto customer = new CustomerDto();
//		customer.setId(ContextHelper.getSessionInfo().getClientId());
		this.target.setCustomer(customer);
		
		
		System.out.println("clean");
		this.nameTarget = null;
		if(this.nameTarget!=null) {
			System.out.println("Clean this.company.getId(): "+this.nameTarget);
		}
		this.target = new TargetDto();

		
//		if (!ContextHelper.getFacesContext().getExternalContext().isUserInRole("sysadmin_super_client")) {
//			this.superClient = false;
//			this.client.setLoginClient(ContextHelper.getSessionInfo().getClientLogin());
//		} else {
//			this.superClient = true;
//		}
		
	}



	public void searchTarget() {
		System.out.println("searchCustomer this.nameCustomer: "+this.nameTarget);

		if(this.nameTarget!=null && !this.nameTarget.isEmpty()) {
		}else {
			System.out.println("Tem que manda mensagem");
			FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "Panel Closed","Empresa não encontrado");
	        FacesContext.getCurrentInstance().addMessage(null, message);
				
		}
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


			if (this.target.getName() != null) {
				System.out.println("Save this.customer.getId(): "+this.target.getId());
				System.out.println("Save this.customer.getName(): "+this.target.getName());
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
		if (this.target.getId() > 0) {
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
		this.target = new TargetDto();
		PrimeFaces.current().resetInputs("data_form");
	}

	public void reset() {
		
		this.clean();
        PrimeFaces.current().resetInputs("data_form");
    }
	
	public void help() {
	}
	
	public List<SelectItem> getTargetPins() {
		List<SelectItem> values = new ArrayList<SelectItem>();
		values.add(new SelectItem(null, ContextHelper.getResourceMsg("pin_label_select")));

		values.add(new SelectItem(Integer.valueOf(0), ContextHelper.getResourceMsg("pin_label_car") + " 1"));
		values.add(new SelectItem(Integer.valueOf(5), ContextHelper.getResourceMsg("pin_label_car") + " 2"));
		values.add(new SelectItem(Integer.valueOf(6), ContextHelper.getResourceMsg("pin_label_car") + " 3"));
		values.add(new SelectItem(Integer.valueOf(26), ContextHelper.getResourceMsg("pin_label_van") + " 1"));

		values.add(new SelectItem(Integer.valueOf(14), ContextHelper.getResourceMsg("pin_label_jeep") + " 1"));
		values.add(new SelectItem(Integer.valueOf(22), ContextHelper.getResourceMsg("pin_label_jeep") + " 2"));

		values.add(new SelectItem(Integer.valueOf(1), ContextHelper.getResourceMsg("pin_label_truck") + " 1"));
		values.add(new SelectItem(Integer.valueOf(13), ContextHelper.getResourceMsg("pin_label_truck") + " 2"));
		values.add(new SelectItem(Integer.valueOf(25), ContextHelper.getResourceMsg("pin_label_truck") + " 3"));
		values.add(new SelectItem(Integer.valueOf(10), ContextHelper.getResourceMsg("pin_label_mixer") + " 1"));
		values.add(new SelectItem(Integer.valueOf(19), ContextHelper.getResourceMsg("pin_label_hoist") + " 1"));

		values.add(new SelectItem(Integer.valueOf(2), ContextHelper.getResourceMsg("pin_label_bike") + " 1"));
		values.add(new SelectItem(Integer.valueOf(16), ContextHelper.getResourceMsg("pin_label_bike") + " 2"));
		values.add(new SelectItem(Integer.valueOf(17), ContextHelper.getResourceMsg("pin_label_bike") + " 3"));

		values.add(new SelectItem(Integer.valueOf(3), ContextHelper.getResourceMsg("pin_label_bus") + " 1"));

		values.add(new SelectItem(Integer.valueOf(8), ContextHelper.getResourceMsg("pin_label_forklift") + " 1"));

		values.add(new SelectItem(Integer.valueOf(7), ContextHelper.getResourceMsg("pin_label_bulldozer") + " 1"));
		values.add(new SelectItem(Integer.valueOf(21), ContextHelper.getResourceMsg("pin_label_bulldozer") + " 2"));
		values.add(new SelectItem(Integer.valueOf(24), ContextHelper.getResourceMsg("pin_label_tractor") + " 1"));

		values.add(new SelectItem(Integer.valueOf(11), ContextHelper.getResourceMsg("pin_label_person") + " 1"));
		values.add(new SelectItem(Integer.valueOf(23), ContextHelper.getResourceMsg("pin_label_person") + " 2"));

		values.add(new SelectItem(Integer.valueOf(9), ContextHelper.getResourceMsg("pin_label_helicopter") + " 1"));
		values.add(new SelectItem(Integer.valueOf(12), ContextHelper.getResourceMsg("pin_label_plane") + " 1"));

		values.add(new SelectItem(Integer.valueOf(4), ContextHelper.getResourceMsg("pin_label_boat") + " 1"));
		values.add(new SelectItem(Integer.valueOf(18), ContextHelper.getResourceMsg("pin_label_boat") + " 2"));
		values.add(new SelectItem(Integer.valueOf(15), ContextHelper.getResourceMsg("pin_label_jetski") + " 1"));

		return values;
	}
}
