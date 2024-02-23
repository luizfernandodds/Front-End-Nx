package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the login_type database table.
 * 
 */
@Getter
@Setter
@ToString
public class LoginTypeDto implements Serializable {

	private static final long serialVersionUID = -5692159935103257762L;
	private Long id;
	private String name;
//	private Set<LoginDto> listLogin;

	public LoginTypeDto() {
	}

	public LoginTypeDto(Long id) {
		this.id = id;
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
		LoginTypeDto other = (LoginTypeDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}