package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class SemiTrailerDto implements Serializable {

	private static final long serialVersionUID = -1931314631098682831L;
	
	private Long id;
	private String identifier;
	private CategorySemiTrailerDto category;
	private CustomerDto customer;
	private LoginDto login;
	private CityDto city;
	private Integer year;
	private String brand;
	private String color;
	private String colorTarp;
	private String chassi;
	private String renavam;
	private Date dateCreate;
	private Date dateDelete;
	private String ownerName;
	private String ownerNumber;
	private Integer sequence;
	
	public SemiTrailerDto() {
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
		SemiTrailerDto other = (SemiTrailerDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}