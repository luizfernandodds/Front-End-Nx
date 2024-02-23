package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginTechnicalSheetDto implements Serializable {

	private static final long serialVersionUID = 3597765045282225319L;
	
	private Long id;
	private LoginDto login;
	private TechnicalSheetDto technicalSheet;
	
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
		LoginTechnicalSheetDto other = (LoginTechnicalSheetDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "LoginTechnicalSheet [id=" + id + ", login=" + login + ", technicalSheet=" + technicalSheet + "]";
	}

	
}
