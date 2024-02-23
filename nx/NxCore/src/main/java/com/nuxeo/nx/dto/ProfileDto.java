package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileDto implements Serializable {

	private static final long serialVersionUID = 8366638996349444161L;
	
	private int id;
	private CustomerDto customer;
	private String i18n;
	private ProfileTypeDto profileType;
	private List<RoleDto> listRole;

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProfileDto other = (ProfileDto) obj;
		return id == other.id;
	}

	
}