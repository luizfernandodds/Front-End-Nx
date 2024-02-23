package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactGroupItemDto implements Serializable  {
	
	private static final long serialVersionUID = 703520427937108036L;
	private Long id;
	private LoginDto login;
	private ContactGroupDto contactGroup;
	private String emailTransient;
	private String celularTransient;
	
	
	public ContactGroupItemDto() {
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

	public ContactGroupDto getContactGroup() {
		return contactGroup;
	}
	
	public void setContactGroup(ContactGroupDto contactGroup) {
		this.contactGroup = contactGroup;
	}
	
	public String getEmailTransient() {
		return emailTransient;
	}
	
	public void setEmailTransient(String emailTransient) {
		this.emailTransient = emailTransient;
	}
	
	public String getCelularTransient() {
		return celularTransient;
	}
	
	public void setCelularTransient(String celularTransient) {
		this.celularTransient = celularTransient;
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
		ContactGroupItemDto other = (ContactGroupItemDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}
