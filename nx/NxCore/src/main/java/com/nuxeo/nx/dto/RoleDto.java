package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDto implements Serializable {

	private static final long serialVersionUID = -3925796551763621333L;
	
	private Long id;
	private String name;
	private String role;
	private Set<ProfileDto> listProfile;
	private String group;

	public RoleDto() {
	}

	public RoleDto(Long id) {
		this.id = id;
	}

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
		RoleDto other = (RoleDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}