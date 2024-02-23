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
public class ProfileTypeDto implements Serializable {

	private static final long serialVersionUID = 7957445377221745104L;
	
	private Long id;
	private String name;
	private String i18n;
	private Date deleted;

	public ProfileTypeDto() {
	}

	public ProfileTypeDto(Long id) {
		this.id = id;
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
		ProfileTypeDto other = (ProfileTypeDto) obj;
		return Objects.equals(id, other.id);
	}
	
	
}