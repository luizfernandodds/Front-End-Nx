package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class LoginManagerUnitDto implements Serializable {
	
	private static final long serialVersionUID = -1217225831144751449L;
	private Long id;
	private LoginDto login;
	private ManagerUnitDto managerUnit;
	
	public LoginManagerUnitDto() {
		
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
		LoginManagerUnitDto other = (LoginManagerUnitDto) obj;
		return Objects.equals(id, other.id);
	}
}
