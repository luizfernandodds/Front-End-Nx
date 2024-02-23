package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleLoginDto implements Serializable {
	private static final long serialVersionUID = 1L;
	public static final String FIND_ALL_BY_LOGIN = "RoleLogin.findAllByLogin";
	public static final String FIND_ALL_BY_ROLE = "RoleLogin.findAllByRole";

	private Long id;
	private LoginDto login;
	private RoleDto role;

	public RoleLoginDto() {
	}

	public RoleLoginDto(Long id) {
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
		RoleLoginDto other = (RoleLoginDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}