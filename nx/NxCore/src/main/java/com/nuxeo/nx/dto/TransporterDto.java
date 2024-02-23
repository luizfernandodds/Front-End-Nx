package com.nuxeo.nx.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class TransporterDto implements Serializable {

	private static final long serialVersionUID = -3960945676698910909L;
	private Long id;
	private CustomerDto client;
	private String name;
	private Date dateCreate;
	private Date dateDelete;

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
		TransporterDto other = (TransporterDto) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}