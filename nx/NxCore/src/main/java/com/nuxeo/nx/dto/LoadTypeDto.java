package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class LoadTypeDto implements Serializable {
	
	private static final long serialVersionUID = 837679035467305396L;
	private Long id;
	private CustomerDto customer;
	private String name;
	private Date dateCreate;
	private Date dateDelete;
	
	
	public LoadTypeDto() {
		
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
		LoadTypeDto other = (LoadTypeDto) obj;
		return Objects.equals(id, other.id);
	}
	


}
