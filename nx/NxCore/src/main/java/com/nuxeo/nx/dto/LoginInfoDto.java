package com.nuxeo.nx.dto;

import java.io.Serializable;

public class LoginInfoDto implements Serializable  {
	
	private static final long serialVersionUID = -7485661638993673300L;
	private Long id;
	private LoginDto login;
	private ContactGroupDto contactGroup;
	private ContactGroupItemDto contactGroupItem;
	private String email;
	private String celular;
	
	
	public LoginInfoDto() {
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public LoginDto getLogin() {
		return login;
	}

	public void setLogin(LoginDto login) {
		this.login = login;
	}

	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getCelular() {
		return celular;
	}
	
	public void setCelular(String celular) {
		this.celular = celular;
	}
	
	public ContactGroupDto getContactGroup() {
		return contactGroup;
	}
	
	public void setContactGroup(ContactGroupDto contactGroup) {
		this.contactGroup = contactGroup;
	}
	
	public ContactGroupItemDto getContactGroupItem() {
		return contactGroupItem;
	}
	
	public void setContactGroupItem(ContactGroupItemDto contactGroupItem) {
		this.contactGroupItem = contactGroupItem;
	}
	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LoginInfoDto other = (LoginInfoDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}
