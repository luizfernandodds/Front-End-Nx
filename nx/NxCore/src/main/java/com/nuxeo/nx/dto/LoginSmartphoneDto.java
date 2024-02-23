package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for token database table.
 * 
 */
@ToString
@Getter
@Setter
public class LoginSmartphoneDto implements Serializable {

	private static final long serialVersionUID = 3569474504446753229L;
	private Long id;
	private LoginDto login;
	private String token;
	private String emei;

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
		LoginSmartphoneDto other = (LoginSmartphoneDto) obj;
		return Objects.equals(id, other.id);
	}

	
}