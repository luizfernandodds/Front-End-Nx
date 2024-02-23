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
public class FenceDto implements Serializable {

	private static final long serialVersionUID = -2183816218635078318L;
	private Long id;
	private CustomerDto customer;
	private LoginDto login;
	private Date createdate;
	private String description;
	private String name;
	private String wkt;
	private Integer origin;
	private Date dateDelete;
	private Boolean enabled = false;
	
	public FenceDto() {
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
		FenceDto other = (FenceDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}