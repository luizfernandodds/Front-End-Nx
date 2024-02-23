package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the login database table.
 * 
 */
@ToString
@Getter
@Setter
public class LoginTargetDto implements Serializable {

	private static final long serialVersionUID = -6787766935833497997L;
	
	private Long id;
	private Long loginId;
	private TargetDto target;
	
	public LoginTargetDto() {
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
		LoginTargetDto other = (LoginTargetDto) obj;
		return Objects.equals(id, other.id);
	}
	
}