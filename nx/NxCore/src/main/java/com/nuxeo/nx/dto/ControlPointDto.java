package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ControlPointDto implements Serializable {

	private static final long serialVersionUID = 4152718420561028290L;
	
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private Date createdate;
	private String description;
	private String name;
	private Integer radius;
	private String wkt;
	private String address;
	private Date deleteDate;
	private Integer idExternal;

	public ControlPointDto() {
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
		ControlPointDto other = (ControlPointDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ControlPoint [id=" + id + ", customer=" + customer + ", login=" + login + ", createdate=" + createdate
				+ ", description=" + description + ", name=" + name + ", radius=" + radius + ", wkt=" + wkt
				+ ", address=" + address + "]";
	}
	
	
}