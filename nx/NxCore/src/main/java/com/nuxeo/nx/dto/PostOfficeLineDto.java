package com.nuxeo.nx.dto;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.Objects;

@ToString
@Getter
@Setter
public class PostOfficeLineDto implements Serializable {

	private static final long serialVersionUID = 5177507192463829626L;
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private String numberLine;
	private String name;
	private Date dateCreate;
	private Date dateDelete;
	private Integer qtdTecnicalSheet;

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
		PostOfficeLineDto other = (PostOfficeLineDto) obj;
		return Objects.equals(id, other.id);
	}
	

}