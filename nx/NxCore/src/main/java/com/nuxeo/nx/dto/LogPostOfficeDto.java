package com.nuxeo.nx.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * The persistent class for the login database table.
 * 
 */
@ToString
@Getter
@Setter
public class LogPostOfficeDto implements Serializable {
	private static final long serialVersionUID = 1L;

	public static final String FIND_BY_ID = "LogPostOffice.findById";

	private Integer id;
	private Integer fkidViagem;
	private String sentPost;
	private String returnPost;
	private Date dateCreate;

	public LogPostOfficeDto() {
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
		LogPostOfficeDto other = (LogPostOfficeDto) obj;
		return Objects.equals(id, other.id);
	}


}