package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CostCenterDto implements Serializable {
	
	private static final long serialVersionUID = 7688305786017297052L;
	private Long id;
	private CustomerDto customer;
	private String name;
	private Date dateCreate;
	private Date dateDelete;
	
	public CostCenterDto() {
		
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
		CostCenterDto other = (CostCenterDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
