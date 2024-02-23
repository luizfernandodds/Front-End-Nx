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
public class ProductDto implements Serializable {
	
	private static final long serialVersionUID = 5656626443776310654L;
	
	private Long id;
	private CustomerDto customer;
	private LoginDto loginCreate;
	private LoginDto loginDelete;
	private LoginDto loginUpdate;	
	private String name;
	private String description;
	private Date dateCreate;
	private Date dateDelete;
	private Date dateUpdate;
	
	
	public ProductDto() {
		
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
		ProductDto other = (ProductDto) obj;
		return Objects.equals(id, other.id);
	}

	
}
